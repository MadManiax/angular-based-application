using System.Data.Entity.ModelConfiguration;

namespace Cimplicity.Views.Data.EF.Mapping
{
    public abstract class BaseEntityConfiguration<TEntity> : EntityTypeConfiguration<TEntity> where TEntity:class
    {
        protected BaseEntityConfiguration(string tableName, string schema = "dbo")
        {
            this.ToTable(tableName, schema);
        }
       
    }
}