import React, { useState } from "react";
import {
  Tabs,
  Row,
  Col,
  Skeleton,
  Button,
  Dropdown,
  Menu,
  Typography,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import HighCharts from "../../../utils/charts/HighCharts";
import ScreenWidget from "./ScreenWidget";
import { LoadingOutlined } from "@ant-design/icons";
import "./Analytics.css";
import CustomKpi from "./CustomKpi";
import ErrorBoundary from "./ErrorBoundary";
import NoGraphData from "./NoGraphData";

const { Title, Link } = Typography;

const Analytics = ({ handleMenuSelect, selectedMenu }) => {
  const dispatch = useDispatch();

  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  const dashboardDeepDiveLevel = useSelector(
    (state) => state?.NewzVerse?.dashboard_deep_dive_level
  );

  const dashboardTemplateLoader = useSelector(
    (state) => state?.NewzVerse?.dashboard_template_loader
  );
  const dashboardSectionLoader = useSelector(
    (state) => state?.NewzVerse?.dashboard_section_loader
  );

  let analyticsData =
    dashboardDeepDiveLevel === 3
      ? dashboardsData?.[dashboardActiveKey]?.analytics_sections_level_3
      : dashboardDeepDiveLevel === 2
      ? dashboardsData?.[dashboardActiveKey]?.analytics_sections_level_2
      : dashboardDeepDiveLevel === 1
      ? dashboardsData?.[dashboardActiveKey]?.analytics_sections_level_1
      : dashboardsData?.[dashboardActiveKey]?.analytics_sections_level_1;

  // console.log("analyticsData =>", analyticsData);
  return (
    <>
      <div
        style={{
          backgroundColor:
            dashboardDeepDiveLevel === 2 || dashboardDeepDiveLevel === 3
              ? ""
              : "#faf6ff",
          margin: "-15px",
        }}
      >
        <div
          style={{
            marginTop: dashboardDeepDiveLevel === 2 ? "" : "-40px",
            marginBottom: "30px",
            padding: "15px",
          }}
        >
          {dashboardDeepDiveLevel === 2 || dashboardDeepDiveLevel === 3 ? (
            ""
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
                marginTop: "5px",
              }}
            >
              <h5
                style={{ paddingLeft: "8px" }}
                className="analytics-text-heading"
              >
                News Analytics
              </h5>
              <h6
                onClick={() => handleMenuSelect("2")}
                style={{
                  float: "right",
                  fontSize: 14,
                  color: "#1890ff",
                  cursor: "pointer",
                  paddingRight: "8px",
                }}
              >
                View All
              </h6>
            </div>
          )}

          {dashboardTemplateLoader || dashboardSectionLoader ? (
            <div
              className="d-flex align-items-center"
              style={{
                justifyContent: "space-evenly",
                height: "450px",
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
          ) : (
            <>
              <div style={{ width: "100%", marginTop: "-10px" }}>
                {typeof dashboardsData?.[dashboardActiveKey]?.kpi_news ===
                "string" ? (
                  <>
                    <div className="portlet__body " style={{ height: "150px" }}>
                      <ErrorBoundary>
                        <NoGraphData
                          errorCode="No Data Found"
                          isCommandCenterScreen={true}
                        />
                      </ErrorBoundary>
                    </div>
                  </>
                ) : dashboardsData?.[dashboardActiveKey]?.kpi_news?.length ===
                  0 ? (
                  <div
                    className="d-flex align-items-center"
                    style={{
                      justifyContent: "space-evenly",
                      height: "150px",
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
                ) : (
                  <>
                    <CustomKpi
                      data={dashboardsData?.[dashboardActiveKey]?.kpi_news}
                      selectedMenu={selectedMenu}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Analytics;
