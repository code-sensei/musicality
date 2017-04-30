import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

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

  constructor(public menu: MenuController,  public navCtrl: NavController, public navParams: NavParams) {
              this.menu.enable(true, 'menu')
  }

  openMenu() {
              this.menu.open()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Feedback');
  }

}
