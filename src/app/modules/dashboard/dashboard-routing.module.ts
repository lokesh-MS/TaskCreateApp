import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { TaskviewComponent } from './components/taskview/taskview.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ViewComponent } from 'src/app/view/view.component';
import { PendingListComponent } from './components/pending-list/pending-list.component';
import { TotalRecordsComponent } from './components/total-records/total-records.component';
import { ParentComponent } from './components/parent/parent.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserCreationComponent } from './components/user-creation/user-creation.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';


const routes: Routes = [
  {path:'',component:ParentComponent,children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'create',component:HomeComponent},
    {path:'pendingList',component:PendingListComponent},
    {path:'TaskView',component:TaskviewComponent},
    {path:'TaskList',component:TasklistComponent},
    {path:'TotalRecords',component:TotalRecordsComponent},
    {path:'Notification',component:NotificationComponent},
    {path:'profile',component:ProfileComponent},
    {path:'userInfo',component:UserInfoComponent},
    {path:'View',component:ViewComponent},

    // {path:'',redirectTo:'dashbord/home',pathMatch:'full'},
    {path:'userInfo',component:AdminComponent,children:[
      {path:'CreateUser',component:UserCreationComponent},
      {path:'CreateProject',component:ProjectComponent},
      {path:'ProjectDetails',component:ProjectDetailsComponent}
    ]}
  ]},
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
