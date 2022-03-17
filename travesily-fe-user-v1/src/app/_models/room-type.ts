export class RoomType {
  id: number;
  name: string;
  price: number;
  numberOfPeople: number;
  quantity: number;
  availableRooms: number;
  dealPercentage: number;
  dealExpire: Date;
  listImage: { id: number; src: string }[];
}
