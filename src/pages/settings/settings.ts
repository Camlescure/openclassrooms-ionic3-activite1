import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

}
