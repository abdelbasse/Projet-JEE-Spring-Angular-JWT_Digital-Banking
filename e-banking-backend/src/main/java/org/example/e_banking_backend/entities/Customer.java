package org.example.e_banking_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    @OneToMany(mappedBy = "customer")
    private List<BankAccount> bankAccounts;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date(); // Automatically set when saving new customers
    }
}
