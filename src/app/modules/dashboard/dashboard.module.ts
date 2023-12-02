import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskviewComponent } from './components/taskview/taskview.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';



@NgModule({
  declarations: [

    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    SidenavComponent,
    TaskviewComponent,
    TasklistComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class DashboardModule { }
