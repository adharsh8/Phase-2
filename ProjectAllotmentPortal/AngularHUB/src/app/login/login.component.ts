import { Component, OnInit } from '@angular/core';
import { DataService } from '../Data/data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError : boolean = false;
  
  constructor(private dataservice : DataService, private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(userName,password)
  {
    
    this.dataservice.userAuthentication(userName,password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
      this.router.navigate(['welcomepage']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }
}
