namespace Cimplicity.Views.Infrastructure.Configuration
{
    public interface IDataInfo
    {
        StorageType StorageType { get; }
        string ConnectionString { get; }

        string Name { get; }
    }
}