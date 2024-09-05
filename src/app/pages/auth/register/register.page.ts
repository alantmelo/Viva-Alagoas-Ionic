import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  formattedDate: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private readonly tokenService: TokenService,
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        birthAt: ['', []],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  onDateChange(event: any) {
    this.formattedDate = event.detail.value;
    this.registerForm.get('birthAt')?.setValue(this.formattedDate);
  }

  async register() {
    if (this.registerForm.valid) {
      const { name, email, password, birthAt } = this.registerForm.value;
      const userData = { name, email, password, birthAt: null, role: 'TOURIST' };

      await this.authService.register(userData).subscribe({
        next: (res) => {
          console.log(res.token.accessToken);
          this.tokenService.saveToken(res.token.accessToken);
          this.navCtrl.navigateForward('/tabs/tab1');
        },
        error: async (err) => {
          console.error(err);
          this.errorMessage = this.formatErrorMessages(err.error.message);
          await this.showAlert('Registration failed', this.errorMessage);
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      await this.showAlert('Form Error', this.errorMessage);
    }
  }

  formatErrorMessages(errors: string[]): string {
    return errors.join('; '); // Adapta a lista de mensagens para ser exibida no alerta
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: 'error-alert'
    });

    await alert.present();
  }
}
