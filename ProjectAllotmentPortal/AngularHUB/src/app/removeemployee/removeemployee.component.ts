import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DataService } from '../Data/data.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

export interface UsersData {
  
  EmployeeStream_Id: number;
  EmployeeName : string;
}

@Component({
  selector: 'app-removeemployee',
  templateUrl: './removeemployee.component.html',
  styleUrls: ['./removeemployee.component.css']
})
export class RemoveemployeeComponent implements OnInit {

  action:string;
  local_data:any;
  empId : number;
  name : string;

  constructor(public dialogRef: MatDialogRef<RemoveemployeeComponent>,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,private dataservice : DataService,
     private router: Router,private _snackBar: MatSnackBar, @Inject(DOCUMENT) private _document: Document) {
    console.log(data);
      this.local_data = {...data};
      this.action = this.local_data.action;
      this.name = this.data.EmployeeName;
   }

  ngOnInit() {
  }
  
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
  doAction()
  {
    this.empId = this.data.EmployeeStream_Id;
    console.log(this.empId); 
    this.dataservice.RemoveEmployee(this.empId).subscribe(
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
    this.closeDialog();

    this.router.navigate(['welcomepage']);
    //this._document.defaultView.location.reload();
  }
}
