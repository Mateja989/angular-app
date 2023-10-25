import { Component } from '@angular/core';
import { IJobDetails } from 'src/app/core/interfaces/IJobDetails.interface';
import { JobService } from '../job.service';
import { ISalaryType } from 'src/app/core/interfaces/ISalaryType.interface';
import { IJobType } from 'src/app/core/interfaces/IJobTypes.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IJobAdUpload } from 'src/app/core/interfaces/IJobAdUpload.interface';

@Component({
  selector: 'app-activate-jobs',
  templateUrl: './activate-jobs.component.html',
  styleUrls: ['./activate-jobs.component.css']
})
export class ActivateJobsComponent {
  jobDetailsList: IJobDetails[] = [];
  salaryTypes : ISalaryType[] = [];
  jobTypes : IJobType[] = []
  activateJobAdForm : FormGroup;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobDetails();
    this.loadSalaryTypes();
    this.loadJobTypes()
    this.activateJobAdForm = new FormGroup({
      'min' : new FormControl(null,[Validators.required]),
      'max' : new FormControl(null,[Validators.required]),
      'job': new FormControl(null, [Validators.required]),
      'salaryType': new FormControl(null, [Validators.required]),
      'jobType': new FormControl(null, [Validators.required]),
    });
  }

  loadJobDetails() {
    this.jobService.getJobs().subscribe(
      (data) => {
        this.jobDetailsList = data;
        console.log('Job Details:', this.jobDetailsList);
      },
      (error) => {
        console.error('An error occurred while fetching job details:', error);
      }
    );
  }

  loadSalaryTypes() {
    this.jobService.getSalaryType().subscribe(
      (data) => {
        this.salaryTypes = data;
        console.log('Job Details:', this.salaryTypes);
      },
      (error) => {
        console.error('An error occurred while fetching job details:', error);
      }
    );
  }

  loadJobTypes() {
    this.jobService.getJobType().subscribe(
      (data) => {
        this.jobTypes = data;
      },
      (error) => {
        console.error('An error occurred while fetching job details:', error);
      }
    );
  }

  uploadJobAd(){
    const jobAd : IJobAdUpload = {
      salaryMin : +this.activateJobAdForm.value.min,
      salaryMax : +this.activateJobAdForm.value.max,
      jobTypeId : +this.activateJobAdForm.value.jobType,
      salaryTypeId : +this.activateJobAdForm.value.salaryType,
      jobId : +this.activateJobAdForm.value.job,
      endAt: "2023-11-12T13:02:26.673Z",
      jobSkillIds: [1,2,3,4,5]
    }

    this.jobService.uploadJobAd(jobAd).subscribe(
      response => {
        console.log('Posao je uspešno dodat.', response);
      },
      error => {
        console.error('Došlo je do greške prilikom dodavanja posla:', error);
      }
    );

  }
}
