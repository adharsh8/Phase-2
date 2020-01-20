export class EmployeeProject{
    EmployeeStream_Id : number;
    employeename : string;
    employeeid : string;
    streamname : string;
    StatusInfo : string;
    EmployeeMailId : string;
}

export interface DisplayProject{
    EmployeeProject_Id : number;
    StartDate : Date;
    EndDate : Date;
    RoleName : string;
    ProjectName : string;
    EmployeeId : number;
    EmployeeName : string;
    StreamName : string;
    StatusType : string;
}