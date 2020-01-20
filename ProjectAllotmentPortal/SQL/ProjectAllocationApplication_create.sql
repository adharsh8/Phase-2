-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-12-26 08:46:09.556

-- tables
-- Table: Employee
CREATE TABLE Employee (
    Employee_Id int  NOT NULL,
    EmployeeName nvarchar(max)  NOT NULL,
    EmployeeId nvarchar(max)  NOT NULL,
    EmployeePhno bigint  NOT NULL,
    EmployeeMailId nvarchar(max)  NOT NULL,
    DOJ date  NOT NULL,
    CONSTRAINT Employee_pk PRIMARY KEY  (Employee_Id)
);

-- Table: EmployeeProject
CREATE TABLE EmployeeProject (
    EmployeeProject_Id int  NOT NULL,
    Status bit  NOT NULL,
    StartDate date  NOT NULL,
    EndDate date  NULL,
    Roles_Id int  NOT NULL,
    EmployeeStream_Id int  NOT NULL,
    Project_Id int  NOT NULL,
    CONSTRAINT EmployeeProject_pk PRIMARY KEY  (EmployeeProject_Id)
);

-- Table: EmployeeStatus
CREATE TABLE EmployeeStatus (
    EmployeeStatus_Id int  NOT NULL,
    StatusType nvarchar(max)  NOT NULL,
    EmployeeProject_Id int  NOT NULL,
    CONSTRAINT EmployeeStatus_pk PRIMARY KEY  (EmployeeStatus_Id)
);

-- Table: EmployeeStream
CREATE TABLE EmployeeStream (
    EmployeeStream_Id int  NOT NULL,
    Employee_Id int  NOT NULL,
    Stream_Id int  NOT NULL,
    CONSTRAINT EmployeeStream_pk PRIMARY KEY  (EmployeeStream_Id)
);

-- Table: Project
CREATE TABLE Project (
    Project_Id int  NOT NULL,
    ProjectName nvarchar(max)  NOT NULL,
    ProjectEndDate date  NULL,
    StreamName nvarchar(max)  NOT NULL,
    CONSTRAINT Project_pk PRIMARY KEY  (Project_Id)
);

-- Table: Roles
CREATE TABLE Roles (
    Roles_Id int  NOT NULL,
    RoleName nvarchar(max)  NOT NULL,
    CONSTRAINT Roles_pk PRIMARY KEY  (Roles_Id)
);

-- Table: Stream
CREATE TABLE Stream (
    Stream_Id int  NOT NULL,
    COEname nvarchar(max)  NOT NULL,
    COEmailId nvarchar(max)  NOT NULL,
    Username nvarchar(max)  NOT NULL,
    Password nvarchar(max)  NOT NULL,
    StreamName nvarchar(max)  NOT NULL,
    CONSTRAINT Stream_pk PRIMARY KEY  (Stream_Id)
);

-- foreign keys
-- Reference: EmployeeProject_EmployeeStream (table: EmployeeProject)
ALTER TABLE EmployeeProject ADD CONSTRAINT EmployeeProject_EmployeeStream
    FOREIGN KEY (EmployeeStream_Id)
    REFERENCES EmployeeStream (EmployeeStream_Id);

-- Reference: EmployeeProject_Project (table: EmployeeProject)
ALTER TABLE EmployeeProject ADD CONSTRAINT EmployeeProject_Project
    FOREIGN KEY (Project_Id)
    REFERENCES Project (Project_Id);

-- Reference: EmployeeProject_Roles (table: EmployeeProject)
ALTER TABLE EmployeeProject ADD CONSTRAINT EmployeeProject_Roles
    FOREIGN KEY (Roles_Id)
    REFERENCES Roles (Roles_Id);

-- Reference: EmployeeStatus_EmployeeProject (table: EmployeeStatus)
ALTER TABLE EmployeeStatus ADD CONSTRAINT EmployeeStatus_EmployeeProject
    FOREIGN KEY (EmployeeProject_Id)
    REFERENCES EmployeeProject (EmployeeProject_Id);

-- Reference: StreamDetails_Employee (table: EmployeeStream)
ALTER TABLE EmployeeStream ADD CONSTRAINT StreamDetails_Employee
    FOREIGN KEY (Employee_Id)
    REFERENCES Employee (Employee_Id);

-- Reference: StreamDetails_Stream (table: EmployeeStream)
ALTER TABLE EmployeeStream ADD CONSTRAINT StreamDetails_Stream
    FOREIGN KEY (Stream_Id)
    REFERENCES Stream (Stream_Id);

-- End of file.

