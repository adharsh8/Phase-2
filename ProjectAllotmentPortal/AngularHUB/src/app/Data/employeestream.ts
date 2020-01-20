export interface EmployeeStream{
    employeestreamid : number;
    employeename : string;
    employeeid : number;
    streamname : string;
    EmployeeMailId : string;
    EmployeePhno : number;
    DOJ : Date;
    StatusInfo : string;
  }

export class streamallocation
{
  Employee_Id : number;
  Stream_Id : number;
 
}

export class employeeStatus
{
  Employee_Id : number;
  StatusInfo : string;
}
