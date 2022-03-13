import { Image } from "./image";
export class Room {
  id: number
  name: string
  price: number
  numberOfPeople: number
  quantity: number
  availableRooms: number
  dealPercentage: number
  dealExpire: Date
  listImage: Image[]
}
