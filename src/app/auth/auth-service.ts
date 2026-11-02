
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  scope?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =
    `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {

    const body = {
      username,
      password,
      grant_type: 'password',
      client_id: 'acs_apis_client_api'
    };

    return this.http.post<LoginResponse>(
      this.apiUrl,
      body
    ).pipe(
      tap(response => {
        sessionStorage.setItem(
          'accessToken',
          response.access_token
        );

        if (response.refresh_token) {
          sessionStorage.setItem(
            'refreshToken',
            response.refresh_token
          );
        }

        console.log('Login successful');
        console.log(
          'Token saved:',
          !!sessionStorage.getItem('accessToken')
        );
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    sessionStorage.clear();
    window.location.href = '/login';
  }
}
