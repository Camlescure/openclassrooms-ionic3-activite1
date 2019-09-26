import { Component } from '@angular/core';
import {BookListPage} from "../book-list/book-list";
import {CdListPage} from "../cd-list/cd-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bookListPage = BookListPage;
  cdListPage = CdListPage;

}
