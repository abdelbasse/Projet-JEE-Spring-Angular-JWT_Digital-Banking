// DashboardServiceImpl.java
package org.example.e_banking_backend.services;

import lombok.AllArgsConstructor;
import org.example.e_banking_backend.dtos.DashboardDTOs.DashboardChartsDTO;
import org.example.e_banking_backend.dtos.DashboardDTOs.DashboardStatsDTO;
import org.example.e_banking_backend.dtos.DashboardDTOs.RecentTransactionDTO;
import org.example.e_banking_backend.entities.CurrentAccount;
import org.example.e_banking_backend.entities.SavingAccount;
import org.example.e_banking_backend.enums.OperationType;
import org.example.e_banking_backend.repositories.AccountOperationRepository;
import org.example.e_banking_backend.repositories.BankAccountRepository;
import org.example.e_banking_backend.repositories.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Transactional
@AllArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final CustomerRepository customerRepository;
    private final BankAccountRepository bankAccountRepository;
    private final AccountOperationRepository accountOperationRepository;

    @Override
    public DashboardStatsDTO getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();

        stats.setTotalCustomers(customerRepository.count());
        stats.setTotalAccounts(bankAccountRepository.count());
        stats.setTotalTransactions(accountOperationRepository.count());

        double totalBalance = bankAccountRepository.findAll().stream()
                .mapToDouble(bankAccount -> bankAccount.getBalance() != null ? bankAccount.getBalance() : 0.0)
                .sum();
        stats.setTotalBalance(totalBalance);

        // Use the class-based query
        stats.setSavingsAccounts(bankAccountRepository.countByType(SavingAccount.class));
        stats.setCurrentAccounts(bankAccountRepository.countByType(CurrentAccount.class));

        return stats;
    }

    @Override
    public List<RecentTransactionDTO> getRecentTransactions() {
        return accountOperationRepository.findTop5ByOrderByOperationDateDesc()
                .stream()
                .map(op -> {
                    RecentTransactionDTO dto = new RecentTransactionDTO();
                    dto.setType(op.getType().name());
                    dto.setAmount(op.getAmount());
                    dto.setDescription(op.getDescription());
                    dto.setDate(op.getOperationDate());
                    dto.setAccount(op.getBankAccount().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }



    // Add this method to the DashboardServiceImpl class
    @Override
    public DashboardChartsDTO getDashboardCharts() {
        DashboardChartsDTO charts = new DashboardChartsDTO();

        // 1. Account Types Distribution
        Map<String, Long> accountTypes = new HashMap<>();
        accountTypes.put("Savings Account", bankAccountRepository.countByType(SavingAccount.class));
        accountTypes.put("Current Account", bankAccountRepository.countByType(CurrentAccount.class));
        charts.setAccountTypesDistribution(accountTypes);

        // 2. Transaction Types Distribution
        Map<String, Long> transactionTypes = new HashMap<>();
        Arrays.stream(OperationType.values()).forEach(type -> {
            transactionTypes.put(type.name(), accountOperationRepository.countByType(type));
        });
        charts.setTransactionTypesDistribution(transactionTypes);

        // 3. Monthly Transactions
        Map<String, Double> monthlyTransactions = new HashMap<>();
        IntStream.range(1, 13).forEach(month -> {
            Double amount = accountOperationRepository.sumAmountByMonth(month);
            monthlyTransactions.put(getMonthName(month - 1), amount != null ? amount : 0.0);
        });
        charts.setMonthlyTransactions(monthlyTransactions);

        // 4. Balance Trends (last 6 months)
        Map<String, Double> balanceTrends = new HashMap<>();
        for (int i = 5; i >= 0; i--) {
            Date date = getDateMonthsAgo(i);
            double balance = bankAccountRepository.findAll().stream()
                    .filter(account -> account.getCreatedAt().before(date))
                    .mapToDouble(account -> account.getBalance() != null ? account.getBalance() : 0.0)
                    .sum();
            balanceTrends.put(getMonthName(date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue() - 1), balance);
        }
        charts.setBalanceTrends(balanceTrends);

        // 5. Customer Growth (last 6 months)
        Map<String, Long> customerGrowth = new HashMap<>();
        for (int i = 5; i >= 0; i--) {
            Date date = getDateMonthsAgo(i);
            long count = customerRepository.countCustomersBeforeDate(date);
            customerGrowth.put(getMonthName(date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue() - 1), count);
        }
        charts.setCustomerGrowth(customerGrowth);

        return charts;
    }

    // Helper methods
    private String getMonthName(int monthIndex) {
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        return months[monthIndex % 12];
    }

    private Date getDateMonthsAgo(int months) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, -months);
        return cal.getTime();
    }
}