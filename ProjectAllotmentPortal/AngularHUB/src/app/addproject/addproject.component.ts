import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { project } from 'src/app/Data/project';
import { ProjectAllotment } from 'src/app/Data/ProjectAllotment';
import {ProjectComponent} from 'src/app/project/project.component';
import { EmployeeProject } from 'src/app/Data/EmployeeProject';
import { Router } from '@angular/router';
import {DataService} from'src/app/Data/data.service';
import { MatSnackBar } from '@angular/material';

interface Projectlist {
  key: string;
  value: number;
}
interface roles
{
  key: string;
  value: number;
}

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  
  ProjTypelist: Array<Projectlist> = [
    { key: 'Team Digital', value: 201 },
    { key: 'BPMOnline', value: 202 },
    { key: 'Revlon', value: 203 },
    { key: 'Mears', value: 204 }
  ];
  RolesTypeList: Array<roles> = [
    { key: 'Full-Time', value: 101 },
    { key: 'Part-Time', value: 102 },
    { key: 'Support', value: 103 }
  ]

  updProjectName: any;
  varFromDate : Date;
  varToDate : Date;
  ProjectForm: any;
  
  projects : project = new project();
  allotments : ProjectAllotment = new ProjectAllotment();
  projectss : project[] = [];
  prjId : number;
  prjname : string;
  begindate : Date;
  finishdate : Date;
  rolename : string;
  
  employeeprojs : EmployeeProject[];
  ID : number;
  currentDate = new Date();
  errorMsgFromDate:string;
  errorMsgToDate: string;
  ProjectStatus : string;
  ProjectId : number;
  errorMsgEndDate : string;
  EndDate : Date;
  departmentname : string;
  ProjectDetails : string[];
  RoleDetails : string[];

  constructor(private form: FormBuilder, private routers: Router,private datum: DataService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.departmentname = localStorage.getItem('deptName');
    console.log(this.departmentname);
    this.datum.GetProjectName(this.departmentname).subscribe(
      data =>{
        this.ProjectDetails = data;
        console.log(this.ProjectDetails);
      }
    );
    this.datum.GetRoleType().subscribe(
      data =>{
        this.RoleDetails = data;
        console.log(this.RoleDetails);
      }
    )

    this.ProjectForm = this.form.group({
      ProjectName: ['', Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      Roletype: ['', Validators.required],
    });


    this.ProjectForm.get('ProjectName').valueChanges.subscribe(
      value => { this.updProjectName = value;});
      console.log(this.updProjectName);
    
      this.ProjectForm.get('fromDate').valueChanges.subscribe(
        value => { this.varFromDate = value;});
      this.ProjectForm.get('toDate').valueChanges.subscribe(
        value => { this.varToDate = value;});

      this.ProjectStatus = (localStorage.getItem('Project-status'));
      this.ProjectId = JSON.parse(localStorage.getItem('Project-Id'));
      if(this.ProjectStatus=='Reallocate')
      {
        this.datum.getSingleEmployee(this.ProjectId).subscribe(
          data =>{
            this.projectss = data;
            this.prjId = this.projectss[0].EmployeeProject_Id;
            this.prjname = this.projectss[0].ProjectName;
            this.rolename = this.projectss[0].RoleName;
            this.begindate = this.projectss[0].StartDate;
            console.log(this.begindate);
          }
        );
      }
  }
  displayFieldCss(field: string) {
    return {  
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  isFieldValid(field: string) {
    return !this.ProjectForm.get(field).valid && (this.ProjectForm.get(field).touched && !this.ProjectForm.valid);
  }
  isFieldValidFromDate(field: string)
  {
    if(this.ProjectForm.get(field).valid)
    {
      if(this.ProjectForm.get(field).value < this.currentDate){
        this.errorMsgFromDate="Project cannot be allocated for earlier days";
        return true;
    }
  }
  else{
    this.errorMsgFromDate="Please Enter From Date";
    return !this.ProjectForm.get(field).valid && (this.ProjectForm.get(field).touched);
  }  

  }
  isFieldValidToDate(field: string) {
    if(this.ProjectForm.get(field).valid){
      if(this.ProjectForm.get('fromDate').value >= this.ProjectForm.get(field).value ){
        this.errorMsgToDate="To Date cannot be before From Date";
        return true;
      }
    }
    else{
      this.errorMsgToDate="Please Enter To Date";
      return !this.ProjectForm.get(field).valid && (this.ProjectForm.get(field).touched);
    }  
  }
  isFieldValidToDate1(field: string)
  {
    console.log(this.ProjectForm.get(field).value);
    if(this.ProjectForm.get(field).valid){
      if(this.begindate >= this.ProjectForm.get(field).value){
        this.errorMsgEndDate = "To Date cannot be before From Date";
      }
    }
    else{
      this.errorMsgEndDate="Please Enter To Date";
      return !this.ProjectForm.get(field).valid && (this.ProjectForm.get(field).touched);
    } 
  }

  back()
  {
    this.routers.navigate(['project']);
  }
  reset(){
    this.ProjectForm.reset();
  }
  onModify()
  {
   
      this.allotments.EndDate = this.ProjectForm.get('toDate').value;
      this.EndDate = this.allotments.EndDate;
      console.log(this.EndDate);

     this.datum.ChangeEndDate(this.prjId,this.EndDate).subscribe();
     this.routers.navigate(['display-project']);
    
  }
  onSubmit(){
    if(this.ProjectForm.valid){
      this.finalvalue();
    }
  }
  finalvalue()
  {
    this.allotments.Project_Id = this.ProjectForm.get('ProjectName').value.projectId;
    console.log(this.allotments.Project_Id);
    this.allotments.StartDate = this.ProjectForm.get('fromDate').value;
    console.log(this.allotments.StartDate);
    this.allotments.EndDate = this.ProjectForm.get('toDate').value;
    console.log(this.allotments.EndDate);
    this.allotments.Roles_Id = this.ProjectForm.get('Roletype').value.rolesid;
    console.log(this.allotments.Roles_Id);

    this.allotments.EmployeeStream_Id = JSON.parse(localStorage.getItem('empstreamid'));
    console.log(this.allotments.EmployeeStream_Id);
    console.log(this.allotments);
    
    this.datum.createEmployee(this.allotments).subscribe(
      results =>  this.openSnackBar(results,'Close'),
      error =>  this.openSnackBar(error.error.message,'Close')
    );
    
    this.ID = this.allotments.EmployeeStream_Id;
    this.datum.UpdateDashboard(this.ID).subscribe();
    this.routers.navigate(['display-project']);
    
  }
  openSnackBar(message: any, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });

  }

}
