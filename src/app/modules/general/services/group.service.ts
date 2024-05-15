import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { CreateGroupRequest } from '../models/groups/createGroupRequest';
import { UpdateGroupRequest } from '../models/groups/updateGroupRequest';
import { ResponseRequest } from '../models/response-resquest';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<ResponseRequest>{
    return this.http
          .get<ResponseRequest>(this.UrlServiceV1 + "groups/obter-grupos", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<ResponseRequest>{
    return this.http
      .get<ResponseRequest>(this.UrlServiceV1 + "groups/obter-grupo-por-id/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(group: CreateGroupRequest) : Observable<any>{
    let response = this.http
        .post<CreateGroupRequest>(this.UrlServiceV1 + "groups/adicionar-grupo", group, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(group: UpdateGroupRequest,) : Observable<any>{
    let response = this.http
        .put<UpdateGroupRequest>(this.UrlServiceV1 + "groups/actualizar-grupo/", group, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "groups/remover-grupo/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
  
}
