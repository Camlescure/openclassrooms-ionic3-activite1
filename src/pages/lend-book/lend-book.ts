import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import {Book} from "../../models/book";
import {BooksCdService} from "../../services/booksCd.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})

export class LendBookPage implements OnInit {

  bookForm: FormGroup;
  index: number;
  livre: Book;

  constructor(public formBuilder: FormBuilder, public navParams: NavParams, public viewCtrl: ViewController, public booksCdService: BooksCdService) {
  }


  ngOnInit(){
    this.index = this.navParams.get('index');
    this.livre = this.booksCdService.livresList[this.index];
    this.initForm();
  }

  initForm(){
    this.bookForm = this.formBuilder.group({
      nom: ['', Validators.required]
    });
  }

  dismissModal(){
    this.viewCtrl.dismiss()
  }

  onLend(){
    if(this.livre.isLend == false){
      this.booksCdService.lendSomething('livre', this.index, this.bookForm.get('nom').value);
    } else {
      this.booksCdService.lendSomething('livre', this.index, '');
    }
  }



}
