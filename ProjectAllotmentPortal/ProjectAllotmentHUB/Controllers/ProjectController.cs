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
        [Route("api/GetProjectdetails")]
        public IHttpActionResult Get()                 //Get All Project Details
        {
            try
            {
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var listofProjects = entity.Projects.Select(e => new
                    {
                        project_Id = e.Project_Id,
                        projectname = e.ProjectName,
                        projectenddate = e.ProjectEndDate,
                        streamname = e.StreamName
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
