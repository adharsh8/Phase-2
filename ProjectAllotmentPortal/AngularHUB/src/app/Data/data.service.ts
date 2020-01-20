import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Employee } from './employee';
import { ProjectAllotment } from './ProjectAllotment';
import { DisplayProject, EmployeeProject } from './EmployeeProject';
import { EmployeeStream } from './employeestream';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  private Url = 'https://localhost:44367/api/';
  private UImessage = new Subject<string>();
  UImsg$ = this.UImessage.asObservable();

  private streamType = new Subject<string>();
  strType$ = this.streamType.asObservable();

  constructor(private http: HttpClient) { }
  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.Url +'GetEmployee')    
  }

  createEmployee(employee: ProjectAllotment): Observable<ProjectAllotment []> {  
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<ProjectAllotment[]>(this.Url + 'PostEmployeeProject',  
    employee);  

  }
    getdisplayEmployee(name): Observable<DisplayProject[]> {
      
      return this.http.get<DisplayProject[]>(this.Url +'GetEmpProj/'+name);
    }
    
    getEmployeeProj(name): Observable<EmployeeProject []>{
      
      return this.http.get<EmployeeProject []>(this.Url +'GetEmpNonProject/'+name);
    }
    userAuthentication(userName,password){
      var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    
    return this.http.post('https://localhost:44367/token', data, { headers: reqHeader });
    }
    getWelcomePage(){
      return this.http.get(this.Url + 'GetUserClaims');
      
    }
    getEmployeestream(): Observable<EmployeeStream[]> {
      return this.http.get<EmployeeStream[]>(this.Url +'GetEmployeeStream');
    }
    
    statusUpd : object;
    UpdateEmployeeProjStatus(id:number, status:string)
    {
      this.statusUpd={
        StatusInfo : status
      }
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
      return this.http.put(this.Url + 'PutEmployeeStatus/'+ id ,this.statusUpd, httpOptions); 
    }

    statusUpdat : object;
    UpdateDashboard(id:number)
    {
      this.statusUpdat={
        StatusInfo : "Deployed"
      }
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
      
      return this.http.put(this.Url + 'PutEmployeeDashboard/'+ id ,this.statusUpdat, httpOptions); 
    }
    GetProjectChart(department:string)
    {
      return this.http.get(this.Url + 'GetChartdetails/'+department)
      .map(result => result);
    }
    GetStreamChart()
    {
      return this.http.get(this.Url + 'GetStreamchart')
      .map(result => result);
    }
    GetStatusChart()
    {
      return this.http.get(this.Url + 'GetStatusChart')
      .map(result => result);
    }
    message : any;
    sendmessage(message)
    {
      this.UImessage.next(message);
    }

    streampreference : any;
    Streamprefer(streampreference)
    {
      this.streamType.next(streampreference);
    }

}


