import { Component } from '@angular/core';
import { IEmployerJobs } from 'src/app/core/interfaces/IEmployerJobs.interface';
import { JobService } from '../job.service';
import { IPaginationData } from 'src/app/core/interfaces/IPaginationData.interface';

@Component({
  selector: 'app-employer-jobs',
  templateUrl: './employer-jobs.component.html',
  styleUrls: ['./employer-jobs.component.css']
})
export class EmployerJobsComponent {
  jobs : IPaginationData<IEmployerJobs>


  constructor(private jobService : JobService){}

  ngOnInit(){
    this.loadJobsForLoggedInEmployer()
    
  }

  setIsActiveForJobs() {
    const today = new Date();
    this.jobs.data.forEach(job => {
      const endedAt = new Date(job.endedAt);
      job.isActive = endedAt >= today;
    });
  }  

  loadJobsForLoggedInEmployer(){
    this.jobService.getJobsForSpecificEmployer().subscribe(
      response => {
        this.jobs = response,
        this.setIsActiveForJobs()
        console.log(response.data)

      },
      error => {
        console.error('Došlo je do greške prilikom dodavanja posla:', error);
      }
    );
  }

}
