import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../../shared/baseurl';
import { Dish } from 'src/shared/dish';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  url = baseURL;
  constructor(private http: HttpClient) { }

  getDishes = (): Observable<Dish[]> => {
    return this.http.get(`${this.url}dishes`)
    .pipe(map((res: any) => res));
  }

  getDishById = (dishId: string): Observable<Dish> => {
    return this.http.get(`${this.url}dishes/${dishId}`)
    .pipe(map((res: any) => res));
  }

  getFeaturedDish = (): Observable<Dish> => {
    return this.http.get(`${this.url}dishes?featured=true`)
    .pipe(map((res: any) => res[0]));
  }
}
