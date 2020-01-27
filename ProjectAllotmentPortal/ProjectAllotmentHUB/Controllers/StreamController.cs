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
        [HttpGet]
        [Route ("api/GetWelcomeCard/{user}")]
        public IHttpActionResult GetWelcomeCard(string user)
        {
            try
            {
                using(ProjectAllocationDBEntities entity =new ProjectAllocationDBEntities())
                {
                    var Displaydetails = (from str in entity.Streams.Where(e => e.Username == user)
                                          select new
                                          {
                                              str.Username,
                                              str.COEname,
                                              str.COEmailId,
                                              str.StreamName
                                          }).ToList();

                    return Ok(Displaydetails);
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpGet]
        [Route ("api/CheckUsername")]
        public IHttpActionResult CheckUsername()
        {
            try
            {
                using(ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    var listofUser = from str in entity.Streams
                                     select new
                                     {
                                         str.Username
                                     };
                 

                    return Ok(listofUser.ToList()); 
                }
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpPost]
        [Route ("api/resetPasswordlink/{user}")]
        public IHttpActionResult ForgotPassword(string user)
        {
            try
            {
                using(ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    string MailId = entity.Streams.FirstOrDefault(e => e.Username == user).COEmailId;
                    EmailGeneration.ForgotPassword(MailId, user);
                }
                return Ok("Mail Sent Successfully");
            }
            catch(Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
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

