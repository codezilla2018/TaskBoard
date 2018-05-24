import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {LoginResponse} from '../../models/login/login-response.interface';
import {Account} from '../../models/ account/ account.interface';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private auth:AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  async signInWithEmailAndPassword(account:Account){
    console.log('service acc',account);
    try {
      return <LoginResponse>{
        result: await this.auth.auth.signInWithEmailAndPassword(account.email,account.password)
      }
    } catch (error) {
      return <LoginResponse>{
        error:error  
      }
    }
  }

  singOut(){
    this.auth.auth.signOut();
  }

  getAuthenticatedUser(){
    return this.auth.authState;
  }



}
