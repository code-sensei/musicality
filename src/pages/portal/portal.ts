import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { FileChooser } from "@ionic-native/file-chooser";
import { MediaPlugin, MediaObject } from "@ionic-native/media";
import { FilePath } from "@ionic-native/file-path";

import { MenuController } from "ionic-angular";

import { AuthProvider } from "../../providers/auth/auth";


/**
 * Generated class for the Portal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


declare var _objectInstance;

@IonicPage()
@Component({
  selector: 'page-portal',
  templateUrl: 'portal.html',
  providers: [AuthProvider]
})
export class Portal {
            playing: any
            is_empty: boolean = true
            local_tracks: any[] = []
            local_tracks_paths: string[] = []
            nativePath: string
            current_track: any = {
                        playing: false,
                        index: null
            }
            keys: string[]
            rootPage: any

            saved_tracks: any;
            saved_tracks_paths: any;

  constructor(public menu: MenuController,  public navCtrl: NavController, public navParams: NavParams, private fc: FileChooser, public fp: FilePath, public mp: MediaPlugin, public storage: Storage, public auth: AuthProvider) {
            this.menu.enable(true, 'menu');

            console.log('Current user: ', this.auth.auth.auth.currentUser);

            //Retrieve saved tracks and paths
            this.storage.ready().then(() => {
                        this.storage.get('selected_tracks').then((res) => {
                                    if (res != null) {
                                                this.local_tracks = res
                                                this.is_empty = false
                                    }
                        })
            })

            this.storage.ready().then((res) => {
                        this.storage.get('selected_tracks_paths').then((res) => {
                                    if (res != null) {
                                                 this.local_tracks_paths = res
                                    }
                        })
            })
}

openMenu() {
            this.menu.open()
}

  openPage(p: string) {
              this.rootPage = p
  }

  playItem(i) {
              let track_path = this.local_tracks_paths[i]
              console.log('Path to play: '  + track_path)
              this.mp.create(track_path).play()
            //   .then((file) => {
            //               if (this.current_track.playing) {
            //                           this.current_track.stop()
            //               }
            //                         this.current_track = file
            //                         this.current_track.play();
            //                         this.current_track.playing = true
            //                         this.current_track.index = i

            //                         console.log('Current playing index: ' + this.current_track.index)
            //   }
            // )

            console.log('Local Paths: ' + this.local_tracks_paths)
  }

  uploadLocal() {
            //inittiate File chooser
            this.fc.open().then((uri) => {
                        this.fp.resolveNativePath(uri).then((result) => {
                                    this.nativePath = result //get result native path

                                    console.log(this.nativePath)

                                    //Save path to ${local_track_paths}
                                     this.local_tracks_paths.push(this.nativePath)  

                                     //Save paths locally in storage
                                     this.storage.ready().then(() => {
                                                this.storage.set('selected_tracks_paths', this.local_tracks_paths)
                                     })

                                    console.log('Local Tracks Paths: ' + this.local_tracks_paths)

                                    console.log('Last Added Path: ' + this.local_tracks_paths[this.local_tracks_paths.length - 1])

                                    var song_title: any //holds song title

                                    var path_split: any //holds split native path

                                    path_split = this.nativePath.split('/') 

                                    var split_length = path_split.length - 1 // holds actual song naem gotten from native path

                                    song_title = path_split[split_length] //set ${song_title} to the resulting song name from native path

                                    console.log(song_title) // log song title

                                    alert('Song title: ' + song_title)

                                    //Push song into ${local_tracks}
                                    this.local_tracks.push(song_title)

                                    //Save tracks in local storage
                                    this.storage.ready().then(() => {
                                                this.storage.set('selected_tracks', this.local_tracks)
                                     })

                                    alert(this.local_tracks)
                                    console.log('Local tracks imported: ' + this.local_tracks)

                                    this.is_empty = false;

                                    this.mp.create(this.nativePath, (file) => {
                                          this.current_track = file;

                                          //change $is_empty to false
                                          this.is_empty = false
                                          
                                          //save $local_tracks array to localdb
                                          this.storage.ready().then(() => {
                                                this.storage.set('selected_tracks', this.local_tracks);
                                          }, err => {
                                                alert('media player could not play file');
                                          });
                                    });

                                    // this.mp.create(this.nativePath).then((file) => {
                                    //             // console.error(file);
                                    //             // alert(file)
                                    //             this.current_track = file;
                                    //             this.current_track.play() //remove

                                    //             // console.log(JSON.stringify(file))

                                    //             // var json_file = JSON.stringify(file)

                                    //             //Push chosen file to $local_tracks array
                                    //             // this.local_tracks.push(file)
                                    //             // this.keys = Object.keys(this.local_tracks);
                                    //             // alert(this.local_tracks)

                                    //             //change $is_empty to false
                                    //             this.is_empty = false

                                    //             //save $local_tracks array to localdb
                                    //             this.storage.ready().then(() => {
                                    //                         this.storage.set('selected_tracks', this.local_tracks);
                                    //             })
                                    // })
                        }, (err) => {
                                    //AlertController alert
                                    alert('No FP plugin available')
                        });
                        
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

pauseAudio() {
            this.current_track.pause()
            this.current_track.playing = !this.current_track.playing;
}

playAudio() {
            this.current_track.play()
            this.current_track.playing = !this.current_track.playing;
}

playNext() {
            let index = this.current_track.index;
            
            this.playItem(index + 1);
}

playPrev() {
            let index = this.current_track.index;

            if (index < 0) {
                        //Alet controller to show no previou svailabke
                        alert('NO previous track')
            }

            this.playItem(index - 1);
            
            
}

  ionViewDidLoad() {
               //Retrieve saved tracks and paths
            this.storage.ready().then(() => {
                        this.storage.get('selected_tracks').then((res) => {
                                    if (res != null) {
                                                this.local_tracks = res
                                                this.is_empty = false
                                    }
                        })
            })

            this.storage.ready().then((res) => {
                        this.storage.get('selected_tracks_paths').then((res) => {
                                    if (res != null) {
                                                 this.local_tracks_paths = res
                                    }
                        })
            })
    console.log('ionViewDidLoad Portal');
  }

  ionViewDidEnter() {
                //Retrieve saved tracks and paths
            this.storage.ready().then(() => {
                        this.storage.get('selected_tracks').then((res) => {
                                    if (res != null) {
                                                this.local_tracks = res
                                                this.is_empty = false
                                    }
                        })
            })

            this.storage.ready().then((res) => {
                        this.storage.get('selected_tracks_paths').then((res) => {
                                    if (res != null) {
                                                 this.local_tracks_paths = res
                                    }
                        })
            })
  }

}
