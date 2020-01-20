using ProjectAllotmentHUB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace ProjectAllotmentHUB.HelperClass
{
    public class EmailGeneration
    {
        public static void sendemail(string emailID,string COEname,string empname)
        {
            var fromEmail = new MailAddress("generateemail2019@gmail.com", "HR HUB");
            var toEmail = new MailAddress(emailID);
            var fromEmailPassword = "Psiog@123";
        
            string subject = "STREAM ALLOTMENT" ;
            string body = "<br/><br/> " + "Hi" + COEname + ":" + "<br/>" +
                "Allocating the employee:" + empname + "to your Department.";
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
            };
            using (var message = new MailMessage(fromEmail, toEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })
                smtp.Send(message);
        }
        public static void SendEmployeeMail(EmployeeProject project,string name, string mail, string proName,string roleName)
        {
            var fromEmail = new MailAddress("generateemail2019@gmail.com", "HR HUB");
            var toEmail = new MailAddress(mail);
            var fromEmailPassword = "Psiog@123";

            string subject = "PROJECT ALLOTMENT ";
            string body = "<br/> <br/> " + "Hi " + name + ":" + "<br/>" +
                            "You have allocated to the Project : "+ proName + "<br/>"   + "<br/>" +
                            "Start of Project : " + " " + project.StartDate + "<br/>" +
                            "End of Project : " +  project.EndDate + "<br/>" +
                            "Role of the Project : " + roleName + "<br/>" +   "<br/>" +
                            "All the Best..!";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
            };
            using (var message = new MailMessage(fromEmail, toEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })
                smtp.Send(message);
        }
        public static void SendNewJoinersMail(string name, string mail)
        {
            var fromEmail = new MailAddress("generateemail2019@gmail.com", "HR HUB");
            var toEmail = new MailAddress(mail);
            var fromEmailPassword = "Psiog@123";

            string subject = "STREAM ALLOTMENT - Reminder:";
            string body = "<br/> <br/>" + "The candidate" + name + "joined the organisation and completed his/her Training."
                            + "<br/>" + "Please allocate stream for the candidate.";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
            };
            using (var message = new MailMessage(fromEmail, toEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })
                smtp.Send(message);
        }
    }
}
