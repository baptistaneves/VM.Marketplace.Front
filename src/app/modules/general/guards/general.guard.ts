import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BaseGuard } from '../../../core/guards/base.guard';

@Injectable()
export class GeneralGuard extends BaseGuard implements CanActivate {

    constructor(protected override router: Router,
                protected override toastr: ToastrService) { super(router, toastr); }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validarClaims(routeAc);
    }  
}