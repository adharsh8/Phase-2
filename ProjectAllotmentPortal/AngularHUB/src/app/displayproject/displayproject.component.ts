import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import {DataService} from 'src/app/Data/data.service';
import { Router } from '@angular/router';
import { ChartComponent } from '../chart/chart.component';
import { DatePipe } from '@angular/common';
import { EmployeeProject } from '../Data/EmployeeProject';

@Component({
  selector: 'app-displayproject',
  templateUrl: './displayproject.component.html',
  styleUrls: ['./displayproject.component.css'],
  
})
export class DisplayprojectComponent implements OnInit {

  constructor(private display : DataService, private router : Router,public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  displayedColumns: string[] = [ 'name', 'EmpId','stream', 'ProjectName','startdate','enddate','role','status'];
  dataSource = new MatTableDataSource();
  streamName : any;
  Id : number;
  status : string;
  color: EmployeeProject = new EmployeeProject();
  result : any;
  final : string;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {

    this.streamName = localStorage.getItem('deptName');
    this.display.getdisplayEmployee(this.streamName).subscribe(
      data => {  this.dataSource=new  MatTableDataSource(data) as any ;
       
        this.display.getColorList(this.streamName).subscribe(
        colorlist =>{
          this.result = colorlist;
          
          colorlist.forEach(element => {
          
            if(element.StatusInfo == "Deployed")
            {
              this.Id= element.EmployeeStream_Id;
              console.log(this.Id);
              element.StatusInfo = "Reallocate";
              this.status = element.StatusInfo;
              this.display.UpdateEmployeeProjStatus(this.Id,this.status).subscribe(
                results =>  this.openSnackBar(results,'Close'),
                error =>  this.openSnackBar(error.error.message,'Close')
              );            
            }
            this.final = element.StatusInfo;
            console.log(this.final);
          });
        })
       } ,err=>{  
          console.log(err);  
        }  
    )

  }
  openSnackBar(message: any, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
    this.router.navigate(['display-project']);
  }
chart(projchart : string)
{
  localStorage.setItem('chartType',projchart);
  const dialogRef = this.dialog.open(ChartComponent, {
    width: '850px',
    height : '550px'
});
dialogRef.afterClosed().subscribe(result => {
  console.log("Modal closed");
 });

}
ExtendProject(value)
{
  localStorage.setItem('Project-Id',value.EmployeeStream_Id);
  localStorage.setItem('Project-status',value.StatusInfo);
  this.router.navigate(['add-project']);
}


}
