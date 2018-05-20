import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Account } from '../models/ account/ account.interface';
import { LoginResponse } from '../models/login/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth) { }

  singOut(){
    this.auth.auth.signOut();
  }

  getAuthenticatedUser(){
    return this.auth.authState;
  }


  async signInWithEmailAndPassword(account:Account){
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
  
  public async createUserWithEmailAndPassword(account){
    try {
      return <LoginResponse>{
        result:await this.auth.auth.createUserWithEmailAndPassword(account.email,account.password)
      }
    } catch (error) {
      return <LoginResponse>{
        error:error
      }
    }
  }

}
