import React, { useEffect, useState } from "react";
import { Pagination, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardAnalyticsDeepDiveAPI,
  getDashboardDataAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import { setDashboardsData } from "../../../redux/actions/NewzVerse/NewzVerse";
import { getDashboardGlobalBrands } from "../../../redux/constants/NewzVerseConst";

const CustomPagination = ({ type }) => {
  const dispatch = useDispatch();
  const dashboardDeepDiveLevel = useSelector(
    (state) => state?.NewzVerse?.dashboard_deep_dive_level
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
  // console.log("dashboardsData", dashboardsData?.[dashboardActiveKey]);

  let p_token = localStorage.getItem("p_token");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const total =
    type === "Linkedin"
      ? dashboardsData?.[dashboardActiveKey]?.linkedin_news_list?.no_of_cards
      : type === "Twitter"
      ? dashboardsData?.[dashboardActiveKey]?.twitter_news_list?.no_of_cards
      : dashboardDeepDiveLevel === 2 &&
        dashboardsData?.[dashboardActiveKey]?.key_news_list?.no_of_cards
      ? dashboardsData?.[dashboardActiveKey]?.key_news_list?.no_of_cards
      : dashboardDeepDiveLevel === 3 &&
        dashboardsData?.[dashboardActiveKey]?.article_data_list?.no_of_cards
      ? dashboardsData?.[dashboardActiveKey]?.article_data_list?.no_of_cards
      : dashboardDeepDiveLevel === 5 &&
        dashboardsData?.[dashboardActiveKey]?.high_velocity_news_list
          ?.no_of_cards
      ? dashboardsData?.[dashboardActiveKey]?.high_velocity_news_list
          ?.no_of_cards
      : dashboardDeepDiveLevel === 6 &&
        dashboardsData?.[dashboardActiveKey]?.deep_dive?.no_of_cards
      ? dashboardsData?.[dashboardActiveKey]?.deep_dive?.no_of_cards
      : 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [dashboardsData?.[dashboardActiveKey]?.selected_theme_data]);

  const handleChange = (page) => {
    setCurrentPage(page);

    let global_brands = getDashboardGlobalBrands(
      dashboardsData,
      dashboardBrandsList,
      dashboardActiveKey
    );

    if (dashboardDeepDiveLevel === 6) {
      let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
        if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
          dashboard.deep_dive.data = [];
        }
        return dashboard;
      });
      dispatch(setDashboardsData(updatedDashboardsData));

      let payloadObj = dashboardsData?.[dashboardActiveKey]?.deep_dive?.payload;
      payloadObj.offset = (page - 1) * 10;

      dispatch(getDashboardAnalyticsDeepDiveAPI(payloadObj));
    } else {
      let updatedWidgetId =
        type === "Linkedin"
          ? "1.4"
          : type === "Twitter"
          ? "1.5"
          : dashboardDeepDiveLevel === 5
          ? "1.2"
          : dashboardDeepDiveLevel === 2
          ? "2.1"
          : dashboardDeepDiveLevel === 3
          ? "3.3"
          : "";
      let updatedFilters =
        type === "Linkedin"
          ? []
          : type === "Twitter"
          ? []
          : dashboardDeepDiveLevel === 5
          ? []
          : dashboardDeepDiveLevel === 2
          ? [
              ...dashboardsData?.[dashboardActiveKey]
                ?.applied_dashboard_filters,
              {
                attribute: "theme_id",
                values:
                  dashboardsData?.[dashboardActiveKey]?.selected_theme_data
                    ?.theme_id === 0
                    ? []
                    : [
                        dashboardsData?.[dashboardActiveKey]
                          ?.selected_theme_data?.theme_id,
                      ],
              },
            ]
          : dashboardDeepDiveLevel === 3
          ? [
              ...dashboardsData?.[dashboardActiveKey]
                ?.applied_dashboard_filters,
              {
                attribute: "theme_id",
                values: [],
              },
              {
                attribute: "ai_cluster_key",
                values: [
                  dashboardsData?.[dashboardActiveKey]?.selected_cluster_data
                    ?.ai_cluster_key,
                ],
              },
            ]
          : [];

      let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
        if (
          dashboard?.dashboard_type === dashboardActiveKey + 1 &&
          type === "Linkedin"
        ) {
          dashboard.linkedin_news_list.data = [];
        } else if (
          dashboard?.dashboard_type === dashboardActiveKey + 1 &&
          type === "Twitter"
        ) {
          dashboard.twitter_news_list.data = [];
        } else if (
          dashboard?.dashboard_type === dashboardActiveKey + 1 &&
          dashboardDeepDiveLevel === 5
        ) {
          dashboard.high_velocity_news_list.data = [];
        } else if (
          dashboard?.dashboard_type === dashboardActiveKey + 1 &&
          dashboardDeepDiveLevel === 2
        ) {
          dashboard.key_news_list.data = [];
        } else if (
          dashboard?.dashboard_type === dashboardActiveKey + 1 &&
          dashboardDeepDiveLevel === 3
        ) {
          dashboard.article_data_list.data = [];
        }
        return dashboard;
      });
      dispatch(setDashboardsData(updatedDashboardsData));

      let payloadObj = {
        p_token: p_token ? p_token : null,
        brand_list: global_brands,
        start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
        end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
        filters: [],
        dashboard_type: dashboardActiveKey + 1,
        dashboardsData: dashboardsData,
        widget_id: updatedWidgetId,
        dashboard_filters: updatedFilters,
        offset: (page - 1) * 10,
        rows: 10,
      };
      dispatch(getDashboardDataAPI(payloadObj));
    }
  };

  // console.log("currentPage", currentPage, "pageSize", pageSize);
  const start = currentPage * 10 - 9;
  const end = currentPage * 10 < total ? currentPage * 10 : total;
  // console.log("start", start, "end", end, "total", total);

  return (
    <>
      {total > 0 && (
        <Row
          justify="space-between"
          align="middle"
          style={{ padding: "16px 24px" }}
        >
          <Col style={{ color: "#5A5A5A" }}>
            <span
              style={{ fontSize: 14 }}
            >{`Showing ${start}-${end} of ${total} results`}</span>
          </Col>

          <Col>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={handleChange}
              showSizeChanger={false}
              showQuickJumper={false}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default CustomPagination;
