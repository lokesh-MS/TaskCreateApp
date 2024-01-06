import { Component, ElementRef, OnInit, Renderer2,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit , DoCheck{
constructor(private router:Router,private el: ElementRef, private renderer: Renderer2, private sessionStorage:StorageService,private notifyCom:NotificationComponent){}
ngOnInit(): void {
  let closeBtn = this.el.nativeElement.querySelector('#btn');
  let sidebar = this.el.nativeElement.querySelector('.sidebar');
  let searchBtn =  this.el.nativeElement.querySelector(".bx-search");

}
userName:any

notiCount:any;
ngDoCheck(): void {
  this.userName= this.sessionStorage.GetUser();

  this.notiCount= localStorage.getItem('NCount')
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
}
