import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../base_url';
import { Answer } from '../model/model';

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
export class AnswerService {
  protected url = '/answer';

  constructor(
    private http: HttpClient
  ) { }

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(BASE_URL + this.url, httpOptions);
  }

  getAnswer(id: number): Observable<Answer> {
    return this.http.get<Answer>(BASE_URL + this.url + '/' + id, httpOptions);
  }

  createAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(BASE_URL + this.url, answer, httpOptions);
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(BASE_URL + this.url + '/' + answer.id, answer, httpOptions);
  }
}
