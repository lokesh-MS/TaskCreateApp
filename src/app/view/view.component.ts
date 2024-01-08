import { Component, OnInit } from '@angular/core';
import { DbserviceService } from '../service/dbservice.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
constructor(private service : DbserviceService,private storage:StorageService,private router:Router){

}
singleData=new Array<any>();

ngOnInit(): void {
 let ID= this.storage.GetTaskId()
 this.getSingleRecord(ID)
}

async getSingleRecord(id:any){
  try{
    debugger
  await  this.service.GetSingleTask(id).subscribe({
      next:(res=>{
  this.singleData.push(res)
  // console.log(this.singleData);
  
      }),
      error:(err=>{
  
      })
    })
  }
  catch(err){
console.log(`Catch Error:-${err}`);

  }

}

GoBack(){
this.router.navigateByUrl("dashboard")
}
}
