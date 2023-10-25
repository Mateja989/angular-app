import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectIsLoggedIn } from 'src/app/core/auth/store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
    constructor(private store: Store, private router: Router) {}
  
    canActivate(): boolean {
      let isLoggedIn = false;
  
      this.store.pipe(select(selectIsLoggedIn)).subscribe((loggedIn) => {
        isLoggedIn = loggedIn;
      });
  
      if (!isLoggedIn) {
        console.log('ulogovan korisnik ne sme da pritupu')
        return true;
      } else {
        console.log('ulogovan korisnik ne sme da pritupu')
        this.router.navigate(['/home']);
        return false;
      }
    }
  }
