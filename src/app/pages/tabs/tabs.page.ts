import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateBookModalComponent } from 'src/app/components/create-book-modal/create-book-modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false
})
export class TabsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  public onCreateBook() {

      this.modalCtrl.create({ component: CreateBookModalComponent, componentProps: {} })
        .then(modalEl => {
          modalEl.present()
          return modalEl.onDidDismiss()
        })
        .then(resultData => {
          console.log(resultData)
        })
    }

}
