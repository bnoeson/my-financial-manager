import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/internal/operators";
import { TransactionDto, TransactionDtoBuilder } from "./model/TransactionDto";
import { TransactionFileDto, TransactionFileDtoBuilder } from "./model/TransactionFileDto";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private _http: HttpClient) {}

  getAll(): Observable<TransactionDto[]> {
    return this._http.get<TransactionDto[]>(ApiUrls.TRANSACTIONS_API)
      .pipe(
        map((response: any[]) =>
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
              .build();
          })
        )
      );
  }

  getTransaction(id: string) {
    return this._http.get(ApiUrls.TRANSACTIONS_API + '/' + id);
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', ApiUrls.TRANSACTIONS_FILES_API, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this._http.request(req);
  }

  getAllTransactionFiles(): Observable<TransactionFileDto[]> {
    return this._http.get<TransactionDto[]>(ApiUrls.TRANSACTIONS_FILES_API)
      .pipe(
        map((response: any[]) => response.map((resp) => {
          return new TransactionFileDtoBuilder()
            .withId(resp.id)
            .withName(resp.name)
            .withSize(resp.size)
            .withUploadDateTime(resp.uploadDateTime)
            .withStatus(<TransactionFileProcessingStatus> resp.status)
            .build();
        }))
      );
  }

  startBatch(transactionFileId : number) {
    return this._http.post(
      ApiUrls.TRANSACTIONS_FILES_START_BATCH, transactionFileId, { responseType: 'text' });
  }

}
