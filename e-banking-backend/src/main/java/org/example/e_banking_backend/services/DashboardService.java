package org.example.e_banking_backend.services;

import org.example.e_banking_backend.dtos.DashboardDTOs.*;

import java.util.List;

public interface DashboardService {
    DashboardStatsDTO getDashboardStats();
    DashboardChartsDTO getDashboardCharts();
    List<RecentTransactionDTO> getRecentTransactions();
}