import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly isLoading = signal(false);

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login(username: string, password: string): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (!username || !password) {
      this.errorMessage.set('Username and password are required');
      return;
    }

    this.isLoading.set(true);

    this.authService.login(username, password).pipe(
      finalize(() => {
        this.isLoading.set(false);
      })
    ).subscribe({
      next: () => {
        this.successMessage.set('Login successful');
        this.router.navigate(['/participant']);
      },

      error: (error) => {
        this.isLoading.set(false);
        console.error('Login failed:', error);
        console.error('Backend response:', error.error);

        if (error.status === 401) {
          this.errorMessage.set('Incorrect username or password.');
        } else if (error.status === 0) {
          this.errorMessage.set('Cannot connect to the backend server.');
        } else {
          this.errorMessage.set(
            error.error?.message || 'Login failed. Please try again.'
          );
        }
      }
    });
  }

}
