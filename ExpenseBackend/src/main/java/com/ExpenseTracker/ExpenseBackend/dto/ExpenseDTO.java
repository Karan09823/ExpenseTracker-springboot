package com.ExpenseTracker.ExpenseBackend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Date;

public class ExpenseDTO {

    private Long id;

    @NotNull(message = "Name cannot be empty")
    private String name;

    @NotNull(message = "Amount cannot be empty")
    private Double amount;

    @NotNull(message = "Type cannot be empty")
    private String type;

    @NotNull(message = "Category cannot be empty")
    private String category;


    @JsonProperty("entry_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime entryTime;
    @NotNull(message = "Description cannot be empty")
    private String description;


    public ExpenseDTO() {}

    public ExpenseDTO(Long id, String name, Double amount, String type, String category, LocalDateTime entryTime, String description) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.entryTime = entryTime;
        this.description = description;

    }

    // Getters and Setters

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

}
