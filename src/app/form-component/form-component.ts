import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant.interface';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from '../services/participant-service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { email, validate } from '@angular/forms/signals';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-form',
  styleUrl: './form-component.css',
  templateUrl: './form-component.html',
})
export class FormComponent implements OnInit {

  isEditMode = false;
  participantForm: FormGroup

  constructor(
    private router: Router,
    public participantService: ParticipantService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.participantForm = fb.group({
      name: ['', Validators.required],
      bic: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11),
        Validators.pattern(/^[a-zA-z0-9]+$/)
      ]],
      shortName: '',
      email: ['', Validators.email],
      phoneNumber: [''],
      status: ['', Validators.required]
    })
  }

  

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

      this.participantForm.patchValue(existingParticipant);
    }
  }

  newSave(): void {
    const participants = this.participantService.participantList;

    const nextId = (
      participants.length > 0
        ? Math.max(...participants.map(p => Number(p.id) || 0)) + 1
        : 1
    ).toString();

    const newParticipant: Participant = {
      ...this.participantForm.getRawValue(),
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
      this.participantForm.getRawValue()
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
    if (this.participantForm.invalid) {
      this.participantForm.markAllAsTouched()
      return
    }
    if (this.isEditMode) {
      this.editSave();
    } else {
      this.newSave();
    }
  }
  get f() {
    return this.participantForm.controls
  }
}