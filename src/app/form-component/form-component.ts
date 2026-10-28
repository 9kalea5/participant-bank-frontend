import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from '../services/participant-service';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmModal } from '../shared/confirm-modal/confirm-modal';
import { LoadingModal } from '../shared/loading-modal/loading-modal';
import { Alert } from '../shared/alert/alert';

@Component({
  imports: [FormsModule, ReactiveFormsModule, ConfirmModal, LoadingModal, Alert],
  selector: 'app-form',
  styleUrl: './form-component.css',
  templateUrl: './form-component.html',
})
export class FormComponent implements OnInit {

  isEditMode = false;
  showSaveConfirmation = false;
  showCancelConfirmation = false;
  participantForm: FormGroup
  isLoading = false;

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
    this.participantService.clearMessages()
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
    const participants = this.participantForm.getRawValue()

    this.isLoading = true

    this.participantService.createParticipant(participants).subscribe({
      next: () => {
        this.participantService.showSuccess('Participant added successfully.')
        this.isLoading = false
        this.router.navigate(['/participant'])
      },
      error: (error) => {
        this.isLoading = false
        console.error('Failed to add participant', error)
        this.participantService.showError(error.name === 'TimeoutError'
          ? 'Create request timed out after 10 seconds. Please try again.'
          : 'Failed to create participant. Please try again.')
      }
    })
  }

  editSave(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }

    const participant = this.participantForm.getRawValue()
    this.isLoading = true
    this.participantService.updateParticipant(id, participant).subscribe({
      next: () => {
        this.participantService.showSuccess('Participant edited successfully')
        this.isLoading = false
        this.router.navigate(['/participant'])
      },
      error: (error) => {
        this.isLoading = false
        console.error('Failed to Update Participant', error)
        this.participantService.showError( error.name === 'TimeoutError'
          ? 'Update timed out after 10 seconds. Please try again.'
          : 'Failed to update participant. Please try again.')
      }
    })
    
  }

  cancel(): void {
    this.showCancelConfirmation = true;
  }

  confirmCancel(): void {
    this.showCancelConfirmation = false;
    this.router.navigate(['/participant']);
  }

  cancelCancel(): void {
    this.showCancelConfirmation = false;
  }

  save(): void {
    if (this.participantForm.invalid) {
      this.participantForm.markAllAsTouched()
      return
    }
    this.showSaveConfirmation = true;
  }

  confirmSave(): void {
    this.showSaveConfirmation = false;
    if (this.isEditMode) {
      this.editSave();
    } else {
      this.newSave();
    }
  }

  cancelSave(): void {
    this.showSaveConfirmation = false;
  }
  get f() {
    return this.participantForm.controls
  }
}