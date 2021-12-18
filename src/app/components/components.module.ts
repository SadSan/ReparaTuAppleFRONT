import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdviserComponent } from './adviser/adviser.component';
import { ClientComponent } from './client/client.component';
import { DomiciliaryComponent } from './domiciliary/domiciliary.component';
import { TechnicalComponent } from './technical/technical.component';
import { PrincipalComponent } from './principal/principal.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { ProductTrackingComponent } from './product-tracking/product-tracking.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { DetailProductForClientComponent } from './detail-product-for-client/detail-product-for-client.component';
import { CreateCodeComponent } from './create-code/create-code.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'cliente', component: ClientComponent },
  { path: 'estado-mi-producto', component: ProductTrackingComponent },
  { path: 'perfil-admin', component: AdminComponent },
  { path: 'crear-usuario', component: CreateUserComponent },
  { path: 'lista-de-usuarios', component: ListUsersComponent },
  { path: 'seguimiento', component: FollowUpComponent },
  { path: 'perfil-asesor', component: AdviserComponent },
  { path: 'detalle-producto', component: DetailProductForClientComponent },
  { path: 'crear-codigo', component: CreateCodeComponent },
  { path: 'lista-de-clientes', component: ClientListComponent },
  { path: 'perfil-domiciliario', component: DomiciliaryComponent },
  { path: 'perfil-tecnico', component: TechnicalComponent },
  { path: 'cambiar-clave', component: ChangePasswordComponent },
  { path: 'terminosycondicionesreparatuapple', component: TermsOfUseComponent },
  {
    path: 'politicadeprivacidadreparatuapple',
    component: PrivacyPolicyComponent,
  },
];

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    AdviserComponent,
    ClientComponent,
    DomiciliaryComponent,
    TechnicalComponent,
    PrincipalComponent,
    WelcomeComponent,
    RegisterComponent,
    ProductTrackingComponent,
    CreateUserComponent,
    ListUsersComponent,
    FollowUpComponent,
    DetailProductForClientComponent,
    CreateCodeComponent,
    ClientListComponent,
    ChangePasswordComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
  ],
  imports: [CommonModule, RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule,
    MatIconModule,
    ButtonModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    CreateUserComponent,
    AdminComponent,
    AdviserComponent,
    ClientComponent,
    DomiciliaryComponent,
    TechnicalComponent,
    PrincipalComponent,
    WelcomeComponent,
    RegisterComponent,
  ],
})
export class ComponentsModule { }
