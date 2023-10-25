import { Component, Input } from '@angular/core';
import { IJobAdDisplay } from 'src/app/core/interfaces/IJobAdDisplay.interface';
import { JobService } from '../../job.service'; 

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent {
  @Input() data : IJobAdDisplay
  isApplicationSuccessful = false; 
  isForbidden = false;

  constructor(private jobService: JobService){}

  /*jobApply(id : number){
    this.jobService.jobApply(id).subscribe(
      restData => {
        this.isApplicationSuccessful = true;
        setTimeout(() => {
          this.isApplicationSuccessful = true;
        }, 5000);

        console.log(restData,this.isApplicationSuccessful)

      },
      error => {
        this.isForbidden = true
        console.log(error,this.isForbidden)
      }
    );
  }*/
}

