import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from "../../providers/auth";

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

            email: string
            password: string
            username: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService) {
  }

  signup() {
            this.auth.signup(this.email, this.password, this.username)
  }

  toLoginPage() {
              this.navCtrl.push('Login');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

}
