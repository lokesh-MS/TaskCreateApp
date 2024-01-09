import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent implements OnInit{
constructor(private Storage:StorageService,private service:DbserviceService,private router:Router){}
  userName:any;
  records:any=[];
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.userName = this.Storage.GetUser();
  this.getPendingRecords()
}
filterData:any=[];

pendingCount:any=0;
getPendingRecords(){


  try{
    this.service.getTaskService().subscribe({
      next:(res)=>{
  this.records=res

 this.filterData= this.records.filter((item:any)=>{
  // debugger
    if(item.status!='c' && item.send_To==this.userName){
      this.pendingCount++;
return this.filterData.push(item)
    }
    // else if(item.status=='c' && item.send_To==this.userName){
    //   this.pendingCount--;
    // }
  })

  console.log(` count ${this.pendingCount}`);
  localStorage.setItem('pendingCount',this.pendingCount)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
catch(ex){
  console.log(`Catch Error:-${ex}`);
  
}
}
ViewTask(id:any){
  this.router.navigate(['dashboard/TaskView']);
  this.Storage.StoreTaskId(id);
}
}
