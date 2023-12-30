import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { NotifyService } from 'src/app/service/notify.service';
import { StorageService } from 'src/app/service/storage.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent
  implements OnInit, DoCheck, AfterContentInit, AfterContentChecked
{
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private fb: FormBuilder,
    private service: DbserviceService,
    private notify: NotifyService,
    private sessionStorage: StorageService,
    private router:Router
  ) {}
  Time: any;
  TaskGroup!: FormGroup;
  dataCount = new Array<any>();
  taskArray = new Array<any>();
  TaskRecord = new Array<any>();
  filteredData = new Array<any>();
  resArr: any;
  //  buttonText: string = 'Create';
  condition1: boolean = false;
  condition2: boolean = false;
  condition3: boolean = false;
  userName: any = '';
  ngOnInit(): void {
    this.condition1 = true;
    this.dataCount.length = 1;
    this.TaskGroup = this.fb.group({
      id: [''],
      Send_To: ['', Validators.required],
      Message: ['', Validators.required],
      Tittle: ['', Validators.required],
      Description: ['', Validators.required],
      Status: ['', Validators.required],
      Task_Assign_Time: [''],
      Created_By: [''],
      Time: [''],
    });

    this.userName = this.sessionStorage.GetUser();

    this.Time = this.getCurrentTime();

    this.getTaskRecord();
    this.colorChangeFunction();
  }
  ngDoCheck(): void {}
  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {
    this.colorChangeFunction();
    console.log(<HTMLElement>document.getElementById('crd'));
  }
  createAndAppendElement(): void {
    this.TaskGroup.reset();
    // this.dataCount.length++
    $('#myModal').modal('show');
    // this.dataCount.length=10
    let CreateBtn = document.getElementById('modaleCRBtn');
    let UpdateBtn = document.getElementById('modaleUPBtn');
    $(UpdateBtn).addClass('modaleBtn');
    $(CreateBtn).removeClass('modaleBtn');
  }

  CraeteTask() {
    this.TaskGroup.value.Task_Assign_Time = this.Time;
    this.TaskGroup.value.Time = this.timeString;
    this.TaskGroup.value.Created_By = this.sessionStorage.GetUser();
    this.service.Createtaskservice(this.TaskGroup.value).subscribe({
      next: (res: any) => {
        this.TaskRecord = res;
        this.getTaskRecord();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.getTaskRecord();
    this.notify.showSuccess('Send Successfully', 'Task');
    this.TaskGroup.reset();
  }
  // view taskCard Details
  ViewTaskDataInModal() {
    $('#myModal').modal('show');
  }
  // show modal fun
  ShowModal() {
    $('#myModal').modal('show');
    this.Time = this.getCurrentTime();
  }

  // Time funtionality
  timeString: any;
  getCurrentTime() {
    var now = new Date();
    var hours: any = now.getHours();
    var minutes: any = now.getMinutes();
    var seconds: any = now.getSeconds();
    var year = now.getFullYear();
    var month = now.getMonth();
    month += 1;
    var day = now.getDate();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Add leading zero to single-digit minutes
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // var timeString = hours + ':' + minutes + ' ' + ampm +' - '+year+'/'+month+'/'+day;
    const currentDate = new Date();
    //  this.timeString  = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    this.timeString = `${hours}:${minutes} ${ampm}`;

    return currentDate;
  }
  // toggel btn funtion
  onCheckboxChange(event: any) {
    // Handle checkbox change here
    if (event.target.checked) {
      this.TaskGroup.value.Status = 'Yes';
    } else {
      this.TaskGroup.value.Status = 'No';
    }
  }

  getTaskRecord() {
    try {
      this.service.getTaskService().subscribe({
        next: async (res: any) => {
          this.TaskRecord = res;
          const currentDate = new Date(); // Assuming today's date
          const startOfDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          );
          const endOfDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
          );
          this.filteredData = await this.TaskRecord.filter((item) => {
            //
            const itemDate = new Date(item.task_Assign_Time);
            return itemDate >= startOfDay && itemDate < endOfDay;
          });

          if (this.filteredData.length > 0) {
            console.log('have data');
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } catch (err) {
      console.log(`catch Error:-${err}`);
    }
  }

  EditTask(id: any) {
    // this.notify.showSuccess("Send Successfully","Task",)
    $('#myModal').modal('show');
    let UpdateBtn = document.getElementById('modaleUPBtn');

    let CreateBtn = document.getElementById('modaleCRBtn');
    $(UpdateBtn).removeClass('modaleBtn');
    $(CreateBtn).addClass('modaleBtn');
    this.service.GetSingleTask(id).subscribe({
      next: (res: any) => {
        this.TaskGroup.patchValue({
          id: res.id,
          Send_To: res.send_To,
          Tittle: res.tittle,
          Description: res.description,
          Message: res.message,
          Task_Assign_Time: res.taskAssignTime,
        });
        // this.buttonText = 'Update';
      },
      error: (err: any) => {
        console.log(`error${{ err }}`);
      },
    });
  }
  ReadTaskrecord(id:any) {
this.sessionStorage.StoreTaskId(id)
this.router.navigate(['dashboard/View'])
  }
  Update() {
    let dataId = this.TaskGroup.value.id;
    this.TaskGroup.value.taskAssignTime;
    //  this.service.GetSingleTask(dataId).subscribe({
    //   next:(res:any)=>{

    //   }
    //  })
    this.service.EditTask(dataId, this.TaskGroup.value).subscribe({
      next: (res: any) => {},
      error: (err: any) => {
        console.log(`error:${{ err }}`);
      },
    });
  }

  colorChangeFunction() {
    debugger;
    console.log('have data1 conchecked');
    if (this.filteredData.length > 0) {
      this.filteredData.filter((item) => {
        let CurrentStatus: string = '';
        if (item.status) {
          CurrentStatus = item.status;
          CurrentStatus.toString().toLowerCase();
          if (CurrentStatus != '' && CurrentStatus != null) {
            let Id = item.id;

            if (CurrentStatus == 'p') {
              if ($('crd1' + Id)) $('#crd1' + item.id).addClass('stage2');
            } else if (CurrentStatus == 'c') {
              if ($('crd1' + Id)) $('#crd1' + item.id).addClass('stage3');
            }

            return;
          }
        }
      });
    }
  }
}
