import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

interface CustomerDTO {
  id: number;
  name: string;
  email: string;
}

interface Account {
  type: string;
  id: string;
  balance: number;
  createdAt: string;
  status: string;
  customerDTO: CustomerDTO;
  overDraft?: number;
  interestRate?: number;
}

@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.css']
})

export class AllAccountsComponent implements OnInit {
  accounts: Account[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  
  // Statistics
  currentAccountsCount = 0;
  savingAccountsCount = 0;
  totalAccountsCount = 0;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadAllAccounts();
  }

  loadAllAccounts(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.http.get<Account[]>(`${environment.backendHost}/accounts`).subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.updateStatistics();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
        this.errorMessage = 'Failed to load accounts. Please check your connection and try again.';
        this.isLoading = false;
      }
    });
  }

  isCurrentAccount(account: Account): boolean {
    return account.type === 'CurrentAccount';
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getAccountSpecificDetail(account: Account): string {
    return this.isCurrentAccount(account) 
      ? `Overdraft: $${account.overDraft?.toFixed(2) || '0.00'}` 
      : `Interest Rate: ${account.interestRate?.toFixed(2) || '0.00'}%`;
  }

  viewAccountDetails(accountId: string): void {
    this.router.navigate(['/accounts', accountId]);
  }

  updateStatistics(): void {
    this.currentAccountsCount = this.accounts.filter(acc => this.isCurrentAccount(acc)).length;
    this.savingAccountsCount = this.accounts.filter(acc => !this.isCurrentAccount(acc)).length;
    this.totalAccountsCount = this.accounts.length;
  }

  refreshAccounts(): void {
    this.loadAllAccounts();
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
