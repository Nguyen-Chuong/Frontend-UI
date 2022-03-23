import {Component, Input, OnInit} from '@angular/core';
import {TransactionInfo} from "../../../../../../_models/transaction-info";
import * as moment from "moment";

@Component({
  selector: 'app-transaction-vnpay',
  templateUrl: './transaction-vnpay.component.html',
  styleUrls: ['./transaction-vnpay.component.scss']
})
export class TransactionVnpayComponent implements OnInit {
  @Input() transactionInfo: TransactionInfo = new TransactionInfo()
  payDate
  constructor() {
    this.payDate = moment(this.transactionInfo.payDate).format()
  }

  ngOnInit(): void {
  }

}
