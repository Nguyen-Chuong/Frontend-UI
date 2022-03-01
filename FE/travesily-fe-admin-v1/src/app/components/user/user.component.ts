import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent{

  constructor(private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  displayedColumns: string[] = ['username', 'email', 'phone', 'vip'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  openUserDetail(id): void {
    this.router.navigate(['user-detail'], {
      queryParams: { id: JSON.stringify(id) }
    });
  }
}

export interface PeriodicElement {
  username: string;
  email: String;
  phone: string;
  vip: string;
  id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 3, username: '1', email: 'Hydrogen', phone: '1.0079', vip: 'H' },
  { id: 1, username: '2', email: 'Helium', phone: '4.0026', vip: 'He' },
  { id: 1, username: '3', email: 'Lithium', phone: '6.941', vip: 'Li' },
  { id: 2, username: '4', email: 'Beryllium', phone: '9.0122', vip: 'Be' },
  { id: 2, username: '5', email: 'Boron', phone: '10.811', vip: 'B' },
  { id: 2, username: '6', email: 'Carbon', phone: '12.0107', vip: 'C' },
  { id: 1, username: '7', email: 'Nitrogen', phone: '14.0067', vip: 'N' },
  { id: 1, username: '8', email: 'Oxygen', phone: '15.9994', vip: 'O' },
  { id: 1, username: '9', email: 'Fluorine', phone: '18.9984', vip: 'F' },
  { id: 1, username: '10', email: 'Neon', phone: '20.1797', vip: 'Ne' },
  { id: 1, username: '11', email: 'Sodium', phone: '22.9897', vip: 'Na' },
  { id: 1, username: '12', email: 'Magnesium', phone: '24.305', vip: 'Mg' },
  { id: 1, username: '13', email: 'Aluminum', phone: '26.9815', vip: 'Al' },
  { id: 1, username: '14', email: 'Silicon', phone: '28.0855', vip: 'Si' },
  { id: 1, username: '15', email: 'Phosphorus', phone: '30.9738', vip: 'P' },
  { id: 1, username: '16', email: 'Sulfur', phone: '32.065', vip: 'S' },
  { id: 1, username: '17', email: 'Chlorine', phone: '35.453', vip: 'Cl' },
  { id: 1, username: '18', email: 'Argon', phone: '39.948', vip: 'Ar' },
  { id: 1, username: '19', email: 'Potassium', phone: '39.0983', vip: 'K' },
  { id: 1, username: '20', email: 'Calcium', phone: '40.078', vip: 'Ca' },
];
