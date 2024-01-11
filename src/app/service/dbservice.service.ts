import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  constructor( private http:HttpClient) { }
// url
LoginUrl='https://localhost:7205/api/Login/authenticate';
exportExcelUrl='https://localhost:7205/api/Task/export'
OfficeUrl='http://192.168.0.180:8034/api/'  //UserInfo
FileUploadUrl='https://localhost:7205/UploadFile';
FileDownloadUrl='https://localhost/ReportWebApi/DownloadFile?filename='
publicIp='http://125.20.158.150/TASKAPI/api/'//userinfo
BaseUrl='https://125.20.158.150/TASKAPI/api/';
myLocalIIS_URL='http://localhost/TaskApi/api/';

  LoginService(userData:any){
    return this.http.post(this.publicIp+'Login/authenticate',userData);
  }
  AllUserDetails(){
    return this.http.get(this.publicIp+'Login');
  }
  SignUpService(userData:any){
    return this.http.post(this.publicIp+'signUp',userData);
    //return this.http.post('https://localhost:7205/api/signUp',userData);
  }
 
  Createtaskservice(TaskData:any){
    return this.http.post(this.publicIp+'task',TaskData);
  }
  getTaskService(){
    
     return this.http.get(this.publicIp+'task')
    // return this.http.get('http://localhost/TaskApi/api/task')
  }
  EditTask(id:any,data:object){
    
    return this.http.put(this.publicIp+'task/'+id,data)
  }
  DeleteTask(id:any){
return this.http.delete(this.publicIp+'task/'+id)
  }
  GetSingleTask(id:any){
    return this.http.get(this.publicIp+'task/'+id)
  }
PostUserInfo(data:any){
  
return this.http.post(this.publicIp+'UserInfo',data)
}
GetUsersInfo(){
  return this.http.get(this.publicIp+'UserInfo')
}
GetUserInfo(id:any){
  
  return this.http.get(this.publicIp+'UserInfo/'+id)
}
FileUpload(data: any) {
  
  console.log( data);
  return this.http.post(this.FileUploadUrl,data,{responseType: 'text'});

}
downloadFile(filename: string): Observable<Blob> {
  const url = `${this.FileDownloadUrl}${filename}`;

  // Set the responseType to 'blob' to handle binary data
  return this.http.get(url, { responseType: 'blob' });
}

ExportToExcel(){
  return this.http.get(this.publicIp+'Task/export', { responseType: 'arraybuffer' })
}
ProjectCraete(data:any){
 
 return this.http.post(this.publicIp+'Project',data)
}

projectGet(){
  // return this.http.get('https://localhost:7205/api/Project')
  return this.http.get(this.publicIp+'Project')
}
}
