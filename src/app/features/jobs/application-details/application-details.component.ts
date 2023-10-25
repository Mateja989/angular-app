import { Component } from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute } from '@angular/router';
import { IPaginationData } from 'src/app/core/interfaces/IPaginationData.interface';
import { IJobApplicationInfo } from 'src/app/core/interfaces/IJobApplicationInfo.interface';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent {
  jobApplication : IJobApplicationInfo
  jobParam : number

  constructor(private jobService:JobService,
              private route : ActivatedRoute,)
  {
      this.route.params.subscribe(params => {
          this.jobParam = +params['id']; 
          });
    
  }

  ngOnInit(){
    this.loadJobDetails()
  }

  loadJobDetails(){
    this.jobService.getApplicationDetailsForSpecifiJobAd(this.jobParam).subscribe(
      response => {
          this.jobApplication = response
      },
      error => {
        console.error('Došlo je do greške prilikom dodavanja posla:', error);
      }
    );
  }
  
}
