import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { Participant } from './participant-component/participant-component';

@Component({
  imports: [RouterOutlet, LoginComponent, Participant],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('participant-bank-frontend');
}
