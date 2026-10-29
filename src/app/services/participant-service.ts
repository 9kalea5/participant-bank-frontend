import { inject, Injectable, signal } from '@angular/core';
import { Participant } from '../models/participant.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, Observable, tap, throwError, timeout } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ParticipantService {
  private readonly url = 'http://localhost:9081/api/v1/participants';
  private http = inject(HttpClient);
  searchTerm: string = '';
  loading = false;
  errorMessage = signal('');
  successMessage = signal('');
  private readonly requestTimeout = 10_000
  private messageTimeout: ReturnType<typeof setTimeout> | null = null;

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
  this.errorMessage.set('');

  console.log('Starting GET request:', this.url);

  return this.http
    .get<{
      status: string;
      message: string;
      success: string;
      institutions: Participant[];
    }>(this.url)
    .pipe(
      timeout(this.requestTimeout),

      tap(response => {
        console.log('Raw API response:', response);
      }),

      map(response => {
        if (response.status !== 'SUCCESS') {
          throw new Error(
            response.message || 'Failed to load participants'
          );
        }

        return response.institutions ?? [];
      }),

      tap(participants => {
        this.participantList = participants;
        console.log('Participants loaded:', participants.length);
      }),

      catchError(error => {
        console.error('Failed to load participants:', error);

        if (error.name === 'TimeoutError') {
          this.showError('The request timed out after 10 seconds.');
        }

        return throwError(() => error);
      }),

      finalize(() => {
        this.loading = false;
        console.log('Loading finished. Service loading:', this.loading);
      })
    );
}

  getParticipantById(id: string): Participant | undefined {
    return this.participantList.find(p => String(p.id) === id);
  }

  updateParticipant(id: string, participant: Participant): Observable<Participant[]> {
    return this.http.put<Participant[]>(`${this.url}/${id}`, participant)
                    .pipe(timeout(this.requestTimeout))
  }

  createParticipant(participant: Participant): Observable<Participant[]>{
    return this.http.post<Participant[]>(this.url, participant)
                    .pipe(timeout(this.requestTimeout))

  }

  deleteParticipant(id: number | string): Observable<Participant[]> {
    return this.http.delete<Participant[]>(`${this.url}/${id}`)
                    .pipe(timeout(this.requestTimeout))

  }
  showSuccess(message: string): void {
    this.scheduleMessageClear();
    this.successMessage.set(message);
    this.errorMessage.set('');
  }

  showError(message: string): void {
    this.scheduleMessageClear();
    this.errorMessage.set(message);
    this.successMessage.set('');
  }

  clearMessages(): void {
    if (this.messageTimeout !== null) {
      clearTimeout(this.messageTimeout);
      this.messageTimeout = null;
    }

    this.successMessage.set('');
    this.errorMessage.set('');
  }

  private scheduleMessageClear(): void {
    if (this.messageTimeout !== null) {
      clearTimeout(this.messageTimeout);
    }

    this.messageTimeout = setTimeout(() => {
      this.successMessage.set('');
      this.errorMessage.set('');
      this.messageTimeout = null;
    }, 1000);
  }

  addLogo(id: number | string, file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('logo', file)

    return this.http.post(`${this.url}/${id}/logo`, formData)
          .pipe(timeout(this.requestTimeout))
  }
}
