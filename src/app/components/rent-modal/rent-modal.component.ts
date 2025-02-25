import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BooksService } from 'src/app/services/books.service';
import { RentService } from 'src/app/services/rent.service';

import { Book } from 'src/app/interfaces/book';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-rent-modal',
  templateUrl: './rent-modal.component.html',
  styleUrls: ['./rent-modal.component.scss'],
  standalone: false
})
export class RentModalComponent implements OnInit {

  @Input() book: Book | any
  @Input() user: User | any

  readerName: string = ""

  constructor(
    private modalCtrl: ModalController,
    private booksService: BooksService,
    private rentService: RentService
  ) {}

  ngOnInit() {}

  onRent() {

    if(!this.readerName) {
      return
    }

    this.rentService.createRent({
      modified_by_id: this.user?.id,
      modified_by_name: this.user?.name,
      rate: null,
      operation: 'rent',
      book_id: this.book.id,
      reader: this.readerName
    })

    this.booksService.toggleRentBook(this.book.id)
    this.modalCtrl.dismiss({ reader: this.readerName }, 'create rent')
  }

}
