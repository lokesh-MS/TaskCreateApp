import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { TaskviewComponent } from './components/taskview/taskview.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { NotificationComponent } from './components/notification/notification.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
    {path:'home',component:HomeComponent},
    {path:'TaskView',component:TaskviewComponent},
    {path:'TaskList',component:TasklistComponent},
    {path:'Notification',component:NotificationComponent}
    // {path:'',redirectTo:'dashbord/home',pathMatch:'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
