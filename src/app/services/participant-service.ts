import { Service } from '@angular/core';
import { Participant } from '../models/participant.interface';

@Service()
export class ParticipantService {
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
      id: "5",
      name: "Participant_5 ",
      bic: "BIC5",
      shortName: "P5",
      email: "participant5@example.com",
      phoneNumber: "+0967854123",
      status: "Inactive"
    }
  ];



  getParticipantById(id: string): Participant | undefined {
    return this.participantList.find(p => p.id === id);
  }

  updateParticipant(
    id: string,
    updatedParticipant: Participant
  ): boolean {
    const index = this.participantList.findIndex(
      p => p.id === id
    );

    if (index === -1) {
      return false;
    }

    this.participantList[index] = {
      ...updatedParticipant,
      id
    };
    return true;
  }
}
