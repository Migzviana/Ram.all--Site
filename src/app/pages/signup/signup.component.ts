import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
    selector: 'app-signup',
    imports: [
        DefaultLoginLayoutComponent,
        ReactiveFormsModule,
        PrimaryInputComponent,
    ],
    providers: [LoginService],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordConfirm: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  private passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { passwordsMismatch: true };
  }

  submit(): void {
    if (this.signupForm.invalid) {
      if (this.signupForm.errors?.['passwordsMismatch']) {
        this.toastService.error('As senhas não coincidem!');
      } else {
        this.toastService.error('Preencha todos os campos corretamente!');
      }
      return;
    }

    const { name, email, password } = this.signupForm.value;

    this.loginService.signup(name, email, password).subscribe({
      next: () => {
        this.toastService.success('Registro feito com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        if (err.status === 400) {
          this.toastService.error('Este e-mail já está cadastrado!');
        } else {
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde'
          );
        }
      },
    });
  }

  navigate(): void {
    this.router.navigate(['login']);
  }
}
