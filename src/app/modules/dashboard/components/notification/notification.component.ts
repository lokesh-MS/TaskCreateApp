import { HttpClient } from '@angular/common/http';
import { Component, OnInit,DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit,DoCheck{
constructor(private service:DbserviceService,private http:HttpClient,private router:Router,private Storage:StorageService){
  this.GetAllTaskRecords()

}
TaskRecord=new Array<any>();
filteredData: any=[];
reverArr:any=[]
userName:any;
ngOnInit(): void {
  

 this.userName= this.Storage.GetUser()
}
ngDoCheck(): void {
  // console.log(this.TaskRecord);
  this.reverArr= this.filteredData.slice().reverse();
}
GetAllTaskRecords(){

  try{
    this.service.getTaskService().subscribe({
      next:(res:any)=>{
        this.TaskRecord=res;
          const currentDate = new Date(); // Assuming today's date
          const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
          const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
          
          setTimeout(() => {
            this.filteredData = this.TaskRecord.filter((item:any) => {
              // debugger
              const itemDate = new Date(item.task_Assign_Time);
              return itemDate >= startOfDay && itemDate < endOfDay;
            });
          }, 200);
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

ViewTask(id:any){
  this.router.navigate(['dashboard/TaskView']);
 this.Storage.StoreTaskId(id);
}
}
