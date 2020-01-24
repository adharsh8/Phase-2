import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/Data/data.service';
import { Chart } from 'chart.js';
import { MatDialogRef } from '@angular/material';

//var CanvasJS = require('./canvasjs.min');

export class Data {  
  ProjectName :string;  
  TotalPeople:string;  
}
export class Stream {  
  StreamName :string;  
  TotalPeople:string;  
}
export class Status {  
  StatusInfo :string;  
  TotalPeople:string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart = [];
  Name = [];  
  Total = [];  
  Name1 = [];
  Total1 = [];
  Name2 = [];
  Total2 = [];
  data: Data[];
  stream : Stream[];
  status : Status[];
  typeofChart : string;
  dept : string;
  title : string;

  constructor(private dataservice : DataService,public dialogRef: MatDialogRef<ChartComponent>){}
  ngOnInit()
  {
    this.typeofChart = localStorage.getItem('chartType');
    if(this.typeofChart == 'projectchart')
    {
      this.projectchart();
    }
    else if(this.typeofChart == 'streamChart')
    {
      this.streamChart();
    }
    else if(this.typeofChart == 'statusChart')
    {
      this.statusChart();
    }
  }
  projectchart()
  {
    this.dept = localStorage.getItem('deptName');
    this.title = "Project Chart";
    this.dataservice.GetProjectChart(this.dept).subscribe((result: Data[])=>{
      result.forEach( x =>{
        this.Name.push(x.ProjectName);
        this.Total.push(x.TotalPeople);
        console.log(this.Name);
        console.log(this.Total);
        console.log(result);
      });
      this
      this.chart = new Chart('canvas',{
        type: 'pie',
        exportEnabled: true,
        animationEnabled: true,
        data:{
          labels : this.Name,
          datasets :[
            {
              data : this.Total,
              borderColor: '#3cba9f',  
                backgroundColor: [  
                  "#3cb371",  
                  "#0000FF",  
                  "#9966FF",  
                  "#4C4CFF",  
                  "#00FFFF",  
                  "#f990a7",  
                  "#aad2ed",  
                  "#FF00FF",  
                  "Blue",  
                  "Red",  
                  "Blue"  
                ],  
                fill: true  
            }
          ]
        },
        options: {  
          legend: {  
            display: true ,
            cursor: "pointer",	      
          },  
          scales: {  
            xAxes: [{  
              display: false  
            }],  
            yAxes: [{  
              display: false  
            }],  
          }  
        }  
      });
    }
    );
  }
  statusChart()
  {
    this.title = "Status Chart";
    this.dataservice.GetStatusChart().subscribe((result: Status[])=>{
      result.forEach( x =>{
        this.Name2.push(x.StatusInfo);
        this.Total2.push(x.TotalPeople);
        console.log(this.Name2);
        console.log(this.Total2);
        console.log(result);
      });
      this
      this.chart = new Chart('canvas',{
        type: 'pie',
        exportEnabled: true,
        animationEnabled: true,
        data:{
          labels : this.Name2,
          datasets :[
            {
              data : this.Total2,
              borderColor: '#3cba9f',  
                backgroundColor: [  
                  "#3cb371",  
                  "#0000FF",  
                  "#9966FF",  
                  "#4C4CFF",  
                  "#00FFFF",  
                  "#f990a7",  
                  "#aad2ed",  
                  "#FF00FF",  
                  "Blue",  
                  "Red",  
                  "Blue"  
                ],  
                fill: true  
            }
          ]
        },
        options: {  
          legend: {  
            display: true ,
            cursor: "pointer",
            
		      
          },  
          scales: {  
            xAxes: [{  
              display: false  
            }],  
            yAxes: [{  
              display: false  
            }],  
          }  
        }  
      });
    }
    );
  }
  streamChart()
  {
    this.title = "Stream Chart";
    this.dataservice.GetStreamChart().subscribe((result: Stream[])=>{
      result.forEach( x =>{
        this.Name1.push(x.StreamName);
        this.Total1.push(x.TotalPeople);
        console.log(this.Name1);
        console.log(this.Total1);
        console.log(result);
      });
      this
      this.chart = new Chart('canvas',{
        type: 'pie',
        exportEnabled: true,
        animationEnabled: true,
        data:{
          labels : this.Name1,
          datasets :[
            {
              data : this.Total1,
              borderColor: '#757575 ',  
                backgroundColor: [  
                  "#2196f3",  
                  "#7e57c2",  
                  "#9966FF",  
                  "#4C4CFF",  
                  "#00FFFF",  
                  "#f990a7",  
                  "#aad2ed",  
                  "#FF00FF",  
                  "Blue",  
                  "Red",  
                  "Blue"  
                ],  
                fill: true  
            }
          ]
        },
        options: {  
          legend: {  
            display: true ,
            cursor: "pointer",
            
		      
          },  
          scales: {  
            xAxes: [{  
              display: false  
            }],  
            yAxes: [{  
              display: false  
            }],  
          }  
        }  
      });
    }
    );
  }
  back()
  {
    this.dialogRef.close();
  }
}
