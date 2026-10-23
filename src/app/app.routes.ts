import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'participant',
        loadComponent: () => import('./participant-component/participant-component').then(m => m.ParticipantComponent),
        title: 'Participant'},
    {path: 'participant/new',
        loadComponent: () => import('./new-participant/new-participant').then(m => m.NewParticipant),
        title: 'Add Participant'},
];
