import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leader } from '../../shared/leader';
import { map } from 'rxjs/operators';
import { baseURL } from 'src/shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  url = baseURL;
  constructor(private http: HttpClient) { }

  getLeaders = (): Observable<Leader[]> => {
    return this.http.get(`${this.url}leaders`)
    .pipe(map((res: any) => res));
  }

  getLeaderById = (leaderId: number): Observable<Leader> => {
    return this.http.get(`${this.url}leaders/${leaderId}`)
    .pipe(map((res: any) => res));
  }

  getFeaturedLeader = (): Observable<Leader> => {
    return this.http.get(`${this.url}leaders?featured=true`)
    .pipe(map((res: any) => res[0]));
  }
}
