import { UserI } from './../models/user/user.interface';
import { rolesList } from './../data/role.data';
import { genderList } from './../data/gender.data';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user = {} as UserI;
 userRef$: AngularFireList<UserI>;

  constructor(private database: AngularFireDatabase) {
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

  createUser(){
    console.log('add task');
    console.log(this.user);
    this.userRef$.push(this.user);
  }



}
