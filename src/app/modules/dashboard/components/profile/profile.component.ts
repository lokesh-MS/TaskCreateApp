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
RoleArray=[
  {Role:'Admin',
  RoleId:1
},
{
  Role:'TL',
  RoleId:2
},
{
  Role:'Programer',
  RoleId:3
}
];
ngOnInit(): void {
  this.userInfoGroup=this.fb.group({
    FirstName:['',Validators.required],
    LastName :['',Validators.required],
    UserName:['',Validators.required],
    User_Img:[''],
    Gender :['',Validators.required],
     Date_Of_Birth :['',Validators.required],
     permanent_Address :['',Validators.required],
     current_Address :['',Validators.required],
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
  this.userInfoGroup.value.User_Img=this.imageUrl;
  let userInfoData=this.userInfoGroup.value
 
  this.service.PostUserInfo(userInfoData).subscribe({
  next:(res=>{
    this.imgUpload(this.selectedFile);
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
// imagesrc ="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
// selectedFile:any;
// imgUpload (event:any) {
//   debugger
//   var image:HTMLElement|any = document.getElementById("output");
//  let img= event.target.files[0].name;
//  this.selectedFile = event.target.files[0] as File;
//   // image.src = URL.createObjectURL(event.target.files[0]);

//   this.imagesrc=this.selectedFile.name
// };
imageUrl: string="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
selectedFile:any;
formData = new FormData();
loadFile(event: any): void {
  const image: HTMLImageElement = document.getElementById("output") as HTMLImageElement;

  if (event) {

    this.selectedFile=  event.target.files[0] as File;

    this.formData.append("File", this.selectedFile);

  
}
 
  // Assuming you're using Angular's change detection
  this.imageUrl = URL.createObjectURL(event.target.files[0]);
console.log(this.imageUrl);

  // If not using Angular's change detection, use NgZone to trigger change detection
  // import { NgZone } from '@angular/core';
  // this.ngZone.run(() => {
  //   this.imageUrl = URL.createObjectURL(event.target.files[0]);
  // });
}
imgUpload(img:any){
  debugger
  let FileNameData:any;
  console.log(this.formData.get('File'));

   
  this.service.FileUpload(this.formData).subscribe({
    next:(res)=>{
console.log(`File Upload Seccessfully! ${res}`);

    },
    error:(err)=>{
      console.log(`Error File Upload! `);
      
    }
    
  })
  this.formData.delete('File');
}

onSelect(e:any){

}
}
