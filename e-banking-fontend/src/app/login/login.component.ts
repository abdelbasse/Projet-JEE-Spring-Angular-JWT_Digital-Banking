import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  constructor(private fb : FormBuilder,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control(""), // <-- No Validators
      password: this.fb.control("")  // <-- No Validators
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
