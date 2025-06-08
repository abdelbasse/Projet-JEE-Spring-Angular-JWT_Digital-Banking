import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent implements OnInit {

dashboardData: any = {};
// Static data for testing
  dashboardData_test = {
    savingsAccounts: 856,
    currentAccounts: 1600,
    accountTypesDistribution: {
      'Savings Account': 856,
      'Current Account': 1600
    }
  };
  isLoading = true;
  charts: any = {};

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardStats().subscribe(stats => {
      this.dashboardData = { ...this.dashboardData, ...stats };
      
      this.dashboardService.getRecentTransactions().subscribe(transactions => {
        this.dashboardData.recentTransactions = transactions;
        
        this.dashboardService.getDashboardCharts().subscribe(charts => {
          this.dashboardData = { ...this.dashboardData, ...charts };
          this.isLoading = false;
          this.createCharts();
        });
      });
    });
  }

  createCharts(): void {
    this.createAccountTypesChart();
    // this.createTransactionsChart();
    // this.createBalanceTrendsChart();
    // this.createCustomerGrowthChart();
    // this.createTransactionTypesChart();
  }

  createAccountTypesChart(): void {
  const ctx = document.getElementById('accountTypesChart') as HTMLCanvasElement;
  if (!ctx) return;

  const accountTypes = this.dashboardData_test.accountTypesDistribution;

  this.charts.accountTypes = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(accountTypes),
      datasets: [{
        data: Object.values(accountTypes),
        backgroundColor: [
          'rgba(40, 167, 69, 0.8)',
          'rgba(0, 123, 255, 0.8)'
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(0, 123, 255, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}


  createTransactionsChart(): void {
    const ctx = document.getElementById('transactionsChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.charts.transactions = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Monthly Transactions',
          data: this.dashboardData.monthlyTransactions,
          backgroundColor: 'rgba(102, 126, 234, 0.8)',
          borderColor: 'rgba(102, 126, 234, 1)',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }

  createBalanceTrendsChart(): void {
    const ctx = document.getElementById('balanceTrendsChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.charts.balanceTrends = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Total Balance',
          data: this.dashboardData.balanceTrends,
          backgroundColor: 'rgba(23, 162, 184, 0.2)',
          borderColor: 'rgba(23, 162, 184, 1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgba(23, 162, 184, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: (value) => {
                return '$' + (Number(value) / 1000000).toFixed(1) + 'M';
              }
            }
          }
        }
      }
    });
  }

  createCustomerGrowthChart(): void {
    const ctx = document.getElementById('customerGrowthChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.charts.customerGrowth = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Total Customers',
          data: this.dashboardData.customerGrowth,
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          borderColor: 'rgba(40, 167, 69, 1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgba(40, 167, 69, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: (value) => {
                return value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }

  createTransactionTypesChart(): void {
    const ctx = document.getElementById('transactionTypesChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.charts.transactionTypes = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(this.dashboardData.transactionTypes),
        datasets: [{
          data: Object.values(this.dashboardData.transactionTypes),
          backgroundColor: [
            'rgba(40, 167, 69, 0.8)',
            'rgba(220, 53, 69, 0.8)',
            'rgba(23, 162, 184, 0.8)'
          ],
          borderColor: [
            'rgba(40, 167, 69, 1)',
            'rgba(220, 53, 69, 1)',
            'rgba(23, 162, 184, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  getTransactionIcon(type: string): string {
    switch (type) {
      case 'CREDIT': return 'fa-arrow-down text-success';
      case 'DEBIT': return 'fa-arrow-up text-danger';
      default: return 'fa-exchange-alt text-info';
    }
  }

  getAmountPrefix(type: string): string {
    return type === 'DEBIT' ? '-' : '+';
  }

  getAmountClass(type: string): string {
    return type === 'DEBIT' ? 'text-danger' : 'text-success';
  }
}
