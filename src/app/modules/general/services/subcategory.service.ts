import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { CreateSubcategoryRequest } from '../models/subcategories/createSubcategoryRequest';
import { UpdateSubcategoryRequest } from '../models/subcategories/UpdateSubcategoryRequest';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "subcategories/obter-subcategorias", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getSubcategoriesByCategory(categoryId: string) : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "subcategories/obter-subcategorias-por-categoria/" + categoryId, this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<any>{
    return this.http
      .get<any>(this.UrlServiceV1 + "subcategories/obter-subcategoria-por-id/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(subcategory: CreateSubcategoryRequest) : Observable<any>{
    let response = this.http
        .post<CreateSubcategoryRequest>(this.UrlServiceV1 + "subcategories/adicionar-subcategoria", subcategory, this.GetAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(subcategory: UpdateSubcategoryRequest) : Observable<any>{
    let response = this.http
        .put<UpdateSubcategoryRequest>(this.UrlServiceV1 + "subcategories/actualizar-subcategoria/", subcategory, this.GetAuthHeaderJson())
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
