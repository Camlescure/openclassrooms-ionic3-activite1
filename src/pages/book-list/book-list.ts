import { Component } from '@angular/core';
import {IonicPage, MenuController} from 'ionic-angular';
/**
 * Generated class for the BookListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  constructor(private menuCtrl: MenuController) {
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

}
