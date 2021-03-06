import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TransactionDto} from '../../model/TransactionDto';

@Component({
  selector: 'mf-transaction-dialog',
  templateUrl: 'transaction-dialog.html',
})
export class TransactionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public transactionDtos: Array<TransactionDto>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
