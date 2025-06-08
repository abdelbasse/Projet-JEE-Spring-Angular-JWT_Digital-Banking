import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  username = '';
  password = '';
  roles: string[] = [];

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    const user = {
      username: this.username,
      password: this.password,
      roles: this.roles
    };
    this.userService.createUser(user).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/users');
      },
      error: () => {
        alert('Failed to create user');
        this.router.navigateByUrl('/admin/users').then(() => {
          window.location.reload();
        });
      }
    });
  }
}