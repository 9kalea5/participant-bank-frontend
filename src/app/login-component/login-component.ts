import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  errorMessage: string = ''
  successMessage: string = ''
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login(username: string, password: string): void {
    this.errorMessage = ''
    this.successMessage = ''
    if(!username || !password ) {
      this.errorMessage = "Username and password are required"
      return
    }
    
    this.errorMessage = ''


    if(username === 'admin' && password === 'Admin123') {
    this.authService.login()
    this.successMessage = 'Login succesful'
    this.router.navigate(['/participant'])
    } else {
      this.errorMessage = 'Incorrect username or password'
    }
  }
}
