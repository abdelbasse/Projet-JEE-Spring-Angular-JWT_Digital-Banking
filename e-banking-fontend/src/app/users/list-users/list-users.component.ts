import { Component, OnInit } from '@angular/core';
import { UserService, AppUser } from '../../services/user.service';

interface DisplayUser {
  userId: string;
  username: string;
  roles: string[];
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: DisplayUser[] = [];
  isLoading = false;
  error: string | null = null;
  adminCount = 0;
  userCount = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.users = users.map(u => ({
          userId: u.userId,
          username: u.username,
          roles: u.roles.map(r => r.roleName)
        }));
        // Count logic
        this.adminCount = this.users.filter(u => u.roles.includes('ADMIN')).length;
        this.userCount = this.users.filter(u => !u.roles.includes('ADMIN') && u.roles.includes('USER')).length;
        this.isLoading = false;
      },
      error: err => {
        this.error = 'Failed to load users';
        this.isLoading = false;
      }
    });
  }

  handleDeleteUser(user: DisplayUser) {
    if (!confirm(`Delete user ${user.username}?`)) return;
    this.userService.deleteUser(user.username).subscribe({
      next: (response) => { 
        this.loadUsers();
      },
      error: (error) => {
        alert('Failed to delete user');
      }
    });
  }
}