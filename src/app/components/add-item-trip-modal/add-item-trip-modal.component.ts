import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-add-item-trip-modal',
  templateUrl: './add-item-trip-modal.component.html',
  styleUrls: ['./add-item-trip-modal.component.scss'],
})
export class AddItemTripModalComponent implements OnInit {
  @Input() tripId!: number;
  users: any[] = [];

  constructor(
    private modalController: ModalController,
    private tripService: TripService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.tripService.getTripUsers(this.tripId).subscribe({
      next: (users: UserItem[]) => {
        console.log('Users received from API:', users);
        this.users = users.map(user => ({
          ...user,
          isSelected: false // Inicialize o campo isSelected como false
        }));
      },
      error: (err) => console.error('Error loading users', err)
    });
  }

  close() {
    this.modalController.dismiss();
  }

  confirm() {
    const selectedUsers = this.users.filter(user => user.isSelected).map(user => user.id);
    this.modalController.dismiss(selectedUsers); // Enviando os IDs dos usuários selecionados ao fechar o modal
  }
}
export interface UserItem {
  id: number;
  user: {
    name: string;
  };
  isSelected?: boolean; // Adicionar o campo para seleção, se necessário
}