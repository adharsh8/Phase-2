import { Injectable } from '@angular/core';
import { Streamdetails } from './streamdetails';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { streamallocation, employeeStatus } from './employeestream';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  private Url = 'https://localhost:44367/api/';

  status:object

  constructor(private http: HttpClient) { }

  getStream(): Observable<Streamdetails[]>{
    return this.http.get<Streamdetails[]>(this.Url +'GetStreamdetails')
  }
  createStreamEmployee(employeestrm: streamallocation): Observable<streamallocation []> {  
   //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
     return this.http.post<streamallocation []>(this.Url + 'PostEmployeeStream',  
    employeestrm); 

  }
  UpdateStatus(empId: employeeStatus[]) {  
    this.status={
      StatusInfo : "Waiting for Allocation"
    }
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.http.put<employeeStatus[]>(this.Url + 'PutEmployee/'+ empId ,this.status, httpOptions); 
  }
}
