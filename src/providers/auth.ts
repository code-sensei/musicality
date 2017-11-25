import { Injectable } from '@angular/core';
import { ToastController, AlertController } from "ionic-angular";
import { Auth, User, UserDetails, IDetailedError } from "@ionic/cloud-angular";
import { Storage } from "@ionic/storage";
import { NativeStorage } from "@ionic-native/native-storage";
import 'rxjs/add/operator/map';

import 'firebase'
import { Firebase } from 'ionic-native';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

      // TODO: Change to firebase auth

  constructor(public auth: Auth, public user: User, public toast: ToastController, public alert: AlertController, public store: Storage, public storage: NativeStorage) {
    console.log('Hello Auth Provider');
  }

  signup(email, password, username) {
              console.log('Details: ' + email + ' ' + password + ' ' + username)
            let details: UserDetails = {'email': email, 'password': password};

            this.auth.signup(details).then(() => {
                        // this.storage.setItem('username', username).then(() => {
                        //             console.log('Username stored!')
                        // })
                        // this.storage.setItem('email', email).then(() => {
                        //             console.log('email stored!')
                        // })
                        // this.storage.setItem('password', password).then(() => {
                        //             console.log('password stored!')
                        // })
                        this.store.ready().then(() => {
                                    this.store.set('email', email)
                                    this.store.set('password', password)
                                    this.store.set('username', username)
                        })
                        // `this.user` is now registered
                        let toast = this.toast.create({
                                    message: 'Welcome ' + username,
                                    duration: 3000
                        });
                        toast.present();
            }, (err: IDetailedError<string[]>) => {
                        for (let e of err.details) {
                                    if (e === 'conflict_email') {
                                                let alert = this.alert.create({
                                                            title: 'Email already exists.',
                                                            subTitle: 'Please confirm the email entered is correct or try another one',
                                                            buttons: ['Ok']
                                                });
                                                alert.present();
                                    } else {
                                                // handle other errors
                                                let alert = this.alert.create({
                                                            title: 'Unknown error.',
                                                            subTitle: 'An unknown error occured please check again with us later',
                                                            buttons: ['Ok']
                                                });
                                                alert.present();
                                     }
                        }
            });
  }//signup end

  login(email, password, username) {
              let details = {'email': email, 'password': password};

             this.auth.login('basic', details).then( () => {
                        // `this.user` is now logged in
                        let toast = this.toast.create({
                                    message: 'Welcome back ' + username,
                                    duration: 3000
                        });
                        toast.present();
             });
  }//login end

  logout() {
      
  }

}
