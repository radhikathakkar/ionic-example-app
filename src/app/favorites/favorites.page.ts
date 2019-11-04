import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from 'src/shared/dish';
import { IonItemSliding } from '@ionic/angular';

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

  deleteFavorites = (item: IonItemSliding, id: number) => {
    // console.log('dishes in favorites', this.favorites);
    this.favoriteService.deleteFavoriteDish(id)
    .subscribe((data) => {
      this.favorites = data;
      // console.log('dishes in favorites after delete', this.favorites);
    });
    // close siding item
    item.close();
  }

}
