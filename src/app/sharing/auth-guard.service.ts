import {Injectable} from '@angular/core';
import {Router, CanActivate, CanLoad, CanActivateChild} from '@angular/router'
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad, CanActivateChild {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  canActivate(): boolean {
    let result = this.auth.isAuthenticated();
    if (result) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    let result = this.auth.isAuthenticated();
    if (result) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    let result = this.auth.isAuthenticated();
    if (result) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
