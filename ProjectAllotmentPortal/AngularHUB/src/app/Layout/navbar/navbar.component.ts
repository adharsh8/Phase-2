import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Data/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displaydept : any;
  data : any;
  username : string;

  constructor(private dataservice : DataService) { }

  ngOnInit() {
    this.dataservice.UImsg$.subscribe(
      message =>{
        this.displaydept = message;
        this.data = this.displaydept.StreamName;
        this.username = this.displaydept.COEname;
        localStorage.setItem('User-Name',this.username);
        console.log(this.username);
      }
    )
  }

}
