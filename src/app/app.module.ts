import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectUserComponent } from './select-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
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
