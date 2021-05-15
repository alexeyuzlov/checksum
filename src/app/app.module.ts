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
