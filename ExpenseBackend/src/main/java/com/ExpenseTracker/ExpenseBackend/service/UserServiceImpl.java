package com.ExpenseTracker.ExpenseBackend.service;

import com.ExpenseTracker.ExpenseBackend.dto.*;

import com.ExpenseTracker.ExpenseBackend.entity.Expense;
import com.ExpenseTracker.ExpenseBackend.entity.User;
import com.ExpenseTracker.ExpenseBackend.exception.ExpenseTrackerException;
import com.ExpenseTracker.ExpenseBackend.jwt.JWTUtils;
import com.ExpenseTracker.ExpenseBackend.repository.ExpenseRepository;
import com.ExpenseTracker.ExpenseBackend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service("userServiceImpl")
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;
    private final UserDetailsService userDetailsService;
    private final ExpenseRepository expenseRepository;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JWTUtils jwtUtils, UserDetailsService userDetailsService, ExpenseRepository expenseRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;

        this.userDetailsService = userDetailsService;
        this.expenseRepository = expenseRepository;
    }


    @Override
    public Response RegisterUser(RegisterDTO registerDTO) throws ExpenseTrackerException {
        Optional<User> existingUser = userRepository.findByEmail(registerDTO.getEmail());
        if (existingUser.isPresent()) {
            throw new ExpenseTrackerException("USER_ALREADY_PRESENT");
        }
        User user = new User();
        user.setName(registerDTO.getFullName());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        userRepository.save(user);

        return new Response(200, "User Registered Successfully", null, null,null);
    }

    @Override
    public Response LoginUser(LoginDto loginDto) throws ExpenseTrackerException {
        User checkUser = userRepository.findByEmail(loginDto.getEmail()).orElseThrow(() -> new ExpenseTrackerException("Email Not Found"));


        if (!passwordEncoder.matches(loginDto.getPassword(), checkUser.getPassword())) {
            throw new ExpenseTrackerException("Password did not match");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(checkUser.getEmail());
        String token = jwtUtils.generateTokenFromUsername(userDetails);
        checkUser.getExpenses().forEach(expense -> expense.setUser(null));


        return new Response(200, "Login Successful", token, "Token expires in: " + jwtUtils.jwtExpirationMs / 1000 + " seconds",checkUser);
    }

    @Override
    public Response addExpense(ExpenseDTO expenseDTO, HttpServletRequest httpServletRequest) throws ExpenseTrackerException {
        String token = jwtUtils.getJwtFromHeader(httpServletRequest);

        if (token == null || !jwtUtils.validateJwtToken(token)) {
            throw new ExpenseTrackerException("Invalid or Expired Token");
        }

        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new ExpenseTrackerException("User not Found"));

        Expense expense = new Expense();
        expense.setCategory(expenseDTO.getCategory());
        expense.setDescription(expenseDTO.getDescription());
        expense.setAmount(expenseDTO.getAmount());
        expense.setEntryTime(LocalDateTime.now());

        expense.setName(expenseDTO.getName());
        expense.setType(expenseDTO.getType());
        expense.setUser(user);

        expenseRepository.save(expense);


        return new Response(200, "Expense Added Successfully", null, null,null);
    }

    @Override
    public Response deleteExpense(Long ExpenseId, HttpServletRequest httpServletRequest) throws ExpenseTrackerException {
        String token = jwtUtils.getJwtFromHeader(httpServletRequest);
        if (token == null || !jwtUtils.validateJwtToken(token)) {
            throw new ExpenseTrackerException("Invalid or Expired Token");
        }

        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new ExpenseTrackerException("User not Found"));

        Expense expense = expenseRepository.findById(ExpenseId).orElseThrow(() -> new ExpenseTrackerException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new ExpenseTrackerException("You are not Authorized to Delete this Expense");
        }

        expenseRepository.delete(expense);
        return new Response(200, "Expense Id" + ExpenseId + " Deleted Successfully", null, null,null);
    }

    @Override
    public Response editExpense(Long ExpenseId, ExpenseDTO expenseDTO, HttpServletRequest httpServletRequest) throws ExpenseTrackerException {
        String token = jwtUtils.getJwtFromHeader(httpServletRequest);
        if (token == null || !jwtUtils.validateJwtToken(token)) {
            throw new ExpenseTrackerException("Invalid or Expired Token");
        }

        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new ExpenseTrackerException("User not Found"));
        Expense expense = expenseRepository.findById(ExpenseId).orElseThrow(() -> new ExpenseTrackerException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new ExpenseTrackerException("You are not authorized to edit this Expense");
        }

        expense.setAmount(expenseDTO.getAmount());
        expense.setCategory(expenseDTO.getCategory());
        expense.setDescription(expenseDTO.getDescription());
        expense.setName(expense.getName());
        expense.setType(expenseDTO.getType());
        expense.setEntryTime(expenseDTO.getEntryTime());

        expenseRepository.save(expense);

        return new Response(200, "Expense with " + ExpenseId + "is Updated", null, null,null);
    }

    @Override
    public Response UpdateName(String ProfileName, HttpServletRequest request) throws ExpenseTrackerException {
        String token = jwtUtils.getJwtFromHeader(request);
        if (token == null || !jwtUtils.validateJwtToken(token)) {
            throw new ExpenseTrackerException("Invalid or Expired token");
        }
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new ExpenseTrackerException("User not Found"));

        user.setName(ProfileName);
        userRepository.save(user);
        return new Response(200, "User name Updated Successfully", null, null,null);
    }

    @Override
    public Response UpdatePassword(String newPassword, HttpServletRequest request) throws ExpenseTrackerException {
        String token = jwtUtils.getJwtFromHeader(request);
        if (token == null || !jwtUtils.validateJwtToken(token)) {
            throw new ExpenseTrackerException("Invalid or Expired token");
        }
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new ExpenseTrackerException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return new Response(200, "Password Updated Successfully", null, null,null);
    }

    @Override
    public Response updateProfilePic(MultipartFile file, HttpServletRequest request) throws ExpenseTrackerException {
        String token = jwtUtils.getJwtFromHeader(request);
        if (token == null || !jwtUtils.validateJwtToken(token)) {
            throw new ExpenseTrackerException("Invalid or Expired token");
        }
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new ExpenseTrackerException("User not found"));

        byte[] profilePic;
        try {
            profilePic = file.getBytes();
        } catch (IOException e) {
            throw new ExpenseTrackerException("Failed to process profile picture");
        }

        user.setProfilePic(profilePic);
        userRepository.save(user);

        return new Response(200, "Profile Pic Updated Successfully", null, null,null);
    }

    @Override
    public Response removeProfilePic(HttpServletRequest request) throws ExpenseTrackerException {

        String token = jwtUtils.getJwtFromHeader(request);
        if (token == null || !jwtUtils.validateJwtToken(token)) {
            throw new ExpenseTrackerException("Invalid or Expired token");
        }


        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ExpenseTrackerException("User not found"));


        user.setProfilePic(null);
        userRepository.save(user);
        return new Response(200, "Profile Pic Removed Successfully", null, null,null);
    }

    @Override
    public User getCurrentUser(HttpServletRequest request) throws ExpenseTrackerException {
        String token = jwtUtils.getJwtFromHeader(request);
        if (token == null || !jwtUtils.validateJwtToken(token)) {
            throw new ExpenseTrackerException("Invalid or Expired token");
        }


        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ExpenseTrackerException("User not found"));
        return user;
    }

    @Override
    public List<Expense> ExpenseList(HttpServletRequest request) throws ExpenseTrackerException {
        String token = jwtUtils.getJwtFromHeader(request);
        if (token == null || !jwtUtils.validateJwtToken(token)) {
            throw new ExpenseTrackerException("Invalid or Expired token");
        }

        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ExpenseTrackerException("User not found"));
        List<Expense> expenses=expenseRepository.findByUserId(user.getId());
        return expenses;
    }


}
