import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  get instance() {
    let nextId = 0;
    return () => {
      return ++nextId;
    };
  }
}
