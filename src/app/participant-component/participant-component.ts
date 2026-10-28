import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantService } from '../services/participant-service';
import { ConfirmModal } from '../shared/confirm-modal/confirm-modal';
import { LoadingModal } from '../shared/loading-modal/loading-modal';
import { Alert } from '../shared/alert/alert';

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
  selectedParticipantId: string | null = null;

  constructor(
    private router: Router, 
    private participantService: ParticipantService){}
 

  ngOnInit(): void {
    this.isLoading = true;
    this.loadingMessage = 'Loading participants, please wait...'

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.participantService.loadParticipants().subscribe({
      next: () => {
        this.isLoading = false
      },
      error: error => {
        this.isLoading = false
        console.error('Unable to load participants:', error);
        }
    });
  }
  
  logout() {
    this.router.navigate(['/login'])
  }
  
  goToAddParticipant() {
    this.router.navigate(['/participant/new']);
  }

  goToEditParticipant(id: string) {
    this.router.navigate(['/participant/edit', id]);
  }

  deleteParticipant(id: string){
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
        this.participantService.loadParticipants().subscribe({
          next: () => {
            this.isLoading = false
          },
          error: (error) => {
            console.error('Unable to reload participants after deletion', error);
          }
        });
      },
      error: (error) => {
        this.selectedParticipantId = null;
        this.isLoading = false
        console.error("Failed to delete participant", error)
        this.participantService.showError('Failed to delete participant.')
        
      }
    })
  }
  cancelDelete(): void {
    this.showDeleteConfirmation = false
    this.selectedParticipantId = null
  }
}
