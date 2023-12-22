import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Difficulty } from '../model/model';
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
export class DifficultyService {
  protected url = '/difficulty';

  constructor(
    private http: HttpClient
  ) { }

  getDifficulties(): Observable<Difficulty[]> {
    return this.http.get<Difficulty[]>(BASE_URL + this.url, httpOptions);
  }
}
