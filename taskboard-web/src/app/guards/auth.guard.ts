import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afauth: AuthService, private router: Router) { }
  logged: boolean = false;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    this.afauth.getAuthenticatedUser().subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.router.navigate(['/dashboard']);
        this.logged = true;
      } else {
        console.log('user not logged in');
        this.router.navigate(['/login']);
        this.logged = false;
      }
    });
    return this.logged;
  }
}
