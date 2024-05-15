import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { CreateUnitRequest } from '../models/units/createUnitRequest';
import { UpdateUnitRequest } from '../models/units/UpdateUnitRequest';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "units/obter-unidades", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<any>{
    return this.http
      .get<any>(this.UrlServiceV1 + "units/obter-unidade-por-id/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(unit: CreateUnitRequest) : Observable<any>{
    let response = this.http
        .post<CreateUnitRequest>(this.UrlServiceV1 + "units/adicionar-unidade", unit, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(unit: UpdateUnitRequest) : Observable<any>{
    let response = this.http
        .put<UpdateUnitRequest>(this.UrlServiceV1 + "units/actualizar-unidade/", unit, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "units/remover-unidade/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
  
}
