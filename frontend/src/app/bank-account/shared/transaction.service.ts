import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { TransactionDto, TransactionDtoBuilder } from '../model/TransactionDto';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private _http: HttpClient) {}

  getAll(): Observable< Array<TransactionDto> > {
    return this._http.get<Array<TransactionDto>>(ApiUrls.TRANSACTIONS_API)
      .pipe(
        map((response: Array<any>) =>
          response.map((resp) => {
            return new TransactionDtoBuilder()
              .withId(resp.id)
              .withSequenceNumber(resp.sequenceNumber)
              .withExecutionDate(new Date(resp.executionDate))
              .withValueDate(new Date(resp.valueDate))
              .withAmount(resp.amount)
              .withCurrency(<CurrencyEnum> resp.currency)
              .withCounterparty(resp.counterparty)
              .withDetails(resp.details)
              .withAccountNumber(resp.accountNumber)
              .withIsInternal(resp.internal)
              .build();
          })
        )
      );
  }

  getTransaction(id: string) {
    return this._http.get(`${ApiUrls.TRANSACTIONS_API}/${id}`);
  }

  sortByExecutionDate(data: Array<TransactionDto>) {
    return data.sort(function (a, b) {
      if (a.executionDate < b.executionDate) {
        return -1;
      }
      if (a.executionDate > b.executionDate) {
        return 1;
      }
      return 0;
    });
  }

}
