import { Component, OnInit ,HostBinding} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { Account } from '../models/ account/ account.interface';
import { LoginResponse } from '../models/login/login-response.interface';
import { AuthService } from '../services/auth.service';

import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(public afAuth: AuthService,private router:Router) { }

  account = {} as Account;

  async login() {

    console.log(this.account);
    const loginResponse = await this.afAuth.signInWithEmailAndPassword(this.account);
    console.log(loginResponse);

    if (!loginResponse.error) {
      console.log("Sucess Login !");
      this.router.navigateByUrl('/dashboard');

    } else {
      console.log("Login Fail!")
    }

  }
  signOut(){
    this.afAuth.singOut();
  }

  ngOnInit() {
    this.afAuth.getAuthenticatedUser().subscribe(res =>{
      if (res && res.uid) {
        console.log('user is logged in');
        this.router.navigate(['/dashboard']);
       
      } else {
        console.log('user not logged in');
        this.router.navigate(['/login']);
       
      }
    })
  }

}
