import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { IUser } from './entities';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
})
export class SelectUserComponent implements OnChanges {
  @Input() public control: FormArray;

  @Input() public users: IUser[];

  public items = new FormArray([]);

  public change() {
    const userIds = this.users
      .filter((u, index) => this.items.value[index])
      .map((u) => u.id);

    this.control.setValue(userIds);
  }

  public ngOnChanges(changes: SimpleChanges) {
    const value = this.control.value;

    this.items.clear();

    this.users.forEach((c) => {
      this.items.push(new FormControl(value.includes(c.id)));
    });
  }
}
