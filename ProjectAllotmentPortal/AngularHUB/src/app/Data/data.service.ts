import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Employee } from './employee';
import { ProjectAllotment } from './ProjectAllotment';
import { DisplayProject, EmployeeProject } from './EmployeeProject';
import { EmployeeStream } from './employeestream';
import { project } from './project';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  private Url = 'https://localhost:44367/api/';
  private UImessage = new Subject<string>();
  UImsg$ = this.UImessage.asObservable();
   token =localStorage.getItem('userToken');

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
  UpdateProjectDetails(id:number,employee:ProjectAllotment): Observable<ProjectAllotment []>{
    console.log("dsdsd");
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.put<ProjectAllotment[]>(this.Url + 'UpdateProjectDetails/'+ id,  
        employee,httpOptions);
  }
    ResetPasswordmail(user):Observable<string>{
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
      return this.http.post<string>(this.Url +'resetPasswordlink/'+user ,httpOptions);
    }
    getdisplayEmployee(name): Observable<DisplayProject[]> {
      
      return this.http.get<DisplayProject[]>(this.Url +'GetEmpProj/'+name);
    }
    CheckUsername()    {
      return this.http.get(this.Url + 'CheckUsername');
    }
    getEmployeeProj(name): Observable<EmployeeProject []>{
     // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','Bearer Token':this.token });
    // ,{headers: reqHeader }
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
    getColorList(name): Observable<EmployeeProject[]>{
      return this.http.get<EmployeeProject[]>(this.Url +'DisplayColor/'+ name);
    }
    getSingleEmployee(Id): Observable<project[]>{
      return this.http.get<project[]>(this.Url +'GetparticularEmployee/'+Id);
    }
    GetProjectName(name): Observable<string[]>{
      return this.http.get<string[]>(this.Url + 'GetProjectdetails/'+ name);
    }
    GetRoleType():Observable<string[]>{
      return this.http.get<string[]>(this.Url+ 'GetRolesdetails');
    }
    CheckPassword(user,pass):Observable<any>{
     
      return this.http.get(this.Url + 'Checkpassword/'+user+'?password='+pass);
    }
    statusRemove : object;
    RemoveEmployee(id:number){

        this.statusRemove={
          StatusInfo : "Removed"
        }
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
      return this.http.put(this.Url + 'RemoveEmployeeStatus/'+ id ,this.statusRemove, httpOptions); 

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
    ChangePassword(user,newpassword)
    {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

      return this.http.put(this.Url + 'ChangePassword/'+ user+'?Password='+newpassword,httpOptions);
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
    GetCountofEmployee(userid : string)
    {
      return this.http.get(this.Url + 'GetCountofEmployee/'+ userid);
    }
    Notification(userId : string)
    {
      return this.http.get(this.Url +"notifications/"+ userId);
    }
    ChangeEndDate(id:number,enddate : Date)
    {

      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
      
      return this.http.put(this.Url + 'UpdateEndDate/'+id ,enddate, httpOptions); 
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


