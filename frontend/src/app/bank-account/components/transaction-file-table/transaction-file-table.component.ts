import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {TransactionFileDto} from '../../model/TransactionFileDto';

@Component({
  selector: 'mf-transaction-file-table',
  templateUrl: './transaction-file-table.component.html',
  styleUrls: ['./transaction-file-table.component.scss']
})
export class TransactionFileTableComponent implements OnInit {

  @Input() files: Array<TransactionFileDto>;
  @Input() file: TransactionFileDto;
  private columnsToDisplay = [];
  private dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  @Output() batchStarted = new EventEmitter<number>();

  constructor() {
    this.columnsToDisplay = ['uploadDateTime', 'name', 'size', 'status', 'startBatch'];
  }

  ngOnInit() {
    if (this.files) {
      this.dataSource = new MatTableDataSource(this.files);
      this.dataSource.sort = this.sort;
    } else if (this.file) {
      this.files = new Array<TransactionFileDto>(this.file);
      this.dataSource = new MatTableDataSource(this.files);
    }
  }

  startBatch(transactionFileId: number) {
    this.batchStarted.emit(transactionFileId);
  }

  isStartBatchButtonVisible(file: TransactionFileDto) {
    return file.status === TransactionFileProcessingStatus.PROCESS_FAILED ||
      file.status === TransactionFileProcessingStatus.READY_TO_PROCESS;
  }

}
