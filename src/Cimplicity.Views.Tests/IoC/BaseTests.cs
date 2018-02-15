using System.Web.Http;
using Autofac;
using Autofac.Extras.Moq;
using AutoMapper;
using Cimplicity.Views.WebApi;
using NUnit.Framework;
using NUnit.Framework.Constraints;

namespace Cimplicity.Views.Tests.IoC
{
    [TestFixture]
    public class BaseTests
    {
        protected IContainer ContainerBuilder { get; set; }
        protected HttpConfiguration HttpConfiguration { get; set; }

        [SetUp]
        public virtual void Setup()
        {
            Bootstrapper.Start();
            ContainerBuilder = Bootstrapper.Container;
            HttpConfiguration = GlobalConfiguration.Configuration;
        }


        [TearDown]
        public virtual void TearDown()
        {
            this.HttpConfiguration.Dispose();
            this.ContainerBuilder.Dispose();
            Mapper.Reset();
        }
    }
}