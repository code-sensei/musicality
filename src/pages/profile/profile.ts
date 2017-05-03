import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
            fullname: string = 'Tsowa Babangida'

            dummy_e : string[] = [
                        'tsowababangida@gmail.com',
                        'mainasara@mail.com'
            ]
            dummy_m: string[] = [
                        '+2347050706655'
            ]
            profile_img : string = '../assets/jasper.jpg'

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
              this.menu.enable(true, 'menu')
  }

  openMenu() {
              this.menu.open()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

}
