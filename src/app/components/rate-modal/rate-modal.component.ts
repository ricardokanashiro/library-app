import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BooksService } from 'src/app/services/books.service';
import { RentService } from '../../services/rent.service';
import { User } from 'src/app/interfaces/user';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss'],
  standalone: false
})
export class RateModalComponent  implements OnInit {

  @Input() book: Book | any
  @Input() user: User | any

  rating: number | undefined

  constructor(
    private modalCtrl: ModalController,
    private booksService: BooksService,
    private rentService: RentService
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel')
  }

  onRate() {

    if(!this.rating) {
      return
    }

    this.rentService.createRent({ 
      modified_by: this.user?.id,
      rate: this.rating,
      operation: this.book.rented ? 'return' : 'rent'
    })

    this.booksService.toggleRentBook(this.book.id)
    this.modalCtrl.dismiss(null, 'create rent')
  }

}
