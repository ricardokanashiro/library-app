import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateBookModalComponent } from 'src/app/components/create-book-modal/create-book-modal.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  usuarioNome: string = "Ricardo Kanashiro"
  searchOption: string = "livro"

  constructor(private modalCtrl: ModalController, private usersService: UsersService) { }

  ngOnInit() {
    
  }

  public onSelectSearchOption(event: any) {
    console.log("Valor do select: " + event.detail.value)
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
