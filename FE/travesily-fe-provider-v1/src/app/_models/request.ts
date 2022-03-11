import { Account } from "./account"
import { Hotel } from "./hotel"

export class Request {
 id: number
 requestDate: Date
 status: number
 provider: Account
 hotel: Hotel
}
