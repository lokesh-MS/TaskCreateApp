import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { StorageService } from 'src/app/service/storage.service';
declare var $:any;
@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.css']
})
export class TaskviewComponent implements OnInit{
constructor(private service:DbserviceService,private router:Router ,private StorageService:StorageService){

}
singleData=new Array<any>();
Time:string="";
ngOnInit(): void {
  debugger
 let Id= this.StorageService.GetTaskId()
 this.getSingleRecord(Id)

}

 async getSingleRecord(id:any){
  try{
    debugger
  await  this.service.GetSingleTask(id).subscribe({
      next:(res=>{
  this.singleData.push(res)
  console.log(this.singleData);

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
  
 console.log(el);
 
}

// checkBox function
onCheckboxChange(event: any,Id:any) {
  // Handle checkbox change here
  debugger
let Obj=this.singleData[0]
   console.log(Obj); 
  
  if (event.target.checked) {
    Obj.status="p"
    console.log('Checkbox is checked');
    this.service.EditTask(Id,Obj).subscribe({
      next:(res)=>{

      },
      error:(err)=>{

      }
    })
  } else {
    console.log('Checkbox is unchecked');
  }
}
GoBack(){
  // this.router.navigateByUrl('TaskList')
  this.router.navigate(["dashboard/Notification"])
  console.log('cls');
  
}

Complete(Id:any){
  try{
    let Obj=this.singleData[0]
    Obj.status="c"
    this.service.EditTask(Id,Obj).subscribe({
      next:(res)=>{
  console.log(res);
  
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
}
