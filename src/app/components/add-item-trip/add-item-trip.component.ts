import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  trips: Trip[] = [];
  searchQuery: string = '';
  page: number = 0;
  tripId: any;
  pageSize: number = 10;
  totalTrips: number = 0;
  addItemForm!: FormGroup;
  tripUsers: any[] = [];
  activeItemTypes: any[] = [];
  errorMessage: string | null = null;

  constructor(private router: Router,
    private tripsService: TripService,
    private modalController: ModalController,
    private fb: FormBuilder) {
      this.addItemForm = this.fb.group({
        itemName: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        userQuantity: [1, [Validators.required, Validators.min(1)]],
        price: [0, [Validators.required, Validators.min(1)]],
        selectedItemType: [null, Validators.required],
        selectedTrip: [null, Validators.required], 
      });
    }

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
  
    
    this.tripsService.createItem(itemData).subscribe({
      next: (response) => {
        console.log('Item created successfully', response);
        this.modalController.dismiss(response); // Fecha o modal com a resposta
      },
      error: (error) => {
        console.error('Error creating item', error);
        this.errorMessage = "An error occurred while creating the item."; // Mensagem de erro
      },
    });
    
  
    this.errorMessage = ""; // Limpa a mensagem de erro após um envio bem-sucedido
  }
  

  toggleUserSelection(user: any) {
    user.isSelected = !user.isSelected; // Alternar a seleção
    console.log(user); // Log para verificar o estado atualizado
  }

  onTripChange(event: any) {
    this.tripsService.getTripData(event.detail.value).subscribe({
      next: (response) => {
        this.tripUsers = response.tripUsers;
        console.log('Item created successfully', this.tripUsers);
      },
      error: (error) => {
        console.error('Error creating item', error);
        this.errorMessage = "An error occurred while creating the item."; // Mensagem de erro
      },
    });
    // getTripData
    // this.selectedTripId = event.detail.value;
    console.log('Selected Trip ID:', event.detail.value);
  }
}
