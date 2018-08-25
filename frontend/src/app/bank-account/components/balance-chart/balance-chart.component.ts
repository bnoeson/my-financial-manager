import {AfterViewInit, Component, Input} from '@angular/core';
import { Chart } from 'chart.js';
import { TransactionDto } from '../../model/TransactionDto';
import { MatDialog } from '@angular/material';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'mf-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrls: ['./balance-chart.component.css']
})
export class BalanceChartComponent implements AfterViewInit {

  @Input() transactionDtos: Array<TransactionDto>;

  // use that DATE-RANGE-PICKER (https://github.com/fetrarij/ngx-daterangepicker-material),
  // waiting for this functionality in angular material
  // see issue : https://github.com/fetrarij/ngx-daterangepicker-material
  private selectedPeriod: SelectedPeriod;
  private dateRanges: any = {
    'Today': [new Date(), new Date()],
    'This week': [new Date().setDate(new Date().getDate() - 6), new Date()],
    'This month': [new Date().setDate(new Date().getDate() - 29), new Date()],
    'This quarter': [new Date().setDate(new Date().getDate() - 89), new Date()],
    'This year': [new Date().setDate(new Date().getDate() - 364), new Date()],
    'All the time': [new Date().setDate(-36500), new Date()] // a century
  };

  private chart: Chart;
  private completeBalanceHistory: Array<BalanceChartData>;
  private currentBalanceHistory: Array<BalanceChartData>;

  constructor(public dialog: MatDialog, public appComponent: AppComponent) { }

  ngAfterViewInit() {
    const self = this;

    this.completeBalanceHistory = this.getCompleteBalanceHistory(this.transactionDtos);
    this.currentBalanceHistory = this.completeBalanceHistory;

    const canvas = <HTMLCanvasElement> document.getElementById('balanceChart');
    const ctx = canvas.getContext('2d');

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight - this.getToolbarHeight() - document.getElementById('chartButtons').offsetHeight;

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
              beginAtZero: true
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
              return 'Change : ' + data['datasets'][0]['data'][tooltipItem[0]['index']].amount;
            }
          }
        },
        // ONCLICK
        onClick: function(evt, element) {
          if (element.length > 0) {
            const ind = element[0]._index;
            self.openDialog(self.currentBalanceHistory[ind].transaction);
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
  }

  // TODO à déplacer
  private getToolbarHeight(): number {
    return document.getElementsByClassName('mat-toolbar')[0].clientHeight;
  }

  private getCompleteBalanceHistory(transactionDtos: Array<TransactionDto>): Array<BalanceChartData> {
    const balanceHistory: Array<BalanceChartData> = [];
    let balance = 0;
    this.sortByExecutionDate(transactionDtos).forEach(r => {
        balance += r.amount;
        balanceHistory.push(new BalanceChartData(r.executionDate, balance, r.amount, r));
      }
    );
    return balanceHistory;
  }

  private sortByExecutionDate(data: Array<TransactionDto>) {
    data.sort(function (a, b) {
      if (a.executionDate < b.executionDate) {
        return -1;
      }
      if (a.executionDate > b.executionDate) {
        return 1;
      }
      return 0;
    });
    return data;
  }

  openDialog(transactionDto: TransactionDto): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      data: transactionDto
    });
  }

  updateChart() {
    if (this.selectedPeriod) {
      this.currentBalanceHistory = this.filterBalanceHistoryForPeriod(this.selectedPeriod);

      this.chart.data.datasets[0].data = this.currentBalanceHistory;
      this.chart.update();
    } else {
      this.chart.data.datasets[0].data = this.completeBalanceHistory;
      this.chart.update();
    }
  }

  filterBalanceHistoryForPeriod(period: SelectedPeriod) {
    return this.completeBalanceHistory.filter(function( b ) {
      return b.t.getTime() >= new Date(period.startDate).getTime() && b.t.getTime() <= new Date(period.endDate).getTime();
    });
  }

}

interface SelectedPeriod {
  startDate: Date;
  endDate: Date;
}

class BalanceChartData {
  t: Date;
  y: string;
  amount: string;
  transaction: TransactionDto;

  constructor(t: Date, y: number, amount: number, transaction: TransactionDto) {
    this.t = t;
    this.y = y.toFixed(2);
    this.amount = amount.toFixed(2);
    this.transaction = transaction;
  }

}
