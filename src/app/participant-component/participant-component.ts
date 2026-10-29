import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantService } from '../services/participant-service';
import { ConfirmModal } from '../shared/confirm-modal/confirm-modal';
import { LoadingModal } from '../shared/loading-modal/loading-modal';
import { Alert } from '../shared/alert/alert';
import { finalize } from 'rxjs';

@Component({
  imports: [FormsModule, ConfirmModal, LoadingModal, Alert],
  selector: 'app-participant-component',
  styleUrl: './participant-component.css',
  templateUrl: './participant-component.html',
})
export class ParticipantComponent {

  showDeleteConfirmation = false;
  isLoading = false
  loadingMessage = 'Loading participants, please wait...'
  selectedParticipantId: number | null = null;

  constructor(
    private router: Router,
    public participantService: ParticipantService,
    private changeDetectorRef: ChangeDetectorRef){}


  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.isLoading = true;
    this.loadingMessage = 'Loading participants, please wait...';

    this.participantService.loadParticipants().pipe(
      finalize(() => {
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      })
    ).subscribe({
      error: error => {
        console.error('Unable to load participants:', error);
      },
    });
  }
  
  logout() {
    this.router.navigate(['/login'])
  }
  
  goToAddParticipant() {
    this.router.navigate(['/participant/new']);
  }

  goToEditParticipant(id: number) {
    this.router.navigate(['/participant', id]);
  }

  getLogoUrl(logoPath: string | null): string | null {
    if (!logoPath) {
      return null;
    }

    if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
      return logoPath;
    }

    const filename = logoPath.split('/').pop();
    return filename
      ? `http://localhost:9081/uploads/logos/${filename}`
      : null;
  }

  deleteParticipant(id: number){
    this.selectedParticipantId = id;
    this.showDeleteConfirmation = true;
  }
  confirmDelete(): void {
    const id = this.selectedParticipantId
  
    if(id === null) {
      return
    }
    this.showDeleteConfirmation = false;
    this.isLoading = true
    this.loadingMessage = 'Deleting Participant, please wait'

    this.participantService.deleteParticipant(id).subscribe({
      next: () => {
        this.selectedParticipantId = null;
        this.participantService.showSuccess('Participant successfully deleted.')
        this.isLoading = false
        this.loadParticipants();
      },
      error: (error) => {
        this.selectedParticipantId = null;
        this.isLoading = false
        console.error("Failed to delete participant", error)
        if (error.name === 'TimeoutError') {
          this.participantService.showError(
            'Delete request timed out after 10 seconds. Please try again.'
          );
        }
        
      }
    })
  }
  cancelDelete(): void {
    this.showDeleteConfirmation = false
    this.selectedParticipantId = null
  }
}
