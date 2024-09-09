import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service'; 
import { User } from 'src/app/models/user'; 
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user!: User;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.userId = 2;
    // this.userId = +this.route.snapshot.paramMap.get('id');
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.userId).subscribe(
      (userData) => {
        this.user = userData;
      },
      async (error) => {
        await this.presentAlert('Error', 'Failed to load user data.');
      }
    );
  }

  async updateUser() {
    if (!this.isValidForm()) {
      await this.presentAlert('Validation Error', 'Please fill in all required fields correctly.');
      return;
    }

    const updatedUserData = {
      name: this.user.name,
      email: this.user.email,
      birthAt: this.user.birthAt,
      role: this.user.role
    };

    this.userService.updateUser(this.userId, updatedUserData).subscribe(
      async (updatedUser) => {
        this.user = updatedUser;
        await this.presentAlert('Success', 'User data updated successfully.');
      },
      async (error) => {
        await this.presentAlert('Error', 'Failed to update user data.');
      }
    );
  }

  isValidForm(): boolean {
    return (
      this.user.name.trim() !== '' &&
      this.user.email.trim() !== '' &&
      this.validateEmail(this.user.email) &&
      this.user.role.trim() !== ''
    );
  }

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
