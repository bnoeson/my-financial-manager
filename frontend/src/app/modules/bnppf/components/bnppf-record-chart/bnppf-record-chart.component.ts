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

        let chartDataExample = [{
          t: Date.parse("1987/03/29"),
          y: 1
        }, {
          t: Date.parse("1987/03/30"),
          y: 10
        }, {
          t: Date.parse("1987/04/04"),
          y: 20
        }];
        console.log(chartDataExample);

        let canvas = <HTMLCanvasElement> document.getElementById("bnppfRecordChart");
        let ctx = canvas.getContext("2d");
        let chart = new Chart(ctx, {
          type: 'line',
          data: {
            datasets: [{
              label: '# of Votes',
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
    // TODO sort by date, calculate cumulative amount
    let balanceHistory = 0;
    data.forEach(d => {
        balanceHistory += d.amount;
        chartData.push(
          {
            t: Date.parse(d.executionDate),
            y: balanceHistory
          }
        );
      }
    );
    console.log(chartData);
    return chartData;
  }

}
