import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js';
import {BnppfService} from "../../bnppf.service";

@Component({
  selector: 'bnppf-record-chart',
  templateUrl: './bnppf-record-chart.component.html',
  styleUrls: ['./bnppf-record-chart.component.css']
})
export class BnppfRecordChartComponent implements AfterViewInit {

  constructor(private bnppfService : BnppfService) { }

  ngAfterViewInit() {
    this.bnppfService.getAllRecords().subscribe(
      data => { // TODO add type

        let chartData = this.getBalanceHistory(data);

        let canvas = <HTMLCanvasElement> document.getElementById("bnppfRecordChart");
        let ctx = canvas.getContext("2d");
        let chart = new Chart(ctx, {
          type: 'line',
          data: {
            datasets: [{
              label: 'Balance history',
              data: chartData,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }],
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'day',
                  displayFormats: {
                    quarter: 'MMM YYYY'
                  }
                }
              }]
            },
            tooltips: {
              callbacks: {
                title: function(tooltipItem, data) {
                  return new Date(data['datasets'][0]['data'][tooltipItem[0]['index']].t).toDateString(); // TODO remove when dto
                },
                label: function(tooltipItem, data) {
                  return data['datasets'][0]['data'][tooltipItem['index']].y;
                },
                afterBody: function(tooltipItem, data) {
                  return 'Change : '+data['datasets'][0]['data'][tooltipItem[0]['index']].amount;
                }
              }
            }
          }
        });

      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );
  }

  getBalanceHistory(data){
    let chartData = [];

    data = this.sortByDate(data);

    let balanceHistory = 0;
    data.forEach(d => {
        balanceHistory += d.amount;
        chartData.push( // TODO DTO
          {
            t: d.executionDate,
            y: balanceHistory.toFixed(2),
            amount: d.amount.toFixed(2)
          }
        );
      }
    );
    return chartData;
  }

  private sortByDate(data){
    data.sort(function (a,b) {
      if (a.executionDate < b.executionDate)
        return -1;
      if (a.executionDate > b.executionDate)
        return 1;
      return 0;
    });
    return data;
  }

}
