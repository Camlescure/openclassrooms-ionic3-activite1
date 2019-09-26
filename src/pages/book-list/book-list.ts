import { Component } from '@angular/core';
import { MenuController} from 'ionic-angular';
import {LendBookPage} from "../lend-book/lend-book";
import { ModalController } from 'ionic-angular';
import {BooksCdService} from "../../services/booksCd.service";
import {Book} from "../../models/book";

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  livresList: Book[];

  constructor(private menuCtrl: MenuController, private modalCtrl: ModalController, private booksCdService: BooksCdService) {
  }

  ionViewWillEnter() {
    this.livresList = this.booksCdService.livresList.slice();
  }

  onClickLivre(index: number){
      let modal = this.modalCtrl.create(LendBookPage, {index: index});
      modal.present();
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

}
