import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, Observable } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { User } from 'src/app/interfaces/user';
import { BooksService } from 'src/app/services/books.service';
import { StorageService } from 'src/app/services/storage.service';
import { RateModalComponent } from '../rate-modal/rate-modal.component';
import { RentModalComponent } from '../rent-modal/rent-modal.component';

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

  private reader: string | undefined
  private user: User | undefined

  rate_avg: number = 0

  constructor(
    private modalCtrl: ModalController,
    private bookService: BooksService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {

    this.book$ = this.bookService.getBooks().pipe(
      map(books => books.find(book => book.id === this.bookId))
    )

    this.book$.subscribe(book => {
      this.book = book
    })

    const userData = await this.storageService.get('loginData')

    if(userData) {
      this.user = JSON.parse(userData) as User
    }

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

    if(this.book && this.user) {

      if(this.book.rented) {

        this.modalCtrl.create({
          component: RateModalComponent,
          componentProps: { book: this.book, user: this.user, reader: this.reader },
          cssClass: 'rate-modal',
          backdropDismiss: true
        })
          .then(modalEl => {
            modalEl.present()
            return modalEl.onDidDismiss()
          })
          .then(resultData => {
            console.log(resultData)
          })

        return
      }

      this.modalCtrl.create({
        component: RentModalComponent,
        componentProps: { book: this.book, user: this.user },
        cssClass: 'rent-modal',
        backdropDismiss: true
      })
      .then(modalEl => {
        modalEl.present()
        return modalEl.onDidDismiss()
      })
      .then(resultData => {
        this.reader = resultData.data.reader
      })

      return
    }

    console.log("Erro ao alugar livro")
  }

}
