import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, Observable } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
  standalone: false
})
export class BookModalComponent  implements OnInit {

  @Input() bookId: string | undefined
  book$: Observable<any> | undefined
  book: Book | undefined

  constructor(
    private modalCtrl: ModalController, 
    private bookService: BooksService
  ) {}

  ngOnInit() {

    this.book$ = this.bookService.getBooks().pipe(
      map(books => books.find(book => book.id === this.bookId))
    )

    this.book$.subscribe(book => {
      this.book = book
    })

  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel')
  }

  onDelete() {

    if(this.book) {
      this.bookService.deleteBook(this.book?.id)
      this.modalCtrl.dismiss(null, 'delete')
      return
    }

    console.log("Erro ao deletar livro")
    this.modalCtrl.dismiss(null, 'delete failed')
  }

  onRent() {

    if(this.book) {
      this.bookService.toggleRentBook(this.book.id)

      setTimeout(() => {
        console.log(this.book)
      }, 1000)

      return
    }

    console.log("Erro ao alugar livro")
  }

}
