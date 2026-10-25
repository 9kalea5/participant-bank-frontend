import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantService } from '../services/participant-service';

@Component({
  imports: [FormsModule],
  selector: 'app-participant-component',
  styleUrl: './participant-component.css',
  templateUrl: './participant-component.html',
})
export class ParticipantComponent {
  constructor(
    private router: Router, 
    private participantService: ParticipantService){}
 

  
  logout() {
    this.router.navigate(['/login'])
  }
  
  goToAddParticipant() {
    this.router.navigate(['/participant/new']);
  }

  goToEditParticipant(id: string) {
    this.router.navigate(['/participant/edit', id]);
  }
}
