import { Component, OnInit } from '@angular/core';
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
  dishDetail: any;

  constructor(private alertCtrl: AlertController, private route: ActivatedRoute, private dishService: DishService) { }

  ngOnInit() {
    console.log('dish detail calling');
    this.dishId = this.route.snapshot.paramMap.get('id');
    if (this.dishId) {
      this.dishService.getDishById(this.dishId)
        .subscribe((dish) => {
          this.dishDetail = dish;
        });
    }
  }

}
