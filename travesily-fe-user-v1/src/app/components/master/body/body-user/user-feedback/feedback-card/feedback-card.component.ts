import {Component, Input, OnInit} from '@angular/core';
import {Feedback} from "../../../../../../_models/feedback";
import {Router} from "@angular/router";
import {CryptoService} from "../../../../../../_services/crypto.service";

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss']
})
export class FeedbackCardComponent implements OnInit {
  @Input() feedback: Feedback
  constructor(private router: Router,
              private cryptoService: CryptoService) { }

  ngOnInit(): void {
  }

  viewDetail() {
    this.router.navigate(['/user/feedback-detail'], {queryParams: {
      feedbackId: this.cryptoService.set('06052000',this.feedback.id)
      }})
  }
}
