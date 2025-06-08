import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { AllAccountsComponent } from './accounts/all-accounts/all-accounts.component';
import { SimpleTemplateComponent } from './simple-template/simple-template.component';
import { NewAccountComponent } from './accounts/new-account/new-account.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { ChangePassComponent } from './users/change-pass/change-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    AccountsComponent,
    NewCustomerComponent,
    CustomerAccountsComponent,
    LoginComponent,
    AdminTemplateComponent,
    NotAuthorizedComponent,
    DashbaordComponent,
    AllAccountsComponent,
    SimpleTemplateComponent,
    NewAccountComponent,
    ListUsersComponent,
    NewUserComponent,
    ChangePassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
