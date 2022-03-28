import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";
import {Cart} from "../_models/cart";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.API_URL;

  datePipe = new DatePipe('en-US')
  private cartsSubject: Subject<Cart[]> = new Subject<Cart[]>()

  constructor(private http: HttpClient) {
  }

  //Add to cart
  addToCart(hotelId: number, roomTypeId: number, quantity: number, bookedQuantity: number, dateIn: Date, dateOut: Date) {
    const dateInString = this.datePipe.transform(new Date(dateIn), 'yyyy-MM-dd');
    const dateOutString = this.datePipe.transform(new Date(dateOut), 'yyyy-MM-dd');
    const params = new HttpParams().append('hotelId', hotelId).append('roomTypeId', roomTypeId).append('quantity', quantity)
      .append('bookedQuantity', bookedQuantity).append('dateIn', dateInString).append('dateOut', dateOutString)
    return this.http.patch(`${this.baseUrl}/add-to-cart`, undefined, {params: params})
  }

  //Clear cart
  clearCart() {
    return this.http.patch(`${this.baseUrl}/clear-cart`, undefined)
  }

  //Get item cart
  getItemCart() {
    return this.http.get(`${this.baseUrl}/get-item-cart`)
  }

  updateCarts() {
    this.getItemCart().subscribe({
      next: value => {
        this.cartsSubject.next(value['data'])
      }
    })
  }

  getCarts() {
    this.updateCarts()
    return this.cartsSubject.asObservable()
  }

}
