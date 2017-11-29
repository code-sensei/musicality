import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController} from 'ionic-angular';

/**
 * Generated class for the VerifyPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
        this.menu.enable(true);
  }

  open_menu() {
        this.menu.open();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
