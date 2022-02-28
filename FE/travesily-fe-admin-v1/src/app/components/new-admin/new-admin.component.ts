import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {

  formGroup!: FormGroup;
  constructor(private authService: AuthServiceService,
    private router: Router,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  addAdmin(){

  }
}
