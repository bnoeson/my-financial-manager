import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BnppfService {

  private static API_ADDRESS: string = "//localhost:8080/";
  private static BNPPF_RECORDS_API: string = BnppfService.API_ADDRESS + "bnppf-records";

  constructor(private http: HttpClient) { }

  getAllRecords(): Observable<any> {
    return this.http.get(BnppfService.BNPPF_RECORDS_API);
  }

  getRecord(id: string) {
    return this.http.get(BnppfService.BNPPF_RECORDS_API + '/' + id);
  }

}
