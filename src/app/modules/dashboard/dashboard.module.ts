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
import { PendingListComponent } from './components/pending-list/pending-list.component';
import { TotalRecordsComponent } from './components/total-records/total-records.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { ParentComponent } from './components/parent/parent.component';
import { ChartModule } from 'angular-highcharts';
import * as accessibility from 'highcharts/modules/accessibility';
import { ProjectComponent } from './components/project/project.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserCreationComponent } from './components/user-creation/user-creation.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

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
    UserInfoComponent,
    PendingListComponent,
    TotalRecordsComponent,ParentComponent, ProjectComponent, AdminComponent, UserCreationComponent, ProjectDetailsComponent
  
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,ReactiveFormsModule,FormsModule,HighchartsChartModule,ChartModule
  ],
  providers:[NotificationComponent,DashboardComponent,SidenavComponent]
})
export class DashboardModule { }
