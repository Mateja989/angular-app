import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { UnauthGuard } from './core/guards/unauth-guard.service';
import { HomeComponent } from './features/home/home/home.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout/home-layout.component';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './features/dashboard/profile/profile.component';
import { JobsComponent } from './features/home/jobs/jobs.component';
import { JobUploadComponent } from './features/jobs/job-upload/job-upload.component';
import { ActivateJobsComponent } from './features/jobs/activate-jobs/activate-jobs.component';
import { JobDetailsComponent } from './features/jobs/job-details/job-details.component';
import { EmployerJobsComponent } from './features/jobs/employer-jobs/employer-jobs.component';
import { CandidatesComponent } from './features/users/candidates/candidates.component';
import { ApplicationDetailsComponent } from './features/jobs/application-details/application-details.component';
import { RegistrationComponent } from './features/users/registration/registration.component';
import { ContactComponent } from './features/contact/contact.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path : '',
    component : HomeLayoutComponent,
    children : [
      { path: '', component: HomeComponent},
      { path: 'home', component: HomeComponent},
      { path: 'registration', component: RegistrationComponent, canActivate : [UnauthGuard]},
      { path: 'login', component: LoginComponent, canActivate : [UnauthGuard]},
      { path: 'jobs', component: JobsComponent},
      { path : 'job-details/:id', component : JobDetailsComponent},
      { path : 'talents', component : CandidatesComponent},
      { path : 'contact', component : ContactComponent},
    ]
  },
  {
    path : 'dashboard',
    component : DashboardLayoutComponent,
    children : [
      { path: '', component: ProfileComponent, canActivate : [AuthGuard]},
      { path: 'postjob', component: JobUploadComponent },//canActivate : [AuthGuard]},
      { path: 'activejobs', component: ActivateJobsComponent },
      { path: 'jobs', component: EmployerJobsComponent }, 
      { path: 'application-details/:id', component: ApplicationDetailsComponent }, //canActivate : [AuthGuard]},
    ]
  },
  { path : '**', component : NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
