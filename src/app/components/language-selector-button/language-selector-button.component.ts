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
    this.selectedLanguage = this.getCurrentLanguage();
  }


  onLanguageSelect(event: any) {
    const selectedLanguage = event.detail.value;
    this.languageService.setCurrentLanguage(selectedLanguage); 
  }
  openSelect() {
    this.selectRef.open(); 
  }
  getCurrentLanguage(): string {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    return storedLanguage ? storedLanguage : 'pt-br'; 
  }

}
