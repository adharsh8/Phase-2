import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Data/data.service';
//import { WeatherSettings, TemperatureScale, ForecastMode, WeatherLayout } from 'angular-weather-widget';



@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css'],
  //template: '<weather-widget [settings]="settings"></weather-widget>'
})
export class WelcomepageComponent implements OnInit {
  userClaims: any;
  userdetail : any;
  deptname : any;
  time=Date.now();
  greeting: string;
  value:string;
  CurrentHour: number;

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
    this.value = this.greetingText();
    console.log(this.value);
  }
  greetingText = () => {
   
      this.CurrentHour = new Date().getHours();
      if(this.CurrentHour >=12 && this.CurrentHour <=17)
      {
        
        return "Good Afternoon";
      }
      else if(this.CurrentHour >= 18)
      {
        
        return "Good Evening";
      }
      else{
        return "Good Morning";
      }
  }
  interaction(userdetail)
  {
    this.dataservice.sendmessage(userdetail);
    this.dataservice.Streamprefer(userdetail);
  }
  /*settings: WeatherSettings = {
    location: {
      cityName: 'Szczecin'
    },
    backgroundColor: '#347c57',
    color: '#ffffff',
    width: '300px',
    height: 'auto',
    showWind: false,
    scale: TemperatureScale.CELCIUS,
    forecastMode: ForecastMode.DETAILED,
    showDetails: false,
    showForecast: true,
    layout: WeatherLayout.WIDE,
    language: 'en'
  };*/

}