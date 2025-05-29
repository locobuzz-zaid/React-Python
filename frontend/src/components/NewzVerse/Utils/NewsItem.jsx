import React, { useState } from "react";
import { Typography, Card, Tag, Avatar, Space, Tooltip, Popover } from "antd";
import twitterCircleIcon from "../../../assets/Dashboard/twitter_circle_icon.svg";
import linkedinCircleIcon from "../../../assets/Dashboard/linkedin_circle_icon.png";
import newsArticleIcon from "../../../assets/Dashboard/news_article_icon.svg";
import nvScoreIcon from "../../../assets/Dashboard/nv_score_icon.svg";
import articleIconDividerIcon from "../../../assets/Dashboard/divider_icon.svg";
import shareEmailIcon from "../../../assets/Dashboard/share_email_icon.svg";
import missInfoIcon from "../../../assets/Dashboard/miss_info_icon.svg";
import markImportantIcon from "../../../assets/Dashboard/mark_important_icon.svg";
import markIrrelavantIcon from "../../../assets/Dashboard/mark_irrelavant_icon.svg";

import makredMissInfoIcon from "../../../assets/Dashboard/marked_miss_info_icon.svg";
import markedImportantIcon from "../../../assets/Dashboard/marked_important_icon.svg";
import markedIrrelavantIcon from "../../../assets/Dashboard/marked_irrelavant_icon.svg";
import misInfoOutline from "../../../assets/Dashboard/mis_info_outline.svg";

import twitterSquareIcon from "../../../assets/Dashboard/twitter_square_icon.svg";
import linkedinSquareIcon from "../../../assets/Dashboard/linkedin_square_icon.svg";
import newsArticleSquareIcon from "../../../assets/Dashboard/news_article_square_icon.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardDeepDiveLevel,
  setDashboardsData,
} from "../../../redux/actions/NewzVerse/NewzVerse";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardDataAPI,
  setDashboardActionsAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import defaultProfileImage from "../../../assets/Pages/default_profile_img.png";
import { formatRelativeTime, kFormatter } from "../../../redux/constants";
import openPostIcon from "../../../assets/Dashboard/open_post_url_icon.svg";
import { getDashboardGlobalBrands } from "../../../redux/constants/NewzVerseConst";

const { Text } = Typography;

