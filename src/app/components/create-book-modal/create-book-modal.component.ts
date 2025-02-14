import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"

@Component({
  selector: 'app-create-book-modal',
  templateUrl: './create-book-modal.component.html',
  styleUrls: ['./create-book-modal.component.scss'],
  standalone: false
})
export class CreateBookModalComponent  implements OnInit {

  formulario: FormGroup | any
  selectedImage: string | null | undefined = null

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      sinopse: ['', Validators.required]
    })
  }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel')
  }

  async pickImage() {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    })

    this.selectedImage = image.webPath
  }

}
