import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
constructor(private service:DbserviceService,private fb:FormBuilder,  private renderer: Renderer2){}
projectArray:any=[]
dynamicForm !:FormGroup;
ngOnInit(): void {
  this.GetProjectDetails()
  this.dynamicForm  = this.fb.group({
    moduleName:[''],
    screenName: this.fb.array([]),
    sCount:[''],
    completed_Count:[''],
    pending_Count:[''],
    status:['']
  })
  this.addDynamicControl();
}

addDynamicControl() {
  const newControl = this.fb.control('', Validators.required);
  this.screenName.push(newControl);
}
 // Method to remove a dynamic control
 removeDynamicControl(index: number) {
  this.screenName.removeAt(index);
}
// Helper method to get the form array
get screenName() {
  return this.dynamicForm.get('screenName') as FormArray;
}
myObject: any;
LoaclAraray = new Array<any>();
Exist_Module_Data:any;
DynamicObjectName:any;
onSubmit(formdata:any){
  debugger
  let newScreenCount:number=0;
console.log(formdata,'formData');
console.log(this.dynamicForm.value.sCount);
  this.DynamicObjectName=this.dynamicForm.value.moduleName;

let dynamicformData=this.dynamicForm.value;
this.Exist_Module_Data=this.projectObject.module_Screens_Details;
if(this.projectObject.module_Screens_Details !=null && this.projectObject.module_Screens_Details !=""){
  this.Exist_Module_Data =   JSON.parse(this.projectObject.module_Screens_Details); 
}

   
    // Exist_Module_Data+= JSON.stringify(dynamicformData);
    
    this.myObject = {
       dynamicformData
    }
    if(this.Exist_Module_Data==""){
     this.LoaclAraray=[];
     this.dynamicForm.value.sCount=dynamicformData.screenName.length;
     this.dynamicForm.value.pending_Count=dynamicformData.screenName.length;
     this.LoaclAraray.push(this.myObject)
     this.projectObject.module_Screens_Details= JSON.stringify(this.LoaclAraray) ;
     for(let i=0; i<this.LoaclAraray.length;i++){
      console.log(this.LoaclAraray[i].dynamicformData.moduleName);
      this.Module_Name=this.LoaclAraray[i].dynamicformData.moduleName;
      this.projectObject.Module_Count=this.LoaclAraray.length.toString();
      console.log(this.LoaclAraray[i].dynamicformData.screenName.length);
    
     newScreenCount=  this.LoaclAraray[i].dynamicformData.screenName.length;
    
     }
    }
    else{
      this.dynamicForm.value.sCount=dynamicformData.screenName.length;
      this.dynamicForm.value.pending_Count=dynamicformData.screenName.length;
      this.Exist_Module_Data.push(this.myObject);
      this.projectObject.module_Screens_Details= JSON.stringify(this.Exist_Module_Data) ;

      for(let i=0; i<this.Exist_Module_Data.length;i++){
        console.log(this.Exist_Module_Data[i].dynamicformData.moduleName);
        this.Module_Name=this.Exist_Module_Data[i].dynamicformData.moduleName;
        this.projectObject.Module_Count=this.Exist_Module_Data.length.toString();
        console.log(this.Exist_Module_Data[i].dynamicformData.screenName.length);
        let ExitsScreenCount=this.Exist_Module_Data[i].dynamicformData.screenName.length;
      
newScreenCount+=  ExitsScreenCount;
      
      
      
       }
    
    }
    // this.dynamicForm.value.sCount=newScreenCount.toString();
    this.projectObject.Screen_Count=newScreenCount.toString();

this.service.ProjectEdit(this.selectedOption,this.projectObject).subscribe({
  next:(res)=>{
console.log(`respon`,res);

  },
  error:(err)=>{
console.log(err);

  }
})
  this.dynamicForm.reset()
}
selectedOption: any;
arrayOfObjects: any = new Array<any>();
projectObject:any;
ModuleCount:any;
Module_Name:string="";
ScreenCount:any;
onProjectSelect(e:any){

// Get the selected value from the event
  this.isAddProjectDetails=false;
  this.isTable=true;
  this.IsUpadte=false;
this.selectedOption = e.target.value.toString();

this.service.singleProjectDetails(this.selectedOption).subscribe({
  next:async(res)=>{
  this.projectObject=res;
 console.log(res);

  if(this.projectObject.module_Screens_Details!=""){
    console.log(this.projectObject.module_Screens_Details);
  let Array_Length=  JSON.parse(this.projectObject.module_Screens_Details)


  }

 
    if (this.arrayOfObjects.length > 0) {
      this.arrayOfObjects = this.arrayOfObjects.slice(1);
    }

    if (this.arrayOfObjects.length == 0) {
      this.arrayOfObjects.push(res);
   
      
    }
   
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}
GetProjectDetails(){


  this.service.projectGet().subscribe({
    next:async(res)=>{ 
      this.projectArray=  await res
    },error:(err)=>{
console.log(`ProjectArray:-${err}`);

    }
  })
}
isAddProjectDetails:boolean=false;
isTable:boolean=false;
IsUpadte:boolean=false;
@ViewChild('mySpan', { static: false }) mySpan!: ElementRef;
project_Name="";
addProjectDetails(){
 let ele= document.getElementById('project')

 if (this.mySpan) {
  const spanValue = this.mySpan.nativeElement.textContent;
  this.project_Name=spanValue;

}
 
this.isAddProjectDetails=true;

this.IsUpadte=false
}
ModuleObjArray:any=[];
DailyUpdate(){
  debugger
  this.ModuleObjArray=[]
this.isAddProjectDetails=false;
 this.isTable=false
 this.IsUpadte=true
 console.log(this.arrayOfObjects[0].module_Screens_Details);
  let localArray=  JSON.parse(this.arrayOfObjects[0].module_Screens_Details)
  for(let i=0;i<localArray.length;i++){
    console.log(localArray[i].dynamicformData);
    this.ModuleObjArray.push(localArray[i].dynamicformData);
  }

  
 console.log('ModuleN',this.ModuleObjArray);
 
}
IsEdit:boolean=false;
inputVal:any;
Edit(id:any){

  this.IsEdit=true
console.log(document.getElementById(id));

let InputEle=document.getElementById(id);



let editBtn=document.getElementById('edit'+id);
let updateBtn=document.getElementById('update'+id);
let updatetd=document.getElementById('Updatetd'+id);
// this.renderer.setStyle(updatetd, 'display', 'block');
this.renderer.setStyle(InputEle, 'display', 'block');
// this.renderer.setStyle(updateBtn, 'display', 'block');
this.renderer.setStyle(editBtn, 'display', 'none');
this.renderer.setStyle(updateBtn, 'display', 'block');



}
Update(id:any){
debugger
let projectId=this.arrayOfObjects[0].id
let localProjectArray:any=[];
  const inputElement = document.getElementById(id) as HTMLInputElement;
  
    const inputValue = inputElement.value;
   let ExistScreen_Count= document.getElementById('s_count'+id)?.innerHTML;
    console.log('Input Value:', inputValue);
    if(inputValue!=""){
      if(Number(inputValue)>Number(ExistScreen_Count)){
        this.renderer.setStyle(inputElement, 'border', '2px solid red');
alert('input must lessthen total screen count!');
      }
      else{
        this.service.singleProjectDetails(projectId).subscribe({
          next:async(res)=>{
            // console.log(res);
            await localProjectArray.push(res)
            this.ChangeProjectDetails(localProjectArray,id,inputValue);
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      }
    }
   else{
    this.renderer.setStyle(inputElement, 'border', '2px solid red');
   }
}

ChangeProjectDetails(data:any,id:any,inputval:any){
 console.log(data);
let projectId=data[0].id;
// console.log('modul',document.getElementById('moduleName'+id)?.innerHTML);

data.filter((data1:any)=>{
// console.log(data1.module_Screens_Details);

let moduleData= JSON.parse(data1.module_Screens_Details) ;

moduleData.filter((data2:any)=>{

if(data2.dynamicformData.moduleName==document.getElementById('moduleName'+id)?.innerHTML){
  // console.log(data2.dynamicformData.moduleName);
let pending =  data2.dynamicformData.pending_Count;
let total =  data2.dynamicformData.sCount;
debugger
if(pending>0){
  pending = total - Number(inputval);
}
else{
  pending =total - Number(inputval);
}
data2.dynamicformData.pending_Count =pending;
 data[0].module_Screens_Details ;
 data2.dynamicformData.completed_Count=inputval;
   let d= JSON.parse(data[0].module_Screens_Details)
  d.forEach((element:any,i:any) => {
  
    if(element.dynamicformData.moduleName==data2.dynamicformData.moduleName){
      console.log('foreach',element.dynamicformData.moduleName);
      d.splice(i,1)
    }
  });
   d.push(data2);
   data[0].module_Screens_Details=JSON.stringify(d);
   data.forEach((ele:any)=>{
   let module$= ele.module_Screens_Details;
   module$= JSON.parse(module$);
     let Complte =module$[0].dynamicformData.completed_Count;
     let total =module$[0].dynamicformData.sCount;

  let  percentage =(Complte/total)*100;
  console.log(percentage,'%');
  module$[0].dynamicformData.complet_Percent=percentage;
  module$[0].dynamicformData.pending_Percent=100-Number(percentage);
  // data2.dynamicformData.
  let arr = [];
  arr.push(module$[0])
  data[0].module_Screens_Details=JSON.stringify(arr);
   })
  this.service.ProjectEdit(projectId,data[0]).subscribe({
    next:(res)=>{
console.log(res);
let newUpdate:any=res
// location.reload();
    this.service.singleProjectDetails(this.selectedOption).subscribe({
      next:(res:any)=>{
        this.ModuleObjArray.pop();
      let newModuleData= res.module_Screens_Details;
      newModuleData = JSON.parse(newModuleData);
     newModuleData = newModuleData[0].dynamicformData;
        this.ModuleObjArray .push(newModuleData);
      
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    },
    error:(err)=>{

    }
  })
}
})
})
}
}
