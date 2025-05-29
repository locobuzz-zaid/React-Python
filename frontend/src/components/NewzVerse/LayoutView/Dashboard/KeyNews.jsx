import React, { useState } from "react";
import { Row, Col, Typography, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardDeepDiveLevel,
  setDashboardsData,
} from "../../../../redux/actions/NewzVerse/NewzVerse";
import { LoadingOutlined } from "@ant-design/icons";
import ErrorBoundary from "../Analytics/ErrorBoundary";
import NoGraphData from "../Analytics/NoGraphData";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardDataAPI,
} from "../../../../redux/actions/NewzVerse/NewzVerseAPI";
import NewsItem from "../../Utils/NewsItem";
import HighVelocityNews from "../../Utils/HighVelocityNews";
import { getDashboardGlobalBrands } from "../../../../redux/constants/NewzVerseConst";

const { Title, Link } = Typography;

export const KeyNews = () => {
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
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );

  let p_token = localStorage.getItem("p_token");

  const [isHovered, setIsHovered] = useState({
    flag: false,
    index: null,
  });
  const [isHoveredHighVelocity, setIsHoveredHighVelocity] = useState({
    flag: false,
    index: null,
  });

  const handleKeyNewsViewAll = (level, theme_name) => {
    let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
      if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
        dashboard.selected_theme_data = {
          theme_id: 0,
          theme_name: theme_name,
          icon: null,
          color_gradient: null,
          secondary_color_code: null,
        };
      }
      return dashboard;
    });
    dispatch(setDashboardsData(updatedDashboardsData));

    dispatch(setDashboardDeepDiveLevel(level));

    if (theme_name === "All Key News") {
      let global_brands = getDashboardGlobalBrands(
        dashboardsData,
        dashboardBrandsList,
        dashboardActiveKey
      );

      let templateFetchPayloadObj = {
        p_token: p_token ? p_token : null,
        dashboard_type: dashboardActiveKey + 1,
        deep_dive_level: "2",
        dashboardsData: dashboardsData,
        start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
        end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
        brand_list: global_brands,
        dashboard_filters: [
          ...dashboardsData?.[dashboardActiveKey]?.applied_dashboard_filters,
          { attribute: "theme_id", values: [] },
        ],
      };
      dispatch(getDashboardAnalyticsTemplateFetchAPI(templateFetchPayloadObj));

      let payloadObj = {
        p_token: p_token ? p_token : null,
        brand_list: global_brands,
        start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
        end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
        filters: [],
        widget_id: "2.1",
        dashboard_type: dashboardActiveKey + 1,
        dashboardsData: dashboardsData,
        dashboard_filters: [
          ...dashboardsData?.[dashboardActiveKey]?.applied_dashboard_filters,
          { attribute: "theme_id", values: [] },
        ],
        offset: 0,
        rows: 10,
      };

      dispatch(getDashboardDataAPI(payloadObj));
    }
  };

  const handleHighVelocityViewAll = (level) => {
    dispatch(setDashboardDeepDiveLevel(5));

    let widgets_list = ["1.2"];
    let global_brands = getDashboardGlobalBrands(
      dashboardsData,
      dashboardBrandsList,
      dashboardActiveKey
    );

    widgets_list?.map((widget_id) => {
      let payloadObj = {
        p_token: p_token ? p_token : null,
        brand_list: global_brands,
        start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
        end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
        filters: [],
        widget_id: widget_id,
        dashboard_type: dashboardActiveKey + 1,
        dashboardsData: dashboardsData,
        offset: 0,
        rows: 10,
      };
      dispatch(getDashboardDataAPI(payloadObj));
    });
  };

  // console.log(
  //   "Key News =>",
  //   dashboardsData?.[dashboardActiveKey]?.high_velocity_news
  // );
  return (
    <Row
      gutter={16}
      style={{
        marginLeft: "-15px",
        marginRight: "-15px",
      }}
    >
      <Col
        span={12}
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
          <Col>
            <Title
              level={4}
              className="analytics-text-heading"
              style={{ marginBottom: 0 }}
            >
              Key Events
            </Title>
          </Col>
          <Col>
            {dashboardsData?.[dashboardActiveKey]?.key_news !==
              "No data available" &&
            dashboardsData?.[dashboardActiveKey]?.key_news?.length ? (
              <span
                onClick={() => handleKeyNewsViewAll(2, "All Key News")}
                style={{
                  fontSize: 14,
                  color: "#1890ff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                View All
              </span>
            ) : (
              ""
            )}
          </Col>
        </Row>

        <div
          className="custom_scrollbar"
          id="style-1"
          style={{
            height: "500px",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {typeof dashboardsData?.[dashboardActiveKey]?.key_news ===
          "string" ? (
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
          ) : dashboardsData?.[dashboardActiveKey]?.key_news?.length === 0 ? (
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
            dashboardsData?.[dashboardActiveKey]?.key_news?.map(
              (item, index) => (
                <NewsItem
                  key={index}
                  {...item}
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                  index={index}
                />
              )
            )
          )}
        </div>
      </Col>
      <Col
        span={12}
        style={{
          paddingLeft: "0px",
          paddingRight: "0px",
          borderLeft: "1px solid #edf2f6",
        }}
      >
        <Row
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            marginBottom: 8,
          }}
          justify="space-between"
          align="middle"
        >
          <Col>
            <Title
              level={4}
              className="analytics-text-heading"
              style={{ marginBottom: 0 }}
            >
              High Velocity News
            </Title>
          </Col>
          <Col>
            {dashboardsData?.[dashboardActiveKey]?.high_velocity_news !==
              "No data available" &&
            dashboardsData?.[dashboardActiveKey]?.high_velocity_news?.length ? (
              <span
                onClick={() => handleHighVelocityViewAll(2, "All Key News")}
                style={{
                  fontSize: 14,
                  color: "#1890ff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                View All
              </span>
            ) : (
              ""
            )}
          </Col>
        </Row>

        <div
          className="custom_scrollbar"
          id="style-1"
          style={{ height: "500px", overflowY: "auto", scrollbarWidth: "none" }}
        >
          {typeof dashboardsData?.[dashboardActiveKey]?.high_velocity_news ===
          "string" ? (
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
          ) : dashboardsData?.[dashboardActiveKey]?.high_velocity_news
              ?.length === 0 ? (
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
              {dashboardsData?.[dashboardActiveKey]?.high_velocity_news?.map(
                (post, index) => (
                  <HighVelocityNews
                    key={index}
                    {...post}
                    isHoveredHighVelocity={isHoveredHighVelocity}
                    setIsHoveredHighVelocity={setIsHoveredHighVelocity}
                    index={index}
                  />
                )
              )}
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};
