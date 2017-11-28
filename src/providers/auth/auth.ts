import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Login } from "../../pages/login/login";
import { Portal } from "../../pages/portal/portal";



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http, public auth: AngularFireAuth, public toast: ToastController, public db: AngularFireDatabase, public store: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  login(email: string, password: string, username: string) {
      this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string, username: string) {
      this.auth.auth.createUserWithEmailAndPassword(email, password).then(() => {
            this.db.database.ref('Users/' + username).set({
                  username: username,
                  email: email,

            }).then(() => {
                  console.log('User account successfully created');
                  let signup_success_toast = this.toast.create({
                        message: 'Account created',
                        position: 'bottom',
                        duration: 2000
                  });
                  signup_success_toast.present();
                  //Store username
                  // this.store.ready().then(() => {
                  //       this.store.set('username', username);
                  // })
            }).catch(err => {
                  console.log('User account could not be created');
                  let signup_error_toast = this.toast.create({
                        message: 'Couldnt create account \n Error: ' + err,
                        position: 'bottom',
                        duration: 2000
                  });
                  signup_error_toast.present();
            })
      })
  }

  logout() {
      this.auth.auth.signOut().then(() => {
            let signout_toast = this.toast.create({
                  message: 'You have signed out of Musicality',
                  position: 'bottom',
                  duration: 3000
            });
            signout_toast.present();
            // this.navCtrl.push(Login);
      })
  }

  change_password(email: string) {
      this.auth.auth.sendPasswordResetEmail(email).then(() => {
            let email_sent_toast = this.toast.create({
                  message: 'Password reset email sent',
                  position: 'bottom',
                  duration: 3000
            });
            email_sent_toast.present();
      })
  }

}
