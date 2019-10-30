import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpmsgService {

  constructor(public http: HttpClientModule) {
    console.log('Hello ProcessHttpmsgProvider Provider');
  }

  public extractData(res: any) {
    const body = res.json();
    return body || { };
  }

  public handleError(error: any | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    // tslint:disable-next-line: deprecation
    return Observable.throw(errMsg);
  }
}
