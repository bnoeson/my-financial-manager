import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class BnppfService {

  private static API_ADDRESS: string = "//localhost:8080/";
  private static BNPPF_RECORDS_API: string = BnppfService.API_ADDRESS + "bnppf-records";

  private allRecordsObs : ReplaySubject<any> = new ReplaySubject(1);

  constructor(private _http: HttpClient) { }

  getAllRecords(forceRefresh?: boolean): Observable<any> {
    if (!this.allRecordsObs.observers.length || forceRefresh) {
      console.log('allRecords REST request');
      // If the Subject was NOT subscribed before OR if forceRefresh is requested
      this._http.get<any[]>(BnppfService.BNPPF_RECORDS_API)
        .pipe(
          map((response: any[]) => response.map((record) => {
            record.executionDate = Date.parse(record.executionDate);
            record.valueDate = Date.parse(record.valueDate);
            return record; // TODO créer un DTO
          }))
        )
        .subscribe(
        data => {
          this.allRecordsObs.next(data);
          },
        error => {
          this.allRecordsObs.error(error);
          this.allRecordsObs = new ReplaySubject(1);
        });
    }

    return this.allRecordsObs;
  }

  getRecord(id: string) {
    return this._http.get(BnppfService.BNPPF_RECORDS_API + '/' + id);
  }

}
