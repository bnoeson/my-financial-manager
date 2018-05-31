import {Component, OnInit, ViewChild} from '@angular/core';
import {BnppfService} from "../../bnppf.service";
import {MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'bnppf-record-table',
  templateUrl: './bnppf-record-table.component.html',
  styleUrls: ['./bnppf-record-table.component.css']
})
export class BnppfRecordTableComponent implements OnInit {
  private records: Array<any>;
  private columnsToDisplay = [];
  private dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bnppfService: BnppfService) {
    this.columnsToDisplay = ['sequenceNumber', 'executionDate', 'valueDate', 'amount', 'currency',
      'counterparty', 'details', 'accountNumber'];
  }

  ngOnInit() {
    this.bnppfService.getAllRecords().subscribe(data => {
      this.records = data;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.sort = this.sort;
      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );
  }

}
