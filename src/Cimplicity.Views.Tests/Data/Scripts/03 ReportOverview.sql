CREATE TABLE [dbo].[ReportOverview](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[WorkArea] [varchar](100) NULL,
	[WorkCell] [varchar](100) NULL,
	[WorkUnit] [varchar](100) NULL,
	[Actual] [int] NULL,
	[Remaining] [int] NULL,
	[Set] [int] NULL,
	[OverFlowRemaining] [int] NULL,
	[OverFlowSet] [int] NULL,
	[RuleName] [varchar](255) NULL,
	[RuleType] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]