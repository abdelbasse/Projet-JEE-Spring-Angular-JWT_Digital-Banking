// DashboardRestController.java
package org.example.e_banking_backend.web;

import org.example.e_banking_backend.dtos.DashboardDTOs.DashboardChartsDTO;
import org.example.e_banking_backend.dtos.DashboardDTOs.DashboardStatsDTO;
import org.example.e_banking_backend.dtos.DashboardDTOs.RecentTransactionDTO;
import org.example.e_banking_backend.services.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardRestController {
    private final DashboardService dashboardService;

    public DashboardRestController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public DashboardStatsDTO getDashboardStats() {
        return dashboardService.getDashboardStats();
    }

    @GetMapping("/recent-transactions")
    public List<RecentTransactionDTO> getRecentTransactions() {
        return dashboardService.getRecentTransactions();
    }

    @GetMapping("/charts")
    public DashboardChartsDTO getDashboardCharts() {
        return dashboardService.getDashboardCharts();
    }
}