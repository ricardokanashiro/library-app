import { Component, Input, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { map, Observable } from 'rxjs';
import { Rent } from 'src/app/interfaces/rent';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-rents-list',
  templateUrl: './rents-list.component.html',
  styleUrls: ['./rents-list.component.scss'],
  standalone: false
})
export class RentsListComponent  implements OnInit {

  @Input() book: Book | undefined
  rents$: Observable<Rent[]> | undefined

  constructor(private rentService: RentService) { }

  async ngOnInit() {
    this.rents$ = (await this.rentService.getRents()).pipe(
      map(rent => rent.filter((rent: Rent) => rent.book_id === this.book?.id))
    )
  }

}
