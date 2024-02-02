import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { NotifyService } from 'src/app/service/notify.service';
import { StorageService } from 'src/app/service/storage.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
declare var $:any;
@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.css']
})
export class TaskviewComponent implements OnInit{
constructor(private service:DbserviceService,private router:Router ,private StorageService:StorageService,private notify:NotifyService,private sideNav:SidenavComponent){

}
singleData=new Array<any>();
Time:string="";
userName:any="";
ngOnInit(): void {
  
 let Id= this.StorageService.GetTaskId()
 this.getSingleRecord(Id)
  this.userName=  localStorage.getItem('userName')

}

 async getSingleRecord(id:any){
  try{
    
  await  this.service.GetSingleTask(id).subscribe({
      next:((res:any)=>{
  this.singleData.push(res)

  let obj=res
  obj.is_Opened="yes"
  // this.sideNav.GetAllTaskRecords();
this.service.EditTask(id,obj).subscribe()
      }),
      error:(err=>{
  
      })
    })
  }
  catch(err){
console.log(`Catch Error:-${err}`);

  }

}
commentShowFun(){
  $('#addcomment').addClass('commentShow')
  let el: HTMLElement | null = document.getElementById('addcomment');

  if (el) {
    el.style.display = 'block';
  }

 
}

// checkBox function
onCheckboxChange(event: any,Id:any) {
  // Handle checkbox change here
  
  try{
    let Obj=this.singleData[0]

   
   if (event.target.checked) {
     Obj.status="p"
   
    //  this.sideNav.GetAllTaskRecords();
     this.service.EditTask(Id,Obj).subscribe({
       next:(res)=>{

 this.notify.showInfo("Added To Process","Task")
 
       },
       error:(err)=>{
//  console.log(err);
 
       }
     })
   } else {
     console.log('Checkbox is unchecked');
   }
  }
catch(err){
  console.log(`Catch Error:-${err}`);
  
}
}
GoBack(){
  
  // this.router.navigateByUrl('TaskList')
  this.router.navigate(["parent/Notification"])
 
  
}
textareaValue: string = '';

Complete(Id:any){
  try{
    
  let comVal=  document.getElementById('addcomment')?.innerHTML

  
    let Obj=this.singleData[0]
    Obj.status="c"
    Obj.User_Note=this.textareaValue;
    // this.sideNav.GetAllTaskRecords();
    this.Records()
    this.service.EditTask(Id,Obj).subscribe({
      next:(res)=>{
 
  this.notify.showSuccess("Completed Successfully!","Task")
  this.router.navigate(['parent'])
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }
catch(err){
console.log(`catch Error:- ${err}`);

}
}
usersListArray:any=[];
Records(){
  
 let C=0
  this.service.AllUserDetails().subscribe({
    next:(res)=>{
 
      this.usersListArray=res

      this.usersListArray.filter((user:any)=>{
        if(user.username==this.userName){
         let uId= user.id
            
                C++;
                let StrCount=C;
               user.Records_Count =StrCount.toString();
          this.service.EditUserDetails(uId,user).subscribe({
            next:(res)=>{
console.log(res);

            },
            error:(err)=>{
              console.log(err);
              
            }
          })
        }
      })
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
 
}
}
