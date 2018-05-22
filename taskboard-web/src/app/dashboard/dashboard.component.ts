import { PageStateService } from './../services/page-state.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public afAuth: AuthService, private router: Router,public pg:PageStateService) { }

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
   
  }

  navToUsers(){
    this.pg.setPage("users")
    console.log(this.pg.getPage());
    this.router.navigate(['/dashboard/users']);
  }

  navToSettings(){
    this.pg.setPage("settings")
    console.log(this.pg.getPage());
    this.router.navigate(['/dashboard/settings']);
  }
  
}
