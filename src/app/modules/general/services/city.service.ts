import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { UpdateCityRequest } from '../models/cities/UpdateCityRequest';
import { CreateCityRequest } from '../models/cities/createCityRequest';

@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "cities/obter-municipios", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  
  getCitiesByStateId(stateId: string) : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "cities/obter-municipios-por-provincia/" + stateId, this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<any>{
    return this.http
      .get<any>(this.UrlServiceV1 + "cities/obter-municipio-por-id/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(city: CreateCityRequest) : Observable<any>{
    let response = this.http
        .post<CreateCityRequest>(this.UrlServiceV1 + "cities/adicionar-municipio", city, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(city: UpdateCityRequest) : Observable<any>{
    let response = this.http
        .put<UpdateCityRequest>(this.UrlServiceV1 + "cities/actualizar-municipio/", city, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "cities/remover-municipio/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
  
}
