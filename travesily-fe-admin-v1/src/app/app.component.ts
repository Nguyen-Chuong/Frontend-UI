import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AuthServiceService } from './_services/auth-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'travesily-fe-admin-v1';

  constructor(public authService: AuthServiceService,) {}
}
