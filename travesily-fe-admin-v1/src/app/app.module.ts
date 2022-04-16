import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HotelApproveComponent } from './components/hotel-approve/hotel-approve.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AuthInterceptor } from './_helper/auth.interceptor';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserBookingComponent } from './components/user-booking/user-booking.component';
import { BookingDetailComponent } from './components/booking-detail/booking-detail.component';
import { UserFeedbackComponent } from './components/user-feedback/user-feedback.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthenticationInputComponent } from './components/authentication-input/authentication-input.component';
import { ProviderComponent } from './components/provider/provider.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ResponseComponent } from './components/response/response.component';
import { FeedbackTableComponent } from './components/feedback-table/feedback-table.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import { BenefitComponent } from './components/benefit/benefit.component';
import { MatSelectModule } from '@angular/material/select';
import { FacilityComponent } from './components/facility/facility.component';
import { AddBenefitComponent } from './components/add-benefit/add-benefit.component';
import { AddFacilityComponent } from './components/add-facility/add-facility.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { UpdateVipComponent } from './components/update-vip/update-vip.component';
import { VipInfoComponent } from './components/vip-info/vip-info.component';
import { ImportFileComponent } from './components/import-file/import-file.component';
import { BookingDetailCardComponent } from './components/booking-detail/booking-detail-card/booking-detail-card.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { ImagesCarouselComponent } from './components/images-carousel/images-carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularFireModule } from '@angular/fire/compat';
import { EditCouponComponent } from './components/edit-coupon/edit-coupon.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HotelApproveComponent,
    BookingListComponent,
    TaskbarComponent,
    HotelDetailComponent,
    RoomDetailComponent,
    HeaderComponent,
    AdminProfileComponent,
    ChangePasswordComponent,
    NewAdminComponent,
    UserComponent,
    UserDetailComponent,
    UserBookingComponent,
    BookingDetailComponent,
    UserFeedbackComponent,
    HotelListComponent,
    AuthenticationInputComponent,
    ProviderComponent,
    ManagerListComponent,
    FeedbackComponent,
    ResponseComponent,
    FeedbackTableComponent,
    DialogComponent,
    BenefitComponent,
    FacilityComponent,
    AddBenefitComponent,
    AddFacilityComponent,
    UpdateVipComponent,
    VipInfoComponent,
    ImportFileComponent,
    BookingDetailCardComponent,
    ImageSliderComponent,
    ImagesCarouselComponent,
    FooterComponent,
    EditCouponComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    NgbModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
    NgImageSliderModule,
    MatDialogModule,
    MatSelectModule,
    SimpleNotificationsModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
