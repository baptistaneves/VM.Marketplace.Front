import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../core/services/base.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/loginRequest';
import { AuthenticationResultDto } from '../models/authenticationResultDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService{

    constructor(private http: HttpClient,
              private router: Router) { 
                
      super(); 
  }

    public login(login: LoginRequest): Observable<AuthenticationResultDto> {
        let response = this.http
            .post(this.UrlServiceV1 + 'login', login, this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

  logOut() {
    this.LocalStorage.cleanLocalUserData();
    this.router.navigate(['/autenticar/login'])
  }

}
