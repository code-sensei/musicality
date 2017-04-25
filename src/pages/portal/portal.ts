import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { FileChooser } from "@ionic-native/file-chooser";
import { MediaPlugin, MediaObject } from "@ionic-native/media";
import { FilePath } from "@ionic-native/file-path";


/**
 * Generated class for the Portal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-portal',
  templateUrl: 'portal.html',
  providers: []
})
export class Portal {
            playing: boolean = true
            is_empty: boolean = true
            local_tracks: Object[] = []
            nativePath: string
            current_track: any

            keys: String[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private fc: FileChooser, public fp: FilePath, public mp: MediaPlugin, public storage: Storage) {
  }

  uploadLocal() {
            //inittiate File chooser
            this.fc.open().then((uri) => {
                        this.fp.resolveNativePath(uri).then((result) => {
                                    this.nativePath = result

                                    this.mp.create(this.nativePath).then((file) => {
                                                console.log(file);
                                                alert(file)
                                                this.current_track = file;
                                                this.current_track.play()

                                                //Push chosen file to $local_tracks array
                                                this.local_tracks.push(file)
                                                this.keys = Object.keys(this.local_tracks);
                                                alert(this.local_tracks)

                                                //change $is_empty to false
                                                this.is_empty = false

                                                //save $local_tracks array to localdb
                                                this.storage.ready().then(() => {
                                                            this.storage.set('selected_tracks', this.local_tracks);
                                                })
                                    })
                        }, (err) => {
                                    //AlertController alert
                                    alert('No FP plugin available')
                        })
                        
                        // resolveNativePath(uri, (result) => {
                        //             this.nativePath = result;

                        //             this.mp.create(this.nativePath).then((file: MediaObject) => {
                        //                         file.play()
                        //             })
                        // }, (err) => {
                        //             alert(err);
                        // })
                                                        
             }).catch((e) => {
                         //Alert error with AlertController
                        alert('No FC plugin available')
            })

  }

//   audioplay() {
//     var pathalone = this.nativePath.substring(8);
//     this.file = new this.mp(pathalone, (status) => {
      
//     });
    
//     this.file.play();
//   }

pauseAudio(current_track) {
            current_track = this.current_track
            current_track.pause();
            this.playing = !this.playing;
}

playAudio(current_track) {
            current_track = this.current_track
            current_track.pause();
            this.playing = !this.playing;
}

playNext() {

}

playPrev() {

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Portal');
  }

}
