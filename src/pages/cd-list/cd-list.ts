import { Component } from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {BooksCdService} from "../../services/booksCd.service";
import {Cd} from "../../models/cd";
import {LendCdPage} from "../lend-cd/lend-cd";
import { ToastController, LoadingController } from 'ionic-angular';



@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdList: Cd[];

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private menuCtrl: MenuController, private modalCtrl: ModalController, private booksCdService: BooksCdService) {
  }

  ionViewWillEnter(){
    this.cdList = this.booksCdService.cdList.slice();
  }

  onClickCd(index: number){
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  onSaveCdInDB(){
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde des données en cours...'
    }); 
    loader.present();
    this.booksCdService.saveCds().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données sauvegardées !', 
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

  onFetchCdInDB(){
    let loader = this.loadingCtrl.create({
      content : 'Récupération des données en cours'
    });
    loader.present();
    this.booksCdService.retrieveCds().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données récupérées', 
          duration:3000, 
          position:'botttom'
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
}
