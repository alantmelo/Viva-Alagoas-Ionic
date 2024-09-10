import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-language-selector-button',
  templateUrl: './language-selector-button.component.html',
  styleUrls: ['./language-selector-button.component.scss'],
})
export class LanguageSelectorButtonComponent implements OnInit {

  selectedLanguage!: string;
  @ViewChild('selectRef', { static: false }) selectRef!: IonSelect;

  constructor() {}
  ngOnInit() {
    // Defina o valor da língua atual, por exemplo, recuperando de um serviço ou armazenamento
    this.selectedLanguage = this.getCurrentLanguage();
  }

  async onLanguageSelect(event: any) {
    const selectedLanguage = event.detail.value;
    localStorage.setItem('selectedLanguage', selectedLanguage);
    console.log('Language selected:', selectedLanguage);
  }
  openSelect() {
    this.selectRef.open(); // Abre o ion-select programaticamente
  }
  getCurrentLanguage(): string {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    return storedLanguage ? storedLanguage : 'pt-br'; // Valor padrão se não houver armazenado
  }

}
