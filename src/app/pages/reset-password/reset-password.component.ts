import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-reset-password',
    imports: [
        ReactiveFormsModule,
        DefaultLoginLayoutComponent,
        PrimaryInputComponent,
        CommonModule,
    ],
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm = new FormGroup(
    {
      token: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: ResetPasswordComponent.passwordsMatch }
  );

  tokenValid = false;
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  static passwordsMatch(
    formGroup: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = formGroup.get('newPassword')?.value;
    const confirm = formGroup.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  verifyToken(token: string): void {
    this.loginService.verifyResetToken({ token }).subscribe({
      next: (response: any) => {
        this.tokenValid = true;
        const message = response?.message || 'Token validado com sucesso.';
        this.toastr.success(message);
      },
      error: (error) => {
        this.tokenValid = false;
        const message = error.error?.message || 'Erro ao validar token.';
        this.toastr.error(message);
      },
    });
  }


  submit(): void {
    if (this.resetForm.valid) {
      const token = this.resetForm.value.token!;
      const newPassword = this.resetForm.value.newPassword!;

      this.loginService.resetPassword(token, newPassword).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.toastr.success('Senha redefinida com sucesso!');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          } else {
            this.toastr.error('Erro inesperado. Tente novamente.');
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erro ao redefinir a senha:', error);
          console.error('Detalhes do erro:', {
            status: error.status,
            message: error.message,
            errorResponse: error.error,
          });

          const statusCode = error.status;
          const serverMessage =
            typeof error.error === 'string'
              ? error.error
              : 'Erro inesperado ao redefinir a senha.';

          if (statusCode === 400 && serverMessage) {
            this.toastr.error(serverMessage);
          } else if (statusCode === 401) {
            this.toastr.error('Sessão expirada ou token inválido.');
          } else if (statusCode === 500) {
            this.toastr.error(
              'Erro interno do servidor. Tente novamente mais tarde.'
            );
          } else {
            this.toastr.error('Erro inesperado ao redefinir a senha.');
          }
        },
      });
    } else {
      this.toastr.error('Formulário inválido. Verifique os campos.');
    }
  }

  navigate(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
