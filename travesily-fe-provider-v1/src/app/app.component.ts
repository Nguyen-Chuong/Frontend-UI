import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'travesily-fe-provider-v1';
  isLogin = false
  constructor(){
    if(window.localStorage.getItem('token')){
      this.isLogin = true
    }
  }
}
