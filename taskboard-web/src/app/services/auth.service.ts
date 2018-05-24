import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Account } from '../models/ account/ account.interface';
import { LoginResponse } from '../models/login/login-response.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string;

  constructor(public auth:AngularFireAuth) { }

  singOut(){
    this.auth.auth.signOut();
  }

  getAuthenticatedUser(){
    return this.auth.authState;
  }


  async signInWithEmailAndPassword(account:Account){
    try {
       await this.auth.auth.signInWithEmailAndPassword(account.email,account.password)
       .then(response =>{
        this.auth.auth.currentUser.getIdToken()
        .then(
          (token:string)=> this.token=token
        )
       })

      return <LoginResponse>{
        result: await this.auth.auth.signInWithEmailAndPassword(account.email,account.password)
      }
    } catch (error) {
      return <LoginResponse>{
        error:error  
      }
    }
  }
  
   async createUserWithEmailAndPassword(account){
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

getToken(){
  this.auth.auth.currentUser.getIdToken().then(
    (token:string)=>this.token =token
  )
  return this.token;
}

isAuthenticated(){
  return this.token !=null;
}

}
