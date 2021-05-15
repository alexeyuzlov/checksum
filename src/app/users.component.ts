import { Component, Input } from '@angular/core';
import { IUser } from './entities';
import { FormArray, FormBuilder } from '@angular/forms';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  @Input() public users: FormArray;

  @Input() public items: FormArray;

  private _id;

  constructor(
    private _formBuilder: FormBuilder,
    private _counterService: CounterService,
  ) {
    this._id = this._counterService.instance;
  }

  public add(data: IUser) {
    this.users.push(this._formBuilder.group({
      id: [data.id || this._id()],
      name: [data.name],
      bankSum: [data.bankSum]
    }));
  }

  public delete(index) {
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
}
