import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectLoggedInUser} from 'src/app/core/auth/store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class EmployerGuard implements CanActivate {
    constructor(private store: Store) {}
  
    canActivate(): Observable<boolean> {
      return this.store.select(selectLoggedInUser).pipe(
        map((user) => {
          return user?.Role === 'Employer';
        })
      );
    }
  }