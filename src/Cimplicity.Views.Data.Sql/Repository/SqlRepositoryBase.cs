using System;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Remoting.Messaging;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Infrastructure.Configuration;
using Utils.Extensions.Reflection;

namespace Cimplicity.Views.Data.Sql.Repository
{
    public abstract class SqlRepositoryBase : RepositoryBase
    {
        protected string ConnectionString { get; set; }

        protected StorageType StorageType { get; set; }

        protected SqlRepositoryBase(ICimplicityViewsConfiguration configuration)
        {
            
        }

        public IDbDataParameter CreateDataParameter<TValueType>(string name, TValueType value)
        {
            var type = typeof(TValueType);
            
            switch (StorageType)
            {
                case StorageType.Default:
                case StorageType.AdoNet:
                    return new SqlParameter(name,type.GetDbType())
                    {
                        Value =  value
                    };
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}