import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false
  roles : any;
  username : any;
  accessToken : any;

  constructor(private http:HttpClient, private router : Router) { }

  public login(username : string, password : string) {
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }
    let params = new HttpParams()
      .set("username", username).set("password", password);
    return this.http.post(environment.backendHost+"/auth/login", params, options);
  }

  loadProfile(data: any) {
    this.isAuthenticated = true
    this.accessToken = data['access-token']
    let decodedJwt:any = jwtDecode(this.accessToken)
    this.username = decodedJwt.sub
    this.roles = decodedJwt.scope
    window.localStorage.setItem("jwt-token",this.accessToken)
    
  }

  loadJWTTokenFromStorage(){
    let token = window.localStorage.getItem("jwt-token");
    if(token){
      this.loadProfile({"access-token":token});
      this.router.navigateByUrl("admin");
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.roles = undefined;
    this.username = undefined;
    this.accessToken = undefined;
    window.localStorage.removeItem("jwt-token");
  }
}
