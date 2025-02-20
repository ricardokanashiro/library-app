import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rate-card',
  templateUrl: './rate-card.component.html',
  styleUrls: ['./rate-card.component.scss'],
  standalone: false
})
export class RateCardComponent  implements OnInit {

  @Input() ratingValue: number | undefined
  @Input() choseRating: number | undefined
  @Output() chooseValue = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {}

  onEmitChoseValue() {
    this.chooseValue.emit(this.ratingValue)
  }

}
