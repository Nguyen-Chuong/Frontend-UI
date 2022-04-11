import { CryptoService } from 'src/app/_services/crypto.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Hotel } from 'src/app/_models/hotel';
import { HotelService } from 'src/app/_services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[]
  dataSource
  currentTask ="My Hotel"
  constructor(private hotelService: HotelService, private router: Router,
    private cryptoService: CryptoService
    ) { }

  displayedColumns: string[] = ['hotelName', 'address', 'status', 'update', 'detail'];

  ngOnInit(): void {
    if(!localStorage.getItem('token'))
      this.router.navigate(['/login'])
    this.hotelService.getAllHotel().pipe(first()).subscribe(
      rs => {
        this.hotels = rs['data']
      }
    )
    this.dataSource = new MatTableDataSource<Hotel>(this.hotels);
  }

  openHotelDetail(id) {
    const encryptedId = this.cryptoService.set('06052000',id)
    this.router.navigate(['hotel-detail'], {
      queryParams: { id: JSON.stringify(encryptedId)}
    });
  }

  updateHotel(id){
    const encryptedId = this.cryptoService.set('06052000',id)
    this.router.navigate(['update-hotel'], {
      queryParams: { id: JSON.stringify(encryptedId)}
    });
  }
}
