import { Component, OnInit,ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service'; 
import { IonSelect } from '@ionic/angular';


@Component({
  selector: 'app-language-selector-button',
  templateUrl: './language-selector-button.component.html',
  styleUrls: ['./language-selector-button.component.scss'],
})
export class LanguageSelectorButtonComponent implements OnInit {

  selectedLanguage!: string;
  @ViewChild('selectRef', { static: false }) selectRef!: IonSelect;

  constructor(public languageService: LanguageService) {
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }
  ngOnInit() {
    // Defina o valor da língua atual, por exemplo, recuperando de um serviço ou armazenamento
    this.selectedLanguage = this.getCurrentLanguage();
  }

  // async onLanguageSelect(event: any) {
  //   const selectedLanguage = event.detail.value;
  //   localStorage.setItem('selectedLanguage', selectedLanguage);
  //   console.log('Language selected:', selectedLanguage);
  // }

  onLanguageSelect(event: any) {
    const selectedLanguage = event.detail.value;
    this.languageService.setLanguage(selectedLanguage); // Atualiza o serviço com a nova língua e emite evento
  }
  openSelect() {
    this.selectRef.open(); // Abre o ion-select programaticamente
  }
  getCurrentLanguage(): string {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    return storedLanguage ? storedLanguage : 'pt-br'; // Valor padrão se não houver armazenado
  }

}
