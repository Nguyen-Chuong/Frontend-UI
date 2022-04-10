import { RoomImageComponent } from './components/room-image/room-image.component';
import { UpdateFacilitiesComponent } from './components/update-facilities/update-facilities.component';
import { UpdateBenefitsComponent } from './components/update-benefits/update-benefits.component';
import { UpdateRoomComponent } from './components/update-room/update-room.component';
import { UpdateHotelComponent } from './components/update-hotel/update-hotel.component';
import { NewHotelComponent } from './components/new-hotel/new-hotel.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/authentication/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { NewPasswordComponent } from './components/authentication/new-password/new-password.component';
import { OtpCheckerComponent } from './components/authentication/otp-checker/otp-checker.component';

const routes: Routes = [
  {
    path: '',
    component: HotelListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'new-password',
    component: NewPasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'otp-checker',
    component: OtpCheckerComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'hotel-list',
    component: HotelListComponent
  },
  {
    path: 'request-list',
    component: RequestListComponent
  },
  {
    path: 'new-hotel',
    component: NewHotelComponent
  },
  {
    path: 'update-hotel',
    component: UpdateHotelComponent
  },
  {
    path: 'update-room',
    component: UpdateRoomComponent
  },
  {
    path: 'update-benefit',
    component: UpdateBenefitsComponent
  },
  {
    path: 'update-facility',
    component: UpdateFacilitiesComponent
  },
  {
    path: 'hotel-detail',
    component: HotelDetailComponent
  },
  {
    path: 'room-image',
    component: RoomImageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
