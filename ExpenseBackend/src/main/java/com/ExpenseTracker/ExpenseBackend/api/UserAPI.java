package com.ExpenseTracker.ExpenseBackend.api;

import com.ExpenseTracker.ExpenseBackend.dto.LoginDto;
import com.ExpenseTracker.ExpenseBackend.dto.RegisterDTO;
import com.ExpenseTracker.ExpenseBackend.dto.Response;
import com.ExpenseTracker.ExpenseBackend.dto.UpdatePasswordRequest;
import com.ExpenseTracker.ExpenseBackend.entity.User;
import com.ExpenseTracker.ExpenseBackend.exception.ExpenseTrackerException;
import com.ExpenseTracker.ExpenseBackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserAPI {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@RequestBody @Valid RegisterDTO registerDTO) throws ExpenseTrackerException {
        return ResponseEntity.ok(userService.RegisterUser(registerDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<Response> loginUser(@RequestBody @Valid LoginDto loginDto) throws ExpenseTrackerException {
        return ResponseEntity.ok(userService.LoginUser(loginDto));
    }

    @GetMapping("/fetchUser")
    public ResponseEntity<User> getCurrentUser(HttpServletRequest request) throws ExpenseTrackerException {
        User user =userService.getCurrentUser(request);
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/update-name/{profileName}")
    public ResponseEntity<Response> UpdateProfileName(@PathVariable String profileName, HttpServletRequest request) throws ExpenseTrackerException {
        return ResponseEntity.ok(userService.UpdateName(profileName, request));
    }

    @PatchMapping("/update-password")
    public ResponseEntity<Response> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest, HttpServletRequest request) throws ExpenseTrackerException {
        return ResponseEntity.ok(userService.UpdatePassword(updatePasswordRequest.getNewPassword(), request));
    }

    @PatchMapping("/update-profile-pic")
    public ResponseEntity<Response> updateProfilePic(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws ExpenseTrackerException {
        return ResponseEntity.ok(userService.updateProfilePic(file, request));
    }

    @PatchMapping("/remove-profile-pic")
    public ResponseEntity<Response> removeProfilePic(HttpServletRequest request) throws ExpenseTrackerException {
        Response response = userService.removeProfilePic(request);
        return ResponseEntity.ok(response);
    }


}
