import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { UpdateCategoryRequest } from '../models/categories/UpdateCategoryRequest';
import { CreateCategoryRequest } from '../models/categories/createCategoryRequest';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "categories/obter-categorias", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<any>{
    return this.http
      .get<any>(this.UrlServiceV1 + "categories/obter-categoria-por-id/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(category: CreateCategoryRequest) : Observable<any>{
    let response = this.http
        .post<CreateCategoryRequest>(this.UrlServiceV1 + "categories/adicionar-categoria", category, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(category: UpdateCategoryRequest) : Observable<any>{
    let response = this.http
        .put<UpdateCategoryRequest>(this.UrlServiceV1 + "categories/actualizar-categoria/", category, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "categories/remover-categoria/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
  
}
