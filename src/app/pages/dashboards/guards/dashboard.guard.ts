import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BaseGuard } from '../../../core/guards/base.guard';

@Injectable()
export class DashboardGuard extends BaseGuard implements CanActivate {

    constructor(protected override router: Router,
                protected override toastr: ToastrService) { super(router, toastr); }


    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validarClaims(routeAc);
    }  
}