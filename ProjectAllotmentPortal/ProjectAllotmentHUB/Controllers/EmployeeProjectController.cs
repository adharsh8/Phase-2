using ProjectAllotmentHUB.HelperClass;
using ProjectAllotmentHUB.Models;
using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ProjectAllotmentHUB.Controllers
{
    public class EmployeeProjectController : ApiController
    {
        [HttpGet]
        [Route("api/GetEmployeeProject")]
        public IHttpActionResult Get()                 //Get All Project Details
        {
            try
            {
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var listofProjects = entity.EmployeeProjects.Select(e => new
                    {
                       employeeproject_id = e.EmployeeProject_Id,
                       status = e.Status,
                       startdate = e.StartDate,
                       enddate = e.EndDate,
                       roles_id = e.Roles_Id,
                       employeestream_id = e.EmployeeStream_Id,
                       project_id = e.Project_Id
                    });
                    return Ok(listofProjects.ToList());
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route ("api/GetChartdetails/{name}")]
        public IHttpActionResult GetChart(string name)
       {
            try
            {
                using(ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var total = (from p in entity.EmployeeProjects.Where(p => name == p.EmployeeStream.Stream.StreamName
                                 && p.EmployeeStream.Employee.StatusInfo == "Deployed")
                                 .GroupBy(p => p.Project.ProjectName)
                                 select new
                                 {
                                     TotalPeople = p.Count(),
                                     p.FirstOrDefault().Project.ProjectName,
                                 }).ToList() ;
                   
                    return Ok(total);
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("api/GetEmpProj/{name}")]
        public IHttpActionResult GetEmployee(string name)         //Display final Dashboard of employees
        {
            try
            {
                DateTime today = DateTime.Now.Date;
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var details = (from empproj in entity.EmployeeProjects.Where(e => name == e.EmployeeStream.Stream.StreamName
                                   && today <= e.EndDate)
                                   join es in entity.EmployeeStreams on empproj.EmployeeStream_Id equals es.EmployeeStream_Id
                                   join emp in entity.Employees on es.Employee_Id equals emp.Employee_Id
                                   join str in entity.Streams on es.Stream_Id equals str.Stream_Id
                                  // join empproj in entity.EmployeeProjects on es.EmployeeStream_Id equals empproj.EmployeeStream_Id
                                 
                                   select new
                                   {
                                       es.EmployeeStream_Id,
                                       emp.EmployeeName,
                                       emp.EmployeeId,
                                       empproj.StartDate,
                                       empproj.EndDate,
                                       empproj.Project.ProjectName,
                                       empproj.Role.RoleName,
                                       str.StreamName,
                                       emp.StatusInfo,
                                      
                                   });
                    return Ok(details.ToList());

                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
       // [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/GetEmpNonProject/{name}")]
        //[Authorize]
        public IHttpActionResult GetNonProjEmployee(string name)                  //Get all non selected project for Employees
        {
            try
            {
                using(ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    DateTime today = DateTime.Now.Date;
                    var streamlist = entity.EmployeeStreams.Select(e => e.EmployeeStream_Id).ToList();
                   var projlist = entity.EmployeeProjects.Where(e=> e.EndDate >= today).Select(e => e.EmployeeStream_Id).ToList();
                   var nonprojlist = streamlist.Except(projlist).ToList();

                    var listofEmployee = (from es in entity.EmployeeStreams.Where(e=> nonprojlist.Contains(e.EmployeeStream_Id)
                                          && name == e.Stream.StreamName)
                                          join str in entity.Streams on es.Stream_Id equals str.Stream_Id
                                          
                                          select new
                                          {
                                              es.EmployeeStream_Id,
                                              es.Employee.EmployeeName,
                                              es.Employee.EmployeeId,
                                              es.Stream.StreamName,
                                              es.Employee.EmployeeMailId,
                                              es.Employee.StatusInfo

                                          }).ToList();

                return Ok(listofEmployee);
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/PostEmployeeProject")]
        public IHttpActionResult Post(EmployeeProject proj)         //Add new EmployeeProject Detail
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    entity.EmployeeProjects.Add(proj);
                    entity.SaveChanges();

                    string empName = (from es in entity.EmployeeStreams.Where(e => e.EmployeeStream_Id == proj.EmployeeStream_Id)
                                      join emp in entity.Employees on es.Employee_Id equals emp.Employee_Id 
                                      select new { 
                                          emp.EmployeeName
                                        
                                      }).FirstOrDefault().EmployeeName;
                    
                    string empMail = (from es in entity.EmployeeStreams.Where(e => e.EmployeeStream_Id == proj.EmployeeStream_Id)
                                      join emp in entity.Employees on es.Employee_Id equals emp.Employee_Id
                                      select new
                                      {
                                          emp.EmployeeMailId
                                      }).FirstOrDefault().EmployeeMailId;

                    string projname = (from es in entity.EmployeeProjects.Where(e => e.Project_Id == proj.Project_Id)

                                       select new
                                       {
                                           es.Project.ProjectName
                                       }).FirstOrDefault().ProjectName;

                    string rolename = (from es in entity.EmployeeProjects.Where(e => e.Roles_Id == proj.Roles_Id)

                                       select new
                                       {
                                           es.Role.RoleName,
                                       }).FirstOrDefault().RoleName;

                    EmailGeneration.SendEmployeeMail(proj, empName,  empMail, projname, rolename);
                    return Ok("Employee Added to Project Successfully");
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("api/PutEmployeeDashboard/{id=id}")]
        public IHttpActionResult PutStatusdashboard(int id, [FromBody] Employee status)    //Modify Status Employee
        {
            try
            {
                DateTime today = DateTime.Today;
                
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var emp = entity.EmployeeStreams.FirstOrDefault(e => e.EmployeeStream_Id == id);

                    if (emp == null)
                    {
                        return NotFound();
                    }
                    else if (emp.Employee.StatusInfo == "Allocated" )
                    {
                        emp.Employee.StatusInfo = status.StatusInfo;

                        entity.SaveChanges();

                        return Ok("Employee Status has Updated");
                    }
                    else
                    {
                        return NotFound();
                    }
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route ("api/DisplayColor/{name}")]
        public IHttpActionResult GetColor(string name)
        {
            try
            {
                DateTime today = DateTime.Today;

                using(ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var emplist = (from emp in entity.EmployeeProjects
                                   where (EntityFunctions.DiffDays(emp.EndDate, today)<= 10 && 
                                   name == emp.EmployeeStream.Stream.StreamName)
                                   select new
                                   {
                                       employeeId = emp.EmployeeStream.Employee.EmployeeId
                                   }
                                   ).ToList();
                    return Ok(emplist);
                }

            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
    }
}
