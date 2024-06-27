using Microsoft.AspNetCore.Mvc;

namespace HelpdeskAPI.Controllers
{
    public class TestController : Controller
    {
        //private readonly ILogger<TestController> _logger;
        //private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(TestController));

        //public TestController(ILogger<TestController> logger)
        //{
        //    _logger = logger;
        //}
        [Route("test")]
        public IActionResult Get()
        {
            //_logger.LogInformation("API was called");
            //log.Info("Logger is working");
            return Ok("Let's go");
        }
    }
}
