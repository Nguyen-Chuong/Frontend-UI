import {District} from "./district";

export class Hotel {
  id: number
  name: string
  address: string
  avatar: string
  description: string
  price: number
  salePercent: number
  status: number
  phone: string
  email: string
  district: District
}

