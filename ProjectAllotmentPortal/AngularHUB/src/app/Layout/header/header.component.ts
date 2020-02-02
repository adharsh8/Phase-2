import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Data/data.service';
import { MatDialog } from '@angular/material';
import { ResetpasswordComponent } from 'src/app/resetpassword/resetpassword.component';
import {MatBadgeModule} from '@angular/material/badge';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ThemeService } from 'src/app/theme.service';


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
  notifyForm : any;
  notify : any;
  darkTheme =  new FormControl(false);
  show : boolean = true;
  

  constructor(private route : Router,private dataservice : DataService,public dialog: MatDialog,
    private form: FormBuilder,private themeService: ThemeService) {
      this.darkTheme.valueChanges.subscribe(value => {
        if (value) {
          console.log(this.darkTheme.value);
          this.themeService.toggleDark();
        } else {
          this.themeService.toggleLight();
        }
      });
     }

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

      this.notifyForm = this.form.group({
        notification: ['', Validators.required]
      });
      
      this.dataservice.Notification(this.userId).subscribe(
        result =>{
          this.notify = result;
        }
      );

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
  navigate()
  {
    this.route.navigate(['project']);
  }
  changetheme()
  {
    this.show = false;
    console.log(this.show);
  }
}
