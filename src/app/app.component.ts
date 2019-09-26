import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import {TabsPage} from "../pages/tabs/tabs";
import {BookListPage} from "../pages/book-list/book-list";
import {CdListPage} from "../pages/cd-list/cd-list";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  bookListPage: any = BookListPage;
  cdListPage: any = CdListPage;
  @ViewChild('content') content: NavController;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onNavigate(page: any){
    this.content.setRoot(page);
    this.menuCtrl.close();
  }
}

