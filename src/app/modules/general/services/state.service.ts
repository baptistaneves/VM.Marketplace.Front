import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { UpdateStateRequest } from '../models/states/UpdateStateRequest';
import { CreateStateRequest } from '../models/states/createStateRequest';

@Injectable({
  providedIn: 'root'
})
export class StateService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "states/obter-provincias", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<any>{
    return this.http
      .get<any>(this.UrlServiceV1 + "states/obter-provincia-por-id/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(state: CreateStateRequest) : Observable<any>{
    let response = this.http
        .post<CreateStateRequest>(this.UrlServiceV1 + "states/adicionar-provincia", state, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(state: UpdateStateRequest) : Observable<any>{
    let response = this.http
        .put<UpdateStateRequest>(this.UrlServiceV1 + "states/actualizar-provincia/", state, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "states/remover-provincia/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
  
}
