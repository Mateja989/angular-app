import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { selectIsLoggedIn } from 'src/app/core/auth/store/auth.selectors';
import { APP_CONSTS } from 'src/app/shared/config/consts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    isLoggedIn$ = this.store.select(selectIsLoggedIn);
    public navItems : any[] = []

    constructor(private store: Store,private auth : AuthService,private http: HttpClient) {}

    logout(){
      this.auth.logout()
    }

    ngOnInit() {
      this.loadNavigationData().subscribe((data) => {
        this.navItems = data
        console.log(this.navItems)
      });
    }
  
    loadNavigationData(): Observable<any> {
      return this.http.get<any>(APP_CONSTS.DATA_PATH.navigation);
    }
}
