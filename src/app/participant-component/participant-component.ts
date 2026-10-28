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

  showDeleteConfirmation = false;
  selectedParticipantId: string | null = null;

  constructor(
    private router: Router, 
    private participantService: ParticipantService){}
 

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.participantService.loadParticipants().subscribe({
      error: error => {
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
    this.participantService.deleteParticipant(id).subscribe({
      next: () => {
        this.participantService.loadParticipants()
      },
      error: (error) => {
        console.error("Failed to delete participant", error)
        alert("Failed to delete participant")
      }
    })
  }
  cancelDelete(): void {
    this.showDeleteConfirmation = false
    this.selectedParticipantId = null
  }
}
