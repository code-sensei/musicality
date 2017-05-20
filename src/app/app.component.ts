import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Auth } from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = 'Home';

  private portalPage;
  private feedbackPage;
  private copyrightPage;
  private helpPage;
  private loginPage;
  private profilePage;
  private homePage;

  private icon: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public auth: Auth) {

              this.icon="../assets/checked.png";

            this.portalPage = 'Portal';
            this.feedbackPage = 'Feedback';
            this.copyrightPage = 'Copyright';
            this.loginPage = 'Login';
            this.helpPage = 'Help';
            this.profilePage = 'Profile';
            this.homePage = 'Home';

            if(this.auth.isAuthenticated()) {
                         this.rootPage = this.portalPage
            } else {
                        this.rootPage = this.homePage
            }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(p) {
            this.rootPage = p;
  }

}

