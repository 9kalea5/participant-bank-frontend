import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },

  {
    path: 'participant',
    loadComponent: () =>
      import('./participant-component/participant-component')
        .then(m => m.ParticipantComponent),
    title: 'Participant',
    canActivate: [AuthGuard]
  },

  {
    path: 'participant/new',
    loadComponent: () =>
      import('./form-component/form-component')
        .then(m => m.FormComponent),
    title: 'Add Participant',
    canActivate: [AuthGuard]
  },

  {
    path: 'participant/edit/:id',
    loadComponent: () =>
      import('./form-component/form-component')
        .then(m => m.FormComponent),
    title: 'Edit Participant',
    canActivate: [AuthGuard]
  },

  {
    path: 'participant/:id',
    loadComponent: () =>
      import('./form-component/form-component')
        .then(m => m.FormComponent),
    title: 'Edit Participant',
    canActivate: [AuthGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];