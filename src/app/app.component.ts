import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CounterService } from './counter.service';
import { PaymentService } from './payment.service';
import { UsersComponent } from './users.component';
import { ItemsComponent } from './items.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(UsersComponent, {static: true}) public usersComp: UsersComponent;
  @ViewChild(ItemsComponent, {static: true}) public itemsComp: ItemsComponent;

  public form: FormGroup;
  public users: FormArray;
  public items: FormArray;

  private _userId;

  private _itemId;

  constructor(
    private _formBuilder: FormBuilder,
    private _counterService: CounterService,
    private _paymentService: PaymentService,
  ) {
    this._userId = this._counterService.instance;
    this._itemId = this._counterService.instance;

    this.users = this._formBuilder.array([]);
    this.items = this._formBuilder.array([]);

    this.form = this._formBuilder.group({
      users: this.users,
      items: this.items
    });
  }

  public ngOnInit() {
    this._paymentService.load().subscribe(
      (value) => {
        value.users.forEach((user) => this.usersComp.add(user));
        value.items.forEach((item) => this.itemsComp.add(item));
      }
    );
  }

  public reset() {
    this.items.clear();
    this.users.clear();
  }
}
