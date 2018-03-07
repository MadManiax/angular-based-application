using System;
using Cimplicity.UI.Application.Responses;
using Cimplicity.UI.Application.ViewModel;
using Cimplicity.UI.Data.Repository;
using log4net;
using Magnum.Extensions;

namespace Cimplicity.UI.Application.Abstractions
{
    public interface ISamplingRuleExecutionService : IApplicationService
    {
        ISamplingRuleExecutionRepository Repository { get; set; }

        ServiceResult Edit(EditTimerRuleViewModel viewModel);
        ServiceResult Edit(EditCounterRuleViewModel viewModel);

        ServiceResult Trigger(TriggerTimerRuleViewModel viewModel);
        ServiceResult Trigger(TriggerCounterRuleViewModel viewModel);
    }

    class SamplingRuleExecutionService : ISamplingRuleExecutionService
    {
        public static ILog Logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public ISamplingRuleExecutionRepository Repository { get; set; }
        public ServiceResult Edit(EditTimerRuleViewModel viewModel)
        {
            Logger.Debug($"Edit(EditTimerRuleViewModel)  viewModel: {viewModel.Stringify()}");
            ServiceResult result = new ServiceResult();

            try
            {
                this.Repository.Edit(viewModel.RuleExecutionId,viewModel.Actual,viewModel.Seconds);
            }
            catch (Exception exception)
            {
                var message = $"an error occurred during the Edit Timer operation. Parameters {viewModel.Stringify()}";
                Logger.Error(message, exception);
            }

            return result;
        }

        public ServiceResult Edit(EditCounterRuleViewModel viewModel)
        {
            Logger.Debug($"Edit(EditCounterRuleViewModel)  viewModel: {viewModel.Stringify()}");
            ServiceResult result = new ServiceResult();

            try
            {
                this.Repository.Edit(viewModel.RuleExecutionId, viewModel.Counter);
            }
            catch (Exception exception)
            {
                var message = $"an error occurred during the Edit Counter operation. Parameters {viewModel.Stringify()}";
                Logger.Error(message, exception);
            }

            return result;
        }

        public ServiceResult Trigger(TriggerTimerRuleViewModel viewModel)
        {
            Logger.Debug($"Trigger(TriggerTimerRuleViewModel)  viewModel: {viewModel.Stringify()}");
            ServiceResult result = new ServiceResult();

            try
            {
                this.Repository.TriggerNext(viewModel.RuleExecutionId, viewModel.LastSamplingDate, viewModel.Set);
            }
            catch (Exception exception)
            {
                var message = $"an error occurred during the Trigger Counter operation. Parameters {viewModel.Stringify()}";
                Logger.Error(message, exception);
            }

            return result;
        }

        public ServiceResult Trigger(TriggerCounterRuleViewModel viewModel)
        {
            Logger.Debug($"Trigger(TriggerCounterRuleViewModel)  viewModel: {viewModel.Stringify()}");
            ServiceResult result = new ServiceResult();

            try
            {
                this.Repository.Edit(viewModel.RuleExecutionId, viewModel.Set);
            }
            catch (Exception exception)
            {
                var message = $"an error occurred during the Trigger Counter operation. Parameters {viewModel.Stringify()}";
                Logger.Error(message, exception);
            }

            return result;
        }
    }
}