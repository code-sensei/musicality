import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { SpotifyProvider } from "../../providers/spotify/spotify";
/**
 * Generated class for the Discover page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
  providers: [SpotifyProvider]
})
export class Discover {

      keyword: string = '';
      tracks: any;

  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public spotify: SpotifyProvider) {
      this.menu.enable(true, 'menu')
  }

  openMenu() {
        this.menu.open();
  }

  discover() {
      //   this.spotify.authorize();
      this.spotify.discover(this.keyword); 
      this.tracks = this.spotify.tracks;
  }

  trackDetail(i) {
      this.navCtrl.push('PlayerPage', {
            track: this.tracks[i],
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Discover');
  }

}
