import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import {DataService} from 'src/app/Data/data.service';
import { Router } from '@angular/router';
import { ChartComponent } from '../chart/chart.component';
import { DatePipe } from '@angular/common';
import { EmployeeProject } from '../Data/EmployeeProject';

@Component({
  selector: 'app-displayproject',
  templateUrl: './displayproject.component.html',
  styleUrls: ['./displayproject.component.css'],
  providers: [DatePipe]
})
export class DisplayprojectComponent implements OnInit {

  constructor(private display : DataService, private router : Router,public dialog: MatDialog,
    private datePipe: DatePipe) { }
  displayedColumns: string[] = [ 'name', 'EmpId','stream', 'ProjectName','startdate','enddate','role','status'];
  dataSource = new MatTableDataSource();
  streamName : any;
  
  color: EmployeeProject = new EmployeeProject();
  result : any;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {

    this.streamName = localStorage.getItem('deptName');
    this.display.getdisplayEmployee(this.streamName).subscribe(
      data => {  this.dataSource=new  MatTableDataSource(data) as any ;
        console.log(this.dataSource);
        console.log(this.streamName);

        this.display.getColorList(this.streamName).subscribe(
        colorlist =>{
          this.result = colorlist;
          console.log(this.result[1].employeeId);
        
        
          //console.log(colorlist);
          //this.result = colorlist;
         // console.log(this.result);
        })
       } ,err=>{  
          console.log(err);  
        }  
    )

  }
chart(projchart : string)
{
  localStorage.setItem('chartType',projchart);
  //this.router.navigate(['chart']);
  const dialogRef = this.dialog.open(ChartComponent, {
    width: '850px',
    height : '550px'
});
dialogRef.afterClosed().subscribe(result => {
  console.log("Modal closed");
 });

}
}
