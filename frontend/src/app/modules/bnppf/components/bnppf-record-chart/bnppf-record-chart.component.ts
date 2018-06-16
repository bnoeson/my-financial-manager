import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js';
import {BnppfService} from "../../bnppf.service";
import {BnppfRecordDto} from "../../model/BnppfRecordDto";
import {MatDialog} from "@angular/material";
import {BnppfRecordDialogComponent} from "../bnppf-record-dialog/bnppf-record-dialog.component";
import {AppComponent} from "../../../../app.component";

@Component({
  selector: 'bnppf-record-chart',
  templateUrl: './bnppf-record-chart.component.html',
  styleUrls: ['./bnppf-record-chart.component.css']
})
export class BnppfRecordChartComponent implements AfterViewInit {

  // use that DATE-RANGE-PICKER (https://github.com/fetrarij/ngx-daterangepicker-material), waiting for this functionality in angular material
  // see issue : https://github.com/fetrarij/ngx-daterangepicker-material
  private selectedPeriod: SelectedPeriod;
  private dateRanges: any = {
    'Today': [new Date(), new Date()],
    'This week': [new Date().setDate(new Date().getDate()-6), new Date()],
    'This month': [new Date().setDate(new Date().getDate()-29), new Date()],
    'This quarter': [new Date().setDate(new Date().getDate()-89), new Date()],
    'This year': [new Date().setDate(new Date().getDate()-364), new Date()],
    'All the time': [new Date().setDate(-36500), new Date()] // a century
  };

  private chart: Chart;
  private completeBalanceHistory: ChartData[];
  private currentBalanceHistory: ChartData[];

  constructor(private bnppfService : BnppfService, public dialog: MatDialog, public appComponent : AppComponent) { }

  ngAfterViewInit() {
    let self = this;
    this.bnppfService.getAllRecords().subscribe(
      data => {

        data = this.sortByExecutionDate(data);
        this.completeBalanceHistory = this.getCompleteBalanceHistory(data);
        this.currentBalanceHistory = this.completeBalanceHistory;

        let canvas = <HTMLCanvasElement> document.getElementById("bnppfRecordChart");
        let ctx = canvas.getContext("2d");

        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight - this.appComponent.getToolbarHeight() - document.getElementById("chartButtons").offsetHeight;

        this.chart = new Chart(ctx, {
          type: 'line',
          responsive: true,
          data: {
            datasets: [{
              steppedLine: true,
              label: 'Balance history',
              data: this.completeBalanceHistory,
              borderWidth: 1
            }]
          },
          options: {
            // SCALES - AXES
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }],
              xAxes: [{
                type: 'time'
              }]
            },
            // TOOLTIPS
            tooltips: {
              callbacks: {
                title: function(tooltipItem, data) {
                  return data['datasets'][0]['data'][tooltipItem[0]['index']].t;
                },
                label: function(tooltipItem, data) {
                  return data['datasets'][0]['data'][tooltipItem['index']].y;
                },
                afterBody: function(tooltipItem, data) {
                  return 'Change : '+data['datasets'][0]['data'][tooltipItem[0]['index']].amount;
                }
              }
            },
            // ONCLICK
            onClick: function(evt, element) {
              if(element.length > 0) {
                let ind = element[0]._index;
                self.openDialog(self.currentBalanceHistory[ind].record);
              }
            },
            // LAYOUT
            layout: {
              padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
              }
            }
          }
        });

      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );
  }

  getCompleteBalanceHistory(records:BnppfRecordDto[]){
    let balanceHistory: ChartData[] = [];

    let balance = 0;
    records.forEach(r => {
        balance += r.amount;
        balanceHistory.push(
          new ChartData(r.executionDate, balance, r.amount, r)
        )
      }
    );
    return balanceHistory;
  }

  private sortByExecutionDate(data){
    data.sort(function (a,b) {
      if (a.executionDate < b.executionDate)
        return -1;
      if (a.executionDate > b.executionDate)
        return 1;
      return 0;
    });
    return data;
  }

  openDialog(record : BnppfRecordDto): void {
    let dialogRef = this.dialog.open(BnppfRecordDialogComponent, {
      data: record
    });
  }

  updateChart(){
    if(this.selectedPeriod){
      this.currentBalanceHistory = this.filterBalanceHistoryForPeriod(this.selectedPeriod);

      this.chart.data.datasets[0].data = this.currentBalanceHistory;
      this.chart.update();
    }
    else{
      this.chart.data.datasets[0].data = this.completeBalanceHistory;
      this.chart.update();
    }
  }

  filterBalanceHistoryForPeriod(period : SelectedPeriod){
    return this.completeBalanceHistory.filter(function( b ) {
      return b.t.getTime() >= new Date(period.startDate).getTime() && b.t.getTime() <= new Date(period.endDate).getTime();
    });
  }

}

class SelectedPeriod {
  startDate: Date;
  endDate: Date;
}

class ChartData {
  t: Date;
  y: string;
  amount: string;
  record: BnppfRecordDto;

  constructor(t: Date, y: number, amount: number, record: BnppfRecordDto){
    this.t = t;
    this.y = y.toFixed(2);
    this.amount = amount.toFixed(2);
    this.record = record;
  }

}
