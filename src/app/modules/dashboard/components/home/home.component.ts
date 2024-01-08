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
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation
} from '@costlydeveloper/ngx-awesome-popup';
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
    private router:Router,
  
  ) {}
  time: any;
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

    this.time = this.getCurrentTime();
console.log(this.time);

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
    this.TaskGroup.value.Task_Assign_Time = this.time;
    this.TaskGroup.value.Time = this.timeString;
    this.TaskGroup.value.Created_By = this.sessionStorage.GetUser();
    debugger
    if(this.TaskGroup.value.Message=="" || this.TaskGroup.value.Message==null){
let txtBox=document.getElementById('textArea')
if(txtBox){

$("#textArea").addClass('borderStyle')
$("#tittle").addClass('borderStyle')
$("#To").addClass('borderStyle')

  
}
else{
  this.notify.showWarning("please Fill Empty Fields","Note!")
}
    }
    else{
      this.service.Createtaskservice(this.TaskGroup.value).subscribe({
        next: (res: any) => {
          this.TaskRecord = res;
          $('#myModal').modal("hide");
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

  }
  // view taskCard Details
  ViewTaskDataInModal() {
    $('#myModal').modal('show');
  }
  // show modal fun
  ShowModal() {
    $('#myModal').modal('show');
    this.time = this.getCurrentTime();
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

  deleteTask(id: number) {
  
      // standard typescript method.
  
        const newConfirmBox = new ConfirmBoxInitializer();

        newConfirmBox.setTitle('Are You Sure?');
        newConfirmBox.setMessage('Are You Sure To Delete This ');

        // Choose layout color type
        newConfirmBox.setConfig({
        layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
        animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
        animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
        buttonPosition: 'right', // optional 
        // optional 
        width: '350px', // optional 
        });

        newConfirmBox.setButtonLabels('Yes', 'No');

        // Simply open the popup and observe button click
        newConfirmBox.openConfirmBox$().subscribe(resp => {
          if(resp.clickedButtonID){

            if(resp.clickedButtonID=='yes'){
              console.log('Button clicked: ', resp.clickedButtonID);
              this.Delete(id)

            }
           else{
            return
           }
          
          }
        });
    
  
  }

Delete(id:any){
  this.service.DeleteTask(id).subscribe({
    next:(res)=>{
  this.getTaskRecord();
    },
    error:(err)=>{
      console.log(`Delete Task Home ${err}`);
      
    }
  })
}
}
