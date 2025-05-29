import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HighCharts from "../../../utils/charts/HighCharts";
import Grids from "./Grids";
import ErrorBoundary from "./ErrorBoundary";
import CardList from "./CardList";
import CustomKpi from "./CustomKpi";
import GoogleHeatmap from "./GoogleHeatmap";

const GraphList = ({
  widget,
  widgetMakerGraphData,
  metaWidgetConfig,
  cardPosition,
  single,
  networkLinkLength,
  style,
  desc,
  log,
  scaleFromZeroToOne,
  xaxis,
  yaxis,
  id,
  type,
  stacked,
  legend_position,
  chartGlobalDataLabel,
  chartAxisLabel,
  chartDataLabelInPercent,
  chartGradientColor,
  chartGlobalDataStacked,
  chartXaxisDataLabel,
  chartMarkers,
  xAxisChartType,
  yAxisChartType,
  xAxisScale,
  yAxisScale,
  y_series2,
  preview,
  yAxisMode,
  metadata,
  widgetShareOfData,
  widgetDurationComparison,
  widgetDurationComparisonForChart,
  widgetDurationDataForChart,
  isGridDeepDiveEnabled,
  gridDeepDiveOn,
  hideColumns,
  hideSorting,
  refWidth,
  dashboard,
  dateLabels,
  span_data,
  section_index,
  widget_index,
  trends,
  metaDataCheck,
  isPreviewState,
  isdownload,
  metaWidgetKpiData,
  noteExist,
  insightsExist,
  template_widget,
  template_id,
  trends_type,
  AiInsights,
  widgetDiscription,
  widgetContainerHeight,
  fontFamily,
  updatedSidePostData,
  updatedCoordinatesData,
  count,
  isAnimatedCardWidget,
  isShowCardDetails,
}) => {
  const dispatch = useDispatch();

  const [mapData, setMapData] = useState([]);
  const [chartData, setChartData] = useState(
    widgetMakerGraphData?.[0]?.data || []
  );

  const [isNewData, setIsNewData] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (widgetMakerGraphData?.[0]?.data?.length > 0) {
      const newValue = widgetMakerGraphData[0].data[0].value;
      if (newValue !== currentValue) {
        animateUpdate(newValue);
      }
    }
  }, [widgetMakerGraphData]);

  const animateUpdate = (newValue) => {
    setIsNewData(true);
    setTimeout(() => {
      setCurrentValue(newValue);
      setIsNewData(false);
    }, 400);
  };

  const isPPTModalOpen = useSelector((state) => state?.PPT?.isPPTModalOpen);
  const authParams = useSelector((state) => state.Authentication.authParams);
  const globePinToggle = useSelector(
    (state) => state?.Screens?.globe_pin_toggle
  );
  useEffect(() => {
    if (type === "map") {
      let mainData = [];
      single[0]?.latitude?.map((data, i) => {
        mainData.push({ label: i, lat: data, lng: single[0]?.longitude[i] });
      });
      setMapData(mainData);
    } else if (type === "retweet_map" || type === "reply_map") {
      let mainData = [];
      single?.latitude?.map((data, i) => {
        mainData.push({ label: i, lat: data, lng: single?.longitude[i] });
      });
      setMapData(mainData);
    }
  }, [type]);

  return (
    <>
      {(type === "grid" || type === "pivot-grid") && (
        <>
          <Grids
            tableColumns={
              single && single[0]?.columns?.length > 0 && single[0]?.columns
            }
            tree_grid={
              single && single[0]?.columns?.length > 0 && single[0]?.tree_grid
            }
            rowSpanOn={
              single?.[0]?.columns?.length > 0 && single?.[0]?.row_span_on
            }
            grand_total={
              single && single[0]?.columns?.length > 0 && single[0]?.grand_total
            }
            dataSource={
              single?.[0]?.dataSource
                ? single[0]?.dataSource
                : single?.[0]?.datasource
            }
            colors={single && single[0]?.colors}
            PdfDownloadStatus={isdownload ? isdownload : false}
            metadata={metadata}
            noteExist={noteExist}
            insightsExist={insightsExist}
            widgetDurationComparisonForChart={widgetDurationComparisonForChart}
            widgetDurationDataForChart={widgetDurationDataForChart}
            isCommandCenterScreen={true}
            widgetContainerHeight={widgetContainerHeight}
            widget_index={widget_index}
            section_index={section_index}
            isGridDeepDiveEnabled={isGridDeepDiveEnabled}
            gridDeepDiveOn={gridDeepDiveOn}
            hideColumns={hideColumns}
            hidePagination={false}
            updatedSidePostData={updatedSidePostData}
          />
        </>
      )}

      {/* {(type === "post-card" || type === "prolific-user") &&
        widgetMakerGraphData[0]?.data && (
          <div
            className={`bg__gray ${isdownload && !noteExist ? "h-100" : ""}`}
          >
            <PostCard
              data={widgetMakerGraphData[0]?.data}
              filterPills={widgetMakerGraphData[0]["filter-pills"]}
              totalPageNo={widgetMakerGraphData[0].no_of_pages}
              metadata={metaDataCheck ? metadata : ""}
              section_index={section_index}
              widget_index={widget_index}
              pagination={true}
              isPreviewState={isPreviewState}
              dashboard={dashboard}
              PdfDownloadStatus={isdownload ? isdownload : false}
              PptGeneratingStatus={isPPTModalOpen ? isPPTModalOpen : false}
              noteExist={noteExist}
              insightsExist={insightsExist}
              chart_type={type}
              AiInsights={AiInsights}
            />
          </div>
        )} */}

      {type === "kpi" ? (
        <>
          <ErrorBoundary>
            <CustomKpi data={metaWidgetKpiData?.kpi} />
          </ErrorBoundary>
        </>
      ) : (
        ""
      )}

      {type === "map" && mapData && (
        <>
          <GoogleHeatmap
            data={mapData}
            center={{ lat: mapData?.[0]?.lat, lng: mapData?.[0]?.lng }}
            preview={preview}
            createdWidget={true}
            refWidth={refWidth}
            PdfDownloadStatus={
              isdownload ? isdownload : isPPTModalOpen ? isPPTModalOpen : false
            }
            noteExist={noteExist}
            insightsExist={insightsExist}
            widgetDiscription={widgetDiscription}
          />
        </>
      )}

      {(type === "combination" ||
        type === "bar" ||
        type === "horizontal-bar" ||
        type === "area" ||
        type === "line" ||
        type === "pie" ||
        type === "donut" ||
        type === "heatmap" ||
        type === "scatter" ||
        type === "sunburst" ||
        type === "wordcloud" ||
        type === "sankey") && (
        <>
          {widgetMakerGraphData && (
            <HighCharts
              metadata={metadata}
              single={single}
              style={style}
              desc={desc}
              log={log}
              scaleFromZeroToOne={scaleFromZeroToOne}
              xaxis={xaxis}
              yaxis={yaxis}
              y_series2={y_series2}
              id={id ? id : type}
              type={type}
              stacked={stacked}
              legend_position={legend_position}
              chartGlobalDataLabel={chartGlobalDataLabel}
              chartAxisLabel={chartAxisLabel}
              chartDataLabelInPercent={chartDataLabelInPercent}
              chartGradientColor={chartGradientColor}
              chartGlobalDataStacked={chartGlobalDataStacked}
              chartXaxisDataLabel={chartXaxisDataLabel}
              chartMarkers={chartMarkers}
              xAxisChartType={xAxisChartType}
              yAxisChartType={yAxisChartType}
              xAxisScale={xAxisScale}
              yAxisScale={yAxisScale}
              yAxisMode={yAxisMode}
              dashboard={dashboard}
              span_data={span_data}
              widget_index={widget_index}
              section_index={section_index}
              PdfDownloadStatus={isdownload}
              template_widget={template_widget}
              template_id={template_id}
              trends_type={trends_type}
              AiInsights={AiInsights}
              fontFamily={fontFamily}
              metaWidgetGraphData={widgetMakerGraphData}
            />
          )}
        </>
      )}

      {/* {(type === "custom-card" ||
        type === "post-card" ||
        type === "prolific-user") &&
        widgetMakerGraphData?.[0]?.data && (
          <div
            className={
              window.location.pathname?.split("/")?.[3] === "000-000-555"
                ? `h-100 content__backgraoud--transparent`
                : `bg__gray ${
                    (isdownload && !noteExist) || authParams?.screen_id
                      ? "h-100"
                      : ""
                  }`
            }
          >
            <CustomCard
              data={widgetMakerGraphData?.[0]?.data}
              filterPills={widgetMakerGraphData?.[0]?.["filter-pills"]}
              totalPageNo={widgetMakerGraphData?.[0]?.no_of_pages}
              metadata={metaDataCheck ? metadata : ""}
              section_index={section_index}
              widget_index={widget_index}
              pagination={true}
              isPreviewState={isPreviewState}
              dashboard={dashboard}
              isCommandCenterScreen={true}
              PdfDownloadStatus={isdownload ? isdownload : false}
              // PptGeneratingStatus={isPPTModalOpen ? isPPTModalOpen : false}
              noteExist={noteExist}
              insightsExist={insightsExist}
              chart_type={type}
              AiInsights={AiInsights}
              updatedSidePostData={updatedSidePostData}
            />
          </div>
        )} */}

      {/* {type === "progress-kpi" && (
        <>
          <CircularKpi
            kpiData={widgetMakerGraphData}
            widget_index={widget_index}
            section_index={section_index}
          />
        </>
      )} */}
    </>
  );
};

export default GraphList;
