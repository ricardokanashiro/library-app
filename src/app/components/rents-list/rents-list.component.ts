import { Component, Input, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { map, Observable } from 'rxjs';
import { Rent } from 'src/app/interfaces/rent';
import { Book } from 'src/app/interfaces/book';
import { StorageService } from 'src/app/services/storage.service';
import { ModalController } from '@ionic/angular';
import { AllRentsModalComponent } from '../all-rents-modal/all-rents-modal.component';

@Component({
  selector: 'app-rents-list',
  templateUrl: './rents-list.component.html',
  styleUrls: ['./rents-list.component.scss'],
  standalone: false
})
export class RentsListComponent  implements OnInit {

  @Input() book: Book | undefined
  rents$: Observable<Rent[]> | undefined
  loginData: any

  constructor(
    private rentService: RentService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {

    this.rents$ = (await this.rentService.getRents()).pipe(
      map(rents => rents
        .filter((rent: Rent) => rent.book_id === this.book?.id)
        .slice(0, 4)
      )
    )
  }

  onSeeAllList() {

    this.modalCtrl.create({
      component: AllRentsModalComponent,
      componentProps: { book: this.book }
    })
    .then(modalEl => {
      modalEl.present()
      return modalEl.onDidDismiss()
    })
    .then(resultData => {
      console.log(resultData)
    })
  }

}
