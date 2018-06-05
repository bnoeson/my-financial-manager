import { Component, OnInit } from '@angular/core';
import {BnppfRecordDto} from "../../model/BnppfRecordDto";
import {BnppfService} from "../../bnppf.service";

@Component({
  selector: 'app-bnppf',
  templateUrl: './bnppf.component.html',
  styleUrls: ['./bnppf.component.css']
})
export class BnppfComponent implements OnInit {
  private allRecords: BnppfRecordDto[];

  constructor(private bnppfService: BnppfService){}

  ngOnInit(){
    this.bnppfService.getAllRecords().subscribe(data => {
        this.allRecords = data;
      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );
  }
}
