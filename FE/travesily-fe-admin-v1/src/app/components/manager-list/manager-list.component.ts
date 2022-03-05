import { NotificationService } from './../../_services/notification.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit {

  managers: Account[]
  dataSource
  constructor(private userService: UserService,
    private notificationService: NotificationService) { }
  displayedColumns: string[] = ['id', 'username', 'email', 'phone', ' '];

  ngOnInit(): void {
    this.userService.getAllManager().pipe(first()).subscribe(
      rs => {
        this.managers = rs['data']
      }
    )
    this.dataSource = new MatTableDataSource<Account>(this.managers);
  }

  deleteManager(id){
    this.userService.deleteManage(id).pipe(first()).subscribe({
      next: () => {
        this.notificationService.onSuccess('Removed successfully');
        window.location.reload()
      },
      error: err => {
        this.notificationService.onError('Removed false')
      }
    })
  }
}
