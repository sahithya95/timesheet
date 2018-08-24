// import { UserService } from './user.service';
// import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';
// import { Router } from '@angular/router';
// import { AuthService } from '../../auth.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private router: Router,public userservice:UserService) {}

//     canActivate(): boolean {
//       if (!this.userservice.getCurrentUser()) {
//         this.router.navigate(['login']);
//         return false;
//       }
//       return true;
//     }
    
    
// }
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        this.router.navigate(['/dashboard']);
        return resolve(false);
      }, err => {
        return resolve(true);
      })
    })
  }
}





