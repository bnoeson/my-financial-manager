import { Injectable } from '@angular/core';
import { TransactionFileDto, TransactionFileDtoBuilder } from "./model/TransactionFileDto";
import { map } from "rxjs/internal/operators";
import { Observable } from "rxjs/index";
import { TransactionDto } from "./model/TransactionDto";
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionFileService {

  constructor(private _http: HttpClient) { }

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

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', ApiUrls.TRANSACTIONS_FILES_API, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this._http.request(req);
  }

  startBatch(transactionFileId : number) {
    return this._http.post(
      ApiUrls.TRANSACTIONS_FILES_START_BATCH, transactionFileId, { responseType: 'text' });
  }

}
