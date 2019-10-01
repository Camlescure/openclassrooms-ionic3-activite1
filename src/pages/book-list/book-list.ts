import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController} from 'ionic-angular';
import {LendBookPage} from "../lend-book/lend-book";
import { ModalController } from 'ionic-angular';
import {BooksCdService} from "../../services/booksCd.service";
import {Book} from "../../models/book";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage implements OnInit, OnDestroy{

  livresList: Book[];
  livreSubscription: Subscription;

  constructor(private menuCtrl: MenuController, private modalCtrl: ModalController, private booksCdService: BooksCdService) {
  }

  ngOnInit(){
    this.livreSubscription = this.booksCdService.livres$.subscribe(
      (livres : Book[]) => {
        this.livresList = livres.slice();
      }
    )
    this.booksCdService.fetchLivresFromStorage();
  }

  ngOnDestroy(){
    this.livreSubscription.unsubscribe();
  }

  onClickLivre(index: number){
      let modal = this.modalCtrl.create(LendBookPage, {index: index});
      modal.present();
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }
}