import { AfterContentChecked, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { NotifyService } from 'src/app/service/notify.service';
import { StorageService } from 'src/app/service/storage.service';
declare var $: any;
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit, AfterContentChecked {
  constructor(private service: DbserviceService, private fb: FormBuilder, private el: ElementRef,
    private renderer: Renderer2,private notify:NotifyService,private storage:StorageService) {}
  AllDetailsArr = new Array<any>();
  searchTerm = '';
  filteredArray = new Array<any>();

  searchGroup!: FormGroup;
  usersGroup!: FormGroup;
  ProjectGroup!:FormGroup;
    // userCreate method
    RoleArray=[
      {role:'Admin',
      RoleId:1
    },
    {
      role:'TL',
      RoleId:2
    },
    {
      role:'Programer',
      RoleId:3
    }
    ];
  ngOnInit(): void {
    this.searchGroup = this.fb.group({
      userInput: ['', Validators.required],
    });
    this.usersGroup = this.fb.group({
      // username:['', Validators.required],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Repassword: ['', Validators.required],
      U_Created_date :[''],
      Role:['',Validators.required],
      // mySelect: ['']
    });
    this.ProjectGroup = this.fb.group({
      Project_Name:['',Validators.required],
      Project_Head:['',Validators.required],
      Project_Location:['',Validators.required],
      Project_Duration:['',Validators.required]
    })
    this.GetUserInformation();
    this.GetProjectDetails()
  }

  ngAfterContentChecked(): void {
    // console.log('user',this.AllDetailsArr);
  }
  GetUserInformation() {
    try {
      this.service.GetUsersInfo().subscribe({
        next: (res: any) => {
          this.AllDetailsArr = res;
          console.log(this.AllDetailsArr);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } catch (err) {
      console.log(`Catch Error:-${err}`);
    }
  }
  arrayOfObjects: any = new Array<any>();
  singleDataArray: any = [];
  result: boolean = false;


  selectedOption: any;
  isUserDetails=false;
  onSelect(event: any) {
    debugger;
    try {
      this.isUserDetails=true
      // Get the selected value from the event
      this.isProjectCreate=false;
      this.isUserCreate=false
      this.selectedOption = event.target.value;
      console.log(this.selectedOption);
      this.service.GetUserInfo(this.selectedOption).subscribe({
        next: (res) => {
          // this.arrayOfObjects.push(res);
          if (this.arrayOfObjects.length > 0) {
            this.arrayOfObjects = this.arrayOfObjects.slice(1);
          }

          if (this.arrayOfObjects.length == 0) {
            this.arrayOfObjects.push(res);
          }
        },
        error: (err) => {},
      });
    } catch (err) {
      console.log(`Catch Error:-${err}`);
    }
  }




  onRoleSelect(e:any){
    debugger;
 // Get the selected value from the event
 this.selectedOption = e.target.value;
 console.log(this.selectedOption);
this.usersGroup.value.Role=this.selectedOption
  }
  onProjectSelect(e:any){
    debugger;
 // Get the selected value from the event
 this.selectedOption = e.target.value;
 console.log(this.selectedOption);
this.usersGroup.value.Project=this.selectedOption
  }

  isUserCreate=false;
  isProjectCreate=false;
  CreateUser(){
    this.isValid=false
    this.isProjectCreate=false
    this.isUserDetails=false
    this.isUserCreate=true;
    this.GetProjectDetails()
  }
  UserSubmit(){
    debugger
    let Username=this.usersGroup.value.Username
    let Password=this.usersGroup.value.Password
    let RePassword=this.usersGroup.value.Repassword
    let Role=this.usersGroup.value.Role
    // let Username=this.usersGroup.value.Username
 if(Username=="" || Username==null){
 
  let UsernameInput = this.el.nativeElement.querySelector('#user');

  this.renderer.setStyle(UsernameInput, 'border-color', 'red');
 return
}
else if(Password=="" || Password==null){

  let passIdInput = this.el.nativeElement.querySelector('#pwd1');

 this.renderer.setStyle(passIdInput, 'border-color', 'red');
 return
}
 else if(RePassword=="" || RePassword==null){
  
  let RepassIdInput = this.el.nativeElement.querySelector('#pwd2');

  this.renderer.setStyle(RepassIdInput, 'border-color', 'red');
  return
}
 else if(Role==""||Role==null){
  this.notify.showError("Please Select User Role","User Create")
  return
}
else{
debugger
  let currentTime = this.storage.getCurrentTime();
  this.usersGroup.value.U_Created_date = currentTime.toString();
  this.service.SignUpService(this.usersGroup.value).subscribe({
    next: (res: any) => {
      this.notify.showSuccess('Created Successfully', 'userCreate!');
 
      // this.usersGroup.get('mySelect').setValue('option1');
      // this.router.navigate([""])
      this.usersGroup.reset();

    },
    error: (err: any) => {

      this.notify.showError(err.error.message, 'userCreate');
      console.log(err.error);
    },
  });
}
  }
  // project Create
  CreateProject(){
    this.isValid=false
    this.isUserCreate=false;
    this.isUserDetails=false
    this.isProjectCreate=true
  }
  checkExist(){
    this.isValid=false
  }
  isValid=false
  projectSubmit(){
debugger
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
  projectArray:any=[]
  GetProjectDetails(){
    this.service.projectGet().subscribe({
      next:async(res)=>{ 
        this.projectArray=  await res
      },error:(err)=>{
console.log(`ProjectArray:-${err}`);

      }
    })
  }
}
