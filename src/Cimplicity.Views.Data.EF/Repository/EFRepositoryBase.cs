using Cimplicity.Views.Data.Context;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Infrastructure.Configuration;

namespace Cimplicity.Views.Data.EF.Repository
{
    public abstract class EFRepositoryBase : RepositoryBase
    {
        private readonly ICimplicityViewsConfiguration _configuration;
        protected string ConnectionString { get; set; }

        protected IDbDataContext DataContext { get; set; }

        protected EFRepositoryBase(ICimplicityViewsConfiguration configuration)
        {
            _configuration = configuration;
        }
    }



}