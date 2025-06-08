package org.example.e_banking_backend.dtos.DashboardDTOs;

import lombok.Data;

@Data
public class DashboardStatsDTO {
    private long totalCustomers;
    private long totalAccounts;
    private long totalTransactions;
    private double totalBalance;
    private long savingsAccounts;
    private long currentAccounts;
}