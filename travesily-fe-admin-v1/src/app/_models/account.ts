import { Vip } from "./vip";

export class Account {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  type: number;
  avatar: string;
  spend: number;
  vip: Vip;
  password: string;
}
