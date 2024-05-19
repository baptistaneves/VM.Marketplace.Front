import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Router } from '@angular/router';
import { LocalStorageUtils } from '../utils/localStorageUtils';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private toastr: ToastrService) { }

    localStorageUtil = new LocalStorageUtils();

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError(error => {

            if (error instanceof HttpErrorResponse) {

                if (error.status === 401) {
                    this.localStorageUtil.cleanLocalUserData();
                    this.router.navigate(['/autenticar/login/'], { queryParams: { returnUrl: this.router.url }});
                }
                if (error.status === 403) {
                   this.toastr.warning('Sem permissão para realizar essa acção!', 'Acesso Negado :(');
                }
                if (error.status === 500) {
                   this.toastr.error('Erro Interno no Servidor!', 'Opa :(');
                }
            }

            return throwError(error);
        }));
    }

}