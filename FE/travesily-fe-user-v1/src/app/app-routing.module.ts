import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BodyHomeComponent} from "./components/master/body/body-home/body-home.component";
import {HotelHomeComponent} from "./components/master/body/body-home/booking/hotel-home/hotel-home.component";
import {AuthenticationComponent} from "./components/master/body/authentication/authentication.component";
import {LoginComponent} from "./components/master/body/authentication/login/login.component";
import {RegisterComponent} from "./components/master/body/authentication/register/register.component";
import {MasterComponent} from "./components/master/master.component";

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
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
