import { durationsList } from './../data/durations.data';
import { UserI } from './../models/user/user.interface';
import { TaskI } from './../models/task/task.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList, AngularFireObject, } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database-deprecated";
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  task = {} as TaskI;
  taskItemRef$: AngularFireList<TaskI>;
  userItemRef$: AngularFireList<UserI>
  userUpdateRef: AngularFireObject<UserI>

  constructor(private database: AngularFireDatabase, public userService: UserServiceService) {
    this.taskItemRef$ = this.database.list('/db/tasks/');
    this.userItemRef$ = this.database.list('/db/users/');
   


  }
  myControl: FormControl = new FormControl();

  options = [];
  durations = durationsList;

  filteredOptions: Observable<string[]>;
  ngOnInit() {

    this.userItemRef$.valueChanges().subscribe(res => {

      this.users = res;
      
      console.log(this.users);
      for (let i = 0; i < res.length; i++) {
        let name = this.users[i].firstName + " " + this.users[i].lastName;
        this.options.push(name);

      }
      let arr = [];

      this.userItemRef$.snapshotChanges().subscribe(s => {
        console.log('dd', s.map(sp => {
          console.log('k', sp.key);
          arr.push(sp.key);
        }))
        console.log('sss', arr);
        
        for (let i = 0; i < arr.length; i++) {
          console.log('trace check -- >',this.users[i].uid);
         if(this.users[i].uid === undefined){
           console.log('uid trobule on');
           this.users[i].uid = '';
           this.users[i].uid = arr[i];
         }else{
          console.log('uid trobule off');
          this.users[i].uid = arr[i];
         }
         
         
        }

  
      })

      

    
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filter(val))
        );
    });









  }
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  selectedValue: string;

  users = [] as UserI[];

  getCurrentDate(dt: Date): string {
    let today = Date();

    let y = today.split(' ')[3];
    let m = today.split(' ')[1];
    let d = today.split(' ')[2];

    switch (m) {
      case 'Jan':
        m = '01';
        break;
      case 'Feb':
        m = '02';
        break;
      case 'Mar':
        m = '03';
        break;
      case 'Apr':
        m = '04';
        break;
      case 'May':
        m = '05';
        break;
      case 'Jun':
        m = '06';
        break;
      case 'Jul':
        m = '07';
        break;
      case 'Aug':
        m = '08';
        break;
      case 'Sep':
        m = '09';
        break;
      case 'Oct':
        m = '10';
        break;
      case 'Nov':
        m = '11';
        break;
      case 'Dec':
        m = '12';
        break;
    }

    return y + '-' + m + '-' + d;
  }

  findUid(fName:string,lName:string){
    for(let i=0; i<this.users.length;i++){
      
      if(this.users[i].firstName ==fName && this.users[i].lastName == lName){
        return this.users[i].uid;
      }
    }


  }

  updateUser(uid:string){
    this.userUpdateRef = this.database.object(`/db/users/${uid}`);
  }

  createTask() {

    console.log('add task');
    //console.log(this.task);
    this.task.date = this.getCurrentDate(this.task.date);

    let nameSplit = this.task.user.split(" ");
    console.log('name split :',nameSplit);
    let current_uid = this.findUid(nameSplit[0],nameSplit[1]);
    
    for(let i=0;i<this.users.length; i++){
      if(this.users[i].uid == current_uid){
        console.log('i am going to push',this.task);
        console.log('ddddddddd',this.users[i].tasks);
        if(this.users[i].tasks === undefined ){
          this.users[i].tasks = [];
          this.users[i].tasks.push(this.task);
          this.userUpdateRef = this.database.object(`/db/users/${this.users[i].uid}`);
          this.userUpdateRef.update(this.users[i]);

        }else {
          this.users[i].tasks.push(this.task);
          this.userUpdateRef = this.database.object(`/db/users/${this.users[i].uid}`);
          this.userUpdateRef.update(this.users[i]);
        }
       // this.users[i].tasks.push(this.task);
      }
    }
    



    console.log('task object',this.task);
    console.log('user object', this.users);
    //this.taskItemRef$.push(this.task);
    //this.task = {} as TaskI;
  }
}
