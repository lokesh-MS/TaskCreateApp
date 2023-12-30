import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { NotifyService } from 'src/app/service/notify.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
constructor(private http:HttpClient,private fb:FormBuilder,private service:DbserviceService,private notify :NotifyService,private storageService:StorageService){}
userInfoGroup!:FormGroup;

ngOnInit(): void {
  this.userInfoGroup=this.fb.group({
    FirstName:['',Validators.required],
    LastName :['',Validators.required],
    UserName:['',Validators.required],
    Gender :['',Validators.required],
     Date_Of_Birth :['',Validators.required],
     Address :['',Validators.required],
     Street_Address :['',Validators.required],
     City :['',Validators.required],
     State :['',Validators.required],
     Email :['',Validators.required],
     Mobile :['',Validators.required],
     Job_Title :['',Validators.required],
     Department :['',Validators.required],
     Status  :['',Validators.required],
     Working_Type :['',Validators.required],
     Joining_Date:['',Validators.required],
  })
}
postUserInfo(){
// debugger
try{
  this.userInfoGroup.value.UserName=this.storageService.GetUser();
  let userInfoData=this.userInfoGroup.value
  this.service.PostUserInfo(userInfoData).subscribe({
  next:(res=>{
  this.notify.showSuccess("created Successfully","Record!!!")
  this.userInfoGroup.reset();
  }),
  error:(err=>{
    console.log(err);
    this.notify.showError(err,"Error!!!")
  })
  })
}
catch(err){
  console.log(`Catch Error:-${err}`);
  
}

}

}
