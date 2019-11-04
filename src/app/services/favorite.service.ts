import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DishService } from './dish.service';
import { Observable } from 'rxjs';
import { Dish } from 'src/shared/dish';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;
  constructor(public http: HttpClient, private dishService: DishService) {
    this.favorites = [];
  }

  addFavorite = (id: number): boolean => {
    this.favorites.push(id);
    console.log(this.favorites);
    return true;
  }

  isFavorite = (id: number): boolean => {
    return this.favorites.some(el => el === id);
  }

  getFavoriteDishes = (): Observable<Dish[]> => {
    return this.dishService.getDishes()
    .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
  }

  deleteFavoriteDish = (id: number): Observable<Dish[]> => {
    const index = this.favorites.indexOf(id);
    if  (index >= 0) {
      this.favorites.splice(index, 1);
      return this.getFavoriteDishes();
    }
  }
}
