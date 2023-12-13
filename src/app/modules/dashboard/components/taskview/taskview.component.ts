import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/service/dbservice.service';
declare var $:any;
@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.css']
})
export class TaskviewComponent implements OnInit{
constructor(private service:DbserviceService,private router:Router ){

}

ngOnInit(): void {
  
}
commentShowFun(){
  $('#addcomment').addClass('commentShow')
  let el: HTMLElement | null = document.getElementById('addcomment');

  if (el) {
    el.style.display = 'block';
  }
  
 console.log(el);
 
}

// checkBox function
onCheckboxChange(event: any) {
  // Handle checkbox change here
  if (event.target.checked) {
    console.log('Checkbox is checked');
  } else {
    console.log('Checkbox is unchecked');
  }
}
GoBack(){
  // this.router.navigateByUrl('TaskList')
  this.router.navigate(["dashboard/TaskList"])
  console.log('cls');
  
}
}
