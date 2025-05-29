import React, { useState } from "react";
import { Tabs, Skeleton, Typography, Select, Tooltip } from "antd";
import { KeyNews } from "./KeyNews";
import { useDispatch, useSelector } from "react-redux";
import { CuratedNews } from "./CuratedNews";
import ThemeCards from "./ThemeCards";
import {
  setDashboardActiveKey,
  setDashboardsData,
} from "../../../../redux/actions/NewzVerse/NewzVerse";
import Analytics from "../Analytics/Analytics";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardDataAPI,
  getDashboardTabsNameAPI,
} from "../../../../redux/actions/NewzVerse/NewzVerseAPI";
import BrandSelector from "../../Utils/BrandsSelector";
import CompetitorView from "./CompetitorView";
import CompBrandSelector from "../../Utils/CompBrandSelector";
import "./Dashboard.css";
import { getDashboardGlobalBrands } from "../../../../redux/constants/NewzVerseConst";
import CustomDatePicker from "../../Utils/CustomDatePicker";

const { TabPane } = Tabs;
const { Option } = Select;

const Dashboard = ({ handleMenuSelect, selectedMenu }) => {
  const dispatch = useDispatch();

  const dashboardTabsNameLoader = useSelector(
    (state) => state?.NewzVerse?.dashboard_tabs_name_loader
  );
  const dashboardTabsNameList = useSelector(
    (state) => state?.NewzVerse?.dashboard_tabs_name_list
  );
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );

  let p_token = localStorage.getItem("p_token");

  let updatedKey = dashboardActiveKey ? dashboardActiveKey + 1 : "1";
  updatedKey = updatedKey.toString();

  const [activeTab, setActiveTab] = useState(updatedKey);
  const handleTabClick = (key) => {
    let dashboardActiveKeyValue = Number(key) - 1;

    if (key === "1") {
      //  Do nothing
    } else if (key === "2") {
      let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
        if (dashboard?.dashboard_type === 2) {
          dashboard.duration = {
            start_date: dashboardsData?.[dashboardActiveKeyValue]?.duration
              ?.start_date
              ? dashboardsData?.[dashboardActiveKeyValue]?.duration?.start_date
              : dashboardsData?.[0]?.duration?.start_date,
            end_date: dashboardsData?.[dashboardActiveKeyValue]?.duration
              ?.end_date
              ? dashboardsData?.[dashboardActiveKeyValue]?.duration?.end_date
              : dashboardsData?.[0]?.duration?.end_date,
          };
          dashboard.selected_brands =
            key === "1"
              ? dashboardBrandsList?.[0]
              : dashboardsData?.[dashboardActiveKeyValue]?.selected_brands;
          dashboard.selected_comp_brands =
            key === "2"
              ? dashboardsData?.[dashboardActiveKeyValue]?.selected_comp_brands
              : null;
          dashboard.dashboard_filters = [];
          dashboard.selected_theme_data = null;
          dashboard.selected_cluster_data = null;
          dashboard.key_news = [];
          dashboard.key_news_list = [];
          dashboard.high_velocity_news = [];
          dashboard.themes_list = [];
          dashboard.linkedin_news = [];
          dashboard.twitter_news = [];
          dashboard.curated_linkedin_news = [];
          dashboard.curated_twitter_news = [];
          dashboard.analytics_sections_level_1 = [];
          dashboard.analytics_sections_level_2 = [];
          dashboard.analytics_sections_level_3 = [];
          dashboard.article_event_summary = null;
          dashboard.article_event_name_list = [];
          dashboard.article_data_list = [];
          dashboard.competitor_view_flag = key === "2" ? true : false;
        }
        return dashboard;
      });
      dispatch(setDashboardsData(updatedDashboardsData));
    } else if (
      key === "3" &&
      (dashboardsData?.[dashboardActiveKeyValue]?.key_news?.length === 0 ||
        !dashboardsData?.[dashboardActiveKeyValue]?.key_news)
    ) {
      let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
        if (dashboard?.dashboard_type === 3) {
          dashboard.duration = {
            start_date: dashboardsData?.[dashboardActiveKeyValue]?.duration
              ?.start_date
              ? dashboardsData?.[dashboardActiveKeyValue]?.duration?.start_date
              : dashboardsData?.[0]?.duration?.start_date,
            end_date: dashboardsData?.[dashboardActiveKeyValue]?.duration
              ?.end_date
              ? dashboardsData?.[dashboardActiveKeyValue]?.duration?.end_date
              : dashboardsData?.[0]?.duration?.end_date,
          };
        }
        return dashboard;
      });
      dispatch(setDashboardsData(updatedDashboardsData));

      let widgets_list = ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5"];
      widgets_list?.map((widget_id) => {
        let payloadObj = {
          p_token: p_token ? p_token : null,
          brand_list: dashboardBrandsList ? dashboardBrandsList : [],
          start_date:
            dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
          end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
          filters: [],
          widget_id: widget_id,
          dashboard_type: 3,
          dashboardsData: dashboardsData,
          offset: 0,
          dashboard_filters: [{ attribute: "theme_id", values: [] }],
          rows: 5,
        };
        // dispatch(getDashboardDataAPI(payloadObj));
      });
    }

    setActiveTab(key);
    dispatch(setDashboardActiveKey(key));
  };

  return (
    <div className="dashboard-main-content">
      {dashboardTabsNameLoader ? (
        <div className="sticky-tabs-loader-div">
          <Skeleton.Input
            active={true}
            style={{ margin: "10px", borderRadius: "8px" }}
          />
          <Skeleton.Input
            active={true}
            style={{ margin: "10px", borderRadius: "8px" }}
          />
          <Skeleton.Input
            active={true}
            style={{ margin: "10px", borderRadius: "8px" }}
          />
        </div>
      ) : (
        <>
          <Tabs
            onChange={handleTabClick}
            defaultActiveKey="1"
            activeKey={activeTab}
            className="sticky-tabs"
            tabBarExtraContent={
              !dashboardsData?.[dashboardActiveKey]?.competitor_view_flag && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginRight: "105px",
                  }}
                >
                  {activeTab === "2" ? (
                    <>
                      <CompBrandSelector
                        aggregatedDashboardBrandsList={dashboardBrandsList}
                      />
                    </>
                  ) : activeTab === "3" ? (
                    <>
                      <BrandSelector
                        aggregatedDashboardBrandsList={dashboardBrandsList}
                      />
                    </>
                  ) : (
                    ""
                  )}

                  <CustomDatePicker />
                </div>
              )
            }
          >
            <TabPane tab={dashboardTabsNameList?.[0]?.dashboard_name} key="1">
              <div className="tab-content">
                {/* Analytics Cards */}
                <Analytics
                  handleMenuSelect={handleMenuSelect}
                  selectedMenu={selectedMenu}
                />

                {/* News and High Velocity Cards */}
                <KeyNews />

                {/* Themes Cards */}
                <ThemeCards />

                {/* Linkedin and Twitter Cards */}
                <CuratedNews />
              </div>
            </TabPane>
            <TabPane tab={dashboardTabsNameList?.[1]?.dashboard_name} key="2">
              {dashboardsData?.[dashboardActiveKey]?.competitor_view_flag ? (
                <div
                  style={{ marginTop: "160px", height: "calc(100vh - 160px)" }}
                >
                  <CompetitorView />
                </div>
              ) : (
                <div className="tab-content">
                  <Analytics
                    handleMenuSelect={handleMenuSelect}
                    selectedMenu={selectedMenu}
                  />
                  <KeyNews />
                  <ThemeCards />
                  <CuratedNews />
                </div>
              )}
            </TabPane>
            <TabPane tab={dashboardTabsNameList?.[2]?.dashboard_name} key="3">
              <div className="tab-content">
                <Analytics
                  handleMenuSelect={handleMenuSelect}
                  selectedMenu={selectedMenu}
                />
                <KeyNews />
                <ThemeCards />
                <CuratedNews />
              </div>
            </TabPane>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Dashboard;
