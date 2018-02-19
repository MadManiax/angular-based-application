CREATE PROC [dbo].[sp_VCC_local_reportOverview] 
(
	@workArea VARCHAR(100),
	@productionLineFilter VARCHAR(300) = NULL,
	@workCellFilter VARCHAR(300) = NULL,
	@ruleTypeFilter VARCHAR(400) = NULL,
	@materialFilter VARCHAR(1000) = NULL,
	@PageNumber AS INT, 
	@PageSize AS INT
)
AS
BEGIN

	
	


	SELECT * 
	FROM ReportOverview 	
	WHERE WorkArea = @workArea
		AND (@productionLineFilter IS NULL OR [ProductionLine] IN (SELECT DATA FROM dbo.Split(@productionLineFilter, ',')))
		AND (@workCellFilter IS NULL OR [WorkCell] IN (SELECT DATA FROM dbo.Split(@workCellFilter,',') ))
		AND (@ruleTypeFilter IS NULL OR [RuleType] IN (SELECT DATA FROM dbo.Split(@ruleTypeFilter,',') ))
		--AND (@materialFilter IS NULL OR [RuleType] IN (SELECT DATA FROM dbo.Split(@materialFilter,',') )))
		
	ORDER BY ID
		OFFSET ((@PageNumber - 1) * @PageSize) ROWS
		FETCH NEXT @PageSize ROWS ONLY;

END