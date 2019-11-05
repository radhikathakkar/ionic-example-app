import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { CommentsPage } from '../comments/comments.page';

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

  constructor(private route: ActivatedRoute, private dishService: DishService, private actionSheetController: ActionSheetController,
              @Inject('BaseURL') private BaseURL, private favoriteService: FavoriteService, private router: Router,
              private modalCtrl: ModalController) { }

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

  backToMenu = () => {
    this.router.navigate(['/menu']);
  }

  addToFavorites = () => {
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
  }

  async openCommentsModal() {
    const modal = this.modalCtrl.create({
      component: CommentsPage,
      componentProps: { comments: this.comments }
    });
    (await modal).onDidDismiss().then((d: any) => this.handleModalDismiss(d));
    (await modal).present();
    console.log('comments before add', this.comments);
  }
  handleModalDismiss = ({ data }) => {
    if (data.cancelled) {
      alert('cancel');
    } else {
      this.comments.push(data);
      console.log('comments after add', this.comments);
    }
  }
  openActionSheetData = async () => {
    const actionSheet = await this.actionSheetController.create({
      header: 'data',
      buttons: [
        {
          text: 'Add to Favorite',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add Comment',
          handler: () => {
            this.openCommentsModal();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
