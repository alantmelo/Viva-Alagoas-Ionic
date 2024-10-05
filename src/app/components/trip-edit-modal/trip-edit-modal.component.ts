import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TripService } from 'src/app/services/trip.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-edit-modal',
  templateUrl: './trip-edit-modal.component.html',
  styleUrls: ['./trip-edit-modal.component.scss'],
})
export class TripEditModalComponent implements OnInit {
  @Input() tripId!: number; // Trip ID is required for editing
  errorMessage: string | null = null;
  tripTypes: any[] = [];
  cities: any[] = [];

  // Form properties
  tripForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private tripService: TripService,
    private fb: FormBuilder,
    private alertController: AlertController // Import AlertController
  ) {
    // Initialize the form group
    this.tripForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      city: [null],
      tripType: [null, Validators.required],
      startDate: [null],
      endDate: [null],
    });
  }

  ngOnInit() {
    // Load the trip data when the component initializes
    this.loadTripData(this.tripId);
  }

  loadTripData(tripId: number) {
    this.tripService.getTripById(tripId).subscribe({
      next: (tripData) => {
        console.log(tripData.tripTypes);
        this.cities = tripData.cities;
        this.tripTypes = tripData.tripTypes;

        this.tripForm.patchValue({
          name: tripData.name,
          password: tripData.password,
          description: tripData.description,
          city: tripData.cityId,
          tripType: tripData.tripTypeId,
          startDate: this.formatDate(tripData.startDate),
          endDate: this.formatDate(tripData.endDate),
        });
      },
      error: (err) => {
        console.error('Error loading trip data', err);
        this.errorMessage = "Failed to load trip data.";
      },
    });
  }

  async presentDateAlert(type: 'start' | 'end') {
    const alert = await this.alertController.create({
      header: `${type === 'start' ? 'Select Start Date' : 'Select End Date'}`,
      inputs: [
        {
          name: 'date',
          type: 'date',
          placeholder: 'YYYY-MM-DD',
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
          text: 'Confirm',
          handler: (data) => {
            if (type === 'start') {
              this.tripForm.patchValue({ startDate: data.date });
            } else {
              this.tripForm.patchValue({ endDate: data.date });
            }
          },
        },
      ],
    });

    await alert.present();
  }

  close() {
    this.modalController.dismiss();
  }

  editTrip() {
    const tripData = {
      name: this.tripForm.value.name,
      password: this.tripForm.value.password,
      description: this.tripForm.value.description,
      cityId: this.tripForm.value.city,
      tripTypeId: this.tripForm.value.tripType,
      startDate: this.formatDate(this.tripForm.value.startDate),
      endDate: this.formatDate(this.tripForm.value.endDate),
    };

    this.tripService.updateTrip(this.tripId, tripData).subscribe({
      next: (response) => {
        console.log('Trip updated successfully', response);
        this.modalController.dismiss(response); // Close the modal with the response
      },
      error: (error) => {
        console.error('Error updating trip', error);
        this.errorMessage = "An error occurred while updating the trip.";
      },
    });
  }

  formatDate(date: string | null | undefined): string | null {
    if (!date) return null; // Retorna null se a data for undefined ou null
    return date.split('T')[0]; // Extrai apenas a parte da data
}
}
