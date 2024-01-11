import { HttpClient } from '@angular/common/http';
import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { StorageService } from 'src/app/service/storage.service';
declare var $: any;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent
  implements OnInit, DoCheck, AfterContentInit
{
  constructor(
    private service: DbserviceService,
    private http: HttpClient,
    private router: Router,
    private Storage: StorageService
  ) {
    this.GetAllTaskRecords();
  }
  TaskRecord = new Array<any>();
  filteredData = new Array<any>();
  reverArr: any = [];
  userName: any;
  messageCont:any
  ngOnInit(): void {
    this.userName = this.Storage.GetUser();

    this.messageCont= localStorage.getItem('NCount')
  }
  ngDoCheck(): void {
    // console.log(this.TaskRecord);
    this.userName = this.Storage.GetUser();
    this.reverArr = this.filteredData.slice().reverse();
  }

  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.newMessage();
  }
  notifyCount: any = 0;
  GetAllTaskRecords() {
    try {
      let C = 0;
      this.service.getTaskService().subscribe({
        next: async(res: any) => {
          this.TaskRecord = await res;
         
          this.filteredData = this.TaskRecord;
         await this.newMessage();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } catch (err) {
      console.log(`Catch Error:-${err}`);
    }
  }

  ViewTask(id: any) {
    this.router.navigate(['dashboard/TaskView']);
    this.Storage.StoreTaskId(id);
  }

  // this fun for add new msg style
  // newMsgCount: any = 0;
  newMessage() {
    // 
    if (this.filteredData.length > 0) {
      
      this.filteredData.filter((filterItem) => {
        if (
          filterItem.is_Opened == null &&
          filterItem.status != 'c' &&
          filterItem.status != 'p'
        ) {
          
          let CreateBtn = document.getElementById(`crd${filterItem.id}`);
          console.log(`elment :${CreateBtn}`);
          $(CreateBtn).addClass('newMsgStyle');
          
        }
      });
    }
  }
}
