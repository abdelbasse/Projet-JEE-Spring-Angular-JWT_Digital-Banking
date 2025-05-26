import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  constructor(private fb : FormBuilder){}//,private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control(""), // <-- No Validators
      password: this.fb.control("")  // <-- No Validators
    });

  }

  handleLogin() {
    console.log(this.loginForm.value)
  }

}
