import { Employees } from './../../employees';
import { FirebaseService } from './../../firebase.service';
import { Component, OnInit,Inject } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';

import 'rxjs/add/operator/map';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    
   /* name:string;
    location:string;
    email:any;

    employees = [
        {
            name: 'sahi',
            location:"mangalore",
            email:"pace@gmail.com"

        }, {
            name: 'sahicgh',
            location:"bangalore",
            email:"hgfhgpace@gmail.com"

        }, {
            name: 'smhgjhahi',
            location:"mangalore",
            email:"pacehgh@gmail.com"

        }


    ]*/
employees: any[] = [];
itemsCollection:AngularFirestoreCollection<Employees>;
itemdocum:AngularFirestoreDocument<Employees>;


    constructor(public dialog: MatDialog,public firebaseservice:FirebaseService,public afs:AngularFirestore) {}


    ngOnInit() {
        this.firebaseservice.getEmp().subscribe(resources=>{ 
            this.employees = resources;
            console.log(this.employees)
        })
        
    }
       
   newProjectDialog(): void {
        let dialogRef = this.dialog.open(DialogOverview, {
            width: '450px',
        });
    
    
        dialogRef.afterClosed().subscribe(result => {
         console.log('The dialog was closed', result);
         this.addEntry(result);
                });
    }
      
  

   addEntry(item:Employees){
        console.log(item);
        this.itemsCollection = this.afs.collection<Employees>('resources');
        this.itemsCollection.add(item);
        }
        
        deleteEmployee(event,item) {
            console.log(item);
            this.firebaseservice.deleteitem(item);
            //this.employees.splice(index, 1);
            
        }
        

///////////////////////////////edit///////////////////
    
    editProjectDialog(event,item,indx,i): void {
       //console.log(id);
        let dialogRef = this.dialog.open(Editdialog, {
          width: '450px',
          
          data:{name:item.name,location:item.location,email:item.email}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
        //  console.log(indx)

         this.editEntry(result,indx,i);
        });
      }
      editEntry(result,indx,i){
        console.log(indx)
        // console.log(indx);
        // console.log(result.name);
        this.employees[i].data.name=result.name;
        this.employees[i].data.location=result.location;
       
        this.employees[i].data.email=result.email;

        console.log(result);
        this.firebaseservice.editEntry(result,indx);


    }
    
   ////////edit end///////////////////////////////////
   

}

//////add ///////////////////////////////

export interface User {
    name : string;
    location : string;
    email : string;
}

@Component({
    selector: './dialogoverview.component.html',
    templateUrl:'./dialogoverview.component.html',
  })
  export class DialogOverview{
    constructor(
      public dialogRef: MatDialogRef<DialogOverview>,
      @Inject(MAT_DIALOG_DATA) public tata: User) { }
        
    private data = {}
    onNoClick(): void {
      this.dialogRef.close();
    }
  
}



@Component({
    selector: './editdialog.component.html',
    templateUrl:'./editdialog.component.html',
  })
  export class Editdialog{
  
    constructor(
      public dialogRef: MatDialogRef<Editdialog>,
      @Inject(MAT_DIALOG_DATA) public data1:any) { }
        
    onNoClick(): void {
      this.dialogRef.close();
    }
  
}






























