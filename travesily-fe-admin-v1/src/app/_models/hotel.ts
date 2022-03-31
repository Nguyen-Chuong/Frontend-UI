import { District } from './district';
import { Provider } from './provider';
export class Hotel {
  id: number;
  name: string;
  address: string;
  avatar: string;
  description: string;
  lowestPrice: number;
  status: number;
  district: District;
  provider: Provider;
  email: string;
  phone: string;
  star: number
}
