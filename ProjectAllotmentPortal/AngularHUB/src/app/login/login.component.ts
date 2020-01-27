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
  isForgotPassword :boolean = true;
  userArray : any;
  isvalid : boolean =false;
  
  constructor(private dataservice : DataService, private router : Router) { }

  ngOnInit() {
    if(localStorage.getItem('userToken'))
    {
      this.router.navigate(['welcomepage']);
    }
  }


  OnSubmit(userName,password)
  {
    
    this.dataservice.userAuthentication(userName,password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('userId',userName);
      this.router.navigate(['welcomepage']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }
  usernameSubmit(user)
  {
    this.dataservice.CheckUsername().subscribe(data =>{
      this.userArray = data;
      console.log(this.userArray[0].Username);
      console.log(user);
      for(let i=0; i<=this.userArray.length; i++)
      {
        if(this.userArray[i].Username==user)
        {
          console.log("dsds");
          this.isvalid = true;
          break;
        }
        else{
          this.isvalid = false;
        }
      }
      if(this.isvalid)
    {
      console.log("ffgfhg");
      this.dataservice.ResetPasswordmail(user).subscribe();
    }
    });
    
  }
  forgotpassword()
  {
    this.isForgotPassword = false;
  }
}
