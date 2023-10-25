import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { APP_CONSTS } from '../../config/consts';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from 'src/app/core/auth/store/auth.selectors';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  public navItems : any[] = [];

  constructor(private http: HttpClient,private store : Store,private auth : AuthService){
  }

  ngOnInit() {
    this.loadNavigationData().subscribe((data) => {
      this.navItems = data
      console.log(this.navItems)
    });
  }

  logout(){
    this.auth.logout()
  }

  loadNavigationData(): Observable<any> {
    return this.http.get<any>(APP_CONSTS.DATA_PATH.navigation);
  }

}
