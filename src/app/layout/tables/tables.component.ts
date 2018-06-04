import { Employees } from './../../employees';
import { FirebaseService } from './../../firebase.service';
import { Component, OnInit, Inject } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';


@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
/*
    name: string;
    task: string;
    date: any=new Date();
    hours: any;

    employees = [
        {
            name: 'p1',
            task: "do some task",
            date: "2018-01-01",
            hours: 3

        }, {
            name: 'p2',
            task: "do some task",
            date: "2017-03-03",
            hours: 3
        }, {
            name: 'p3',
            task: "do some task",
            date: "2010-04-03",
            hours: 3
        }
    ]*/
    employees: any[] = [];
    itemsCollection:AngularFirestoreCollection<Employees>;

    constructor(public dialog: MatDialog,public firebaseservice:FirebaseService,public afs:AngularFirestore) {}

   
    ngOnInit() {  this.firebaseservice.gettimesheet().subscribe(timesheet=>{ 
        this.employees = timesheet;
        console.log(this.employees);
    }) }

    
    newTableDialog(): void {
        let dialogRef = this.dialog.open(DialogOverview, {
          width: '450px'
        });
    
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          this.addEntry(result);
        });
      }
      addEntry(item:Employees){
        console.log(item);
        this.itemsCollection = this.afs.collection<Employees>('timesheet');
        this.itemsCollection.add(item);
        }
        ///////////////////////////////////////////////////////

    edittableDialog(event,item,indx,i): void {
        let dialogRef = this.dialog.open(Editdialog, {
          width: '450px',
          data:{name:item.name,task:item.task,date:item.date,hours:item.hours}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          console.log(indx)

          this.editEntry(result, indx,i);
        });
      }
    editEntry(result,indx,i){
        // console.log(indx)
        this.employees[i].data.name = result.name;
        this.employees[i].data.task = result.task;
        this.employees[i].data.date = result.date;
        this.employees[i].data.hours=result.hours;
        this.firebaseservice.edittimesheet(result,indx);


    }
    deletetable(event,item) {

this.firebaseservice.deletetimesheet(item);
    }
    
}

    export interface User {
        name : string;
        task : string;
        date : string;
        hours:any;
    }
    
    @Component({
        selector: './dialogoverview.component.html',
        templateUrl:'./dialogoverview.component.html',
      })
      export class DialogOverview{
      
        constructor(public firebaseservice:FirebaseService,
          public dialogRef: MatDialogRef<DialogOverview>,
          @Inject(MAT_DIALOG_DATA) public tata: User) { }
            projects: any[]= [];
            private data = {}

            ngOnInit() {this.firebaseservice.getPro().subscribe(projects=>{ 
                this.projects = projects;
                console.log(this.projects);

            })}
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
          @Inject(MAT_DIALOG_DATA) public data:any) { }
            
        onNoClick(): void {
          this.dialogRef.close();
        }
      
    }

  
