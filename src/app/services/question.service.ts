import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../model/model';
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
export class QuestionService {

  protected url = '/question';

  constructor(
    private http: HttpClient
  ) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(BASE_URL + this.url, httpOptions);
  }

  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(BASE_URL + this.url + '/' + id, httpOptions);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(BASE_URL + this.url, question, httpOptions);
  } 
 
}
