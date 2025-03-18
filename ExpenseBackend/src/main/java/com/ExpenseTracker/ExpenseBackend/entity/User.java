package com.ExpenseTracker.ExpenseBackend.entity;

import com.ExpenseTracker.ExpenseBackend.dto.UserDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users") // Define table name in MySQL
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    @NotNull(message = "Username cannot be null")
    @Column(nullable = false)
    private String name;  // Changed username to name for consistency

    @NotNull(message = "Password cannot be null")
    @Column(nullable = false)
    private String password;

    @NotNull(message = "Email cannot be null")
    @Column(nullable = false, unique = true)
    @Email
    private String email;

    @Lob // Used for storing binary data (images)
    @Column(nullable = true)
    private byte[] profilePic;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Expense> expenses;

    public User() {
    }

    public User(Long id, String name, String password, String email, byte[] profilePic, List<Expense> expenses) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.profilePic = profilePic;
        this.expenses = expenses;
    }

    public UserDTO toDTO() {
        return new UserDTO(this.id, this.name, this.password, this.email, this.profilePic, this.expenses);
    }

    @Nullable
    public byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic( byte[] profilePic) {
        this.profilePic = profilePic;
    }

    @Nullable
    public List<Expense> getExpenses() {
        return expenses;
    }

    public void setExpenses(@Nullable List<Expense> expenses) {
        this.expenses = expenses;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // ========== Implementing UserDetails Methods ========== //

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();  // No roles for now, can be updated later
    }

    @Override
    public String getUsername() {
        return email;  // Username in Spring Security is email
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
