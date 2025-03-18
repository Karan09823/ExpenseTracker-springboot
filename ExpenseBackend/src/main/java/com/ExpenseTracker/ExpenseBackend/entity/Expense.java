package com.ExpenseTracker.ExpenseBackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "expenses") // Define table name in MySQL
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    @NotNull(message = "Name field cannot be empty")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "Amount cannot be empty")
    @Column(nullable = false)
    private Double amount; // Changed from String to Double

    @NotNull(message = "Type cannot be empty")
    @Column(nullable = false)
    private String type;

    @NotNull(message = "Category cannot be empty")
    @Column(nullable = false)
    private String category; // Fixed variable name capitalization

    @NotNull(message = "EntryTime cannot be empty")
    @Column(nullable = false)
    private LocalDateTime entryTime;

    @NotNull(message = "Description cannot be empty")
    @Column(nullable = false, length = 500) // Increased description length
    private String description;

    // If each expense is linked to a user, use @ManyToOne
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)// Foreign key to User table
    @JsonIgnore
    private User user;

    public Expense() {
    }

    public Expense(Long id, String name, Double amount, String type, String category, LocalDateTime entryTime, String description, User user) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.entryTime = entryTime;
        this.description = description;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDateTime getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(LocalDateTime entryTime) {
        this.entryTime = entryTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
