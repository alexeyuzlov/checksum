import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IBillModel, IUser } from './entities';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnChanges {
  @Input() public value: IBillModel;

  public sum: number = 0;
  public totalPayment: number = 0;

  public hashSum = {};

  public hashExchange = {};

  // todo hash type
  public hashUsers = {};

  public ngOnChanges(changes: SimpleChanges) {
    this._reset();
    this._calcSum();
    this._calcTotalPayment();

    this.value.users.forEach((user: IUser) => {
      this.hashSum[user.id] = 0;
      this.hashExchange[user.id] = 0;
      this.hashUsers[user.id] = this.value.users.reduce((prev, current: IUser) => {
        return {
          ...prev,
          [current.id]: 0
        };
      }, {});
    });

    this.value.items.forEach((item) => {
      item.userIds.forEach((userId) => {
        this.hashSum[userId] += (item.sum / item.userIds.length);
      });
    });

    this._calcExchange();
  }

  // todo calc hash
  public getUser(id: number): IUser {
    return this.value.users.find((u) => u.id === id);
  }

  private _reset() {
    this.hashSum = {};
    this.hashExchange = {};
    this.hashUsers = {};
  }

  private _calcSum() {
    this.sum = this.value.items.reduce((prev, current) => prev + current.sum, 0);
  }

  private _calcTotalPayment() {
    this.totalPayment = this.value.users.reduce((prev, current) => prev + current.bankSum, 0);
  }

  private _calcExchange() {
    this.value.users.forEach((user: IUser) => {
      this.hashExchange[user.id] = this.hashSum[user.id] - user.bankSum;
    });

    // calc for others
    this.value.users.forEach((user: IUser) => {
      if (this.hashExchange[user.id] < 0) {
        const others = this.value.users.filter((u) => u.id !== user.id);
        others.forEach((o) => {
          if (this.hashExchange[o.id] > 0) {
            let flag = true;
            while (flag) {
              this.hashUsers[o.id][user.id]++;
              let balance = this.hashUsers[o.id][user.id];
              if (this.hashExchange[o.id] - balance <= 0 || this.hashExchange[user.id] + balance >= 0) {
                flag = false;
              }
            }
          }
        });
      }
    });

    // calc for myself
    this.value.users.forEach((user: IUser) => {
      const others = this.value.users.filter((u) => u.id !== user.id);
      const total = others.reduce((prev, current) => {
        return prev + this.hashUsers[user.id][current.id];
      }, 0);

      this.hashUsers[user.id][user.id] = this.hashExchange[user.id] - total;
    });
  }
}
