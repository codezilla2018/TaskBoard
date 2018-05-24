import { PageStateService } from './../services/page-state.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,public afAuth: AuthService, private router: Router,public pg:PageStateService) { }
  showFiller = false;
  ngOnInit() {
  }
  signOut() {
    this.afAuth.singOut();
    this.router.navigate(['/login']);
  }


  navToTask(){
    this.pg.setPage("tasks")
    console.log(this.pg.getPage());
    this.router.navigate(['/dashboard']);
    this.snackBar.open('Task Page', 'Ok', {
      duration: 2000,
    });
  }

  navToUsers(){
    this.pg.setPage("users")
    console.log(this.pg.getPage());
    this.router.navigate(['/dashboard/users']);
    this.snackBar.open('Users Page', 'Ok', {
      duration: 2000,
    });
  }

  navToSettings(){
    this.pg.setPage("settings")
    console.log(this.pg.getPage());
    this.router.navigate(['/dashboard/settings']);
    this.snackBar.open('Settings Page', 'Ok', {
      duration: 2000,
    });
  }

 

  
}
