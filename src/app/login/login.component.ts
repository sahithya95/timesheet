import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {


    constructor(public fb:FormBuilder,public router: Router,public auth: AuthService) {}
    form : FormGroup;
// public user$=this.auth.user;
    ngOnInit() {
        this.form =  this.fb.group({
         email : ['' , Validators.required,],
        password : ['', Validators.required]
      });
    }
    loginwithGoogle(){
        console.log('Login popup');
         this.auth.loginwithGoogle()
         .then(res => {
            console.log(res);
            this.router.navigate(['/dashboard']);
            console.log(res);
          })
        }
}
