import { Injectable } from '@angular/core';
import { baseURL } from '../../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '../../shared/promotion';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  url = baseURL;
  constructor(private http: HttpClient) { }

  getPromotions = (): Observable< Promotion[] > => {
    return this.http.get(`${this.url}promotions`)
    .pipe(map((res: any) => res));
  }

  getPromotionById = (promotionId: number): Observable<Promotion> => {
    return this.http.get(`${this.url}promotions/${promotionId}`)
    .pipe(map((res: any) => res));
  }

  getFeaturedPromotion = (): Observable<Promotion> => {
    return this.http.get(`${this.url}promotions?featured=true`)
    .pipe(map((res: any) => res[0]));
  }
}
