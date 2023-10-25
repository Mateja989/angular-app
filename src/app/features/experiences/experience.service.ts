import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Observable } from 'rxjs';
import { IExperience } from 'src/app/core/interfaces/IExperience.interface';


@Injectable({
  providedIn: 'root',
})
export class ExperienceService  {

  constructor(private dataService: ResourceService) {}
  
  getAllExperiences(): Observable<IExperience[]> {
    return this.dataService.getResources<IExperience[]>('/experiences');
  }

}