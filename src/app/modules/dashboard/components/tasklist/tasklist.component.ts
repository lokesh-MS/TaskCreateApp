import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit{
  constructor(private service:DbserviceService,private route:Router,private StorageService:StorageService){}
  userArray = new Array<any>();
  taskArray=new Array<any>();
  TaskRecord:any;
  UserName:any;
  ngOnInit(): void {
    this.getTaskRecord()
   this.UserName= this.StorageService.GetUser()
  }
 

  // 
  ViewTask(Inx:any){
  
this.StorageService.StoreTaskId(Inx)

    this.route.navigate(['dashboard/View'])
  }
  getTaskRecord(){
   
    let user=this.StorageService.GetUser();
    try{
      this.service.getTaskService().subscribe({
        next:(res:any)=>{
  console.log(res);
  this.TaskRecord=res;
           this.TaskRecord.filter((item:any)=>{
            if(user==item.send_To && item.status=="c"){
              this.userArray.push(item)
            }
           })
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
    catch(err){
console.log(`Catch Error:-${err}`);

    }

  }
}
