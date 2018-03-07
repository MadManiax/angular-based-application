using System;
using System.Collections.Generic;
using Cimplicity.UI.Application.Abstractions;
using Cimplicity.UI.Application.Errors;
using Cimplicity.UI.Application.Responses;
using Cimplicity.UI.Data.Repository;
using Cimplicity.UI.Domain.Model;
using log4net;

namespace Cimplicity.UI.Application.Services
{
    class LookupService : ILookupService
    {
        private static readonly ILog Logger =
            LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public LookupService(ILookupRepository repository)
        {
            this.Repository = repository;
        }

        public ILookupRepository Repository { get; set; }
        public TypedServiceResult<IEnumerable<ProductionLine>> GetProductionLines(string workArea)
        {
            TypedServiceResult<IEnumerable<ProductionLine>> response = new TypedServiceResult<IEnumerable<ProductionLine>>();
            try
            {
                response.Result = this.Repository.GetProductionLines(workArea);
            }
            catch (Exception exception)
            {
                var message = "An error occurred while loading the production lines";
                response.Add(ServiceErrorFactory.CreateInternalError(exception,userMessage:message));
                Logger.Error(message, exception);
            }

            return response;
        }

        public TypedServiceResult<IEnumerable<WorkCell>> GetWorkCells(IEnumerable<ProductionLine> productionLines)
        {
            TypedServiceResult<IEnumerable<WorkCell>> response = new TypedServiceResult<IEnumerable<WorkCell>>();
            try
            {
                response.Result = this.Repository.GetWorkCells(productionLines);
            }
            catch (Exception exception)
            {
                var message = "An error occurred while loading the work cells";
                response.Add(ServiceErrorFactory.CreateInternalError(exception, userMessage: message));
                Logger.Error(message, exception);
            }

            return response;
        }

        public TypedServiceResult<IEnumerable<WorkUnit>> GetWorkUnits(IEnumerable<WorkCell> workCells)
        {
            TypedServiceResult<IEnumerable<WorkUnit>> response = new TypedServiceResult<IEnumerable<WorkUnit>>();
            try
            {
                response.Result = this.Repository.GetWorkUnits(workCells);
            }
            catch (Exception exception)
            {
                var message = "An error occurred while loading the work units";
                response.Add(ServiceErrorFactory.CreateInternalError(exception, userMessage: message));
                Logger.Error(message, exception);
            }

            return response;
        }

        public TypedServiceResult<IEnumerable<Material>> GetMaterialDefinitions(IEnumerable<WorkCell> workCells, IEnumerable<WorkUnit> workUnits)
        {
            TypedServiceResult<IEnumerable<Material>> response = new TypedServiceResult<IEnumerable<Material>>();
            try
            {
                response.Result = this.Repository.GetMaterialDefinitions(workCells,workUnits);
            }
            catch (Exception exception)
            {
                var message = "An error occurred while loading the material definitions";
                response.Add(ServiceErrorFactory.CreateInternalError(exception, userMessage: message));
                Logger.Error(message, exception);
            }

            return response;
        }

        public TypedServiceResult<IEnumerable<string>> GetRuleTypes()
        {
            TypedServiceResult<IEnumerable<string>> response = new TypedServiceResult<IEnumerable<string>>();
            try
            {
                response.Result = this.Repository.GetRuleTypes();
            }
            catch (Exception exception)
            {
                var message = "An error occurred while loading the rule types";
                response.Add(ServiceErrorFactory.CreateInternalError(exception, userMessage: message));
                Logger.Error(message, exception);
            }

            return response;
        }
    }
}