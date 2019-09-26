import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import {Book} from "../../models/book";
import {BooksCdService} from "../../services/booksCd.service";

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})

export class LendBookPage implements OnInit {

  index: number;
  livre: Book;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public booksCdService: BooksCdService) {
  }


  ngOnInit(){
    this.index = this.navParams.get('index');
    this.livre = this.booksCdService.livresList[this.index];
  }

  dismissModal(){
    this.viewCtrl.dismiss()
  }

  onLend(){
    this.booksCdService.lendSomething('livre', this.index);
  }



}
