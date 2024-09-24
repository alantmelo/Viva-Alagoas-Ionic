import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripService } from 'src/app/services/trip.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item-trip-modal',
  templateUrl: './add-item-trip-modal.component.html',
  styleUrls: ['./add-item-trip-modal.component.scss'],
})
export class AddItemTripModalComponent implements OnInit {
  @Input() tripId!: number;
  tripUsers: any[] = [];
  activeItemTypes: any[] = [];
  selectedItemType: number | null = null;

  // Form properties
  addItemForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private tripService: TripService,
    private fb: FormBuilder
  ) {
    // Initialize the form group here
    this.addItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      userQuantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      selectedItemType: [null]
    });
  }

  ngOnInit() {
    this.loadTripData();
  }

  loadTripData() {
    this.tripService.getTripData(this.tripId).subscribe({
      next: (data) => {
        this.tripUsers = data.tripUsers.map(user => ({
          ...user,
          // isSelected: false
        }));
        console.log(data);
        this.activeItemTypes = data.activeItemTypes;
      },
      error: (err) => console.error('Error loading trip data', err)
    });
  }

  close() {
    this.modalController.dismiss();
  }

  confirm() {
    const selectedUsers = this.tripUsers.filter(user => user.isSelected).map(user => user.user.id);
    // console.log(selectedUsers);
    // Dados do item coletados do formulário e dos usuários selecionados
    const itemData = {
      name: this.addItemForm.value.itemName,
      quantity: this.addItemForm.value.quantity,
      userQuantity: this.addItemForm.value.userQuantity,
      price: this.addItemForm.value.price,
      itemTypeId: this.addItemForm.value.selectedItemType,
      tripId: this.tripId,
      selectedUsers: selectedUsers
    };

    // Chama o serviço para criar o item
    this.tripService.createItem(itemData).subscribe({
      next: (response) => {
        console.log('Item created successfully', response);
        this.modalController.dismiss(response); // Fecha o modal com a resposta
      },
      error: (error) => {
        console.error('Error creating item', error);
      }
    });
  }
  toggleUserSelection(user: any) {
    user.isSelected = !user.isSelected; // Toggle the selection state
    console.log(this.tripUsers); // Log tripUsers to see the updated selection state
  }
}
