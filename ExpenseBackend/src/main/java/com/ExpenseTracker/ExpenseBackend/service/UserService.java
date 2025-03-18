package com.ExpenseTracker.ExpenseBackend.service;

import com.ExpenseTracker.ExpenseBackend.dto.*;
import com.ExpenseTracker.ExpenseBackend.entity.Expense;
import com.ExpenseTracker.ExpenseBackend.entity.User;
import com.ExpenseTracker.ExpenseBackend.exception.ExpenseTrackerException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UserService {
    Response RegisterUser(RegisterDTO registerDTO) throws ExpenseTrackerException;

    Response LoginUser(LoginDto loginDto) throws ExpenseTrackerException;

    Response addExpense(ExpenseDTO expenseDTO, HttpServletRequest httpServletRequest) throws ExpenseTrackerException;

    Response deleteExpense(Long ExpenseId, HttpServletRequest httpServletRequest) throws ExpenseTrackerException;

    Response editExpense(Long ExpenseId, ExpenseDTO expenseDTO, HttpServletRequest httpServletRequest) throws ExpenseTrackerException;

    Response UpdateName(String UserName, HttpServletRequest request) throws ExpenseTrackerException;

    Response UpdatePassword(String newPassword,HttpServletRequest request) throws ExpenseTrackerException;

    Response updateProfilePic(MultipartFile file,HttpServletRequest request) throws ExpenseTrackerException;

    Response removeProfilePic(HttpServletRequest request) throws ExpenseTrackerException;

    User getCurrentUser(HttpServletRequest request) throws ExpenseTrackerException;

    List<Expense> ExpenseList(HttpServletRequest request) throws ExpenseTrackerException;


}
