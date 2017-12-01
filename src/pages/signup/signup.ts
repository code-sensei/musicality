import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
// import { EmailComposer } from "@ionic-native/email-composer";

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

  signup(email: string, password: string, username: string) {
      console.log('Signup details: ', email, password, username)
              let loading = this.load.create({
                  content: 'Signing you up for the service'
              });
              loading.present();
              this.auth.auth.createUserWithEmailAndPassword(email, password).then(() => {
                    alert('Username on signup: ' + username);
                  this.db.database.ref('Users/' + username).set({
                        username: username,
                        email: email
                  }).then(() => {
                        console.log('User account successfully created');
                        let signup_success_toast = this.toast.create({
                              message: 'Account created',
                              position: 'bottom',
                              duration: 2000
                        });
                        let verify_mail_toast = this.toast.create({
                              message: 'A verification email has been sent. Please verify your email',
                              position: 'bottom',
                              duration: 5000
                        });
                        signup_success_toast.present();
                        //save user's username as displayName on firebase auth
                        // this.auth.auth.currentUser.displayName = username;
                        //Navigate to Portal Page
                        this.navCtrl.push(Portal);
                        //Dismiss loader
                        loading.dismiss();
                        //Verify email
                        this.verify_email();
                        //Present verify_email_toast
                        verify_mail_toast.present();
                        // Store username
                        this.store.ready().then(() => {
                              this.store.set('username', username);
                              this.store.set('current_user', this.auth.auth.currentUser.email);
                        });

                        //Store user email in emails db route
                        // this.db.database.ref('Emails/' + email).set({
                        //       username: username
                        // }).then(() => {
                        //       console.log('Username saved under Emails/');
                        // })
                  }, (err) => {
                        this.navCtrl.push(Home);
                        loading.dismiss();
                        console.log('User account could not be created', err);
                        let signup_error_toast = this.toast.create({
                              message: '' + err.message,
                              position: 'bottom',
                              duration: 5000
                        });
                        signup_error_toast.present();
                  }).catch(err => {
                        this.navCtrl.push(Home);
                        loading.dismiss();
                        console.log('User account could not be created', err);
                        let signup_error_toast = this.toast.create({
                              message: 'Couldnt create account \n Error: ' + err,
                              position: 'bottom',
                              duration: 2000
                        });
                        signup_error_toast.present();
                  });
            }, (err) => {
                  loading.dismiss();
                  console.log('User account could not be created', err);
                  let signup_error_toast = this.toast.create({
                        message: '' + err.message,
                        position: 'bottom',
                        duration: 5000
                  });
                  signup_error_toast.present();
            });
  }

  verify_email() {
      this.auth.auth.currentUser.sendEmailVerification();
  }

  toLoginPage() {
              this.navCtrl.push(Login);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

}
