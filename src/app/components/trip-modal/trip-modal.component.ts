import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(
    private modalController: ModalController,
    private tripService: TripService,
    private fb: FormBuilder
  ) {
    // Initialize the form group
    this.tripForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      tripCode: ['', [Validators.required]],
      description: ['', Validators.required],
      city: [null, Validators.required],
      userId: [null, Validators.required],
    });
  }

  ngOnInit() {
    // If tripId is present, load the trip data for editing
    if (this.tripId) {
      this.loadTripData(this.tripId);
    }
  }

  // Load existing trip data for editing
  loadTripData(tripId: number) {
    this.tripService.getTripById(tripId).subscribe({
      next: (tripData) => {
        // Fill the form with trip data
        this.tripForm.patchValue({
          name: tripData.name,
          password: tripData.password,
          tripCode: tripData.tripCode,
          description: tripData.description,
          city: tripData.city,
          userId: tripData.userId,
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
      tripCode: this.tripForm.value.tripCode,
      description: this.tripForm.value.description,
      city: this.tripForm.value.city,
      userId: this.tripForm.value.userId,
    };

    if (this.tripId) {
      // If tripId exists, update the trip
      // this.tripService.updateTrip(this.tripId, tripData).subscribe({
      //   next: (response) => {
      //     console.log('Trip updated successfully', response);
      //     this.modalController.dismiss(response); // Close the modal with the response
      //   },
      //   error: (error) => {
      //     console.error('Error updating trip', error);
      //     this.errorMessage = "An error occurred while updating the trip."; // Error message
      //   },
      // });
    } else {
      // Otherwise, create a new trip
      // this.tripService.createTrip(tripData).subscribe({
      //   next: (response) => {
      //     console.log('Trip created successfully', response);
      //     this.modalController.dismiss(response); // Close the modal with the response
      //   },
      //   error: (error) => {
      //     console.error('Error creating trip', error);
      //     this.errorMessage = "An error occurred while creating the trip."; // Error message
      //   },
      // });
    }

    this.errorMessage = ""; // Clear the error message after a successful submission
  }
}
