using Microsoft.AspNetCore.Mvc;
using LVRCalculatorAPI.Models;
using static LVRCalculatorAPI.Models.LVRCalculate;

namespace LVRCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LVRController : ControllerBase
    {
        [HttpPost("calculate")]
        public IActionResult CalculateLVR([FromBody] LVRCalculate request)
        {
            if (request.PropertyValue <= 0 || request.LoanAmount <= 0)
            {
                return BadRequest(new LVRResponse
                {
                    Message = "Property value and loan amount must be greater than zero."
                });
            }

            // Formula: LVR = Loan Amount / Property Value * 100
            var lvr = (request.LoanAmount / request.PropertyValue) * 100;

            return Ok(new LVRResponse
            {
                LVR = (double)lvr,
                Message = "LVR calculated successfully."
            });
        }
    }
}
