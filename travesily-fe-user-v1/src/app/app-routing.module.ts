import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BodyHomeComponent} from "./components/master/body/body-home/body-home.component";
import {HotelHomeComponent} from "./components/master/body/body-home/booking/hotel-home/hotel-home.component";
import {AuthenticationComponent} from "./components/master/body/authentication/authentication.component";
import {LoginComponent} from "./components/master/body/authentication/login/login.component";
import {RegisterComponent} from "./components/master/body/authentication/register/register.component";
import {MasterComponent} from "./components/master/master.component";
import {BodyUserComponent} from "./components/master/body/body-user/body-user.component";
import {UserProfileComponent} from "./components/master/body/body-user/user-profile/user-profile.component";
import {UserBookingsComponent} from "./components/master/body/body-user/user-bookings/user-bookings.component";
import {
  UserVipComponent
} from "./components/master/body/body-user/user-vip/user-vip.component";
import {
  ForgotPasswordComponent
} from "./components/master/body/authentication/forgot-password/forgot-password.component";
import {OtpCheckerComponent} from "./components/master/body/authentication/otp-checker/otp-checker.component";
import {NewPasswordComponent} from "./components/master/body/authentication/new-password/new-password.component";
import {
  UserBookingDetailComponent
} from "./components/master/body/body-user/user-bookings/user-booking-detail/user-booking-detail.component";
import {BodyMainComponent} from "./components/master/body/body-main/body-main.component";
import {
  SearchHotelListComponent
} from "./components/master/body/body-main/search-hotel-list/search-hotel-list.component";
import {HotelDetailComponent} from "./components/master/body/body-main/hotel-detail/hotel-detail.component";
import {BodyBookComponent} from "./components/master/body/body-book/body-book.component";
import {
  BookingInformationComponent
} from "./components/master/body/body-book/booking-information/booking-information.component";
import {
  BookingPaymentInformationComponent
} from "./components/master/body/body-book/booking-payment-information/booking-payment-information.component";
import {
  BookingInformationConfirmComponent
} from "./components/master/body/body-book/booking-information/booking-information-confirm/booking-information-confirm.component";
import {
  BookingInformationPaymentComponent
} from "./components/master/body/body-book/booking-information/booking-information-payment/booking-information-payment.component";
import {
  BookingVnpayComponent
} from "./components/master/body/body-book/booking-information/booking-information-payment/booking-vnpay/booking-vnpay.component";
import {
  BookingCodComponent
} from "./components/master/body/body-book/booking-information/booking-information-payment/booking-cod/booking-cod.component";
import {
  BookingTransactionInformationComponent
} from "./components/master/body/body-book/booking-transaction-information/booking-transaction-information.component";
import {UserAddReviewComponent} from "./components/master/body/user-add-review/user-add-review.component";
import {BodyFeedbackComponent} from "./components/master/body/body-feedback/body-feedback.component";
import {UserFeedbackComponent} from "./components/master/body/body-user/user-feedback/user-feedback.component";
import {
  FeedbackDetailComponent
} from "./components/master/body/body-user/user-feedback/feedback-detail/feedback-detail.component";

const routes: Routes = [
  {
    path: '', component: MasterComponent, children: [
      {
        path: 'authentication', component: AuthenticationComponent,
        children: [
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
          {path: 'forgot-password', component: ForgotPasswordComponent},
          {path: 'otp-checker', component: OtpCheckerComponent},
          {path: 'new-password', component: NewPasswordComponent}
        ]
      },
      {
        path: '', component: BodyHomeComponent,
        children: [
          {path: '', component: HotelHomeComponent},
          {path: 'hotelAndHome', component: HotelHomeComponent},
        ]
      },
      {
        path: 'main', component: BodyMainComponent, children: [
          {path: 'search-hotel-list', component: SearchHotelListComponent},
          {path: 'hotel-detail', component: HotelDetailComponent},
        ]
      },
      {
        path: 'user', component: BodyUserComponent, children: [
          {path: 'profile', component: UserProfileComponent},
          {path: 'bookings', component: UserBookingsComponent},
          {path: 'user-feedback', component: UserFeedbackComponent},
          {path: 'feedback-detail', component: FeedbackDetailComponent},
          {path: 'vip', component: UserVipComponent},
          {path: 'booking-detail', component: UserBookingDetailComponent}
        ]
      },
      {
        path: 'book', component: BodyBookComponent, children: [
          {path: 'booking-info', component: BookingInformationComponent},
          {
            path: 'booking-payment-info', component: BookingPaymentInformationComponent, children: [
              {path: 'booking-payment-vnpay', component: BookingVnpayComponent},
              {path: 'booking-payment-cod', component: BookingCodComponent}
            ]
          },
          {path: 'transaction-info', component: BookingTransactionInformationComponent}
        ]
      },
      {path: 'review', component: UserAddReviewComponent},
      {path: 'feedback',component: BodyFeedbackComponent}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
