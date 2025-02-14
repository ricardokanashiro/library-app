import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  standalone: false
})
export class BookCardComponent  implements OnInit {

  imageUrl: string = "https://imgs.search.brave.com/CjH6w-590g34nL-AD73sQ9O95d43b_DBOAejhxwWot8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFd3Az/ckxiMDgvMS8wLzEw/MDN3L2NhbnZhLWNh/cGEtZGUtbGl2cm8t/ZGFkb3MtcGVzc29h/aXMtY2luemEtYjd2/dFpiYlJSamsuanBn"

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onClickCard() {
    this.modalCtrl.create({ component: BookModalComponent, componentProps: {} })
      .then(modalEl => {
        modalEl.present()
        return modalEl.onDidDismiss()
      })
      .then(resultData => {
        console.log(resultData)
      })
  }

}
