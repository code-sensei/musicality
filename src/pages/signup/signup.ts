import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService,
                        public load: LoadingController) {
  }

  signup() {

              let loading = this.load.create({
                          content: 'Signing you up for the service'
              });
              loading.present();
             this.auth.signup(this.email, this.password, this.username)
             this.navCtrl.push('Portal')
             setTimeout(() =>{
                         loading.dismiss();
             }, 5000)
  }

  toLoginPage() {
              this.navCtrl.push('Login');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

}
