import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { NotifyService } from 'src/app/service/notify.service';
import { StorageService } from 'src/app/service/storage.service';
declare var $:any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private renderer: Renderer2, private el: ElementRef ,
    private fb:FormBuilder , private service:DbserviceService,private notify:NotifyService,private sessionStorage:StorageService) {}
Time:any;
TaskGroup!:FormGroup;
  dataCount = new Array<any>();
  taskArray=new Array<any>();
  TaskRecord=new Array<any>();
   filteredData: any=[];
   resArr:any;
  //  buttonText: string = 'Create';
  ngOnInit(): void {
    this.dataCount.length=1
    this.TaskGroup=this.fb.group({
      id:[''],
      Send_To:['',Validators.required],
      Message:['',Validators.required],
      Tittle:['',Validators.required],
      Description:['',Validators.required],
      Status:['',Validators.required],
      Task_Assign_Time:[''],
      Created_By:[''],
      Time:[''],
    })
   this.Time= this.getCurrentTime()
 
   this.getTaskRecord()
  
  
  // const element = document.querySelector('#modaleBtn');
  // let element: HTMLElement | null = document.getElementById('modaleBtn');
  //   if (element) {
  //     debugger
  //     const innerHtmlValue = element.innerHTML;
  //     console.log(innerHtmlValue);
  //   }
  }
  createAndAppendElement(): void {
    this.TaskGroup.reset()
    // this.dataCount.length++
    $('#myModal').modal('show');
// this.dataCount.length=10
let CreateBtn= document.getElementById('modaleCRBtn')
  let UpdateBtn= document.getElementById('modaleUPBtn')
  $(UpdateBtn).addClass('modaleBtn')
    $(CreateBtn).removeClass('modaleBtn')
  }
  
  CraeteTask(){

    this.TaskGroup.value.Task_Assign_Time=this.Time;
    this.TaskGroup.value.Time=this.timeString;
    this.TaskGroup.value.Created_By = this.sessionStorage.GetUser();
    this.service.Createtaskservice(this.TaskGroup.value).subscribe({
      next:(res:any)=>{
      
        this.TaskRecord=res
        this.getTaskRecord()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
    this.getTaskRecord()
    this.notify.showSuccess('Send Successfully','Task')
    this.TaskGroup.reset()
  }
  // view taskCard Details
  ViewTaskDataInModal(){
    $('#myModal').modal('show');
  }
// show modal fun
ShowModal(){

  
  $('#myModal').modal('show');
  this.Time= this.getCurrentTime()
}

  // Time funtionality
  timeString:any;
  getCurrentTime() {
    var now = new Date();
    var hours:any = now.getHours();
    var minutes:any = now.getMinutes();
    var seconds:any= now.getSeconds();
   var year= now.getFullYear();
   var month= now.getMonth();
   month+=1;
   var day = now.getDate()
    var ampm = hours >= 12 ? 'PM' : 'AM';
   
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    // Add leading zero to single-digit minutes
    hours = hours < 10 ? '0' + hours: hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    // var timeString = hours + ':' + minutes + ' ' + ampm +' - '+year+'/'+month+'/'+day;
    const currentDate = new Date();
    //  this.timeString  = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    this.timeString=`${hours}:${minutes} ${ampm}`;
    
    return currentDate;
  }
  // toggel btn funtion
  onCheckboxChange(event: any) {
    // Handle checkbox change here
    if (event.target.checked) {
  
      this.TaskGroup.value.Status='Yes'
    } else {
      this.TaskGroup.value.Status='No'
    }
  }


  getTaskRecord(){
    this.service.getTaskService().subscribe({
      next:(res:any)=>{
this.TaskRecord=res;
const currentDate = new Date(); // Assuming today's date
const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

setTimeout(() => {
  this.filteredData = this.TaskRecord.filter(item => {
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

 
  EditTask(id:any){
    // this.notify.showSuccess("Send Successfully","Task",)
    $('#myModal').modal('show');
  let UpdateBtn= document.getElementById('modaleUPBtn')
    
  let CreateBtn= document.getElementById('modaleCRBtn')
  $(UpdateBtn).removeClass('modaleBtn')
   $(CreateBtn).addClass('modaleBtn')
    this.service.GetSingleTask(id).subscribe({
      next:(res:any)=>{
        
        this.TaskGroup.patchValue({
          id:res.id,
          Send_To:res.send_To,
          Tittle:res.tittle,
          Description:res.description,
          Message:res.message,
          Task_Assign_Time:res.taskAssignTime
        })
        // this.buttonText = 'Update';
        
      },
      error:(err:any)=>{
        console.log(`error${{err}}`);
        
      }
    })

  }
  ReadTaskrecord(){
    
  }
  Update(){
  
   let dataId= this.TaskGroup.value.id
   this.TaskGroup.value.taskAssignTime
  //  this.service.GetSingleTask(dataId).subscribe({
  //   next:(res:any)=>{

  //   }
  //  })
 this.service.EditTask(dataId,this.TaskGroup.value).subscribe({
  next:(res:any)=>{
  
    
  },
  error:(err:any)=>{
console.log(`error:${{err}}`);

  }
 })
  }
  
}
