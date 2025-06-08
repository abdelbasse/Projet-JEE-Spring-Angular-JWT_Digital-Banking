package org.example.e_banking_backend.dtos.DashboardDTOs;

import lombok.Data;

import java.util.Date;

@Data
public class RecentTransactionDTO {
    private String type;
    private double amount;
    private String description;
    private Date date;
    private String account;
}