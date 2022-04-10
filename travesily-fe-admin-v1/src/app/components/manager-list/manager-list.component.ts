import { DialogComponent } from './../dialog/dialog.component';
import { NotificationService } from './../../_services/notification.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { Account } from 'src/app/_models/account';
import { UserService } from 'src/app/_services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit {
  currentTask="Managers"
  message: string
  checked: boolean
  managers: Account[]
  isAdmin = false
  dataSource
  constructor(private userService: UserService,
    private notificationService: NotificationService,
    public dialog: MatDialog) { }
  displayedColumns: string[] = ['id', 'username', 'email', 'phone', ' '];

  ngOnInit(): void {
    this.userService.getAllManager().pipe(first()).subscribe(
      rs => {
        this.managers = rs['data']
      }
    )
    this.dataSource = new MatTableDataSource<Account>(this.managers);
    this.message = 'Are you sure to remove this manager!'
  }

  deleteManager(id){
    if(Number(localStorage.getItem('type')) === 2){
      this.isAdmin = true
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {checked: this.checked, message: this.message, isAdmin: this.isAdmin},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.checked = result['checked']
      if(this.checked){
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
    });
  }
}
