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
import { IonicStorageModule } from "@ionic/storage";
import { SocialSharing } from "@ionic-native/social-sharing";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { MyApp } from './app.component';

import { Login } from "../pages/login/login";
import { Signup } from "../pages/signup/signup";
import { Portal } from "../pages/portal/portal";
import { Copyright } from "../pages/copyright/copyright";
import { Feedback } from "../pages/feedback/feedback";
import { Help } from "../pages/help/help";
import { PlayerPage } from "../pages/player/player";
import { Profile } from "../pages/profile/profile";
import { SettingsPage } from "../pages/settings/settings";


import { SpotifyProvider } from '../providers/spotify/spotify';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from "../providers/profile/profile";
import { Home } from '../pages/home/home';

export const firebaseConfig = {
      apiKey: "AIzaSyCQtHDUaBj7YM7m8A7MWor7uZ46d2vaVQI",
      authDomain: "musicality-ac784.firebaseapp.com",
      databaseURL: "https://musicality-ac784.firebaseio.com",
      projectId: "musicality-ac784",
      storageBucket: "musicality-ac784.appspot.com",
      messagingSenderId: "765457800876"
};
@NgModule({
  declarations: [
    MyApp,
    Home,
    Login,
    Signup,
    Portal,
    Copyright,
    Feedback,
    Help,
    PlayerPage,
    Profile,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__musicality',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Login,
    Signup,
    Portal,
    Copyright,
    Feedback,
    Help,
    PlayerPage,
    Profile,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    NativeStorage,
    FileChooser,
    FilePath,
    MediaPlugin,
    SocialSharing,
    InAppBrowser,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, SpotifyProvider,
    ProfileProvider
  ]
})
export class AppModule {}
