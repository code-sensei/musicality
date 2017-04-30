import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the Copyright page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-copyright',
  templateUrl: 'copyright.html',
})
export class Copyright {

  constructor(public menu: MenuController,  public navCtrl: NavController, public navParams: NavParams) {
              this.menu.enable(true, 'menu')
  }

  openMenu() {
              this.menu.open()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Copyright');
  }

}
