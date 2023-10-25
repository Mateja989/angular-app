import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Observable } from 'rxjs';
import { ICategoryResponse } from 'src/app/core/interfaces/ICategoryResponse.interface';


@Injectable({
  providedIn: 'root',
})
export class CategoryService  {

  constructor(private dataService: ResourceService) {}
  
  getAllCategories(): Observable<ICategoryResponse> {
    return this.dataService.getResources<ICategoryResponse>('/categories');
  } 

}
