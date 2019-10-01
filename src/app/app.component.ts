import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';

import {SettingsPage} from "../pages/settings/settings";
import {TabsPage} from "../pages/tabs/tabs";
import { AuthPage } from '../pages/auth/auth';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  settingsPage: any = SettingsPage
  tabsPage: any = TabsPage;
  authPage: any = AuthPage;
  @ViewChild('content') content: NavController;

  isAuth: boolean;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController) {
      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
        let config = {
          apiKey: "AIzaSyAII_xN-gQGbDrf-RiTvySbqP6p5USFYi8",
          authDomain: "ionic-livresetcd.firebaseapp.com",
          databaseURL: "https://ionic-livresetcd.firebaseio.com/",
          projectId: "ionic-livresetcd",
          storageBucket: "",
          messagingSenderId: "912964085578"
        };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              this.isAuth = true;
              this.content.setRoot(TabsPage);
            } else {
              this.isAuth = false;
              this.content.setRoot(AuthPage, {mode: 'connect'});
            }
          }
        );
      });  
    }
  
    onDisconnect(){
      firebase.auth().signOut();
      this.menuCtrl.close();
    }

    onNavigate(page: any, data?: {}) {
      this.content.setRoot(page, data ? data : null);
      this.menuCtrl.close();
    }
}

