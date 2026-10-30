import { inject, Service } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service';

@Service()
export class AuthGuard implements CanActivate{
  authService = inject(AuthService)
  router = inject(Router)
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true
    }
    return this.router.createUrlTree(['/login'])
  }
}
