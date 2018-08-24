import { Observable } from 'rxjs';
// import 'rxjs/operator/map';
import 'rxjs/add/operator/map';

import { Employees } from './employees';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import { Injectable } from '@angular/core';


import { AngularFireAuth } from 'angularfire2/auth';
interface user1{
  email:string;
  id:string;
  password:string;
}
// 

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  itemsCollection:AngularFirestoreCollection<Employees>;
  resources: Observable<any>;
  itemdoc:AngularFirestoreDocument<any>;
  projects: Observable<any>;
  timesheet:Observable<any>;
  user:Observable<any>;
  

  constructor(public afs:AngularFirestore,public afAuth : AngularFireAuth) {
    
  }
getEmp(){
  // return this.afs.collection('resources').valueChanges();

 return this.afs.collection('resources').snapshotChanges().map(actions => {
  // console.log(actions);
  return  actions.map(obj => {
    // console.log(obj.pay)
    return {
      id: obj.payload.doc.id,
      data: obj.payload.doc.data() as Employees
    }
  });
  });
  }
  getPro(){
  
   return this.afs.collection('projects').snapshotChanges().map(actions => {
    // console.log(actions);
    return  actions.map(obj => {
      // console.log(obj.pay)
      return {
        id: obj.payload.doc.id,
        data: obj.payload.doc.data() as Employees
      }
    });
    }); 
    }

    gettimesheet(){
  
      return this.afs.collection('timesheet').snapshotChanges().map(actions => {
       // console.log(actions);
       return  actions.map(obj => {
         // console.log(obj.pay)
         return {
           id: obj.payload.doc.id,
           data: obj.payload.doc.data() as Employees
         }
       });
       }); 
       }
       getuser(){
  
        return this.afs.collection('user').snapshotChanges().map(actions => {
         return  actions.map(obj => {
           return {
             id: obj.payload.doc.id,
             data: obj.payload.doc.data()
           }
         });
         }); 
         }


  deleteitem(item:Employees){
    console.log(item);
    this.itemdoc= this.afs.doc(`resources/${item.id}`);
    console.log(item.id);
    this.itemdoc.delete();
  }
  
  deleteproject(item:Employees){
    console.log(item);
    this.itemdoc= this.afs.doc(`projects/${item.id}`);
    console.log(item.id);
    this.itemdoc.delete();
  }
  deletetimesheet(item:Employees){
    console.log(item);
    this.itemdoc= this.afs.doc(`timesheet/${item.id}`);
    console.log(item.id);
    this.itemdoc.delete();
  }


  editEntry(item:Employees,id){
    console.log(id);
    console.log(item);
    this.itemdoc= this.afs.doc(`resources/${id}`);
    console.log(`resources/${id}`);
    // console.log(item);
    this.itemdoc.update(item);

  }


  editProEntry(item:Employees,id){
    console.log(id);
    console.log(item);
    this.itemdoc= this.afs.doc(`projects/${id}`);
    // console.log(`resources/${id}`);
    // console.log(item);
    this.itemdoc.update(item);

  }
  edittimesheet(item:Employees,id){
    console.log(id);
    console.log(item);
    this.itemdoc= this.afs.doc(`timesheet/${id}`);
    // console.log(`resources/${id}`);
    // console.log(item);
    this.itemdoc.update(item);

  }
  update(name:Employees,id){
    console.log(id,name);
    this.itemdoc= this.afs.doc(`timesheet/${id}`);
    console.log(`timesheet/${id}`);
    this.itemdoc.update(name);

  }
  // connect(collectionName){
  //   return this.afs.collection(collectionName)
  // }

  // //returns valuechanages
  // document(collectionName, document){
  //   return this.connect(collectionName)
  //   .doc(document)
  //   .valueChanges()
  // }
  // registerUser(resourceEmail){
  //   return this.afAuth.auth
  //   .createUserWithEmailAndPassword(resourceEmail, 'pacewisdom')
  // }

  // loginUser(email, password){
  //   return this.afAuth.auth
  //   .signInWithEmailAndPassword(email, password)
  // }
}

  
