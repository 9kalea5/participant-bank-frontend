import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant.interface';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from '../services/participant-service';

@Component({
  imports: [FormsModule],
  selector: 'app-form',
  styleUrl: './form-component.css',
  templateUrl: './form-component.html',
})
export class FormComponent implements OnInit {

  isEditMode = false;

  constructor(
    private router: Router,
    public participantService: ParticipantService,
    private activatedRoute: ActivatedRoute
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

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.isEditMode = true;

      const existingParticipant =
        this.participantService.getParticipantById(id);

      if (!existingParticipant) {
        alert('Participant not found!');
        this.router.navigate(['/participant']);
        return;
      }

      // Copy the participant so Cancel does not change the original.
      this.participant = { ...existingParticipant };
    }
  }

  newSave(): void {
    const participants = this.participantService.participantList;

    // Generate an ID without reusing an existing numeric ID.
    const nextId = (
      participants.length > 0
        ? Math.max(...participants.map(p => Number(p.id) || 0)) + 1
        : 1
    ).toString();

    const newParticipant: Participant = {
      ...this.participant,
      id: nextId
    };
    
    participants.push(newParticipant);
    this.router.navigate(['/participant']);
  }

  editSave(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }

    const updated = this.participantService.updateParticipant(
      id,
      this.participant
    );

    if (!updated) {
      alert('Participant not found!');
      this.router.navigate(['/participant']);
      return;
    }

    this.router.navigate(['/participant']);
  }

  cancel(): void {
    this.router.navigate(['/participant']);
  }

  save(): void {
    if (this.isEditMode) {
      this.editSave();
    } else {
      this.newSave();
    }
  }
}