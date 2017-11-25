import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from "@ionic-native/native-storage";
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";
import { MediaPlugin } from "@ionic-native/media";
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from "@ionic/storage";
import { SocialSharing } from "@ionic-native/social-sharing";
import { InAppBrowser } from "@ionic-native/in-app-browser";

// import * as Blitzr from "blitzr-js-sdk";
const Blitzr = require("blitzr-js-sdk");

import { MyApp } from './app.component';

import { AuthService } from "../providers/auth";
import { SpotifyProvider } from '../providers/spotify/spotify';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '8b6f279e'
  }
};

// const storageSettings: StorageConfig = {
//   name: '--musicality',
//   driverOrder: ['localstorage', 'Indexeddb', 'sqlite', 'websql']
// }

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot({
      name: '__musicality',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    NativeStorage,
    FileChooser,
    FilePath,
    MediaPlugin,
    SocialSharing,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, SpotifyProvider
  ]
})
export class AppModule {}
