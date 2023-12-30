import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  StoreToken(tokenValue:any){
    sessionStorage.setItem('token', tokenValue);
  }
  GetToken(){
    return sessionStorage.getItem('token')
  }
  StoreUser(Username:any){
    sessionStorage.setItem('userName',Username)
  }
  GetUser(){
    return sessionStorage.getItem('userName')
  }

  StoreTaskId(id:any){
    return sessionStorage.setItem('taskID',id)
  }
  GetTaskId(){
    return sessionStorage.getItem('taskID')
  }



  // getting data from db methods 
  
}
