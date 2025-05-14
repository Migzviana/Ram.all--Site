import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';

interface ForgotPasswordForm {
  email: FormControl<string | null>;
}

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup<ForgotPasswordForm>;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  submit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email!;

      this.loginService.sendRecoveryEmail(email).pipe(
        delay(4000)
      ).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.toastr.success('Link de recuperação enviado!');
            this.router.navigate(['/reset-password']);
          } else {
            this.toastr.error('Erro ao enviar link de recuperação.');
          }
        },
        error: (err) => {
          console.error('Erro na requisição:', err); 
          this.toastr.error('Erro ao enviar link de recuperação.');
        },
      });
    }
  }

  navigate(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}