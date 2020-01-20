using ProjectAllotmentHUB.HelperClass;
using ProjectAllotmentHUB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace ProjectAllotmentHUB.Controllers
{
    public class StreamController : ApiController
    {

        [HttpGet]
        [Route("api/GetStreamdetails")]
        public IHttpActionResult Get()                 //Get All Stream Details
        {
            try
            {
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var listofStreams = entity.Streams.Select(e => new
                    {
                        stream_Id = e.Stream_Id,
                        coeName = e.COEname,
                        coeMailId = e.COEmailId,
                        username = e.Username,
                        password = e.Password,
                        streamname = e.StreamName
                    });
                    return Ok(listofStreams.ToList());
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("api/GetUserClaims")]
        [Authorize]
        public Stream GetUserClaims()
            {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            Stream stream = new Stream()
            {
               // Stream_Id = int.Parse(identityClaims.FindFirst("Stream_Id").Value),
                Username = identityClaims.FindFirst("Username").Value,
                COEname = identityClaims.FindFirst("COEName").Value,
                COEmailId = identityClaims.FindFirst("COEmailId").Value,
                StreamName = identityClaims.FindFirst("StreamName").Value,
                

            };
            return stream;
            }



        [HttpPost]
        [Route("api/PostStreamdetails")]
        public IHttpActionResult Post([FromBody] Stream stream)         //Add new Stream Detail
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                using (ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    entity.Streams.Add(stream);
                    entity.SaveChanges();
                    return Ok("Stream Added Successfully");
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

