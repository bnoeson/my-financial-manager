import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import {map} from "rxjs/internal/operators";
import {BnppfRecordDto, BnppfRecordDtoBuilder} from "./model/BnppfRecordDto";
import {BnppfRecordFileDto, BnppfRecordFileDtoBuilder} from "./model/BnppfRecordFileDto";

@Injectable({
  providedIn: 'root'
})
export class BnppfService {

  private static readonly API_PORT : string = "8080";
  private static readonly BNPPF_RECORDS_API : string = "/bnppf-records";
  private static readonly BNPPF_RECORDS_FILES_API : string = "/bnppf-records/files";
  private static readonly BNPPF_RECORDS_FILES_START_BATCH : string = "/bnppf-records/files/import";

  private readonly hostname : string;
  private readonly apiUrl : string;

  constructor(private _http: HttpClient) {

    this.hostname = location.host;
    if (this.hostname.indexOf(':') > 0) {
      this.hostname = this.hostname.substr(0, this.hostname.indexOf(':') + 1);
    }
    this.apiUrl = "http://" + this.hostname + BnppfService.API_PORT;

  }

  getAllRecords(): Observable<BnppfRecordDto[]> {
    return this._http.get<BnppfRecordDto[]>(this.apiUrl + BnppfService.BNPPF_RECORDS_API)
      .pipe(
        map((response: any[]) => response.map((record) => {
          return new BnppfRecordDtoBuilder()
            .withId(record.id)
            .withSequenceNumber(record.sequenceNumber)
            .withExecutionDate(new Date(record.executionDate))
            .withValueDate(new Date(record.valueDate))
            .withAmount(record.amount)
            .withCurrency(<CurrencyEnum> record.currency)
            .withCounterparty(record.counterparty)
            .withDetails(record.details)
            .withAccountNumber(record.accountNumber)
            .build();
        }))
      );
  }

  getRecord(id: string) {
    return this._http.get(this.apiUrl + BnppfService.BNPPF_RECORDS_API + '/' + id);
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.apiUrl + BnppfService.BNPPF_RECORDS_FILES_API, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this._http.request(req);
  }

  getAllRecordFiles(): Observable<BnppfRecordFileDto[]> {
    return this._http.get<BnppfRecordDto[]>(this.apiUrl + BnppfService.BNPPF_RECORDS_FILES_API)
      .pipe(
        map((response: any[]) => response.map((file) => {
          return new BnppfRecordFileDtoBuilder()
            .withId(file.id)
            .withName(file.name)
            .withSize(file.size)
            .withUploadDateTime(file.uploadDateTime)
            .withStatus(<BnppfRecordFileStatus> file.status)
            .build();
        }))
      );
  }

  startBatch(recordFileId : number) {
    return this._http.post(
      this.apiUrl + BnppfService.BNPPF_RECORDS_FILES_START_BATCH, recordFileId, { responseType: 'text' });
  }

}
