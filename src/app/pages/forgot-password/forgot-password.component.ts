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
  isLoading = false;

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
      this.isLoading = true;

      this.toastr.info('Aguarde, estamos enviando o link de recuperação...');

      this.loginService
        .sendRecoveryEmail(email)
        .pipe(delay(4000))
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            if (response.status === 200) {
              this.toastr.success('Link de recuperação enviado!');
              setTimeout(() => {
                this.router.navigate(['/reset-password']);
              }, 2000);
            } else {
              this.toastr.error('Erro ao enviar link de recuperação.');
              this.isLoading = false;
            }
          },
          error: (err) => {
            console.error('Erro na requisição:', err);
            this.toastr.error('Erro ao enviar link de recuperação.');
            this.isLoading = false;
          },
        });
    }
  }

  navigate(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
