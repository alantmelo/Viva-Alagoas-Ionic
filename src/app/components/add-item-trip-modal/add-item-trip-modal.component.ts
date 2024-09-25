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
  @Input() tripId!: number; // ID da viagem
  @Input() itemId?: number; // ID opcional do item para edição
  tripUsers: any[] = [];
  activeItemTypes: any[] = [];
  errorMessage: string | null = null;
  // Form properties
  addItemForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private tripService: TripService,
    private fb: FormBuilder
  ) {
    // Initialize the form group
    this.addItemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      userQuantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      selectedItemType: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadTripData();

    // Se houver itemId, buscar os dados do item
    if (this.itemId) {
      this.loadItemData(this.itemId);
    }
  }

  loadTripData() {
    this.tripService.getTripData(this.tripId).subscribe({
      next: (data) => {
        this.tripUsers = data.tripUsers.map(user => ({
          ...user,
          isSelected: false // Inicializa todos como não selecionados
        }));
        this.activeItemTypes = data.activeItemTypes;

        console.log('Trip users loaded:', this.tripUsers);

        // Se o item já estiver carregado (em caso de atualização), podemos marcar os usuários selecionados
        if (this.itemId) {
          this.loadItemData(this.itemId);
        }
      },
      error: (err) => console.error('Error loading trip data', err)
    });
  }

  // Carregar os dados do item existente para edição
  loadItemData(itemId: number) {
    this.tripService.getItemById(itemId).subscribe({
      next: (itemData) => {
        // Preencher o formulário com os dados do item
        this.addItemForm.patchValue({
          itemName: itemData.name,
          quantity: itemData.quantity,
          userQuantity: itemData.userQuantity,
          price: itemData.price,
          selectedItemType: itemData.itemTypeId,
        });

        // Marcar os usuários que estão selecionados para este item
        const selectedUserIds = itemData.itemUser.map((user: { userId: any; }) => user.userId);

        // Agora, marca os usuários selecionados, assumindo que `tripUsers` já foi carregado
        this.tripUsers.forEach((tripUser) => {
          tripUser.isSelected = selectedUserIds.includes(tripUser.user.id);
        });

        console.log('Updated trip users with selections:', this.tripUsers);
      },
      error: (err) => console.error('Error loading item data', err),
    });
  }

  close() {
    this.modalController.dismiss();
  }

  confirm() {
    const selectedUsers = this.tripUsers
      .filter((user) => user.isSelected)
      .map((user) => user.user.id);
  
    // Verifica se pelo menos um usuário foi selecionado
    if (selectedUsers.length === 0) {
      this.errorMessage = "Please select at least one user."; // Mensagem de erro
      return; // Interrompe a execução se não houver usuários selecionados
    }
  
    // Prepara os dados do item a serem enviados
    const itemData = {
      name: this.addItemForm.value.itemName,
      quantity: this.addItemForm.value.quantity,
      userQuantity: this.addItemForm.value.userQuantity,
      price: this.addItemForm.value.price,
      itemTypeId: this.addItemForm.value.selectedItemType,
      tripId: this.tripId,
      selectedUsers: selectedUsers,
    };
  
    if (this.itemId) {
      // Se itemId existir, fazer atualização
      this.tripService.updateItem(this.itemId, itemData).subscribe({
        next: (response) => {
          console.log('Item updated successfully', response);
          this.modalController.dismiss(response); // Fecha o modal com a resposta
        },
        error: (error) => {
          console.error('Error updating item', error);
          this.errorMessage = "An error occurred while updating the item."; // Mensagem de erro
        },
      });
    } else {
      // Caso contrário, criar novo item
      this.tripService.createItem(itemData).subscribe({
        next: (response) => {
          console.log('Item created successfully', response);
          this.modalController.dismiss(response); // Fecha o modal com a resposta
        },
        error: (error) => {
          console.error('Error creating item', error);
          this.errorMessage = "An error occurred while creating the item."; // Mensagem de erro
        },
      });
    }
  
    this.errorMessage = ""; // Limpa a mensagem de erro após um envio bem-sucedido
  }
  

  toggleUserSelection(user: any) {
    user.isSelected = !user.isSelected; // Alternar a seleção
    console.log(this.tripUsers); // Log para verificar o estado atualizado
  }
}
