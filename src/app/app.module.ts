import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule, StorageConfig } from "@ionic/storage";

import { MyApp } from './app.component';

import { AuthService } from "../providers/auth";


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
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
