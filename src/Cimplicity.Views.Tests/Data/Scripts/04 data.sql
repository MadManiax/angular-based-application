










SET IDENTITY_INSERT [dbo].[ReportOverview] ON 


INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (1, N'IM900001', N'WL01', N'WT01', 1, 2, 3, NULL, 1, N'Counter Rule Name 1', N'Counter')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (2, N'IM900001', N'WL01', N'WT01', 1000, 2000, 3000, NULL, 1000, N'Timing Rule Name 1', N'Timing')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (3, N'IM900001', N'WL01', N'WT02', NULL, NULL, NULL, NULL, 1, N'Event Rule Name', N'Event')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (4, N'IM900001', N'WL02', NULL, 3, 7, 10, NULL, 5, N'Counter Rule Name 3', N'Counter')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (5, N'IM900001', N'WL02', N'WT21', 700, 1200, 3000, NULL, NULL, N'Timing Rule Name 2', N'Timing')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (6, N'IM900002', N'WL21', N'WT01', 3, 3, 6, 1, 4, N'Counter Rule Name 1_2', N'Counter')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (7, N'IM900002', N'WL21', N'WT01', 3000, 3000, 6000, 1000, 4000, N'Timing Rule Name 1_2', N'Timing')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (8, N'IM900002', N'WL21', N'WT02', NULL, NULL, NULL, NULL, NULL, N'Event Rule Name_2', N'Event')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (9, N'IM900002', N'WL22', NULL, 5, 8, 13, 1, 8, N'Counter Rule Name 3_2', N'Counter')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (10, N'IM900002', N'WL22', N'WT21', 2700, 2200, 6000, 1000, 3000, N'Timing Rule Name 2_2', N'Timing')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (11, N'IM900001', N'WL01', N'WT01', 3, 3, 6, 1, 4, N'Counter Rule Name 1_3', N'Counter')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (12, N'IM900001', N'WL01', N'WT01', 3000, 3000, 6000, 1000, 4000, N'Timing Rule Name 1_3', N'Timing')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (13, N'IM900001', N'WL01', N'WT02', NULL, NULL, NULL, NULL, NULL, N'Event Rule Name_3', N'Event')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (14, N'IM900001', N'WL02', NULL, 5, 8, 13, 1, 8, N'Counter Rule Name 3_3', N'Counter')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (15, N'IM900001', N'WL02', N'WT21', 2700, 2200, 6000, 1000, 3000, N'Timing Rule Name 2_3', N'Timing')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (16, N'IM900003', N'WL31', N'WT01', 5, 4, 9, 2, 7, N'Counter Rule Name 1_2_3', N'Counter')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (17, N'IM900003', N'WL31', N'WT01', 5000, 4000, 9000, 2000, 7000, N'Timing Rule Name 1_2_3', N'Timing')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (18, N'IM900003', N'WL31', N'WT02', NULL, NULL, NULL, NULL, NULL, N'Event Rule Name_2_3', N'Event')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (19, N'IM900003', N'WL32', NULL, 7, 9, 16, 2, 11, N'Counter Rule Name 3_2_3', N'Counter')
INSERT [dbo].[ReportOverview] ([ID], [WorkArea], [WorkCell], [WorkUnit], [Actual], [Remaining], [Set], [OverFlowRemaining], [OverFlowSet], [RuleName], [RuleType]) VALUES (20, N'IM900003', N'WL32', N'WT21', 4700, 3200, 9000, 2000, 6000, N'Timing Rule Name 2_2_3', N'Timing')
SET IDENTITY_INSERT [dbo].[ReportOverview] OFF
