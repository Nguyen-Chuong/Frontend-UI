import { FacilityType } from './facility-type';
import { BenefitType } from './benefit-type';

export class RoomDetail {
  id: number;
  name: string;
  price: number;
  numberOfPeople: number;
  quantity: number;
  availableRooms: number;
  dealPercentage: number;
  dealExpire: number;
  listImage: { id: number; src: string }[];
  listFacility: FacilityType[];
  listRoomBenefit: BenefitType[];
}
