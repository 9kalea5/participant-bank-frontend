import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from '../services/participant-service';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmModal } from '../shared/confirm-modal/confirm-modal';
import { LoadingModal } from '../shared/loading-modal/loading-modal';
import { Alert } from '../shared/alert/alert';
import { finalize, Observable, of, switchMap, throwError, map } from 'rxjs';
import { ParticipantInfo, ParticipantResponse } from '../models/participant.interface';


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
  createdParticipantId: number = 0;
  createdParticipantInfo: ParticipantInfo | null = null;

  selectedLogo: File | null = null;
  logoPreview: string | null = null;

  constructor(
    private router: Router,
    public participantService: ParticipantService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private changeDetection: ChangeDetectorRef
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
    console.log('Attempting to save new participant...');
  const participants = this.participantForm.getRawValue();
  this.isLoading = true;

  this.participantService.createParticipant(participants).subscribe({

    next: (createdParticipant: any) => {
      console.log('Participant created:', createdParticipant);
      // Get the ID directly from the response
      this.createdParticipantId = createdParticipant.id;
      console.log('Created participant ID:', this.createdParticipantId);
      
      if (!this.createdParticipantId) {
        this.isLoading = false;

        this.participantService.showError(
          'Participant created, but the ID was not returned.'
        );
        return;
      }

      // No logo selected
      if (!this.selectedLogo) {
        console.log('No logo selected. Skipping logo upload.');
        this.isLoading = false;

        this.participantService.showSuccess(
          'Participant added successfully.'
        );

        this.router.navigate(['/participant']);
        return;
      }

      console.log('Uploading logo for participant ID:', this.createdParticipantId);
      // Upload logo using the returned participant ID
      this.participantService.addLogo(
        this.createdParticipantId,
        this.selectedLogo
      ).subscribe({

        next: () => {
          console.log('Logo uploaded successfully for participant ID:', this.createdParticipantId);
          this.isLoading = false;

          this.participantService.showSuccess(
            'Participant added successfully.'
          );

          this.router.navigate(['/participant']);
        },

        error: (error) => {
          console.error('Logo upload failed:', error);
          this.isLoading = false;

          this.participantService.showError(
            error.name === 'TimeoutError'
              ? 'Logo upload timed out. Please try again.'
              : error.error?.message ||
                'Participant created, but logo upload failed.'
          );
        }
      });
    },

    error: (error) => {
      this.isLoading = false;

      console.error('Participant creation failed:', error);

      this.participantService.showError(
        error.name === 'TimeoutError'
          ? 'Participant creation timed out. Please try again.'
          : error.error?.message || error.message ||
            'Failed to create participant.'
      );
    }
  });
}


    editSave(): void {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id === null) {
        return;
      }

      const participant = this.participantForm.getRawValue()
      this.isLoading = true
      this.participantService.updateParticipant(id, participant).pipe(
        switchMap(() => {
          if (!this.selectedLogo) {
            return of(null);
          }

          return this.participantService.addLogo(id, this.selectedLogo);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe({
        next: () => {
          this.participantService.showSuccess('Participant edited successfully');
          this.router.navigate(['/participant'])
        },
        error: (error) => {
          console.error('Update or logo upload failed:', error)
          if (error.name === 'TimeoutError') {
            this.participantService.showError(
              'Update timed out after 10 seconds. Please try again.'
            );
          }
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


  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      this.participantService.showError('Please select a PNG or JPG image.');
      input.value = '';
      return;
    }

    this.selectedLogo = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;
      this.changeDetection.markForCheck()
    };
    reader.onerror = () => {
    this.participantService.showError(
      'Unable to preview the selected logo.'
    );

    
  };
    reader.readAsDataURL(file);
}
}
