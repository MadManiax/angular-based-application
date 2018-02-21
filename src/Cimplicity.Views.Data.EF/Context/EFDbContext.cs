using System.Data.Entity;
using Cimplicity.Views.Data.EF.Mapping;
using Cimplicity.Views.Infrastructure.Configuration;

namespace Cimplicity.Views.Data.EF.Context
{
    public class EFDbContext : DbContext
    {   
        private readonly string _defaultSchema;
        
        public EFDbContext(string connectionString) : base(connectionString)
        {
            this.Configuration.LazyLoadingEnabled = true;
            this.Configuration.AutoDetectChangesEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<EFDbContext>(null);
            modelBuilder.HasDefaultSchema(_defaultSchema);

            modelBuilder.Configurations.Add(new SamplingRuleEntityConfiguration());
            modelBuilder.Configurations.Add(new SamplingRuleExecutionConfiguration());
        }
    }
}