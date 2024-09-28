import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../services/trip.service'; 
import { Trip, TripResponse } from '../models/trip';
import { TripModalComponent } from '../components/trip-modal/trip-modal.component';
import { ModalController } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit{
  trips: Trip[] = [];
  searchQuery: string = '';
  page: number = 0;
  pageSize: number = 10;
  totalTrips: number = 0;
    constructor(
      private router: Router,
      private tripsService: TripService,
      private modalCtrl: ModalController,
      private alertController: AlertController,

    private toastController: ToastController,
  ) {
  }
  async presentAlertWithInput() {
    const alert = await this.alertController.create({
      header: "Discover someone else's itinerary",
      subHeader: 'Please enter the itinerary code and password',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Enter itinerary code',
        },
        {
          name: 'password',
          type: 'text',
          placeholder: 'Enter itinerary password',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Ok',
          handler: async (data) => {
            const { code, password } = data;
  
            // Chama o método do serviço para buscar a viagem
            try {
              const trip = await this.tripsService.findTripByCodeAndPassword(code, password).toPromise();
  
              if (trip) {
                console.log('Trip found:', trip);
                this.navigateToPage(trip.id);
                // Aqui você pode tratar a viagem, por exemplo, exibir os dados na tela
                return true; // Fecha o alert
              } else {
                // Se a viagem não for encontrada, exibe o toast
                const toast = await this.toastController.create({
                  message: 'Trip not found. Please check the code and try again.',
                  duration: 3000,
                  position: 'bottom',
                  color: 'danger',
                });
                await toast.present();
                return false; // Impede o fechamento do alert
              }
            } catch (err) {
              console.error('Error fetching trip:', err);
  
              // Verifique se err tem uma propriedade message
              const message = (err as any).error?.message || 'Incorrect code or password. Please try again.';
  
              // Exibe o toast com o erro
              const toast = await this.toastController.create({
                message: message,
                duration: 3000,
                position: 'bottom',
                color: 'danger',
              });
              await toast.present();
              return false; // Impede o fechamento do alert
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  navigateToPage(id: Number) {
      this.router.navigate(['/trip/'+ id]);
  }
  ngOnInit() {
    this.loadTrips();
  }

  loadTrips(event?: any) {
    this.tripsService.getTrips(this.searchQuery, this.page, this.pageSize).subscribe((response: TripResponse) => {
      console.log(response)
      if (event) {
        event.target.complete(); // Completa o evento de scroll infinito
      }

      this.trips = [...this.trips, ...response.items]; // Adiciona novas viagens à lista existente
      this.totalTrips = response.total; // Atualiza o total de viagens
    });
  }

  onSearchChange(event: any) {
    this.page = 0; // Reseta a página para a primeira
    this.trips = []; // Limpa a lista de viagens
    this.loadTrips(); // Carrega as viagens de acordo com a nova busca
  }

  loadMore(event: any) {
    this.page++; // Incrementa a página
    this.loadTrips(event); // Carrega mais viagens

    if (this.trips.length >= this.totalTrips) {
      event.target.disabled = true; // Desabilita o scroll infinito quando todas as viagens são carregadas
    }
  }
  updateTripStatus(tripId: number) {
    this.tripsService.updateTripStatusToFalse(tripId).subscribe({
      next: (response) => {
        console.log('Trip status updated:', response);
        this.trips = this.trips.filter(trip => trip.id !== tripId);

        // Aqui você pode adicionar lógica para atualizar a UI ou exibir uma mensagem de sucesso
      },
      error: (err) => {
        console.error('Error updating trip status:', err);
      }
    });
  }
  async openTripModal(id?: number) {
    const modal = await this.modalCtrl.create({
      component: TripModalComponent, 
      componentProps: { tripId: id }
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.trips = [];
        // console.log('Selected user IDs:', result.data);
        this.ngOnInit(); // Atualiza a lista de itens após adicionar um novo
      }
    });
    await modal.present();
  }

}
