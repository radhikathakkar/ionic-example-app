import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  reservationForm: FormGroup;
  constructor(private viewCtrl: ModalController, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm = () => {
    this.reservationForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      guests: 3,
      smoking: false,
      dateTime: ['', Validators.required],
    });
  }
  async closeModal() {
    await this.viewCtrl.dismiss();
  }

  onSubmit = () => {
    console.log('reservation form value: ', this.reservationForm.value);
  }
}
