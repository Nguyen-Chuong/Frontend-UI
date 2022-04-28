import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../_services/cart.service";
import {Cart} from "../../../_models/cart";
import {Account} from "../../../_models/account";
import {StorageService} from "../../../_services/storage.service";
import {AuthService} from "../../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navItems = [{id: 'hotelAndHome', name: 'Hotel & Home'}];
  account: Account
  carts: Cart[]

  constructor(private cartService: CartService,
              private storage: StorageService,
              private authService: AuthService,
              private router: Router) {
    if (this.storage.authToken)
      this.authService.getProfile()
        .subscribe(account => {
          this.account = account['data']
          this.cartService.getCarts().subscribe({
            next: value => {
              this.carts = value
            }
          })
        })

  }

  ngOnInit(): void {
  }

  contact() {
    this.router.navigate(['/feedback'])
  }

  redirectProvider() {
    window.location.href = 'https://provider.travesily.software';
  }
}
