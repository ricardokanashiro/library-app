import { Component, Input, OnInit } from '@angular/core';
import { Rent } from 'src/app/interfaces/rent';

@Component({
  selector: 'app-rent-card',
  templateUrl: './rent-card.component.html',
  styleUrls: ['./rent-card.component.scss'],
  standalone: false
})
export class RentCardComponent  implements OnInit {

  @Input() rent: Rent | undefined

  constructor() { }

  ngOnInit() {

  }

}
