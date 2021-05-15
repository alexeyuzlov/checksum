import { Component, Input } from '@angular/core';
import { IItem } from './entities';
import { FormArray, FormBuilder } from '@angular/forms';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent {
  @Input() public items: FormArray;

  @Input() public users: FormArray;

  private _id;

  constructor(
    private _formBuilder: FormBuilder,
    private _counterService: CounterService,
  ) {
    this._id = this._counterService.instance;
  }

  public add(data: IItem) {
    this.items.push(this._formBuilder.group({
      id: [data.id || this._id()],
      name: [data.name],
      userIds: [data.userIds],
      sum: [data.sum],
    }));
  }

  public delete(index) {
    this.items.removeAt(index);
  }
}
