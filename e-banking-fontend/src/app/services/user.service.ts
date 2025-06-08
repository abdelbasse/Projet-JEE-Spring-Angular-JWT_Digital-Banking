import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface AppUser {
  userId: string;
  username: string;
  roles: { roleId: number; roleName: string }[];
  // password?: string; // don't use password in frontend
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${environment.backendHost}/api/users`);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${environment.backendHost}/api/users/${username}`,{ responseType: 'text' as 'json' } );
  }

  createUser(user: { username: string; password: string; roles: string[] }) {
    return this.http.post(`${environment.backendHost}/api/users`, user);
  }
 
  resetPassword(username: string, newPassword: string) {
    return this.http.post(
      `${environment.backendHost}/api/users/${username}/reset-password`,
      { newPassword },
      { responseType: 'text' as 'json' }  // <== this tells Angular: expect text, not JSON
    );
  }
}