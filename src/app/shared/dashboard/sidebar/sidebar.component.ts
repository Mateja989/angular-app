import { Component } from '@angular/core';
import { APP_CONSTS } from '../../config/consts';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 
  public sidenavItems : any[] = [];

  constructor(private http: HttpClient){
  }

  ngOnInit() {
    this.loadNavigationData().subscribe((data) => {
      this.sidenavItems = data
      console.log(this.sidenavItems)
    });
  }

  loadNavigationData(): Observable<any> {
    return this.http.get<any>(APP_CONSTS.DATA_PATH.sidenav);
  }
  
}
