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
  constructor(private userService: UserService) { }
  displayedColumns: string[] = ['id', 'username', 'email', 'phone', ' '];

  ngOnInit(): void {
    this.userService.getAllManager().pipe(first()).subscribe(
      rs => {
        this.managers = rs['data']
      }
    )
    console.log(this.managers)
    this.dataSource = new MatTableDataSource<Account>(this.managers);
  }
}
