import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { CreateGroupRequest } from '../models/groups/createGroupRequest';
import { UpdateGroupRequest } from '../models/groups/updateGroupRequest';
import { CreateAddressRequest } from '../models/addresses/createAddressRequest';
import { UpdateAddressRequest } from '../models/addresses/UpdateAddressRequest';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService{

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "addresses/obter-enderecos", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<any>{
    return this.http
      .get<any>(this.UrlServiceV1 + "addresses/obter-endereco-por-id/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(address: CreateAddressRequest) : Observable<any>{
    let response = this.http
        .post<CreateAddressRequest>(this.UrlServiceV1 + "addresses/adicionar-endereco", address, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(address: UpdateAddressRequest, id:string) : Observable<any>{
    let response = this.http
        .put<UpdateGroupRequest>(this.UrlServiceV1 + "addresses/actualizar-endereco/", address, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "addresses/remover-endereco/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
}
