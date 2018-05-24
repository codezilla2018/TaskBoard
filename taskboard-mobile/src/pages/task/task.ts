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
  userList: UserI[];
  url = 'https://taskboard-fcee7.firebaseio.com/db.json';
  constructor(private http: Http, private database: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.accoutData = this.navParams.get('accoutData');
    this.userItemRef$ = this.database.list('/db/users/');
    //const tt = this.af.auth.currentUser.email;
    //  console.log('current user email',tt)

    

    this.userItemRef$.valueChanges().subscribe(s => {
      console.log(s);
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



}
