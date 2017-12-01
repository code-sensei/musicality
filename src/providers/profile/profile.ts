import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { SMS, SmsOptions, SmsOptionsAndroid } from '@ionic-native/sms'
import { Storage } from "@ionic/storage";
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public auth: AngularFireAuth, public db: AngularFireDatabase, public toast: ToastController, public sms: SMS, public store: Storage) {
    console.log('Hello ProfileProvider Provider');
  }

  save(fullname: string, username: string, email: string, gender: string, phone: any) {
      this.db.database.ref('Users/' + username).set({
            fullname: fullname,
            username: username,
            email: email,
            gender: gender,
            phone: phone
      }).then(() => {
            let success_toast = this.toast.create({
                  message: 'Saved',
                  position: 'top',
                  duration: 2000
            });
            success_toast.present();      
            //Generate verification code
            let code = Math.random() * (999999 - 123456) - 123456;
            //Save code locally to compare
            this.store.ready().then(() => {
                  this.store.set('sms_code', code);
            });
            let message = 'Here is your code to verify your phone number on musicality \n\n' + code + 'Thank You!';
            //Send sms
            this.verify_phone(phone, message);
      }).catch(err => {
            let error_toast = this.toast.create({
                  message: 'Error saving your details \n Error: ' + err,
                  position: 'top',
                  duration: 3000
            });
            error_toast.present();
      })
  }

  verify_phone(phone: string, message: string) {
      //Send verification sms to saved phone_no
      // this.sms.hasPermission().then((res) => {
            let android_opts: SmsOptionsAndroid = {
                  intent: ''
            }
            let opts: SmsOptions = {
                  replaceLineBreaks: true,
                  android: android_opts
            }
            // if (res) {
                  this.sms.send(phone, message).then(() => {
                        let success_toast = this.toast.create({
                              message: 'A verification sms has been sent.',
                              position: 'bottom',
                              duration: 5000
                        });
                        success_toast.present();
                  })
            // } else {
            //       let error_toast = this.toast.create({
            //             message: 'Error sending verification sms',
            //             position: 'bottom',
            //             duration: 3000
            //       });
            //       error_toast.present();
            // }
            // });
  }

}
