import { inject, Service } from '@angular/core';
import { Participant } from '../models/participant.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, Observable, tap, throwError } from 'rxjs';

@Service()
export class ParticipantService {
  private readonly url = 'http://localhost:9081/api/v1/participants';
  private http = inject(HttpClient);
  searchTerm: string = '';
  loading = false;
  errorMessage = ''
  
  participantList: Participant[] = []
  
  
  get filteredParticipants(): Participant[] {
    if (!this.searchTerm) {
      return this.participantList;
      }
    return this.participantList.filter(participant =>
      participant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      participant.bic.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  loadParticipants(): Observable<Participant[]> {
    this.loading = true;
    this.errorMessage = '';

    return this.http
      .get<{ success: boolean; institutions: Participant[] }>(this.url)
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error('Failed to load participants');
          }

          return response.institutions;
        }),
        tap(participants => {
          this.participantList = participants;
        }),
        catchError(error => {
          console.error('Failed to load participants:', error);
          this.errorMessage = 'Could not connect to the backend';
          return throwError(() => error);
        }),
        finalize(() => {
          this.loading = false;
        })
      );
  }
  getParticipantById(id: string): Participant | undefined {
    return this.participantList.find(p => p.id === id);
  }

  updateParticipant(id: string, participant: Participant): Observable<Participant[]> {
    return this.http.put<Participant[]>(`${this.url}/${id}`, participant)
  }

  createParticipant(participant: Participant): Observable<Participant[]>{
    return this.http.post<Participant[]>(this.url, participant)
  }

  deleteParticipant(id: string): Observable<Participant[]> {
    return this.http.delete<Participant[]>(`${this.url}/${id}`)
  }
}
