import { Component } from '@angular/core';
import { DbserviceService } from 'src/app/service/dbservice.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  constructor(private service: DbserviceService){

  }
  
ngOnInit(): void {
 
}


}
