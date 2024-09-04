import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token/token.service'; // Correct path


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private tokenService: TokenService, 
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        async (response) => {
          console.log('Login successful', response.accessToken);
          this.tokenService.saveToken(response.accessToken);
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Login Failed',
            message: 'Invalid email or password. Please try again.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    } else {
      const alert = await this.alertController.create({
        header: 'Validation Error',
        message: 'Please enter a valid email and password.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
