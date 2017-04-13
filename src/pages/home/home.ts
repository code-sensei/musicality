import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from "../../providers/auth";

/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService) {
  }


  toLoginPage() {
              this.navCtrl.push('Login');
  }

  toSignupPage() {
              this.navCtrl.push('Signup');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
  }

}
