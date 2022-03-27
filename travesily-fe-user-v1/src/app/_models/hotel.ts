import { District } from './district';
import {RatingAverage} from "./rating-average";
import {Review} from "./review";

export class Hotel {
  id: number;
  name: string;
  address: string;
  avatar: string;
  description: string;
  price: number;
  salePercent: number;
  status: number;
  phone: string;
  email: string;
  taxPercentage: number;
  star: number
  district: District;
  rating: RatingAverage
  review: Review
}
