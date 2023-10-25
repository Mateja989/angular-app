import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployerJobs } from 'src/app/core/interfaces/IEmployerJobs.interface';
import { IJobAdDetails } from 'src/app/core/interfaces/IJobAdDetails.interface';
import { IJobAdDisplay } from 'src/app/core/interfaces/IJobAdDisplay.interface';
import { IJobAdUpload } from 'src/app/core/interfaces/IJobAdUpload.interface';
import { IJobApplication } from 'src/app/core/interfaces/IJobApplication.interface';
import { IJobApplicationInfo } from 'src/app/core/interfaces/IJobApplicationInfo.interface';
import { IJobDetails } from 'src/app/core/interfaces/IJobDetails.interface';
import { IJobType } from 'src/app/core/interfaces/IJobTypes.interface';
import { IJobUpload } from 'src/app/core/interfaces/IJobUpload.interfaces';
import { IPaginationData } from 'src/app/core/interfaces/IPaginationData.interface';
import { ISalaryType } from 'src/app/core/interfaces/ISalaryType.interface';
import { ResourceService } from 'src/app/core/services/resource.service'; 

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private resourceService: ResourceService) {}

  uploadJob(newJob: IJobUpload): Observable<IJobUpload> {
    return this.resourceService.uploadResources<IJobUpload>('/jobs', newJob);
  }

  uploadJobAd(newJob: IJobAdUpload): Observable<IJobAdUpload> {
    return this.resourceService.uploadResources<IJobAdUpload>('/jobads', newJob);
  }

  uploadJobApply(application : IJobApplication) : Observable<IJobApplication> {
    return this.resourceService.uploadResources<IJobApplication>('/jobapplications', application);
  }

  getJobs(): Observable<IJobDetails[]> {
    return this.resourceService.getResources<IJobDetails[]>('/jobs');
  }

  getSalaryType() : Observable<ISalaryType[]>{
    return this.resourceService.getResources<ISalaryType[]>('/salaries');
  }

  getJobType() : Observable<IJobType[]>{
    return this.resourceService.getResources<IJobType[]>('/jobtypes');
  }

  getJobAds(): Observable<IJobAdDisplay[]>{
    return this.resourceService.getResources<IJobAdDisplay[]>('/jobads');
  }

  getJobDetails(param : number): Observable<IJobAdDetails>{
    return this.resourceService.getResources<IJobAdDetails>(`/jobads/${param}`);
  }

  getJobsForSpecificEmployer(): Observable<IPaginationData<IEmployerJobs>>{
    return this.resourceService.getResources<IPaginationData<IEmployerJobs>>(`/employers/jobs`);
  }

  getApplicationDetailsForSpecifiJobAd(param : number) : Observable<IJobApplicationInfo>{
    return this.resourceService.getResources<IJobApplicationInfo>(`/jobapplications/${param}`);
  }
  
}