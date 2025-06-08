import { Component, NgModule, SimpleChange } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { AllAccountsComponent } from './accounts/all-accounts/all-accounts.component';
import { SimpleTemplateComponent } from './simple-template/simple-template.component';
import { NewAccountComponent } from './accounts/new-account/new-account.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { ChangePassComponent } from './users/change-pass/change-pass.component';

const routes: Routes = [
  { path :"login", component : LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:"admin", component: AdminTemplateComponent , canActivate : [AuthenticationGuard] ,children : [
    { path :"", component : DashbaordComponent},
    { path :"customers", component : CustomersComponent},
    { path :"accounts", component : SimpleTemplateComponent ,children : [
      { path :"search", component : AccountsComponent},
      { path :"new", component : NewAccountComponent},
      { path :"list", component : AllAccountsComponent},
    ]},
    { path :"users", component : SimpleTemplateComponent ,children : [
      { path :"", component : ListUsersComponent},
      { path :"new", component : NewUserComponent},
      { path :"change-pass", component : ChangePassComponent},
    ]},
    { path :"new-customer", component : NewCustomerComponent , canActivate : [AuthorizationGuard] , data : {role:"ADMIN"}},
    { path :"customer-accounts/:id", component : CustomerAccountsComponent},
    { path :"NotAuthorized", component : NotAuthorizedComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
