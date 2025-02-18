import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"
import { BooksService } from 'src/app/services/books.service';
import { AuthorsService } from 'src/app/services/authors.service';
import { Author } from 'src/app/interfaces/author';
import { AuthorModalComponent } from '../author-modal/author-modal.component';

@Component({
  selector: 'app-create-book-modal',
  templateUrl: './create-book-modal.component.html',
  styleUrls: ['./create-book-modal.component.scss'],
  standalone: false
})
export class CreateBookModalComponent  implements OnInit {

  formulario: FormGroup | any
  selectedImage: string | null | undefined = null
  selectedAuthor: Author | null = null

  constructor(
    private modalCtrl: ModalController, 
    private fb: FormBuilder,
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private alertCtrl: AlertController
  ) {
    this.formulario = this.fb.group({
      title: ['', Validators.required],
      sinopse: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.authorsService.getSelectedAuthor().subscribe(author => {
      this.selectedAuthor = author
    })
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel')
  }

  async pickImage() {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    })

    this.selectedImage = `data:image/jpeg;base64,${image.base64String}`
  }

  public async onCreateBook() {

    if(!this.selectedImage || this.formulario.invalid || !this.selectedAuthor) {
      
      this.alertCtrl.create({
        header: "Erro ao cadastrar livro!",
        message: "Existem campos inválidos no formulário",
        buttons: ["Ok"]
      })
      .then(alertEl => {
        alertEl.present()
      })

      return
    }

    await this.booksService.createBook({
      ...this.formulario.value,
      author_id: this.selectedAuthor?.id,
      author_name: this.selectedAuthor?.name,
      rented: false,
      rented_date: null,
      image_path: this.selectedImage,
      rented_by: null
    })

    this.modalCtrl.dismiss(null, 'book created')
  }

  public onSelectAuthor() {

    this.modalCtrl.create({ component: AuthorModalComponent, componentProps: {} })
      .then(modalEl => { 
        modalEl.present()
        return modalEl.onDidDismiss()
      })
      .then(resultData => {
        console.log(resultData)
      })
  }

}
