import { Component, SecurityContext } from '@angular/core';
import { IJobDetails } from 'src/app/core/interfaces/IJobDetails.interface';
import { JobService } from '../job.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IJobAdDetails } from 'src/app/core/interfaces/IJobAdDetails.interface';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from 'src/app/core/auth/store/auth.selectors';
import { selectLoggedInUser } from 'src/app/core/auth/store/auth.selectors';
import { IUserLogin } from 'src/app/core/interfaces/IUserLogin.interface';
import { User } from 'src/app/core/auth/models/user.interface';
import { IJobApplication } from 'src/app/core/interfaces/IJobApplication.interface';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {
  jobDetails : IJobAdDetails 
  jobParam : number
  description : SafeHtml
  isLoggedIn : boolean = false
  user : User = null

  constructor(private jobService:JobService,
              private route : ActivatedRoute,
              private sanitizer: DomSanitizer,
              private store : Store)
  {
      this.route.params.subscribe(params => {
          this.jobParam = +params['id']; 
          });
      this.store.select(selectIsLoggedIn).subscribe(isLoggedIn => {
          this.isLoggedIn = isLoggedIn;
      });

      this.store.select(selectLoggedInUser).subscribe(user => {
        this.user = user;
    });
  }

  ngOnInit(){
    this.loadJobDetails()
  }

  loadJobDetails(){
    this.jobService.getJobDetails(this.jobParam).subscribe(
      response => {
        this.jobDetails = response
        this.description = response.description
        const descriptionString = this.sanitizer.sanitize(SecurityContext.HTML, this.description);
        const descriptionWithoutNewlines = descriptionString.replace(/\n/g, '');
        this.description = this.sanitizer.bypassSecurityTrustHtml(descriptionWithoutNewlines);
        console.log(this.jobDetails.company)
      },
      error => {
        console.error('Došlo je do greške prilikom dodavanja posla:', error);
      }
    );
  }

  jobApplication(){
    const obj : IJobApplication = {
      jobAdId : +this.jobParam
    }
    this.jobService.uploadJobApply(obj).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.error('Došlo je do greške prilikom dodavanja posla:', error);
      }
    );
  }
}
