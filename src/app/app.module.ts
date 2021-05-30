import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectUserComponent } from './select-user.component';
import { ResultsComponent } from './results.component';
import { UsersComponent } from './users.component';
import { ItemsComponent } from './items.component';
import { ConfirmDirective } from './confirm.directive';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const material = [
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatExpansionModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    AppComponent,
    SelectUserComponent,
    ResultsComponent,
    UsersComponent,
    ItemsComponent,
    ConfirmDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...material,
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: ''},
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'ru-Ru'
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
