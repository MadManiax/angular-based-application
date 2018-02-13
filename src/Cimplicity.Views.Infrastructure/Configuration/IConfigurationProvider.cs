namespace Cimplicity.Views.Infrastructure.Configuration
{
    public interface IConfigurationProvider
    {
        ICimplicityViewsConfiguration GetConfiguration();
    }
}