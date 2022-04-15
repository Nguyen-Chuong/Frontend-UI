import { BookingDetailComponent } from './components/booking-detail/booking-detail.component';
import { ImportFileComponent } from './components/import-file/import-file.component';
import { VipInfoComponent } from './components/vip-info/vip-info.component';
import { FacilityComponent } from './components/facility/facility.component';
import { BenefitComponent } from './components/benefit/benefit.component';
import { ResponseComponent } from './components/response/response.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { ProviderComponent } from './components/provider/provider.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { UserComponent } from './components/user/user.component';
import { HotelApproveComponent } from './components/hotel-approve/hotel-approve.component';

const routes: Routes = [
  {
    path: '',
    component: HotelApproveComponent
  },
  {
    path: 'taskbar',
    component: TaskbarComponent
  },
  {
    path: 'hotel-approve',
    component: HotelApproveComponent,
  },
  {
    path: 'hotel-list',
    component: HotelListComponent,
  },
  {
    path: 'manager-list',
    component: ManagerListComponent,
  },
  {
    path: 'booking',
    component: BookingListComponent,
  },
  {
    path: 'benefit',
    component: BenefitComponent,
  },
  {
    path: 'facility',
    component: FacilityComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'response',
    component: ResponseComponent,
  },
  {
    path: 'hotel-detail',
    component: HotelDetailComponent,
  },
  {
    path: 'room-detail',
    component: RoomDetailComponent,
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent,
  },
  {
    path: 'new-admin',
    component: NewAdminComponent,
  },
  {
    path: 'vip-info',
    component: VipInfoComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'provider',
    component: ProviderComponent,
  },
  {
    path: 'user-detail',
    component: UserDetailComponent,
  },
  {
    path: 'add-district',
    component: ImportFileComponent,
  },
  {
    path: 'booking-detail',
    component: BookingDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
