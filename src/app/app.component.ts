import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from './entities';
import { startWith } from 'rxjs/operators';

function _id() {
  let nextId = 0;
  return () => {
    return ++nextId;
  };
}

const userId = _id();
const itemId = _id();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public form: FormGroup;
  public users: FormArray;
  public items: FormArray;

  public sum: number = 0;

  public hashSum = {};

  public hashExchange = {};

  public hashUsers = {};

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.users = this._formBuilder.array([]);
    this.items = this._formBuilder.array([]);

    this.form = this._formBuilder.group({
      users: this.users,
      items: this.items
    });

    this._generate();

    this.form.valueChanges.pipe(
      startWith(this.form.value)
    ).subscribe((value) => {
      this.sum = value.items.reduce((prev, current) => prev + current.sum, 0);

      this.hashSum = {};
      this.hashExchange = {};
      this.hashUsers = {};
      value.users.forEach((user: IUser) => {
        this.hashSum[user.id] = 0;
        this.hashExchange[user.id] = 0;
        this.hashUsers[user.id] = value.users.filter((u) => u.id !== user.id).reduce((prev, current: IUser) => {
          return {
            ...prev,
            [current.id]: 0
          };
        }, {});
      });

      value.items.forEach((item) => {
        item.userIds.forEach((userId) => {
          if (!this.hashSum[userId]) {
            this.hashSum[userId] = 0;
          }

          this.hashSum[userId] += (item.sum / item.userIds.length);
        });
      });

      value.users.forEach((user: IUser) => {
        this.hashExchange[user.id] = this.hashSum[user.id] - user.bankSum;
      });

      value.users.forEach((user: IUser) => {
        if (this.hashExchange[user.id] < 0) {
          const others = value.users.filter((u) => u.id !== user.id);
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
    });
  }

  public addUser(data: IUser) {
    this.users.push(this._formBuilder.group({
      id: [userId()],
      name: [data.name],
      bankSum: [data.bankSum]
    }));
  }

  public addItem(data: { name: string, sum: number, userIds: number[] }) {
    this.items.push(this._formBuilder.group({
      id: [itemId()],
      name: [data.name],
      userIds: [data.userIds],
      sum: [data.sum],
    }));
  }

  public deleteUser(index) {
    const {id} = this.users.at(index).value;
    this.users.removeAt(index);

    this.items.controls.forEach((c) => {
      const userIds = c.get('userIds');

      if (userIds.value.includes(id)) {
        userIds.patchValue(
          userIds.value.filter((userId) => userId !== id)
        );
      }
    });
  }

  public deleteItem(index) {
    this.items.removeAt(index);
  }

  private _generate() {
    this.addUser({
      name: 'Алексей',
      bankSum: 1300,
    });

    this.addUser({
      name: 'Николай',
      bankSum: 200,
    });

    this.addUser({
      name: 'Денис',
      bankSum: 0,
    });

    this.addItem({
      name: 'Пицца №1',
      sum: 600,
      userIds: [1, 3]
    });

    this.addItem({
      name: 'Лимонад',
      sum: 300,
      userIds: [1, 2, 3]
    });

    this.addItem({
      name: 'Суп',
      sum: 600,
      userIds: [2]
    });
  }
}
