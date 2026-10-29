import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ParticipantService } from '../services/participant-service';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const participantService = inject(ParticipantService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      participantService.showError(
        error instanceof HttpErrorResponse
          ? getFriendlyErrorMessage(error)
          : 'Something went wrong while communicating with the server. Please try again.'
      );
      return throwError(() => error);
    })
  );
};

function getFriendlyErrorMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Unable to connect to the server. Please check your connection and try again.';
  }

  if (error.status >= 500) {
    return 'The server is currently unavailable. Please try again later.';
  }

  if (error.status === 401) {
    return 'Your session has expired. Please sign in again.';
  }

  if (error.status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (error.status === 404) {
    return 'The requested participant could not be found.';
  }

  if (error.status >= 400) {
    return 'The request could not be completed. Please check the entered information.';
  }

  return 'Something went wrong. Please try again.';
}
