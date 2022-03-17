import { Provider } from 'src/app/_models/provider';
import { Hotel } from 'src/app/_models/hotel';
export class Request {
  id: string;
  requestDate: Date;
  status: number;
  hotel: Hotel;
  provider: Provider;
}
