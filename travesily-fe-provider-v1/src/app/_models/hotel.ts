import { District } from "./district"

export class Hotel {
  id: number
  address: string
  email: string
  avatar: string
  phone: string
  name: string
  description: string
  status: number
  price: number
  district: District
  star: number
  taxPercentage: number
}
