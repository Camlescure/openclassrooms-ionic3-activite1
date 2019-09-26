import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {BooksCdService} from "../../services/booksCd.service";
import {Cd} from "../../models/cd";

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  index: number;
  cd: Cd;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public booksCdService: BooksCdService) {
  }

  ngOnInit(){
      this.index = this.navParams.get('index');
      this.cd = this.booksCdService.cdList[this.index];
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  onLend(){
    this.booksCdService.lendSomething('cd', this.index);
  }



}
