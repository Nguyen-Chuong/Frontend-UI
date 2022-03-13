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
import {UserReviewsComponent} from "./components/master/body/body-user/user-reviews/user-reviews.component";
import {
  UserVipComponent
} from "./components/master/body/body-user/user-vip/user-vip.component";
import {
  UserBookingsCompletedComponent
} from "./components/master/body/body-user/user-bookings/user-bookings-completed/user-bookings-completed.component";
import {
  UserBookingsUpcomingComponent
} from "./components/master/body/body-user/user-bookings/user-bookings-upcoming/user-bookings-upcoming.component";
import {
  UserBookingsCancelledComponent
} from "./components/master/body/body-user/user-bookings/user-bookings-cancelled/user-bookings-cancelled.component";
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
        path: 'home', component: BodyHomeComponent,
        children: [
          {path: '', component: HotelHomeComponent},
          {path: 'hotelAndHome', component: HotelHomeComponent},
        ]
      },
      {
        path:'main', component: BodyMainComponent, children:[
          {path: 'search-hotel-list', component: SearchHotelListComponent},
          {path: 'hotel-detail', component: HotelDetailComponent},
        ]
      },
      {
        path: 'user', component: BodyUserComponent, children: [
          {path: 'profile', component: UserProfileComponent},
          {path: 'bookings', component: UserBookingsComponent, children:[
              {path:'', component: UserBookingsUpcomingComponent},
              {path:'completed', component: UserBookingsCompletedComponent},
              {path:'upcoming', component: UserBookingsUpcomingComponent},
              {path:'cancelled', component: UserBookingsCancelledComponent}
            ]},
          {path: 'reviews', component: UserReviewsComponent},
          {path: 'vip', component: UserVipComponent},
          {path: 'booking-detail', component: UserBookingDetailComponent}
        ]
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
