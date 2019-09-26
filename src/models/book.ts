export class Book {
  auteur: string;
  titre: string;
  isLend: boolean;

  constructor(titre: string) {
    this.titre = titre;
    this.isLend = false;
  }
}
