import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comment } from 'src/shared/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  addCommentsForm: FormGroup;
  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm = () => {
    this.addCommentsForm = this.fb.group({
      rating: 0,
      comment: '',
      author: ['', Validators.required],
      date: new Date(),
    });
  }


  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  onSubmit = async () => {
    await this.modalCtrl.dismiss({...this.addCommentsForm.value});
  }

}
