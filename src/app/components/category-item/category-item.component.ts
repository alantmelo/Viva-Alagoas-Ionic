import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() item!: Category;
  
  constructor(private modalController: ModalController,){

  }
  isModalOpen = false;
  async openModal(type: string) {
    console.log(type)
    const modal = await this.modalController.create({
          component: ModalComponent,
          breakpoints: [0, 0.7, 0.9],
          initialBreakpoint: 0.9,
          componentProps: {
            type: type,
          },
      });
      modal.present();
      const {
          data,
          role
      } = await modal.onWillDismiss();

      if (role === 'confirm') {
          // this.message = `Hello, ${data}!`;
      }
  }
}
