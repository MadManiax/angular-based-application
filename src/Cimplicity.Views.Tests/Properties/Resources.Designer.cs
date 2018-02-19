﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Cimplicity.Views.Tests.Properties {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "15.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class Resources {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("Cimplicity.Views.Tests.Properties.Resources", typeof(Resources).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to CREATE PROC [dbo].[sp_VCC_local_reportOverview] 
        ///(
        ///	@workArea VARCHAR(100),
        ///	@workCellFilter VARCHAR(300) = NULL,
        ///	@ruleTypeFilter VARCHAR(400) = NULL,
        ///	@PageNumber AS INT, 
        ///	@PageSize AS INT
        ///)
        ///AS
        ///BEGIN
        ///
        ///	
        ///	
        ///
        ///
        ///	SELECT * 
        ///	FROM ReportOverview 	
        ///	WHERE WorkArea = @workArea
        ///		AND (@workCellFilter IS NULL OR [WorkCell] IN (SELECT DATA FROM dbo.Split(@workCellFilter,&apos;,&apos;) ))
        ///		AND (@ruleTypeFilter IS NULL OR [RuleType] IN (SELECT DATA FROM dbo.Split(@ruleTypeFilter,&apos;,&apos;) ))
        ///	ORDER BY ID
        ///		OFFS [rest of string was truncated]&quot;;.
        /// </summary>
        public static string _01_sp_VCC_local_reportOverview {
            get {
                return ResourceManager.GetString("_01_sp_VCC_local_reportOverview", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to CREATE FUNCTION [dbo].[Split]
        ///(
        ///    @String NVARCHAR(4000),
        ///    @Delimiter NCHAR(1)
        ///)
        ///RETURNS TABLE
        ///AS
        ///RETURN
        ///(
        ///    WITH Split(stpos,endpos)
        ///    AS(
        ///        SELECT 0 AS stpos, CHARINDEX(@Delimiter,@String) AS endpos
        ///        UNION ALL
        ///        SELECT endpos+1, CHARINDEX(@Delimiter,@String,endpos+1)
        ///            FROM Split
        ///            WHERE endpos &gt; 0
        ///    )
        ///    SELECT &apos;Id&apos; = ROW_NUMBER() OVER (ORDER BY (SELECT 1)),
        ///        &apos;Data&apos; = SUBSTRING(@String,stpos,COALESCE(NULLIF(endpos,0),LEN(@String) [rest of string was truncated]&quot;;.
        /// </summary>
        public static string _02_Split {
            get {
                return ResourceManager.GetString("_02_Split", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to CREATE TABLE [dbo].[ReportOverview](
        ///	[ID] [int] IDENTITY(1,1) NOT NULL,
        ///	[WorkArea] [varchar](100) NULL,
        ///	[WorkCell] [varchar](100) NULL,
        ///	[WorkUnit] [varchar](100) NULL,
        ///	[Actual] [int] NULL,
        ///	[Remaining] [int] NULL,
        ///	[Set] [int] NULL,
        ///	[OverFlowRemaining] [int] NULL,
        ///	[OverFlowSet] [int] NULL,
        ///	[RuleName] [varchar](255) NULL,
        ///	[RuleType] [varchar](100) NULL,
        ///PRIMARY KEY CLUSTERED 
        ///(
        ///	[ID] ASC
        ///)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON,  [rest of string was truncated]&quot;;.
        /// </summary>
        public static string _03_ReportOverview {
            get {
                return ResourceManager.GetString("_03_ReportOverview", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to 
        ///
        ///
        ///
        ///
        ///
        ///
        ///
        ///
        ///
        ///
        ///SET IDENTITY_INSERT [dbo].[ReportOverview] ON 
        ///
        ///
        ///INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (1, N&apos;IM900001&apos;, N&apos;WL01&apos;, N&apos;WT01&apos;, 1, 2, 3, NULL, 1, N&apos;Counter Rule Name 1&apos;, N&apos;Counter&apos;)
        ///INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (2, N&apos;IM [rest of string was truncated]&quot;;.
        /// </summary>
        public static string _04_data {
            get {
                return ResourceManager.GetString("_04_data", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to DROP FUNCTION [dbo].[Split]
        ///DROP TABLE [dbo].[ReportOverview]
        ///DROP PROCEDURE [dbo].[sp_VCC_local_reportOverview]
        ///.
        /// </summary>
        public static string clean {
            get {
                return ResourceManager.GetString("clean", resourceCulture);
            }
        }
    }
}
