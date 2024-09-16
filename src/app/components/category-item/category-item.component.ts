import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category';

// import { ModalComponent } from '../components/modal/modal.component';
@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() item!: Category;
  openModal(name: string) {
    console.log(name)
  }
}
