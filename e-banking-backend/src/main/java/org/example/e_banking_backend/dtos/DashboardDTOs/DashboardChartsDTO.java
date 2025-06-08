package org.example.e_banking_backend.dtos.DashboardDTOs;

import lombok.Data;

import java.util.Map;

@Data
public class DashboardChartsDTO {
    private Map<String, Long> accountTypesDistribution;
    private Map<String, Long> transactionTypesDistribution;
    private Map<String, Double> monthlyTransactions;
    private Map<String, Double> balanceTrends;
    private Map<String, Long> customerGrowth;
}