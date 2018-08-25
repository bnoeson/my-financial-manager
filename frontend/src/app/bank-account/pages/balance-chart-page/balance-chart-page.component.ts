import { Component, OnInit } from '@angular/core';
import {TransactionDto} from '../../model/TransactionDto';
import {TransactionService} from '../../shared/transaction.service';

@Component({
  selector: 'mf-balance-chart-page',
  templateUrl: './balance-chart-page.component.html',
  styleUrls: ['./balance-chart-page.component.scss']
})
export class BalanceChartPageComponent implements OnInit {
  transactionDtos: Array<TransactionDto>;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getAll().subscribe(data => {
        this.transactionDtos = data;
      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );
  }
}
