import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { MainExtensionPageComponent } from './pages/main-extension-page/main-extension-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';


export const routes: Routes = [
    {
        path:'', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "forgot-password",
        component: ForgotPasswordComponent
    },
    {
        path: "reset-password",
        component: ResetPasswordComponent
    },
    {
        path: "home",
        component: MainExtensionPageComponent,
        canActivate: [AuthGuard]
    }   
];
