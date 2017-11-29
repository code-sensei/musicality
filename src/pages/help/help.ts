import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';

import { SocialSharing } from "@ionic-native/social-sharing";

/**
 * Generated class for the Help page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class Help {

  constructor(public menu: MenuController, public alert: AlertController,  public navCtrl: NavController, public navParams: NavParams, public social: SocialSharing, private toast: ToastController) {
              this.menu.enable(true, 'menu')
  }

openMenu() {
            this.menu.open()
}

uiHelp() {
            let prompt = this.alert.create({
      title: 'UI Help',
      message: "What seems to be the problem",
      inputs: [
                  {
                        name: 'fullname',
                        placeholder: 'Your name'
                  },
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
                    name: 'sitrep',
                    placeholder: 'Situation'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            // Check if sharing via email is supported
            this.social.canShareViaEmail().then(() => {
            // Sharing via email is possible
            // Share via email
            this.social.shareViaEmail('From: ' + data.fullname + '\n ' + 'Title: ' + data.title + ' \n' + 'Situation: ' + data.sitrep , 'Musicality Help', ['jctrev01@gmail.com']).then(() => {
            // Success!
            let success_toast = this.toast.create({
                  message: 'Email sent',
                  position: 'bottom',
                  duration: 3000
            });
            success_toast.present();
            }).catch((err) => {
            // Error!
            let err_toast = this.toast.create({
                  message: 'Email could not be sent Error: \n\n \t' + err,
                  position: 'bottom',
                  duration: 3000
            });
            err_toast.present();
            });
            }).catch((err) => {
            // Sharing via email is not possible
            let err_toast = this.toast.create({
                  message: 'Email can not be sent Error: \n\n \t' + err,
                  position: 'bottom',
                  duration: 3000
            });
            err_toast.present();
            });
          }
        }
      ]
    });
    prompt.present();
}

funcHelp() {
            let prompt = this.alert.create({
      title: 'Functionality Help',
      message: "What is the problem?",
      inputs: [
                  {
                        name: 'fullname',
                        placeholder: 'Your name'
                  },
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
                    name: 'page',
                    placeholder: 'Page where problem exists'
        },
        {
                    name: 'sitrep',
                    placeholder: 'Situation'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
             // Check if sharing via email is supported
            this.social.canShareViaEmail().then(() => {
            // Sharing via email is possible
            // Share via email
            this.social.shareViaEmail('From: ' + data.fullname + '\n ' + 'Title: ' + data.title + ' \n' + 'Component with problem: ' + data.page + '\n ' + 'Situation: ' + data.sitrep , 'Musicality Help', ['jctrev01@gmail.com']).then(() => {
            // Success!
            alert('Email sent')
            }).catch(() => {
            // Error!
            alert('Failed to send email')
            });
            }).catch(() => {
            // Sharing via email is not possible
            alert('Cannot send email. Try again later')
            });
          }
        }
      ]
    });
    prompt.present();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad Help');
  }

}
