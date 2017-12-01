import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { NativeStorage } from "@ionic-native/native-storage";

import { AuthProvider } from "../../providers/auth/auth";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';

import { Signup } from "../signup/signup";
import { Portal } from '../portal/portal';
import { Home } from '../home/home';

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

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public store: Storage,  public storage: NativeStorage, public load: LoadingController, public auth: AngularFireAuth, public toast: ToastController, public db: AngularFireDatabase, public alert: AlertController) {
             this.menu.enable(false, 'menu')
             
            //   //Get username from DB based on email entered
            //   this.store.ready().then(() => {
            //               this.store.get('username').then((res) => {
            //                           this.username = res;
            //                           console.log('Username: ' + this.username);
            //               })
            //   })
            // this.storage.getItem('username').then((res) => {
            //             this.username = res;
            //             console.log('Username: ' + this.username);
            // })
  }

  login(username: string, password: string) {
              let loading = this.load.create({
                          content: 'Logging in...'
              });
              loading.present();
              this.db.database.ref('Users/' + username).once('value').then((res) => {
                    console.log('User res: ', res.val())
                  let email = res.val().email;

                  this.auth.auth.signInWithEmailAndPassword(email, password).then(() => {
                        let login_toast = this.toast.create({
                              message: 'login successful',
                              position: 'bottom',
                              duration: 3000
                        });
                        login_toast.present();
                        this.navCtrl.push(Portal);
                        loading.dismiss();
                        this.store.ready().then(() => {
                              this.store.set('username', username);
                              this.store.set('current_user', this.auth.auth.currentUser.email);
                        });
                  }).catch(err => {
                        let login_error_toast = this.toast.create({
                              message: 'Couldn\'t log you in \n Error: ' + err,
                              position: 'bottom',
                              duration: 3000
                        });
                        login_error_toast.present();
                        this.navCtrl.push(Home);
                        loading.dismiss();
                  });

              });
            setTimeout(() => {
                        loading.dismiss();
            }, 5000)
  }

  forgot_password() {
      let popup = this.alert.create({
            title: 'Forgot Password',
            message: 'Enter the email connected to you account',
            inputs: [
                  {
                        name: 'email',
                        placeholder: 'Email address'
                  }
            ],
            buttons: [
                  {
                        text: 'reset password',
                        handler: (data) => {
                              //describe toast
                              let toast = this.toast.create({
                                    message: 'Password reset email sent',
                                    position: 'bottom',
                                    duration: 3000
                              });
                              //Send password reset email
                              this.auth.auth.sendPasswordResetEmail(data.email);
                              //Present toast
                              toast.present();
                        }
                  }
            ]
      });
      popup.present();
  }

  toSignupPage() {
              this.navCtrl.push(Signup);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
