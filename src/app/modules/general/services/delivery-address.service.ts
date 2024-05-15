import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { CreateDeliveryAddressRequest } from '../models/deliveryAddresses/createDeliveryAddressRequest';
import { UpdateDeliveryAddressRequest } from '../models/deliveryAddresses/UpdateDeliveryAddressRequest';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAddressService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "deliveryAddresses/obter-endereco-de-entregas", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<any>{
    return this.http
      .get<any>(this.UrlServiceV1 + "deliveryAddresses/obter-endereco-de-entrega-por-id/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(deliveryAddresses: CreateDeliveryAddressRequest) : Observable<any>{
    let response = this.http
        .post<CreateDeliveryAddressRequest>(this.UrlServiceV1 + "deliveryAddresses/adicionar-endereco-de-entrega", deliveryAddresses, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(deliveryAddresses: UpdateDeliveryAddressRequest, id:string) : Observable<any>{
    let response = this.http
        .put<UpdateDeliveryAddressRequest>(this.UrlServiceV1 + "deliveryAddresses/actualizar-endereco-de-entrega/", deliveryAddresses, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "deliveryAddresses/remover-endereco-de-entrega/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
  
}
