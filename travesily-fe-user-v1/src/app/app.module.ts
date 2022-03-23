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
import {
  HotelHomeComponent,
  MaxRangeDirective, MinRangeDirective
} from './components/master/body/body-home/booking/hotel-home/hotel-home.component';
import {AuthenticationComponent} from './components/master/body/authentication/authentication.component';
import {LoginComponent} from './components/master/body/authentication/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './components/master/body/authentication/register/register.component';
import { AuthenticationInputComponent } from './shared/components/authentication-input/authentication-input.component';
import { MasterComponent } from './components/master/master.component';
import { AlertComponent } from './components/master/body/authentication/alert/alert.component';
import { BodyUserComponent } from './components/master/body/body-user/body-user.component';
import { UserProfileComponent } from './components/master/body/body-user/user-profile/user-profile.component';
import { UserBookingsComponent } from './components/master/body/body-user/user-bookings/user-bookings.component';
import { UserReviewsComponent } from './components/master/body/body-user/user-reviews/user-reviews.component';
import { UserProfileDetailsComponent } from './components/master/body/body-user/user-profile/user-profile-details/user-profile-details.component';
import {AuthInterceptor} from "./_helper/auth.interceptor";
import { UserProfileDetailsInfoComponent } from './components/master/body/body-user/user-profile/user-profile-details/user-profile-details-info/user-profile-details-info.component';
import { EditDropdownNameComponent } from './components/master/body/body-user/user-profile/user-profile-details/edit-dropdown-name/edit-dropdown-name.component';
import { EditDropdownPasswordComponent } from './components/master/body/body-user/user-profile/user-profile-details/edit-dropdown-password/edit-dropdown-password.component';
import { EditDropdownAddPhoneComponent } from './components/master/body/body-user/user-profile/user-profile-details/edit-dropdown-add-phone/edit-dropdown-add-phone.component';
import { EditDropdownEditPhoneComponent } from './components/master/body/body-user/user-profile/user-profile-details/edit-dropdown-edit-phone/edit-dropdown-edit-phone.component';
import { UserProfilePaymentComponent } from './components/master/body/body-user/user-profile/user-profile-payment/user-profile-payment.component';
import { CreditCardComponent } from './components/master/body/body-user/user-profile/user-profile-payment/credit-card/credit-card.component';
import {UsernameValidatorDirective} from "./_validators/username.validator";
import {EmailValidatorDirective} from "./_validators/email.validator";
import {UserVipComponent} from "./components/master/body/body-user/user-vip/user-vip.component";
import { UserBookingsCompletedComponent } from './components/master/body/body-user/user-bookings/user-bookings-completed/user-bookings-completed.component';
import { UserBookingsUpcomingComponent } from './components/master/body/body-user/user-bookings/user-bookings-upcoming/user-bookings-upcoming.component';
import { UserBookingsCancelledComponent } from './components/master/body/body-user/user-bookings/user-bookings-cancelled/user-bookings-cancelled.component';
import { ForgotPasswordComponent } from './components/master/body/authentication/forgot-password/forgot-password.component';
import { OtpCheckerComponent } from './components/master/body/authentication/otp-checker/otp-checker.component';
import {NgOtpInputModule} from "ng-otp-input";
import { BookingCardComponent } from './components/master/body/body-user/user-bookings/booking-card/booking-card.component';
import { NewPasswordComponent } from './components/master/body/authentication/new-password/new-password.component';
import { UserBookingDetailComponent } from './components/master/body/body-user/user-bookings/user-booking-detail/user-booking-detail.component';
import { UserBookingDetailCardComponent } from './components/master/body/body-user/user-bookings/user-booking-detail/user-booking-detail-card/user-booking-detail-card.component';
import { BodyMainComponent } from './components/master/body/body-main/body-main.component';
import { SearchHotelListComponent } from './components/master/body/body-main/search-hotel-list/search-hotel-list.component';
import { HotelCardComponent } from './components/master/body/body-main/search-hotel-list/hotel-card/hotel-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from "./angular-material.module";
import { HotelDetailComponent } from './components/master/body/body-main/hotel-detail/hotel-detail.component';
import { RoomTypeCardComponent } from './components/master/body/body-main/hotel-detail/room-type-card/room-type-card.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { ImagesCarouselComponent } from './shared/components/images-carousel/images-carousel.component';
import { MainSearchBarComponent } from './components/master/body/body-main/main-search-bar/main-search-bar.component';
import { CartComponent } from './components/master/header/cart/cart.component';
import { BodyBookComponent } from './components/master/body/body-book/body-book.component';
import { BookingInformationComponent } from './components/master/body/body-book/booking-information/booking-information.component';
import { BookingPaymentInformationComponent } from './components/master/body/body-book/booking-payment-information/booking-payment-information.component';
import { BookingInformationConfirmComponent } from './components/master/body/body-book/booking-information/booking-information-confirm/booking-information-confirm.component';
import { BookingInformationDetailComponent } from './components/master/body/body-book/booking-information/booking-information-detail/booking-information-detail.component';
import { BookingInformationPaymentComponent } from './components/master/body/body-book/booking-information/booking-information-payment/booking-information-payment.component';
import { BookingVnpayComponent } from './components/master/body/body-book/booking-information/booking-information-payment/booking-vnpay/booking-vnpay.component';
import { BookingCodComponent } from './components/master/body/body-book/booking-information/booking-information-payment/booking-cod/booking-cod.component';
import { BookingTransactionInformationComponent } from './components/master/body/body-book/booking-transaction-information/booking-transaction-information.component';
import { TransactionCodComponent } from './components/master/body/body-book/booking-transaction-information/transaction-cod/transaction-cod.component';
import { TransactionVnpayComponent } from './components/master/body/body-book/booking-transaction-information/transaction-vnpay/transaction-vnpay.component';
import { TransactionBookingDetailComponent } from './components/master/body/body-book/booking-transaction-information/transaction-booking-detail/transaction-booking-detail.component';
import { ImageSliderComponent } from './shared/components/image-slider/image-slider.component';

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
    BodyUserComponent,
    UserProfileComponent,
    UserBookingsComponent,
    UserReviewsComponent,
    UserProfileDetailsComponent,
    UserProfileDetailsInfoComponent,
    EditDropdownNameComponent,
    EditDropdownPasswordComponent,
    EditDropdownAddPhoneComponent,
    EditDropdownEditPhoneComponent,
    UserProfilePaymentComponent,
    CreditCardComponent,
    UsernameValidatorDirective,
    EmailValidatorDirective,
    UserVipComponent,
    UserBookingsCompletedComponent,
    UserBookingsUpcomingComponent,
    UserBookingsCancelledComponent,
    ForgotPasswordComponent,
    OtpCheckerComponent,
    BookingCardComponent,
    NewPasswordComponent,
    UserBookingDetailComponent,
    UserBookingDetailCardComponent,
    BodyMainComponent,
    SearchHotelListComponent,
    HotelCardComponent,
    HotelDetailComponent,
    RoomTypeCardComponent,
    MaxRangeDirective,
    MinRangeDirective,
    ImagesCarouselComponent,
    MainSearchBarComponent,
    CartComponent,
    BodyBookComponent,
    BookingInformationComponent,
    BookingPaymentInformationComponent,
    BookingInformationConfirmComponent,
    BookingInformationDetailComponent,
    BookingInformationPaymentComponent,
    BookingVnpayComponent,
    BookingCodComponent,
    BookingTransactionInformationComponent,
    TransactionCodComponent,
    TransactionVnpayComponent,
    TransactionBookingDetailComponent,
    ImageSliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOtpInputModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    provideDatabase(() => getDatabase()),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
