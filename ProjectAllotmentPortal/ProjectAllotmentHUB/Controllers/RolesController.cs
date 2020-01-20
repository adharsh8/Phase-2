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
    public class RolesController : ApiController
    {
        [HttpGet]
        [Route("api/GetRolesdetails")]
        public IHttpActionResult Get()                 //Get All Roles Details
        {
            try
            {
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var listofProjects = entity.Roles.Select(e => new
                    {
                        rolesid = e.Roles_Id,
                        rolesname = e.RoleName
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
    }
}
