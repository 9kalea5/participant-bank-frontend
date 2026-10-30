import { Service } from '@angular/core';

@Service()
export class AuthService {

  login(): void{
    sessionStorage.setItem('isLoggedIn', 'true')
  }

  isLoggedIn(): boolean{
    return sessionStorage.getItem('isLoggedIn') === 'true'
  }

  logout(): void{
    sessionStorage.removeItem('isLoggedIn')
  }
}
