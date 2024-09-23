import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule se estiver usando formulários
import { AddItemTripModalComponent } from './add-item-trip-modal.component'; // Ajuste o caminho conforme necessário

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AddItemTripModalComponent],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    FormsModule, // Adicione aqui se estiver usando formulários
  ],
  exports: [AddItemTripModalComponent], // Exporte o componente para uso em outros módulos
 // Necessário se o componente for usado como um modal
})
export class AddItemTripModalModule { }
