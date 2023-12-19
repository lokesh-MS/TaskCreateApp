import { HttpClient } from '@angular/common/http';
import { Component, OnInit,DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit,DoCheck{
constructor(private service:DbserviceService,private http:HttpClient,private router:Router){
  this.GetAllTaskRecords()

}
TaskRecord=new Array<any>();
filteredData: any=[];
reverArr:any=[]
ngOnInit(): void {
  

  
}
ngDoCheck(): void {
  console.log(this.TaskRecord);
  this.reverArr= this.filteredData.slice().reverse();
}
GetAllTaskRecords(){
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

ViewTask(){
  this.router.navigate(['dashboard/TaskView'])
}
}
