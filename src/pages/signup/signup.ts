import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';

import { AuthProvider } from "../../providers/auth/auth";

import { Login } from "../login/login";
import { Portal } from "../portal/portal";

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
  providers: [AuthProvider]
})
export class Signup {

            email: string
            password: string
            username: string

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider,
                        public load: LoadingController) {
                                    this.menu.enable(false, 'menu')
  }

  signup() {

              let loading = this.load.create({
                          content: 'Signing you up for the service'
              });
              loading.present();
              this.navCtrl.push(Portal);
             this.auth.signup(this.email, this.password, this.username)
            //  this.navCtrl.push('Portal')
             setTimeout(() =>{
                         loading.dismiss();
             }, 5000)
  }

  toLoginPage() {
              this.navCtrl.push(Login);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

}
