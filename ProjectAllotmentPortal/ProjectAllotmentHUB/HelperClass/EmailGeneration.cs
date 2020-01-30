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
            var fromEmail = new MailAddress("generateemail2019@gmail.com", "Project Allotment Portal");
            var toEmail = new MailAddress(emailID);
            var fromEmailPassword = "Psiog@123";
        
            string subject = "STREAM ALLOTMENT" ;
            string body = "<br/><br/> " + "Hi " + COEname + ": " + "<br/>" +
                "The employee  " + empname + " is been allocated to your Department." + "<br/>" +
                "Kindly, Allocate Project for the Employee ASAP." + "<br/>" +
                "<br/>" +
                 "<img src=https://media.glassdoor.com/sqll/945068/psiog-digital-squarelogo-1468915701259.png />"+
                  "<br/>" + "Warm Regards" ;
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
            var fromEmail = new MailAddress("generateemail2019@gmail.com", "Project Allotment Portal");
            var toEmail = new MailAddress(mail);
            var fromEmailPassword = "Psiog@123";

            string subject = "PROJECT ALLOTMENT ";
            string body = "<br/> <br/> " + "Hi  " + name + ":" + "<br/>" +
                            "You have allocated to the Project : "+ proName + "<br/>"   + "<br/>" +
                            "Start of Project : " + " " + project.StartDate.ToString("dd/MM/yyyy") + "<br/>" +
                            "End of Project : " +  project.EndDate.ToString("dd/MM/yyyy") + "<br/>" +
                            "Role of the Project : " + roleName + "<br/>" +   "<br/>" +
                            "Best Wishes !" + 
                            "<img src=https://media.glassdoor.com/sqll/945068/psiog-digital-squarelogo-1468915701259.png />";

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
            var fromEmail = new MailAddress("generateemail2019@gmail.com", "Project Allotment Portal");
            var toEmail = new MailAddress(mail);
            var fromEmailPassword = "Psiog@123";

            string subject = "STREAM ALLOTMENT - Gentle Reminder:";
            string body = "<br/> <br/>" + "The candidate " + name + "  joined the organisation and completed his/her Training."
                            + "<br/>" + "Please allocate stream for the candidate." + "<br/>" +
                            "<br/>" +
                            "<img src=https://media.glassdoor.com/sqll/945068/psiog-digital-squarelogo-1468915701259.png />"+
                            "<br/>" + "Warm Regards";

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
        public static void ForgotPassword(string MailId, string user)
        {
            var fromEmail = new MailAddress("generateemail2019@gmail.com", "HR HUB");
            var toEmail = new MailAddress(MailId);
            var fromEmailPassword = "Psiog@123";

           var subject = "Reset Password";
           var body = "Hi,<br/><br/>We got request for reset your account password. Please click on the below link to reset your password" +
                "<br/><br/><a href=" + "http://localhost:4200/resetpassword/" + user + ">Reset Password link</a>";

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
