import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'parent',loadChildren:()=>import('./modules/dashboard/dashboard.module').then((m)=>m.DashboardModule)},
  // {path:'parent/userInfo',loadChildren:()=>import('./modules/dashboard/dashboard.module').then((m)=>m.DashboardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
