import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, Observable } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { Rent } from 'src/app/interfaces/rent';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-all-rents-modal',
  templateUrl: './all-rents-modal.component.html',
  styleUrls: ['./all-rents-modal.component.scss'],
  standalone: false
})
export class AllRentsModalComponent implements OnInit {

  @Input() book: Book | undefined
  rents$: Observable<Rent[]> | undefined

  constructor(
    private modalCtrl: ModalController,
    private rentService: RentService
  ) { }

  async ngOnInit() {

    this.rents$ = (await this.rentService.getRents()).pipe(
      map(rents => rents
        .filter((rent: Rent) => rent.book_id === this.book?.id)
      )
    )
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel')
  }

}
