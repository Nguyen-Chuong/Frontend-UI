import { Timestamp } from "@angular/fire/firestore";

export class FeedbackRequest {
  type: number;
  senderId: number;
  message: string;
  modifyDate: Timestamp
  isProcessed: number
}
