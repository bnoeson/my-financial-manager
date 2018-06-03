import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BnppfRecordDto} from "../../model/BnppfRecordDto";

@Component({
  selector: 'bnppf-record-dialog',
  templateUrl: 'bnppf-record-dialog.html',
})
export class BnppfRecordDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BnppfRecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public record: BnppfRecordDto[]) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
