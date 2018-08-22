import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../transaction.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {TransactionFileDto} from "../../model/TransactionFileDto";

@Component({
  selector: 'transaction-file-page',
  templateUrl: './transaction-file.page.html',
  styleUrls: ['./transaction-file.page.css']
})
export class TransactionFilePage implements OnInit {

  private selectedFiles: FileList;
  private currentFileUpload: File;
  private progress: { percentage: number } = { percentage: 0 };
  private allTransactionFiles: TransactionFileDto[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.updateTransactionFilesData();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.transactionService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        this.updateTransactionFilesData()
      }
    });

    this.selectedFiles = undefined;
  }

  updateTransactionFilesData () {
    this.allTransactionFiles = null;
    this.transactionService.getAllTransactionFiles().subscribe(data => {
        this.allTransactionFiles = data;
      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );
  }

  startBatch(transactionFileId : number){
    this.transactionService.startBatch(transactionFileId).subscribe(
      data => {
        this.updateTransactionFilesData();
      },
      err => { console.log(err) }
    );
  }

}
