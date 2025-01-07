namespace LVRCalculatorAPI.Models
{
    public class LVRCalculate
    {

        public decimal PropertyValue { get; set; }
        public decimal LoanAmount { get; set; }


        public class LVRResponse
        {
            public double LVR { get; set; }
            public string Message { get; set; } = string.Empty;
        }
    }
}
