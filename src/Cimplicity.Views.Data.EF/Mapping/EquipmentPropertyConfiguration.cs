using Cimplicity.Views.Domain.Model;

namespace Cimplicity.Views.Data.EF.Mapping
{
    public class EquipmentPropertyConfiguration : BaseEntityConfiguration<EquipmentProperty>
    {
        public const string TableName = "Property_Equipment_EquipmentClass";

        public EquipmentPropertyConfiguration() : base(TableName)
        {
            this.HasKey(entity => entity.EquipmentId);
            this.Property(entity => entity.S95Id);
            this.Property(entity => entity.PropertyName);
            this.HasOptional(entity => entity.PropertyValue);
        }
    }
}