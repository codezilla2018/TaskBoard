import { TaskI } from '../../models/task/task.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { UserI } from '../../models/user/user.interface';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  Http,
  Response,
  Jsonp,
  URLSearchParams
} from '@angular/http';
import { Account } from '../../models/ account/ account.interface';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  accoutData: Account;
  userItemRef$: AngularFireList<UserI>
  userUpdateRef: AngularFireObject<UserI>
  userList=[] as UserI[];
  taskList=[] as TaskI[];
  url = 'https://taskboard-fcee7.firebaseio.com/db.json';
  constructor(private http: Http, private database: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.accoutData = this.navParams.get('accoutData');
    this.userItemRef$ = this.database.list('/db/users/');
    //const tt = this.af.auth.currentUser.email;
    //  console.log('current user email',tt)

    let email = 'dhanuka@gmail.com';

    this.userItemRef$.valueChanges().subscribe(s => {
      console.log(s);
      this.userList =s;

      if(s.length > 0){
        console.log(this.userList.length)

        for(let i=0 ; i<this.userList.length;i++){
          if(this.userList[i].email == email){
            console.log('users task',this.userList[i].tasks)
            this.taskList = this.userList[i].tasks;
          }
        }
      }

  

    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
    console.log('passed data->', this.accoutData);

    let email = 'dhanuka@gmail.com'
    /*for(let i = 0 ; i<this.userList.length; i++){
      console.log('inside loop')
      if(this.userList[i].email === email){
        console.log(this.userList[i].tasks);
      }
    }*/


  }

  updateStatusStart(s:TaskI){
    console.log('update status')
    console.log(s);
    s.status = 'In Progress'
  }

  updateStatusStop(s:TaskI){
    console.log('update status')
    console.log(s);
    s.status = 'Stop'
  }

  updateStatusComplete(s:TaskI){
    console.log('update status')
    console.log(s);
    s.status = 'Complete'
  }


}
