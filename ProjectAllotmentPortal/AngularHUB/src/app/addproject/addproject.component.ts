import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { project } from 'src/app/Data/project';
import { ProjectAllotment } from 'src/app/Data/ProjectAllotment';
import { EmployeeProject } from 'src/app/Data/EmployeeProject';
import { Router } from '@angular/router';
import {DataService} from'src/app/Data/data.service';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],

})
export class AddprojectComponent implements OnInit {

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
  errorMsgFromDate:string ="";
  errorMsgToDate: string= "";
  ProjectStatus : string;
  ProjectId : number;
  errorMsgEndDate : string;
  EndDate : Date;
  departmentname : string;
  ProjectDetails : string[];
  RoleDetails : string[];
  FormattedTodate : string;
  actualTodate : Date;
  FormattedFromDate : string;

  constructor(private form: FormBuilder, private routers: Router,private datum: DataService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.departmentname = localStorage.getItem('deptName');
    console.log(this.departmentname);
    this.datum.GetProjectName(this.departmentname).subscribe(
      data =>{
        this.ProjectDetails = data;
      }
    );
    this.datum.GetRoleType().subscribe(
      data =>{
        this.RoleDetails = data;
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
    
      this.ProjectForm.get('fromDate').valueChanges.subscribe(
        value => { this.varFromDate = value;});
      this.ProjectForm.get('toDate').valueChanges.subscribe(
        value => { this.varToDate = value;});

      this.ProjectStatus = (localStorage.getItem('Project-status'));
      this.ProjectId = JSON.parse(localStorage.getItem('Project-Id'));
      if(this.ProjectStatus=='Reallocate' || this.ProjectStatus == 'Deployed')
      {
        this.datum.getSingleEmployee(this.ProjectId).subscribe(
          data =>{
            this.projectss = data;
            this.prjId = this.projectss[0].EmployeeProject_Id;
            this.prjname = this.projectss[0].ProjectName;
            this.rolename = this.projectss[0].RoleName;
            this.begindate = this.projectss[0].StartDate;
            
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
    //console.log(this.ProjectForm.get(field).value);
    if(this.ProjectForm.get(field).valid)
    {
      if(this.ProjectForm.get(field).value < this.currentDate){ 
        //this.errorMsgFromDate="Project cannot be allocated for earlier days";
        this.resetFromdate();
        return true;
    }
  
  }
  else{
    this.errorMsgFromDate="Please Enter From Date";
    return !this.ProjectForm.get(field).valid && (this.ProjectForm.get(field).touched);
  }  

  }
  isFieldValidToDate(field: string) {
    //console.log(this.ProjectForm.get(field).value);
    if(this.ProjectForm.get(field).valid){
      if(this.ProjectForm.get('fromDate').value >= this.ProjectForm.get(field).value ){
        //this.errorMsgToDate="To Date cannot be before From Date";
        this.resetTodate();
        return true;
      }
    }
    else{
      
      this.errorMsgToDate="Please Enter To Date";
      return !this.ProjectForm.get(field).valid && (this.ProjectForm.get(field).touched);
    }  
  }
  isFieldValidToDateNew(field: string)
  {
    
    this.actualTodate = this.ProjectForm.get(field).value;
    var datePipe = new DatePipe("en-US");
    this.FormattedTodate = datePipe.transform(this.actualTodate, 'dd/MM/yyyy');
    this.FormattedFromDate = datePipe.transform(this.begindate, 'dd/MM/yyyy');
    //console.log(this.actualTodate);
    //console.log(this.FormattedTodate);
    if(this.ProjectForm.get(field).valid){
      if(this.FormattedFromDate >= this.FormattedTodate ){
        //this.errorMsgEndDate = "To Date cannot be before From Date";
        this.resetTodate();
        return true;
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
  resetFromdate()
  {
    this.ProjectForm.get('fromDate').reset();
  }
  resetTodate()
  {
    this.ProjectForm.get('toDate').reset();
  }
  reset(){
    this.ProjectForm.reset();
  }
  goBack()
  {
    this.routers.navigate(['display-project']);
  }
  onModify()
  {
   
      this.allotments.EndDate = this.ProjectForm.get('toDate').value;
      this.EndDate = this.allotments.EndDate;
      this.datum.ChangeEndDate(this.prjId,this.EndDate).subscribe(
        results =>  this.openSnackBar(results,'Close'),
        error =>  this.openSnackBar(error.error.message,'Close')
     );    
  }
  onSubmit(){
    if(this.ProjectForm.valid){
      this.finalvalue();
    }
  }
  finalvalue()
  {
    this.allotments.Project_Id = this.ProjectForm.get('ProjectName').value.projectId;
    this.allotments.StartDate = this.ProjectForm.get('fromDate').value;
    console.log(this.allotments.StartDate);
    this.allotments.EndDate = this.ProjectForm.get('toDate').value;
    console.log(this.allotments.EndDate);
    this.allotments.Roles_Id = this.ProjectForm.get('Roletype').value.rolesid;
    this.allotments.EmployeeStream_Id = JSON.parse(localStorage.getItem('empstreamid'));
    this.datum.createEmployee(this.allotments).subscribe(
      results =>  this.openSnackBar(results,'Close'),
      error =>  this.openSnackBar(error.error.message,'Close')
    );
    
    this.ID = this.allotments.EmployeeStream_Id;
    this.datum.UpdateDashboard(this.ID).subscribe();
        
  }
  onUpdate()
  {
    if(this.ProjectForm.valid){
      this.updatevalue();
    }
  }
  updatevalue()
  {
    this.allotments.Project_Id = this.ProjectForm.get('ProjectName').value.projectId;
    this.allotments.StartDate = this.ProjectForm.get('fromDate').value;
    this.allotments.EndDate = this.ProjectForm.get('toDate').value;
    this.allotments.Roles_Id = this.ProjectForm.get('Roletype').value.rolesid;
    
    this.datum.UpdateProjectDetails(this.prjId,this.allotments).subscribe(
      results =>  this.openSnackBar(results,'Close'),
      error =>  this.openSnackBar(error.error.message,'Close')
    );

  }
  openSnackBar(message: any, action: string) {
      this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
    this.routers.navigate(['display-project']);
  }

}
