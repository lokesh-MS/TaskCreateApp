import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit{
  constructor(){}
  dataCount = new Array<any>();
  taskArray=new Array<any>();
  ngOnInit(): void {
    
  }
  ViewTask(){
    
  }
}
