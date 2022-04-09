import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationInputComponent } from './shared/components/authentication-input/authentication-input.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { UpdateHotelComponent } from './components/update-hotel/update-hotel.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { UpdateRoomComponent } from './components/update-room/update-room.component';
import { BookingComponent } from './components/booking/booking.component';
import { ReviewComponent } from './components/review/review.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { AddFacilitiesComponent } from './components/add-facilities/add-facilities.component';
import { UpdateBenefitsComponent } from './components/update-benefits/update-benefits.component';
import { UpdateFacilitiesComponent } from './components/update-facilities/update-facilities.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { RoomImageComponent } from './components/room-image/room-image.component';
import { OtpCheckerComponent } from './components/authentication/otp-checker/otp-checker.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { NewPasswordComponent } from './components/authentication/new-password/new-password.component';
import { UpComingBookingComponent } from './components/up-coming-booking/up-coming-booking.component';
import { FooterComponent } from './components/footer/footer.component';
import { MyChartComponent } from './components/my-chart/my-chart.component';

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
    UpdateHotelComponent,
    DialogComponent,
    UpdateRoomComponent,
    BookingComponent,
    ReviewComponent,
    HotelDetailComponent,
    AddFacilitiesComponent,
    UpdateBenefitsComponent,
    UpdateFacilitiesComponent,
    RoomImageComponent,
    OtpCheckerComponent,
    NewPasswordComponent,
    UpComingBookingComponent,
    FooterComponent,
    MyChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgOtpInputModule,
    SimpleNotificationsModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
