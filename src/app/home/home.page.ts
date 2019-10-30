import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../../shared/dish';
import { Leader } from '../../shared/leader';
import { Promotion } from '../../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dish: Dish;
  leader: Leader;
  promotion: Promotion;

  constructor(private dishProvider: DishService, private leaderProvider: LeaderService, private promotionProvider: PromotionService,
              @Inject('BaseURL') private BaseURL) {
    console.log('Hello we are calling dish provider');
  }

  ngOnInit() {
    console.log('on init in dish ....');
    this.dishProvider.getFeaturedDish()
    .subscribe((data: any) => {
     this.dish = data;
    });
    this.leaderProvider.getFeaturedLeader()
    .subscribe((data: any) => {
     this.leader = data;
    });
    this.promotionProvider.getFeaturedPromotion()
    .subscribe((data: any) => {
     this.promotion = data;
    });
  }



}
