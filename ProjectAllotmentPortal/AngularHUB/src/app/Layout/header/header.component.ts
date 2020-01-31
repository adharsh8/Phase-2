import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Data/data.service';
import { MatDialog } from '@angular/material';
import { ResetpasswordComponent } from 'src/app/resetpassword/resetpassword.component';
import {MatBadgeModule} from '@angular/material/badge';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogin : string;
  displaydept : any;
  username : string;
  userId : string;
  data : any;
  count : number;

  constructor(private route : Router,private dataservice : DataService,public dialog: MatDialog) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.dataservice.UImsg$.subscribe(
      message =>{
        this.displaydept = message;
        this.username = this.displaydept.COEname;
       
        console.log(this.username);
      }
    )

    this.userLogin = localStorage.getItem('User-Name');

    this.dataservice.GetCountofEmployee(this.userId).subscribe(
      result => {this.data = result;
        console.log(this.data);
        this.count = this.data[0].TotalPeople;
        console.log(this.count);

      });
  }
  Logout()
  {
    localStorage.removeItem('userToken');
    this.route.navigate(['login']);
  }
  ChangePassword()
  {
    //obj.action = action;
    const dialogRef = this.dialog.open(ResetpasswordComponent, {
      width: '30em',
      height: '350px',
      //data:obj
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);  
         },err=>{  
           console.log(err);  
         });
  }
}
