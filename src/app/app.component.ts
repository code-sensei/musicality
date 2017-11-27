import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from "../providers/auth/auth";

import { Home } from "../pages/home/home";
import { Login } from "../pages/login/login";
import { Signup } from "../pages/signup/signup";
import { Portal } from "../pages/portal/portal";
import { Copyright } from "../pages/copyright/copyright";
import { Feedback } from "../pages/feedback/feedback";
import { Help } from "../pages/help/help";
import { PlayerPage } from "../pages/player/player";
import { Profile } from "../pages/profile/profile";
import { SettingsPage } from "../pages/settings/settings";

@Component({
  templateUrl: 'app.html',
  providers: [AuthProvider]
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
  private discoverPage;

  private settingsPage;
  private icon: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public firebase: AuthProvider) {

              this.icon="../assets/checked.png";

            this.portalPage = Portal;
            this.feedbackPage = Feedback;
            this.copyrightPage = Copyright;
            this.loginPage = Login;
            this.helpPage = Help;
            this.profilePage = Profile;
            this.homePage = Home;
            this.discoverPage = 'Discover';
            this.settingsPage = SettingsPage;

            

            // Change after auth.ts is changed to firebase
            if(this.firebase.auth.auth.currentUser != null) {
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

  logout() {

  }

}

