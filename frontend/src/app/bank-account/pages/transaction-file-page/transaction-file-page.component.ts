import {Component, OnInit} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {TransactionFileDto} from '../../model/TransactionFileDto';
import {TransactionFileService} from '../../shared/transaction-file.service';

@Component({
  selector: 'mf-transaction-file-page',
  templateUrl: './transaction-file-page.component.html',
  styleUrls: ['./transaction-file-page.component.css']
})
export class TransactionFilePageComponent implements OnInit {

  private selectedFiles: FileList;
  private currentFileUpload: File;
  private progress: { percentage: number } = { percentage: 0 };
  private allTransactionFiles: Array<TransactionFileDto>;

  constructor(private transactionFileService: TransactionFileService) { }

  ngOnInit() {
    this.updateTransactionFilesData();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.transactionFileService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        this.updateTransactionFilesData();
      }
    });

    this.selectedFiles = undefined;
  }

  updateTransactionFilesData () {
    this.allTransactionFiles = null;
    this.transactionFileService.getAllTransactionFiles().subscribe(data => {
        this.allTransactionFiles = data;
      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );
  }

  startBatch(transactionFileId: number) {
    this.transactionFileService.startBatch(transactionFileId).subscribe(
      data => {
        this.updateTransactionFilesData();
      },
      err => { console.log(err); }
    );
  }

}
