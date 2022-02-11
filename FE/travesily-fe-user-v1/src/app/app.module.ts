import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserComponent} from './components/header/user/user.component';
import {UserLoginComponent} from './components/header/user-login/user-login.component';
import {BodyComponent} from './components/body/body.component';
import {BodyHomeComponent} from './components/body/body-home/body-home.component';
import {BookingComponent} from './components/body/body-home/booking/booking.component';
import {InputComponent} from './shared/components/input/input.component';
import {DropdownComponent} from './shared/components/dropdown/dropdown.component';
import {HotelHomeComponent} from './components/body/body-home/booking/hotel-home/hotel-home.component';
import {AuthenticationComponent} from './components/body/authentication/authentication.component';
import {LoginComponent} from './components/body/authentication/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './components/body/authentication/register/register.component';
import { AuthenticationInputComponent } from './shared/components/authentication-input/authentication-input.component';
import { MasterComponent } from './components/master/master.component';
import { UnauthorizedComponent } from './components/master/unauthorized/unauthorized.component';
import { AuthorizedComponent } from './components/master/authorized/authorized.component';
import { HeaderAuthorizedComponent } from './components/header-authorized/header-authorized.component';
import { AlertComponent } from './components/body/authentication/alert/alert.component';

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
    UnauthorizedComponent,
    AuthorizedComponent,
    HeaderAuthorizedComponent,
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
