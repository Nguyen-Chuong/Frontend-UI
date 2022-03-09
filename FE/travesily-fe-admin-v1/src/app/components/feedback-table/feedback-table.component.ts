import { Feedback } from './../../_models/feedback';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CryptoService } from 'src/app/_services/crypto.service';

@Component({
  selector: 'app-feedback-table',
  templateUrl: './feedback-table.component.html',
  styleUrls: ['./feedback-table.component.scss']
})
export class FeedbackTableComponent implements OnInit {
  @Input() feedbacks : Feedback[]
  dataSource
  constructor(private router: Router,
    private route: ActivatedRoute,
    private cryptoService: CryptoService) { }

  displayedColumns: string[] = ['id', 'type', 'senderName', 'message', 'modifyDate'];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Feedback>(this.feedbacks);
  }

  openResponse(id): void {
    const encryptedId = this.cryptoService.set('06052000',id)
    this.router.navigate(['response'], {
      queryParams: { id: JSON.stringify(encryptedId) }
    });
  }

}
