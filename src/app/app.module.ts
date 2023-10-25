import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './core/auth/store/auth.reducer';
import { AuthService } from './core/auth/auth.service';
import { LoginComponent } from './core/auth/components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './shared/home/navigation/navigation.component';
import { FooterComponent } from './shared/home/footer/footer.component';
import { HeaderComponent } from './shared/dashboard/header/header.component';
import { SidebarComponent } from './shared/dashboard/sidebar/sidebar.component';
import { ProfileComponent } from './features/dashboard/profile/profile.component';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout/home-layout.component';
import { HomeComponent } from './features/home/home/home.component';
import { RoleBasedLinkDirective } from './shared/directives/role-based-link.directive';
import { JobsComponent } from './features/home/jobs/jobs.component';
import { JobUploadComponent } from './features/jobs/job-upload/job-upload.component';
import { CategoryService } from './features/categories/category.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { JobListingComponent } from './features/jobs/job-listing/job-listing.component';
import { ActivateJobsComponent } from './features/jobs/activate-jobs/activate-jobs.component';
import { JobItemComponent } from './features/jobs/job-listing/job-item/job-item.component';
import { JobDetailsComponent } from './features/jobs/job-details/job-details.component';
import { EmployerJobsComponent } from './features/jobs/employer-jobs/employer-jobs.component';
import { CandidatesComponent } from './features/users/candidates/candidates.component';
import { ApplicationDetailsComponent } from './features/jobs/application-details/application-details.component';
import { RegistrationComponent } from './features/users/registration/registration.component';
import { ContactComponent } from './features/contact/contact.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,  
    LoginComponent,
    HomeComponent, 
    NavigationComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ProfileComponent,
    DashboardLayoutComponent,
    HomeLayoutComponent,
    RoleBasedLinkDirective,
    JobsComponent,
    JobUploadComponent,
    JobListingComponent,
    ActivateJobsComponent,
    JobItemComponent,
    JobDetailsComponent,
    EmployerJobsComponent,
    CandidatesComponent,
    ApplicationDetailsComponent,
    RegistrationComponent,
    ContactComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      auth : authReducer
    })
  ],
  providers: [
    AuthService,
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
