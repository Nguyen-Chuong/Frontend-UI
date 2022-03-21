import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../../../../../_services/payment.service";
import {ActivatedRoute} from "@angular/router";
import {TransactionDto} from "../../../../../_models/transaction-dto";

@Component({
  selector: 'app-booking-transaction-information',
  templateUrl: './booking-transaction-information.component.html',
  styleUrls: ['./booking-transaction-information.component.scss']
})
export class BookingTransactionInformationComponent implements OnInit {

  constructor(private paymentService: PaymentService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe({
      next: value => {
        const transaction: TransactionDto = new TransactionDto()
        transaction.vnp_Amount = value['vnp_Amount']
        transaction.vnp_BankCode = value['vnp_BankCode']
        transaction.vnp_BankTranNo = value['vnp_BankTranNo']
        transaction.vnp_CardType = value['vnp_CardType']
        transaction.vnp_OrderInfo = value['vnp_OrderInfo']
        transaction.vnp_PayDate = value['vnp_PayDate']
        transaction.vnp_ResponseCode = value['vnp_ResponseCode']
        transaction.vnp_TransactionNo = value['vnp_TransactionNo']
        transaction.vnp_TxnRef = value['vnp_TxnRef']
        this.paymentService.getTransactionInfo(transaction).subscribe({
          next: tran => {
            console.log(tran)
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
