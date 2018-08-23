import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/internal/operators";
import {TransactionDto, TransactionDtoBuilder} from "./model/TransactionDto";
import {TransactionFileDto, TransactionFileDtoBuilder} from "./model/TransactionFileDto";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private static readonly API_PORT : string = "8080";
  private static readonly TRANSACTIONS_API : string = "/transactions";
  private static readonly TRANSACTIONS_FILES_API : string = "/transactions/files";
  private static readonly TRANSACTIONS_FILES_START_BATCH : string = "/transactions/files/import";

  private readonly hostname : string;
  private readonly apiUrl : string;

  constructor(private _http: HttpClient) {

    this.hostname = location.host;
    if (this.hostname.indexOf(':') > 0) {
      this.hostname = this.hostname.substr(0, this.hostname.indexOf(':') + 1);
    }
    this.apiUrl = "http://" + this.hostname + TransactionService.API_PORT;

  }

  getAll(): Observable<TransactionDto[]> {
    return this._http.get<TransactionDto[]>(this.apiUrl + TransactionService.TRANSACTIONS_API)
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
    return this._http.get(this.apiUrl + TransactionService.TRANSACTIONS_API + '/' + id);
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.apiUrl + TransactionService.TRANSACTIONS_FILES_API, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this._http.request(req);
  }

  getAllTransactionFiles(): Observable<TransactionFileDto[]> {
    return this._http.get<TransactionDto[]>(this.apiUrl + TransactionService.TRANSACTIONS_FILES_API)
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
      this.apiUrl + TransactionService.TRANSACTIONS_FILES_START_BATCH, transactionFileId, { responseType: 'text' });
  }

}
