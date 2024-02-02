import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DbserviceService } from 'src/app/service/dbservice.service';
import { Chart } from 'angular-highcharts';
import accessibility from 'highcharts/modules/accessibility';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit ,OnChanges{
  constructor(private service: DbserviceService) {}
  TaskRecord = new Array<any>();
  filteredData = new Array<any>();
  reverArr: any = [];
  userName: any;
  notifyCount: any = 0;
  pendingCount:any=0
  completedCount:any=0;
  totalCount:any=0
  private currentProgress: number = 0;
  ngOnInit(): void {
    accessibility(Highcharts);
  }
ngOnChanges(changes: SimpleChanges): void {

  // this.GetAllTaskRecords();
}

  GetAllTaskRecords() {
    
    try {
      let C: number = 0;
      this.service.getTaskService().subscribe({
        next: async(res: any) => {
          this.TaskRecord = await res;
          this.filteredData=this.TaskRecord;
  
          // setTimeout(() => {
            this.filteredData.filter((data) => {
              let User = localStorage.getItem('userName');
             
          
            
              if (data.send_To == User) {
                this.totalCount++
                this.notifyCount++;
                // this.pendingCount++;
                if (data.is_Opened == 'yes'  ) {
                  this.notifyCount--;
                  this.pendingCount++;
                }
                if(data.status=='c'){
                 let c= this.completedCount++;
                 this.pendingCount--;
                 
               }
               this.pendingCount=this.pendingCount
              }
              localStorage.setItem('ToltalCount',this.totalCount)
              localStorage.setItem('completedCount', this.completedCount);
              localStorage.setItem('NCount', this.notifyCount);
              localStorage.setItem('pendingCound',this.pendingCount)
           
            });

          // }, 200);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } catch (err) {
      console.log(`Catch Error:-${err}`);
    }
  }
dataOfArray:any=[ { name: 'LD', y: 1, color: '#37B5B6' },

{ name: 'LPD', y: 2, color: '#F2F597' },

{ name: 'PPD', y: 3, color: '#D63484' },
{ name: 'WMS', y: 3, color: '#D63484' },
{ name: 'GLT', y: 4, color: '#AAD9BB' },
{ name: 'QUALITI LAB', y: 4, color: '#AAD9BB' },
{ name: 'REPORTS', y: 5, color: '#AAD9BB' },
{ name: 'VERIFICATION', y: 5, color: '#506ef9' },
{ name: 'MASTER', y: 5, color: '#DC84F3' },
{ name: 'DATA LOADER', y: 5, color: '#7077A1' },
{ name: 'PROFILE', y: 10, color: '#F6B17A' },

]

programerOfArray=[
  { name: 'Lokesh', y: 1, color: '#37B5B6' },

  { name: 'Pradeep', y: 2, color: '#F2F597' },

  { name: 'Sridhar', y: 3, color: '#D63484' },
  { name: 'Prasad', y: 4, color: '#AAD9BB' },
  { name: 'Sunil', y: 5, color: '#506ef9' },
];

DynamicDataArray:any=this.programerOfArray;
//first pie chart function

funPieChart(){
 

}
isHighcharts = typeof Highcharts === 'object';
Highcharts: typeof Highcharts = Highcharts;

chartOptions: Highcharts.Options = {
  
  chart: {
    type: 'pie',
    backgroundColor: '#80c2d459',
  },
  title: {
    text: 'GPI Web App Status',
    style: {
      color: '#333333',
      fontSize: '30px',
    },
  },
  series: [{
    type: 'pie',
    data: this.dataOfArray,
    name: 'MASTER',
    innerSize: '90%',
    showInLegend: true,
    dataLabels: {
      connectorWidth: 3,
      enabled: true,
      format: '<b>{point.name}</b>: {point.percentage:.1f}%',
    },
    events: {
      legendItemClick: function (event) {
          // Handle the legend item click event
          console.log('Legend item clicked:', this.name);
          
        
      }
  }
  },

],
  plotOptions: {
    pie: {
      slicedOffset: 12,
      dataLabels: {
        connectorWidth: 3,
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f}%',
      },
   
    },
  },
  legend: {
    enabled: true,
    labelFormatter: function () {
      // You can customize the legend label here
      return this.name;
  },
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
    itemStyle: {
      fontSize: '10px',
      fontFamily: 'initial'
    },
    itemDistance: 20
  },
};
// 2nd angular HighChart code
pieChart=new Chart({
  chart: {
    type: 'pie',
    plotShadow: false,
    backgroundColor: '#80c2d459',
  },

  credits: {
    enabled: false,
  },

  plotOptions: {
    pie: {
      innerSize: '98%',
      borderWidth: 10,
      borderColor: '',
      slicedOffset: 10,
      dataLabels: {
        connectorWidth: 3,
    //     enabled: true,
    // format: '<b>{point.name}</b>: {point.percentage:.1f}%',
      },
    },
  },

  title: {
    verticalAlign: 'middle',
    floating: true,
    text: 'Programer Status',
    
  },

  legend: {
    enabled: false,
    
  },

  series: [
    {
      type: 'pie',
      data: this.DynamicDataArray,
      size:'50%',
      innerSize: '99%',
      startAngle: -90,
      endAngle: 90,
      // center: ['50%', '75%'],
     
    },
  ],
})
projectDataArray:any= new Array<any>();
getAllProjectDataFun(){
  this.service.projectGet().subscribe({
    next:(res)=>{
console.log(res);
      this.projectDataArray=res
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
getProjectDataFun(id:any){
  this.service.singleProjectDetails(id).subscribe({
    next:(res)=>{

    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}
