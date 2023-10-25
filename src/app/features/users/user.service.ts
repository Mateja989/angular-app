import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuditLog } from 'src/app/core/interfaces/IAuditLog.interface';
import { IPaginationData } from 'src/app/core/interfaces/IPaginationData.interface';
import { ResourceService } from 'src/app/core/services/resource.service'; 

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private resourceService: ResourceService) {}

  getCandidates(): Observable<IPaginationData<any>> {
    return this.resourceService.getResources<IPaginationData<any>>('/candidates');
  } 

  getAuditLogForUsersWithAdminPrivilege() : Observable<IPaginationData<IAuditLog>> {
    return this.resourceService.getResources<IPaginationData<IAuditLog>>('/auditlog');
  } 
  
}