const NewsItem = ({
  title,
  themes,
  ai_profiles,
  impact_score,
  channel_breakdown,
  interactions,
  isHovered,
  setIsHovered,
  index,
  ai_cluster_key,
  is_misinformation,
  is_important,
  is_irrelevant,
  misinformation_update_by,
  brandid,
  darkcolour,
  lightcolor,
  date,
  description,
  is_misinformation_reason,
  mis_information_updated_by_user,
}) => {
  const dispatch = useDispatch();
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  const dashboardDeepDiveLevel = useSelector(
    (state) => state?.NewzVerse?.dashboard_deep_dive_level
  );
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  let p_token = localStorage.getItem("p_token");

  const handleNewsEventDeepDive = (level, ai_cluster_key) => {
    dispatch(setDashboardDeepDiveLevel(level));

    // Update the article_event_name_list in the dashboardsData
    let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
      if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
        dashboard.selected_cluster_data = {
          ai_cluster_key: ai_cluster_key,
          ai_cluster_name: title,
        };
      }
      return dashboard;
    });
    dispatch(setDashboardsData(updatedDashboardsData));

    // Api Calls

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
        brand_list: [{ brand_id: brandid }],
        start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
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
  };

  const handleDashboardAction = (action_type, ai_cluster_key) => {
    // console.log("Dashboard =>", action_type, dashboardsData);

    // Update the article_event_name_list in the dashboardsData
    let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
      if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
        dashboard.key_news = [];
      }
      return dashboard;
    });
    dispatch(setDashboardsData(updatedDashboardsData));

    let global_brands = getDashboardGlobalBrands(
      dashboardsData,
      dashboardBrandsList,
      dashboardActiveKey
    );
    let payloadObj = {
      p_token: p_token ? p_token : null,
      action_type:
        action_type === "Share"
          ? 1
          : action_type === "Misinformation"
          ? 2
          : action_type === "Irrelevant"
          ? 3
          : action_type === "Important"
          ? 4
          : 1,
      action_value:
        action_type === "Share"
          ? 1
          : action_type === "Misinformation"
          ? is_misinformation === 1
            ? 0
            : 1
          : action_type === "Important"
          ? is_important === 1
            ? 0
            : 1
          : action_type === "Irrelevant"
          ? is_irrelevant === 1
            ? 0
            : 1
          : null,
      ai_cluster_key: ai_cluster_key,
      dashboardsData: dashboardsData,
      dashboard_type: dashboardActiveKey + 1,
      brand_list: global_brands,
      start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
      end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
      filters: [],
      widget_id: "1.1",
      dashboardsData: dashboardsData,
      offset: 0,
      dashboard_filters: [{ attribute: "theme_id", values: [] }],
    };
    dispatch(setDashboardActionsAPI(payloadObj));
  };

  let brand_obj = dashboardBrandsList.find(
    (brand) => brand.brand_id === brandid
  );

  const profileCardContent = (
    <div
      className="custom-scrollbar"
      id="style-1"
      style={{ width: 260, padding: 10, height: 300, overflowY: "auto" }}
    >
      {ai_profiles?.map((profile, index) => {
        return (
          <div
            style={{
              marginTop: -10,
              marginBottom: 10,
              borderBottom: "1px solid #f0f0fa",
              padding: "10px 0",
            }}
            key={index}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <img
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "20px",
                    border: "1px solid #f0f0fa",
                  }}
                  src={
                    profile?.picurl !== "" &&
                    profile?.picurl !== "NA" &&
                    profile?.picurl !== null &&
                    profile?.picurl
                      ? profile?.picurl
                      : defaultProfileImage
                  }
                />
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#444746",
                      width: "200px",
                    }}
                  >
                    <div>
                      {profile?.authorname}{" "}
                      {/* {type === "Linkedin" && linkedinVerified ? (
                      <img src={twitterVerifiedIcon} />
                    ) : type === "Twitter" && verified ? (
                      <img src={twitterVerifiedIcon} />
                    ) : (
                      ""
                    )} */}
                    </div>
                    <span
                      key={index}
                      style={{ cursor: "pointer", float: "right" }}
                    >
                      <a
                        href={profile?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          style={{ width: "18px", height: "18px" }}
                          src={openPostIcon}
                        />
                      </a>
                    </span>
                  </div>
                  <span style={{ color: "#747775", marginTop: "-130px" }}>
                    {profile?.screenname}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <Text strong>{kFormatter(profile?.followerscount)}</Text>{" "}
              <Text type="secondary">Followers</Text>{" "}
              <Text strong>{kFormatter(profile?.followingcount)}</Text>{" "}
              <Text type="secondary">Following</Text>
            </div>
          </div>
        );
      })}
    </div>
  );

  const formatedDate = formatRelativeTime(date);

  let dynamic_count = dashboardDeepDiveLevel === 2 ? 10 : 1;

  return (
    <Card
      key={index}
      className="news-card-container"
      style={{
        padding: "0px",
        cursor: "pointer",
        marginBottom: 22,
        backgroundColor:
          (is_misinformation > 0 && misinformation_update_by === -1) ||
          (is_misinformation > 0 && misinformation_update_by >= 0)
            ? "#FFEDED"
            : isHovered?.flag && isHovered?.index === index
            ? "#F5F7FA"
            : "white",
        border:
          ((is_misinformation > 0 && misinformation_update_by === -1) ||
            (is_misinformation > 0 && misinformation_update_by >= 0)) &&
          isHovered?.flag &&
          isHovered?.index === index
            ? "1px solid rgba(244, 67, 54, 0.70)"
            : "",
        boxShadow:
          ((is_misinformation > 0 && misinformation_update_by === -1) ||
            (is_misinformation > 0 && misinformation_update_by >= 0)) &&
          isHovered?.flag &&
          isHovered?.index === index
            ? "0px 0px 6px 0px rgba(255, 0, 0, 0.24)"
            : "",
      }}
      onMouseEnter={() => setIsHovered({ flag: true, index: index })}
      onMouseLeave={() => setIsHovered({ flag: false, index: null })}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "space-between",
        }}
      >
        <Text onClick={() => handleNewsEventDeepDive(3, ai_cluster_key)}>
          {title ? title : description}
          <span
            type="secondary"
            style={{
              color: "#707070",
              marginLeft: "10px",
              marginTop: "2px",
              fontSize: "12px",
            }}
          >
            <span style={{ color: "grey" }}>•</span>
            {formatedDate}
          </span>
        </Text>{" "}
        <span style={{ marginRight: "-10px" }}>
          {/* Mis Information Icon */}
          {is_misinformation > 0 && misinformation_update_by === -1 ? (
            <>
              <Tooltip
                overlayClassName="misinformation-tooltip"
                title={
                  <div className="misinformation-tooltip-content">
                    <div className="misinformation-tooltip-header">
                      <img
                        style={{
                          marginTop: "0px",
                          width: "18px",
                          height: "18px",
                        }}
                        src={makredMissInfoIcon}
                      />
                      <strong>Reason for Potential Misinformation</strong>
                    </div>
                    <div className="misinformation-tooltip-body">
                      {is_misinformation_reason}
                    </div>
                  </div>
                }
                placement="top"
              >
                {/* <img
                  style={{
                    marginTop: "-3px",
                    width: "18px",
                    height: "18px",
                    marginRight: "10px",
                  }}
                  src={makredMissInfoIcon}
                /> */}
                <Tag color="red" style={{ fontSize: "8px" }}>
                  <img
                    src={misInfoOutline}
                    style={{ marginRight: "3px", marginTop: "-1px" }}
                  />
                  Potential Misinformation
                </Tag>
              </Tooltip>
            </>
          ) : is_misinformation > 0 && misinformation_update_by >= 0 ? (
            <>
              <Tooltip
                overlayClassName="misinformation-tooltip"
                title={
                  <div className="misinformation-tooltip-content">
                    <div className="misinformation-tooltip-header">
                      <img
                        style={{
                          marginTop: "0px",
                          width: "18px",
                          height: "18px",
                        }}
                        src={makredMissInfoIcon}
                      />
                      <strong>Reason for Misinformation</strong>
                    </div>
                    <div className="misinformation-tooltip-body">
                      {mis_information_updated_by_user}
                      has marked it as Misinformation
                    </div>
                  </div>
                }
                placement="top"
              >
                {/* <img
                  style={{
                    marginTop: "-3px",
                    width: "18px",
                    height: "18px",
                    marginRight: "10px",
                  }}
                  src={makredMissInfoIcon}
                /> */}
                <Tag color="red" style={{ fontSize: "8px" }}>
                  <img
                    src={misInfoOutline}
                    style={{ marginRight: "3px", marginTop: "-1px" }}
                  />
                  Misinformation
                </Tag>
              </Tooltip>
            </>
          ) : (
            ""
          )}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <div style={{ display: "block", width: "75%" }}>
          {/* Themes */}
          <span>
            {themes?.length
              ? themes?.map((tag, index) => {
                  if (index < dynamic_count)
                    return (
                      <Tag
                        key={tag?.theme_id}
                        style={{
                          background: tag?.lightcolor,
                          fontSize: "10px",
                          // marginLeft: index === 1 ? "-10px" : "",
                        }}
                      >
                        <span style={{ color: tag?.darkcolour }}>•</span>{" "}
                        {tag.theme_name ? tag.theme_name : tag}
                      </Tag>
                    );
                })
              : ""}
          </span>{" "}
          <span style={{ marginLeft: "10px" }}>
            {dynamic_count < 2 && themes?.length - 1 > 0 ? (
              <span
                style={{
                  background: "#f3f3f3",
                  padding: "5px",
                  borderRadius: "20px",
                  width: "10px",
                  height: "10px",
                  fontSize: "10px",
                  marginLeft: "-15px",
                }}
              >
                +{themes?.length - 1}
              </span>
            ) : (
              <span
                style={{
                  marginLeft: "-20px",
                }}
              ></span>
            )}
          </span>
          <img
            src={articleIconDividerIcon}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          />
          {/* Nv Score */}
          <Tooltip
            overlayClassName="custom-tooltip"
            title="The NV Score measures the impact and credibility of a news event using a weighted blend of brand relevance, media authority, misinformation risk, sentiment, and thematic intensity."
            overlayInnerStyle={{
              backgroundColor: "#707985",
              color: "#fff",
              fontSize: "12px",
            }}
          >
            <span
              style={{ fontWeight: "500", fontSize: "12px", color: "#407BFF" }}
            >
              NV Score{" "}
            </span>
            <img style={{ width: "14px", height: "14px" }} src={nvScoreIcon} />
            <Text
              style={{
                fontSize: "12px",
                marginLeft: "2px",
                fontWeight: "600",
                color: "#407BFF",
              }}
            >
              {impact_score}
            </Text>
          </Tooltip>
          {/* Hover Start */}
          {isHovered?.flag && isHovered?.index === index ? (
            <>
              <img
                src={articleIconDividerIcon}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              />
              {/* Channels */}
              {channel_breakdown?.map((d) => {
                if (d?.channel_group_id === 1)
                  return (
                    <>
                      <Tooltip
                        overlayClassName="custom-tooltip"
                        title="X Tweets"
                        overlayInnerStyle={{
                          backgroundColor: "#707985",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      >
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
                            fontSize: "12px",
                            marginLeft: "0px",
                            fontWeight: "600",
                          }}
                        >
                          {d?.article_count ? d?.article_count : 0}
                        </Text>
                      </Tooltip>
                    </>
                  );
                if (d?.channel_group_id === 5)
                  return (
                    <>
                      <Tooltip
                        overlayClassName="custom-tooltip"
                        title="Linkedin Posts"
                        overlayInnerStyle={{
                          backgroundColor: "#707985",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      >
                        <img
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "3px",
                            marginLeft: "5px",
                            marginRight: "5px",
                          }}
                          src={linkedinSquareIcon}
                        />
                        <Text
                          style={{
                            fontSize: "12px",
                            marginLeft: "2px",
                            fontWeight: "600",
                          }}
                        >
                          {d?.article_count ? d?.article_count : 0}
                        </Text>
                      </Tooltip>
                    </>
                  );
                if (d?.channel_group_id === 19)
                  return (
                    <>
                      <Tooltip
                        overlayClassName="custom-tooltip"
                        title="News Articles"
                        overlayInnerStyle={{
                          backgroundColor: "#707985",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      >
                        <img
                          style={{
                            width: "14px",
                            height: "14px",
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
                            fontSize: "12px",
                            marginLeft: "0px",
                            fontWeight: "600",
                          }}
                        >
                          {d?.article_count ? d?.article_count : 0}
                        </Text>
                      </Tooltip>
                    </>
                  );
              })}
              <img
                src={articleIconDividerIcon}
                style={{ marginLeft: "12px", marginRight: "8px" }}
              />
              {/* Profiles */}
              {ai_profiles?.length ? (
                <>
                  <Popover
                    content={profileCardContent}
                    placement="right"
                    mouseEnterDelay={0.2}
                  >
                    {ai_profiles?.map((profile, idx) => {
                      if (idx < 2)
                        return (
                          <>
                            <img
                              key={idx}
                              src={
                                profile?.picurl !== "" &&
                                profile?.picurl !== "NA" &&
                                profile?.picurl !== null &&
                                profile?.picurl
                                  ? profile?.picurl
                                  : defaultProfileImage
                              }
                              style={{
                                borderRadius: "50%",
                                width: "15px",
                                height: "15px",
                                marginLeft:
                                  idx === 0
                                    ? "5px"
                                    : idx === 1
                                    ? "-5px"
                                    : "0px",
                              }}
                            />
                          </>
                        );
                    })}
                  </Popover>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {/* Hover End */}
        </div>

        {/* On Hover icons */}
        {isHovered?.flag && isHovered?.index === index ? (
          <Space
            style={{
              background: "#94A3B82E",
              marginLeft: "auto",
              float: "right",
              marginTop: "5px",
              borderRadius: "12px",
              padding: "0px 10px",
            }}
          >
            <Tooltip
              overlayClassName="custom-tooltip"
              title={"Share"}
              overlayInnerStyle={{
                backgroundColor: "#707985",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              <span
                onClick={() => handleDashboardAction("Share", ai_cluster_key)}
                key={index}
                style={{ cursor: "pointer" }}
              >
                <img
                  style={{ marginTop: "-3px", width: "18px", height: "18px" }}
                  src={shareEmailIcon}
                />
              </span>
            </Tooltip>
            <Tooltip
              overlayClassName="custom-tooltip"
              title={
                is_misinformation
                  ? "Mark as Information"
                  : "Mark as Misinformation"
              }
              overlayInnerStyle={{
                backgroundColor: "#707985",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              <span
                onClick={() =>
                  handleDashboardAction("Misinformation", ai_cluster_key)
                }
                key={index}
                style={{ cursor: "pointer" }}
              >
                {is_misinformation ? (
                  <img
                    style={{ marginTop: "-3px", width: "18px", height: "18px" }}
                    src={makredMissInfoIcon}
                  />
                ) : (
                  <img
                    style={{ marginTop: "-3px", width: "18px", height: "18px" }}
                    src={missInfoIcon}
                  />
                )}
              </span>
            </Tooltip>
            {is_irrelevant ? (
              ""
            ) : (
              <Tooltip
                overlayClassName="custom-tooltip"
                title={is_important ? "Not Important" : "Important"}
                overlayInnerStyle={{
                  backgroundColor: "#707985",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                <span
                  onClick={() =>
                    handleDashboardAction("Important", ai_cluster_key)
                  }
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  {is_important ? (
                    <img
                      style={{
                        marginTop: "-3px",
                        width: "18px",
                        height: "18px",
                      }}
                      src={markedImportantIcon}
                    />
                  ) : (
                    <img
                      style={{
                        marginTop: "-3px",
                        width: "18px",
                        height: "18px",
                      }}
                      src={markImportantIcon}
                    />
                  )}
                </span>
              </Tooltip>
            )}
            {is_important ? (
              ""
            ) : (
              <Tooltip
                overlayClassName="custom-tooltip"
                title={is_irrelevant ? "Relevant" : "Irrelevant"}
                overlayInnerStyle={{
                  backgroundColor: "#707985",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                <span
                  onClick={() =>
                    handleDashboardAction("Irrelevant", ai_cluster_key)
                  }
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  {is_irrelevant ? (
                    <img
                      style={{
                        marginTop: "-3px",
                        width: "18px",
                        height: "18px",
                      }}
                      src={markedIrrelavantIcon}
                    />
                  ) : (
                    <img
                      style={{
                        marginTop: "-3px",
                        width: "18px",
                        height: "18px",
                      }}
                      src={markIrrelavantIcon}
                    />
                  )}
                </span>
              </Tooltip>
            )}
          </Space>
        ) : (
          <span style={{ float: "right" }}>
            <div
              style={{
                border: "1px solid #f0f0fa",
                padding: "2px 8px 2px 8px",
                borderRadius: "12px",
              }}
            >
              <img
                src={brand_obj?.brand_logo}
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
                alt="brand logo"
              />
              <span style={{ fontSize: "10px", color: "#222" }}>
                {brand_obj?.brand_name}
              </span>
            </div>
          </span>
        )}
      </div>
    </Card>
  );
};

export default NewsItem;
