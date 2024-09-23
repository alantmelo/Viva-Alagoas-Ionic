import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AddItemTripModalComponent } from 'src/app/components/add-item-trip-modal/add-item-trip-modal.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  trip: Trip | undefined;

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

  async openAddItemModal() {
    if (!this.trip || !this.trip.id) {
      console.warn('Trip ID is undefined');
      return;
    }
  
    const modal = await this.modalController.create({
      component: AddItemTripModalComponent,
      componentProps: { tripId: this.trip.id } // Certifique-se de que o tripId está correto
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Selected user IDs:', result.data);
        // Ações adicionais com os IDs selecionados, se necessário
      }
    });
  
    await modal.present();
  }

  loadTrip(id: number) {
    this.tripsService.getTripById(id).subscribe((trip) => {
      this.trip = trip;
    });
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
              // Mostrar mensagem de erro se o email não for válido
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
        // Mostrar toast de sucesso
        const toast = await this.toastController.create({
          message: 'User added to trip successfully!',
          duration: 3000,
          color: 'success'
        });
        await toast.present();
      },
      error: async (error: any) => {
        console.error('Failed to add user to trip:', error);
        // Mostrar toast de erro
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
}

  
