import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ViewComponent } from './view/view.component';
import { MatConfirmDialogComponentComponent } from './mat-confirm-dialog-component/mat-confirm-dialog-component.component';
// Import from library
// highChart
import { HighchartsChartModule } from 'highcharts-angular';

import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewComponent,
    MatConfirmDialogComponentComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule
    ,ReactiveFormsModule,HttpClientModule,  NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HighchartsChartModule //higChart
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
