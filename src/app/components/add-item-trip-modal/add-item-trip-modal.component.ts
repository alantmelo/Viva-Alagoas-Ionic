import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
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
  showPrice: Boolean = false;
  addItemForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private tripService: TripService,
    private fb: FormBuilder,
    private alertController: AlertController // Adiciona o AlertController
  ) {
    // Initialize the form group
    this.addItemForm = this.fb.group({
      hasValue: ["false", Validators.required],
      itemName: ['', Validators.required],
      quantity: [{ value: 0, disabled: true, }, Validators.min(1)], 
      price: [{ value: 0, disabled: true, }, Validators.min(0.1)], 
      selectedItemType: [null, Validators.required],
      date: [null] // Adiciona a validação para o campo de data
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
        if (itemData.price !== 0) {
          this.showPrice = true;
          this.addItemForm.get('price')?.enable(); // Enable the price control
          this.addItemForm.get('quantity')?.enable(); // Enable the price control
        }
        // Preencher o formulário com os dados do item
        this.addItemForm.patchValue({
          hasValue: [String(this.showPrice)],
          itemName: itemData.name,
          quantity: itemData.quantity,
          date: this.formatDate(itemData.date),
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
      this.errorMessage = "Please select at least one user.";
      return;
    }

    const selectedDate = new Date(this.addItemForm.value.date); // Pega a data selecionada

    // Verifica se a data selecionada é válida
    if (!this.isValidDate(selectedDate)) {
      this.showInvalidDateAlert(); // Mostra alerta de data inválida
      return;
    }

    const itemData = {
      name: this.addItemForm.value.itemName,
      quantity: this.showPrice ? this.addItemForm.value.quantity : 0,
      userQuantity: selectedUsers.length,
      price: this.showPrice ? this.addItemForm.value.price : 0,
      itemTypeId: this.addItemForm.value.selectedItemType,
      tripId: this.tripId,
      selectedUsers: selectedUsers,
      date: selectedDate.toISOString(), // Formato ISO para a data
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

  onPriceOptionChange(event: any) {
    const showPriceSelected = event.detail.value === 'true';
    this.showPrice = showPriceSelected;
  
    if (showPriceSelected) {
      this.addItemForm.get('price')?.enable(); // Enable the price control
      this.addItemForm.get('quantity')?.enable(); // Enable the price control
    } else {
      this.addItemForm.get('price')?.disable(); // Disable the price control
      this.addItemForm.get('quantity')?.disable(); // Disable the price control
    }
  }

  // Método para exibir um alerta que só recebe uma data
  async presentDateAlert() {
    const alert = await this.alertController.create({
      header: 'Select Date',
      inputs: [
        {
          name: 'date',
          type: 'date',
          value: this.addItemForm.value.date || '',  // Pega o valor atual ou deixa vazio
          placeholder: 'YYYY-MM-DD',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Date selection cancelled');
          },
        },
        {
          text: 'Confirm',
          handler: (data) => {
            if (data.date) {
              const selectedDate = new Date(data.date);
              if (this.isValidDate(selectedDate)) {
                // Atualiza o campo date no formulário
                this.addItemForm.patchValue({ date: data.date });
                console.log('Date selected:', data.date);
              } else {
                this.showInvalidDateAlert(); // Alerta se a data não for válida
              }
            } else {
              console.error('No date selected');
            }
          },
        },
      ],
    });
  
    await alert.present();
  }

  // Função para exibir um alerta de data inválida
  async showInvalidDateAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid Date',
      message: 'Please select a valid date.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Função de validação de data
  isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  formatDate(date: string | null | undefined): string | null {
    if (!date) return null; // Retorna null se a data for undefined ou null
    return date.split('T')[0]; // Extrai apenas a parte da data
  }
}
