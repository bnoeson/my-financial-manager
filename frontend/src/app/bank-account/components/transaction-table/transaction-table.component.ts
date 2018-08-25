import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {TransactionDto} from '../../model/TransactionDto';

@Component({
  selector: 'mf-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {

  @Input() transactionDtos: Array<TransactionDto>;
  @Input() transactionDto: TransactionDto;
  private columnsToDisplay = [];
  private dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.columnsToDisplay = ['executionDate', 'amount', 'counterparty', 'details', 'accountNumber'];
  }

  ngOnInit() {
    if (this.transactionDtos) {
      this.dataSource = new MatTableDataSource(this.transactionDtos);
      this.dataSource.sort = this.sort;
    } else if (this.transactionDto) {
      this.transactionDtos = new Array<TransactionDto>(this.transactionDto);
      this.dataSource = new MatTableDataSource(this.transactionDtos);
    }
  }

}
