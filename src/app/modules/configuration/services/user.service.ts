import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { CreateCategoryRequest } from '../../general/models/categories/createCategoryRequest';
import { CreateAdminUserRequest } from '../models/users/createAdminUserRequest';
import { UpdateAdminUserRequest } from '../models/users/updateAdminUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "users/obter-usuarios-admin", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getAllSeller() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "users/obter-usuarios-vendedores", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  add(user: CreateAdminUserRequest) : Observable<any>{
    let response = this.http
        .post<CreateCategoryRequest>(this.UrlServiceV1 + "users/adicionar-usuario-admin", user, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(user: UpdateAdminUserRequest) : Observable<any>{
    let response = this.http
        .put<CreateCategoryRequest>(this.UrlServiceV1 + "users/actualizar-usuario-admin", user, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  verifyUser(userId: string) : Observable<any>{
    let response = this.http
        .put(this.UrlServiceV1 + "users/verificar-usuario/" + userId, {}, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  unverifyUser(userId: string) : Observable<any>{
    let response = this.http
        .put(this.UrlServiceV1 + "users/remover-verificacao-do-usuario/" + userId, {},  this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }


  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "users/remover-usuario-admin/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

 
}
