import { Component } from '@angular/core';
import { IJobAdDisplay } from 'src/app/core/interfaces/IJobAdDisplay.interface';
import { JobService } from '../../jobs/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  jobs : IJobAdDisplay[] = []

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobAds().subscribe(
      (data) => {
        this.jobs = data;
        console.log(this.jobs);
      },
      (error) => {
        console.error('An error occurred while fetching categories:', error);
      }
    );
  }  
}
