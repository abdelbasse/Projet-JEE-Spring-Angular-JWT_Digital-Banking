import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../services/customer.service';
import {Router} from '@angular/router';
import {Customer} from '../model/customer.model';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm! : FormGroup;
  constructor(private fb : FormBuilder,private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      password : this.fb.control(null,[Validators.required, Validators.minLength(4)])
    });
  }

  handleLogin() {
    let username = this.loginForm.value.username;
    let pwd = this.loginForm.value.password;
    this.authService.login(username,pwd).subscribe({
      next : data=>{
        this.authService.loadProfile(data);
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/admin");
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
