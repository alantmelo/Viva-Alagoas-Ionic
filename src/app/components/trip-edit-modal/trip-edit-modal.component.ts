import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
      password: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      city: [null],
      startDate: [null], // Add startDate field
      endDate: [null], // Add endDate field
    });
  }

  ngOnInit() {
    // Load the trip data when the component initializes
    this.loadTripData(this.tripId);
  }

  // Load existing trip data for editing
  loadTripData(tripId: number) {
    this.tripService.getTripById(tripId).subscribe({
      next: (tripData) => {
        // Fill the form with trip data
        this.tripForm.patchValue({
          name: tripData.name,
          password: tripData.password,
          description: tripData.description,
          city: tripData.city,
          startDate: this.formatDate(this.tripForm.value.startDate),
          endDate: this.formatDate(this.tripForm.value.endDate),
        });
      },
      error: (err) => {
        console.error('Error loading trip data', err);
        this.errorMessage = "Failed to load trip data.";
      },
    });
  }

  close() {
    this.modalController.dismiss();
  }

  // Handle the submission of the edited trip data
  editTrip() {
    // Prepare trip data to send
    const tripData = {
      name: this.tripForm.value.name,
      password: this.tripForm.value.password,
      description: this.tripForm.value.description,
      city: this.tripForm.value.city,
      startDate: this.formatDate(this.tripForm.value.startDate),
      endDate: this.formatDate(this.tripForm.value.endDate),
    };

    // Update the trip
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
  formatDate(date: string){
    return date ? date.split('T')[0] : null; // Extract just the date part
  }
}
