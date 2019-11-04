import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from 'src/shared/dish';
import { IonItemSliding, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  constructor(private favoriteService: FavoriteService, @Inject('BaseURL') private BaseURL,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.favoriteService.getFavoriteDishes()
      .subscribe(favorites => {
        this.favorites = favorites;
      });
  }

  deleteFavorites = async (item: IonItemSliding, id: number) => {
    // console.log('dishes in favorites', this.favorites);
    this.favoriteService.deleteFavoriteDish(id)
    .subscribe((data) => {
      this.favorites = data;
      // console.log('dishes in favorites after delete', this.favorites);
    });
    const toast =  await this.toastCtrl.create({
      message: `Dish ${id} deleted successfully ...`,
      duration: 3000
    });
    toast.present();
    // close siding item
    item.close();
  }

}
