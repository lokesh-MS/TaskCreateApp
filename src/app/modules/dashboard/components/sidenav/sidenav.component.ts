import { Component, ElementRef, OnInit, Renderer2,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit , DoCheck{
constructor(private router:Router,private el: ElementRef, private renderer: Renderer2, private sessionStorage:StorageService){}
ngOnInit(): void {
  let closeBtn = this.el.nativeElement.querySelector('#btn');
  let sidebar = this.el.nativeElement.querySelector('.sidebar');
  let searchBtn =  this.el.nativeElement.querySelector(".bx-search");
  //  closeBtn.addEventListener('click', () => {
  //   //  console.log('Button clicked!');
  //    sidebar.classList.toggle("open");
  //    menuBtnChange(); //calling the function(optional)
  //  });
  //  searchBtn.addEventListener("click", () => {
  //    // Sidebar open when you click on the search iocn
  //    sidebar.classList.toggle("open");
  //    menuBtnChange(); //calling the function(optional)
  //  });
  //  function menuBtnChange() {
  //    if (sidebar.classList.contains("open")) {
  //      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
  //    } else {
  //      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
  //    }
  //  }

  //  let toggle = this.el.nativeElement.querySelector('#toggle');
   
  //  let menu = this.el.nativeElement.querySelector('.menu');   
  //  let sideMenu =this.el.nativeElement.querySelector('.Animated-Radial-Menu');
   
  //  toggle.addEventListener('click', () => {
  //      menu.classList.toggle('active')
  //  });
}
userName:any
ngDoCheck(): void {
  this.userName= this.sessionStorage.GetUser();
  // console.log(`docheck`,this.userName);
  
}
  // logout function
   
  LogOut(){
    this.router.navigate(['/'])
     sessionStorage.clear();
  }
  //search Function 
  search(e:any){

  }
}
