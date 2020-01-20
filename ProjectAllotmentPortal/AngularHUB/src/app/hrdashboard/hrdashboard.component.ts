import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from '../Data/employee';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalComponent } from './modal/modal.component';
import {DataService} from'../Data/data.service';
import { streamallocation } from '../Data/employeestream';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-hrdashboard',
  templateUrl: './hrdashboard.component.html',
  styleUrls: ['./hrdashboard.component.css']
})
export class HRdashboardComponent implements OnInit {
 
 
  constructor(private dataservice : DataService,public dialog: MatDialog,private _snackBar: MatSnackBar ){}

  displayedColumns: string[] = ['EMPLOYEENAME', 'EMPLOYEEID', 'EMPLOYEEPHNO', 'EMPLOYEEMAILID','DOJ','INITIATE'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Employee>(true, []);
  empallocate : streamallocation = new streamallocation();

  ngOnInit(): void {

    this.dataservice.getEmployee().subscribe(  
      data => {  this.dataSource=new  MatTableDataSource(data) as any ;
      console.log(this.dataSource);
      
    }
      ,err=>{  
        console.log(err);  
      }
    )
  
  }

  openDialog(action,obj){
    obj.action = action;
    console.log(obj);
    this.empallocate.Employee_Id = obj.Employee_Id;
    localStorage.setItem("EmployeId",JSON.stringify(this.empallocate.Employee_Id));

    console.log(this.empallocate.Employee_Id);
    console.log(this.selection.selected);
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '30em',
      height: '250px',
      
      data:obj
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
  





