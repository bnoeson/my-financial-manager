import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {BnppfService} from "./modules/bnppf/bnppf.service";
import {BnppfRecordDto} from "./modules/bnppf/model/BnppfRecordDto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'app';
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
