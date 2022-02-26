import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { HotelApproveComponent } from './components/hotel-approve/hotel-approve.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';

const routes: Routes = [
  {
    path: 'taskbar',
    component: TaskbarComponent
  },
  {
    path: 'hotel-approve',
    component: HotelApproveComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'booking',
    component: BookingListComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
