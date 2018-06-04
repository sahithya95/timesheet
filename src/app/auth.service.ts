import { AuthData } from './authdata';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';



// interface User {
//   admin:boolean;
//   uid: string;
//   email: string;
//   employId : string,
//   location : string
//   name : string
// }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: Observable<User>;
//  isAdmin = new BehaviorSubject<boolean>(false);

//   private user: User | null = null;
//     private userEmail : string | null = null;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private db:FirebaseService) {} 

              loginwithGoogle(){
                  console.log("ran");
                  return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
              }

              logout() {
                console.log("logout")
               return this.afAuth.auth.signOut();

              }


            //   login(authData: AuthData) {
            //     this.db.loginUser(authData.email, authData.password)
            //       .then(result => {
            //         console.log(result.user.email);
            //         //get user info for uid
            //         let userEmail = result.user.email
            //         // this.getUserInfo(userEmail);
        
            //       })
            //       .catch(error => {
            //         console.log(error);
            //         return null
            //       });
            // }
        
            // logout() {
            //     this.user = null;
            // }
        
            // getUserInfo(email){
            //     console.log("AuthService.getUserInfo(uid: any) ")
            //     this.db.document('resources',email)
            //     .subscribe(
            //         (res : User ) => {
            //             console.log(res)
            //         //success route to home
            //         this.userEmail = email;
            //         this.user  = res 
            //         this.isAdmin.next(this.user.admin); 
            //         this.router.navigate(['/app/projects']);
            //         },
            //         (err)=>{
            //             console.log(err)
        
            //         }
            //     )
            // }
        
            // getUser() {
            //     return { ...this.user }
            // }
        
            // getUserId() {
            //     return this.userEmail
            // }
        
            // //returns true when user exists
            // isAuth() {
            //     console.log("is auth",this.user)
            //     return this.user !== null;
            // }
        










      //// Get auth data, then get firestore user document || null
  //     this.user = this.afAuth.authState
  //       .switchMap(user => {
  //         if (user) {
  //           return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
  //         } else {
  //          return Observable.of(null);
  //         }
  //       })
  // }
  // googleLogin() {
  //   const provider = new firebase.auth.GoogleAuthProvider()

  //   return this.oAuthLogin(provider);
  // }

  // private oAuthLogin(provider) {
  //   return this.afAuth.auth.signInWithPopup(provider)
  //     .then((credential) => {
  //       this.updateUserData(credential.user)
  //     })
  // }

  // private updateUserData(user) {
  //   // Sets user data to firestore on login

  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const data: User = {
  //     uid: user.uid,
  //     email: user.email,
  //   }
  //   return userRef.set(data, { merge: true })
  // }

  // signOut() {
  //   this.afAuth.auth.signOut().then(() => {
  //       this.router.navigate(['/']);
  //   });
  // }
}
