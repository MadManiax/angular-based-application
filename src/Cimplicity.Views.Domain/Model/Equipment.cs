using System;

namespace Cimplicity.Views.Domain.Model
{
    public class Equipment
    {
        public string S95Id { get; set; }
        public Guid EquipmentId { get; set; }
        public Guid ParentEquipmentId { get; set; }
    }

    public class EquipmentProperty
    {
        public string S95Id { get; set; }
        public Guid EquipmentId { get; set; }

        public string PropertyName { get; set; }
        public object PropertyValue { get; set; }
    }
}