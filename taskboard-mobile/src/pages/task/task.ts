import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject, } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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
  accoutData;

  constructor(public af:AngularFireAuth,private database: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
     this.accoutData = this.navParams.get('accoutData');
     //const tt = this.af.auth.currentUser.email;
   //  console.log('current user email',tt)
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
    console.log('passed data->',this.accoutData);
    
  }



}
