import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  errorMessage: string = ''
  successMessage: string = ''

  login(username: string, password: string): void {
    this.errorMessage = ''
    this.successMessage = ''
    if(!username || !password ) {
      this.errorMessage = "Username and password are required"
      return
    }
    
    this.errorMessage = ''


    if(username === 'admin' && password === 'Admin123') {
     this.successMessage = 'Login succesful'
    } else {
      this.errorMessage = 'Incorrect username or password'
    }
  }
}
