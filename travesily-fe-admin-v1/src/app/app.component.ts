import { Component } from '@angular/core';
import { AuthServiceService } from './_services/auth-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'travesily-admin';

  constructor(public authService: AuthServiceService,) {}
}
