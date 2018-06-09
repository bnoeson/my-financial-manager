import {Component, OnInit} from '@angular/core';
import {BnppfService} from "../../bnppf.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {BnppfRecordFileDto} from "../../model/BnppfRecordFileDto";

@Component({
  selector: 'bnppf-import',
  templateUrl: './bnppf-import.component.html',
  styleUrls: ['./bnppf-import.component.css']
})
export class BnppfImportComponent implements OnInit {

  private selectedFiles: FileList;
  private currentFileUpload: File;
  private progress: { percentage: number } = { percentage: 0 };
  private allRecordFiles: BnppfRecordFileDto[];

  constructor(private bnppfService: BnppfService) { }

  ngOnInit() {
    this.updateRecordFilesData();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.bnppfService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        this.updateRecordFilesData()
      }
    });

    this.selectedFiles = undefined;
  }

  updateRecordFilesData () {
    this.allRecordFiles = null;
    this.bnppfService.getAllRecordFiles().subscribe(data => {
        this.allRecordFiles = data;
      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );
  }

}
