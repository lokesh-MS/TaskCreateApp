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
ngOnInit(): void {
  this.GetUserInformation() 
}
onSelect(event: any) {

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
    this.service.GetUsersInfo().subscribe({
      next: (res: any) => {
        this.userNameArray = res;
        // console.log(this.TotalRecords);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  } catch (err) {
    console.log(`Catch Error:-${err}`);
  }
}

filterRecord(){
  if(this.TotalRecords.length>0){
    this.TotalRecords.filter((item:any)=>{
      if(item.send_To==this.selectedOption && item.status=='c'){
        this.CompletedRecordsArray.push(item)
      }
        })
  }

}
Export(){

  try{
    debugger
    this.service.ExportToExcel().subscribe({

      next:(res)=>{
        debugger
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'exported_data.xlsx';
      link.click();
        
      },
      error:(err)=>{
        debugger
        console.log(`err:-`,err);
        
      }
    })
  }
  catch(ex){
console.log(`exception${ex}`);

  }

}
}
