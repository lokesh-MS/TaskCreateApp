import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
constructor(private router:Router){}
ngOnInit(): void {
}
CreateProject(){
  this.router.navigate(["parent/userInfo/CreateProject"])
}
ProjectInfo(){
  this.router.navigateByUrl("parent/userInfo/ProjectDetails")
}
CreateUser(){
  // this.router.navigateByUrl("CreateUser")
  this.router.navigate(["parent/userInfo/CreateUser"])
}


}
