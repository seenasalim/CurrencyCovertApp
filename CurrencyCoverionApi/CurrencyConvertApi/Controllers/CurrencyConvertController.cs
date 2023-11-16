using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Any;
using System.Globalization;
using System.Text.RegularExpressions;

namespace CurrencyConvertApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CurrencyConvertController : ControllerBase
    {
     
        private readonly ILogger<CurrencyConvertController> _logger;
        private readonly IConfiguration _configuration;

        public CurrencyConvertController(ILogger<CurrencyConvertController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet(Name = "GetCurrencyConversionDetails")]
        public Task<dynamic> Get(string fromCurrency, string toCurrency, string? date)
        {
            return GetExchangeRate(fromCurrency, toCurrency, date);
        }

        async Task<dynamic> GetExchangeRate(string fromCurrency, string toCurrency, string? date)
        {
            dynamic jsonData = new System.Dynamic.ExpandoObject();
            using (HttpClient client = new HttpClient())
            {
                string bcApi = _configuration.GetValue<string>("myLinks:bankofcanadaApi");
                //checking date is null or not then execute api accordingly
                string apiUrl = date == null ? bcApi + $"{fromCurrency}{toCurrency}/json?recent=1"
                    : bcApi + $"{fromCurrency}{toCurrency}/?start_date={date}&end_date={date}";
                HttpResponseMessage response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    jsonData = await response.Content.ReadAsStringAsync();
                }

            }
            return jsonData;
        }
    }
}
