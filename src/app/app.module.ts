import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {BookListPage} from "../pages/book-list/book-list";
import {CdListPage} from "../pages/cd-list/cd-list";
import {LendBookPage} from "../pages/lend-book/lend-book";
import {LendCdPage} from "../pages/lend-cd/lend-cd";
import {TabsPage} from "../pages/tabs/tabs";
import {SettingsPage} from "../pages/settings/settings";
import {BooksCdService} from "../services/booksCd.service";
import { AuthPage } from '../pages/auth/auth';
import { AuthService } from '../services/auth.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookListPage,
    CdListPage,
    LendBookPage,
    LendCdPage,
    TabsPage,
    SettingsPage, 
    AuthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookListPage,
    CdListPage,
    LendBookPage,
    LendCdPage,
    TabsPage,
    SettingsPage, 
    AuthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BooksCdService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
