import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  constructor( private http:HttpClient) { }
// url
LoginUrl='https://localhost:7205/api/Login/authenticate';
BaseUrl='https://125.20.158.150/TASKAPI/api/';
// myLocalIIS_URL='https://localhost:7205/api/';
myLocalIIS_URL='http://localhost/TaskApi/api/';
//  SignupUrl='https://localhost/ReportWebApi/signUp';http://localhost/ReportWebApi/api/UserInfo
 SignupUrl='https://localhost:7205/api/signUp';
// BaseUrl='https://localhost:7205/api/Task';
userInfo='https://localhost:7205/api/'
//  GetTaskRecordsUrl='https://localhost:7205/api/Task'
pradeepUrl='https://localhost:7282/api/Country'
// 
  LoginService(userData:any){
    return this.http.post(this.myLocalIIS_URL+'Login/authenticate',userData);
  }
  SignUpService(userData:any){
    return this.http.post(this.myLocalIIS_URL+'signUp',userData);
  }
  Createtaskservice(TaskData:any){
    return this.http.post(this.myLocalIIS_URL+'task',TaskData);
  }
  getTaskService(){
    // return this.http.get(this.myLocalIIS_URL+'task')
    return this.http.get('http://localhost/TaskApi/api/task')
  }
  EditTask(id:any,data:any){
    debugger
    return this.http.put(this.myLocalIIS_URL+'task/'+id,data)
  }
  GetSingleTask(id:any){
    return this.http.get(this.myLocalIIS_URL+'task/'+id)
  }
PostUserInfo(data:any){
  debugger
return this.http.post(this.myLocalIIS_URL+'UserInfo',data)
}
GetUsersInfo(){
  return this.http.get(this.myLocalIIS_URL+'UserInfo')
}
GetUserInfo(id:any){
  debugger
  return this.http.get(this.myLocalIIS_URL+'UserInfo/'+id)
}

}
