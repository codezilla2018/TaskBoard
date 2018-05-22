import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PageStateService } from '../services/page-state.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afauth: AuthService, private router: Router,public pg:PageStateService) { }
  logged: boolean = false;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    this.afauth.getAuthenticatedUser().subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        if(this.pg.getPage() == ""){
          this.router.navigate(['/dashboard']);
        }else if (this.pg.getPage() == "task"){
          this.router.navigate(['/dashboard']);
        }else if (this.pg.getPage() == "user"){
          this.router.navigate(['/dashboard/users']);
        }else if (this.pg.getPage() == "settings"){
          this.router.navigate(['/dashboard/settings']);
        }
       
        this.logged = true;
      } else {
        console.log('user not logged in');
        this.router.navigate(['/login']);
        this.logged = false;
      }
    });
    return this.logged;
    //return this.afauth.isAuthenticated();
  }
}
