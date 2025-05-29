import React from "react";
import { Card, Typography, Space, Spin, Skeleton } from "antd";
import { RightOutlined } from "@ant-design/icons";
import "./ThemeCards.css";
import "./Hover.scss";
import {
  setDashboardDeepDiveLevel,
  setDashboardsData,
} from "../../../../redux/actions/NewzVerse/NewzVerse";
import { useDispatch, useSelector } from "react-redux";
import FraudsAndBreaches from "../../../../assets/Dashboard/Themes/Frauds & Breaches.svg";
import KeyPeople from "../../../../assets/Dashboard/Themes/Key People.svg";
import MergersAndAcquisitions from "../../../../assets/Dashboard/Themes/Mergers & Acquisitions.svg";
import FinanceAndInvestments from "../../../../assets/Dashboard/Themes/Finance & Investments.svg";
import ShareMarketDynamics from "../../../../assets/Dashboard/Themes/Share Market Dynamics.svg";
import NewProductsAndServices from "../../../../assets/Dashboard/Themes/New Products & Services.svg";
import WorkforceAndHR from "../../../../assets/Dashboard/Themes/Workforce & HR.svg";
import CorporateSocialResponsibility from "../../../../assets/Dashboard/Themes/Corporate Social Responsibility (CSR).svg";
import SustainabilityAndESG from "../../../../assets/Dashboard/Themes/Sustainability & ESG.svg";
import { LoadingOutlined } from "@ant-design/icons";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardDataAPI,
} from "../../../../redux/actions/NewzVerse/NewzVerseAPI";
import tinycolor from "tinycolor2";
import ErrorBoundary from "../Analytics/ErrorBoundary";
import NoGraphData from "../Analytics/NoGraphData";
import { getDashboardGlobalBrands } from "../../../../redux/constants/NewzVerseConst";

const { Title, Text } = Typography;

const ThemeCard = ({
  theme_id,
  theme_name,
  icon,
  key_news,
  articles,
  color_gradient,
  index,
  secondary_color_code,
}) => {
  const dispatch = useDispatch();
  const dashboardDeepDiveLevel = useSelector(
    (state) => state?.NewzVerse?.dashboard_deep_dive_level
  );
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );

  let p_token = localStorage.getItem("p_token");

  const handleDeepDiveLevel = (
    level,
    theme_name,
    theme_id,
    secondary_color_code,
    color_gradient
  ) => {
    let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
      if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
        dashboard.selected_theme_data = {
          theme_id: theme_id,
          theme_name: theme_name,
          icon: null,
          color_gradient: color_gradient,
          secondary_color_code: secondary_color_code,
        };
      }
      return dashboard;
    });
    // console.log("updatedDashboardsData", updatedDashboardsData);
    dispatch(setDashboardsData(updatedDashboardsData));
    dispatch(setDashboardDeepDiveLevel(level));

    if (theme_name) {
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
        dashboard_filters: [{ attribute: "theme_id", values: [theme_id] }],
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
        dashboard_filters: [{ attribute: "theme_id", values: [theme_id] }],
        offset: 0,
        rows: 10,
      };
      dispatch(getDashboardDataAPI(payloadObj));
    }
  };

  // Dynamically generate light & dark variations
  const baseColor = secondary_color_code || "#f0f0f0";
  const lightColor = tinycolor(baseColor).lighten(15).toString();
  const darkColor = tinycolor(baseColor).darken(5).toString();

  return (
    <Card
      // style={{
      //   border: "1px solid #EFEFEF",
      //   cursor: "pointer",
      // }}
      // className={`card-${index + 1} stacked--up`}
      style={{
        border: "1px solid #EFEFEF",
        cursor: "pointer",
        position: "relative",
        backgroundColor: lightColor,
        color: baseColor,
      }}
      className="stacked--up"
      bodyStyle={{ padding: 0 }}
      onClick={() =>
        handleDeepDiveLevel(
          2,
          theme_name,
          theme_id,
          secondary_color_code,
          color_gradient
        )
      }
    >
      {/* pseudo layer styles */}
      <div
        style={{
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: baseColor,
          zIndex: -1,
          borderRadius: "6px",
        }}
      />
      <div
        style={{
          content: "''",
          position: "absolute",
          top: "10px",
          left: "10px",
          right: "10px",
          bottom: "10px",
          backgroundColor: darkColor,
          zIndex: -2,
          borderRadius: "6px",
        }}
      />
      <div className="card-content" style={{ background: color_gradient }}>
        <img
          src={
            theme_name === "Frauds & Breaches"
              ? FraudsAndBreaches
              : theme_name === "Key People"
              ? KeyPeople
              : theme_name === "Mergers & Acquisitions"
              ? MergersAndAcquisitions
              : theme_name === "Finance & Investments"
              ? FinanceAndInvestments
              : theme_name === "Share Market Dynamics"
              ? ShareMarketDynamics
              : theme_name === "Tech & Innovations"
              ? "https://c.animaapp.com/lkteUTfH/img/clip-path-group@2x.png"
              : theme_name === "New Products & Services"
              ? NewProductsAndServices
              : theme_name === "Workforce & HR"
              ? WorkforceAndHR
              : theme_name === "Corporate Social Responsibility (CSR)"
              ? CorporateSocialResponsibility
              : theme_name === "Sustainability & ESG"
              ? SustainabilityAndESG
              : FraudsAndBreaches
          }
          alt={theme_name}
          className="theme-icon"
        />
        <Title level={5} className="theme-title">
          {theme_name}
        </Title>
      </div>
      <div className="card-footer">
        <Space>
          <Text className="card-footer-key">
            <b style={{ color: "#434653" }}>{key_news}</b> Events
          </Text>
          <Text type="secondary">•</Text>
          <Text className="card-footer-articles">
            <b style={{ color: "#434653" }}>{articles}</b> Articles
          </Text>
        </Space>
        <RightOutlined style={{ color: "#434653", fontSize: "12px" }} />
      </div>
    </Card>
  );
};

const ThemeCards = () => {
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  let SkeletonLoaderCount = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  let data = true;

  // console.log("Themes", dashboardsData?.[dashboardActiveKey]?.themes_list);
  return (
    <div className="theme-cards-container">
      <h4 className="analytics-text-heading">Know what’s happening with..</h4>
      <div className="theme-cards-scroll">
        {typeof dashboardsData?.[dashboardActiveKey]?.themes_list ===
        "string" ? (
          <>
            <div
              className="portlet__body "
              style={{
                height: "450px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <ErrorBoundary>
                <NoGraphData
                  errorCode="No Data Found"
                  isCommandCenterScreen={true}
                />
              </ErrorBoundary>
            </div>
          </>
        ) : dashboardsData?.[dashboardActiveKey]?.themes_list?.length === 0 ? (
          <>
            {SkeletonLoaderCount?.map((d, index) => {
              return (
                <div key={index} className="theme-card-wrapper">
                  <Skeleton.Image
                    active={true}
                    style={{ width: "225px", height: "150px", margin: "10px" }}
                  />
                </div>
              );
            })}
          </>
        ) : (
          dashboardsData?.[dashboardActiveKey]?.themes_list?.map(
            (theme, index) => (
              <div key={index} className="theme-card-wrapper">
                <ThemeCard {...theme} index={index} />
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default ThemeCards;
