import { defaultPassword } from './../data/password.data';
import { element } from 'protractor';
import { LoginResponse } from './../models/login/login-response.interface';
import { Account } from './../models/ account/ account.interface';
import { UserI } from './../models/user/user.interface';
import { rolesList } from './../data/role.data';
import { genderList } from './../data/gender.data';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user = {} as UserI;
 userRef$: AngularFireList<UserI>;

  constructor(public snackBar: MatSnackBar,private database: AngularFireDatabase,public af:AuthService) {
    this.userRef$ = this.database.list('/db/users/');
   }
  
  ngOnInit() {this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );

    
  }
  myControl: FormControl = new FormControl();

  options = rolesList;

  gender = genderList;
  filteredOptions: Observable<string[]>;

 

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }
  error: any;

   async createUser(){
    console.log('add task');
    console.log(this.user);
    this.account.email = this.user.email;
    this.account.password = '123456'

    console.log(this.account);

    const loginResponse =  await this.af.createUserWithEmailAndPassword(this.account);
    console.log(loginResponse);

    if(!loginResponse.error){
      console.log('User created sucessfully');
      console.log(loginResponse.result.uid);
      this.userRef$.push(this.user);
      this.snackBar.open('User Created Sucessfully', 'Ok', {
        duration: 2000,
      });

      this.user = {};

    }else{
      console.log('user creation fail');
      this.snackBar.open('User creation Fail', 'Ok', {
        duration: 2000,
      });
    }
  
    

  }
  account={} as Account;
  

  createAccount(){
    this.account.email = this.user.email;
    this.account.password = defaultPassword;
    this.af.createUserWithEmailAndPassword(this.account);
    this.snackBar.open('User Created Sucessfully', 'Ok', {
      duration: 2000,
    });
  }


}
