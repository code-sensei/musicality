import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { AuthService } from "../../providers/auth";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class Login {

            email: string
            password: string
            username: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public store: Storage) {
              //Get user stored username at signup
              this.store.ready().then(() => {
                          this.store.get('username').then((res) => {
                                      this.username = res;
                          })
              })
  }

  login() {
            this.auth.login(this.email, this.password, this.username);
  }

  toSignupPage() {
              this.navCtrl.push('Signup');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
