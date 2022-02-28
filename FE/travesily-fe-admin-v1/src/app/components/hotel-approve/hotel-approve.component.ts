import { Router } from '@angular/router';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-hotel-approve',
  templateUrl: './hotel-approve.component.html',
  styleUrls: ['./hotel-approve.component.scss']
})
export class HotelApproveComponent implements AfterViewInit {


  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  displayedColumns: string[] = ['position', 'hotelName', 'provider', 'address'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openHotelDetail(): void {
    this.router.navigate(['/hotel-detail']);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
 provider: string;
  address: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', provider: '1.0079',  address: 'H' },
  { position: 2, name: 'Helium', provider: '4.0026',  address: 'He' },
  { position: 3, name: 'Lithium', provider: '6.941',  address: 'Li' },
  { position: 4, name: 'Beryllium', provider: '9.0122',  address: 'Be' },
  { position: 5, name: 'Boron', provider: '10.811',  address: 'B' },
  { position: 6, name: 'Carbon', provider: '12.0107',  address: 'C' },
  { position: 7, name: 'Nitrogen', provider: '14.0067',  address: 'N' },
  { position: 8, name: 'Oxygen', provider: '15.9994',  address: 'O' },
  { position: 9, name: 'Fluorine', provider: '18.9984',  address: 'F' },
  { position: 10, name: 'Neon', provider: '20.1797',  address: 'Ne' },
  { position: 11, name: 'Sodium', provider: '22.9897',  address: 'Na' },
  { position: 12, name: 'Magnesium', provider: '24.305',  address: 'Mg' },
  { position: 13, name: 'Aluminum', provider: '26.9815',  address: 'Al' },
  { position: 14, name: 'Silicon', provider: '28.0855',  address: 'Si' },
  { position: 15, name: 'Phosphorus', provider: '30.9738',  address: 'P' },
  { position: 16, name: 'Sulfur', provider: '32.065',  address: 'S' },
  { position: 17, name: 'Chlorine', provider: '35.453',  address: 'Cl' },
  { position: 18, name: 'Argon', provider: '39.948',  address: 'Ar' },
  { position: 19, name: 'Potassium', provider: '39.0983',  address: 'K' },
  { position: 20, name: 'Calcium', provider: '40.078',  address: 'Ca' },
];
