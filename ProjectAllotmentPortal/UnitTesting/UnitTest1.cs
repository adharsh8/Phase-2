using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectAllotmentHUB.HelperClass;
using ProjectAllotmentHUB.Models;

namespace UnitTesting
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void ValidLoginCredentials()
        {
            var output = "Login Successful!";
            var logintest = DbOperations.ValidateLogin("P001", "asd123", out Stream user);
            Assert.AreEqual(output, logintest);
        }
        [TestMethod]
        public void InValidPassword()
        {
            var output = "Incorrect Password";
            var passwordtest = DbOperations.ValidateLogin("P001", "ASd123", out Stream user);
            Assert.AreEqual(output, passwordtest);
        }
        [TestMethod]
        public void InvalidLoginCredentials()
        {
            var output = "Invalid Credentials";
            var invalidlogin = DbOperations.ValidateLogin("P005", "ASd123", out Stream user);
            Assert.AreEqual(output, invalidlogin);
        }
    }
}
