import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/master/header/header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserComponent} from './components/master/header/user/user.component';
import {UserLoginComponent} from './components/master/header/user-login/user-login.component';
import {BodyComponent} from './components/master/body/body.component';
import {BodyHomeComponent} from './components/master/body/body-home/body-home.component';
import {BookingComponent} from './components/master/body/body-home/booking/booking.component';
import {InputComponent} from './shared/components/input/input.component';
import {DropdownComponent} from './shared/components/dropdown/dropdown.component';
import {HotelHomeComponent} from './components/master/body/body-home/booking/hotel-home/hotel-home.component';
import {AuthenticationComponent} from './components/master/body/authentication/authentication.component';
import {LoginComponent} from './components/master/body/authentication/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './components/master/body/authentication/register/register.component';
import { AuthenticationInputComponent } from './shared/components/authentication-input/authentication-input.component';
import { MasterComponent } from './components/master/master.component';
import { AlertComponent } from './components/master/body/authentication/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    UserLoginComponent,
    BodyComponent,
    BodyHomeComponent,
    BookingComponent,
    InputComponent,
    DropdownComponent,
    HotelHomeComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationInputComponent,
    MasterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
