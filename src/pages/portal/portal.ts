import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
            local_tracks: any[] = []
            nativePath: string
            file;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fc: FileChooser, public fp: FilePath, public mp: MediaPlugin) {
  }

  uploadLocal() {
            //inittiate File chooser
            this.fc.open().then((uri) => {
                        this.fp.resolveNativePath(uri).then((result) => {
                                    this.nativePath = result

                                    this.mp.create(this.nativePath).then((file: MediaObject) => {
                                                file.play()
                                    })
                        }, (err) => {
                                    //AlertController alert
                                    alert(err)
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
                        alert(e)
            })

            //Push chosen file to $local_tracks array

            //change $is_empty to false

            //save $local_tracks array to localdb
  }

//   audioplay() {
//     var pathalone = this.nativePath.substring(8);
//     this.file = new this.mp(pathalone, (status) => {
      
//     });
    
//     this.file.play();
//   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Portal');
  }

}
