import {Book} from "../models/book";
import {Cd} from "../models/cd";
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { Subject } from "rxjs/Subject";

export class BooksCdService{

  livres$ = new Subject<Book[]>();
  cds$ = new Subject<Cd[]>();

  livresList: Book[] = [
    {
      auteur: 'JK Rowling',
      titre: 'Harry Potter et la chambre des secrets',
      isLend: false
    },
    {
      auteur: 'Stephen King',
      titre: 'Outsider',
      isLend: true
    },
    {
      auteur: 'Alexandre Astier',
      titre: 'Kaamelott: Armée du Necromant',
      isLend: false
    }
  ];

  cdList: Cd[] = [
    {
      interprete: 'Nekfeu',
      titre: 'Les étoiles Vagabondes',
      isLend: true
    },
    {
      interprete: 'Renaud',
      titre: 'Laisse béton',
      isLend: false
    },
    {
      interprete: 'Les Beatles',
      titre: 'Abbey Road',
      isLend: true
    }
  ];

  emitLivres(){
    this.livres$.next(this.livresList.slice());
  }

  emitCd(){
    this.cds$.next(this.cdList.slice());
  }

  lendSomething(type: string, index: number){
    if(type =='cd'){
      this.cdList[index].isLend = !this.cdList[index].isLend;
    }
    else if(type == 'livre'){
      this.livresList[index].isLend = !this.livresList[index].isLend;
    }
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
