using System;
using System.Web.Http;
using System.Web.Http.Cors;
using Cimplicity.UI.Application.Responses;
using log4net;

namespace Cimplicity.UI.WebApi.Controllers
{
    [EnableCors(origins: "http://localhost:63576", headers: "*", methods: "*")]
    public class ApiBaseController : ApiController
    {
        public static readonly ILog Logger =
            LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        protected IHttpActionResult UnitOfWork(Func<IServiceResult> act, string message)
        {
            try
            {
                var result = act();

                if (result.Status != ResultStatus.Error)
                {
                    return Ok(result);
                }

                return InternalServerError(result.ToException());

            }
            catch (Exception exception)
            {
                
                Logger.Error(message, exception);
                return InternalServerError(exception);
            }
        }
    }
}