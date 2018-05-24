
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Account} from '../../models/ account/ account.interface';
import { AuthProvider} from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';

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
  constructor(private toastCtrl: ToastController,private afAuth:AuthProvider,public navCtrl: NavController, public navParams: NavParams) {
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
      let toast = this.toastCtrl.create({
        message: 'Login Sucessfull',
        duration: 2500,
        position: 'bottom'
      })
      toast.present();
    } else{
      let toast = this.toastCtrl.create({
        message: loginResponse.error.message,
        duration: 2500,
        position: 'bottom'
      })
      toast.present();
    }


  }
  navigateToTaskPage(){
    this.navCtrl.push('TaskPage');
  }
}
