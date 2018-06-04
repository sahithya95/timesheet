import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,public auth:AuthService) {}

    canActivate(): boolean {
      if (!this.auth.loginwithGoogle()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
    
    
}






