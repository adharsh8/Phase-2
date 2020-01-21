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
    public class ProjectController : ApiController
    {
        [HttpGet]
        [Route("api/GetProjectdetails/{name}")]
        public IHttpActionResult Get(string name)                 //Get All Project Details
        {
            try
            {
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var listofProjects = entity.Projects.Where(e => e.StreamName == name).Select(e =>
                     new
                     {
                         projectId = e.Project_Id,
                         projectname = e.ProjectName,
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
        [Route("api/PostProjectdetails")]
        public IHttpActionResult Post([FromBody] Project proj)         //Add new Project Detail
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    entity.Projects.Add(proj);
                    entity.SaveChanges();
                    return Ok("Project Added Successfully");
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
