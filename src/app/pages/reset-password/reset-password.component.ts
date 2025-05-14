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
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DefaultLoginLayoutComponent,
    PrimaryInputComponent,
    CommonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
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

  // Método para verificar o token
  verifyToken(token: string): void {
  const body = { token };

  this.loginService.verifyResetToken(body).subscribe({
    next: (response) => {
      if (response.status === 200) {
        this.tokenValid = true;
        this.toastr.success('Token validado com sucesso!');
      } else {
        this.tokenValid = false;
        this.toastr.error('Token inválido.');
      }
    },
    error: (error) => {
      this.tokenValid = false;
      const serverMessage = typeof error.error === 'string' ? error.error : 'Erro ao validar token.';
      this.toastr.error(serverMessage);
    },
  });
}


  submit(): void {
  if (this.resetForm.valid) {
    const token = this.resetForm.value.token!;
    const newPassword = this.resetForm.value.newPassword!;

    this.loginService.resetPassword(token, newPassword).subscribe({
      next: (response) => {
        // Debugging: Verificando a resposta do servidor
        console.log('Resposta do servidor:', response);

        if (response.status === 200) {
          this.toastr.success('Senha redefinida com sucesso!');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Erro inesperado. Tente novamente.');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao redefinir a senha:', error);
        console.error('Detalhes do erro:', {
          status: error.status,
          message: error.message,
          errorResponse: error.error
        });

        // Agora tratamos o erro com mais detalhes
        const statusCode = error.status;
        const serverMessage = typeof error.error === 'string' ? error.error : 'Erro inesperado ao redefinir a senha.';

        if (statusCode === 400 && serverMessage) {
          this.toastr.error(serverMessage);
        } else if (statusCode === 401) {
          this.toastr.error('Sessão expirada ou token inválido.');
        } else if (statusCode === 500) {
          this.toastr.error('Erro interno do servidor. Tente novamente mais tarde.');
        } else {
          this.toastr.error('Erro inesperado ao redefinir a senha.');
        }
      }
    });
  } else {
    this.toastr.error('Formulário inválido. Verifique os campos.');
  }
}




  navigate(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
