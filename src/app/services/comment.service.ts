import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Observable, from } from 'rxjs';
import { Comment } from 'src/shared/comment';
import { baseURL } from '../../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url = baseURL;
  constructor(private http: HttpClient, ) { }

  // addComments = (): Observable<Comment[]> => {
  //   return this.http.post(`${this.url}/`)

  // }
}
