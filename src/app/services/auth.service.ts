import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  token: any
  constructor(private router: Router) { 
   this.token=  localStorage.getItem('tok')
  }
    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (!this.token) {
            console.log('No estás logueado');
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}

