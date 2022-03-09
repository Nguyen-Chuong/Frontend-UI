import {Facility} from "./facility";
import {FacilityType} from "./facility-type";
import {Benefit} from "./benefit";
import {BenefitType} from "./benefit-type";

export class RoomDetail {
  id: number
  name: string
  price: number
  numberOfPeople: number
  quantity: number
  availableRooms: number
  dealPercentage: number
  dealExpire: Date
  listImage: {id: number, src: string}[]
  listFacility: Map<FacilityType, Facility[]>
  listRoomBenefit: Map<BenefitType, Benefit[]>
}
