import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BooksService } from 'src/app/services/books.service';
import { RentService } from '../../services/rent.service';

import { User } from 'src/app/interfaces/user';
import { Book } from 'src/app/interfaces/book';

import { ratingNums } from 'src/utils/ratingNums';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss'],
  standalone: false
})
export class RateModalComponent  implements OnInit {

  @Input() book: Book | any
  @Input() user: User | any
  @Input() reader: string | any

  ratingNums = ratingNums
  choseRating: number | undefined

  constructor(
    private modalCtrl: ModalController,
    private booksService: BooksService,
    private rentService: RentService
  ) {}

  ngOnInit() {}

  onReceiveRatingValue(value: number) {
    this.choseRating = value
  }

  async onRate() {

    if(!this.choseRating) {
      return
    }

    this.rentService.createRent({
      modified_by_id: this.user?.id,
      modified_by_name: this.user?.name,
      rate: this.choseRating,
      operation: 'return',
      book_id: this.book.id,
      reader: this.reader
    })

    await this.booksService.toggleRentBook(this.book.id)
    await this.booksService.rateBook(this.book.id, this.choseRating)
    this.modalCtrl.dismiss(null, 'create rent')
  }

}
