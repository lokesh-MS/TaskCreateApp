import { Component, ElementRef, OnInit, Renderer2,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { NotificationComponent } from '../notification/notification.component';
import { AppearanceAnimation, ConfirmBoxInitializer, DialogLayoutDisplay, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit , DoCheck{
constructor(private router:Router,private el: ElementRef, private renderer: Renderer2, private sessionStorage:StorageService,private notifyCom:NotificationComponent,private dashbord:DashboardComponent){}
ngOnInit(): void {
  let closeBtn = this.el.nativeElement.querySelector('#btn');
  let sidebar = this.el.nativeElement.querySelector('.sidebar');
  let searchBtn =  this.el.nativeElement.querySelector(".bx-search");


 this.Role= localStorage.getItem('Role')
  this.completedCount=  this.dashbord.completedCount
//  if(this.PendingCount==null){
//   this.PendingCount=0
 
//  }
 
}
userName:any
PendingCount:any=0;
completedCount:any=0;
notiCount:any=0;
Role:any;
ngDoCheck(): void {

  this.userName= this.sessionStorage.GetUser();
  this.PendingCount=  localStorage.getItem('pendingCound')
  // if(this.PendingCount==null){
  //   this.PendingCount=0
  //   this.completedCount=0
  //  }
  this.notiCount= localStorage.getItem('NCount')
  // if(  this.notiCount==null){
  //   this.notiCount=0
  // }
  this.completedCount=localStorage.getItem('completedCount')
// if(this.completedCount==null){
//   this.completedCount=0
// }
}
  // logout function
   
  LogOut(){
    this.router.navigate(['/'])
     sessionStorage.clear();
     localStorage.removeItem('userName')
     localStorage.clear()
  }
  //search Function 
  search(e:any){

  }

  LogOutPopUp(){
      // standard typescript method.
  
      const newConfirmBox = new ConfirmBoxInitializer();

      newConfirmBox.setTitle('Are You Sure?');
      newConfirmBox.setMessage('Logout Your Account');

      // Choose layout color type
      newConfirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      buttonPosition: 'right', // optional 
      // optional 
      width: '350px', // optional 
      });

      newConfirmBox.setButtonLabels('Yes', 'No');

      // Simply open the popup and observe button click
      newConfirmBox.openConfirmBox$().subscribe(resp => {
        if(resp.clickedButtonID){
        
          if(resp.clickedButtonID=='yes'){
            console.log('Button clicked: ', resp.clickedButtonID);
            this.LogOut()
          }
         else{
          return
         }
        
        }
      });
  
  }
}
