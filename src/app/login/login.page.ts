import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/shared/user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  user: User = { username: '', password: '' };
  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private storage: Storage) {
    this.createLoginForm();
    storage.get('user')
      .then((user) => {
        if (user) {
          console.log(user);
          this.user = user;
          this.loginForm
            .patchValue({
              'username': this.user.username,
              'password': this.user.password
            });
        } else {
          console.log('user not defined');
        }
      });
  }

  ngOnInit() {
  }

  createLoginForm = () => {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.loginForm.value, this.user);
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    console.log(this.user);
    if (this.loginForm.get('remember').value) {
      this.storage.set('user', this.user);
    } else {
      this.storage.remove('user');
    }
  }
}
