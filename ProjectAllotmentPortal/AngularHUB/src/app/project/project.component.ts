import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectAllotment } from '../Data/ProjectAllotment';
import { EmployeeProject } from '../Data/EmployeeProject';
import { DataService } from '../Data/data.service';
import { MatTableDataSource, MatDialog, MatTable } from '@angular/material';
import { StatusModalComponent } from './status-modal/status-modal.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  displayedColumns: string[] = ['Employee Id', 'Employee Name', 'EmployeeMailId','StreamName','Status','Action','Add Project'];
  dataSource = new MatTableDataSource<any>();

  empproj : EmployeeProject = new EmployeeProject();
  allotment : ProjectAllotment = new ProjectAllotment();
  displaystream :any;
  datum : any;
  streamName : any;
  Id : number;
  status : string;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(private router: Router, private dataservice : DataService, public dialog: MatDialog,
    formBuilder: FormBuilder) {}

  ngOnInit():void {
    //this.dataservice.strType$.subscribe(message=>{ 
     // this.displaystream = message;
     // this.datum = this.displaystream.StreamName; 
      //this.displaytable(this.datum);
      //console.log('->' +this.dataSource);     }); 
      
      this.streamName = localStorage.getItem('deptName');
      this.dataservice.getEmployeeProj(this.streamName).subscribe(
        data =>{this.dataSource =  new  MatTableDataSource(data) as any ; 
          console.log(this.dataSource);
          data.forEach(element => {
            console.log(element);
            if(element.StatusInfo == "Deployed")
            {
              this.Id= element.EmployeeStream_Id;
              console.log(this.Id);
              element.StatusInfo = "Waiting for Allocation";
              this.status = element.StatusInfo;
              this.dataservice.UpdateEmployeeProjStatus(this.Id,this.status).subscribe();
            }
          });
        },err=>{  
          console.log(err);  
        });

  }

  OnSumbit(empproj)
  {
    this.allotment.EmployeeStream_Id = empproj.EmployeeStream_Id;
    localStorage.setItem('empstreamid',JSON.stringify(this.allotment.EmployeeStream_Id));
    this.router.navigate(['add-project']);
  }
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(StatusModalComponent, {
      width: '30em',
      height: '250px',
      data:obj
    });
    dialogRef.afterClosed().subscribe(result => {
     
      this.dataservice.getEmployeeProj(this.streamName).subscribe(
        data =>{this.dataSource =  new  MatTableDataSource(data) as any ; 

          console.log(this.dataSource);
        },err=>{  
          console.log(err);  
        });
      }
    );
  } 
  
}