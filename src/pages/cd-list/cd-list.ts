import { Component } from '@angular/core';
import {IonicPage, MenuController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  constructor(private menuCtrl: MenuController) {
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

}
