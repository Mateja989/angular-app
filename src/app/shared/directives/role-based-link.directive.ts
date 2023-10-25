import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from 'src/app/core/auth/store/auth.selectors';


@Directive({
  selector: '[appRoleBasedLink]'
})
export class RoleBasedLinkDirective implements OnInit{
  @Input('appRoleBasedLink') userRole : string;
  private userRoleFromStore : string; 

  constructor(private el: ElementRef, 
              private renderer: Renderer2,
              private store : Store) {}

  ngOnInit() {

    this.store.select(selectLoggedInUser).subscribe(
      (user) => {
        this.userRoleFromStore = user.Role

        if (this.userRoleFromStore.includes(this.userRole)) {
          this.renderer.removeStyle(this.el.nativeElement, 'display');
        } else {
          this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        }
      }
    )

  }

}
