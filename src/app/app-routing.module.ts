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
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'client', component: ClientComponent},
  { path: 'estado-mi-producto', component: ProductTrackingComponent },
  { path: 'seguimiento', component: FollowUpComponent },
  { path: 'technical', component: TechnicalComponent },
  { path: 'crear-usuario', component: CreateUserComponent },
  { path: 'lista-de-usuarios', component: ListUsersComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
