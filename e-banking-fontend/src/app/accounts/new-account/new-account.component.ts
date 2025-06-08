import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Customer {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  customers: Customer[] = [];
  isLoading = false;
  accountType: string | null = null;
  selectedCustomerId: number | null = null;
  initialBalance: number = 0;
  overDraft: number = 0;
  interestRate: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.http.get<Customer[]>(`${environment.backendHost}/customers`).subscribe({
      next: (customers) => {
        this.customers = customers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        alert('Failed to load customers. Please try again.');
        this.isLoading = false;
      }
    });
  }

  selectAccountType(type: string): void {
    this.accountType = type;
  }

  onSubmit(): void {
    if (!this.accountType) {
      alert('Please select an account type');
      return;
    }

    if (!this.selectedCustomerId) {
      alert('Please select a customer');
      return;
    }

    if (this.initialBalance < 0) {
      alert('Please enter a valid initial balance');
      return;
    }

    this.isLoading = true;

    const accountData = {
      initialBalance: this.initialBalance,
      customerId: this.selectedCustomerId,
      ...(this.accountType === 'current' ? { overDraft: this.overDraft } : { interestRate: this.interestRate })
    };

    const endpoint = this.accountType === 'current' 
      ? '/accounts/new' 
      : '/accounts/new';

    this.http.post<boolean>(`${environment.backendHost}${endpoint}`, accountData).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          alert('Account created successfully!');
          this.resetForm();
        } else {
          alert('Failed to create account. Please try again.');
        }
      },
      error: (error) => {
        console.error('Error creating account:', error);
        alert('An error occurred while creating the account.');
        this.isLoading = false;
      }
    });
  }

  resetForm(): void {
    this.accountType = null;
    this.selectedCustomerId = null;
    this.initialBalance = 0;
    this.overDraft = 0;
    this.interestRate = 0;
  }
}