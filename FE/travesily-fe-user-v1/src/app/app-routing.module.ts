import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserLoginComponent} from "./components/header/user-login/user-login.component";
import {BodyHomeComponent} from "./components/body/body-home/body-home.component";
import {HotelHomeComponent} from "./components/body/body-home/booking/hotel-home/hotel-home.component";
import {UserComponent} from "./components/header/user/user.component";
import {AuthenticationComponent} from "./components/body/authentication/authentication.component";
import {LoginComponent} from "./components/body/authentication/login/login.component";
import {RegisterComponent} from "./components/body/authentication/register/register.component";
import {MasterComponent} from "./components/master/master.component";
import {UnauthorizedComponent} from "./components/master/unauthorized/unauthorized.component";
import {AuthorizedComponent} from "./components/master/authorized/authorized.component";

const routes: Routes = [
  {
    path: '', component: MasterComponent, children: [
      {
        path: 'unauthorized', component: UnauthorizedComponent, children: [
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
      },
      {
        path: 'authorized', component: AuthorizedComponent, children: [
          {
            path: 'home', component: BodyHomeComponent,
            children: [
              {path: '', component: HotelHomeComponent},
              {path: 'hotelAndHome', component: HotelHomeComponent},
            ]
          },
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
