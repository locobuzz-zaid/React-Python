import React, { useState, useEffect } from "react";
import {
  Layout,
  Select,
  Row,
  Col,
  Image,
  Typography,
  Tabs,
  Space,
  Spin,
} from "antd";
import { LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./CuratedNews.css";
import { setDashboardDeepDiveLevel } from "../../../../redux/actions/NewzVerse/NewzVerse";
import moment from "moment";
import {
  formatRelativeTime,
  parseAttachmentsXMLToElements,
} from "../../../../redux/constants/index";
import nvScoreIcon from "../../../../assets/Dashboard/nv_score_icon.svg";
import openPostIcon from "../../../../assets/Dashboard/open_post_icon.svg";
import { LoadingOutlined } from "@ant-design/icons";
import ErrorBoundary from "../Analytics/ErrorBoundary";
import NoGraphData from "../Analytics/NoGraphData";
import twitterVerifiedIcon from "../../../../assets/Dashboard/twitter_verified_icon.png";
import CustomPagination from "../../Utils/CustomPagination";
import HighVelocityNews from "../../Utils/HighVelocityNews";

const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export const CuratedNewsView = () => {
  const dispatch = useDispatch();

  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );

  const [selectedMenuItem, setSelectedMenuItem] = useState("Key People");
  const [isHovered, setIsHovered] = useState({
    flag: false,
    index: null,
  });

  const [isHoveredHighVelocity, setIsHoveredHighVelocity] = useState({
    flag: false,
    index: null,
  });
  const [isHoveredHighVelocity1, setIsHoveredHighVelocity1] = useState({
    flag: false,
    index: null,
  });

  const handleDeepDiveLevel = (level) => {
    dispatch(setDashboardDeepDiveLevel(level));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Header
        className="header"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 9999,
          marginTop: "60px",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Row align="middle" gutter={16}>
              <Col
                style={{
                  marginLeft: "30px",
                }}
              >
                <LeftOutlined
                  onClick={() => handleDeepDiveLevel(1)}
                  style={{ fontSize: "18px" }}
                />
              </Col>
              <Col>
                <Text>
                  <span style={{ fontWeight: "500", color: "#707070" }}>
                    Dashboard &gt;
                  </span>
                  <span style={{ fontWeight: "500", color: "#1a1a1a" }}>
                    &nbsp;
                  </span>
                  <span style={{ fontWeight: "600", color: "#1a1a1a" }}>
                    Curated Key People & Brand Highlights
                  </span>
                </Text>
              </Col>
            </Row>
          </Col>
          {/* <Col style={{ marginRight: "30px" }}>
            <Row align="middle" gutter={16}>
              <Col>
                <Text>
                  Updated as on{" "}
                  {moment(
                    dashboardsData?.[dashboardActiveKey]?.duration?.end_date
                  ).format("MMM Do YYYY, h:mm a")}
                </Text>
              </Col>
              <Col>
                <ReloadOutlined style={{ fontSize: "18px" }} />
              </Col>
            </Row>
          </Col> */}
        </Row>
      </Header>
      <div style={{ margin: "30px" }}>
        <div
          style={{
            marginTop: "140px",
          }}
        >
          <h5>Curated Key People & Brand Highlights</h5>
        </div>

        <Tabs defaultActiveKey="1" className="curated-news-tabs">
          {/* Linked In */}
          <TabPane tab="Linkedin" key="1">
            {/* Pagination Component */}
            <CustomPagination type="Linkedin" />

            <Row className="content-section-tab">
              <Col className="content-column-tab linkedin-tab">
                {typeof dashboardsData?.[dashboardActiveKey]?.linkedin_news_list
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
                ) : dashboardsData?.[dashboardActiveKey]?.linkedin_news_list
                    ?.data?.length === 0 ? (
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
                    {dashboardsData?.[
                      dashboardActiveKey
                    ]?.linkedin_news_list?.data?.map((data, index) => {
                      return (
                        <HighVelocityNews
                          key={index}
                          {...data}
                          isHoveredHighVelocity={isHoveredHighVelocity}
                          setIsHoveredHighVelocity={setIsHoveredHighVelocity}
                          index={index}
                          type="linkedin"
                        />
                      );
                    })}
                  </>
                )}
              </Col>
            </Row>
          </TabPane>
          {/* Twitter */}
          <TabPane tab="X" key="2">
            {/* Pagination Component */}
            <CustomPagination type="Twitter" />

            <Row className="content-section">
              <Col className="content-column-tab twitter-tab">
                {typeof dashboardsData?.[dashboardActiveKey]?.twitter_news_list
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
                ) : dashboardsData?.[dashboardActiveKey]?.twitter_news_list
                    ?.data?.length === 0 ? (
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
                    {dashboardsData?.[
                      dashboardActiveKey
                    ]?.twitter_news_list?.data?.map((data, index) => {
                      return (
                        <HighVelocityNews
                          key={index}
                          {...data}
                          isHoveredHighVelocity={isHoveredHighVelocity}
                          setIsHoveredHighVelocity={setIsHoveredHighVelocity}
                          index={index}
                          type="twitter"
                        />
                      );
                    })}
                  </>
                )}
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
