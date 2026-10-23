import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Participant } from '../models/participant.interface';

@Component({
  imports: [FormsModule],
  selector: 'app-participant-component',
  styleUrl: './participant-component.css',
  templateUrl: './participant-component.html',
})
export class ParticipantComponent {
  searchTerm: string = '';
  get filteredParticipants(): Participant[] {
    if (!this.searchTerm) {
      return this.participantList;
    }
    return this.participantList.filter(participant =>
      participant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      participant.bic.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  constructor(private router: Router){}
  logout() {
    this.router.navigate(['/login'])
  }
  participantList : Participant[] = [
    {
      id: "1",
      name: "Participant_1 ",
      bic: "BIC1",
      shortName: "P1",
      email: "participant1@example.com",
      phoneNumber: "+1234567890",
      status: "Active"
    },
    {
      id: "2",
      name: "Participant_2",
      bic: "BIC2",
      shortName: "P2",
      email: "participant2@example.com",
      phoneNumber: "+0987654321",
      status: "Active"
    },
    {
      id: "3",
      name: "Participant_3 ",
      bic: "BIC3",
      shortName: "P3",
      email: "participant3@example.com",
      phoneNumber: "+0974567890",
      status: "Active"
    },
    {
      id: "4",
      name: "Participant_4 ",
      bic: "BIC4",
      shortName: "P4",
      email: "participant4@example.com",
      phoneNumber: "+0911346789",
      status: "Inactive"
    },
    {
      id: "4",
      name: "Participant_4 ",
      bic: "BIC4",
      shortName: "P4",
      email: "participant4@example.com",
      phoneNumber: "+0932145679",
      status: "Active"
    },
    {
      id: "5",
      name: "Participant_5 ",
      bic: "BIC5",
      shortName: "P5",
      email: "participant5@example.com",
      phoneNumber: "+0967854123",
      status: "Inactive"
    }
  ];
}
