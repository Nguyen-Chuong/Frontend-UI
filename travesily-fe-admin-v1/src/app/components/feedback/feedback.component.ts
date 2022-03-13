import { Feedback } from './../../_models/feedback';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { FeedbackService } from 'src/app/_services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedbacks: Feedback[]
  currentPage: number
  pageSize: number
  pages: any[]
  total: number
  maxpage: number

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.currentPage = param['page']
      this.pageSize = param['size']
    })

    this.feedbackService.getAllFeedback().pipe(first()).subscribe(
      rs => {
        this.total = rs['data']['total']

        if (this.total % this.pageSize == 0) {
          this.maxpage = this.total / this.pageSize
        } else {
          this.maxpage = this.total / this.pageSize + 1
        }
        this.pages = Array.from({ length: this.maxpage }, (_, i) => i + 1)
      }
    )
    this.feedbackService.getFeedback(this.currentPage, this.pageSize).pipe(first()).subscribe(
      rs => {
        this.feedbacks = rs['data']['items']
      }
    )
  }
  openPage(page) {
    this.router.navigate(['feedback'], {
      queryParams: { page: JSON.stringify(page - 1), size: JSON.stringify(Number(this.pageSize)) }
    });
  }

}
