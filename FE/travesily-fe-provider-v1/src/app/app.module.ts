import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationInputComponent } from './shared/components/authentication-input/authentication-input.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { LoginComponent } from './components/authentication/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/authentication/change-password/change-password.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './_helper/auth.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { NegativeBarComponent } from './components/negative-bar/negative-bar.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { NewHotelComponent } from './components/new-hotel/new-hotel.component';
import { AddBenefitsComponent } from './components/add-benefits/add-benefits.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthenticationInputComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    HeaderComponent,
    ProfileComponent,
    NegativeBarComponent,
    HotelListComponent,
    RequestListComponent,
    NewHotelComponent,
    AddBenefitsComponent,
    AddRoomComponent,
    AddHotelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
