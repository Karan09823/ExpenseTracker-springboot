package com.ExpenseTracker.ExpenseBackend.dto;

import com.ExpenseTracker.ExpenseBackend.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;

public class Response {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private int status;
    private String message;
    private String token;
    private String expirationTime;
    private User user;

    public Response(int status, String message, String token, String expirationTime,User user) {
        this.status = status;
        this.message = message;
        this.token = token;
        this.expirationTime = expirationTime;
        this.user=user;
    }

    public Response() {
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(String expirationTime) {
        this.expirationTime = expirationTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
