import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-create-author-modal',
  templateUrl: './create-author-modal.component.html',
  styleUrls: ['./create-author-modal.component.scss'],
  standalone: false
})
export class CreateAuthorModalComponent  implements OnInit {

  authorNameText: string = ""

  constructor(
    private modalCtrl: ModalController, 
    private authorService: AuthorsService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel create author modal')
  }

  async onCreateAuthor() {

    if(!this.authorNameText) {
      this.alertCtrl.create({
        header: "Erro ao cadastrar autor!",
        message: "Existem campos inválidos no formulário",
        buttons: ["Ok"]
      })
      .then(alertEl => {
        alertEl.present()
      })

      return
    }

    await this.authorService.createAuthor(this.authorNameText)
    this.modalCtrl.dismiss(null, "create author")
  }

}
