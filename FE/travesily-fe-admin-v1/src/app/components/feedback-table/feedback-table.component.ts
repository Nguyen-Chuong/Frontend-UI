import { Feedback } from './../../_models/feedback';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-feedback-table',
  templateUrl: './feedback-table.component.html',
  styleUrls: ['./feedback-table.component.scss']
})
export class FeedbackTableComponent implements OnInit {
  @Input() feedbacks : Feedback[]
  dataSource
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  displayedColumns: string[] = ['id', 'type', 'senderName', 'message', 'modifyDate'];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Feedback>(this.feedbacks);
  }

  openResponse(id): void {
    this.router.navigate(['response'], {
      queryParams: { id: JSON.stringify(id) }
    });
  }

}
