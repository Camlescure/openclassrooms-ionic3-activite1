import {Book} from "../models/book";
import {Cd} from "../models/cd";

export class BooksCdService{
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

  lendSomething(type: string, index: number){
    if(type =='cd'){
      this.cdList[index].isLend = !this.cdList[index].isLend;
    }
    else if(type == 'livre'){
      this.livresList[index].isLend = !this.livresList[index].isLend;
    }
  }

}
