import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dishId: string;
  dish: any;
  errMess: string;
  totalComments: number;
  totalRating: number;
  avgStars: string;
  comments: any = [];
  favorite: boolean;

  constructor(private route: ActivatedRoute, private dishService: DishService,
              @Inject('BaseURL') private BaseURL, private favoriteService: FavoriteService) { }

  ngOnInit() {
    console.log('dish detail calling');
    // tslint:disable-next-line: radix
    this.dishId = this.route.snapshot.paramMap.get('id');
    if (this.dishId) {
      this.dishService.getDishById(this.dishId)
        .subscribe((dish) => {
          this.dish = dish;
          this.favorite = this.favoriteService.isFavorite(this.dish.id);
          this.totalComments = this.dish.comments.length;
          let total = 0;
          this.dish.comments.forEach(comment => {
            total += comment.rating;
          });
          this.avgStars = (total / this.totalComments).toFixed(2);
          this.comments = this.dish.comments;
        }, err => this.errMess = err);
    }
  }


  addToFavorites = () => {
    // console.log(this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
  }
}
