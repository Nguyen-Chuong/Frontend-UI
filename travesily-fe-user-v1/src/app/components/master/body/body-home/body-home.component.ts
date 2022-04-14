import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CouponDialogComponent } from 'src/app/shared/components/coupon-dialog/coupon-dialog.component';

@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.scss']
})
export class BodyHomeComponent implements OnInit {
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dialog.open(CouponDialogComponent);
  }
}
