import {Component, Input, OnInit} from '@angular/core';
import {RoomType} from "../../../../../../_models/room-type";
import {RoomTypeService} from "../../../../../../_services/room-type.service";
import {RoomDetail} from "../../../../../../_models/room-detail";
import {CryptoService} from "../../../../../../_services/crypto.service";
import {CartService} from "../../../../../../_services/cart.service";
import {StorageService} from "../../../../../../_services/storage.service";
import {SearchFilter} from "../../../../../../_models/search-filter";
import {Router} from "@angular/router";
import {Cart} from "../../../../../../_models/cart";
import Swal from "sweetalert2";
import {Hotel} from "../../../../../../_models/hotel";

@Component({
  selector: 'app-room-type-card',
  templateUrl: './room-type-card.component.html',
  styleUrls: ['./room-type-card.component.scss']
})
export class RoomTypeCardComponent implements OnInit {
  @Input() roomType: RoomType = new RoomType()
  @Input() hotel: Hotel = new Hotel()
  roomDetail: RoomDetail = new RoomDetail()
  iconMale = 'fa fa-male'
  filter: SearchFilter = new SearchFilter()
  modal = ''
  carts: Cart[] = []
  roomTypeBenefits: string = ''

  constructor(private roomTypeService: RoomTypeService, private cryptoService: CryptoService, private cartService: CartService, private storageService: StorageService, private router: Router) {
    this.modal = `#room-type-image-modal-${this.roomType?.id}`
    this.filter = this.storageService.searchFilter
    this.roomDetail.listImage = []
    if (storageService.authToken)
      this.cartService.getCarts().subscribe({
        next: carts => {
          this.carts = carts
          if (this.carts.length > 0) {
            this.filter.roomNumber = 1
          }
        }
      })
  }

  ngOnInit(): void {
    this.roomTypeService.getRoomDetailByRoomTypeId(this.cryptoService.set('06052000', this.roomType.id)).subscribe(rs => {
      this.roomDetail = rs['data']
      this.roomDetail.listBenefit.forEach((benefits) => {
        benefits.benefits.forEach(benefit => {
          this.roomTypeBenefits+= `${benefit.name}, `
        })
      })
      this.roomTypeBenefits = this.roomTypeBenefits.slice(0, -2)
    })
  }

  addToCart() {
    if (!this.storageService.authToken)
      Swal.fire('Please login before booking!', '', 'error').then(() => {
        this.router.navigate(['/authentication/login'], {
          queryParams: {
            url: this.router.url
          }
        })
      })
    else
      this.cartService.addToCart(this.hotel?.id, this.roomType?.id, this.filter.roomNumber, this.filter.guestNumber, this.filter.from, this.filter.to).subscribe(rs => {
          this.cartService.updateCarts()
          Swal.fire('An item has been added to your cart!', '', 'success')
        },
        error => {
          Swal.fire(error['error']['error_message'], '', 'error')
        }
      )
  }

  bookNow() {
    if (!this.storageService.authToken)
      Swal.fire('Please login before booking!', '', 'error').then(() => {
        this.router.navigate(['/authentication/login'], {
          queryParams: {
            url: this.router.url
          }
        })
      })
    else
      this.cartService.clearCart().subscribe({
        next: () => {
          this.cartService.addToCart(this.hotel?.id, this.roomType.id, this.filter.roomNumber, this.filter.guestNumber, this.filter.from, this.filter.to).subscribe({
            next: () => {
              this.cartService.updateCarts()
              this.router.navigateByUrl('/book/booking-info')
            },
            error: () => Swal.fire('You can not add more than 2 item!', '', 'error')
          })
        }
      })
  }
}
