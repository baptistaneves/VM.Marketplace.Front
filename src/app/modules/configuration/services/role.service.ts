import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { UpdateCategoryRequest } from '../../general/models/categories/UpdateCategoryRequest';
import { CreateCategoryRequest } from '../../general/models/categories/createCategoryRequest';
import { RoleRequest } from '../models/roles/roleRequest';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "roles/obter-perfis", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getRoleClaims() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "roles/obter-permissoes-de-perfil", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<any>{
    return this.http
      .get<any>(this.UrlServiceV1 + "roles/obter-perfil-por-id/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(role: RoleRequest) : Observable<any>{
    let response = this.http
        .post<CreateCategoryRequest>(this.UrlServiceV1 + "roles/adicionar-perfil", role, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(role: RoleRequest) : Observable<any>{
    let response = this.http
        .put<UpdateCategoryRequest>(this.UrlServiceV1 + "roles/actualizar-perfil/", role, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "roles/remover-perfil/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
}
