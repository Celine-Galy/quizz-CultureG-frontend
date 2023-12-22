import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/model';
import { BASE_URL } from '../base_url';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '**',
    'withCredentials': 'true'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  protected url = '/category';

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(BASE_URL + this.url, httpOptions);
  }

  getCategory(id: number): any {
    return this.http.get<any>(this.url + '/' + id, httpOptions);
  }

  createCategory(category: any): any {
    return this.http.post<any>(this.url, category, httpOptions);
  }

  updateCategory(category: any): any {
    return this.http.put<any>(this.url + '/' + category.id, category, httpOptions);
  }

  deleteCategory(id: number): any {
    return this.http.delete<any>(this.url + '/' + id, httpOptions);
  }
}
