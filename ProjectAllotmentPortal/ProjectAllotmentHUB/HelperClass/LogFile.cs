using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using ProjectAllotmentHUB.Models;
using Stream = ProjectAllotmentHUB.Models.Stream;

namespace ProjectAllotmentHUB.HelperClass
{
    public class LogFile
    {
        public static void WriteLog(Exception ex)
        {
            string filePath;
            filePath = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "LogFile");
            if (!File.Exists(filePath))
            {
                File.Create(filePath).Dispose();
            }
            using (StreamWriter writer = new StreamWriter(filePath, true))
            {
                writer.WriteLine("-----------------------------------------------------------------------------");
                writer.WriteLine("Date : " + DateTime.Now.ToString());
                writer.WriteLine();

                while (ex != null)
                {
                    writer.WriteLine(ex.GetType().FullName);
                    writer.WriteLine("Message : " + ex.Message);
                    writer.WriteLine("StackTrace : " + ex.StackTrace);

                    ex = ex.InnerException;
                }
            }
        }
        public static void LoginLog(dynamic username)
        {
            string filePath;
            filePath = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "LoginFile");
            if(!File.Exists(filePath))
            {
                File.Create(filePath).Dispose();
            }
            using (StreamWriter writer = new StreamWriter(filePath, true))
            {
                writer.WriteLine("-----------------------------------------------------------------------------");
                writer.WriteLine("User : " + username.COEname);
                writer.WriteLine("Date : " + DateTime.Now.ToString());
                writer.WriteLine();
            }
        }
    }
}