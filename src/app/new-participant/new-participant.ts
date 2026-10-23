import { Component } from '@angular/core';
import { Participant } from '../models/participant.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantService } from '../services/participant-service';


@Component({
  imports: [FormsModule],
  selector: 'app-new-participant',
  styleUrl: './new-participant.css',
  templateUrl: './new-participant.html',
})
export class NewParticipant {
  constructor(
    private router: Router,
    private participantService: ParticipantService
  ) {}
  participant: Participant = {
      id: '',
      name: '',
      bic: '',
      shortName: '',
      email: '',
      phoneNumber: '',
      status: 'Inactive'
    };

    save() :void {
      const participants = this.participantService.participantList;

      const nextId = (participants.length + 1).toString();
      this.participant.id = nextId;
      const newParticipant: Participant = { ...this.participant, id: nextId };
      participants.push(newParticipant);

      this.router.navigate(['/participant']);
    }

    cancel() :void {
      this.router.navigate(['/participant']);
    } 
}
