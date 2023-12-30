import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
constructor(private sessionStorage:StorageService ){}
userName:any;
ngOnInit(): void {
  this.userName= this.sessionStorage.GetUser();
}
}
