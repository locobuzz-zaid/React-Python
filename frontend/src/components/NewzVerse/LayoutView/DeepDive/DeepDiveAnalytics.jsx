import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardDeepDiveLevel,
  setDashboardsData,
} from "../../../../redux/actions/NewzVerse/NewzVerse";
import { Layout, Menu, Typography, Row, Col, Select, Spin } from "antd";
import { LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import "./DeepDive2.css";
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
import ErrorBoundary from "../Analytics/ErrorBoundary";
import NoGraphData from "../Analytics/NoGraphData";
import Analytics from "../Analytics/Analytics";
import CustomPagination from "../../Utils/CustomPagination";
import {
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
import CustomTable from "../../Utils/CustomTable";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const DeepDiveAnalytics = () => {
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

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    dashboardsData?.[dashboardActiveKey]?.selected_theme_data?.theme_name
      ? dashboardsData?.[dashboardActiveKey]?.selected_theme_data?.theme_name
      : "All Key News"
  );
  const [isHovered, setIsHovered] = useState({
    flag: false,
    index: null,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedMenuItem]);

  const themesListWithAllKeyNews = [
    {
      theme_id: 0,
      theme_name: "All Key News",
      secondary_color_code: "#010101",
      primary_color_code: "#F2F2F2",
    },
    ...(dashboardsData?.[dashboardActiveKey]?.themes_list || []),
  ];

  // console.log("Deep Dive 2", dashboardsData?.[dashboardActiveKey]);
  return (
    <div>
      {/* Breadcrum */}
      <CustomBreadcrum />

      {/* content */}
      <Layout
        style={{ minHeight: "100vh", marginTop: "60px", background: "red" }}
      >
        {/* Main Content */}
        <Layout>
          <Content
            style={{
              padding: "24px",
              marginLeft: "0px",
              background: "#fff",
              marginTop: "60px",
            }}
          >
            {/* Pagination Component */}
            <CustomPagination />

            {/* Event List */}
            {typeof dashboardsData?.[dashboardActiveKey]?.deep_dive?.data ===
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
            ) : dashboardsData?.[dashboardActiveKey]?.deep_dive?.data
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
                {dashboardsData?.[dashboardActiveKey]?.deep_dive?.widget_id ===
                3.3 ? (
                  <>
                    <CustomTable />
                  </>
                ) : (
                  dashboardsData?.[dashboardActiveKey]?.deep_dive?.data?.map(
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
              </>
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DeepDiveAnalytics;
