import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PaymentDto} from "../_models/payment-dto";
import {TransactionDto} from "../_models/transaction-dto";
import {TransactionInfo} from "../_models/transaction-info";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  //Create payment
  createPayment(paymentDto: PaymentDto) {
    return this.http.post(`${this.baseUrl}/create-payment`, {...paymentDto})
  }

  //Get transaction information
  getTransactionInfo(transaction: TransactionInfo) {
    const params = new HttpParams()
      .append('vnp_Amount', transaction.amount)
      .append('vnp_BankCode', transaction.bankCode)
      .append('vnp_BankTranNo', transaction.bankTranNo)
      .append('vnp_CardType', transaction.cardType)
      .append('vnp_OrderInfo', transaction.orderInfo)
      .append('vnp_PayDate', transaction.payDate)
      .append('vnp_ResponseCode', transaction.responseCode)
      .append('vnp_TransactionNo', transaction.transactionNo)
      .append('vnp_TxnRef', transaction.idService)

    return this.http.get(`${this.baseUrl}/get-transaction-info`, {params: params})
  }
}
