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
BaseUrl='https://localhost:7205/api/Task';
//  GetTaskRecordsUrl='https://localhost:7205/api/Task'
pradeepUrl='https://localhost:7282/api/Country'
// 
  LoginService(userData:any){
    return this.http.post(this.LoginUrl,userData);
  }
  SignUpService(userData:any){
    return this.http.post(this.SignupUrl,userData);
  }
  Createtaskservice(TaskData:any){
    return this.http.post(this.BaseUrl,TaskData);
  }
  getTaskService(){
    return this.http.get(this.BaseUrl)
  }
  EditTask(id:any,data:any){
    return this.http.put(this.BaseUrl+'/'+id,data)
  }
  GetSingleTask(id:any){
    return this.http.get(this.BaseUrl+'/'+id)
  }
  pradeep(){
    return this.http.get(this.pradeepUrl)
  }
}
