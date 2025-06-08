import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {
  username = '';
  newPassword = '';
  confirmPassword = '';
  error: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Set username from AuthService
    this.username = this.authService.username;
  }

  onSubmit() {
    this.error = null;

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.userService.resetPassword(this.username, this.newPassword).subscribe({
      next: () => {
        alert('Password updated successfully. Logging you out...');
        this.authService.logout();
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.error = 'Failed to change password';
        console.error(err);
      }
    });
  }
}
