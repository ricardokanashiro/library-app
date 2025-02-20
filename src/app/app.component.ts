import { Component } from '@angular/core';
import { Keyboard, KeyboardResizeOptions } from '@capacitor/keyboard';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {

  constructor(private storageService: StorageService) {

    localStorage.removeItem('theme')

    document.body.classList.remove('dark')
    document.body.classList.add('light')
  }

  setupKeyboardBehavior() {
    Keyboard.setResizeMode({ mode: 'body' } as KeyboardResizeOptions)
  }

  async ngOnInit() {
    await this.storageService.clear()
  }
}
