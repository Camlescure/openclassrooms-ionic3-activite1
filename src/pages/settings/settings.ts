import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { BooksCdService } from '../../services/booksCd.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public loadingCtrl : LoadingController, public toastCtrl: ToastController, public booksCdService: BooksCdService, public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  onSaveInDB(){
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde des données en cours...'
    }); 
    loader.present();
    this.booksCdService.saveCds().then(
      () => {
        this.booksCdService.saveLivres().then(
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

  onFetchInDB(){
    let loader = this.loadingCtrl.create({
      content : 'Récupération des données en cours'
    });
    loader.present();
    this.booksCdService.retrieveCds().then(
      () => {
        this.booksCdService.retrieveLivres().then(
          () => {
          loader.dismiss();
          this.toastCtrl.create({
            message: 'Données récupérées', 
            duration:3000, 
            position:'botttom'
          }).present();
          }, (error) => {
            loader.dismiss();
            this.toastCtrl.create({
              message:error, 
              duration:3000, 
              position:'bottom'
            }).present();
          });
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
