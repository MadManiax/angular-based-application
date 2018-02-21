using Cimplicity.Views.Domain.Model;

namespace Cimplicity.Views.Data.EF.Mapping
{
    public class EquipmentConfiguration : BaseEntityConfiguration<Equipment>
    {
        public const string TableName = "Equipment";
        public EquipmentConfiguration() : base(TableName)
        {
            this.HasKey(entity => entity.EquipmentId);
            this.Property(entity => entity.ParentEquipmentId);
            this.Property(entity => entity.S95Id);
        }
    }
}