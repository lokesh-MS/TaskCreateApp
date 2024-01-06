import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/service/dbservice.service';
declare var $: any;
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit, AfterContentChecked {
  constructor(private service: DbserviceService, private fb: FormBuilder) {}
  AllDetailsArr = new Array<any>();
  searchTerm = '';
  filteredArray = new Array<any>();

  searchGroup!: FormGroup;
  ngOnInit(): void {
    this.searchGroup = this.fb.group({
      userInput: ['', Validators.required],
    });
    this.GetUserInformation();
  }

  ngAfterContentChecked(): void {
    // console.log('user',this.AllDetailsArr);
  }
  GetUserInformation() {
    try {
      this.service.GetUsersInfo().subscribe({
        next: (res: any) => {
          this.AllDetailsArr = res;
          console.log(this.AllDetailsArr);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } catch (err) {
      console.log(`Catch Error:-${err}`);
    }
  }
  arrayOfObjects: any = new Array<any>();
  singleDataArray: any = [];
  result: boolean = false;
  // async search() {
  //   let Search_Item = this.searchGroup.value.userInput;
  //   if (Search_Item == '') {
  //     debugger;
  //     let ele = document.getElementById('input');
  //     //  console.log(ele);
  //     $('#input').addClass('borderStyle');
  //     //  $('#input').addClass('borderStyle')

  //     return;
  //   } else if (this.AllDetailsArr.length > 0) {
  //     debugger
  //     const searchLowerCase = Search_Item;

  //     this.filteredArray = await this.AllDetailsArr.filter((item: any, i) => {
  //       let name = item.firstName.toLowerCase();
  //       // console.log(item.firstName);
  //       if (searchLowerCase == item.userName) {
  //         // console.log(item.id);

  //         this.service.GetUserInfo(item.id).subscribe({
  //           next: (res) => {
  //             debugger
  //             if (this.arrayOfObjects.length > 0) {
  //               this.arrayOfObjects = this.arrayOfObjects.slice(1);
  //             }

  //             if (this.arrayOfObjects.length == 0) {
  //               this.arrayOfObjects.push(res);
  //             }
  //             console.log(res);
  //             console.log(this.arrayOfObjects);
  //           },
  //           error: (err) => {},
  //         });
  //         // this.arrayOfObjects=item
  //         // this.result=true
  //       }
  //       this.result=false
  //       return
  //     });

  //     if( this.arrayOfObjects.length==0){
  //       this.result=true
  //     }
  //   }
  // }

  selectedOption: any;
  onSelect(event: any) {
    debugger;
    try {
      // Get the selected value from the event
      this.selectedOption = event.target.value;
      console.log(this.selectedOption);
      this.service.GetUserInfo(this.selectedOption).subscribe({
        next: (res) => {
          // this.arrayOfObjects.push(res);
          if (this.arrayOfObjects.length > 0) {
            this.arrayOfObjects = this.arrayOfObjects.slice(1);
          }

          if (this.arrayOfObjects.length == 0) {
            this.arrayOfObjects.push(res);
          }
        },
        error: (err) => {},
      });
    } catch (err) {
      console.log(`Catch Error:-${err}`);
    }
  }
}
