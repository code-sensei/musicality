import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase, public toast: ToastController) {
    console.log('Hello ProfileProvider Provider');
  }

  save(fullname: string, username: string, email: string, gender: string) {
      this.db.database.ref('Users/' + username).set({
            fullname: fullname,
            username: username,
            email: email,
            gender: gender
      }).then(() => {
            let success_toast = this.toast.create({
                  message: 'Saved',
                  position: 'top',
                  duration: 2000
            });
            success_toast.present();
      }).catch(err => {
            let error_toast = this.toast.create({
                  message: 'Error saving your details \n Error: ' + err,
                  position: 'top',
                  duration: 3000
            });
            error_toast.present();
      })
  }

}
