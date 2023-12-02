import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/service/dbservice.service';
declare var $:any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private renderer: Renderer2, private el: ElementRef ,private fb:FormBuilder , private service:DbserviceService) {}
Time:any;
TaskGroup!:FormGroup;
  dataCount = new Array<any>();
  taskArray=new Array<any>();
  ngOnInit(): void {
    this.dataCount.length=1
    this.TaskGroup=this.fb.group({
      Send_To:['',Validators.required],
      Message:['',Validators.required],
      Tittle:['',Validators.required],
      Description:['',Validators.required],
      Status:['',Validators.required],
      TaskAssignTime:[''],
      Created_By:['']
    })
   this.Time= this.getCurrentTime()
   console.log(this.taskArray);
   
  }
  createAndAppendElement(): void {
    this.dataCount.length++
// this.dataCount.length=10
  }
  
  CraeteTask(){
    this.taskArray.push(this.TaskGroup.value)
    console.log(this.taskArray);
    
  }
  // view taskCard Details
  ViewTaskDataInModal(){
    $('#myModal').modal('show');
  }
// show modal fun
ShowModal(){
  console.log('modal');
  
  $('#myModal').modal('show');
  this.Time= this.getCurrentTime()
}

  // Time funtionality
  getCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes:any = now.getMinutes();
   var year= now.getFullYear();
   var month= now.getMonth();
   month+=1;
   var day = now.getDate()
    var ampm = hours >= 12 ? 'PM' : 'AM';
    console.log(month);
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    // Add leading zero to single-digit minutes
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    var timeString = hours + ':' + minutes + ' ' + ampm +' - '+year+'/'+month+'/'+day;
 
    
    return timeString;
  }
  // toggel btn funtion
  onCheckboxChange(event: any) {
    // Handle checkbox change here
    if (event.target.checked) {
      console.log('Checkbox is checked');
      this.TaskGroup.value.Status='Yes'
    } else {
      this.TaskGroup.value.Status='No'
    }
  }

  // send Task use users Function 
  SendTask(){
    this.TaskGroup.value
    console.log(this.TaskGroup.value);
    
this.service.Createtaskservice(this.TaskGroup.value).subscribe({
  next:(res:any)=>{
console.log(res);

  },
  error:(err:any)=>{
    console.log(err);
    
  }
})
  }
}
