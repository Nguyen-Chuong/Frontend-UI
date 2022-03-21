import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PaymentDto} from "../_models/payment-dto";
import {TransactionDto} from "../_models/transaction-dto";

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
  getTransactionInfo(transactionDto: TransactionDto) {
    const params = new HttpParams()
      .append('vnp_Amount', transactionDto.vnp_Amount)
      .append('vnp_BankCode', transactionDto.vnp_BankCode)
      .append('vnp_BankTranNo', transactionDto.vnp_BankTranNo)
      .append('vnp_CardType', transactionDto.vnp_CardType)
      .append('vnp_OrderInfo', transactionDto.vnp_OrderInfo)
      .append('vnp_PayDate', transactionDto.vnp_PayDate)
      .append('vnp_ResponseCode', transactionDto.vnp_ResponseCode)
      .append('vnp_TransactionNo', transactionDto.vnp_TransactionNo)
      .append('vnp_TxnRef', transactionDto.vnp_TxnRef)

    return this.http.get(`${this.baseUrl}/get-transaction-info`, {params: params})
  }
}
