import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  // Only totalCustomers is dynamic
  totalCustomers: number = 0;

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router,public authService : AuthService) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      map(customers => {
        this.totalCustomers = customers.length;
        return customers;
      }),
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: () => {
        this.handleSearchCustomers(); // Reload and update stats
      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/admin/customer-accounts/" + customer.id, { state: customer });
  }
}