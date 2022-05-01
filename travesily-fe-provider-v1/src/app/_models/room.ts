import { BenefitType } from "./benefitType"
import { FacilityType } from "./facilityType"

export class Room {
  id: number
  dealExpire: Date
  status: number
  hotelId: number
  availableRooms: number
  name: string
  numberOfPeople: number
  price: number
  quantity: number
  dealPercentage: number
  listImage: { id: number; src: string }[];
  listFacility: FacilityType[];
  listBenefit: BenefitType[];
}
