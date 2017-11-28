import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { AuthProvider } from "../../providers/auth/auth";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';

import { Login } from "../login/login";
import { Portal } from "../portal/portal";
import { Home } from '../home/home';

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

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public auth: AngularFireAuth, public toast: ToastController, public db: AngularFireDatabase, public load: LoadingController, public store: Storage) {
                                    this.menu.enable(false, 'menu')
  }

  signup() {

              let loading = this.load.create({
                          content: 'Signing you up for the service'
              });
              loading.present();
              this.navCtrl.push(Portal);
              this.auth.auth.createUserWithEmailAndPassword(this.email, this.password).then(() => {
                  this.db.database.ref('Users/' + this.username).set({
                        username: this.username,
                        email: this.email,
      
                  }).then(() => {
                        console.log('User account successfully created');
                        let signup_success_toast = this.toast.create({
                              message: 'Account created',
                              position: 'bottom',
                              duration: 2000
                        });
                        signup_success_toast.present();
                        this.navCtrl.push(Portal);
                        // Store username
                        this.store.ready().then(() => {
                              this.store.set('username', this.username);
                        })
                  }).catch(err => {
                        console.log('User account could not be created');
                        let signup_error_toast = this.toast.create({
                              message: 'Couldnt create account \n Error: ' + err,
                              position: 'bottom',
                              duration: 2000
                        });
                        signup_error_toast.present();
                        this.navCtrl.push(Home);
                  })
            })
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
