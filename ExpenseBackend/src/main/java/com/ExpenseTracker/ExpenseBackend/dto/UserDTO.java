package com.ExpenseTracker.ExpenseBackend.dto;

import com.ExpenseTracker.ExpenseBackend.entity.Expense;
import com.ExpenseTracker.ExpenseBackend.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class UserDTO {

    private Long id;
    private String name;  // Changed from username to name to match User entity
    private String password;
    private String email;
    private byte[] profilePic;
    private List<Expense> expenses;


    public UserDTO() {
    }

    // Updated constructor to match User entity
    public UserDTO(Long id, @NotNull(message = "Name cannot be null") String name,
                   @NotNull(message = "Password cannot be null") String password,
                   @NotNull(message = "Email cannot be null") @Email String email,
                   byte[] profilePic, List<Expense> expenses) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.profilePic = profilePic;
        this.expenses = expenses;
    }

    public User toEntity() {
        return new User(this.id, this.name, this.password, this.email, this.profilePic, this.expenses);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }  // Changed from getUsername() to getName()
    public void setName(String name) { this.name = name; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public byte[] getProfilePic() { return profilePic; }
    public void setProfilePic(byte[] profilePic) { this.profilePic = profilePic; }

    public List<Expense> getExpenses() { return expenses; }
    public void setExpenses(List<Expense> expenses) { this.expenses = expenses; }


}
