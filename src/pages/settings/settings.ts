import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Help } from "../help/help";

import { AuthService } from "../../providers/auth";
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
})
export class SettingsPage {

      fullname: string;
      username: string;
      bio: string;
      email: string;
      gender: any;

      remember: boolean;

  constructor(public menu: MenuController ,public navCtrl: NavController, public navParams: NavParams, public auth: AuthService) {
      this.menu.enable(true, 'menu');
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
        if (this.remember === true) {
              //remember login information by saving locally

        }
  }

  save() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
