import { TaskI } from './../models/task/task.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  task = {} as TaskI;
  taskItemRef$: AngularFireList<TaskI>;


  constructor(private database: AngularFireDatabase) {
    this.taskItemRef$ = this.database.list('/db/tasks/');
  }
  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
  ];



  filteredOptions: Observable<string[]>;
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
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

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  getCurrentDate(dt:Date):string{
    let today = Date();

    let y = today.split(' ')[3];
    let m = today.split(' ')[1];
    let d = today.split(' ')[2];

    switch(m){
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

    return y+'-'+m+'-'+d;
  }
  createTask(){
    console.log('add task');
    console.log(this.task);
    this.task.date = this.getCurrentDate(this.task.date);
  
    console.log(this.task);
    this.taskItemRef$.push(this.task);
    //this.task = {} as TaskI;
  }
}
