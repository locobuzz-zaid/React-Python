import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardDeepDiveLevel,
  setDashboardsData,
} from "../../../../redux/actions/NewzVerse/NewzVerse";
import {
  Layout,
  Menu,
  Typography,
  Row,
  Col,
  Select,
  Space,
  Tag,
  Table,
  Pagination,
  Avatar,
} from "antd";
import { LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import "./DeepDive2.css";
import Filters from "../../Utils/Filters";
import CustomPagination from "../../Utils/CustomPagination";
import CustomBreadcrum from "../../Utils/CustomBreadcrum";
import CustomTable from "../../Utils/CustomTable";

import twitterSquareIcon from "../../../../assets/Dashboard/twitter_square_icon.svg";
import linkedinSquareIcon from "../../../../assets/Dashboard/linkedin_square_icon.svg";
import newsArticleSquareIcon from "../../../../assets/Dashboard/news_article_square_icon.svg";

import twitterCircleIcon from "../../../../assets/Dashboard/twitter_circle_icon.svg";
import linkedinCircleIcon from "../../../../assets/Dashboard/linkedin_circle_icon.png";
import newsArticleIcon from "../../../../assets/Dashboard/news_article_icon.svg";
import nvScoreIcon from "../../../../assets/Dashboard/nv_score_icon.svg";
import articleIconDividerIcon from "../../../../assets/Dashboard/article_icon_divider_icon.svg";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardDataAPI,
  getDashboardFiltersAPI,
} from "../../../../redux/actions/NewzVerse/NewzVerseAPI";
import Analytics from "../Analytics/Analytics";
import { getDashboardGlobalBrands } from "../../../../redux/constants/NewzVerseConst";
import AnalyticsView from "../AnalyticsView";

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const DeepDive3 = () => {
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
    dashboardsData?.[dashboardActiveKey]?.selected_cluster_data?.ai_cluster_name
      ? dashboardsData?.[dashboardActiveKey]?.selected_cluster_data
          ?.ai_cluster_key +
          "|" +
          dashboardsData?.[dashboardActiveKey]?.selected_cluster_data
            ?.ai_cluster_name
      : ""
  );

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
        widget_id: "3.3",
        dashboard_type: dashboardActiveKey + 1,
        dashboardsData: dashboardsData,
        dashboard_filters: [
          {
            attribute: "ai_cluster_key",
            values: [
              dashboardsData?.[dashboardActiveKey]?.selected_cluster_data
                ?.ai_cluster_key,
            ],
          },
        ],
        offset: 0,
      };
      dispatch(getDashboardFiltersAPI(filterPayloadObj));
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedMenuItem]);

  const handleSelectedMenuItem = (key) => {
    const [ai_cluster_key, title] = key.split("|");
    setSelectedMenuItem(key);

    if (title) {
      let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
        if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
          dashboard.key_news_list.data = [];
          dashboard.selected_cluster_data = {
            ai_cluster_name: title,
            ai_cluster_key: ai_cluster_key,
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

      let templateFetchPayloadObj = {
        p_token: p_token ? p_token : null,
        dashboard_type: dashboardActiveKey + 1,
        deep_dive_level: "3",
        dashboardsData: dashboardsData,
        start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
        end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
        brand_list: global_brands,
        dashboard_filters: [
          ...dashboardsData?.[dashboardActiveKey]?.applied_dashboard_filters,
          {
            attribute: "ai_cluster_key",
            values: [ai_cluster_key],
          },
        ],
      };
      dispatch(getDashboardAnalyticsTemplateFetchAPI(templateFetchPayloadObj));

      let widgets_id_list = ["3.1", "3.2", "3.3"];
      widgets_id_list?.map((wid) => {
        let payloadObj1 = {
          p_token: p_token ? p_token : null,
          brand_list: global_brands,
          start_date:
            dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
          end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
          filters: [],
          widget_id: wid,
          dashboard_type: dashboardActiveKey + 1,
          dashboardsData: dashboardsData,
          dashboard_filters: [
            ...dashboardsData?.[dashboardActiveKey]?.applied_dashboard_filters,
            {
              attribute: "ai_cluster_key",
              values: [ai_cluster_key],
            },
          ],
          offset: 0,
          rows: 10,
        };
        dispatch(getDashboardDataAPI(payloadObj1));
      });
    }
  };

  let dynamic_count = dashboardDeepDiveLevel === 3 ? 10 : 1;

  // console.log("deep dive 3", dashboardsData?.[dashboardActiveKey]);
  return (
    <div>
      {/* Breadcrum */}
      <CustomBreadcrum />

      {/* content */}
      <Layout style={{ minHeight: "100vh", marginTop: "60px" }}>
        {/* Left Sidebar */}
        <Sider
          width={200}
          theme="light"
          style={{ marginTop: "60px", borderRight: "1px solid #EDF2F6" }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuItem]}
            style={{ height: "100%", borderRight: 0 }}
            onSelect={({ key }) => {
              handleSelectedMenuItem(key);
            }}
          >
            {dashboardsData?.[dashboardActiveKey]?.article_event_name_list?.map(
              (item) => (
                <Menu.Item key={`${item?.ai_cluster_key}|${item?.title}`}>
                  {item?.title ? item?.title : item?.description}
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout>
          <Content
            style={{
              padding: "24px",
              background: "#fff",
              marginLeft: "200px",
              marginTop: "60px",
            }}
          >
            {/* Heading */}
            <Title level={4}>
              {dashboardsData?.[dashboardActiveKey]?.article_event_summary
                ?.title
                ? dashboardsData?.[dashboardActiveKey]?.article_event_summary
                    ?.title
                : dashboardsData?.[dashboardActiveKey]?.article_event_summary
                    ?.description}
            </Title>
            {/* Summary */}
            <div
              style={{
                background: "#F0F0FA",
                padding: "10px",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              <Text
                type="secondary"
                style={{
                  fontWeight: "700",
                  color: "#1A1A1A",
                  fontSize: "16px",
                }}
              >
                Summary
              </Text>
              <Paragraph>
                {
                  dashboardsData?.[dashboardActiveKey]?.article_event_summary
                    ?.description
                }
              </Paragraph>
            </div>
            {/* Icons */}
            <Space wrap>
              {/* Themes */}
              {dashboardsData?.[dashboardActiveKey]?.article_event_summary
                ?.themes?.length
                ? dashboardsData?.[
                    dashboardActiveKey
                  ]?.article_event_summary?.themes?.map((tag, index) => {
                    if (index < dynamic_count)
                      return (
                        <Tag
                          key={index}
                          // color={tag.primary_color_code}
                          style={{
                            background: tag?.lightcolor,
                            fontSize: "8px",
                            marginLeft: index === 1 ? "-10px" : "",
                          }}
                        >
                          <span style={{ color: tag?.darkcolour }}>•</span>{" "}
                          {tag.theme_name ? tag.theme_name : tag}
                        </Tag>
                      );
                  })
                : ""}{" "}
              {dynamic_count < 2 &&
              dashboardsData?.[dashboardActiveKey]?.article_event_summary
                ?.themes?.length -
                2 >
                0 ? (
                <span
                  style={{
                    background: "#f3f3f3",
                    padding: "5px",
                    borderRadius: "20px",
                    width: "10px",
                    height: "10px",
                    fontSize: "10px",
                    marginLeft: "-20px",
                  }}
                >
                  +
                  {dashboardsData?.[dashboardActiveKey]?.article_event_summary
                    ?.themes?.length - 2}
                </span>
              ) : (
                ""
              )}
              {/* Profiles */}
              {dashboardsData?.[dashboardActiveKey]?.article_event_summary
                ?.ai_profiles?.length ? (
                <Avatar.Group>
                  <Avatar
                    style={{ marginTop: "8px" }}
                    size={15}
                    src={
                      dashboardsData?.[dashboardActiveKey]
                        ?.article_event_summary?.ai_profiles?.profile_image
                    }
                  />
                </Avatar.Group>
              ) : (
                ""
              )}
              <img src={articleIconDividerIcon} />
              {/* Channels */}
              {dashboardsData?.[
                dashboardActiveKey
              ]?.article_event_summary?.channel_breakdown?.map((d) => {
                if (d?.channel_group_id === 1)
                  return (
                    <>
                      <img
                        style={{
                          width: "14px",
                          height: "14px",
                          borderRadius: "3px",
                          marginLeft: "12px",
                          marginRight: "5px",
                        }}
                        src={twitterSquareIcon}
                      />
                      <Text
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          marginLeft: "-5px",
                        }}
                      >
                        {d?.article_count ? d?.article_count : 0}
                        {d?.article_count > 1 ? " Tweets" : " Tweet"}
                      </Text>{" "}
                    </>
                  );
                if (d?.channel_group_id === 5)
                  return (
                    <>
                      <img
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "3px",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                        src={linkedinSquareIcon}
                      />
                      <Text
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          marginLeft: "-5px",
                        }}
                      >
                        {d?.article_count ? d?.article_count : 0}
                        {d?.article_count > 1 ? "Posts" : "Post"}
                      </Text>
                    </>
                  );
                if (d?.channel_group_id === 19)
                  return (
                    <>
                      <img
                        style={{
                          width: "16px",
                          height: "16px",
                          background: "#707985",
                          padding: "2px",
                          borderRadius: "3px",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                        src={newsArticleSquareIcon}
                      />
                      <Text
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          marginLeft: "-5px",
                        }}
                      >
                        {d?.article_count ? d?.article_count : 0}{" "}
                        {d?.article_count > 1
                          ? "News Articles"
                          : "News Article"}
                      </Text>
                    </>
                  );
              })}
              <img src={articleIconDividerIcon} />
              {/* Nv Score */}
              <img
                style={{ width: "20px", height: "20px" }}
                src={nvScoreIcon}
              />
              <Text
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#407BFF",
                  marginLeft: "-5px",
                }}
              >
                {
                  dashboardsData?.[dashboardActiveKey]?.article_event_summary
                    ?.impact_score
                }{" "}
              </Text>
              <Text
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                NV Score
              </Text>
              {/* Info Icon */}
              {/* {title.includes("sustainability") && (
            <Tag color="red" style={{ fontSize: "8px" }}>
              Misinformation
            </Tag>
          )} */}
            </Space>

            {/* Analytics */}
            <AnalyticsView />

            {/* Filters */}
            <Filters />

            {/* Pagination Component */}
            <CustomPagination />

            {/* Articles List */}
            <CustomTable />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DeepDive3;
