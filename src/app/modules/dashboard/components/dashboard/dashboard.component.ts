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
  totalCount:any=0
  ngOnInit(): void {
   this.userName= localStorage.getItem('userName')
    this.GetAllTaskRecords();
    this.completedCount= localStorage.getItem('completedCount')
    console.log(`completed Count${this.completedCount}`);
    this.notifyCount = 0;
    this.pendingCount=0
    this.completedCount=0;
    this.totalCount=0
  }

  GetAllTaskRecords() {
    
    try {
      let C: number = 0;
      this.service.getTaskService().subscribe({
        next: async(res: any) => {
          this.TaskRecord = await res;
          this.filteredData=this.TaskRecord;
  
          setTimeout(() => {
            this.filteredData.filter((data) => {
              let User = localStorage.getItem('userName');
             
          
            
              if (data.send_To == User) {
                this.totalCount++
                this.notifyCount++;
                this.pendingCount++;
                if (data.is_Opened == 'yes'  ) {
                  this.notifyCount--;
                  
                }
                if(data.status=='c'){
                 let c= this.completedCount++;
                 
               }
               this.pendingCount=this.totalCount-this.completedCount
              }
              localStorage.setItem('ToltalCount',this.totalCount)
              localStorage.setItem('completedCount', this.completedCount);
              localStorage.setItem('NCount', this.notifyCount);
              localStorage.setItem('pendingCound',this.pendingCount)

            });

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
