import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    private _http: HttpClient
  ) {
  }

  public load(): Observable<any> {
    return this._http.get('/assets/data.json').pipe(
      delay(100) // demo
    )
  }
}
