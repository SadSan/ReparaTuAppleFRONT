import { DomiciliaryComponent } from './components/domiciliary/domiciliary.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductTrackingComponent } from './components/product-tracking/product-tracking.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientComponent } from './components/client/client.component'
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { TechnicalComponent } from './components/technical/technical.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateCodeComponent } from './components/create-code/create-code.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdviserComponent } from './components/adviser/adviser.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { AdviserGuardGuard } from './guards/adviser-guard.guard';
import { DomiciliaryGuardGuard } from './guards/domiciliary-guard.guard';
import { TechnicalGuardGuard } from './guards/technical-guard.guard';
import { ReparaGuardGuard } from './guards/repara-guard.guard';
import { AdminNAdviserGuardGuard } from './guards/adminNadviser-guard.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dashboard-admin', component: AdminComponent, canActivate: [AdminGuardGuard] },
  { path: 'dashboard-adviser', component: AdviserComponent, canActivate: [AdviserGuardGuard] },
  { path: 'dashboard-domiciliary', component: DomiciliaryComponent, canActivate: [DomiciliaryGuardGuard] },
  { path: 'dashboard-technical', component: TechnicalComponent, canActivate: [TechnicalGuardGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AdminGuardGuard] },
  { path: 'create-code', component: CreateCodeComponent, canActivate: [AdminNAdviserGuardGuard] },
  { path: 'list-users', component: ListUsersComponent, canActivate: [AdminGuardGuard]  },
  { path: 'follow-up', component: FollowUpComponent, canActivate: [ReparaGuardGuard] },
  { path: 'client', component: ClientComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'state-product', component: ProductTrackingComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
