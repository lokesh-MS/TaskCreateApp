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



  // getting time from db methods 

  getCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes: any = now.getMinutes();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDay();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Add leading zero to single-digit minutes
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var timeString =
      hours +
      ':' +
      minutes +
      ' ' +
      ampm +
      ' - ' +
      year +
      '/' +
      month +
      '/' +
      day;
    return timeString;
  }
  
}
