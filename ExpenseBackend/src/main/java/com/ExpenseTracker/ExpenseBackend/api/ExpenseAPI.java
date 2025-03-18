package com.ExpenseTracker.ExpenseBackend.api;


import com.ExpenseTracker.ExpenseBackend.dto.ExpenseDTO;
import com.ExpenseTracker.ExpenseBackend.dto.Response;
import com.ExpenseTracker.ExpenseBackend.entity.Expense;
import com.ExpenseTracker.ExpenseBackend.exception.ExpenseTrackerException;
import com.ExpenseTracker.ExpenseBackend.jwt.JWTUtils;
import com.ExpenseTracker.ExpenseBackend.service.ExpenseService;

import com.ExpenseTracker.ExpenseBackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/expenses")
public class ExpenseAPI {

    @Autowired
    private UserService userService;



    @PostMapping("/add-expense")
    public ResponseEntity<Response> addExpense(@RequestBody ExpenseDTO expenseDTO, HttpServletRequest httpServletRequest) throws ExpenseTrackerException {
        return ResponseEntity.ok(userService.addExpense(expenseDTO, httpServletRequest));
    }

    @DeleteMapping("/delete-expense/{expenseId}")
    public ResponseEntity<Response> deleteExpense(@PathVariable Long expenseId, HttpServletRequest httpServletRequest) throws ExpenseTrackerException {
        return ResponseEntity.ok(userService.deleteExpense(expenseId, httpServletRequest));
    }

    @PutMapping("/edit-expense/{expenseId}")
    public ResponseEntity<Response> editExpense(@RequestBody ExpenseDTO expenseDTO, @PathVariable Long expenseId, HttpServletRequest httpServletRequest) throws ExpenseTrackerException {
        return ResponseEntity.ok(userService.editExpense(expenseId, expenseDTO, httpServletRequest));

    }
    @GetMapping("/expense-list")
    public ResponseEntity<List<Expense>> getExpensesForUser( HttpServletRequest httpServletRequest) throws ExpenseTrackerException {

       return ResponseEntity.ok(userService.ExpenseList(httpServletRequest));
    }



}
