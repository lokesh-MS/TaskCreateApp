import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-total-records',
  templateUrl: './total-records.component.html',
  styleUrls: ['./total-records.component.css']
})
export class TotalRecordsComponent implements OnInit {
constructor(private service:DbserviceService){}
TotalRecords:any=[];
CompletedRecordsArray=new Array<any>();
userNameArray=new Array<any>();
selectedOption: any
usersListArray:any=[];
ProjectListArray:any=[];
completedCount:any=0;
pendingCount:any=0;
ngOnInit(): void {
  this.GetUserInformation() ;
  this.Records()
 this.completedCount= localStorage.getItem('completedCount');
 this.pendingCount=localStorage.getItem('pendingCound')
}
onSelect(event: any) {
debugger
  this.selectedOption = event.target.value;

  this.service.getTaskService().subscribe({
    next:(res)=>{
this.TotalRecords=res
if(this.TotalRecords.length>0){
  this.filterRecord()
}
    },
    error:(err)=>{

    }
  })
}

GetUserInformation() {
  try {
    this.service.AllUserDetails().subscribe({
      next: (res: any) => {
        this.userNameArray = res;
         console.log(this.TotalRecords);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  } catch (err) {
    console.log(`Catch Error:-${err}`);
  }
}
UserTaskArray:any=new Array<any>();
default=false;
Project_Head=true
Is_Records=true
ExportName:any;
message:string="";
IsMessage:boolean=false;
filterRecord(){
 
 this.default=true;
 this.Project_Head=false;
 this.Is_Records=false
 this.usersListArray.splice(0,this.usersListArray.length)
  if(this.TotalRecords.length>0){
    
    this.TotalRecords.filter(async(item:any)=>{
      if(item.send_To==this.selectedOption && item.status=='c'){
        // if(this.usersListArray.length>0){
        //   this.usersListArray.splice(0, this.usersListArray.length);
        //   if(this.usersListArray.length==0){
        //     this.usersListArray.push(item)
        //   }
        // }
        this.IsMessage=false;
     this.ExportName=item.send_To
    this.usersListArray.push(item)
        
          
        
   
    
      }

else{
  this.IsMessage=true;
  this.message="No Data Availabe!";
}


        })
  }
 
  
}
Export(){

  try{
   
    if(this.default==true){
      this.service.singleExportToExcel(this.ExportName).subscribe({

        next:(res)=>{
         
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'exported_data.xlsx';
        link.click();
          
        },
        error:(err)=>{
         
          console.log(`err:-`,err);
          
        }
      })
    }
    else{
this.service.AllExportToExcel().subscribe({

  next:(res)=>{
   
    const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'exported_data.xlsx';
  link.click();
    
  },
  error:(err)=>{
   
    console.log(`err:-`,err);
    
  }
})
    }
 
  }
  catch(ex){
console.log(`exception${ex}`);

  }

}
recordCount:any;
Records(){
 this.recordCount= localStorage.getItem('ToltalCount')
  this.service.AllUserDetails().subscribe({
    next:(res)=>{
      
      this.usersListArray=res
      console.log(this.usersListArray);
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
 
}
refreshPage() {
  // Trigger a page refresh
  location.reload();
}
}
