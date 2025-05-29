import React, { useState, useEffect } from "react";
import { Tabs, Card, Row, Col, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ScreenWidget from "./Analytics/ScreenWidget";
import { getDashboardGlobalBrands } from "../../../redux/constants/NewzVerseConst";
import { getDashboardAnalyticsTemplateFetchAPI } from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import {
  setDashboardActiveKey,
  setDashboardsData,
} from "../../../redux/actions/NewzVerse/NewzVerse";
import CustomDatePicker from "../Utils/CustomDatePicker";
import BrandSelector from "../Utils/BrandsSelector";
import CompBrandSelector from "../Utils/CompBrandSelector";

const { TabPane } = Tabs;

const AnalyticsView = () => {
  const dispatch = useDispatch();

  const dashboardTabsNameLoader = useSelector(
    (state) => state?.NewzVerse?.dashboard_tabs_name_loader
  );
  const dashboardTabsNameList = useSelector(
    (state) => state?.NewzVerse?.dashboard_tabs_name_list
  );
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  const dashboardDeepDiveLevel = useSelector(
    (state) => state?.NewzVerse?.dashboard_deep_dive_level
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
          dashboard.analytics_sections_level_3 = [];
        }
        return dashboard;
      });
      dispatch(setDashboardsData(updatedDashboardsData));
    }

    setActiveTab(key);
    dispatch(setDashboardActiveKey(key));
  };

  // Template Fetch API
  useEffect(() => {
    if (
      dashboardDeepDiveLevel === 1 &&
      dashboardBrandsList?.length &&
      dashboardsData?.[dashboardActiveKey]?.duration?.start_date &&
      dashboardsData?.[dashboardActiveKey]?.analytics_sections_level_1
        ?.length === 0
    ) {
      let global_brands = getDashboardGlobalBrands(
        dashboardsData,
        dashboardBrandsList,
        dashboardActiveKey
      );
      let templateFetchPayloadObj = {
        p_token: p_token ? p_token : null,
        dashboard_type: dashboardActiveKey + 1,
        deep_dive_level: "1",
        dashboardsData: dashboardsData,
        start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
        end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
        dashboard_filters: [],
        brand_list: global_brands,
      };
      dispatch(getDashboardAnalyticsTemplateFetchAPI(templateFetchPayloadObj));
    }
  }, [activeTab]);

  let analyticsData =
    dashboardDeepDiveLevel === 3
      ? dashboardsData?.[dashboardActiveKey]?.analytics_sections_level_3
      : dashboardDeepDiveLevel === 2
      ? dashboardsData?.[dashboardActiveKey]?.analytics_sections_level_2
      : dashboardDeepDiveLevel === 1
      ? dashboardsData?.[dashboardActiveKey]?.analytics_sections_level_1
      : dashboardsData?.[dashboardActiveKey]?.analytics_sections_level_1;

  return (
    <>
      {dashboardDeepDiveLevel === 2 || dashboardDeepDiveLevel === 3 ? (
        <div
          className="main-content"
          style={{
            padding:
              dashboardDeepDiveLevel === 2 || dashboardDeepDiveLevel === 3
                ? "0px"
                : "",
            marginTop:
              dashboardDeepDiveLevel === 2 || dashboardDeepDiveLevel === 3
                ? ""
                : "60px",
          }}
        >
          {dashboardDeepDiveLevel === 2 || dashboardDeepDiveLevel === 3 ? (
            ""
          ) : (
            <h2 className="analytics-text-heading" style={{ marginBottom: 10 }}>
              Analytics Overview
            </h2>
          )}

          {analyticsData?.map((sec, sec_index) => {
            return (
              <div key={sec_index}>
                <Row gutter={16} style={{ marginTop: "0px" }}>
                  {sec?.widgets?.map((wid, wid_index) => {
                    return (
                      <Col
                        key={wid_index}
                        span={
                          wid?.span === "full"
                            ? 24
                            : wid?.span === "half"
                            ? 12
                            : wid?.span === "two_third"
                            ? 16
                            : wid?.span === "one_third"
                            ? 8
                            : 8
                        }
                        style={{ padding: "10px" }}
                      >
                        <ScreenWidget
                          section_id={wid?.section_id}
                          widget_index={wid_index}
                          section_index={sec_index}
                          widget={wid}
                          widget_id={wid?.widget_id}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            );
          })}
        </div>
      ) : (
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
                  !dashboardsData?.[dashboardActiveKey]
                    ?.competitor_view_flag && (
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
                <TabPane
                  tab={dashboardTabsNameList?.[0]?.dashboard_name}
                  key="1"
                >
                  <div className="tab-content" style={{ marginTop: "120px" }}>
                    {dashboardDeepDiveLevel === 2 ||
                    dashboardDeepDiveLevel === 3 ? (
                      ""
                    ) : (
                      <h2
                        className="analytics-text-heading"
                        style={{ marginBottom: 10 }}
                      >
                        Analytics Overview
                      </h2>
                    )}

                    {analyticsData?.map((sec, sec_index) => {
                      return (
                        <div key={sec_index}>
                          <Row gutter={16} style={{ marginTop: "0px" }}>
                            {sec?.widgets?.map((wid, wid_index) => {
                              return (
                                <Col
                                  key={wid_index}
                                  span={
                                    wid?.span === "full"
                                      ? 24
                                      : wid?.span === "half"
                                      ? 12
                                      : wid?.span === "two_third"
                                      ? 16
                                      : wid?.span === "one_third"
                                      ? 8
                                      : 8
                                  }
                                  style={{ padding: "10px" }}
                                >
                                  <ScreenWidget
                                    section_id={wid?.section_id}
                                    widget_index={wid_index}
                                    section_index={sec_index}
                                    widget={wid}
                                    widget_id={wid?.widget_id}
                                  />
                                </Col>
                              );
                            })}
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                </TabPane>
                <TabPane
                  tab={dashboardTabsNameList?.[1]?.dashboard_name}
                  key="2"
                >
                  <div className="tab-content" style={{ marginTop: "120px" }}>
                    {dashboardDeepDiveLevel === 2 ||
                    dashboardDeepDiveLevel === 3 ? (
                      ""
                    ) : (
                      <h2
                        className="analytics-text-heading"
                        style={{ marginBottom: 10 }}
                      >
                        Analytics Overview
                      </h2>
                    )}

                    {analyticsData?.map((sec, sec_index) => {
                      return (
                        <div key={sec_index}>
                          <Row gutter={16} style={{ marginTop: "0px" }}>
                            {sec?.widgets?.map((wid, wid_index) => {
                              return (
                                <Col
                                  key={wid_index}
                                  span={
                                    wid?.span === "full"
                                      ? 24
                                      : wid?.span === "half"
                                      ? 12
                                      : wid?.span === "two_third"
                                      ? 16
                                      : wid?.span === "one_third"
                                      ? 8
                                      : 8
                                  }
                                  style={{ padding: "10px" }}
                                >
                                  <ScreenWidget
                                    section_id={wid?.section_id}
                                    widget_index={wid_index}
                                    section_index={sec_index}
                                    widget={wid}
                                    widget_id={wid?.widget_id}
                                  />
                                </Col>
                              );
                            })}
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                </TabPane>
                <TabPane
                  tab={dashboardTabsNameList?.[2]?.dashboard_name}
                  key="3"
                >
                  <div className="tab-content" style={{ marginTop: "120px" }}>
                    {dashboardDeepDiveLevel === 2 ||
                    dashboardDeepDiveLevel === 3 ? (
                      ""
                    ) : (
                      <h2
                        className="analytics-text-heading"
                        style={{ marginBottom: 10 }}
                      >
                        Analytics Overview
                      </h2>
                    )}

                    {analyticsData?.map((sec, sec_index) => {
                      return (
                        <div key={sec_index}>
                          <Row gutter={16} style={{ marginTop: "0px" }}>
                            {sec?.widgets?.map((wid, wid_index) => {
                              return (
                                <Col
                                  key={wid_index}
                                  span={
                                    wid?.span === "full"
                                      ? 24
                                      : wid?.span === "half"
                                      ? 12
                                      : wid?.span === "two_third"
                                      ? 16
                                      : wid?.span === "one_third"
                                      ? 8
                                      : 8
                                  }
                                  style={{ padding: "10px" }}
                                >
                                  <ScreenWidget
                                    section_id={wid?.section_id}
                                    widget_index={wid_index}
                                    section_index={sec_index}
                                    widget={wid}
                                    widget_id={wid?.widget_id}
                                  />
                                </Col>
                              );
                            })}
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                </TabPane>
              </Tabs>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AnalyticsView;
