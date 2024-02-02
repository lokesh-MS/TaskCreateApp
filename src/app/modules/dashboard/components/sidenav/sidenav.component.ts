import { Component, ElementRef, OnInit, Renderer2,DoCheck, OnChanges, SimpleChanges,Input,SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { NotificationComponent } from '../notification/notification.component';
import { AppearanceAnimation, ConfirmBoxInitializer, DialogLayoutDisplay, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
constructor(private router:Router,private el: ElementRef, private renderer: Renderer2, private sessionStorage:StorageService,private notifyCom:NotificationComponent,private dashbord:DashboardComponent,private service:DbserviceService){}
TaskRecord = new Array<any>();
  filteredData = new Array<any>();
  reverArr: any = [];
  userName: any;
  notifyCount: any = 0;
  pendingCount:any=0
  completedCount:any=0;
  totalCount:any=0

PendingCount:any=0;

notiCount:any=0;
Role:any;
ngOnInit(): void {
  let closeBtn = this.el.nativeElement.querySelector('#btn');
  let sidebar = this.el.nativeElement.querySelector('.sidebar');
  let searchBtn =  this.el.nativeElement.querySelector(".bx-search");


 this.Role= localStorage.getItem('Role')
  this.completedCount=  this.dashbord.completedCount
  this.userName= localStorage.getItem('userName')

  this.completedCount= localStorage.getItem('completedCount')
 
  this.notifyCount = 0;
  this.pendingCount=0
  this.completedCount=0;
  this.totalCount=0
this.GetAllTaskRecords();
  
}



ngOnChanges(changes: SimpleChanges): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.

  
}
  // logout function
   
  LogOut(){
    this.router.navigate(['/'])
     sessionStorage.clear();
     localStorage.removeItem('userName')
     localStorage.clear()
  }
  //search Function 
  search(e:any){

  }
getLocalStorageValues(){
  this.userName= this.sessionStorage.GetUser();
  this.PendingCount=  localStorage.getItem('pendingCound')

  this.notiCount= localStorage.getItem('NCount')

  this.completedCount=localStorage.getItem('completedCount')
}
  LogOutPopUp(){
      // standard typescript method.
  
      const newConfirmBox = new ConfirmBoxInitializer();

      newConfirmBox.setTitle('Are You Sure?');
      newConfirmBox.setMessage('Logout Your Account');

      // Choose layout color type
      newConfirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
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
            
            this.LogOut()
          }
         else{
          return
         }
        
        }
      });
  
  }


  userId:any;
GetAllTaskRecords() {
    
  try {
    let C: number = 0;
    this.service.getTaskService().subscribe({
      next: async(res: any) => {
        this.TaskRecord = await res;
        this.filteredData=this.TaskRecord;

        // setTimeout(() => {
          this.filteredData.filter((data) => {
            let User = localStorage.getItem('userName');
           
        
        
            if (data.send_To == User) {
             
            
              this.totalCount++
              if(data.is_Opened==null){
            this.notifyCount++
              }
              if(data.status!='c' && data.is_Opened=='yes'){
             
               this.pendingCount++
            
               
             }
           
            }
            this.completedCount=this.totalCount-this.pendingCount-this.notifyCount;
            this.pendingCount=this.pendingCount
            localStorage.setItem('ToltalCount',this.totalCount)
            localStorage.setItem('pendingCound',this.pendingCount)
            localStorage.setItem('completedCount', this.completedCount);
            localStorage.setItem('NCount', this.notifyCount);
           
          
          
            
            this.getLocalStorageValues();
          });
          
        // }, 200);
        this.InsertCountdetails()
      },
      error: (err: any) => {
        console.log(err);
      },
    });
   
  } catch (err) {
    console.log(`Catch Error:-${err}`);
  }
}

async InsertCountdetails(){
 

 await this.service.AllUserDetails().subscribe({
    next:(res:any)=>{
   
      res.filter((userdata:any)=>{
if(userdata.username== this.userName){
 
  this.userId= userdata.id
}
      })
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
  setTimeout(()=>{
    this.GetSignleProgerDetails()
  },100)
 
}

async GetSignleProgerDetails(){
  let userObj:any;
  if(this.userId!=undefined){
    this.service.SingleProgramerInfo(this.userId).subscribe({
      next: async (res) => {
        userObj = await res;
    
        setTimeout(() => {
         ;
          let totalStringCout: any = '0';
          let pendStringCout:any = '0';
          let compStringCout:any = '0';
let iscout=localStorage.getItem('ToltalCount')?.toString();
       if(iscout!=undefined) {
        totalStringCout= localStorage.getItem('ToltalCount')?.toString();

        pendStringCout=   localStorage.getItem('pendingCound')?.toString();
        compStringCout  = localStorage.getItem('completedCount')?.toString();
       }
       
          userObj.records_Count = totalStringCout;
          userObj.pending_Count = pendStringCout;
          userObj.completed_Count = compStringCout;
          this.service.EditUserDetails(this.userId, userObj).subscribe({
            next: () => {
            },
            error: (err) => {
              console.log(err);

            }
          });
        }, 300);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  
}
}
