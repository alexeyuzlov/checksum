import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  public load() {
    const data = {
      'users': [
        {
          'id': 1,
          'name': 'Алексей',
          'bankSum': 0
        },
        {
          'id': 2,
          'name': 'Николай',
          'bankSum': 1360
        },
        {
          'id': 3,
          'name': 'Денис',
          'bankSum': 0
        }
      ],
      'items': [
        {
          'id': 1,
          'name': 'Алассио',
          'userIds': [
            1,
            2,
            3
          ],
          'sum': 510
        },
        {
          'id': 2,
          'name': 'Алассио',
          'userIds': [
            1,
            2,
            3
          ],
          'sum': 510
        },
        {
          'id': 3,
          'name': 'Капучино',
          'userIds': [
            1
          ],
          'sum': 145
        },
        {
          'id': 4,
          'name': 'Малиновый лимонад',
          'userIds': [
            1
          ],
          'sum': 195
        },
        {
          'id': 5,
          'name': 'Пицца Дьяволо',
          'userIds': [
            1,
            2,
            3
          ],
          'sum': 450
        },
        {
          'id': 6,
          'name': 'Пицца с трюфелем',
          'userIds': [
            1,
            2,
            3
          ],
          'sum': 590
        },
        {
          'id': 7,
          'name': 'Крем-суп из тыквы',
          'userIds': [
            2
          ],
          'sum': 380
        },
        {
          'id': 8,
          'name': 'Салат с ростбифом',
          'userIds': [
            3
          ],
          'sum': 645
        },
        {
          'id': 9,
          'name': 'Салат с сыром и томатами',
          'userIds': [
            1
          ],
          'sum': 540
        }
      ]
    };

    return of(data).pipe(
      delay(100)
    );
  }
}
