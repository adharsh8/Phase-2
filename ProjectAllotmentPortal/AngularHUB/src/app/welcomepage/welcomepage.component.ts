import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Data/data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {
  userClaims: any;
  userdetail : any;
  deptname : any;

  constructor(private router : Router,private dataservice : DataService) { }

  ngOnInit() {
    this.dataservice.getWelcomePage().subscribe((data : any)=>{
      this.userClaims = data;
      console.log(this.userClaims);
      this.interaction(this.userClaims);
      this.deptname = this.userClaims.StreamName;
      console.log(this.deptname);
      localStorage.setItem('deptName',this.deptname);
    });
  }
  interaction(userdetail)
  {
    this.dataservice.sendmessage(userdetail);
    this.dataservice.Streamprefer(userdetail);
  }

}
