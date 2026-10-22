import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-participant-component',
  styleUrl: './participant-component.css',
  templateUrl: './participant-component.html',
})
export class Participant {
  constructor(private router: Router){}
  logout() {
    this.router.navigate(['/login'])
  }
}
