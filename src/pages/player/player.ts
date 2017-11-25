import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the PlayerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

      track: any;
      track_uri: SafeResourceUrl;

  constructor(public navCtrl: NavController, public domSanitizer: DomSanitizer,  public navParams: NavParams, public iab: InAppBrowser) {
        this.track = this.navParams.get('track');
        this.track_uri = this.domSanitizer.bypassSecurityTrustResourceUrl('https://embed.spotify.com/?uri=' + this.track.uri);
        console.log('URI: ' + this.track_uri);
  }

  download() {
        this.iab.create('https://google.com/search?q=' + this.track.name + ' free mp3 download');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
  }

}
