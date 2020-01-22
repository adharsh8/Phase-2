import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Data/data.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogin : string;
  displaydept : any;
  username : string;

  constructor(private route : Router,private dataservice : DataService) { }

  ngOnInit() {

    this.dataservice.UImsg$.subscribe(
      message =>{
        this.displaydept = message;
        this.username = this.displaydept.COEname;
       
        console.log(this.username);
      }
    )

    this.userLogin = localStorage.getItem('User-Name');
  }
  Logout()
  {
    localStorage.removeItem('userToken');
    this.route.navigate(['login']);
  }
}
