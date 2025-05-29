import React, { useState } from "react";
import { Row, Col, Image, Typography, Space, Spin } from "antd";
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
import { getDashboardDataAPI } from "../../../../redux/actions/NewzVerse/NewzVerseAPI";
import HighVelocityNews from "../../Utils/HighVelocityNews";
import { getDashboardGlobalBrands } from "../../../../redux/constants/NewzVerseConst";

export const CuratedNews = () => {
  const dispatch = useDispatch();
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  let p_token = localStorage.getItem("p_token");

  const [isHoveredHighVelocity, setIsHoveredHighVelocity] = useState({
    flag: false,
    index: null,
  });
  const [isHoveredHighVelocity1, setIsHoveredHighVelocity1] = useState({
    flag: false,
    index: null,
  });

  const handleCuratedNewsViewAll = () => {
    dispatch(setDashboardDeepDiveLevel(4));

    let widgets_list = ["1.4", "1.5"];

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
        // dashboard_filters: [],
        dashboard_filters: [{ attribute: "theme_id", values: [] }],
        rows: 10,
      };
      dispatch(getDashboardDataAPI(payloadObj));
    });
  };

  // console.log(
  //   "dashboardsData?.[dashboardActiveKey]",
  //   dashboardsData?.[dashboardActiveKey]
  // );
  return (
    <>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h4 className="analytics-text-heading">
          Curated Key People & Brand Highlights
        </h4>
        {(dashboardsData?.[dashboardActiveKey]?.linkedin_news !==
          "No data available" &&
          dashboardsData?.[dashboardActiveKey]?.linkedin_news?.length) ||
        (dashboardsData?.[dashboardActiveKey]?.twitter_news !==
          "No data available" &&
          dashboardsData?.[dashboardActiveKey]?.twitter_news?.length) ? (
          <h6
            onClick={handleCuratedNewsViewAll}
            style={{
              color: "#1890ff",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            View All
          </h6>
        ) : (
          ""
        )}
      </div>
      <Row className="content-section">
        {/* Linked In */}
        <Col className="content-column linkedin">
          <Row
            style={{ height: "50px" }}
            justify="center"
            align="middle"
            className="content-header"
          >
            <Col>
              <Image
                width={20}
                height={20}
                src="https://c.animaapp.com/Uu4MYRyd/img/shape.svg"
                preview={false}
              />
            </Col>
          </Row>
          <div
            className="custom_scrollbar"
            id="style-1"
            style={{ height: "500px", overflowY: "auto" }}
          >
            {typeof dashboardsData?.[dashboardActiveKey]?.linkedin_news ===
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
            ) : dashboardsData?.[dashboardActiveKey]?.linkedin_news?.length ===
              0 ? (
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
                {dashboardsData?.[dashboardActiveKey]?.linkedin_news?.map(
                  (data, index) => {
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
                  }
                )}
              </>
            )}
          </div>
        </Col>
        {/* twitter */}
        <Col className="content-column twitter">
          <Row
            style={{ height: "50px" }}
            justify="center"
            align="middle"
            className="content-header"
          >
            <Col>
              <Image
                width={32}
                height={32}
                src="https://c.animaapp.com/Uu4MYRyd/img/x-twitter-logo-.svg"
                preview={false}
              />
            </Col>
          </Row>
          <div
            className="custom_scrollbar"
            id="style-1"
            style={{ height: "500px", overflowY: "auto" }}
          >
            {typeof dashboardsData?.[dashboardActiveKey]?.twitter_news ===
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
            ) : dashboardsData?.[dashboardActiveKey]?.twitter_news?.length ===
              0 ? (
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
                {dashboardsData?.[dashboardActiveKey]?.twitter_news?.map(
                  (data, index) => {
                    return (
                      <HighVelocityNews
                        key={index}
                        {...data}
                        isHoveredHighVelocity={isHoveredHighVelocity1}
                        setIsHoveredHighVelocity={setIsHoveredHighVelocity1}
                        index={index}
                        type="twitter"
                      />
                    );
                  }
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
