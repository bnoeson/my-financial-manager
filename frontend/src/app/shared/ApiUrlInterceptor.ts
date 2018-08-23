import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  private apiUrl: string;
  private static readonly API_PORT : string = "8080";

  constructor() {
    let hostname:string = location.host;

    if (hostname.indexOf(':') > 0) {
      hostname = hostname.substr(0, hostname.indexOf(':') + 1);
    }
    this.apiUrl = `http://${hostname}${ApiUrlInterceptor.API_PORT}`;

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({url: this.prepareUrl(req.url)});
    return next.handle(req);
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : `${this.apiUrl}/${url}`;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }

}
