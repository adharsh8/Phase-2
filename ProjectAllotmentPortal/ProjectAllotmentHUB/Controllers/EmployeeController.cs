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
        [HttpGet]
        [Route("api/GetEmployee")]
        [ResponseType(typeof(Employee))]
        public IHttpActionResult Get()                 //Get All Employee Details not Allocated Streams
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

                    //string MailId = entity.Streams.Where(e => e.Stream_Id == 1001 ).Select(
                    //                e => new
                    //                {

                    //                    Mail = e.COEmailId

                    //                }).FirstOrDefault().Mail;
                    //var trigger = entity.Employees.Where(e =>(EntityFunctions.DiffDays(e.DOJ,today)>=5)).Select(e =>
                    //new {
                    //        employeename = e.EmployeeName,
                    //        //employeemail = e.EmployeeMailId
                    //    }).ToList();

                    //foreach(var obj in trigger)
                    //{
                    //    string names = obj.employeename;
                    //    //string mails = obj.employeemail;
                    //    EmailGeneration.SendNewJoinersMail(names, MailId);
                    //}

                    return Ok(listofEmployees.ToList());
                }
            }
            catch (Exception ex)
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
      
    }
}
