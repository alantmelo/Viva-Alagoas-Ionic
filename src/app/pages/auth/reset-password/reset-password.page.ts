import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular'; // Adicione AlertController
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController // Adicione AlertController ao construtor
  ) {}

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      token: ['', []],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true }; // Return error if passwords don't match
    }
    return null; // Return null if passwords match
  }

  async resetPassword() {
    if (this.resetPasswordForm.valid) {
      const { password, token } = this.resetPasswordForm.value;

      this.authService.resetPassword(password, '').subscribe({
        next: (res) => {
          console.log(res);
          this.navCtrl.navigateForward('/login');
        },
        error: async (err) => {
          console.log(err);
          this.errorMessage = 'Password reset failed. Please try again.';
          
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message.join(', ');
          }

          // Show alert with the error message
          const alert = await this.alertController.create({
            header: 'Error',
            message: this.errorMessage,
            buttons: ['OK']
          });

          await alert.present();
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
