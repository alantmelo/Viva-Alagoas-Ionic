import { Component, Input, OnInit } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TripService } from 'src/app/services/trip.service'; 
import { Trip, TripResponse } from 'src/app/models/trip';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item-trip',
  templateUrl: './add-item-trip.component.html',
  styleUrls: ['./add-item-trip.component.scss'],
})
export class AddItemTripComponent implements OnInit {
  @Input() data!: any; 
  trips: Trip[] = [];
  showPrice: boolean = false;
  showItemType: boolean = false;
  searchQuery: string = '';
  page: number = 0;
  tripId: number| undefined;
  pageSize: number = 10;
  totalTrips: number = 0;
  addItemForm!: FormGroup;
  tripUsers: any[] = [];
  activeItemTypes: any[] = [];
  errorMessage: string | null = null;

  constructor(private router: Router,
    private tripsService: TripService,
    private modalController: ModalController,
    private alertController: AlertController,
    private fb: FormBuilder) {}

  closeModal() {
    this.modalController.dismiss(); // Fecha o modal
  }
  loadTrips() {
    this.tripsService.getTrips(this.searchQuery, this.page, this.pageSize).subscribe((response: TripResponse) => {
      
      this.trips = [...this.trips, ...response.items]; // Adiciona novas viagens à lista existente
      console.log(this.trips)
    });
  }
  ngOnInit() {
    if ('price' in this.data) {
      this.showPrice = true;
      console.log('O campo price existe no objeto.');
    } else {
      console.log('O campo price não existe no objeto.');
    }
    if(this.showPrice){
      this.addItemForm = this.fb.group({
        itemName: [this.data.name, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        userQuantity: [1, [Validators.required, Validators.min(1)]],
        price: [this.data.price, [Validators.required, Validators.min(1)]],
        selectedItemType: [null, Validators.required],
        selectedTrip: [null, Validators.required], 
        date: [null],
      });
    }else{
      this.addItemForm = this.fb.group({
        itemName: [this.data.name, Validators.required],
        quantity: [0, [Validators.required, Validators.min(0)]],
        price: [0, []],
        selectedItemType: [null, Validators.required],
        selectedTrip: [null, Validators.required], 
        date: [null],
      });
    }
    console.log(this.data)
    this.loadTrips();
  }
  onSearchChange(event: any) {
    this.page = 0; // Reseta a página para a primeira
    this.trips = []; // Limpa a lista de viagens
    this.loadTrips(); // Carrega as viagens de acordo com a nova busca
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

    const selectedDate = new Date(this.addItemForm.value.date); // Pega a data selecionada
    // Verifica se a data selecionada é válida
    if (!this.isValidDate(selectedDate)) {
      this.showInvalidDateAlert(); // Mostra alerta de data inválida
      return;
    }
    // Prepara os dados do item a serem enviados
    const itemData = {
      name: this.addItemForm.value.itemName,
      quantity: this.addItemForm.value.quantity,
      userQuantity: selectedUsers.length,
      price: this.addItemForm.value.price,
      itemTypeId: this.addItemForm.value.selectedItemType,
      date: selectedDate.toISOString(),
      tripId: Number(this.tripId),
      selectedUsers: selectedUsers,
    };
  
    
    this.tripsService.createItem(itemData).subscribe({
      next: (response) => {
        console.log('Item created successfully', response);
        this.modalController.dismiss(response); // Fecha o modal com a resposta
        this.router.navigate(['/trip/'+ this.tripId]);
      },
      error: (error) => {
        console.error('Error creating item', error);
        this.errorMessage = "An error occurred while creating the item."; // Mensagem de erro
      },
    });
    
  
    this.errorMessage = ""; // Limpa a mensagem de erro após um envio bem-sucedido
  }
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
  

  toggleUserSelection(user: any) {
    user.isSelected = !user.isSelected; // Alternar a seleção
    console.log(user); // Log para verificar o estado atualizado
  }

  onTripChange(event: any) {
    this.tripsService.getTripData(event.detail.value).subscribe({
      next: (response) => {
        this.tripUsers = response.tripUsers;
        if(!this.showItemType){
          this.showItemType = true;
        }
        console.log(response)
        this.activeItemTypes = response.activeItemTypes;
        console.log('Item created successfully', this.tripUsers);
      },
      error: (error) => {
        console.error('Error creating item', error);
        this.errorMessage = "An error occurred while creating the item."; // Mensagem de erro
      },
    });
    this.tripId = event.detail.value;
    console.log('Selected Trip ID:', event.detail.value);
  }
}
