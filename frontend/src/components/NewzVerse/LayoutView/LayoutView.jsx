import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import Dashboard from "./Dashboard/Dashboard";
import AnalyticsView from "./AnalyticsView";
import "./LayoutView.css";
import { useDispatch, useSelector } from "react-redux";
import DeepDive2 from "./DeepDive/DeepDive2";
import DeepDive3 from "./DeepDive/DeepDive3";
import { CuratedNewsView } from "./Dashboard/CuratedNewsView";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardBrandsAPI,
  getDashboardDataAPI,
  getDashboardTabsNameAPI,
  getUsersAccountSettingsAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import { HighVelocityViewAll } from "./Dashboard/HighVelocityViewAll";
import DeepDiveAnalytics from "./DeepDive/DeepDiveAnalytics";
import { getDashboardGlobalBrands } from "../../../redux/constants/NewzVerseConst";
import Settings from "./Settings/Settings";
import { setIsDeepDiveFlag } from "../../../redux/actions/NewzVerse/NewzVerse";

const { Content } = Layout;

const LayoutView = () => {
  const dispatch = useDispatch();

  const dashboardDeepDiveLevel = useSelector(
    (state) => state?.NewzVerse?.dashboard_deep_dive_level
  );
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  // console.log("dashboardsData", dashboardsData);
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  let p_token = localStorage.getItem("p_token");

  const [selectedMenu, setSelectedMenu] = useState("1");

  const handleMenuSelect = (key) => {
    if (selectedMenu === "3" && key === "1") {
      let brandObj = {
        p_token: p_token ? p_token : null,
      };
      dispatch(getDashboardBrandsAPI(brandObj));
    }
    setSelectedMenu(key);
    if (key === "2") {
      dispatch(setIsDeepDiveFlag(true));
    } else {
      dispatch(setIsDeepDiveFlag(false));
    }
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dashboardActiveKey]);

  // Get Brands and Tabs Name API
  useEffect(() => {
    // Get Brands API
    let brandObj = {
      p_token: p_token ? p_token : null,
    };
    dispatch(getDashboardBrandsAPI(brandObj));

    // Get Dashboards Tabs Name API
    let tabsObj = {
      p_token: p_token ? p_token : null,
      dashboardsData: dashboardsData,
      dashboard_type: dashboardActiveKey + 1,
    };
    dispatch(getDashboardTabsNameAPI(tabsObj));

    // Get Dashboards Tabs Name API
    let accountObj = {
      p_token: p_token ? p_token : null,
    };
    dispatch(getUsersAccountSettingsAPI(accountObj));
  }, []);

  useEffect(() => {
    if (
      dashboardBrandsList?.length &&
      dashboardsData?.[dashboardActiveKey]?.duration?.start_date &&
      (dashboardsData?.[dashboardActiveKey]?.kpi_news?.length === 0 ||
        dashboardsData?.[dashboardActiveKey]?.key_news?.length === 0 ||
        dashboardsData?.[dashboardActiveKey]?.high_velocity_news?.length ===
          0 ||
        dashboardsData?.[dashboardActiveKey]?.themes_list?.length === 0 ||
        dashboardsData?.[dashboardActiveKey]?.linkedin_news?.length === 0 ||
        dashboardsData?.[dashboardActiveKey]?.twitter_news?.length === 0)
    ) {
      let widgets_list = ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5"];

      let global_brands = getDashboardGlobalBrands(
        dashboardsData,
        dashboardBrandsList,
        dashboardActiveKey
      );

      widgets_list?.map((widget_id) => {
        let payloadObj = {
          p_token: p_token ? p_token : null,
          brand_list: global_brands,
          start_date:
            dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
          end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
          filters: [],
          widget_id: widget_id,
          dashboard_type: dashboardActiveKey + 1,
          dashboardsData: dashboardsData,
          offset: 0,
          // dashboard_filters: [],
          dashboard_filters: [{ attribute: "theme_id", values: [] }],
          rows: 5,
        };
        dispatch(getDashboardDataAPI(payloadObj));
      });
    }
  }, [
    dashboardBrandsList,
    dashboardsData?.[dashboardActiveKey]?.duration,
    dashboardActiveKey,
  ]);

  return (
    <div>
      <TopNavbar />
      {dashboardDeepDiveLevel === 1 ? (
        <>
          <Layout style={{ minHeight: "100vh" }}>
            <Sidebar
              onMenuSelect={handleMenuSelect}
              selectedMenu={selectedMenu}
            />
            <Layout
              className="site-layout custom_scrollbar"
              style={{ marginLeft: 80 }}
              id="style-1"
            >
              <Content style={{ overflow: "initial" }}>
                {selectedMenu === "1" ? (
                  <Dashboard
                    handleMenuSelect={handleMenuSelect}
                    selectedMenu={selectedMenu}
                  />
                ) : selectedMenu === "2" ? (
                  <AnalyticsView />
                ) : selectedMenu === "3" ? (
                  <Settings />
                ) : selectedMenu === "4" ? (
                  "Profile"
                ) : (
                  ""
                )}
              </Content>
            </Layout>
          </Layout>
        </>
      ) : dashboardDeepDiveLevel === 2 ? (
        <>
          <DeepDive2 />
        </>
      ) : dashboardDeepDiveLevel === 3 ? (
        <>
          <DeepDive3 />
        </>
      ) : dashboardDeepDiveLevel === 4 ? (
        <>
          <CuratedNewsView />
        </>
      ) : dashboardDeepDiveLevel === 5 ? (
        <>
          <HighVelocityViewAll />
        </>
      ) : dashboardDeepDiveLevel === 6 ? (
        <>
          <DeepDiveAnalytics />
        </>
      ) : (
        "No Page Found"
      )}
    </div>
  );
};

export default LayoutView;
