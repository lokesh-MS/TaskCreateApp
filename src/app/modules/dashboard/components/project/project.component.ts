import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { NotifyService } from 'src/app/service/notify.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
constructor(private service: DbserviceService, private fb: FormBuilder, private el: ElementRef,
  private renderer: Renderer2,private notify:NotifyService,private storage:StorageService){}
ProjectGroup!:FormGroup;
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.ProjectGroup = this.fb.group({
    Project_Name:['',Validators.required],
    Project_Head:['',Validators.required],
    Project_Location:['',Validators.required],
    Project_Duration:['',Validators.required]
  })
}
checkExist(){
  this.isValid=false
}
isValid=false

projectSubmit(){

  let projectname=  this.ProjectGroup.value.Project_Name

if(projectname=="" || projectname==null){
this.isValid=true
}
else{
  let duration=  this.ProjectGroup.value.Project_Duration.toString();
  this.ProjectGroup.value.Project_Duration=duration;
  let ProjectdataObj = this.ProjectGroup.value
   ProjectdataObj.Project_Created_Date=this.storage.getCurrentTime()
  this.service.ProjectCraete(ProjectdataObj).subscribe({
    next:(res)=>{
console.log(res);
this.notify.showSuccess("Created Successfully!","Project")
this.ProjectGroup.reset();
    },
    error:(err)=>{
console.log(`project Creation Err:-${err.error}`);
this.notify.showError("Error Project Creation!","Project")
    }
  })
}
  }
}
