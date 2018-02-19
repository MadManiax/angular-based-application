using System;
using System.Collections.Generic;
using System.Linq;
using Autofac;
using Cimplicity.Views.Application.Abstractions;
using Cimplicity.Views.Application.Responses;
using Cimplicity.Views.Application.ViewModel;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Domain.Model;
using Cimplicity.Views.Infrastructure.Mapping;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Cimplicity.Views.Tests.IoC
{
    public class ReportOverviewServiceTests : BaseTests
    {
        [Test]
        public void test_service_retrieve_one_value()
        {
           
            var workArea = "WL900001";
            var serviceMock = new Mock<IReportOverviewRepository>();
            serviceMock.Setup(repository => repository.Get(It.Is<string>(prm => prm == workArea), null,It.IsAny<string>(),It.IsAny<string>(), null, It.Is<int>(prm => prm == 1), It.Is<int>(prm => prm == 20)))
                .Returns(new List<ReportOverview>()
                {
                    new ReportOverview()
                    {
                        WorkUnit = "Test"
                    }
                });

            using (var scope = this.ContainerBuilder.BeginLifetimeScope())
            {
                var service = scope.Resolve<IReportOverviewService>();
                service.Repository = serviceMock.Object;
                var actual = service.Get(workArea);
                actual.Should().NotBeNull().And.BeOfType<TypedServiceResult<IEnumerable<ReportOverviewViewModel>>>();
                actual.Result.Should().NotBeNullOrEmpty().And.HaveCount(1).And.Contain(el => el.WorkUnit == "Test");
                actual.Status.Should().Be(ResultStatus.Success);
            }
        }

        [Test]
        public void test_service_retrieve_null_value()
        {

            var workArea = "WL900001";
            var serviceMock = new Mock<IReportOverviewRepository>();
            serviceMock.Setup(repository => repository.Get(It.Is<string>(prm => prm == workArea), null, It.IsAny<string>(), It.IsAny<string>(), null, It.Is<int>(prm => prm == 1), It.Is<int>(prm => prm == 20)))
                .Returns((IEnumerable<ReportOverview>) null);

            using (var scope = this.ContainerBuilder.BeginLifetimeScope())
            {
                var service = scope.Resolve<IReportOverviewService>();
                service.Repository = serviceMock.Object;
                var actual = service.Get(workArea);
                actual.Should().NotBeNull().And.BeOfType<TypedServiceResult<IEnumerable<ReportOverviewViewModel>>>();
                actual.Result.Should().BeNull();
                actual.Status.Should().Be(ResultStatus.Success);
            }
        }


        [Test]
        public void test_service_throws_an_exception()
        {

            var workArea = "WL900001";
            var serviceMock = new Mock<IReportOverviewRepository>();
            var exceptionMessageExpected = "mocked exception";
            serviceMock.Setup(repository => repository.Get(It.Is<string>(prm => prm == workArea), null, It.IsAny<string>(), It.IsAny<string>(), null, It.Is<int>(prm => prm == 1), It.Is<int>(prm => prm == 20)))
                .Throws(new Exception(exceptionMessageExpected));

            using (var scope = this.ContainerBuilder.BeginLifetimeScope())
            {
                var service = scope.Resolve<IReportOverviewService>();
                service.Repository = serviceMock.Object;
                var actual = service.Get(workArea);
                actual.Should().NotBeNull().And.BeOfType<TypedServiceResult<IEnumerable<ReportOverviewViewModel>>>();
                actual.Result.Should().BeEmpty();
                actual.Status.Should().Be(ResultStatus.Error);
                actual.Errors.Should().NotBeNullOrEmpty().And.HaveCount(1).And
                    .Contain(item => item.Context == "GenericError");
                actual.Message.Should().Contain(exceptionMessageExpected);
                var error = actual.Errors.First();
                error.Exception.Should().NotBeNull();
                error.Exception.Message.Should().Be(exceptionMessageExpected);
                error.IsGenericError.Should().BeTrue();
                error.UserMessage.Should().Be("Error while getting the datas from the repository");
                error.Message.Should().Be(error.Exception.Message);
            }
        }

        

        [Test]
        public void test_service_pagination()
        {
            var workArea = "WR900001";
            var list = new List<ReportOverview>()
            {
                ObjectStubs.CreateStub("WL900001", "WT900001", 2, 4, 0, "counter rule 1"),
                ObjectStubs.CreateStub("WL900001", "WT900002", 2, 10, 0, "counter rule 2"),
                ObjectStubs.CreateStub("WL900001", "WT900003", 1000, 5000, 0, "timing rule 1"),
                ObjectStubs.CreateStub("WL900001", "WT900004", 1000, 7000, 0, "timing rule 2", RuleType.Timing),
                ObjectStubs.CreateStub("WL900001", "WT900005", 5, 5, 5, "counter rule 3"),

                ObjectStubs.CreateStub("WL900001", "WT900006", 2, 7, 6, "counter rule 4"),
                ObjectStubs.CreateStub("WL900002", "WT920001", 0, 0, 0, "event rule 1", RuleType.Event),
                ObjectStubs.CreateStub("WL900002", "WT920002", 2, 4, 0, "counter rule 5"),
                ObjectStubs.CreateStub("WL900002", "WT920003", 2, 4, 0, "counter rule 6"),
                ObjectStubs.CreateStub("WL900002", "WT920004", 2, 4, 0, "counter rule 7"),

                ObjectStubs.CreateStub("WL900003", "WT930001", 2, 4, 0, "counter rule 8"),
                ObjectStubs.CreateStub("WL900003", "WT930002", 2, 4, 0, "counter rule 9"),
                ObjectStubs.CreateStub("WL900003", "WT930003", 2, 4, 0, "counter rule 10"),
                ObjectStubs.CreateStub("WL900004", "WT940001", 2, 4, 0, "counter rule 11"),
                ObjectStubs.CreateStub("WL900005", "WT950001", 2, 4, 2, "counter rule 12"),
                ObjectStubs.CreateStub("WL900005", "WT950002", 2, 40, 0, "counter rule 13")
            };
            var pageNumber = 1;
            var pageSize = 5;
            
            var serviceMock = new Mock<IReportOverviewRepository>();
            serviceMock.Setup(repository => repository.Get(It.Is<string>(prm => prm == workArea), null,It.IsAny<string>(), It.IsAny<string>(), null,
                    It.Is<int>(prm => prm == pageNumber), It.Is<int>(prm => prm == pageSize)))
                .Returns(list.Skip((pageNumber-1)*pageSize).Take(pageSize));



            using (var scope = this.ContainerBuilder.BeginLifetimeScope())
            {
                var service = scope.Resolve<IReportOverviewService>();
                service.Repository = serviceMock.Object;
                var actual = service.Get(workArea, pageNumber: pageNumber, pageSize: pageSize);
                actual.Should().NotBeNull().And.BeOfType<TypedServiceResult<IEnumerable<ReportOverviewViewModel>>>();
                actual.Result.Should().NotBeNullOrEmpty().And.HaveCount(pageSize);
                actual.Status.Should().Be(ResultStatus.Success);

                var first = actual.Result.FirstOrDefault();
                var expectedFirst = list.First().MapTo<ReportOverviewViewModel>();
                first.Should().NotBeNull().And.Be(expectedFirst);

                var last = actual.Result.LastOrDefault();
                var expectedLast = list.FirstOrDefault(item => item.WorkCell == "WL900001" && item.WorkUnit == "WT900005").MapTo<ReportOverviewViewModel>();
                last.Should().NotBeNull().And.Be(expectedLast);

                pageNumber = 2;
                pageSize = 10;

                serviceMock.Setup(repository => repository.Get(It.Is<string>(prm => prm == workArea), null, It.IsAny<string>(), It.IsAny<string>(), null,
                        It.Is<int>(prm => prm == pageNumber), It.Is<int>(prm => prm == pageSize)))
                    .Returns(list.Skip((pageNumber - 1) * pageSize).Take(pageSize));
                service.Repository = serviceMock.Object;

                actual = service.Get(workArea, pageNumber: pageNumber, pageSize: pageSize);
                actual.Should().NotBeNull().And.BeOfType<TypedServiceResult<IEnumerable<ReportOverviewViewModel>>>();
                var expectedCount = pageSize - ((pageSize * pageNumber) - list.Count);
                actual.Result.Should().NotBeNullOrEmpty().And.HaveCount(expectedCount);
                actual.Status.Should().Be(ResultStatus.Success);

                first = actual.Result.FirstOrDefault();
                expectedFirst = list.FirstOrDefault(item => item.WorkCell == "WL900003" && item.WorkUnit == "WT930001").MapTo<ReportOverviewViewModel>();
                first.Should().NotBeNull().And.Be(expectedFirst);

                last = actual.Result.LastOrDefault();
                expectedLast = list.FirstOrDefault(item => item.WorkCell == "WL900005" && item.WorkUnit == "WT950002").MapTo<ReportOverviewViewModel>();
                last.Should().NotBeNull().And.Be(expectedLast);

                pageNumber = 10;
                pageSize = 100;

                serviceMock.Setup(repository => repository.Get(It.Is<string>(prm => prm == workArea), null, It.IsAny<string>(), It.IsAny<string>(), null,
                        It.Is<int>(prm => prm == pageNumber), It.Is<int>(prm => prm == pageSize)))
                    .Returns(list.Skip((pageNumber - 1) * pageSize).Take(pageSize));
                service.Repository = serviceMock.Object;

                actual = service.Get(workArea, pageNumber:pageNumber, pageSize:pageSize);
                actual.Should().NotBeNull().And.BeOfType<TypedServiceResult<IEnumerable<ReportOverviewViewModel>>>();
                
                actual.Result.Should().NotBeNull().And.BeEmpty();
                actual.Status.Should().Be(ResultStatus.Success);

            }

        }
    }
}