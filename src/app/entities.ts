export interface IUser {
  id?: number;
  name: string;
  bankSum?: number;
}

export interface IItem {
  id?: number;
  name: string;
  userIds: number[];
  sum: number;
}

export interface IBillModel {
  users: IUser[];
  items: IItem[];
}
