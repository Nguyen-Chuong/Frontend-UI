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

const routes: Routes = [
  {
    path: '', component: MasterComponent, children: [
      {
        path: 'authentication', component: AuthenticationComponent,
        children: [
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
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
        path: 'user', component: BodyUserComponent, children: [
          {path: 'profile', component: UserProfileComponent},
          {path: 'bookings', component: UserBookingsComponent},
          {path: 'reviews', component: UserReviewsComponent},
          {path: 'vip', component: UserVipComponent}
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
