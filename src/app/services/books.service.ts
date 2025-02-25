import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { v4 as uuidV4 } from 'uuid';
import * as moment from 'moment';

import { StorageService } from './storage.service';
import { User } from '../interfaces/user';
import { RentService } from './rent.service';

export interface bookData {
  title: string
  author_id: string
  author_name: string
  rented: boolean
  rented_date: string | null
  image_path: string
  sinopse: string,
  rented_by: string | null
  avg_rate: number
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private key = 'books'

  private booksSubject = new BehaviorSubject<Book[]>([])
  private _books$ = this.booksSubject.asObservable()

  constructor(
    private storageService: StorageService,
    private rentService: RentService
  ) {}

  public async createBook(data: bookData) {

    const booksData = await this.storageService.get(this.key)
    let books: Book[] = []

    if(booksData) {
      books = JSON.parse(booksData) as Book[]
    }

    const updatedBooks = [ ...books, { ...data, id: uuidV4() }]

    this.storageService.set(this.key, JSON.stringify(updatedBooks))
    this.booksSubject.next(updatedBooks)
  }

  public async deleteBook(id: string) {

    const booksData = await this.storageService.get(this.key)
    let books: Book[] = []

    if(booksData) {
      books = JSON.parse(booksData) as Book[]
    }

    const updatedBooks = [...books.filter(book => book.id !== id)]

    await this.rentService.deleteRentByBookId(id)

    this.storageService.set(this.key, JSON.stringify(updatedBooks))
    this.booksSubject.next(updatedBooks)
  }

  public async toggleRentBook(id: string) {

    const booksData = await this.storageService.get(this.key)
    let books: Book[] = []

    const userData = await this.storageService.get('loginData')
    let user: User | null

    if(booksData) {
      books = JSON.parse(booksData) as Book[]
    }

    if(userData) {
      user = JSON.parse(userData) as User
    }

    const updatedBooks = books.map(book =>
      book.id === id ?
        {
          ...book,
          rented: !book.rented,
          rented_date: moment().format('L'),
          rented_by: user ? user.name : null
        }
      : book
    )

    this.storageService.set(this.key, JSON.stringify([...updatedBooks]))
    this.booksSubject.next([...updatedBooks])
  }

  public getBooks() {

    this.storageService.get(this.key).then(booksData => {
      let books: Book[] = booksData ? JSON.parse(booksData) : []
      this.booksSubject.next(books)
    })

    return this._books$
  }

  public async rateBook(id: string, rate: number) {

    let rateSum = 0

    const rents = (await firstValueFrom(await this.rentService.getRents()))
      .filter(rent =>
        rent.book_id === id && rent.operation === 'return'
      )

    rents.forEach(rent => {
      if(rent.rate) {
        rateSum += rent.rate
      }
    })

    const updatedBooks = this.booksSubject.value.map(book =>
      book.id === id
      ? { ...book, avg_rate: parseFloat((rateSum / rents.length).toFixed(2)) }
      : book
    )
    
    await this.storageService.set(this.key,  JSON.stringify([...updatedBooks]))
    this.booksSubject.next([...updatedBooks])
  }
}
