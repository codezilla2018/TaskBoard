import { Injectable } from '@angular/core';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userListRef$: AngularFireList<User[]>;

  constructor(private database: AngularFireDatabase) { 
    this.userListRef$ = this.database.list('/db/users/');
  }

  getUserList(){
    return this.userListRef$;
  }
}
