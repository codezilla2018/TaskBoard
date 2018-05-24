
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Account} from '../../models/ account/ account.interface';
import { AuthProvider} from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  account = {} as Account;
  constructor(private afAuth:AuthProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async signIn(){
    console.log(this.account);

    

    const loginResponse=await this.afAuth.signInWithEmailAndPassword(this.account); 

    
    console.log(loginResponse);

    if(!loginResponse.error){
      
      //this.navParams.data()
      //this.navCtrl.push('TaskPage',{'accoutData':this.account});
      this.navCtrl.setRoot('TaskPage',{'accoutData':this.account});
    }


  }
  navigateToTaskPage(){
    this.navCtrl.push('TaskPage');
  }
}
