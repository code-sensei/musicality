import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { EmailComposer } from "@ionic-native/email-composer";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Toast } from 'ionic-angular/components/toast/toast';

/**
 * Generated class for the Feedback page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class Feedback {

      fullname: string;
      subject: string;
      message: string;

  constructor(public menu: MenuController,  public navCtrl: NavController, public navParams: NavParams, public mail: SocialSharing, private toast: ToastController) {
              this.menu.enable(true, 'menu')
  }

  sendMail(fullname: string, subject: string, message: string) {
        this.mail.canShareViaEmail().then(() => {
              this.mail.shareViaEmail(message + '\n\n\n From: ' + fullname, subject, ['jctrev01@gmail.com']).then(() => {
                  let success_toast = this.toast.create({
                        message: 'Email sent',
                        position: 'bottom',
                        duration: 3000
                  });
                  success_toast.present();
              }).catch((err) => {
                  let err_toast = this.toast.create({
                        message: 'Email could not be sent Error: \n\n \t' + err,
                        position: 'bottom',
                        duration: 3000
                  });
                  err_toast.present();
              }).catch((err) => {
                  let err_toast = this.toast.create({
                        message: 'Email can not be sent Error: \n\n \t' + err,
                        position: 'bottom',
                        duration: 3000
                  });
                  err_toast.present();
              })
        })
      //   this.mail.isAvailable().then(() => {
      //         if (this.mail.hasPermission()) {
      //               this.mail.open({
      //                     to: 'jctrev01@gmail.com',
      //                     subject: subject + ' by ' + fullname,
      //                     body: message
      //               }).then(() => {
      //                     let success_toast = this.toast.create({
      //                           message: 'Email sent',
      //                           position: 'bottom',
      //                           duration: 3000
      //                     });
      //                     success_toast.present();
      //               }).catch((err) => {
      //                     let err_toast = this.toast.create({
      //                           message: 'Email could not be sent Error: \n\n \t' + err,
      //                           position: 'bottom',
      //                           duration: 3000
      //                     });
      //                     err_toast.present();
      //               })
      //         } else {
      //               this.mail.requestPermission().then(() => {
      //                   this.mail.open({
      //                         to: 'jctrev01@gmail.com',
      //                         subject: subject + ' by ' + fullname,
      //                         body: message
      //                   }).then(() => {
      //                         let success_toast = this.toast.create({
      //                               message: 'Email sent',
      //                               position: 'bottom',
      //                               duration: 3000
      //                         });
      //                         success_toast.present();
      //                   }).catch((err) => {
      //                         let err_toast = this.toast.create({
      //                               message: 'Email could not be sent Error: \n\n \t' + err,
      //                               position: 'bottom',
      //                               duration: 3000
      //                         });
      //                         err_toast.present();
      //                   })
      //               });
      //         }
      //   })
  }

  openMenu() {
              this.menu.open()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Feedback');
  }

}
