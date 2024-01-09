import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private service: DbserviceService) {}
  TaskRecord = new Array<any>();
  filteredData = new Array<any>();
  reverArr: any = [];
  userName: any;
  notifyCount: any = 0;
  pendingCount:any=0
  completedCount:any=0;
  ngOnInit(): void {
   this.userName= localStorage.getItem('userName')
    this.GetAllTaskRecords();
  }

  GetAllTaskRecords() {
    
    try {
      let C: number = 0;
      this.service.getTaskService().subscribe({
        next: async(res: any) => {
          this.TaskRecord = await res;
          this.filteredData=this.TaskRecord;
          // const currentDate = new Date(); // Assuming today's date
          // const startOfDay = new Date(
          //   currentDate.getFullYear(),
          //   currentDate.getMonth(),
          //   currentDate.getDate()
          // );
          // const endOfDay = new Date(
          //   currentDate.getFullYear(),
          //   currentDate.getMonth(),
          //   currentDate.getDate() + 1
          // );
         debugger
          setTimeout(() => {
            this.TaskRecord.filter((item)=>{
              if(item.status!='c' && item.send_To==this.userName){
                console.log('item:-',item);
                this.pendingCount++;
              }
              if(item.status=='c' && item.send_To==this.userName){
                this.completedCount++;
              }
              console.log(`dashboard count ${this.pendingCount}`);
              localStorage.setItem('pendingCount', this.pendingCount);
              localStorage.setItem('completedCount', this.completedCount);
              

            })
          }, 100);
   
          // setTimeout(() => {
          //   
          //   this.filteredData = this.TaskRecord.filter((item: any) => {
          //     const itemDate = new Date(item.task_Assign_Time);
          //     return itemDate >= startOfDay && itemDate < endOfDay;
          //   });
          //   console.log(this.notifyCount);
          // }, 100);

          setTimeout(() => {
            this.filteredData.filter((data) => {
              let User = localStorage.getItem('userName');
              if(data.status!='c' && data.send_To==this.userName){
                this.pendingCount++;
              }
              if (data.send_To == User) {
                this.notifyCount++;
                if (data.is_Opened == 'yes') {
                  this.notifyCount--;
                }
              }
          
              localStorage.setItem('NCount', this.notifyCount);

  // localStorage.setItem('pendingCount',this.pendingCount)
            });

              
            console.log(`dashboard count ${this.pendingCount}`);
          }, 200);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } catch (err) {
      console.log(`Catch Error:-${err}`);
    }
  }
}
