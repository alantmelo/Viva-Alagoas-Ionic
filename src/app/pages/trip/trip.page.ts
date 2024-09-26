import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { Item, Trip } from 'src/app/models/trip';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AddItemTripModalComponent } from 'src/app/components/add-item-trip-modal/add-item-trip-modal.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  trip: Trip | undefined;
  items: any[] = []; // Para armazenar os itens da viagem

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripService,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    const tripId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTrip(tripId);
  }

  async openAddItemModal(itemId?: string) {
    if (!this.trip || !this.trip.id) {
      console.warn('Trip ID is undefined');
      return;
    }
    const modal = await this.modalController.create({
      component: AddItemTripModalComponent,
      componentProps: { tripId: this.trip.id, itemId: itemId }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // console.log('Selected user IDs:', result.data);
        this.ngOnInit(); // Atualiza a lista de itens após adicionar um novo
      }
    });

    await modal.present();
  }

  loadTrip(id: number) {
    this.tripsService.getTripById(id).subscribe((trip) => {
      console.log('Trip response:', trip); // Log the entire trip response
      this.trip = trip;
  
      if (this.trip) {
        console.log('User Trips:', this.trip); // Check if userTrip exists
      }
  
      this.loadItems(); // Load items after loading the trip
    });
  }

  loadItems() {
    if (this.trip && this.trip.item) {
      this.items = this.trip.item; // Preenche a lista de itens da viagem
      // console.log('Trip items:', this.items);
    } else {
      console.warn('No items found for this trip');
    }
  }

  getUserNames(item: Item): string {
    if (item.itemUser.length > 0) {
      return item.itemUser.map((user: { user: { name: any; }; }) => user.user.name).join(', ');
    }
    return 'No users assigned';
  }

  async presentAddUserAlert() {
    const alert = await this.alertController.create({
      header: 'Add User to Trip',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Enter user email',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: async (data) => {
            const email = data.email;
            if (this.isValidEmail(email)) {
              this.addUserToTrip(email);
            } else {
              const invalidEmailAlert = await this.alertController.create({
                header: 'Invalid Email',
                message: 'Please enter a valid email address.',
                buttons: ['OK'],
              });
              await invalidEmailAlert.present();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Validação de email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Enviar requisição POST para adicionar usuário à viagem
  addUserToTrip(email: string) {
    if (!this.trip || !this.trip.id) {
      console.error('Trip ID is undefined');
      return;
    }

    this.tripsService.addUserToTrip(this.trip.id, email).subscribe({
      next: async (response: any) => {
        console.log('User added to trip:', response);
        const toast = await this.toastController.create({
          message: 'User added to trip successfully!',
          duration: 3000,
          color: 'success'
        });
        await toast.present();
        this.ngOnInit(); 
      },
      error: async (error: any) => {
        console.error('Failed to add user to trip:', error);
        const toast = await this.toastController.create({
          message: 'Failed to add user to trip. Please try again.',
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      },
      complete: () => {
        console.log('User addition process completed');
      }
    });
  }

  /**
   * Remove um item da lista.
   * @param id - O ID do item a ser removido.
   */
  async removeItem(id: number) {
    console.log('remove: ' + id);
    
    this.tripsService.removeItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== id); // Update the local item list
        this.showToast(`Item with ID ${id} has been deleted successfully.`);
      },
      error: (error) => {
        console.error('Error removing item', error);
        this.showToast('Error removing item. Please try again.');
      }
    });
  }
  
  getTotalPrice(item: Item): number {
    return item.quantity * item.price;
  }
  

  // Método para calcular quanto cada usuário tem que pagar
  getEachUserPayment(item: Item): number {
    if (item.itemUser.length > 0) {
      const totalPrice = this.getTotalPrice(item);
      // console.log(totalPrice)
      return totalPrice / item.itemUser.length; // Divide o total pelo número de usuários
    }
    return 0; // Se não houver usuários, retorna 0
  }

  /**
   * Exibe uma mensagem de toast.
   * @param message - A mensagem a ser exibida.
   */
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  async removeTripUser(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this Trip User?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Deletion cancelled');
          },
        },
        {
          text: 'Delete',
          handler: async () => {
            console.log('Deleting Trip User with ID:', id);
            console.log('Deleting Trip ID:', +this.route.snapshot.paramMap.get('id')!);
            try {
              await firstValueFrom(this.tripsService.removeTripUser(+this.route.snapshot.paramMap.get('id')!,id)); // Using firstValueFrom
              this.items = this.items.filter(item => item.id !== id); // Update the local list
              this.showToast(`Trip User with ID ${id} has been deleted successfully.`);
              this.ngOnInit(); 
            } catch (error) {
              console.error('Error removing Trip User', error);
              this.showToast('Error removing Trip User. Please try again.');
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
