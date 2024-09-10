import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service'; 
import { User } from 'src/app/models/user'; 
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  userForm!: FormGroup;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userId = 3;
    // this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadUser();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      birthAt: ['']
    });
  }

  loadUser() {
    this.userService.getUser(this.userId).subscribe(
      (userData) => {
        this.userForm.patchValue(userData);
      },
      async (error) => {
        await this.presentAlert('Error', 'Failed to load user data.');
      }
    );
  }

  async updateUser() {
    if (this.userForm.invalid) {
      await this.presentAlert('Validation Error', 'Please fill in all required fields correctly.');
      return;
    }

    this.userService.updateUser(this.userId, this.userForm.value).subscribe(
      async (updatedUser) => {
        await this.presentAlert('Success', 'User data updated successfully.');
      },
      async (error) => {
        await this.presentAlert('Error', 'Failed to update user data.');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Helper method to easily access form controls in the template
  get f() {
    return this.userForm.controls;
  }
}
