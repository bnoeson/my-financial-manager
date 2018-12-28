import {AfterViewInit, Component, Input} from '@angular/core';
import { Moment } from 'moment';
import { TransactionDto } from '../../model/TransactionDto';
import { MatDialog } from '@angular/material';
import { TransactionService } from '../../shared/transaction.service';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import * as moment from 'moment';

declare const echarts: any;

@Component({
  selector: 'mf-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrls: ['./balance-chart.component.scss']
})
export class BalanceChartComponent implements AfterViewInit {

  @Input() transactionDtos: Array<TransactionDto>;

  private balanceHistory: Array<BalanceChartData>;

  constructor(public dialog: MatDialog, private transactionService: TransactionService) { }

  ngAfterViewInit() {
    const self = this;

    this.balanceHistory = this.getBalanceHistory(this.transactionDtos);

    const balanceChart = echarts.init(<HTMLDivElement>document.getElementById('balance-chart'));

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          const element: BalanceChartData = self.balanceHistory[params[0].dataIndex];
          return `${params[0].axisValue}</br>Balance : ${params[0].value}</br>Change : ${element.amount}`;
        }
      },
      title: {
        left: 'center',
        text: 'Balance history',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.balanceHistory.map(data => {
          return moment(data.date).format('DD/MM/YYYY');
        })
      },
      yAxis: {
        type: 'value'
      },
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
      }, {
        start: 0,
        end: 100,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.' +
        '3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      series: [
        {
          name: 'Balance',
          type: 'line',
          smooth: true,
          sampling: 'average',
          itemStyle: {
            normal: {
              color: 'rgb(255, 70, 131)'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)'
              }, {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }])
            }
          },
          data: this.balanceHistory.map(data => {
            return data.balance;
          })
        }
      ]
    };

    balanceChart.setOption(option);

    balanceChart.on('click', function (params) {
      const element: BalanceChartData = self.balanceHistory[params.dataIndex];
      self.openDialog(element.transactions);
    });

  }

  private getBalanceHistory(transactionDtos: Array<TransactionDto>): Array<BalanceChartData> {
    const sortedTransactionDtos = this.transactionService.sortByExecutionDate(transactionDtos);

    const balanceHistory: Array<BalanceChartData> = [];
    let balance = 0;
    let dayAmount = 0;
    let dayTransactions: Array<TransactionDto> = [];
    let transactionIndex = 0;
    const firstDate = sortedTransactionDtos[transactionIndex] !== undefined ?
      sortedTransactionDtos[transactionIndex].executionDate : Date.now() ;
    let date: Moment = moment(firstDate).startOf('day');
    while (date.isSameOrBefore(moment().startOf('day')) ) {
      dayAmount = 0;
      dayTransactions = [];

      for (let i = transactionIndex; i < sortedTransactionDtos.length; i++) {
        if (moment(sortedTransactionDtos[transactionIndex].executionDate).startOf('day').isSame(date)) {
          dayAmount += sortedTransactionDtos[transactionIndex].amount;
          balance += sortedTransactionDtos[transactionIndex].amount;
          dayTransactions.push(sortedTransactionDtos[transactionIndex]);
          transactionIndex++;
        } else {
          break;
        }
      }

      balanceHistory.push(new BalanceChartData(date.toDate(), balance, dayAmount, dayTransactions));

      date = date.add(1, 'day');
    }
    return balanceHistory;
  }

  openDialog(transactionDtos: Array<TransactionDto>): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      data: transactionDtos
    });
  }

}

class BalanceChartData {
  date: Date;
  balance: string;
  amount: string;
  transactions: Array<TransactionDto>;

  constructor(date: Date, balance: number, amount: number, transactions: Array<TransactionDto>) {
    this.date = date;
    this.balance = this.getPrintableNumber(balance);
    this.amount = this.getPrintableNumber(amount);
    this.transactions = transactions;
  }

  getPrintableNumber(n: number): string {
    return (n > 0) ? '+' + n.toFixed(2) : n.toFixed(2);
  }

}
