import { Component, OnInit } from '@angular/core';
import {TransactionDto} from "../../model/TransactionDto";
import {TransactionService} from "../../transaction.service";

@Component({
  selector: 'balance-chart-page',
  templateUrl: './balance-chart.page.html',
  styleUrls: ['./balance-chart.page.css']
})
export class BalanceChartPage implements OnInit {
  transactionDtos: TransactionDto[];

  constructor(private transactionService: TransactionService){}

  ngOnInit(){
    this.transactionService.getAll().subscribe(data => {
        this.transactionDtos = data;
      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );
  }
}
