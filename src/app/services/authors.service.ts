import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Author } from '../interfaces/author';

import { v4 as uuidV4 } from 'uuid';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private _key = 'authors'

  private _authorsSubject = new BehaviorSubject<Author[]>([])
  private _authors$ = this._authorsSubject.asObservable()
  
  private _selectedAuthorSubject = new BehaviorSubject<Author | null>(null)
  private _selectedAuthor$ = this._selectedAuthorSubject.asObservable()

  constructor(private storageService: StorageService) {}

  public async createAuthor(name: string) {

    const authorData = await this.storageService.get(this._key)
    let authors: Author[] = []

    if(authorData) {
      authors = JSON.parse(authorData) as Author[]
    }

    const authorAlreadyExists = authors.some(author => author.name === name)

    if(authorAlreadyExists) {
      throw new Error("O autor já existe!")
    }

    const updatedAuthors = [...authors, { name, id: uuidV4() }]

    this.storageService.set(this._key, JSON.stringify(updatedAuthors))
    this._authorsSubject.next(updatedAuthors)
  }

  public getAuthors() {

    this.storageService.get(this._key)
    .then(authorsData => {
      let authors: Author[] = authorsData ? JSON.parse(authorsData) : []
      this._authorsSubject.next([...authors])
    })

    return this._authors$
  }

  public getSelectedAuthor() {
    return this._selectedAuthor$
  }

  public selectAuthor(author: Author) {
    this._selectedAuthorSubject.next(author)
  }

  public async deleteAuthor(id: string) {

    const authorData = await this.storageService.get(this._key)
    let authors: Author[] = []

    if(authorData) {
      authors = JSON.parse(authorData) as Author[]
    }

    const updatedAuthors = authors.filter(author => author.id !== id)
    
    this.storageService.set(this._key, JSON.stringify([...updatedAuthors]))
    this._authorsSubject.next(updatedAuthors)

    if(this._selectedAuthorSubject.value?.id === id) {
      this._selectedAuthorSubject.next(null)
    }
  }
}
