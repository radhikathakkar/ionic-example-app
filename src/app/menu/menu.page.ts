import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from 'src/shared/dish';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish;
  constructor(private dishService: DishService, private navCtrl: NavController, private router: Router,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe((dishes: any) => {
      this.dishes = dishes;
    });
  }

  getSelectedDish = (dish: any) => {
    // this.router.navigate([`/dishdetail/${dish.id}`]);
    this.navCtrl.navigateForward(`/dishdetail/${dish.id}`);
  }

}
