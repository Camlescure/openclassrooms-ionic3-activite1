import {Book} from "../models/book";
import {Cd} from "../models/cd";
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage'

@Injectable()
export class BooksCdService{

  constructor (public storage: Storage){}

  livres$ = new Subject<Book[]>();
  cds$ = new Subject<Cd[]>();

  livresList: Book[] = [
    {
      auteur: 'JK Rowling',
      titre: 'Harry Potter et la chambre des secrets',
      isLend: false, 
      lendTo: ''
    },
    {
      auteur: 'Stephen King',
      titre: 'Outsider',
      isLend: true, 
      lendTo: 'Antoine'
    },
    {
      auteur: 'Alexandre Astier',
      titre: 'Kaamelott: Armée du Necromant',
      isLend: false, 
      lendTo: ''
    }
  ];

  cdList: Cd[] = [
    {
      interprete: 'Nekfeu',
      titre: 'Les étoiles Vagabondes',
      isLend: true, 
      lendTo: 'Fred'
    },
    {
      interprete: 'Renaud',
      titre: 'Laisse béton',
      isLend: false, 
      lendTo: ''
    },
    {
      interprete: 'Les Beatles',
      titre: 'Abbey Road',
      isLend: true, 
      lendTo: 'Roger'
    }
  ];

  emitLivres(){
    this.livres$.next(this.livresList.slice());
  }

  emitCd(){
    this.cds$.next(this.cdList.slice());
  }

  lendSomething(type: string, index: number, nom: string){
    if(type =='cd'){
      this.cdList[index].isLend = !this.cdList[index].isLend;
      this.cdList[index].lendTo = nom;
    }
    else if(type == 'livre'){
      this.livresList[index].isLend = !this.livresList[index].isLend;
      this.livresList[index].lendTo = nom;
    }
  }


  saveLivresToStorage(){
    this.storage.set('livres', this.livresList);
  }

  fetchLivresFromStorage(){
    this.storage.get('livres').then(
      (list) => {
        if(list && list.length){
          this.livresList = list.slice();
        }
        this.emitLivres();
      }
    );
  }

  saveCDToStorage(){
    this.storage.set('cd', this.cdList);
  }

  fetchCDFromStorage(){
    this.storage.get('cd').then(
      (list) => {
        if(list && list.length){
          this.cdList = list.slice();
        }
        this.emitCd();
      }
    );
  }

  saveCds(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('cd').set(this.cdList).then(
        (data: Datasnapshot) => {
          resolve(data);  
        }, 
        (error) => {
          reject(error);
        }
      );
    });
  }

  saveLivres(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('livre').set(this.livresList).then(
        (data: Datasnapshot) => {
          resolve(data);
        }, 
        (error) => {
          reject(error);
        }
      );
    });
  }

  retrieveCds(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('cd').once('value').then(
        (data: Datasnapshot) => {
          this.cdList = data.val();
          this.emitCd();
          resolve('Données récupérées avec succès');
        }, 
        (error) => {
          reject(error);
        }
      );
    });
  }

  retrieveLivres(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('livre').once('value').then(
        (data: Datasnapshot) => {
          this.livresList = data.val();
          this.emitLivres();
          resolve('Données récupérées avec succès');
        }, 
        (error) => {
          reject(error);
        }
      );
    });
  }

}
