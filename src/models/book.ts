export class Book {
  auteur: string;
  titre: string;
  isLend: boolean;
  lendTo: string;

  constructor(titre: string) {
    this.titre = titre;
    this.isLend = false;
    this.lendTo = '';
  }
}
