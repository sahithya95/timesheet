import { AuthData } from './authdata';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs';

import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
// import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/of';
// import { from, of, range } from 'rxjs/create';


import { map, filter, switchMap } from 'rxjs/operators';
import { OnInit } from '@angular/core';

export interface User{
  uid:string;
  email:string;

}
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  user: Observable<User>;
  // user:any[]=[];
  private userDetails: firebase.User = null;
  isadmin:boolean;
  constructor(private afAuth: AngularFireAuth,
    public firebaseservice:FirebaseService,
    public afs:AngularFirestore) {
  this.user=this.afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        return of(null)
      }
    })  )  
  }

              loginwithGoogle(){
                  return new Promise<any>((resolve, reject) => {
                    let provider = new firebase.auth.GoogleAuthProvider();
                    provider.addScope('profile');
                    provider.addScope('email');
                    this.afAuth.auth
                    .signInWithPopup(provider)
                    .then(res => {
                        resolve(res);
                     
                        this.updateUserData(res.user)
                    }, err => {
                      console.log(err);
                      reject(err);
                    })
                  })
              }
              private updateUserData(user) {
                // Sets user data to firestore on login
            
                const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
            
                const data: User = {
                  uid: user.uid,
                  email: user.email,
                 
                }
            
                return userRef.set(data, { merge: true })
            
              }
            
              logout() {
              //   console.log("logout")
              //  return this.afAuth.auth.signOut();
              return new Promise((resolve, reject) => {
                if(firebase.auth().currentUser){
                  this.afAuth.auth.signOut()
                  resolve();
                }
                else{
                  reject();
                }
              });
              
              }


              IsAdmin(admin){
                console.log(admin)
                if(admin){
                  // admin();
                    return true;
                }
                else{
                  console.log("fasle role= user")
                  return false;
                }
            }

            


}
