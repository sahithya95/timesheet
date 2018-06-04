import { Employees } from './../../employees';
import { FirebaseService } from './../../firebase.service';
import { Component, OnInit, Inject } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [routerTransition()]

})
export class ProjectComponent implements OnInit {
  // name: string;
  // employees = [
  //   { name: 'p1' }, { name: 'p2' }, { name: 'p3' }]
employees: any[] = [];
itemsCollection:AngularFirestoreCollection<Employees>;
pname:any[];
emp:any[]=[];
updatename:any[];
constructor(public dialog: MatDialog,public firebaseservice:FirebaseService,public afs:AngularFirestore) {}
ngOnInit() { 
  this.firebaseservice.getPro().subscribe(projects=>{ 
    this.employees = projects;
    console.log(this.employees)
});
this.firebaseservice.gettimesheet().subscribe(timesheet=>{ 
  this.emp = timesheet;
  console.log(this.emp)
})
}

  
  newProjectDialog(): void {
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
    this.itemsCollection = this.afs.collection<Employees>('projects');
    this.itemsCollection.add(item);
    }


/////////////////////////////////////////////////////////////////


  editProjectDialog(event,item,indx,i): void {
    let dialogRef = this.dialog.open(Editdialog, {
      width: '450px',
      data: { name: item.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      console.log(indx)

      this.editEntry(result, indx,i);
    });
  }
  editEntry(result, indx,i) {
    // console.log(indx)
    // console.log(this.employees[i].data.name);
    this.pname=this.employees[i].data.name;
    console.log(this.pname);
    console.log(result);
    this.updatename=result.name;


    this.employees[i].data.name = result.name;
    this.firebaseservice.editProEntry(result,indx);


    // console.log(this.emp);
    for (let entry of this.emp) {
      // console.log(entry.data.name); 
      if(entry.data.name==this.pname){
        // console.log("trueee");
        console.log(entry.name=this.updatename);
        console.log(this.emp)
        console.log(entry.id);
        this.firebaseservice.update(entry,entry.id);
      }
  }
  }

  deleteProject(event,item) {
    console.log(item);
    this.firebaseservice.deleteproject(item);
    //this.employees.splice(index, 1);
    
}

}

export interface User {
  name: string;

}

@Component({
  selector: './dialogoverview.component.html',
  templateUrl: './dialogoverview.component.html',
})
export class DialogOverview {

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
  templateUrl: './editdialog.component.html',
})
export class Editdialog {

  constructor(
    public dialogRef: MatDialogRef<Editdialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}










