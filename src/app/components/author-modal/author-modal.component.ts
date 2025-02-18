import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Author } from 'src/app/interfaces/author';
import { AuthorsService } from 'src/app/services/authors.service';
import { CreateAuthorModalComponent } from '../create-author-modal/create-author-modal.component';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-author-modal',
  templateUrl: './author-modal.component.html',
  styleUrls: ['./author-modal.component.scss'],
  standalone: false
})
export class AuthorModalComponent implements OnInit {

  authorsFiltered$: Observable<Author[]> | undefined
  searchText$ = new BehaviorSubject<string>("")

  constructor(
    private modalCtrl: ModalController,
    private authorsService: AuthorsService
  ) { }

  ngOnInit() {

    this.authorsFiltered$ = combineLatest([
      this.authorsService.getAuthors(),
      this.searchText$.asObservable()
    ]).pipe(
      map(([authors, searchText]) => {

        if(searchText) {
          return authors.filter(author => author.name.toLowerCase().includes(searchText.toLowerCase()))
        }
        else {
          return authors
        }
      })
    )
  }

  onCancel() {
    this.modalCtrl.dismiss(null, "cancel author")
  }

  onSelectAuthor(author: Author) {
    this.authorsService.selectAuthor(author)
    this.modalCtrl.dismiss(null, "author selected")
  }

  onCreateAuthor() {

    this.modalCtrl.create({ component: CreateAuthorModalComponent })
      .then(modalEl => {
        modalEl.present()
        return modalEl.onDidDismiss()
      })
      .then(resultData => {
        console.log(resultData)
      })
  }

  onChangeSearch(event: Event) {
    const input = event.target as HTMLInputElement
    this.searchText$.next(input.value)
  }

  async onDeleteAuthor(id: string) {
    await this.authorsService.deleteAuthor(id)
  }

}
