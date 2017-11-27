import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { NativeStorage } from "@ionic-native/native-storage";

import { AuthProvider } from "../../providers/auth/auth";

import { Signup } from "../signup/signup";
import { Portal } from '../portal/portal';

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
  providers: [AuthProvider]
})
export class Login {

            email: string
            password: string
            username: string

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public store: Storage,  public storage: NativeStorage, public load: LoadingController) {
             this.menu.enable(false, 'menu')
             
              //Get user stored username at signup
              this.store.ready().then(() => {
                          this.store.get('username').then((res) => {
                                      this.username = res;
                                      console.log('Username: ' + this.username);
                          })
              })
            // this.storage.getItem('username').then((res) => {
            //             this.username = res;
            //             console.log('Username: ' + this.username);
            // })
  }

  login() {
              let loading = this.load.create({
                          content: 'Logging in...'
              });
              loading.present();
              this.navCtrl.push(Portal);
            this.auth.login(this.email, this.password, this.username);
            setTimeout(() => {
                        loading.dismiss();
            }, 5000)
  }

  toSignupPage() {
              this.navCtrl.push(Signup);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
