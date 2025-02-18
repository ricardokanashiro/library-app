import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  standalone: false
})
export class BookCardComponent  implements OnInit {

  @Input() book: Book | undefined

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onClickCard() {
    this.modalCtrl.create({ component: BookModalComponent, componentProps: { bookId: this.book?.id } })
      .then(modalEl => {
        modalEl.present()
        return modalEl.onDidDismiss()
      })
      .then(resultData => {
        console.log(resultData)
      })
  }

}
