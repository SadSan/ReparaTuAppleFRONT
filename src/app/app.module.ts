import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

//routes
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';

import { LoginComponent } from './components/login/login.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { TechnicalGuardGuard } from './guards/technical-guard.guard';
import { AdviserGuardGuard } from './guards/adviser-guard.guard';
import { DomiciliaryGuardGuard } from './guards/domiciliary-guard.guard';
import { AdminNAdviserGuardGuard } from './guards/adminNadviser-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule,
    MatIconModule,
    ButtonModule,
  ],
  providers: [AdminGuardGuard, AdviserGuardGuard, DomiciliaryGuardGuard, TechnicalGuardGuard, AdminNAdviserGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }


