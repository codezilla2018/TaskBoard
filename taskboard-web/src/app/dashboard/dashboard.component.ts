import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public afAuth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  signOut() {
    this.afAuth.singOut();
    this.router.navigate(['/login']);
  }

  
}
