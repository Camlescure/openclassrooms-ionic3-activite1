import { Component } from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {BooksCdService} from "../../services/booksCd.service";
import {Cd} from "../../models/cd";
import {LendCdPage} from "../lend-cd/lend-cd";




@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdList: Cd[];

  constructor(private menuCtrl: MenuController, private modalCtrl: ModalController, private booksCdService: BooksCdService) {
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

}
