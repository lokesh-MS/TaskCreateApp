import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit{
  constructor(private service:DbserviceService,private route:Router){}
  dataCount = new Array<any>();
  taskArray=new Array<any>();
  TaskRecord:any;
  ngOnInit(): void {
    this.getTaskRecord()
  }
  ViewTask(){
    this.route.navigate(['dashboard/TaskView'])
  }
  getTaskRecord(){
    this.service.getTaskService().subscribe({
      next:(res:any)=>{
console.log(res);
this.TaskRecord=res;

      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
