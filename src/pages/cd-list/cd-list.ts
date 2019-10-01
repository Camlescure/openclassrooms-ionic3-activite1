import { Component, OnInit, OnDestroy } from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {BooksCdService} from "../../services/booksCd.service";
import {Cd} from "../../models/cd";
import {LendCdPage} from "../lend-cd/lend-cd";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage implements OnInit, OnDestroy{

  cdList: Cd[];
  cdSubscription: Subscription;

  constructor(private menuCtrl: MenuController, private modalCtrl: ModalController, private booksCdService: BooksCdService) {
  }

  ngOnInit(){
    this.cdSubscription = this.booksCdService.cds$.subscribe(
      (cds : Cd[]) => {
        this.cdList = cds.slice();
      }
    )
    this.booksCdService.fetchCDFromStorage();
  }

  onClickCd(index: number){
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  ngOnDestroy(){
    this.cdSubscription.unsubscribe();
  }
}
