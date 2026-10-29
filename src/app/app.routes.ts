import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'participant',
        loadComponent: () => import('./participant-component/participant-component').then(m => m.ParticipantComponent),
        title: 'Participant'},
    {path: 'participant/new',
        loadComponent: () => import('./form-component/form-component').then(m => m.FormComponent),
        title: 'Add Participant'},
    {path: 'participant/:id',
        loadComponent: () => import('./form-component/form-component').then(m => m.FormComponent),
        title: 'Edit Participant'},
    {path: 'participant/edit/:id',
        loadComponent: () => import('./form-component/form-component').then(m => m.FormComponent),
        title: 'Edit Participant'},
];
