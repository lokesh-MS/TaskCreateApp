import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  constructor( private http:HttpClient) { }
// url
LoginUrl='https://localhost/ReportWebApi/api/Login/authenticate';
//  SignupUrl='https://localhost/ReportWebApi/signUp';
 SignupUrl='https://localhost/ReportWebApi/api/signUp';
 CreateTaskUrl='https://localhost:7205/api/Task';
 GetTaskRecordsUrl='https://localhost:7205/api/Task'
// 
  LoginService(userData:any){
    return this.http.post(this.LoginUrl,userData);
  }
  SignUpService(userData:any){
    return this.http.post(this.SignupUrl,userData);
  }
  Createtaskservice(TaskData:any){
    return this.http.post(this.CreateTaskUrl,TaskData);
  }
  getTaskService(){
    return this.http.get(this.GetTaskRecordsUrl)
  }
}
