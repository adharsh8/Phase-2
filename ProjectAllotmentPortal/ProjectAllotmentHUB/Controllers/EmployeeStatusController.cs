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
    public class EmployeeStatusController : ApiController
    {
        [HttpGet]
        [Route("api/GetEmployeeStatus")]
        public IHttpActionResult Get()                 //Get All Project Details
        {
            try
            {
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var listofProjects = entity.EmployeeStatus.Select(e => new
                    {
                        employeestatus_id = e.EmployeeStatus_Id,
                        statustype = e.StatusType
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
        [HttpPost]
        [Route("api/PostEmployeeStatus")]
        public IHttpActionResult Post([FromBody] EmployeeStatu status)         //Add new EmployeeStatus Detail
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    entity.EmployeeStatus.Add(status);
                    entity.SaveChanges();
                    return Ok("Employee-Status Added Successfully");
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
