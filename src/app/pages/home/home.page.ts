import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { BooksService } from 'src/app/services/books.service';
import { StorageService } from '../../services/storage.service';

import { CreateBookModalComponent } from 'src/app/components/create-book-modal/create-book-modal.component';

import { Book } from 'src/app/interfaces/book';
import { Author } from 'src/app/interfaces/author';

import { mockedImgs } from 'src/utils/mockedImgs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  searchOption: string = "livro"
  userData: any

  searchText = new BehaviorSubject<string>("")

  books$: Observable<Book[]> | undefined
  books: Book[] | undefined
  booksFiltered$: Observable<Book[]> | undefined

  // private mockedUser: User = {
  //   id: 'u1',
  //   name: 'Ricardo Kanashiro',
  //   email: 'ricardo@email.com',
  //   password: '123'
  // }

  private mockedAuthors: Author[] = [
    { id: 'a1', name: 'L. Frank Baum' },
    { id: 'a2', name: 'Herman Melville' }
  ]

  private mockedBooks: Book[] = [

    {
      id: 'b1',
      title: 'O mágico de Oz',
      author_id: 'a1',
      author_name: 'L. Frank Baum',
      rented: false,
      rented_date: null,
      image_path: 'data:image/jpeg;base64,' + mockedImgs.magicoOz,
      sinopse: 'História do mágico de Oz',
      rented_by: null,
      avg_rate: 0
    },

    {
      id: 'b2',
      title: 'Mob Dick',
      author_id: 'a2',
      author_name: 'Herman Melville',
      rented: false,
      rented_date: null,
      image_path: 'data:image/jpeg;base64,' + mockedImgs.mobDick,
      sinopse: 'História da baleia Mob Dick',
      rented_by: null,
      avg_rate: 0
    }

  ]

  constructor(
    private modalCtrl: ModalController,
    private booksService: BooksService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {

    const bookData = await this.storageService.get('books')
    let previousBooks: Book[] = []

    if (bookData) {
      previousBooks = JSON.parse(bookData)
    }

    if (!bookData || !previousBooks || previousBooks.length === 0) {
      await this.storageService.set('authors', JSON.stringify(this.mockedAuthors))
      await this.storageService.set('books', JSON.stringify(this.mockedBooks))
    }

    this.books$ = this.booksService.getBooks()

    this.books$.subscribe(books => {
      this.books = books
    })

    this.booksFiltered$ = combineLatest([
      this.books$,
      this.searchText.asObservable(),
    ]).pipe(
      map(([books, searchText]) => {
        if (searchText) {
          return books.filter(book =>
            this.searchOption === 'livro'
              ? book.title.toLowerCase().includes(searchText.toLowerCase())
              : book.author_name.toLowerCase().includes(searchText.toLowerCase())
          )
        } else {
          return books
        }
      })
    )

    await this.getUser()
  }

  async ionViewWillEnter() {
    await this.getUser()
  }

  public onCreateBook() {

    this.modalCtrl.create({ component: CreateBookModalComponent, componentProps: {} })
      .then(modalEl => {
        modalEl.present()
        return modalEl.onDidDismiss()
      })
      .then(resultData => {
        console.log(resultData)
      })
  }

  filterList(event: Event) {
    const input = event.target as HTMLInputElement
    this.searchText.next(input.value)
  }

  private async getUser() {
    const data = await this.storageService.get('loginData')
    const parsedData = data ? JSON.parse(data) : null
    this.userData = parsedData
  }

}
