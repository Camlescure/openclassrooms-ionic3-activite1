import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {BooksCdService} from "../../services/booksCd.service";
import {Cd} from "../../models/cd";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  cdForm : FormGroup;
  index: number;
  cd: Cd;

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public booksCdService: BooksCdService) {
  }

  ngOnInit(){
      this.index = this.navParams.get('index');
      this.cd = this.booksCdService.cdList[this.index];
      this.initForm();
  }

  initForm(){
    this.cdForm = this.formBuilder.group({
      nom: ['', Validators.required]
    });
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  onLend(){
    if(this.cd.isLend == false){
      this.booksCdService.lendSomething('cd', this.index, this.cdForm.get('nom').value);
    } else {
      this.booksCdService.lendSomething('cd', this.index, '');
    }
    this.booksCdService.saveCDToStorage();
    this.viewCtrl.dismiss();
  }



}
