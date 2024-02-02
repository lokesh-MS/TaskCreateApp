import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { NotifyService } from 'src/app/service/notify.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {
  constructor(private service: DbserviceService, private fb: FormBuilder, private el: ElementRef,
    private renderer: Renderer2,private notify:NotifyService,private storage:StorageService){

  }
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
  projectArray:any=[]
  usersGroup!: FormGroup;
ngOnInit(): void {

  this.usersGroup = this.fb.group({
    // username:['', Validators.required],
    Username: ['', Validators.required],
    Password: ['', Validators.required],
    Repassword: ['', Validators.required],
    U_Created_date :[''],
    Role:['',Validators.required],
    // mySelect: ['']
  });
  this.GetProjectDetails()
}
UserSubmit(){
    
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

let currentTime = this.storage.getCurrentTime();
this.usersGroup.value.U_Created_date = currentTime.toString();
this.service.CreatUser(this.usersGroup.value).subscribe({
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
// Project On chenge event
selectedOption: any;
onProjectSelect(e:any){
  ;
// Get the selected value from the event
this.selectedOption = e.target.value;
console.log(this.selectedOption);
this.usersGroup.value.Project=this.selectedOption
}

// Role Chane event
onRoleSelect(e:any){
  // ;
// Get the selected value from the event
this.selectedOption = e.target.value;
console.log(this.selectedOption);
this.usersGroup.value.Role=this.selectedOption
}

// get Project List from Db
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
