import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Moment } from 'moment';
import { TransactionDto } from '../../model/TransactionDto';
import * as echarts from 'echarts';
import { TransactionService } from '../../shared/transaction.service';
import * as moment from 'moment';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import ECharts = echarts.ECharts;

@Component({
  selector: 'mf-cashflow-chart',
  templateUrl: './cashflow-chart.component.html',
  styleUrls: ['./cashflow-chart.component.scss']
})
export class CashflowChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() transactionDtos: Array<TransactionDto>;
  @Input() timeframe: string;

  public cashflowHistory: Array<CashflowChartData>;
  public cashflowChart: ECharts;

  constructor(private transactionService: TransactionService, public dialog: MatDialog) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cashflowChart = echarts.init(<HTMLDivElement>document.getElementById('cashflow-chart'));

    const self = this;
    this.cashflowChart.on('click', function (params) {
      const element: CashflowChartData = self.cashflowHistory[params.dataIndex];
      self.openDialog(element.transactions);
    });

    this.build();
  }

  build() {
    this.cashflowChart.clear();
    this.cashflowHistory = this.createHistory();
    this.buildChart();
  }

  createHistory(): Array<CashflowChartData> {
    const sortedTransactionDtos: Array<TransactionDto> = this.transactionService.sortByExecutionDate(this.transactionDtos);

    let cashflowHistory: Array<CashflowChartData>;
    if (this.timeframe === 'week') {
      cashflowHistory = this.getWeeklyCashflowHistory(sortedTransactionDtos);
    } else if (this.timeframe === 'month') {
      cashflowHistory = this.getMonthlyCashflowHistory(sortedTransactionDtos);
    } else if (this.timeframe === 'year') {
      cashflowHistory = this.getYearlyCashflowHistory(sortedTransactionDtos);
    }
    return cashflowHistory;
  }

  private buildChart() {

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      xAxis: [
        {
          type: 'category',
          data: this.cashflowHistory.map(data => {
            return data.date;
          }),
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [{
        type: 'value'
      }],
      series: [
        {
          name: 'Income',
          type: 'bar',
          color: 'green',
          data: this.cashflowHistory.map(data => {
            return data.income;
          })
        },
        {
          name: 'Expense',
          type: 'bar',
          color: 'red',
          data: this.cashflowHistory.map(data => {
            return data.expense;
          })
        },
        {
          name: 'Net earnings',
          type: 'line',
          color: 'blue',
          data: this.cashflowHistory.map(data => {
            return data.netEarnings;
          })
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 85,
          end: 100
        },
        {
          type: 'inside',
          start: 85,
          end: 100
        }
      ]
    };

    this.cashflowChart.setOption(option);
  }

  openDialog(transactionDtos: Array<TransactionDto>): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      data: transactionDtos
    });
  }

  private getWeeklyCashflowHistory(sortedTransactionDtos: Array<TransactionDto>): Array<CashflowChartData> {
    return this.getCashflowHistoryForTimeframe(sortedTransactionDtos, 'week', 'DD-MM-YY');
  }
  private getMonthlyCashflowHistory(sortedTransactionDtos: Array<TransactionDto>): Array<CashflowChartData> {
    return this.getCashflowHistoryForTimeframe(sortedTransactionDtos, 'month', 'MM-YYYY');
  }
  private getYearlyCashflowHistory(sortedTransactionDtos: Array<TransactionDto>): Array<CashflowChartData> {
    return this.getCashflowHistoryForTimeframe(sortedTransactionDtos, 'year', 'YYYY');
  }

  private getCashflowHistoryForTimeframe(sortedTransactionDtos: Array<TransactionDto>,
                                         timeframe: any, timeformat: string): Array<CashflowChartData> {

    const cashflowHistory: Array<CashflowChartData> = [];
    let transactionIndex = 0;
    let income: number;
    let expense: number;
    let netEarnings: number;
    let transactions: Array<TransactionDto>;
    let startOfTimeframe: Moment = moment(sortedTransactionDtos[transactionIndex].executionDate).startOf(timeframe);

    while (startOfTimeframe.isSameOrBefore(moment().startOf(timeframe)) ) {
      income = 0;
      expense = 0;
      netEarnings = 0;
      transactions = [];

      for (let i = transactionIndex; i < sortedTransactionDtos.length; i++) {
        if (moment(sortedTransactionDtos[transactionIndex].executionDate).startOf(timeframe).isSame(startOfTimeframe)) {
          if (!sortedTransactionDtos[transactionIndex].isInternal) {
            const amount = sortedTransactionDtos[transactionIndex].amount;
            income += amount > 0 ? amount : 0;
            expense += amount < 0 ? amount : 0;
            netEarnings += amount;
            transactions.push(sortedTransactionDtos[transactionIndex]);
          }
          transactionIndex ++;
        } else {
          break;
        }
      }

      cashflowHistory.push(new CashflowChartData(
        startOfTimeframe.format(timeformat), income, expense, netEarnings, transactions
      ));

      startOfTimeframe = startOfTimeframe.add(1, timeframe);
    }

    return cashflowHistory;
  }

  ngOnChanges() {
    if (this.cashflowChart) {
      this.build();
    }
  }

}

class CashflowChartData {
  date: string;
  income: string;
  expense: string;
  netEarnings: string;
  transactions: Array<TransactionDto>;

  constructor(date: string, income: number, expense: number, netEarnings: number, transactions: Array<TransactionDto>) {
    this.date = date;
    this.income = income.toFixed(2);
    this.expense = expense.toFixed(2);
    this.netEarnings = netEarnings.toFixed(2);
    this.transactions = transactions;
  }
}
