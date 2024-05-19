import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RoleService } from '../../configuration/services/role.service';



@Injectable({
  providedIn: 'root'
})
export class RoleResolver implements Resolve<any> {
  constructor(private roleService: RoleService) { }

  resolve(route: ActivatedRouteSnapshot){
    return this.roleService.getById(route.params['id']);
  }
}