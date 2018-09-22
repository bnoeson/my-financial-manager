import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransactionDto } from '../../model/TransactionDto';
import { TransactionService } from '../../shared/transaction.service';

@Component({
  selector: 'mf-main-dashboard-page',
  templateUrl: './cashflow-chart-page.component.html',
  styleUrls: ['./cashflow-chart-page.component.scss']
})
export class CashflowChartPageComponent implements OnInit {

  transactionDtos: Array<TransactionDto>;
  categories: Object = {};

  constructor(private transactionService: TransactionService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.transactionService.getAll()
      .subscribe(data => {
        this.retrieveCategories(data);
        this.transactionDtos = data;
      },
      // handle the error, otherwise will break the Observable
      error => console.log(error)
    );
  }

  retrieveCategories(data: Array<TransactionDto>): void {
    const that = this;
    data.forEach(transaction => {
      that.categories[transaction.category] = true;
    });
  }

  /**
   * Set the changes on categories to be detectable by other components by creating another object.
   */
  setChangeDetectable() {
    this.categories = JSON.parse(JSON.stringify(this.categories));
  }

}
