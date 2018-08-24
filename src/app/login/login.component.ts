import { Component, OnInit } from '@angular/core';
import { Router, Params} from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    employees: any[] = [];

    constructor(public fb:FormBuilder,public router: Router,public auth: AuthService,
        public firebaseservice:FirebaseService,public afs:AngularFirestore) {}
    form : FormGroup;
// public user$=this.auth.user;
    ngOnInit() {
        this.form =  this.fb.group({
         email : ['' , Validators.required],
        password : ['', Validators.required]
      });
      this.firebaseservice.getEmp().subscribe(resources=>{ 
        this.employees = resources;
        console.log(this.employees)
    });
    }
isadmin:boolean;
    loginwithGoogle(){
         this.auth.loginwithGoogle()
         .then(res => {
            console.log("loging")
            console.log(res.user.email)
           for(let i=0;i<this.employees.length;i++){
               console.log(this.employees[i].data.email)
                if(this.employees[i].data.email==res.user.email){
                    if(this.employees[i].data.role=="user"){
                    console.log("true")
                    this.auth.isadmin=false;
                    // this.auth.IsAdmin(this.isadmin)
                    this.router.navigate(['/tables']);
                    }
                    else{
                        this.auth.isadmin=true;
                        console.log(this.isadmin)
                        // this.auth.IsAdmin(this.isadmin)
                        this.router.navigate(['/dashboard']);


                    }
                }
           }
        
            // this.router.navigate(['/dashboard']);

                      })
        };
        
        
}
