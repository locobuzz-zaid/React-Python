import React from "react";
import { Layout, Menu, Typography, Row, Col, Select, Spin } from "antd";
import { LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardActiveKey,
  setDashboardDeepDiveLevel,
  setDashboardsData,
} from "../../../redux/actions/NewzVerse/NewzVerse";
import CustomDatePicker from "./CustomDatePicker";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const CustomBreadcrum = () => {
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

  const handleBack = () => {
    if (dashboardDeepDiveLevel === 6) {
      dispatch(setDashboardDeepDiveLevel(1));

      let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
        if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
          dashboard.deep_dive = [];
        }
        return dashboard;
      });
      dispatch(setDashboardsData(updatedDashboardsData));
    } else {
      if (
        dashboardsData?.[dashboardActiveKey]?.key_news_list?.data?.length &&
        dashboardsData?.[dashboardActiveKey]?.article_data_list?.data?.length
      ) {
        // Go to dashboard
        if (dashboardDeepDiveLevel === 2) {
          dispatch(setDashboardDeepDiveLevel(1));
          // console.log("2.1");
          let updatedDashboardsData = dashboardsData?.map(
            (dashboard, index) => {
              if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
                dashboard.key_news_list = [];
                dashboard.article_data_list = [];
                dashboard.selected_theme_data = null;
                dashboard.selected_cluster_data = null;
              }
              return dashboard;
            }
          );
          dispatch(setDashboardsData(updatedDashboardsData));
        } else {
          dispatch(setDashboardDeepDiveLevel(2));
          // console.log("2.2");
          let updatedDashboardsData = dashboardsData?.map(
            (dashboard, index) => {
              if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
                dashboard.article_data_list = [];
                dashboard.selected_cluster_data = null;
              }
              return dashboard;
            }
          );
          dispatch(setDashboardsData(updatedDashboardsData));
        }
      } else {
        // Go to List
        dispatch(setDashboardDeepDiveLevel(1));
        // console.log("1.1");
        let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
          if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
            dashboard.key_news_list = [];
            dashboard.article_data_list = [];
            dashboard.selected_theme_data = null;
            dashboard.selected_cluster_data = null;
          }
          return dashboard;
        });
        dispatch(setDashboardsData(updatedDashboardsData));
      }
    }
  };
  return (
    <>
      <Header className="custom-breadcrum-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Row align="middle" gutter={16}>
              <Col
                style={{
                  marginLeft: "30px",
                }}
              >
                <LeftOutlined
                  onClick={handleBack}
                  style={{ fontSize: "18px" }}
                />
              </Col>
              <Col>
                <Text>
                  <span style={{ fontWeight: "500", color: "#707070" }}>
                    Dashboard &gt;{" "}
                    {
                      dashboardTabsNameList?.[dashboardActiveKey]
                        ?.dashboard_name
                    }{" "}
                    &gt;
                  </span>
                  <span style={{ fontWeight: "500", color: "#1a1a1a" }}>
                    &nbsp;
                  </span>
                  <span style={{ fontWeight: "600", color: "#1a1a1a" }}>
                    {dashboardDeepDiveLevel === 6
                      ? "Deep Dive"
                      : dashboardDeepDiveLevel === 2
                      ? dashboardsData?.[dashboardActiveKey]
                          ?.selected_theme_data?.theme_name
                      : dashboardsData?.[dashboardActiveKey]
                          ?.selected_cluster_data?.ai_cluster_name?.length > 70
                      ? dashboardsData?.[
                          dashboardActiveKey
                        ]?.selected_cluster_data?.ai_cluster_name?.substring(
                          0,
                          70
                        ) + "..."
                      : dashboardsData?.[dashboardActiveKey]
                          ?.selected_cluster_data?.ai_cluster_name}
                  </span>
                </Text>
              </Col>
            </Row>
          </Col>
          <Col style={{ marginRight: "30px" }}>
            <Row align="middle" gutter={16}>
              <Col>
                <CustomDatePicker />
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
    </>
  );
};

export default CustomBreadcrum;
