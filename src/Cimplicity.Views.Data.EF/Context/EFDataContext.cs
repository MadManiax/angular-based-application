using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Linq;
using System.Linq.Expressions;
using Cimplicity.Views.Data.Context;
using log4net;

namespace Cimplicity.Views.Data.EF.Context
{
    public class EFDataContext : IDbDataContext
    {
        private DbContext _dbContext;
        private static ILog _logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private string _connectionString;

        public EFDataContext(DbContext context)
        {
            _dbContext = context;
        }

        public EFDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Dispose()
        {
            _dbContext?.Dispose();
        }

        public void Commit()
        {
            _dbContext.SaveChanges();
        }

        public void RollBack()
        {
            _dbContext.Database.CurrentTransaction?.Rollback();
        }

        public IDataContext Create()
        {
            return new EFDataContext(new EFDbContext(_connectionString));
        }

        public TEntity Get<TEntity>(Expression<Func<TEntity, bool>> filter) where TEntity : class
        {
            if (filter == null) throw new ArgumentNullException(nameof(filter));
            TEntity result = null;
            Action block = () => result = _dbContext.Set<TEntity>().FirstOrDefault(filter);
            this.ManageTransaction(block);
            return result;
        }

        public IQueryable<TEntity> Query<TEntity>(Expression<Func<TEntity, bool>> filter = null) where TEntity : class
        {
            IQueryable<TEntity> result = null;
            if (_dbContext == null)
            {
                throw new EntityException("The context must be initialized in ManageTransaction method, before calling this method");
            }
            result = filter == null ? _dbContext.Set<TEntity>() : _dbContext.Set<TEntity>().Where(filter).AsQueryable();
            return result;
        }

        public IEnumerable<TEntity> List<TEntity>(Expression<Func<TEntity, bool>> filter = null) where TEntity : class
        {
            IEnumerable<TEntity> result = null;
            Action block =
                () =>
                    result =
                        filter == null ? _dbContext.Set<TEntity>().ToList() : _dbContext.Set<TEntity>().Where(filter).ToList();
            this.ManageTransaction(block);
            return result;
        }

        public bool Update<TEntity>(TEntity entity) where TEntity : class
        {
            Action block = () =>
            {
                var entry = _dbContext.Entry(entity);
                if (entry.State != EntityState.Modified)
                {
                    entry.State = EntityState.Modified;
                }
            };
            this.ManageTransaction(block);
            return true;
        }

        public void Remove<TEntity>(TEntity entity) where TEntity : class
        {
            Action block = () =>
            {
                var entry = _dbContext.Entry(entity);
                if (entry.State != EntityState.Deleted)
                {
                    entry.State = EntityState.Deleted;
                }
                _dbContext.Set<TEntity>().Remove(entity);
            };
            this.ManageTransaction(block);
        }

        public bool Add<TEntity>(TEntity entity) where TEntity : class
        {
            Action block = () =>
            {
                var entry = _dbContext.Entry(entity);
                if (entry.State != EntityState.Added)
                {
                    entry.State = EntityState.Added;
                }
                _dbContext.Set<TEntity>().Add(entity);
            };
            this.ManageTransaction(block);
            return true;
        }

        public bool Add<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            Action block = () => _dbContext.Set<TEntity>().AddRange(entities);
            this.ManageTransaction(block);
            return true;
        }

        public void InTransaction(Action block)
        {
            if (_dbContext == null)
            {
                _dbContext = new EFDbContext(_connectionString);
            }

            try
            {
                this._dbContext.Database.Log = message => _logger.Debug(message);
                block();
                this.Commit();
            }
            catch (Exception)
            {
                this.RollBack();
                throw;
            }
            _dbContext.Dispose();
            _dbContext = null;
        }

        private void ManageTransaction(Action block)
        {
            if (_dbContext != null)
            {
                this._dbContext.Database.Log = message => _logger.Debug(message);
                block();
            }
            else
            {
                this.InTransaction(block);
            }
        }
    }
}