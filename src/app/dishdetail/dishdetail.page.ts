import { Component, OnInit, Inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';

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

  constructor(private alertCtrl: AlertController, private route: ActivatedRoute, private dishService: DishService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    console.log('dish detail calling');
    this.dishId = this.route.snapshot.paramMap.get('id');
    if (this.dishId) {
      this.dishService.getDishById(this.dishId)
        .subscribe((dish) => {
          this.dish = dish;
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

  getComments = () => {
    this.comments = this.dish.comments;
  }

}
