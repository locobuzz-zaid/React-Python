import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardDeepDiveLevel,
  setDashboardsData,
} from "../../../../redux/actions/NewzVerse/NewzVerse";
import { Layout, Menu, Typography, Row, Col, Select, Spin } from "antd";
import { LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import "./DeepDive2.css";
import { LoadingOutlined } from "@ant-design/icons";
import ErrorBoundary from "../Analytics/ErrorBoundary";
import NoGraphData from "../Analytics/NoGraphData";
import Analytics from "../Analytics/Analytics";
import CustomPagination from "../../Utils/CustomPagination";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardDataAPI,
  getDashboardFiltersAPI,
} from "../../../../redux/actions/NewzVerse/NewzVerseAPI";
import NewsItem from "../../Utils/NewsItem";
import Filters from "../../Utils/Filters";
import CustomBreadcrum from "../../Utils/CustomBreadcrum";

import AllKeyNewsBanner from "../../../../assets/Dashboard/ThemesBanner/All_Key_News_Banner.svg";
import KeyPeopleBanner from "../../../../assets/Dashboard/ThemesBanner/Key_People_Banner.svg";

import FinanceAndInvestmentsBanner from "../../../../assets/Dashboard/ThemesBanner/Finance_&_Investments_Banner.svg";
import MergersAndAcquisitionsBanner from "../../../../assets/Dashboard/ThemesBanner/Mergers_&_Acquisitions_Banner.svg";
import FraundAndBreachBanner from "../../../../assets/Dashboard/ThemesBanner/Fraund_&_Breach_Banner.svg";
import ShareMarketDynamicsBanner from "../../../../assets/Dashboard/ThemesBanner/Share_Market_Dynamics_Banner.svg";
import NewProductsAndServicesBanner from "../../../../assets/Dashboard/ThemesBanner/New_Products_&_Services_Banner.svg";
import TechAndInnovationsBanner from "../../../../assets/Dashboard/ThemesBanner/Tech_&_Innovations_Banner.svg";
import WorkforceAndHRBanner from "../../../../assets/Dashboard/ThemesBanner/Workforce_&_HR_Banner.svg";
import CorporateSocialResponsibilityBanner from "../../../../assets/Dashboard/ThemesBanner/Corporate_Social_Responsibility_(CSR)_Banner.svg";
import SustainaibilityAndESGBanner from "../../../../assets/Dashboard/ThemesBanner/Sustainaibility_&_ESG_Banner.svg";
import { getDashboardGlobalBrands } from "../../../../redux/constants/NewzVerseConst";
import AnalyticsView from "../AnalyticsView";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const DeepDive2 = () => {
  const dispatch = useDispatch();

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

  // console.log("dashboardsData", dashboardsData?.[dashboardActiveKey]);

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    dashboardsData?.[dashboardActiveKey]?.selected_theme_data?.theme_name
      ? dashboardsData?.[dashboardActiveKey]?.selected_theme_data?.theme_name
      : "All Key News"
  );
  const [isHovered, setIsHovered] = useState({
    flag: false,
    index: null,
  });

  // Get Filters API
  useEffect(() => {
    if (dashboardBrandsList?.length) {
      let global_brands = getDashboardGlobalBrands(
        dashboardsData,
        dashboardBrandsList,
        dashboardActiveKey
      );

      let filterPayloadObj = {
        p_token: p_token ? p_token : null,
        brand_list: global_brands,
        start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
        end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
        filters: [],
        widget_id: "2.1",
        dashboard_type: dashboardActiveKey + 1,
        dashboardsData: dashboardsData,
        dashboard_filters: [
          {
            attribute: "theme_id",
            values:
              dashboardsData?.[dashboardActiveKey]?.selected_theme_data
                ?.theme_id === 0
                ? []
                : [
                    dashboardsData[dashboardActiveKey]?.selected_theme_data
                      ?.theme_id,
                  ],
          },
        ],
        offset: 0,
      };
      dispatch(getDashboardFiltersAPI(filterPayloadObj));
    }
  }, [selectedMenuItem]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedMenuItem]);

  const handleDeepDiveLevel = (level) => {
    dispatch(setDashboardDeepDiveLevel(level));
  };

  const themesListWithAllKeyNews = [
    {
      theme_id: 0,
      theme_name: "All Key News",
      secondary_color_code: "#010101",
      primary_color_code: "#F2F2F2",
    },
    ...(dashboardsData?.[dashboardActiveKey]?.themes_list || []),
  ];

  const handleSelectedMenuItem = (key) => {
    const [id, name] = key.split("|");
    setSelectedMenuItem(name);

    if (name) {
      let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
        if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
          dashboard.key_news_list.data = [];
          dashboard.selected_theme_data = {
            theme_id: Number(id),
            theme_name: name,
          };
        }
        return dashboard;
      });
      dispatch(setDashboardsData(updatedDashboardsData));

      let global_brands = getDashboardGlobalBrands(
        dashboardsData,
        dashboardBrandsList,
        dashboardActiveKey
      );

      let theme_id = Number(id);
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
          { attribute: "theme_id", values: theme_id === 0 ? [] : [theme_id] },
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
          { attribute: "theme_id", values: theme_id === 0 ? [] : [theme_id] },
        ],
        offset: 0,
        rows: 10,
      };
      dispatch(getDashboardDataAPI(payloadObj));
    }
  };

  // console.log("Deep Dive 2", dashboardsData?.[dashboardActiveKey]);
  return (
    <div>
      {/* Breadcrum */}
      <CustomBreadcrum />

      {/* content */}
      <Layout
        style={{ minHeight: "100vh", marginTop: "60px", background: "red" }}
      >
        {/* Left Sidebar */}
        <Sider
          width={200}
          theme="light"
          style={{ borderRight: "1px solid #EDF2F6", marginTop: "60px" }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuItem]}
            style={{ height: "100%", borderRight: 0, borderRightColor: "red" }}
            onSelect={({ key }) => {
              handleSelectedMenuItem(key);
            }}
          >
            {themesListWithAllKeyNews?.map((item) => (
              <Menu.Item
                style={{
                  height: "35px",
                  fontWeight:
                    selectedMenuItem === item?.theme_name ? "500" : "",
                  color:
                    selectedMenuItem === item?.theme_name
                      ? item?.secondary_color_code
                      : "",
                  background:
                    selectedMenuItem === item?.theme_name
                      ? item?.primary_color_code
                      : "",
                  borderRight:
                    selectedMenuItem === item?.theme_name
                      ? `3px solid ${item?.secondary_color_code}`
                      : "",
                }}
                key={`${item?.theme_id}|${item?.theme_name}`}
              >
                {item?.theme_name}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout>
          <Content
            style={{
              padding: "24px",
              marginLeft: "200px",
              background: "#fff",
              marginTop: "60px",
            }}
          >
            {/* Head Line */}
            <div style={{ marginTop: "-10px" }}>
              {selectedMenuItem === "All Key News" ? (
                <img style={{ width: "100%" }} src={AllKeyNewsBanner} />
              ) : selectedMenuItem === "Key People" ? (
                <img style={{ width: "100%" }} src={KeyPeopleBanner} />
              ) : selectedMenuItem === "Finance & Investments" ? (
                <img
                  style={{ width: "100%" }}
                  src={FinanceAndInvestmentsBanner}
                />
              ) : selectedMenuItem === "Share Market Dynamics" ? (
                <img
                  style={{ width: "100%" }}
                  src={ShareMarketDynamicsBanner}
                />
              ) : selectedMenuItem === "New Products & Services" ? (
                <img
                  style={{ width: "100%" }}
                  src={NewProductsAndServicesBanner}
                />
              ) : selectedMenuItem === "Tech & Innovations" ? (
                <img style={{ width: "100%" }} src={TechAndInnovationsBanner} />
              ) : selectedMenuItem === "Frauds & Breaches" ? (
                <img style={{ width: "100%" }} src={FraundAndBreachBanner} />
              ) : selectedMenuItem === "Workforce & HR" ? (
                <img style={{ width: "100%" }} src={WorkforceAndHRBanner} />
              ) : selectedMenuItem ===
                "Corporate Social Responsibility (CSR)" ? (
                <img
                  style={{ width: "100%" }}
                  src={CorporateSocialResponsibilityBanner}
                />
              ) : selectedMenuItem === "Mergers & Acquisitions" ? (
                <img
                  style={{ width: "100%" }}
                  src={MergersAndAcquisitionsBanner}
                />
              ) : selectedMenuItem === "Sustainability & ESG" ? (
                <img
                  style={{ width: "100%" }}
                  src={SustainaibilityAndESGBanner}
                />
              ) : (
                ""
              )}
            </div>

            {/* <Analytics /> */}
            <AnalyticsView />

            {/* Filters */}
            <Filters />

            {/* Pagination Component */}
            <CustomPagination />

            {/* Event List */}
            {typeof dashboardsData?.[dashboardActiveKey]?.key_news_list
              ?.data === "string" ? (
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
            ) : dashboardsData?.[dashboardActiveKey]?.key_news_list?.data
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
              dashboardsData?.[dashboardActiveKey]?.key_news_list?.data?.map(
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
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DeepDive2;
