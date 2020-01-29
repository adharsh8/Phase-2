using Amqp.Types;
using ProjectAllotmentHUB.HelperClass;
using ProjectAllotmentHUB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectAllotmentHUB.Controllers
{
    public class EmployeeStreamController : ApiController
    {
        [HttpGet]
        [Route("api/GetEmployeeStream")]
        public IHttpActionResult Get()                 //Get All Employee Stream (DASHBOARD)
        {
            try
            {

                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var details = (from es in entity.EmployeeStreams
                                   join emp in entity.Employees on es.Employee_Id equals emp.Employee_Id
                                   join str in entity.Streams on es.Stream_Id equals str.Stream_Id
                                   select new
                                   {
                                       es.EmployeeStream_Id,
                                       emp.EmployeeName,
                                       emp.EmployeeId,
                                       str.StreamName,
                                       emp.EmployeeMailId,
                                       emp.EmployeePhno,
                                       emp.DOJ,
                                       emp.StatusInfo

                                   }).ToList();

                    return Ok(details.ToList());
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("api/GetStreamchart")]
        public IHttpActionResult GetStreamchart()
        {
            try
            {
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var streamchart = (from p in entity.EmployeeStreams.GroupBy(p => p.Stream.StreamName)
                                 select new
                                 {
                                     TotalPeople = p.Count(),
                                     p.FirstOrDefault().Stream.StreamName,
                                 }).ToList();

                    return Ok(streamchart);
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("api/GetStatusChart")]
        public IHttpActionResult GetStatusChart()
        {
            try
            {
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var statuschart = (from p in entity.Employees.GroupBy(p => p.StatusInfo)
                                       select new
                                       {
                                           TotalPeople = p.Count(),
                                           p.FirstOrDefault().StatusInfo,
                                       }).ToList();

                    return Ok(statuschart);
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("api/PutEmployeeStatus/{id=id}")]
        public IHttpActionResult PutStatus(int id, [FromBody] Employee status)    //Modify Status of Employee
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
                    else if (emp.Employee.StatusInfo == "Waiting for Allocation" || emp.Employee.StatusInfo == "Allocated")
                    {
                        emp.Employee.StatusInfo = status.StatusInfo;

                        entity.SaveChanges();

                        return Ok("Employee Status has  Updated Successfully");
                    }
                    else if(emp.Employee.StatusInfo == "Deployed" || emp.Employee.StatusInfo == "Reallocate")
                    {
                        emp.Employee.StatusInfo = status.StatusInfo;
                        entity.SaveChanges();
                        return Ok("Employee Status has Updated Successfully");
                        
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
        [HttpPost]
        [Route("api/PostEmployeeStream")]
        public IHttpActionResult Post([FromBody] EmployeeStream empstream)         //Add new Stream Detail
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    entity.EmployeeStreams.Add(empstream);
                    entity.SaveChanges();

                    string EmpName = entity.Employees.Where(e => empstream.Employee_Id == e.Employee_Id).Select(
                                e => new
                                {
                                    name = e.EmployeeName

                                }).FirstOrDefault().name;

                    string ManagerName = entity.Streams.Where(e => empstream.Stream_Id == e.Stream_Id).Select(
                              e => new
                              {
                                  HeadName = e.COEname

                              }).FirstOrDefault().HeadName;
                    string MailId = entity.Streams.Where(e => empstream.Stream_Id == e.Stream_Id).Select(
                              e => new
                              {

                                  Mail = e.COEmailId

                              }).FirstOrDefault().Mail;

                    EmailGeneration.sendemail(MailId, ManagerName, EmpName);

                    return Ok("Employee Added to the stream Successfully");
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

