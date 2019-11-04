import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from 'src/shared/dish';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  constructor(private favoriteService: FavoriteService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
  this.favoriteService.getFavoriteDishes()
  .subscribe(favorites => {
    this.favorites = favorites;
  });
  }

}
