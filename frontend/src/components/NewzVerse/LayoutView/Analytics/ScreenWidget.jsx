import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetHeader from "./WidgetHeader";
import { useRef } from "react";
import WidgetContent from "./WidgetContent";
import NoGraphData from "./NoGraphData";
import ErrorBoundary from "./ErrorBoundary";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const ScreenWidget = ({
  propsId,
  data,
  widget,
  section_id,
  widget_index,
  section_index,
  sections,
  widget_id,
  nextWidgetdata,
  prevWidgetdata,
  isInSlider,
  isTagCloudSingleWidget,
  isHeaderDisabled,
  updatedSidePostData,
  updatedCoordinatesData,
  isAnimatedCardWidget,
}) => {
  let graphData = widget?.graphData
    ? widget?.graphData
    : widget?.persist_graphdata;
  // console.log("graphData", graphData);

  const dispatch = useDispatch();
  const authParams = useSelector((state) => state.Authentication.authParams);
  const headerRef = useRef(null);
  const [refUpdated, setRefUpdated] = useState(false);

  // callback function got called when reference of slider is loaded
  const measuredHeaderRef = useCallback((node) => {
    if (node !== null) {
      headerRef.current = node;
      setRefUpdated(!refUpdated);
    }
  }, []);
  // widget container ref
  const widgetContainerRef = useRef(null);
  // callback function got called when reference of widgetContainer is loaded
  const measuredWidgetContainerRef = useCallback((node) => {
    if (node !== null) {
      widgetContainerRef.current = node;
      setRefUpdated(!refUpdated);
    }
  }, []);
  const [widgetContainerStyle, setWidgetContainerStyle] = useState(
    widgetContainerRef?.current
      ? {
          width: "100%",
          height:
            widgetContainerRef?.current?.offsetHeight &&
            widgetContainerRef?.current?.offsetHeight -
              (["network-graph", "network-graph-v2"]?.includes(
                graphData?.graph_type
                  ? graphData?.graph_type
                  : widget?.chart?.chart_type
              ) || ["000-100-995"]?.includes(widget_id || widget?.widget_id)
                ? 0
                : 33),
        }
      : null
  );

  const updateSize = () => {
    if (widgetContainerRef?.current) {
      setWidgetContainerStyle({
        width: "100%",
        height:
          widgetContainerRef?.current?.offsetHeight &&
          widgetContainerRef?.current?.offsetHeight -
            (["network-graph", "network-graph-v2"]?.includes(
              graphData?.graph_type
                ? graphData?.graph_type
                : widget?.chart?.chart_type
            ) || ["000-100-995"]?.includes(widget_id || widget?.widget_id)
              ? 0
              : 33),
      });
    }
  };
  useEffect(() => {
    updateSize();
  }, [
    headerRef?.current,
    headerRef?.current?.clientHeight,
    widgetContainerRef?.current,
    widgetContainerRef?.current?.clientHeight,
    widgetContainerRef?.current?.offsetHeight,
    refUpdated,
  ]);
  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      {graphData && typeof graphData !== "string" ? (
        <>
          <div
            className={` h-100 ${
              (graphData?.graph_type
                ? graphData?.graph_type
                : widget?.chart?.chart_type) === "grid"
                ? "grid"
                : ""
            } portlet p-0 m-0 ${
              isInSlider ? "slider-widget-mr-15 mr-15" : "w-100"
            } border-radius-4 ${
              isTagCloudSingleWidget ||
              window.location.pathname?.split("/")?.[3] === "000-000-555"
                ? "content__backgraoud--transparent"
                : ""
            }`}
            id={widget_id + "#" + section_id + "#" + widget_index}
            style={{
              height: "calc(100% -0px) !importent",
            }}
          >
            <div
              ref={measuredHeaderRef}
              id={widget_id + "#" + section_id + "#" + widget_index}
            >
              {isTagCloudSingleWidget || isHeaderDisabled ? (
                ""
              ) : (
                <WidgetHeader
                  filterPills={
                    authParams?.screen_id === "000-000-556" &&
                    widget?.widget_id === "000-100-965" &&
                    widget?.graphData?.data?.[`custom-card`]?.[0]?.[
                      "filter-pills"
                    ]
                      ? widget?.graphData?.data?.[`custom-card`]?.[0]?.[
                          "filter-pills"
                        ]
                      : null
                  }
                  widget_name={
                    widget?.widget_name
                      ? widget?.widget_name
                      : graphData?.widget_name
                  }
                  widget_description={
                    widget?.widget_description
                      ? widget?.widget_description
                      : graphData?.widget_description
                  }
                  section_id={section_id}
                  widget_id={widget?.widget_id ? widget?.widget_id : widget?.id}
                  widget_index={widget_index}
                  section_index={section_index}
                  graph_type={graphData?.graph_type}
                  widget={graphData}
                  template_widget={
                    widget?.graphData || widget?.persist_graphdata
                      ? false
                      : true
                  }
                  dashboard={
                    widget?.graphData || widget?.persist_graphdata
                      ? true
                      : false
                  }
                  widHeaderLoader={false}
                  widgetData={widget}
                  chart_type={
                    graphData?.graph_type
                      ? graphData?.graph_type
                      : widget?.chart?.chart_type
                  }
                  isAnimatedCardWidget={isAnimatedCardWidget}
                />
              )}
            </div>
            <div
              className="portlet border-0 box-shadow-none cards_content "
              style={{
                height:
                  "calc(100% - " +
                  (headerRef?.current?.clientHeight
                    ? headerRef?.current?.clientHeight
                    : 0) +
                  "px)",
              }}
              ref={measuredWidgetContainerRef}
            >
              <WidgetContent
                metaWidgetConfig={widget}
                widget_index={widget_index}
                section_index={section_index}
                metaWidgetGraphData={
                  graphData?.data?.[
                    widget?.chart?.chart_type === "horizontal-bar"
                      ? "bar"
                      : widget?.chart?.chart_type
                  ]
                }
                metaWidgetKpiData={graphData?.data}
                id={
                  section_index > 0
                    ? widget?.widget_id + section_index + widget_index
                    : widget?.widget_id + 0 + widget_index
                }
                widgetContainerStyle={widgetContainerStyle}
                widget={widget}
                updatedSidePostData={updatedSidePostData}
                updatedCoordinatesData={updatedCoordinatesData}
                isAnimatedCardWidget={isAnimatedCardWidget}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* When Graph Data is not get, Loader and header is showing case */}
          <div
            className={` h-100 portlet p-0 m-0 ${
              isInSlider ? "slider-widget-mr-15 mr-15" : "w-100"
            } border-radius-4`}
            id={widget_id + "#" + section_id + "#" + widget_index}
            style={{ height: "calc(100% -0px) !importent" }}
          >
            <div
              ref={measuredHeaderRef}
              id={widget_id + "#" + section_id + "#" + widget_index}
            >
              {isTagCloudSingleWidget || isHeaderDisabled ? (
                ""
              ) : (
                <WidgetHeader
                  widget_name={
                    widget?.widget_name
                      ? widget?.widget_name
                      : graphData?.widget_name
                  }
                  widget_description={
                    widget?.widget_description
                      ? widget?.widget_description
                      : graphData?.widget_description
                  }
                  section_id={section_id}
                  widget_id={widget?.widget_id ? widget?.widget_id : widget?.id}
                  widget_index={widget_index}
                  section_index={section_index}
                  graph_type={graphData?.graph_type}
                  widget={graphData}
                  template_widget={
                    widget?.graphData || widget?.persist_graphdata
                      ? false
                      : true
                  }
                  dashboard={
                    widget?.graphData || widget?.persist_graphdata
                      ? true
                      : false
                  }
                  widHeaderLoader={true}
                  widgetData={widget}
                  chart_type={
                    graphData?.graph_type
                      ? graphData?.graph_type
                      : widget?.chart?.chart_type
                  }
                  isAnimatedCardWidget={isAnimatedCardWidget}
                />
              )}
            </div>
            <div
              className="portlet border-0 box-shadow-none "
              style={{
                height:
                  "calc(100% - " +
                  (headerRef?.current?.clientHeight
                    ? headerRef?.current?.clientHeight
                    : 0) +
                  "px)",
              }}
              ref={measuredWidgetContainerRef}
            >
              {typeof graphData === "string" ? (
                <>
                  <div className="portlet__body " style={{ height: "450px" }}>
                    <ErrorBoundary>
                      <NoGraphData
                        errorCode="No Data Found"
                        isCommandCenterScreen={true}
                      />
                    </ErrorBoundary>
                  </div>
                </>
              ) : (
                <div
                  className="d-flex align-items-center"
                  style={{
                    justifyContent: "space-evenly",
                    height: "400px",
                  }}
                >
                  <Spin
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 48,
                        }}
                        spin
                      />
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ScreenWidget;
