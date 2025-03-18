package com.ExpenseTracker.ExpenseBackend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class RegisterDTO {
    @Email(message = "Invalid email")
    @NotNull(message = "email cannot be empty")
    private String email;

    @NotNull(message = "name cannot be empty")
    private String fullName;

    @NotNull(message = "password cannot be empty")
    private String password;

    public RegisterDTO(String email, String  fullName, String password) {
        this.email = email;
        this. fullName =  fullName;
        this.password = password;
    }

    public RegisterDTO() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
