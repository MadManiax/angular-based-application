namespace Cimplicity.Views.Infrastructure.Configuration
{
    public interface ICimplicityViewsConfiguration
    {
       
        IDataInfo ReadDataInfo { get; }
        IDataInfo WriteDataInfo { get; }
        int RefreshFrequency { get; }
        string RepositoryAssemblyName { get; }
    }
}
