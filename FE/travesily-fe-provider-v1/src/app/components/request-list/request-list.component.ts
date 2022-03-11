import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
import { RequestService } from 'src/app/_services/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  requests: Request[]
  dataSource

  constructor(private requestService: RequestService, private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
    ) { }

  displayedColumns: string[] = ['hotelName', 'requestDate', 'status', 'detail'];

  ngOnInit(): void {
    this.requestService.getAllRequest().pipe(first()).subscribe(
      rs => {
        this.requests = rs['data']

      }
    )
    this.dataSource = new MatTableDataSource<Request>(this.requests);
  }

}
