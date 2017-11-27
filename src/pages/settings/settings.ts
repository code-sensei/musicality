import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { Help } from "../help/help";
import { AngularFireDatabase } from "angularfire2/database";

import { AuthProvider } from "../../providers/auth/auth";
import { ProfileProvider } from "../../providers/profile/profile";
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [AuthProvider, ProfileProvider]
})
export class SettingsPage {

      fullname: string;
      username: string;
      email: string;
      gender: any;

  constructor(public menu: MenuController ,public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public profile: ProfileProvider, public db: AngularFireDatabase, public store: Storage) {
      this.menu.enable(true, 'menu');

      this.store.ready().then(() => {
            this.store.get('username').then((res) => {
                  this.username = res;
                  console.log('Username: ', this.username);
            }).then(() => {
                  this.db.database.ref('Users/' + this.username).once('value').then((snap) => {
                        let val = snap.val();
                         console.log('Value', val);
                         this.email = val.email;
                         this.gender = val.gender;
                         this.fullname = val.fullname;
                  })
            })
      });
  }

  openMenu() {
      this.menu.open()
}

  change_password() {

  }

  open_help_page() {
        this.navCtrl.push(Help);
  }

  logout() {
      this.auth.logout();
  }

  remember_me() {
      //   if (this.remember === 'true') {
      //         //remember login information by saving locally

      //   }
  }

  save(fullname: string, username: string, email: string, gender: string) {
      this.profile.save(fullname, username, email, gender);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
