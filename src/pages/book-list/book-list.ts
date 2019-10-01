import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController} from 'ionic-angular';
import {LendBookPage} from "../lend-book/lend-book";
import { ModalController } from 'ionic-angular';
import {BooksCdService} from "../../services/booksCd.service";
import {Book} from "../../models/book";
import { LoadingController, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage implements OnInit, OnDestroy{

  livresList: Book[];
  livreSubscription: Subscription;

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private menuCtrl: MenuController, private modalCtrl: ModalController, private booksCdService: BooksCdService) {
  }

  ngOnInit(){
    this.livreSubscription = this.booksCdService.livres$.subscribe(
      (livres : Book[]) => {
        this.livresList = livres.slice();
      }
    )
    this.booksCdService.emitLivres();
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

  onSaveBooksInDB(){
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours...'
    });
    loader.present();
    this.booksCdService.saveLivres().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message:'Données sauvegardées !', 
          duration:3000, 
          position:'bottom'
        }).present();
      }, 
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message:error, 
          duration:3000, 
          position:'bottom'
        }).present();
      }
    );
  }

  onFetchBooksInDB(){
    let loader = this.loadingCtrl.create({
      content: 'Récupération des données en cours'
    });
    loader.present();
    this.booksCdService.retrieveLivres().then(
      ()=> {
        loader.dismiss();
        this.toastCtrl.create({
          message:'Données récupérées', 
          duration:3000, 
          position:'bottom'
        }).present();
      }, 
      (error) => {
        loader.dismiss(), 
        this.toastCtrl.create({
          message:error, 
          duration:3000, 
          position:'bottom'
        }).present();
      }
    );
  }

}