import React, { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import { useDispatch, useSelector } from "react-redux";
// import { setWidgetMakerGraphData } from "../../../../redux/actions/WidgetMaker/WidgetAPI";
import {
  getPie,
  getLine,
  getMultiLine,
  getArea,
  getMultiArea,
  getSunburst,
  getBarChart,
  getStackBarChart,
  getHeat,
  getScatter,
  getCombination,
  getWordcloud,
  getNetworkGraph,
  getSankey,
} from "./graphFunction";
import {
  setHighChartDeepDive,
  setHighChartRightClick,
  setOptionHighChart,
} from "../../../../redux/actions/HighChart";
import sunburst from "highcharts/modules/sunburst.js";
import sankey from "highcharts/modules/sankey.js";
//import uuid from "react-uuid";
import HighchartOptions from "./highcharts.options";
import wordcloud from "highcharts/modules/wordcloud.js";
import HCNetworkgraph from "highcharts/modules/networkgraph";
import {
  setDeepDiveInfluencersObject,
  setDeepDiveMentionsObject,
  setDeepDiveObject,
  set_WM_DeepDive,
} from "../../../../redux/actions/WidgetMaker/WidgetMaker";
import {
  callNotification,
  deepCopy,
  getAllFilters,
  getAllShareFilters,
  getBrands,
  getCustomizedDate,
  getGlobalBrands,
  getPaneIndex,
  getTemporaryWordWidgetId,
  getWidgetGraphObject,
  getWindowLocationPath,
  useQuery,
} from "../../../../redux/constants";
// import { setPageChart } from "../../../../redux/actions/WidgetMaker/WidgetAPI";
import { useRef } from "react";

import IsEmpty from "../../IsEmpty";
import HighChartrender from "./HighChartrender";

// New
// import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import ExportData from "highcharts/modules/export-data";
import OfflineExporting from "highcharts/modules/offline-exporting";
import CustomEvents from "highcharts-custom-events";
import { getDashboardAnalyticsDeepDiveAPI } from "../../../../redux/actions/NewzVerse/NewzVerseAPI";
import { setDashboardDeepDiveLevel } from "../../../../redux/actions/NewzVerse/NewzVerse";
import { getDashboardGlobalBrands } from "../../../../redux/constants/NewzVerseConst";

Exporting(Highcharts);
ExportData(Highcharts);
OfflineExporting(Highcharts);
CustomEvents(Highcharts);

sankey(Highcharts);
sunburst(Highcharts);
wordcloud(Highcharts);
HighchartsHeatmap(Highcharts);
HighchartOptions(Highcharts);

// require("highcharts/modules/exporting")(Highcharts);
// require("highcharts/modules/export-data")(Highcharts);
// require("highcharts/modules/offline-exporting")(Highcharts);
// require("highcharts-custom-events")(Highcharts);

const HighCharts = ({
  dashboard,
  single,
  title,
  colors,
  type,
  xaxis,
  yaxis,
  style,
  stacked,
  id,
  legend_position,
  chartGlobalDataLabel,
  chartAxisLabel,
  chartDataLabelInPercent,
  chartGradientColor,
  chartXaxisDataLabel,
  chartMarkers,
  xAxisChartType,
  yAxisChartType,
  xAxisScale,
  yAxisScale,
  percent,
  split,
  y_series2,
  chartGlobalDataStacked,
  yAxisMode,
  metadata,
  span_data,
  section_index,
  widget_index,
  differential,
  log,
  scaleFromZeroToOne,
  agentActivit,
  PdfDownloadStatus,
  ticket_widget_id,
  ticket_chart_type,
  template_widget,
  ticket_status_duration,
  trends_type,
  AiInsights,
  deepDive,
  fontFamily,
  metaWidgetGraphData,
  networkLinkLength,
}) => {
  let query = useQuery();

  const dispatch = useDispatch();
  const updatedGraphData = useSelector(
    (state) => state?.Widget?.updatedGraphData
  );
  const refTooltip = useRef(null);

  const temporary_words = useSelector(
    (state) => state?.attributes?.temporary_words
  );
  const screen = useSelector((state) => state?.Screens?.screen);

  const brandlogicalgroup = useSelector(
    (state) => state?.ApiCall?.brandlogicalgroup?.data?.result
  );

  const shareBrands = useSelector((state) => state?.ApiCall?.shareBrands);
  const shareableLinkDeepDiveStatus = useSelector(
    (state) => state?.ApiCall?.shareableLinkDeepDiveStatus
  );
  const footerValue = useSelector((state) => state?.Section?.footerValue);
  const brands = useSelector(
    (state) => state?.ApiCall?.brands?.data?.result?.brands
  );
  const panes = useSelector((state) => state?.Tab1?.panes);
  const activeKey = useSelector((state) => state?.Tab1?.activeKey);
  let index = getPaneIndex(panes, activeKey);

  const isshowSideBar = useSelector(
    (state) => state?.WidgetMaker?.isshowSideBar
  );
  const opData = useSelector((state) => state?.Highchart?.Options);
  const authParams = useSelector((state) => state?.Authentication?.authParams);
  const All_WM_attributes = useSelector(
    (state) => state?.WidgetMaker?.All_WM_attributes
  );
  const WM_attributes = useSelector(
    (state) => state?.WidgetMaker?.WM_attributes
  );
  const allAttributes = useSelector(
    (state) => state?.attributes?.allAttributes
  );
  const isPPTModalOpen = useSelector((state) => state?.PPT?.isPPTModalOpen);
  let attribute = All_WM_attributes ? All_WM_attributes : allAttributes;
  const widgetGraphConfig = useSelector(
    (state) => state?.GraphConfig?.widgetGraphConfig
  );
  const dashboardPdfdata = useSelector(
    (state) => state?.ApiCall?.dashboardPdfdata
  );

  //const widgetPreview = useSelector((state) => state.WidgetAPI.widgetPreview);
  const isWidgetEdit = useSelector((state) => state?.Filter?.isWidgetEdit);
  const aiLogScale = useSelector(
    (state) => state?.Welcome?.graphDetail?.aiLogScale
  );
  // const PdfDownloadStatus = useSelector(
  // 	(state) => state.PdfDownloadData.PdfDownloadStatus
  // );
  //const [changeChart_type, setchangeChart_type] = useState(null);
  const [currentSelectedGraph, setCurrentSelectedGraph] = useState(null);
  const Section = useSelector((state) => state?.Section?.addSection);
  const highChartDeepDive = useSelector(
    (state) => state?.Highchart?.highChartDeepDive
  );
  const highChartRightClick = useSelector(
    (state) => state?.Highchart?.highChartRightClick
  );
  const dashboardTrendsFlag = useSelector(
    (state) => state?.WidgetAPI?.dashboardTrendsFlag
  );
  // let widgetCondition =
  //   opData && Object?.keys(opData)?.findIndex((el) => el[1]?.chart);
  const templateDetails = useSelector(
    (state) => state?.Section?.templateDetails
  );
  const selectLogicalBrandValue = useSelector(
    (state) => state?.Logicalgroup?.selectLogicalBrandValue
  );
  const global_dashboard_duration = useSelector(
    (state) => state?.AuthParams?.global_dashboard_duration
  );
  const shareTemplateData = useSelector(
    (state) => state?.ApiCall?.shareTemplateData
  );
  const graphConditionConfig = useSelector(
    (state) => state?.apiCall?.graphConditions
  );
  const isScheduleReportOpen = useSelector(
    (state) => state?.ApiCall?.is_schedule_report_open
  );
  const highChartRightClickedNetworkNode = useSelector(
    (state) => state?.Highchart?.highChartClickedNetworkNode
  );
  const workspace_privileges = useSelector(
    (state) => state?.ApiCall?.workspace_privileges
  );

  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  const dashboardTabsNameList = useSelector(
    (state) => state?.NewzVerse?.dashboard_tabs_name_list
  );
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  const dashboardDeepDiveLevel = useSelector(
    (state) => state?.NewzVerse?.dashboard_deep_dive_level
  );
  let p_token = localStorage.getItem("p_token");

  const deepDiveFlag = useSelector((state) => state?.DeepDive?.deepDiveFlag);
  const [xPosition, setxPosition] = useState(0);
  const [yPosition, setyPosition] = useState(0);
  const [keywordData, setkeywordData] = useState({});
  const [load, setLoad] = useState(false);
  const sharedDuration = useSelector((state) => state?.Share?.sharedDuration);
  let dashboardCompetitorList = panes?.[index]?.brands
    ? panes?.[index]?.brands?.columns
      ? panes?.[index]?.brands?.columns[0]?.competitorList
      : panes?.[index]?.brands?.[0]?.competitorList
    : selectLogicalBrandValue?.global_dashboard?.data?.columns &&
      selectLogicalBrandValue?.global_dashboard?.data?.columns[0]
        ?.competitorList;
  let widgetMakerCompetitorList =
    widgetGraphConfig?.brands && widgetGraphConfig?.brands[0]?.competitor;
  let templateDetailsCompetitorList =
    templateDetails?.templateBrands?.columns &&
    templateDetails?.templateBrands?.columns[0]?.competitorList;
  let pdfCompititorList =
    dashboardPdfdata &&
    dashboardPdfdata?.template_metadata &&
    dashboardPdfdata?.template_metadata?.comp_brand_list &&
    dashboardPdfdata?.template_metadata?.comp_brand_list?.length > 0;
  const competitorBrands = useSelector(
    (state) => state?.WidgetAPI?.competitorBrands?.data?.result
  );
  // dashboardCompetitorList,
  // widgetMakerCompetitorList,
  // templateDetailsCompetitorList)
  const [tempModal, setTempModal] = useState(false);
  const [permModal, setPermModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [modalCheckboxValue, setModalCheckboxValue] = useState(false);
  let pathName = getWindowLocationPath()?.toLowerCase();

  const getChartDataObj = () => {
    if (
      (type == "horizontal-bar" ||
        type == "bar" ||
        (updatedGraphData &&
          Object?.keys(updatedGraphData).findIndex(
            (el) => el === "bar_" + id
          ) >= 0)) &&
      !stacked
    ) {
      let index =
        updatedGraphData &&
        Object?.keys(updatedGraphData).findIndex((el) => el === "bar_" + id);

      if (index >= 0) {
        //chart type change

        if (updatedGraphData["bar_" + id]?.selected_chart == "line") {
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };

          if (single[0].data) {
            let index = getPaneIndex(panes, activeKey);
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "line",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              panes: panes,
              index: index,
              dashboard: dashboard,
              widget_name: metadata?.widget_name,
              ticket_chart_type: ticket_chart_type,
              section_index: section_index,
              widget_index: widget_index,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              ticket_status_duration: ticket_status_duration,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
              screen: screen,
            };
            updateOptions[id] = getMultiLine(
              graphObject,
              authParams,
              Highcharts
            );
            dispatch(setOptionHighChart(updateOptions));
          } else {
            let index = getPaneIndex(panes, activeKey);
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "line",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              screen: screen,
              template_details: templateDetails,
            };
            updateOptions[id] = getLine(graphObject, authParams);

            dispatch(setOptionHighChart(updateOptions));
          }
        } else if (updatedGraphData["bar_" + id]?.selected_chart == "area") {
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };

          if (single[0].data) {
            let index = getPaneIndex(panes, activeKey);
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "area",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              //chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              //xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              chartGlobalDataStacked: chartGlobalDataStacked,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
            };
            updateOptions[id] = getMultiArea(graphObject, authParams);
            dispatch(setOptionHighChart(updateOptions));
          } else {
            let index = getPaneIndex(panes, activeKey);
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "area",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              //chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              //xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
              screen: screen,
            };
            updateOptions[id] = getArea(graphObject, authParams);
            dispatch(setOptionHighChart(updateOptions));
          }
        } else {
          let index = getPaneIndex(panes, activeKey);
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };
          let graphObject = {
            single: single,
            title: title,
            //colors: colors,
            xaxis: xaxis,
            yaxis: yaxis,
            type: type,
            legend_position: legend_position,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            //chartXaxisDataLabel: chartXaxisDataLabel,
            //chartMarkers: chartMarkers,
            //xAxisScale: xAxisScale,
            yAxisScale: yAxisScale,
            style: style,
            stacked: stacked,
            aiLogScale: aiLogScale !== null ? aiLogScale : log,
            scaleFromZeroToOne: scaleFromZeroToOne,
            agentActivit: agentActivit,
            All_WM_attributes: All_WM_attributes,
            pdfDownloadStatus: PdfDownloadStatus
              ? PdfDownloadStatus
              : isPPTModalOpen,
            competitorBenchmark:
              dashboardCompetitorList ||
              widgetMakerCompetitorList ||
              templateDetailsCompetitorList ||
              pdfCompititorList,
            widgetGraphConfig: widgetGraphConfig,
            widget_name: metadata?.widget_name,
            metadata: metadata,
            section_index: section_index,
            widget_index: widget_index,
            panes: panes,
            index: index,
            dashboard: dashboard,
            section: Section,
            template_widget: template_widget,
            shareTemplateData: shareTemplateData,
            graphConditionConfig: graphConditionConfig,
            isScheduleReportOpen: isScheduleReportOpen,
            template_details: templateDetails,
          };
          updateOptions[id] = getBarChart(graphObject, authParams);
          dispatch(setOptionHighChart(updateOptions));
        }
      } else {
        let index = getPaneIndex(panes, activeKey);
        let updateOptions = global?.options
          ? { ...global?.options }
          : { ...opData };
        let graphObject = {
          single: single,
          title: title,
          //colors: colors,
          xaxis: xaxis,
          yaxis: yaxis,
          type: type,
          legend_position: legend_position,
          chartGlobalDataLabel: chartGlobalDataLabel,
          chartAxisLabel: chartAxisLabel,
          //chartXaxisDataLabel: chartXaxisDataLabel,
          //chartMarkers: chartMarkers,
          //xAxisScale: xAxisScale,
          yAxisScale: yAxisScale,
          style: style,
          stacked: stacked,
          aiLogScale: aiLogScale !== null ? aiLogScale : log,
          scaleFromZeroToOne: scaleFromZeroToOne,
          agentActivit: agentActivit,
          All_WM_attributes: All_WM_attributes,
          pdfDownloadStatus: PdfDownloadStatus
            ? PdfDownloadStatus
            : isPPTModalOpen,
          competitorBenchmark:
            dashboardCompetitorList ||
            widgetMakerCompetitorList ||
            templateDetailsCompetitorList ||
            pdfCompititorList,
          widgetGraphConfig: widgetGraphConfig,
          widget_name: metadata?.widget_name,
          metadata: metadata,
          section_index: section_index,
          widget_index: widget_index,
          panes: panes,
          index: index,
          dashboard: dashboard,
          section: Section,
          template_widget: template_widget,
          shareTemplateData: shareTemplateData,
          graphConditionConfig: graphConditionConfig,
          isScheduleReportOpen: isScheduleReportOpen,
          template_details: templateDetails,
        };
        updateOptions[id] = getBarChart(graphObject, authParams);
        dispatch(setOptionHighChart(updateOptions));
      }
    } else if (
      //stack bar
      (type === "horizontal-bar" ||
        type === "bar" ||
        (updatedGraphData &&
          Object?.keys(updatedGraphData).findIndex(
            (el) => el === "bar_" + id
          ) >= 0)) &&
      stacked
    ) {
      let index =
        updatedGraphData &&
        Object?.keys(updatedGraphData).findIndex((el) => el === "bar_" + id);
      if (index >= 0) {
        //chart type change

        if (
          updatedGraphData &&
          updatedGraphData["bar_" + id]?.selected_chart == "line"
        ) {
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };

          if (single[0].data) {
            let index = getPaneIndex(panes, activeKey);
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "line",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              panes: panes,
              index: index,
              dashboard: dashboard,
              widget_name: metadata?.widget_name,
              ticket_chart_type: ticket_chart_type,
              section_index: section_index,
              widget_index: widget_index,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              ticket_status_duration: ticket_status_duration,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
              screen: screen,
            };
            updateOptions[id] = getMultiLine(
              graphObject,
              authParams,
              Highcharts
            );
            dispatch(setOptionHighChart(updateOptions));
          } else {
            let index = getPaneIndex(panes, activeKey);
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "line",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              screen: screen,
              template_details: templateDetails,
            };
            updateOptions[id] = getLine(graphObject, authParams);

            dispatch(setOptionHighChart(updateOptions));
          }
        } else if (
          updatedGraphData &&
          updatedGraphData["bar_" + id]?.selected_chart == "area"
        ) {
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };

          if (single[0].data) {
            let index = getPaneIndex(panes, activeKey);
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "area",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              //chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              //xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              chartGlobalDataStacked: chartGlobalDataStacked,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
            };
            updateOptions[id] = getMultiArea(graphObject, authParams);
            dispatch(setOptionHighChart(updateOptions));
          } else {
            let index = getPaneIndex(panes, activeKey);
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "area",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              //chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              //xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
              screen: screen,
            };
            updateOptions[id] = getArea(graphObject, authParams);
            dispatch(setOptionHighChart(updateOptions));
          }
        } else {
          let updateOptions = global.options
            ? { ...global?.options }
            : { ...opData };
          let index = getPaneIndex(panes, activeKey);
          let graphObject = {
            single: single,
            xaxis: xaxis,
            yaxis: yaxis,
            style: style,
            stacked: stacked,
            type: type,
            legend_position: legend_position,
            percent: percent,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            chartDataLabelInPercent: chartDataLabelInPercent,
            chartGradientColor: chartGradientColor,
            chartGlobalDataStacked: chartGlobalDataStacked,
            yAxisScale: yAxisScale,
            aiLogScale: aiLogScale !== null ? aiLogScale : log,
            scaleFromZeroToOne: scaleFromZeroToOne,
            All_WM_attributes: All_WM_attributes,
            pdfDownloadStatus: PdfDownloadStatus
              ? PdfDownloadStatus
              : isPPTModalOpen,
            competitorBenchmark:
              dashboardCompetitorList ||
              widgetMakerCompetitorList ||
              templateDetailsCompetitorList ||
              pdfCompititorList,
            panes: panes,
            index: index,
            dashboard: dashboard,
            ticket_widget_id: ticket_widget_id,
            widgetGraphConfig: widgetGraphConfig,
            widget_name: metadata?.widget_name,
            metadata: metadata,
            ticket_chart_type: ticket_chart_type,
            section_index: section_index,
            widget_index: widget_index,
            section: Section,
            template_widget: template_widget,
            shareTemplateData: shareTemplateData,
            graphConditionConfig: graphConditionConfig,
            ticket_status_duration: ticket_status_duration,
            isScheduleReportOpen: isScheduleReportOpen,
            template_details: templateDetails,
          };
          updateOptions[id] = getStackBarChart(graphObject, authParams);
          dispatch(setOptionHighChart(updateOptions));
        }
      } else {
        let updateOptions = global?.options
          ? { ...global?.options }
          : { ...opData };

        let index = getPaneIndex(panes, activeKey);
        let graphObject = {
          single: single,
          xaxis: xaxis,
          yaxis: yaxis,
          style: style,
          stacked: stacked,
          type: type,
          legend_position: legend_position,
          percent: percent,
          chartGlobalDataLabel: chartGlobalDataLabel,
          chartAxisLabel: chartAxisLabel,
          chartDataLabelInPercent: chartDataLabelInPercent,
          chartGradientColor: chartGradientColor,
          chartGlobalDataStacked: chartGlobalDataStacked,
          yAxisScale: yAxisScale,
          aiLogScale: aiLogScale !== null ? aiLogScale : log,
          scaleFromZeroToOne: scaleFromZeroToOne,
          All_WM_attributes: All_WM_attributes,
          pdfDownloadStatus: PdfDownloadStatus
            ? PdfDownloadStatus
            : isPPTModalOpen,
          competitorBenchmark:
            dashboardCompetitorList ||
            widgetMakerCompetitorList ||
            templateDetailsCompetitorList ||
            pdfCompititorList,
          panes: panes,
          index: index,
          dashboard: dashboard,
          ticket_widget_id: ticket_widget_id,
          widgetGraphConfig: widgetGraphConfig,
          widget_name: metadata?.widget_name,
          metadata: metadata,
          ticket_chart_type: ticket_chart_type,
          section_index: section_index,
          widget_index: widget_index,
          section: Section,
          template_widget: template_widget,
          shareTemplateData: shareTemplateData,
          graphConditionConfig: graphConditionConfig,
          ticket_status_duration: ticket_status_duration,
          isScheduleReportOpen: isScheduleReportOpen,
          template_details: templateDetails,
        };
        updateOptions[id] = getStackBarChart(graphObject, authParams);

        dispatch(setOptionHighChart(updateOptions));
      }
    } else if (
      type === "line" ||
      (updatedGraphData &&
        Object?.keys(updatedGraphData).findIndex((el) => el === "line_" + id) >=
          0)
    ) {
      let index =
        updatedGraphData &&
        Object?.keys(updatedGraphData).findIndex((el) => el === "line_" + id);
      if (index >= 0) {
        //chart type change

        if (updatedGraphData["line_" + id]?.selected_chart == "bar") {
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };
          let index = getPaneIndex(panes, activeKey);
          let graphObject = {
            single: single,
            xaxis: xaxis,
            yaxis: yaxis,
            style: style,
            stacked: stacked,
            type: type,
            legend_position: legend_position,
            percent: percent,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            chartDataLabelInPercent: chartDataLabelInPercent,
            chartGradientColor: chartGradientColor,
            chartGlobalDataStacked: chartGlobalDataStacked,
            yAxisScale: yAxisScale,
            aiLogScale: aiLogScale !== null ? aiLogScale : log,
            scaleFromZeroToOne: scaleFromZeroToOne,
            agentActivit: agentActivit,
            pdfDownloadStatus: PdfDownloadStatus
              ? PdfDownloadStatus
              : isPPTModalOpen,
            competitorBenchmark:
              dashboardCompetitorList ||
              widgetMakerCompetitorList ||
              templateDetailsCompetitorList ||
              pdfCompititorList,
            panes: panes,
            index: index,
            dashboard: dashboard,
            ticket_widget_id: ticket_widget_id,
            widgetGraphConfig: widgetGraphConfig,
            widget_name: metadata?.widget_name,
            metadata: metadata,
            ticket_chart_type: ticket_chart_type,
            section_index: section_index,
            widget_index: widget_index,
            section: Section,
            template_widget: template_widget,
            shareTemplateData: shareTemplateData,
            graphConditionConfig: graphConditionConfig,
            ticket_status_duration: ticket_status_duration,
            isScheduleReportOpen: isScheduleReportOpen,
            template_details: templateDetails,
          };
          updateOptions[id] = single[0]?.data
            ? getStackBarChart(graphObject, authParams)
            : getBarChart(graphObject, authParams);
          dispatch(setOptionHighChart(updateOptions));
        } else if (updatedGraphData["line_" + id]?.selected_chart == "area") {
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };

          if (single[0].data) {
            let index = getPaneIndex(panes, activeKey);
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "area",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              //chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              //xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              chartGlobalDataStacked: chartGlobalDataStacked,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
            };
            updateOptions[id] = getMultiArea(graphObject, authParams);
            dispatch(setOptionHighChart(updateOptions));
          } else {
            let index = getPaneIndex(panes, activeKey);
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "area",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              //chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              //xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
              screen: screen,
            };
            updateOptions[id] = getArea(graphObject, authParams);
            dispatch(setOptionHighChart(updateOptions));
          }
        } else {
          if (single[0].data) {
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let index = getPaneIndex(panes, activeKey);
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: type,
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              All_WM_attributes: All_WM_attributes,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              panes: panes,
              index: index,
              dashboard: dashboard,
              widget_name: metadata?.widget_name,
              ticket_chart_type: ticket_chart_type,
              section_index: section_index,
              widget_index: widget_index,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              ticket_status_duration: ticket_status_duration,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
              screen: screen,
            };
            updateOptions[id] = getMultiLine(
              graphObject,
              authParams,
              Highcharts
            );
            dispatch(setOptionHighChart(updateOptions));
          } else {
            let index = getPaneIndex(panes, activeKey);
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "line",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              All_WM_attributes: All_WM_attributes,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              screen: screen,
              template_details: templateDetails,
            };
            updateOptions[id] = getLine(graphObject, authParams);
            dispatch(setOptionHighChart(updateOptions));
          }
        }
      } else {
        if (single[0]?.data) {
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };
          let index = getPaneIndex(panes, activeKey);
          let graphObject = {
            single: single,
            title: title,
            colors: colors,
            xaxis: xaxis,
            yaxis: yaxis,
            type: type,
            legend_position: legend_position,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            chartXaxisDataLabel: chartXaxisDataLabel,
            chartMarkers: chartMarkers,
            xAxisScale: xAxisScale,
            yAxisScale: yAxisScale,
            style: style,
            widgetGraphConfig: widgetGraphConfig,
            metadata: metadata,
            aiLogScale: aiLogScale !== null ? aiLogScale : log,
            scaleFromZeroToOne: scaleFromZeroToOne,
            All_WM_attributes: All_WM_attributes,
            pdfDownloadStatus: PdfDownloadStatus
              ? PdfDownloadStatus
              : isPPTModalOpen,
            competitorBenchmark:
              dashboardCompetitorList ||
              widgetMakerCompetitorList ||
              templateDetailsCompetitorList ||
              pdfCompititorList,
            panes: panes,
            index: index,
            dashboard: dashboard,
            widget_name: metadata?.widget_name,
            ticket_chart_type: ticket_chart_type,
            section_index: section_index,
            widget_index: widget_index,
            section: Section,
            template_widget: template_widget,
            shareTemplateData: shareTemplateData,
            graphConditionConfig: graphConditionConfig,
            ticket_status_duration: ticket_status_duration,
            isScheduleReportOpen: isScheduleReportOpen,
            template_details: templateDetails,
            screen: screen,
          };
          updateOptions[id] = getMultiLine(graphObject, authParams, Highcharts);
          dispatch(setOptionHighChart(updateOptions));
        } else {
          let index = getPaneIndex(panes, activeKey);
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };
          let graphObject = {
            single: single,
            title: title,
            colors: colors,
            xaxis: xaxis,
            yaxis: yaxis,
            type: "line",
            legend_position: legend_position,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            chartXaxisDataLabel: chartXaxisDataLabel,
            chartMarkers: chartMarkers,
            xAxisScale: xAxisScale,
            yAxisScale: yAxisScale,
            style: style,
            widgetGraphConfig: widgetGraphConfig,
            metadata: metadata,
            aiLogScale: aiLogScale !== null ? aiLogScale : log,
            scaleFromZeroToOne: scaleFromZeroToOne,
            All_WM_attributes: All_WM_attributes,
            pdfDownloadStatus: PdfDownloadStatus
              ? PdfDownloadStatus
              : isPPTModalOpen,
            competitorBenchmark:
              dashboardCompetitorList ||
              widgetMakerCompetitorList ||
              templateDetailsCompetitorList ||
              pdfCompititorList,
            widget_name: metadata?.widget_name,
            section_index: section_index,
            widget_index: widget_index,
            panes: panes,
            index: index,
            dashboard: dashboard,
            section: Section,
            template_widget: template_widget,
            shareTemplateData: shareTemplateData,
            graphConditionConfig: graphConditionConfig,
            isScheduleReportOpen: isScheduleReportOpen,
            screen: screen,
            template_details: templateDetails,
          };
          updateOptions[id] = getLine(graphObject, authParams);
          dispatch(setOptionHighChart(updateOptions));
        }
      }
    } else if (
      type === "area" ||
      (updatedGraphData &&
        Object?.keys(updatedGraphData).findIndex((el) => el === "area_" + id) >=
          0)
    ) {
      let index =
        updatedGraphData &&
        Object?.keys(updatedGraphData).findIndex((el) => el === "area_" + id);
      if (index >= 0) {
        //chart type change

        if (updatedGraphData["area_" + id]?.selected_chart == "bar") {
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };
          let index = getPaneIndex(panes, activeKey);
          let graphObject = {
            single: single,
            xaxis: xaxis,
            yaxis: yaxis,
            style: style,
            stacked: stacked,
            type: type,
            legend_position: legend_position,
            percent: percent,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            chartDataLabelInPercent: chartDataLabelInPercent,
            chartGradientColor: chartGradientColor,
            chartGlobalDataStacked: chartGlobalDataStacked,
            yAxisScale: yAxisScale,
            aiLogScale: aiLogScale !== null ? aiLogScale : log,
            scaleFromZeroToOne: scaleFromZeroToOne,
            agentActivit: agentActivit,
            pdfDownloadStatus: PdfDownloadStatus
              ? PdfDownloadStatus
              : isPPTModalOpen,
            competitorBenchmark:
              dashboardCompetitorList ||
              widgetMakerCompetitorList ||
              templateDetailsCompetitorList ||
              pdfCompititorList,
            panes: panes,
            index: index,
            dashboard: dashboard,
            ticket_widget_id: ticket_widget_id,
            widgetGraphConfig: widgetGraphConfig,
            widget_name: metadata?.widget_name,
            metadata: metadata,
            ticket_chart_type: ticket_chart_type,
            section_index: section_index,
            widget_index: widget_index,
            section: Section,
            template_widget: template_widget,
            shareTemplateData: shareTemplateData,
            graphConditionConfig: graphConditionConfig,
            ticket_status_duration: ticket_status_duration,
            isScheduleReportOpen: isScheduleReportOpen,
            template_details: templateDetails,
          };
          updateOptions[id] = single[0]?.data
            ? getStackBarChart(graphObject, authParams)
            : getBarChart(graphObject, authParams);
          dispatch(setOptionHighChart(updateOptions));
        } else if (updatedGraphData["area_" + id]?.selected_chart == "line") {
          if (single[0].data) {
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let index = getPaneIndex(panes, activeKey);
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "line",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              panes: panes,
              index: index,
              dashboard: dashboard,
              widget_name: metadata?.widget_name,
              ticket_chart_type: ticket_chart_type,
              section_index: section_index,
              widget_index: widget_index,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              ticket_status_duration: ticket_status_duration,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
              screen: screen,
            };
            updateOptions[id] = getMultiLine(
              graphObject,
              authParams,
              Highcharts
            );
            dispatch(setOptionHighChart(updateOptions));
          } else {
            let index = getPaneIndex(panes, activeKey);
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: "line",
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              pdfDownloadStatus: PdfDownloadStatus,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              screen: screen,
              template_details: templateDetails,
            };
            updateOptions[id] = getLine(graphObject, authParams);
            dispatch(setOptionHighChart(updateOptions));
          }
        } else {
          if (single[0]?.data) {
            let index = getPaneIndex(panes, activeKey);
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: type,
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              //chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              //xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              chartGlobalDataStacked: chartGlobalDataStacked,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              All_WM_attributes: All_WM_attributes,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
            };
            updateOptions[id] = getMultiArea(graphObject, authParams);
            dispatch(setOptionHighChart(updateOptions));
          } else {
            let index = getPaneIndex(panes, activeKey);
            let updateOptions = global?.options
              ? { ...global?.options }
              : { ...opData };
            let graphObject = {
              single: single,
              title: title,
              colors: colors,
              xaxis: xaxis,
              yaxis: yaxis,
              type: type,
              legend_position: legend_position,
              chartGlobalDataLabel: chartGlobalDataLabel,
              chartAxisLabel: chartAxisLabel,
              //chartXaxisDataLabel: chartXaxisDataLabel,
              chartMarkers: chartMarkers,
              //xAxisScale: xAxisScale,
              yAxisScale: yAxisScale,
              style: style,
              widgetGraphConfig: widgetGraphConfig,
              metadata: metadata,
              aiLogScale: aiLogScale !== null ? aiLogScale : log,
              scaleFromZeroToOne: scaleFromZeroToOne,
              All_WM_attributes: All_WM_attributes,
              pdfDownloadStatus: PdfDownloadStatus
                ? PdfDownloadStatus
                : isPPTModalOpen,
              competitorBenchmark:
                dashboardCompetitorList ||
                widgetMakerCompetitorList ||
                templateDetailsCompetitorList ||
                pdfCompititorList,
              widget_name: metadata?.widget_name,
              section_index: section_index,
              widget_index: widget_index,
              panes: panes,
              index: index,
              dashboard: dashboard,
              section: Section,
              template_widget: template_widget,
              shareTemplateData: shareTemplateData,
              graphConditionConfig: graphConditionConfig,
              isScheduleReportOpen: isScheduleReportOpen,
              template_details: templateDetails,
              screen: screen,
            };
            updateOptions[id] = getArea(graphObject, authParams);
            dispatch(setOptionHighChart(updateOptions));
          }
        }
      } else {
        if (single && single[0]?.data) {
          let index = getPaneIndex(panes, activeKey);
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };
          let graphObject = {
            single: single,
            title: title,
            colors: colors,
            xaxis: xaxis,
            yaxis: yaxis,
            type: type,
            legend_position: legend_position,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            //chartXaxisDataLabel: chartXaxisDataLabel,
            chartMarkers: chartMarkers,
            //xAxisScale: xAxisScale,
            yAxisScale: yAxisScale,
            style: style,
            chartGlobalDataStacked: chartGlobalDataStacked,
            widgetGraphConfig: widgetGraphConfig,
            metadata: metadata,
            aiLogScale: aiLogScale !== null ? aiLogScale : log,
            scaleFromZeroToOne: scaleFromZeroToOne,
            All_WM_attributes: All_WM_attributes,
            pdfDownloadStatus: PdfDownloadStatus
              ? PdfDownloadStatus
              : isPPTModalOpen,
            competitorBenchmark:
              dashboardCompetitorList ||
              widgetMakerCompetitorList ||
              templateDetailsCompetitorList ||
              pdfCompititorList,
            widget_name: metadata?.widget_name,
            section_index: section_index,
            widget_index: widget_index,
            panes: panes,
            index: index,
            dashboard: dashboard,
            section: Section,
            template_widget: template_widget,
            shareTemplateData: shareTemplateData,
            graphConditionConfig: graphConditionConfig,
            isScheduleReportOpen: isScheduleReportOpen,
            template_details: templateDetails,
          };
          updateOptions[id] = getMultiArea(graphObject, authParams);
          dispatch(setOptionHighChart(updateOptions));
        } else {
          let index = getPaneIndex(panes, activeKey);
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };
          let graphObject = {
            single: single,
            title: title,
            colors: colors,
            xaxis: xaxis,
            yaxis: yaxis,
            type: type,
            legend_position: legend_position,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            //chartXaxisDataLabel: chartXaxisDataLabel,
            chartMarkers: chartMarkers,
            //xAxisScale: xAxisScale,
            yAxisScale: yAxisScale,
            style: style,
            widgetGraphConfig: widgetGraphConfig,
            metadata: metadata,
            aiLogScale: aiLogScale !== null ? aiLogScale : log,
            scaleFromZeroToOne: scaleFromZeroToOne,
            All_WM_attributes: All_WM_attributes,
            pdfDownloadStatus: PdfDownloadStatus
              ? PdfDownloadStatus
              : isPPTModalOpen,
            competitorBenchmark:
              dashboardCompetitorList ||
              widgetMakerCompetitorList ||
              templateDetailsCompetitorList ||
              pdfCompititorList,
            widget_name: metadata?.widget_name,
            section_index: section_index,
            widget_index: widget_index,
            panes: panes,
            index: index,
            dashboard: dashboard,
            section: Section,
            template_widget: template_widget,
            shareTemplateData: shareTemplateData,
            graphConditionConfig: graphConditionConfig,
            isScheduleReportOpen: isScheduleReportOpen,
            template_details: templateDetails,
            screen: screen,
          };
          updateOptions[id] = getArea(graphObject, authParams);
          dispatch(setOptionHighChart(updateOptions));
        }
      }
    }
  };

  useEffect(() => {
    if (!IsEmpty(updatedGraphData)) {
      getChartDataObj();
    }
  }, [updatedGraphData]);

  useEffect(() => {
    let basicGraphObject = {
      widgetGraphConfig: widgetGraphConfig,
      widget_name: metadata?.widget_name,
      metadata: metadata,
      section_index: section_index,
      widget_index: widget_index,
      panes: panes,
      index: index,
      dashboard: dashboard,
      section: Section,
      template_widget: template_widget,
      shareTemplateData: shareTemplateData,
      graphConditionConfig: graphConditionConfig,
      isScheduleReportOpen: isScheduleReportOpen,
      ticket_widget_id: ticket_widget_id,
      ticket_chart_type: ticket_chart_type,
      ticket_status_duration: ticket_status_duration,
      aiLogScale: aiLogScale !== null ? aiLogScale : log,
      scaleFromZeroToOne: scaleFromZeroToOne,
      All_WM_attributes: All_WM_attributes,
      trends_type: trends_type,
      pdfDownloadStatus: PdfDownloadStatus ? PdfDownloadStatus : isPPTModalOpen,
      competitorBenchmark:
        dashboardCompetitorList ||
        widgetMakerCompetitorList ||
        templateDetailsCompetitorList ||
        pdfCompititorList,
    };
    if (
      (dashboard && !opData?.[id] && !deepDiveFlag) ||
      !dashboard ||
      deepDive
    ) {
      if (
        (type == "horizontal-bar" || type == "bar") &&
        !stacked &&
        IsEmpty(updatedGraphData)
      ) {
        let updateOptions = global?.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};
        let graphObject = {
          ...basicGraphObject,
          single: single,
          title: title,
          //colors: colors,
          xaxis: xaxis,
          yaxis: yaxis,
          type: type,
          legend_position: legend_position,
          chartGlobalDataLabel: chartGlobalDataLabel,
          chartAxisLabel: chartAxisLabel,
          //chartXaxisDataLabel: chartXaxisDataLabel,
          //chartMarkers: chartMarkers,
          //xAxisScale: xAxisScale,
          yAxisScale: yAxisScale,
          style: style,
          stacked: stacked,
          // aiLogScale: aiLogScale !== null ? aiLogScale : log,
          agentActivit: agentActivit,
          // All_WM_attributes: All_WM_attributes,
          // pdfDownloadStatus: PdfDownloadStatus
          //   ? PdfDownloadStatus
          //   : isPPTModalOpen,
          // competitorBenchmark:
          //   dashboardCompetitorList ||
          //   widgetMakerCompetitorList ||
          //   templateDetailsCompetitorList ||
          //   pdfCompititorList,
          // widgetGraphConfig: widgetGraphConfig,
          // widget_name: metadata?.widget_name,
          // metadata: metadata,
          // section_index: section_index,
          // widget_index: widget_index,
          // panes: panes,
          // index: index,
          // dashboard: dashboard,
          // section: Section,
          // template_widget: template_widget,
          // shareTemplateData: shareTemplateData,
          // graphConditionConfig: graphConditionConfig,
          // isScheduleReportOpen: isScheduleReportOpen,
          template_details: templateDetails,
        };

        updateOptions[id] = getBarChart(graphObject, authParams);
        dispatch(setOptionHighChart(updateOptions));
      } else if (
        //stack bar
        (type === "horizontal-bar" || type === "bar") &&
        stacked &&
        IsEmpty(updatedGraphData)
      ) {
        let updateOptions = global?.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};

        let graphObject = {
          ...basicGraphObject,
          single: single,
          xaxis: xaxis,
          yaxis: yaxis,
          style: style,
          stacked: stacked,
          type: type,
          legend_position: legend_position,
          percent: percent,
          chartGlobalDataLabel: chartGlobalDataLabel,
          chartAxisLabel: chartAxisLabel,
          chartDataLabelInPercent: chartDataLabelInPercent,
          chartGradientColor: chartGradientColor,
          chartGlobalDataStacked: chartGlobalDataStacked,
          yAxisScale: yAxisScale,
          // aiLogScale: aiLogScale !== null ? aiLogScale : log,
          // All_WM_attributes: All_WM_attributes,
          // pdfDownloadStatus: PdfDownloadStatus
          //   ? PdfDownloadStatus
          //   : isPPTModalOpen,
          // competitorBenchmark:
          //   dashboardCompetitorList ||
          //   widgetMakerCompetitorList ||
          //   templateDetailsCompetitorList ||
          //   pdfCompititorList,
          // panes: panes,
          // index: index,
          // dashboard: dashboard,
          // ticket_widget_id: ticket_widget_id,
          // widgetGraphConfig: widgetGraphConfig,
          // widget_name: metadata?.widget_name,
          // metadata: metadata,
          // ticket_chart_type: ticket_chart_type,
          // section_index: section_index,
          // widget_index: widget_index,
          // section: Section,
          // template_widget: template_widget,
          // shareTemplateData: shareTemplateData,
          // graphConditionConfig: graphConditionConfig,
          // ticket_status_duration: ticket_status_duration,
          // isScheduleReportOpen: isScheduleReportOpen,
          template_details: templateDetails,
        };

        updateOptions[id] = getStackBarChart(graphObject, authParams);

        dispatch(setOptionHighChart(updateOptions));
      } else if (type === "pie" || type === "donut") {
        let updateOptions = global?.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};
        let graphObject = {
          single: single,
          type: type,
          legend_position: legend_position,
          style: style,
          xaxis: xaxis,
          yaxis: yaxis,
          pdfDownloadStatus: PdfDownloadStatus
            ? PdfDownloadStatus
            : isPPTModalOpen,
          widget_name: metadata?.widget_name,
          metadata: metadata,
        };

        updateOptions[id] = getPie(graphObject, authParams);

        dispatch(setOptionHighChart(updateOptions));
      } else if (type === "line" && IsEmpty(updatedGraphData)) {
        if (single[0]?.data) {
          let updateOptions = global?.options
            ? { ...global?.options }
            : opData
            ? { ...opData }
            : {};

          let graphObject = {
            ...basicGraphObject,
            single: single,
            title: title,
            colors: colors,
            xaxis: xaxis,
            yaxis: yaxis,
            type: type,
            legend_position: legend_position,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            chartXaxisDataLabel: chartXaxisDataLabel,
            chartMarkers: chartMarkers,
            xAxisScale: xAxisScale,
            yAxisScale: yAxisScale,
            style: style,
            // widgetGraphConfig: widgetGraphConfig,
            // metadata: metadata,
            // aiLogScale: aiLogScale !== null ? aiLogScale : log,
            // All_WM_attributes: All_WM_attributes,
            // pdfDownloadStatus: PdfDownloadStatus
            //   ? PdfDownloadStatus
            //   : isPPTModalOpen,
            // competitorBenchmark:
            //   dashboardCompetitorList ||
            //   widgetMakerCompetitorList ||
            //   templateDetailsCompetitorList ||
            //   pdfCompititorList,
            // panes: panes,
            // index: index,
            // dashboard: dashboard,
            // widget_name: metadata?.widget_name,
            // ticket_chart_type: ticket_chart_type,
            // section_index: section_index,
            // widget_index: widget_index,
            // section: Section,
            // template_widget: template_widget,
            // shareTemplateData: shareTemplateData,
            // graphConditionConfig: graphConditionConfig,
            // ticket_status_duration: ticket_status_duration,
            // isScheduleReportOpen: isScheduleReportOpen,
            template_details: templateDetails,
            screen: screen,
          };

          updateOptions[id] = getMultiLine(graphObject, authParams, Highcharts);
          dispatch(setOptionHighChart(updateOptions));
        } else {
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };
          let graphObject = {
            ...basicGraphObject,
            single: single,
            title: title,
            colors: colors,
            xaxis: xaxis,
            yaxis: yaxis,
            type: "line",
            legend_position: legend_position,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            chartXaxisDataLabel: chartXaxisDataLabel,
            chartMarkers: chartMarkers,
            xAxisScale: xAxisScale,
            yAxisScale: yAxisScale,
            style: style,
            // widgetGraphConfig: widgetGraphConfig,
            // metadata: metadata,
            // aiLogScale: aiLogScale !== null ? aiLogScale : log,
            // All_WM_attributes: All_WM_attributes,
            // pdfDownloadStatus: PdfDownloadStatus
            //   ? PdfDownloadStatus
            //   : isPPTModalOpen,
            // competitorBenchmark:
            //   dashboardCompetitorList ||
            //   widgetMakerCompetitorList ||
            //   templateDetailsCompetitorList ||
            //   pdfCompititorList,
            // widget_name: metadata?.widget_name,
            // section_index: section_index,
            // widget_index: widget_index,
            // panes: panes,
            // index: index,
            // dashboard: dashboard,
            // section: Section,
            // template_widget: template_widget,
            // shareTemplateData: shareTemplateData,
            // graphConditionConfig: graphConditionConfig,
            // isScheduleReportOpen: isScheduleReportOpen,
            screen: screen,
            template_details: templateDetails,
          };

          updateOptions[id] = getLine(graphObject, authParams);
          dispatch(setOptionHighChart(updateOptions));
        }
      } else if (type === "area" && IsEmpty(updatedGraphData)) {
        if (single && single[0]?.data) {
          let updateOptions = global?.options
            ? { ...global?.options }
            : opData
            ? { ...opData }
            : {};
          let graphObject = {
            ...basicGraphObject,
            single: single,
            title: title,
            colors: colors,
            xaxis: xaxis,
            yaxis: yaxis,
            type: type,
            legend_position: legend_position,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            //chartXaxisDataLabel: chartXaxisDataLabel,
            chartMarkers: chartMarkers,
            //xAxisScale: xAxisScale,
            yAxisScale: yAxisScale,
            style: style,
            chartGlobalDataStacked: chartGlobalDataStacked,
            // widgetGraphConfig: widgetGraphConfig,
            // metadata: metadata,
            // aiLogScale: aiLogScale !== null ? aiLogScale : log,
            // All_WM_attributes: All_WM_attributes,
            // pdfDownloadStatus: PdfDownloadStatus
            //   ? PdfDownloadStatus
            //   : isPPTModalOpen,
            // competitorBenchmark:
            //   dashboardCompetitorList ||
            //   widgetMakerCompetitorList ||
            //   templateDetailsCompetitorList ||
            //   pdfCompititorList,
            // widget_name: metadata?.widget_name,
            // section_index: section_index,
            // widget_index: widget_index,
            // panes: panes,
            // index: index,
            // dashboard: dashboard,
            // section: Section,
            // template_widget: template_widget,
            // shareTemplateData: shareTemplateData,
            // graphConditionConfig: graphConditionConfig,
            // isScheduleReportOpen: isScheduleReportOpen,
            template_details: templateDetails,
          };

          updateOptions[id] = getMultiArea(graphObject, authParams);
          dispatch(setOptionHighChart(updateOptions));
        } else {
          let updateOptions = global?.options
            ? { ...global?.options }
            : { ...opData };
          let graphObject = {
            ...basicGraphObject,
            single: single,
            title: title,
            colors: colors,
            xaxis: xaxis,
            yaxis: yaxis,
            type: type,
            legend_position: legend_position,
            chartGlobalDataLabel: chartGlobalDataLabel,
            chartAxisLabel: chartAxisLabel,
            //chartXaxisDataLabel: chartXaxisDataLabel,
            chartMarkers: chartMarkers,
            //xAxisScale: xAxisScale,
            yAxisScale: yAxisScale,
            style: style,
            // widgetGraphConfig: widgetGraphConfig,
            // metadata: metadata,
            // aiLogScale: aiLogScale !== null ? aiLogScale : log,
            // All_WM_attributes: All_WM_attributes,
            // pdfDownloadStatus: PdfDownloadStatus
            //   ? PdfDownloadStatus
            //   : isPPTModalOpen,
            // competitorBenchmark:
            //   dashboardCompetitorList ||
            //   widgetMakerCompetitorList ||
            //   templateDetailsCompetitorList ||
            //   pdfCompititorList,
            // widget_name: metadata?.widget_name,
            // section_index: section_index,
            // widget_index: widget_index,
            // panes: panes,
            // index: index,
            // dashboard: dashboard,
            // section: Section,
            // template_widget: template_widget,
            // shareTemplateData: shareTemplateData,
            // graphConditionConfig: graphConditionConfig,
            // isScheduleReportOpen: isScheduleReportOpen,
            template_details: templateDetails,
            screen: screen,
          };

          updateOptions[id] = getArea(graphObject, authParams);
          dispatch(setOptionHighChart(updateOptions));
        }
      } else if (type === "sunburst") {
        let updateOptions = global?.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};
        let graphObject = {
          single: single,
          title: title,
          colors: colors,
          type: type,
          style: style,
          pdfDownloadStatus: PdfDownloadStatus ? PdfDownloadStatus : false,
          pptDownloadStatus: isPPTModalOpen ? isPPTModalOpen : false,
          widget_name: metadata?.widget_name,
          metadata: metadata,
          screen: screen,
        };

        updateOptions[id] = getSunburst(graphObject, authParams);
        dispatch(setOptionHighChart(updateOptions));
      } else if (type === "scatter") {
        let updateOptions = global?.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};
        let graphObject = {
          single: single,
          title: title,
          colors: colors,
          xaxis: xaxis,
          yaxis: yaxis,
          type: type,
          legend_position: legend_position,
          style: style,
          pdfDownloadStatus: PdfDownloadStatus
            ? PdfDownloadStatus
            : isPPTModalOpen,
          widget_name: metadata?.widget_name,
        };

        updateOptions[id] = getScatter(graphObject, authParams);
        dispatch(setOptionHighChart(updateOptions));

        // updateOptions[id] = getScatter(
        // 	single,
        // 	title,
        // 	colors,
        // 	xaxis,
        // 	yaxis,
        // 	type,
        // 	legend_position
        // );
      } else if (type === "combination") {
        let updateOptions = global?.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};
        let obj = {
          ...basicGraphObject,
          single: single,
          title: title,
          colors: colors,
          xaxis: xaxis,
          yaxis: yaxis,
          type: type,
          legend_position: legend_position,
          xAxisChartType: xAxisChartType,
          metadata: metadata,
          y_series2: y_series2,
          chartGlobalDataLabel: chartGlobalDataLabel,
          chartAxisLabel: chartAxisLabel,
          yAxisScale: yAxisScale,
          attribute: attribute,
          yAxisMode: yAxisMode,
          chartMarkers: chartMarkers,
          style: style,
          // widgetGraphConfig: widgetGraphConfig,
          // All_WM_attributes: All_WM_attributes,
          // aiLogScale: aiLogScale !== null ? aiLogScale : log,
          // pdfDownloadStatus: PdfDownloadStatus
          //   ? PdfDownloadStatus
          //   : isPPTModalOpen,
          // competitorBenchmark:
          //   dashboardCompetitorList ||
          //   widgetMakerCompetitorList ||
          //   templateDetailsCompetitorList ||
          //   pdfCompititorList,
          // widget_name: metadata?.widget_name,
          chartGradientColor: chartGradientColor,
          chartGlobalDataStacked: chartGlobalDataStacked,
          // section_index: section_index,
          // widget_index: widget_index,
          // panes: panes,
          // index: index,
          // dashboard: dashboard,
          // section: Section,
          // template_widget: template_widget,
          // shareTemplateData: shareTemplateData,
          // graphConditionConfig: graphConditionConfig,
          // trends_type: trends_type,
          // template_id: template_id,
          // isScheduleReportOpen: isScheduleReportOpen,
          template_details: templateDetails,
        };

        updateOptions[id] = getCombination(obj, authParams);
        dispatch(setOptionHighChart(updateOptions));
      } else if (type === "heat" || type === "heatmap") {
        let updateOptions = global?.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};
        let graphObject = {
          single: single,
          title: title,
          colors: colors,
          type: type,
          xaxis: xaxis,
          yaxis: yaxis,
          split: split,
          style: style,
          pdfDownloadStatus: PdfDownloadStatus
            ? PdfDownloadStatus
            : isPPTModalOpen,
        };

        updateOptions[id] = getHeat(graphObject, authParams);
        dispatch(setOptionHighChart(updateOptions));
      } else if (type === "wordcloud") {
        let updateOptions = global?.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};
        let graphObject = {
          single: single,
          title: title,
          colors: colors,
          type: type,
          style: style,
          xaxis: xaxis,
          yaxis: yaxis,
          differential: differential,
          pdfDownloadStatus: PdfDownloadStatus
            ? PdfDownloadStatus
            : isPPTModalOpen,
          widget_name: metadata?.widget_name,
          metadata: metadata,
          widgetGraphConfig: widgetGraphConfig,
          fontFamily: fontFamily,
        };

        updateOptions[id] = getWordcloud(graphObject, Highcharts, authParams);
        dispatch(setOptionHighChart(updateOptions));
      } else if (type === "network-graph") {
        let updateOptions = global?.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};
        let graphObject = {
          ...basicGraphObject,
          single: single,
          title: title,
          colors: colors,
          xaxis: xaxis,
          yaxis: yaxis,
          type: type,
          legend_position: legend_position,
          xAxisChartType: xAxisChartType,
          metadata: metadata,
          chartGlobalDataLabel: chartGlobalDataLabel,
          chartMarkers: chartMarkers,
          style: style,
          chartGradientColor: chartGradientColor,
          networkLinkLength: networkLinkLength,
        };
        updateOptions[id] = getNetworkGraph(
          graphObject,
          Highcharts,
          authParams
        );
        dispatch(setOptionHighChart(updateOptions));
      } else if (type === "network-graph") {
        let updateOptions = global?.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};
        let graphObject = {
          single: single,
          title: title,
          colors: colors,
          type: type,
          style: style,
          xaxis: xaxis,
          yaxis: yaxis,
          pdfDownloadStatus: PdfDownloadStatus
            ? PdfDownloadStatus
            : isPPTModalOpen,
          widget_name: metadata?.widget_name,
          widgetGraphConfig: widgetGraphConfig,
          metadata: metadata,
          chartGlobalDataLabel: chartGlobalDataLabel,
          chartMarkers: chartMarkers,
          chartGradientColor: chartGradientColor,
          networkLinkLength: networkLinkLength,
        };

        updateOptions[id] = getNetworkGraph(
          graphObject,
          Highcharts,
          authParams
        );
        dispatch(setOptionHighChart(updateOptions));
      } else if (type === "sankey") {
        let updateOptions = global.options
          ? { ...global?.options }
          : opData
          ? { ...opData }
          : {};
        let graphObject = {
          single: single,
          title: title,
          colors: colors,
          type: type,
          style: style,
          pdfDownloadStatus: PdfDownloadStatus ? PdfDownloadStatus : false,
          pptDownloadStatus: isPPTModalOpen ? isPPTModalOpen : false,
          widget_name: metadata?.widget_name,
          metadata: metadata,
          screen: screen,
          // isDeepDiveView: isDeepDiveView,
        };

        updateOptions[id] = getSankey(graphObject, authParams);
        dispatch(setOptionHighChart(updateOptions));
      }
    }
    // && ((opData && !opData[id]) || !opData)
    //to control multiple rendering
    // if (opData && opData[id]) {
    //   opData[id].count = opData[id]?.count >= 0 ? opData[id]?.count + 1 : 0;
    // }
    const timer = setTimeout(
      () => {
        if (currentSelectedGraph && opData) {
          Object?.keys(currentSelectedGraph).length > 0 &&
            currentSelectedGraph?.reflow();
          //currentSelectedGraph?.redraw();
          // currentSelectedGraph?.reflow(false);
          // currentSelectedGraph?.reflow(true);
          //Object?.keys(currentSelectedGraph).length > 0 && currentSelectedGraph?.redraw();
        }
      },
      [isshowSideBar],
      500
    );
    return () => {
      clearTimeout(timer);
    };
  }, [
    type,
    stacked,
    id,
    legend_position,
    chartGlobalDataLabel,
    chartAxisLabel,
    chartDataLabelInPercent,
    chartGlobalDataStacked,
    chartXaxisDataLabel,
    chartMarkers,
    xAxisChartType,
    yAxisChartType,
    xAxisScale,
    yAxisScale,
    widgetGraphConfig?.y_axis_settings,
    widgetGraphConfig,
    isshowSideBar,
    yAxisMode,
    style,
    Section,
    panes,
    aiLogScale,
    isPPTModalOpen,
    authParams,
    shareTemplateData,
    screen,
  ]);
  const onScroll = (e) => {
    setxPosition(0);
    setyPosition(0);
    if (refTooltip.current && !refTooltip.current.contains(e.target)) {
      setxPosition(0);
      setyPosition(0);
    } else {
      setxPosition(0);
      setyPosition(0);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  useEffect(() => {
    if (currentSelectedGraph && opData?.[id]) {
      currentSelectedGraph?.reflow();
      //currentSelectedGraph?.redraw();
    }
  }, [isWidgetEdit, span_data?.span, isPPTModalOpen]);

  const [is_section_locked, is_widget_locked] = useMemo(() => {
    let shareSections = shareTemplateData?.section
      ? shareTemplateData?.section?.[0]
      : shareTemplateData?.sections?.[section_index];

    let widget_metadata =
      pathName?.toLowerCase() === "commandcenter"
        ? section_index !== null &&
          section_index !== undefined &&
          screen?.sections &&
          screen?.sections?.[section_index]?.widgets?.[widget_index]
          ? screen?.sections?.[section_index]?.widgets?.[widget_index]
          : section_index >= 0 &&
            screen?.sections &&
            screen?.sections?.[section_index]
          ? screen?.sections?.[section_index]
          : screen?.section?.[0]?.widgets?.[widget_index]
          ? screen?.section?.[0]?.widgets?.[widget_index]
          : screen?.widgets?.[widget_index]
        : shareBrands
        ? shareSections?.widgets?.[widget_index]
        : section_index >= 0
        ? panes?.[index]?.sections?.[section_index]?.widgets?.[widget_index]
        : panes?.[index]?.section?.[0]?.widgets?.[widget_index];

    let section_metadata =
      pathName?.toLowerCase() === "commandcenter"
        ? section_index !== null &&
          section_index !== undefined &&
          screen?.sections?.[section_index]
          ? screen?.sections?.[section_index]
          : section_index >= 0 && screen?.sections?.[section_index]
          ? screen?.sections?.[section_index]
          : screen?.section?.[0]
        : shareBrands
        ? shareSections
        : section_index >= 0
        ? panes?.[index]?.sections?.[section_index]
        : panes?.[index]?.section?.[0];

    let is_section_locked = section_metadata?.is_locked;
    let is_widget_locked = widget_metadata?.is_locked;

    return [is_section_locked, is_widget_locked];
  }, [pathName, shareTemplateData, shareBrands, index]);

  const thisCurrentGraph = (chart) => {
    setCurrentSelectedGraph(chart);
  };
  const copyData = async (data) => {
    const copyText = document.getElementsByClassName("resize__chart--window");
    //copyText.select();
    const codata = await data?.series[0]?.data?.map((el) => el?.name);
    await navigator.clipboard.writeText(codata && codata);
  };
  // useScrollPosition(
  //   ({ currPos }) => {

  //   },
  //   [],

  //   false,
  //   1000
  // );

  const handleOnClickDeepDive = (
    cordinates,
    section_index,
    widget_index,
    single
  ) => {
    // Enable Deep Dive Component
    dispatch(setDashboardDeepDiveLevel(6));

    let checkAttType = [];
    Array.isArray(WM_attributes) &&
      WM_attributes?.forEach((e) => {
        return e[1]?.forEach((el) => {
          if (el?.[1]?.datatype === "int") {
            checkAttType?.push(el?.[1]?.title);
          }
        });
      });
    let pathName = getWindowLocationPath()?.toLowerCase();
    if (pathName) {
      let widget_metadata =
        dashboardsData[dashboardActiveKey]?.analytics_sections_level_1?.[
          section_index
        ]?.widgets?.[widget_index];

      if (widget_metadata) {
        // dispatch(setDeepDiveFlag(true));

        let series_index = cordinates?.series?.index
          ? cordinates?.series?.index
          : 0;
        let single_data =
          Array.isArray(single) && single[0]?.data
            ? single[0]?.data
            : single?.y_axis
            ? opData[id]?.series
            : null;

        let y_axis_att =
          type === "pie" &&
          Array.isArray(single) &&
          metadata?.y_axes &&
          metadata?.y_axes[0]?.attribute
            ? metadata?.y_axes[0]?.attribute
            : type === "sunburst" ||
              type === "heatmap" ||
              widget_metadata?.primary
            ? widget_metadata?.primary
              ? widget_metadata?.primary
              : metadata?.y_series[0]?.attribute?.toLowerCase()
            : metadata?.y_axes && metadata?.y_axes[0]?.attribute && single_data
            ? single_data[series_index]?.attribute?.toLowerCase() ===
              metadata?.y_axes[0]?.attribute?.toLowerCase()
              ? single_data[series_index]?.attribute?.toLowerCase()
              : null
            : null;
        let y_series_att =
          type === "pie" &&
          Array.isArray(single) &&
          metadata?.y_axes?.length > 0 &&
          metadata?.y_axes?.[0]?.attribute
            ? metadata?.y_series[0]?.attribute
            : type === "sunburst" || type === "heatmap"
            ? metadata?.y_series[0]?.attribute?.toLowerCase()
            : metadata?.y_axes?.length > 0
            ? metadata?.y_axes?.[0]?.attribute && single_data
              ? single_data[series_index]?.attribute?.toLowerCase() ===
                metadata?.y_axes[0]?.attribute?.toLowerCase()
                ? metadata?.y_series[0]?.attribute?.toLowerCase()
                : single_data[series_index]?.attribute?.toLowerCase()
              : null
            : single_data &&
              single_data[series_index]?.attribute?.toLowerCase();
        let y_series_filter =
          type === "sunburst" || type === "heatmap"
            ? metadata?.y_series[0]?.filters
            : metadata?.y_axes
            ? metadata?.y_axes?.[0]?.attribute && single_data
              ? single_data[series_index]?.attribute?.toLowerCase() ===
                metadata?.y_axes[0]?.attribute?.toLowerCase()
                ? single_data[series_index]?.filters
                : single_data[series_index]?.filters
              : null
            : single_data && single_data[series_index]?.filters;

        let global_brands = getDashboardGlobalBrands(
          dashboardsData,
          dashboardBrandsList,
          dashboardActiveKey
        );

        let graphObject = {
          dashboard_type: dashboardActiveKey + 1,
          dashboardsData: dashboardsData,
          p_token: p_token ? p_token : null,
          start_date: dashboardsData[dashboardActiveKey]?.duration?.start_date,
          end_date: dashboardsData[dashboardActiveKey]?.duration?.end_date,
          brand_list: global_brands,
          deep_dive_on: {
            x_axis:
              widget_metadata?.x_axis?.attribute || widget_metadata?.primary
                ? {
                    date_part: widget_metadata?.x_axis?.date_part
                      ? widget_metadata?.x_axis?.date_part
                      : widget_metadata?.x_axis?.date_aggregation,
                    attribute: widget_metadata?.x_axis?.attribute
                      ? widget_metadata?.x_axis?.attribute?.toLowerCase()
                      : widget_metadata?.primary,
                    value:
                      widget_metadata?.chart?.chart_type === "pie" &&
                      widget_metadata?.y_axes?.length > 0
                        ? Array?.isArray(metaWidgetGraphData)
                          ? metaWidgetGraphData?.[0]?.breakdown_value
                          : metaWidgetGraphData?.breakdown_value
                        : widget_metadata?.chart?.chart_type === "sunburst" ||
                          widget_metadata?.graph_type === "sunburst"
                        ? single?.find(
                            (e) => e?.id === cordinates?.options?.parent
                          )?.name
                        : widget_metadata?.chart?.chart_type === "pie" ||
                          widget_metadata?.chart?.chart_type === "wordcloud" ||
                          widget_metadata?.chart?.chart_type === "donut" ||
                          widget_metadata?.graph_type === "pie" ||
                          widget_metadata?.graph_type === "wordcloud" ||
                          widget_metadata?.graph_type === "donut"
                        ? cordinates?.options?.name
                        : widget_metadata?.chart?.chart_type === "heatmap" ||
                          widget_metadata?.graph_type === "heatmap"
                        ? single[0]?.x[cordinates?.options?.x]
                        : cordinates?.category?.toString(),
                    trace_name: allAttributes?.[
                      widget_metadata?.x_axis?.attribute
                        ? widget_metadata?.x_axis?.attribute?.toLowerCase()
                        : widget_metadata?.primary?.toLowerCase()
                    ]
                      ? allAttributes?.[
                          widget_metadata?.x_axis?.attribute
                            ? widget_metadata?.x_axis?.attribute?.toLowerCase()
                            : widget_metadata?.primary?.toLowerCase()
                        ]
                      : "",
                  }
                : undefined,
            y_series: !widget_metadata?.primary
              ? {
                  filters: widget_metadata?.y_series
                    ? widget_metadata?.y_axes?.length > 0
                      ? y_series_filter
                        ? y_series_filter
                        : []
                      : widget_metadata?.y_series[series_index]?.filters
                    : [],
                  date_part: widget_metadata?.y_series
                    ? widget_metadata?.y_series[series_index]?.date_part
                    : null,
                  attribute: widget_metadata?.y_series
                    ? widget_metadata?.y_axes?.length > 0 &&
                      widget_metadata?.chart?.chart_type !== "wordcloud"
                      ? y_series_att
                      : widget_metadata?.y_series[
                          series_index
                        ]?.attribute?.toLowerCase()
                    : widget_metadata?.secondary,
                  value:
                    widget_metadata?.chart?.chart_type === "sunburst" ||
                    widget_metadata?.graph_type === "sunburst"
                      ? cordinates?.options?.value
                      : widget_metadata?.chart?.chart_type === "wordcloud" ||
                        widget_metadata?.graph_type === "wordcloud"
                      ? cordinates?.options?.weight
                      : widget_metadata?.chart?.chart_type === "heatmap" ||
                        widget_metadata?.graph_type === "heatmap"
                      ? cordinates?.options?.value
                      : cordinates?.options?.y,
                  trace_name: allAttributes?.[
                    widget_metadata?.y_series
                      ? widget_metadata?.y_axes?.length > 0 &&
                        widget_metadata?.chart?.chart_type !== "wordcloud"
                        ? y_series_att?.toLowerCase()
                        : widget_metadata?.y_series[
                            series_index
                          ]?.attribute?.toLowerCase()
                      : widget_metadata?.secondary?.toLowerCase()
                  ]
                    ? allAttributes?.[
                        widget_metadata?.y_series
                          ? widget_metadata?.y_axes?.length > 0 &&
                            widget_metadata?.chart?.chart_type !== "wordcloud"
                            ? y_series_att?.toLowerCase()
                            : widget_metadata?.y_series[
                                series_index
                              ]?.attribute?.toLowerCase()
                          : widget_metadata?.secondary?.toLowerCase()
                      ]
                    : "",
                }
              : undefined,
            y_axis:
              widget_metadata?.chart?.chart_type === "wordcloud" &&
              widget_metadata?.chart?.chart_settings?.wordcloud_color === "1" &&
              cordinates?.options?.SentimentType
                ? {
                    attribute: "SentimentType",
                    trace_name: "Sentiment",
                    value: cordinates?.options?.SentimentType,
                  }
                : y_axis_att &&
                  !checkAttType.includes(cordinates?.series?.name) &&
                  (JSON.stringify(widget_metadata?.y_axes) !== {} ||
                    JSON.stringify(widget_metadata?.secondary) !== {}) &&
                  (widget_metadata?.y_axes || widget_metadata?.secondary)
                ? {
                    date_part: widget_metadata?.y_axes
                      ? widget_metadata?.y_axes[0]?.date_part
                      : null,
                    attribute: widget_metadata?.y_axes
                      ? widget_metadata?.y_axes[0]?.attribute?.toLowerCase()
                      : widget_metadata?.secondary,
                    value:
                      widget_metadata?.chart?.chart_type === "sunburst" ||
                      widget_metadata?.graph_type === "sunburst" ||
                      (widget_metadata?.chart?.chart_type === "pie" &&
                        widget_metadata?.y_axes?.length > 0)
                        ? cordinates?.options?.name
                        : widget_metadata?.chart?.chart_type === "wordcloud" ||
                          widget_metadata?.graph_type === "wordcloud"
                        ? single?.filter((el) => {
                            return el?.data?.find(
                              (e) => e?.value === cordinates?.options?.weight
                            );
                          })[0]?.name
                        : widget_metadata?.chart?.chart_type === "heatmap" ||
                          widget_metadata?.graph_type === "heatmap"
                        ? single[0]?.y[cordinates?.options?.y]
                        : cordinates?.series?.name,
                    trace_name: allAttributes?.[
                      widget_metadata?.y_axes
                        ? widget_metadata?.y_axes[0]?.attribute?.toLowerCase()
                        : widget_metadata?.secondary?.toLowerCase()
                    ]
                      ? allAttributes?.[
                          widget_metadata?.y_axes
                            ? widget_metadata?.y_axes[0]?.attribute?.toLowerCase()
                            : widget_metadata?.secondary?.toLowerCase()
                        ]
                      : "",
                  }
                : undefined,
          },
          filters: widget_metadata?.filters ? widget_metadata?.filters : [],
          filter_by: null,
          utcoffset: -330,
        };
        dispatch(getDashboardAnalyticsDeepDiveAPI(graphObject));

        setLoad(false);
        dispatch(setOptionHighChart(null));
        window.scrollTo(0, 0);
      } else {
        callNotification("Deep dive on this widget is not available", "info");
      }
    }
  };

  const callChartApi = (exclude_words) => {
    if (authParams?.screen_id) {
      // dispatch(
      //   updateScreenWidgetPropdataWithClearGraphData(
      //     section_index >= 0 ? section_index : null,
      //     widget_index,
      //     {
      //       prop_name: "temp_exclude_words",
      //       // prop_value: getUniqueValues(exclude_words),
      //     }
      //   )
      // );
    } else {
      let metadata = keywordData?.widget_metadata;

      let duration = panes?.[index]?.duration;

      // let global_brands = getGlobalBrands(
      //   panes[index]?.brands,
      //   global_dashboard_single_brands,
      //   global_dashboard_brands,
      //   panes[index]?.template_type
      // );
      let global_brands = panes?.[index]?.brands;

      let widgetObj = {
        brand_groups: metadata?.brand_groups,
        singleBrands: brands,
      };

      let filter = getAllFilters(
        graphConditionConfig,
        panes,
        index,
        section_index,
        widget_index,
        brandlogicalgroup,
        metadata?.brand_ids, //logical brand change
        widgetObj
      );

      let obj = {};
      obj.section_index = section_index;
      obj.widget_index = widget_index;
      obj.data = metadata;
      obj.panes = panes;
      obj.paneIndex = index;
      obj.duration = duration;
      obj.global_brands = global_brands;
      obj.filter = filter;
      obj.temporary_words = temporary_words;
      obj.brandlogicalgroup = brandlogicalgroup;
      obj.brands = brands;
      obj.graphConditionConfig = graphConditionConfig;
      obj.authParams = authParams;
      obj.exclude_words = exclude_words;
      obj.type = "view";
      obj.data_source = metadata?.data_source
        ? metadata?.data_source
        : "mentions";
      let widgetGraphObject = getWidgetGraphObject(obj);
      widgetGraphObject.isNetworkChartV2 =
        widgetGraphObject?.chart?.chart_type === "network-graph-v2"
          ? true
          : false;
      let indexes = {
        pane_index: index,
        section_index: section_index >= 0 ? section_index : null,
        panes: panes,
        widget_index: widget_index,
        widget_id: metadata?.widget_id,
        graph_type: metadata?.graph_type,
        section_id: shareTemplateData
          ? section_index >= 0
            ? shareTemplateData?.sections?.[section_index]?.section_id
            : shareTemplateData?.section?.[0]?.section_id
          : footerValue?.template
          ? section_index >= 0
            ? Section?.[section_index]?.id
            : Section?.[0]?.id
          : section_index >= 0
          ? panes?.[index]?.sections?.[section_index]?.section_id
          : panes?.[index]?.section?.[0]?.section_id,
        template_details: templateDetails,
      };
      if (authParams?.category_id && brands) {
        widgetGraphObject?.graph_type === "aggregate"
          ? dispatch(
              setAggregateData(
                widgetGraphObject,
                indexes //widget data
              )
            )
          : widgetGraphObject?.primary
          ? dispatch(
              setGraphData(
                widgetGraphObject,
                indexes //widget data
              )
            )
          : graphConditionConfig?.[`data-source`]?.includes(
              widgetGraphObject?.data_source
            )
          ? dispatch(
              setPageChart(
                authParams,
                widgetGraphObject,
                indexes
                // updateFilter
              )
            )
          : (widgetGraphObject?.x_axis ||
              widgetGraphObject?.y_series ||
              widgetGraphObject?.chart) &&
            dispatch(
              setWidgetMakerGraphData(
                authParams,
                widgetGraphObject,
                indexes
                // updateFilter
              )
            );
      }

      let sectionObj = {
        panes: panes,
        index: index,
        section_index: section_index >= 0 ? section_index : null,

        widget_index: widget_index,

        singleBrands: brands,
      };
      metadata.temp_exclude_words = exclude_words;
      // dispatch(
      //   setWidgetData(
      //     metadata,
      //     index,
      //     panes,
      //     section_index >= 0 ? section_index : null,
      //     keywordData?.section_id, //section id for only widgets
      //     sectionObj,
      //     brands
      //   )
      // );
    }
  };

  useEffect(() => {
    if (highChartDeepDive?.flag && id === highChartDeepDive?.id) {
      dispatch(setHighChartDeepDive({ data: null, flag: false, id: null }));

      handleOnClickDeepDive(
        highChartDeepDive?.data,
        section_index,
        widget_index,
        single
      );
    }
  }, [highChartDeepDive]);
  useEffect(() => {
    if (highChartRightClick?.flag && id === highChartRightClick?.id) {
      dispatch(setHighChartRightClick({ data: null, flag: false, id: null }));
    }
  }, [highChartRightClick]);
  //fix tab switch rendering time dynamic set to 0
  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoad(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  let newsDeepDiveStatus = dashboardDeepDiveLevel === 1 ? true : false;

  const isDeepDive = newsDeepDiveStatus
    ? newsDeepDiveStatus
    : authParams?.screen_id
    ? !screen?.isDeepDive
    : shareableLinkDeepDiveStatus
    ? !shareTemplateData?.isDeepDive
    : !panes?.[getPaneIndex(panes, activeKey)].isDeepDive;
  const clickcondition = newsDeepDiveStatus
    ? newsDeepDiveStatus
    : (((panes?.[getPaneIndex(panes, activeKey)]?.predefined &&
        panes?.[getPaneIndex(panes, activeKey)]?.template_type !== "ticket") ||
        (!panes?.[getPaneIndex(panes, activeKey)]?.predefined &&
          panes?.[getPaneIndex(panes, activeKey)]?.isDashboard) ||
        shareableLinkDeepDiveStatus ||
        (authParams?.screen_id &&
          metadata?.chart?.chart_settings?.allow_deepdive)) &&
        !panes?.[index]?.is_widget_maker_open_obj?.open_flag &&
        (window?.location?.pathname === "/dashboard" ||
          window?.location?.pathname === "/pin-dashboard" ||
          shareableLinkDeepDiveStatus ||
          (authParams?.screen_id &&
            (metadata?.chart?.chart_settings?.allow_deepdive ||
              metadata?.widget_id === "000-100-956"))) &&
        !AiInsights &&
        !dashboardTrendsFlag &&
        isDeepDive) ||
      type === "network-graph";

  const rightClickCondition =
    !PdfDownloadStatus &&
    isDeepDive &&
    (window?.location?.pathname === "/dashboard" ||
      window.location.pathname === "/pin-dashboard" ||
      authParams?.screen_id) &&
    !AiInsights &&
    !dashboardTrendsFlag;
  // to hide remove word modal of wordcloud
  const handleEmptyClick = (e) => {
    if (refTooltip?.current && !refTooltip.current.contains(e.target)) {
      setxPosition(0);
      setyPosition(0);
    }
  };
  if (!load)
    return (
      <div
        className="d-flex align-items-center"
        style={{
          justifyContent: "space-evenly",
          height: authParams?.screen_id ? "100%" : "450px",
        }}
      >
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  else
    return (
      <>
        <div
          className={`resize__chart--window ${
            PdfDownloadStatus ? "p-10" : "p-15"
          }`}
          id={id}
          onClick={(e) => handleEmptyClick(e)}
          //onClick={() => copyData(opData[id])}
        >
          {opData?.[id] && (
            <HighChartrender
              id={id}
              opData={opData?.[id]}
              clickcondition={clickcondition}
              rightClickCondition={rightClickCondition}
              dashboard={dashboard}
              pptDownloadStatus={isPPTModalOpen ? isPPTModalOpen : false}
              pdfDownloadStatus={PdfDownloadStatus}
              single={single}
              type={type}
            />
          )}
        </div>
        {opData?.[id]?.customLegend ? (
          <div className="d-flex w-100 justify-content-center flex-wrap mt-15 transform__capitalize">
            {single?.[0]?.legends?.map((el, index) => {
              return (
                <div key={index}>
                  <span
                    className="d-flex mr-10 font-weight500 text-Darkgray font-Size12 flex-wrap align-items-center"
                    key={`${el}_${index}`}
                  >
                    <span
                      style={{
                        backgroundColor: single?.[0]?.legend_colors?.[index],
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                      }}
                      className="d-inline-block mr-10"
                    />
                    {el}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {opData && opData[id] && opData[id]?.wordCloudLegend ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              textTransform: "capitalize",
              margin: "15px",
              marginRight: "0px",
            }}
          >
            {single.map((el, index) => {
              return (
                <span
                  key={index}
                  style={{
                    color: "#444",
                    fontSize: "small",
                    fontFamily: "Roboto Slab",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: el.color,
                      width: "12px",
                      height: "12px",
                      display: "inline-block",
                      marginRight: "10px",
                    }}
                  ></span>
                  {el.name}
                </span>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </>
    );
};

export default HighCharts;
