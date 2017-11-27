import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController} from 'ionic-angular';

import { AuthProvider } from "../../providers/auth/auth";

import { Login } from "../login/login";
import { Signup } from "../signup/signup";

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
  providers: [AuthProvider]
})
export class Home {

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
              this.menu.enable(false, 'menu')
  }


  toLoginPage() {
              this.navCtrl.push(Login);
  }

  toSignupPage() {
              this.navCtrl.push(Signup);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
  }

}
