using ProjectAllotmentHUB.HelperClass;
using ProjectAllotmentHUB.Models;
using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ProjectAllotmentHUB.Controllers
{
    public class EmployeeController : ApiController
    {
        //[Authorize]
        [HttpGet]
        [Route("api/GetEmployee")]
        [ResponseType(typeof(Employee))]
        public IHttpActionResult Get()            //Get All Employee Details not Allocated Streams
        {
            try
            {
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {

                    List<Employee> list4 = new List<Employee>();
                    var list1 = entity.Employees.Select(e => e.Employee_Id).ToList();
                    var list2 = entity.EmployeeStreams.Select(f => f.Employee_Id).ToList();

                    var list3 = list1.Except(list2).ToList();
                    DateTime today = DateTime.Now.Date;

                    var listofEmployees = (from emp in entity.Employees.Where(x => list3.Contains(x.Employee_Id))
                                           select new
                                           {
                                               emp.Employee_Id,
                                               emp.EmployeeName,
                                               emp.EmployeeId,
                                               emp.EmployeeMailId,
                                               emp.EmployeePhno,
                                               emp.DOJ
                                               
                                           }) ;

                    string MailId = entity.Streams.Where(e => e.Stream_Id == 1001).Select(
                                    e => new
                                    {

                                        Mail = e.COEmailId

                                    }).FirstOrDefault().Mail;
                    var trigger = entity.Employees.Where(e => (EntityFunctions.DiffDays(e.DOJ, today) == 5)).Select(e =>
                        new
                        {
                            employeename = e.EmployeeName,
                        //employeemail = e.EmployeeMailId
                    }).ToList();

                    foreach (var obj in trigger)
                    {
                        string names = obj.employeename;
                        //string mails = obj.employeemail;
                        EmailGeneration.SendNewJoinersMail(names, MailId);
                    }

                    return Ok(listofEmployees.ToList());
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route ("api/GetCountofEmployee/{id=id}")]
        public IHttpActionResult GetcountofEmployee(string id)
        {
            try
            {
                using(ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var emp = entity.Streams.FirstOrDefault(e => e.Username == id);
                    
                    if(emp.Username == "P001")
                    { 
                    var BadgeCount = (from p in entity.Employees.Where(p => p.StatusInfo == "Training").GroupBy(p => p.StatusInfo)
                                       select new
                                       {
                                           TotalPeople = p.Count(),
                                           p.FirstOrDefault().EmployeeId,
                                       }).ToList();

                    return Ok(BadgeCount);
                    }
                    else if(emp.Username == "P002")
                    {
                        var BadgeCount = (from p in entity.EmployeeStreams.Where(p => p.Employee.StatusInfo != "Deployed" 
                                          && p.Stream.StreamName == "DotNet")
                                          .GroupBy(p => p.Employee.StatusInfo != "Deployed")
                                          select new
                                          {
                                              TotalPeople = p.Count(),
                                              p.FirstOrDefault().Employee.EmployeeId,
                                          }).ToList();
                    return Ok(BadgeCount);
                       
                    }
                    else if (emp.Username == "P003")
                    {
                        var BadgeCount = (from p in entity.EmployeeStreams.Where(p => p.Employee.StatusInfo != "Deployed"
                                          && p.Stream.StreamName == "EDM")
                                          .GroupBy(p => p.Employee.StatusInfo != "Deployed")
                                          select new
                                          {
                                              TotalPeople = p.Count(),
                                              p.FirstOrDefault().Employee.EmployeeId,
                                          }).ToList();
                        return Ok(BadgeCount);

                    }
                    else
                    {
                        return NotFound();
                    }
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpPost]
        [Route("api/PostEmployee")]
        [ResponseType(typeof(Employee))]
        public IHttpActionResult Post([FromBody] Employee employee)         //Add new Employee Detail
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    entity.Employees.Add(employee);
                    entity.SaveChanges();
                    return Ok("Employee Added Successfully");
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("api/PutEmployee/{id=id}")]
        public IHttpActionResult Put(int id, [FromBody] Employee status)    //Modify EmployeeStatus
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var emp = entity.Employees.FirstOrDefault(e => e.Employee_Id == id);

                    if (emp == null)
                    {
                        return NotFound();
                    }
                    else if(emp.StatusInfo == "Training")
                    {
                        emp.StatusInfo = status.StatusInfo;
                       
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
        [HttpPut]
        [Route("api/RemoveEmployeeStatus/{id=id}")]
        public IHttpActionResult RemoveEmployee(int id, [FromBody] Employee status)    //Modify EmployeeStatus
        {
            try
            {
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
                
                    else
                    {
                        emp.Employee.StatusInfo = status.StatusInfo;

                        entity.SaveChanges();

                        return Ok("Employee Removed Successfully !");
                    }
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

    }
}
