using Microsoft.Owin.Security.OAuth;
using ProjectAllotmentHUB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;


namespace ProjectAllotmentHUB.HelperClass
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            string message = DbOperations.ValidateLogin(context.UserName, context.Password, out Stream user);
            {
                using(ProjectAllocationDBEntities entity = new ProjectAllocationDBEntities())
                {
                    if(user != null)
                    {
                        identity.AddClaim(new Claim(ClaimTypes.Role, user.COEname));

                        var result = from es in entity.Streams
                                     select new
                                     {
                                       es.Username,
                                       es.StreamName,
                                       es.COEname,
                                       es.COEmailId,
                                       es.Stream_Id
                                  
                                     };
                        foreach(var obj in result)
                        {
                            if(obj.Stream_Id == user.Stream_Id)
                            {
                                //identity.AddClaim(new Claim("Stream_Id", obj.Stream_Id.ToString()));
                                identity.AddClaim(new Claim("Username",obj.Username));
                                identity.AddClaim(new Claim("COEname",obj.COEname));
                                identity.AddClaim(new Claim("COEmailId",obj.COEmailId));
                                identity.AddClaim(new Claim("StreamName",obj.StreamName));
                                
                                context.Validated(identity);
                                break;
                            }
                            else
                            {
                                context.SetError(message);
                            }
                        }
                    }
                    else
                    {
                        context.SetError(message);
                    }
                }
            }
        }
    }
}