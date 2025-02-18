import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  standalone: false
})
export class BookListComponent  implements OnInit {

  @Input() books: Book[] | null | undefined

  constructor(private booksService: BooksService) {}

  ngOnInit() {}

}
