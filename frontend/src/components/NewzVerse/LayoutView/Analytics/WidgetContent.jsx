import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import NoGraphData from "./NoGraphData";
import GraphList from "./GraphList";
// import CardList from "./CardList";

const WidgetContent = ({
  metaWidgetConfig,
  metaWidgetGraphData,
  metaWidgetKpiData,
  id,
  previewCardBoxStyle,
  previewCardBoxStyleWithKPI,
  widgetContainerStyle,
  refWidth,
  preview,
  dashboard,
  span_data,
  widget_index,
  section_index,
  isPreviewState,
  isdownload,
  noteExist,
  insightsExist,
  template_widget,
  AiInsights,
  widgetDiscriptionExist,
  widgetDiscription,
  widget,
  updatedSidePostData,
  updatedCoordinatesData,
  isAnimatedCardWidget,
}) => {
  const dispatch = useDispatch();
  const allAttributes = useSelector(
    (state) => state?.attributes?.allAttributes
  );
  const All_WM_attributes = useSelector(
    (state) => state?.WidgetMaker?.All_WM_attributes
  );
  const screenSettings = useSelector(
    (state) => state?.Screens?.screen?.settings
  );
  let attribute = allAttributes ? allAttributes : All_WM_attributes;

  const showCountCards = metaWidgetConfig
    ? metaWidgetConfig?.chart?.chart_settings?.show_count_cards
    : false;
  let count = 0;

  const cardPosition = metaWidgetConfig
    ? metaWidgetConfig?.chart?.chart_settings?.card_position
      ? metaWidgetConfig?.chart?.chart_settings?.card_position
      : "Top"
    : "Top";

  const getCalculatedChartStyle = () => {
    let style = widgetContainerStyle?.height
      ? { ...widgetContainerStyle, height: widgetContainerStyle?.height }
      : {
          width: "100%",
          height: "450",
        };
    let calculatedHeight = Number(style.height);
    // This is used for except command_center_screen
    //calculatedHeight = 685;
    // if filter pills exists
    if (
      metaWidgetGraphData &&
      metaWidgetConfig?.chart?.chart_type === "wordcloud" &&
      metaWidgetGraphData?.[0]?.["filter-pills"]?.length > 0
    ) {
      let len_kpi =
        metaWidgetGraphData?.[0]?.["filter-pills"]?.length > 5
          ? 5
          : metaWidgetGraphData?.[0]?.["filter-pills"]?.length;
      calculatedHeight = calculatedHeight - Math.ceil(len_kpi / 5) * 65;
      // for header
      calculatedHeight = calculatedHeight - 34;
    }
    // 185 px for widget note
    if (
      (metaWidgetConfig?.note && metaWidgetConfig?.note?.length > 0) ||
      noteExist
    ) {
      calculatedHeight -= 185;
    }
    // 20 px for widget discription
    if (widgetDiscriptionExist) {
      calculatedHeight -= widgetDiscription?.length > 130 ? 40 : 20;
    }
    // 135 px for widget insights
    if (insightsExist) {
      calculatedHeight -= 135;
    }
    if (
      (cardPosition == "Top" ||
        cardPosition == "Bottom" ||
        ((cardPosition === "Left" || cardPosition === "Right") &&
          metaWidgetConfig?.chart?.chart_settings?.split_cards)) &&
      !metaWidgetConfig?.explode
    ) {
      //split case
      if (metaWidgetKpiData?.kpi?.[0]?.data) {
        if (metaWidgetKpiData?.kpi?.length > 0) {
          let totalNumberOfLine = 0;
          metaWidgetKpiData?.kpi?.forEach(
            (k) =>
              (totalNumberOfLine += k?.data?.length
                ? Math?.ceil(k?.data?.length / 5)
                : 0)
          );
          calculatedHeight =
            calculatedHeight -
            (Number(metaWidgetKpiData?.kpi?.length * 34) +
              (metaWidgetConfig?.chart?.chart_settings?.duration_comparison
                ? Number(totalNumberOfLine * 85)
                : Number(totalNumberOfLine * 85)));
        }
      } else if (metaWidgetKpiData?.kpi?.length > 0) {
        let len_kpi =
          metaWidgetKpiData?.kpi?.length > 15
            ? 15
            : metaWidgetKpiData?.kpi?.length;

        calculatedHeight =
          calculatedHeight -
          (metaWidgetConfig?.chart?.chart_settings?.duration_comparison
            ? Math.ceil(len_kpi / 5) * 85
            : Math.ceil(len_kpi / 5) * 85);
      }
    }
    style.height = calculatedHeight?.toString();
    return style;
  };
  // const chart__styles = getCalculatedChartStyle();
  const chart__styles = {
    width: "100%",
    height: "450",
  };

  const chart__styles_old = widgetContainerStyle?.height
    ? { ...widgetContainerStyle, height: widgetContainerStyle?.height + "px" }
    : {
        width: "100%",
        height: "450",
      };

  // console.log("screenSettings", screenSettings);
  return (
    <>
      <div className="portlet__body h-100">
        <div
          style={{ zIndex: "0" }}
          className={`${isdownload ? (noteExist ? "p-0" : "p-0 ") : "h-100"}`}
        >
          {!metaWidgetGraphData ? (
            <>
              <div className="loader text-center w-100 h-100">
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {metaWidgetGraphData &&
              typeof metaWidgetGraphData !== "string" ? (
                <>
                  {!metaWidgetConfig?.render_kpi_only ? (
                    <ErrorBoundary>
                      {" "}
                      <GraphList
                        widget={widget}
                        widgetMakerGraphData={metaWidgetGraphData}
                        metaWidgetConfig={metaWidgetConfig}
                        widget_index={widget_index}
                        section_index={section_index}
                        cardPosition={
                          cardPosition === "Left" ? "Top" : cardPosition
                        }
                        single={
                          metaWidgetConfig?.chart?.chart_type ===
                            "combination" ||
                          metaWidgetConfig?.chart?.chart_type === "grid" ||
                          metaWidgetConfig?.chart?.chart_type === "pivot-grid"
                            ? metaWidgetGraphData[0]?.data
                              ? metaWidgetGraphData[0]?.data
                              : metaWidgetGraphData
                            : metaWidgetGraphData[0]?.data
                            ? metaWidgetGraphData[0]?.data
                            : metaWidgetGraphData
                        }
                        networkLinkLength={
                          metaWidgetGraphData[0]?.link_length
                            ? metaWidgetGraphData[0]?.link_length
                            : metaWidgetGraphData?.link_length
                        }
                        metadata={metaWidgetConfig}
                        style={chart__styles}
                        desc={
                          metaWidgetGraphData
                            ? metaWidgetGraphData[0]?.description
                            : ""
                        }
                        log={
                          metaWidgetGraphData
                            ? metaWidgetGraphData[0]?.log
                            : false
                        }
                        scaleFromZeroToOne={
                          metaWidgetGraphData
                            ? metaWidgetGraphData[0]?.scale_from_0_to_1
                            : false
                        }
                        xaxis={
                          metaWidgetConfig
                            ? metaWidgetConfig?.x_axis?.trace_name
                              ? metaWidgetConfig?.x_axis?.trace_name
                              : attribute?.[metaWidgetConfig?.x_axis?.attribute]
                            : ""
                        }
                        yaxis={
                          metaWidgetConfig
                            ? metaWidgetConfig?.y_series &&
                              metaWidgetConfig?.y_series[0]?.trace_name
                              ? metaWidgetConfig?.y_series[0]?.trace_name
                              : metaWidgetConfig?.y_series &&
                                attribute?.[
                                  metaWidgetConfig?.y_series?.[0]?.attribute
                                ]
                            : ""
                        }
                        y_series2={
                          metaWidgetConfig
                            ? metaWidgetConfig?.y_series &&
                              attribute?.[
                                metaWidgetConfig?.y_series?.[1]?.attribute
                              ]
                            : ""
                        }
                        type={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_type
                            : ""
                        }
                        stacked={
                          metaWidgetGraphData
                            ? metaWidgetGraphData[0]?.stacked
                            : false
                        }
                        legend_position={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.chart_property?.legend_position
                            : "Bottom"
                        }
                        chartGlobalDataLabel={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.show_data_labels
                            : false
                        }
                        chartAxisLabel={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.show_label_names
                            : false
                        }
                        chartDataLabelInPercent={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.chart_percent
                            : false
                        }
                        chartGradientColor={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.gradient_color
                            : false
                        }
                        chartGlobalDataStacked={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.is_stacked
                            : false
                        }
                        chartMarkers={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.show_marker
                            : false
                        }
                        yAxisChartType={
                          metaWidgetConfig?.chart?.chart_settings
                            ?.y_axes_settings &&
                          metaWidgetConfig?.chart?.chart_settings
                            ?.y_axes_settings[0]?.show_as
                        }
                        yAxisScale={
                          metaWidgetConfig?.chart?.chart_settings
                            ?.y_axes_settings
                        }
                        yAxisMode={
                          metaWidgetConfig?.chart?.chart_settings
                            ?.chart_property?.y_axis_mode
                        }
                        id={id}
                        widgetShareOfData={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.card_percent
                            : false
                        }
                        widgetDurationComparison={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.duration_comparison
                            : false
                        }
                        widgetDurationComparisonForChart={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.show_previous_duration_comparison
                            : false
                        }
                        widgetDurationDataForChart={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.show_previous_duration_data
                            : false
                        }
                        isGridDeepDiveEnabled={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.is_deepdive
                            : false
                        }
                        gridDeepDiveOn={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.deepdive_on
                            : []
                        }
                        hideColumns={
                          metaWidgetConfig
                            ? metaWidgetConfig?.chart?.chart_settings
                                ?.hide_columns
                            : []
                        }
                        isShowCardDetails={
                          typeof metaWidgetConfig?.is_showdetails === "boolean"
                            ? metaWidgetConfig?.is_showdetails
                            : true
                        }
                        refWidth={refWidth}
                        preview={preview}
                        dashboard={dashboard}
                        span_data={span_data}
                        metaDataCheck={metaWidgetConfig ? true : false}
                        isPreviewState={isPreviewState}
                        isdownload={isdownload}
                        metaWidgetKpiData={metaWidgetKpiData}
                        noteExist={noteExist}
                        insightsExist={insightsExist}
                        template_widget={template_widget}
                        AiInsights={AiInsights}
                        widgetDiscription={widgetDiscription}
                        widgetContainerHeight={widgetContainerStyle?.height}
                        fontFamily={screenSettings?.font_family}
                        updatedSidePostData={updatedSidePostData}
                        updatedCoordinatesData={updatedCoordinatesData}
                        count={count}
                        isAnimatedCardWidget={isAnimatedCardWidget}
                      />
                    </ErrorBoundary>
                  ) : (
                    ""
                  )}
                </>
              ) : typeof metaWidgetGraphData === "string" ? (
                <>
                  <div className="portlet__body h-100 p-15">
                    <ErrorBoundary>
                      <NoGraphData
                        isPreviewState={isPreviewState}
                        errorCode="No Data Found"
                        isCommandCenterScreen={true}
                      />
                    </ErrorBoundary>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WidgetContent;
