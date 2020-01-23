import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DataService } from '../Data/data.service';
import { Router } from '@angular/router';
import { ChartComponent } from '../chart/chart.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})

export class StreamComponent implements OnInit {
  ngOnInit(): void {
    this.dataservice.getEmployeestream().subscribe(
      data => {  this.dataSource=new  MatTableDataSource(data) as any ;
        console.log(this.dataSource);
       } ,err=>{  
          console.log(err);  
        }  
    )
  }

  constructor(private dataservice : DataService, private router: Router,public dialog: MatDialog ){}
  displayedColumns: string[] = ['employeename', 'employeeid', 'DOJ', 'MailId', 'Phno','streamname','status'];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  chart(streamChart : string)
  {
    localStorage.setItem('chartType',streamChart);
   // this.router.navigate(['chart']);

    const dialogRef = this.dialog.open(ChartComponent, {
      width: '850px',
      height : '550px'
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log("Modal closed");
   });
  }
}

