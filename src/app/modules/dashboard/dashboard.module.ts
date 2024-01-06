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
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserInfoComponent } from './components/user-info/user-info.component';



@NgModule({
  declarations: [

    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    SidenavComponent,
    TaskviewComponent,
    TasklistComponent,
    NotificationComponent,
    ProfileComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,ReactiveFormsModule,FormsModule,
  ],
  providers:[NotificationComponent]
})
export class DashboardModule { }
