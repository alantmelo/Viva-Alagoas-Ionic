import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular'; // Importando AlertController
import { TripService } from 'src/app/services/trip.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html',
  styleUrls: ['./trip-modal.component.scss'],
})
export class TripModalComponent implements OnInit {
  @Input() tripId?: number; // ID da viagem opcional para edição
  errorMessage: string | null = null;

  // Form properties
  tripForm!: FormGroup;
  tripTypes: any[] = [];
  cities: any[] = [];

  constructor(
    private modalController: ModalController,
    private tripService: TripService,
    private fb: FormBuilder,
    private alertController: AlertController // Adicionando AlertController
  ) {
    // Initialize the form group
    this.tripForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      city: [null],
      tripType: [null, Validators.required],
      startDate: [null], // Add startDate field
      endDate: [null], // Add endDate field
    });
  }

  ngOnInit() {
    // If tripId is present, load the trip data for editing
    if (this.tripId) {
      this.loadTripData(this.tripId);
    }
    this.loadTripTypes();
  }

  // Load existing trip data for editing
  loadTripData(tripId: number) {
    this.tripService.getTripById(tripId).subscribe({
      next: (tripData) => {
        console.log(tripData);
        // Fill the form with trip data
        this.tripForm.patchValue({
          name: tripData.name,
          password: tripData.password,
          description: tripData.description,
          city: tripData.cityId,
          tripType: tripData.tripTypeId,
          startDate: tripData.startDate, // Corrigido
          endDate: tripData.endDate, // Corrigido
        });
      },
      error: (err) => console.error('Error loading trip data', err),
    });
  }

  close() {
    this.modalController.dismiss();
  }

  confirm() {
    // Prepare trip data to send
    const tripData = {
      name: this.tripForm.value.name,
      password: this.tripForm.value.password,
      description: this.tripForm.value.description,
      cityId: this.tripForm.value.city,
      tripTypeId: this.tripForm.value.tripType,
      startDate: this.formatDate(this.tripForm.value.startDate), // Corrigido
      endDate: this.formatDate(this.tripForm.value.endDate), // Corrigido
    };

    if (this.tripId) {
      // If tripId exists, update the trip
      this.tripService.updateTrip(this.tripId, tripData).subscribe({
        next: (response) => {
          console.log('Trip updated successfully', response);
          this.modalController.dismiss(response); // Close the modal with the response
        },
        error: (error) => {
          console.error('Error updating trip', error);
          this.errorMessage = "An error occurred while updating the trip."; // Error message
        },
      });
    } else {
      // Otherwise, create a new trip
      this.tripService.createTrip(tripData).subscribe({
        next: (response) => {
          console.log('Trip created successfully', response);
          this.modalController.dismiss(response); // Close the modal with the response
        },
        error: (error) => {
          console.error('Error creating trip', error);
          this.errorMessage = "An error occurred while creating the trip."; // Error message
        },
      });
    }

    this.errorMessage = ""; // Clear the error message after a successful submission
  }

  // Método para formatar a data
  formatDate(date: string) {
    return date ? date.split('T')[0] : null; // Extract just the date part
  }

  // Carregar tipos de viagem e cidades
  loadTripTypes() {
    this.tripService.getActiveTripTypesAndCities().subscribe({
      next: (result) => {
        this.tripTypes = result.tripTypes; // Pega os tripTypes
        this.cities = result.cities; // Pega as cities
        console.log('Trip Types:', this.tripTypes);
        console.log('Cities:', this.cities);
      },
      error: (error) => {
        console.error('Erro ao buscar os dados', error);
      },
      complete: () => {
        console.log('Requisição completa.');
      },
    });
  }

  
  // Novo método para exibir o alerta de seleção de datas
  // async showDateAlert(dateType: 'startDate' | 'endDate') {
  //   const alert = await this.alertController.create({
  //     header: 'Select Dates',
  //     inputs: [
  //       {
  //         name: 'date',
  //         type: 'date', // Tipo 'date' para selecionar a data
  //         label: dateType === 'startDate' ? 'Start Date' : 'End Date',
  //         value: this.tripForm.value[dateType] ? this.formatDate(this.tripForm.value[dateType]) : null,
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: (data) => {
  //           this.tripForm.patchValue({
  //             [dateType]: data.date ? new Date(data.date).toISOString() : null, // Converte a data para ISO
  //           });
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }
  async showDateAlert(dateType: 'startDate' | 'endDate') {
    const alert = await this.alertController.create({
      header: 'Select Dates',
      inputs: [
        {
          name: 'date',
          type: 'date', // Tipo 'date' para selecionar a data
          label: dateType === 'startDate' ? 'Start Date' : 'End Date',
          value: this.tripForm.value[dateType] ? this.formatDate(this.tripForm.value[dateType]) : null,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: async (data) => {
            const selectedDate = new Date(data.date);
            
            if (!this.isValidDate(selectedDate)) {
              // Exibe um alerta se a data não for válida
              const invalidDateAlert = await this.alertController.create({
                header: 'Invalid Date',
                message: 'Please select a valid date.',
                buttons: ['OK'],
              });
              await invalidDateAlert.present();
              return;
            }
  
            if (dateType === 'startDate') {
              const endDate = new Date(this.tripForm.value.endDate);
              if (endDate && selectedDate > endDate) {
                // Exibe um alerta se a data de início for maior que a data final
                const dateOrderAlert = await this.alertController.create({
                  header: 'Invalid Date Range',
                  message: 'Start date cannot be after the end date.',
                  buttons: ['OK'],
                });
                await dateOrderAlert.present();
                return;
              }
            } else {
              const startDate = new Date(this.tripForm.value.startDate);
              if (startDate && selectedDate < startDate) {
                // Exibe um alerta se a data final for anterior à data de início
                const dateOrderAlert = await this.alertController.create({
                  header: 'Invalid Date Range',
                  message: 'End date cannot be before the start date.',
                  buttons: ['OK'],
                });
                await dateOrderAlert.present();
                return;
              }
            }
  
            // Se tudo estiver ok, atualiza o valor da data no formulário
            this.tripForm.patchValue({
              [dateType]: data.date ? new Date(data.date).toISOString() : null, // Converte a data para ISO
            });
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  // Função para verificar se a data é válida
  isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
  
}
