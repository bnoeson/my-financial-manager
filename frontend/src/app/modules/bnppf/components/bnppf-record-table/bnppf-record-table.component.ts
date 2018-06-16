import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {BnppfRecordDto} from "../../model/BnppfRecordDto";

@Component({
  selector: 'bnppf-record-table',
  templateUrl: './bnppf-record-table.component.html',
  styleUrls: ['./bnppf-record-table.component.css']
})
export class BnppfRecordTableComponent implements OnInit {

  @Input() records: Array<BnppfRecordDto>;
  @Input() record: BnppfRecordDto;
  private columnsToDisplay = [];
  private dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.columnsToDisplay = ['executionDate', 'amount', 'counterparty', 'details', 'accountNumber'];
  }

  ngOnInit() {
    if(this.records){
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.sort = this.sort;
    }
    else if(this.record){
      this.records = new Array<BnppfRecordDto>(this.record);
      this.dataSource = new MatTableDataSource(this.records);
    }
  }

}
