import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {BnppfRecordFileDto} from "../../model/BnppfRecordFileDto";

@Component({
  selector: 'bnppf-record-file-table',
  templateUrl: './bnppf-record-file-table.component.html',
  styleUrls: ['./bnppf-record-file-table.component.css']
})
export class BnppfRecordFileTableComponent implements OnInit {

  @Input() files: Array<BnppfRecordFileDto>;
  @Input() file: BnppfRecordFileDto;
  private columnsToDisplay = [];
  private dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.columnsToDisplay = ['uploadDateTime', 'name', 'size', 'status'];
  }

  ngOnInit() {
    if(this.files){
      this.dataSource = new MatTableDataSource(this.files);
      this.dataSource.sort = this.sort;
    }
    else if(this.file){
      this.files = new Array<BnppfRecordFileDto>(this.file);
      this.dataSource = new MatTableDataSource(this.files);
    }
  }

}
