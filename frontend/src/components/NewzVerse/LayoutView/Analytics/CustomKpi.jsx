import React, { useRef } from "react";
import "./CustomKpi.css";
import InfoIcon from "../../../../assets/Dashboard/kpi_info_icon.svg";
import FinanceAndInvestmentsIcon from "../../../../assets/Dashboard/Kpi/Finance_&_Investments_icon.svg";
import ShareMktDynamicsIcon from "../../../../assets/Dashboard/Kpi/Share_Mkt_Dynamics_icon.svg";
import NewProductsAndServicesIcon from "../../../../assets/Dashboard/Kpi/New_Products_&_Services_icon.svg";
import FraudsAndBreachesIcon from "../../../../assets/Dashboard/Kpi/Frauds_&_Breaches_icon.svg";
import TechAndInnovationsIcon from "../../../../assets/Dashboard/Kpi/Tech_&_Innovations_icon.svg";
import WorkforceAndHRIcon from "../../../../assets/Dashboard/Kpi/Workforce_&_HR_icon.svg";
import CSRIcon from "../../../../assets/Dashboard/Kpi/CSR_icon.svg";
import MergersAndAcquisitionsIcon from "../../../../assets/Dashboard/Kpi/Mergers_&_Acquisitions_icon.svg";
import SustainabilityAndESGIcon from "../../../../assets/Dashboard/Kpi/Sustainability_&_ESG_icon.svg";
import KeyPeopleIcon from "../../../../assets/Dashboard/Kpi/Key_People_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardDeepDiveLevel } from "../../../../redux/actions/NewzVerse/NewzVerse";
import { getDashboardGlobalBrands } from "../../../../redux/constants/NewzVerseConst";
import {
  callNotification,
  getWindowLocationPath,
} from "../../../../redux/constants";
import { getDashboardAnalyticsDeepDiveAPI } from "../../../../redux/actions/NewzVerse/NewzVerseAPI";
import { setOptionHighChart } from "../../../../redux/actions/HighChart";
import { Tooltip } from "antd";
import LeftIcon from "../../../../assets/left-arrow.png";
import RightIcon from "../../../../assets/right-arrow.png";

const scrollAmount = 500;

const CustomKpi = ({ data = [], selectedMenu }) => {
  const dispatch = useDispatch();
  const scrollRef = useRef();

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

  let KPIdive = true;

  const handleKpiDeepdive = (data) => {
    // console.log("data", data);
    if (data?.value > 0 && data?.value !== null) {
      // Enable Deep Dive Component
      dispatch(setDashboardDeepDiveLevel(6));

      let global_brands = getDashboardGlobalBrands(
        dashboardsData,
        dashboardBrandsList,
        dashboardActiveKey
      );

      let graphObject = {
        dashboard_type: dashboardActiveKey + 1,
        dashboardsData: dashboardsData,
        p_token: p_token ? p_token : null,
        start_date: dashboardsData[dashboardActiveKey]?.duration?.start_date,
        end_date: dashboardsData[dashboardActiveKey]?.duration?.end_date,
        brand_list: global_brands,
        deep_dive_on: {
          // x_axis: {
          //   attribute: data?.attribute,
          //   value: KPIdive
          //     ? data?.value
          //     : data?.text?.includes("|$|")
          //     ? data?.text?.split("|$|")?.[1]?.trim()
          //     : data?.text?.includes("|G|")
          //     ? data?.text?.split("|G|")?.[1]?.trim()
          //     : data?.text?.includes("|C|")
          //     ? data?.text?.split("|C|")?.[1]?.trim()
          //     : data?.text,
          //   trace_name: KPIdive ? data?.text : allAttributes[data?.attribute],
          // },
          x_axis: null,
          y_series: data?.y_series
            ? {
                ...data?.y_series,
                value: data?.value,
                trace_name: data?.y_series?.trace_name
                  ? data?.y_series?.trace_name
                  : "",
              }
            : null,
        },
        filters: data?.filters ? data?.filters : [],
        filter_by: null,
        utcoffset: -330,
      };
      // console.log("graphObject", graphObject);
      dispatch(getDashboardAnalyticsDeepDiveAPI(graphObject));

      dispatch(setOptionHighChart(null));
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const kpiSummaryList = dashboardsData[dashboardActiveKey]?.kpi_news
    ?.filter((item) => item?.brand_id)
    ?.map((item) => {
      const matchedBrand = dashboardBrandsList?.find(
        (brand) => brand?.brand_id === item?.brand_id
      );
      return {
        brandId: matchedBrand?.brand_id ?? null,
        brandName: matchedBrand?.brand_name ?? "",
        brandLogo: matchedBrand?.brand_logo ?? "",
        isCompetitor: matchedBrand?.is_competitor ?? null,
        totalEvents: item?.total_events ?? 0,
        totalArticles: item?.total_articles ?? 0,
        misInfoPercent: item?.misinfo_percent ?? 0,
        crisisIndicator: item?.crisis_indicator ?? "",
        percentChange: item?.percent_change ?? 0,
        trendingThemes: item?.trending_themes ?? [],
      };
    });
  const kpiData = dashboardsData[dashboardActiveKey]?.kpi_news?.length
    ? kpiSummaryList
    : data;

  const isCarousel = kpiSummaryList?.length > 3;

  return (
    <>
      {dashboardActiveKey === 1 ? (
        <div
          style={{
            marginTop: selectedMenu === "1" ? "" : "20px",
            marginBottom: selectedMenu === "1" ? "" : "20px",
            position: "relative",
          }}
          className="custom-kpi-wrapper"
        >
          {isCarousel && (
            <img
              src={LeftIcon}
              alt="left"
              className="carousel-arrow left-arrow"
              onClick={() => handleScroll("left")}
            />
          )}
          <div className="custom-kpi-scroll-container" ref={scrollRef}>
            {(kpiSummaryList && kpiSummaryList.length > 0
              ? kpiSummaryList
              : data
            ).map((item, index) => {
              if (kpiSummaryList && kpiSummaryList.length > 0) {
                return (
                  <div
                    style={{ flex: "0 0 auto" }}
                    className="custom-kpi-card"
                    key={index}
                    onClick={() => handleKpiDeepdive(item)}
                  >
                    <div className="custom-kpi-brand-header">
                      <img
                        src={item.brandLogo}
                        alt={item.brandName}
                        className="brand-logo"
                      />
                      <span className="brand-name">{item.brandName}</span>
                      {/* <span
                  className="change-indicator"
                  style={{
                    backgroundColor:
                      item.percentChange >= 0 ? "#f7fcec" : "#f9f0f0",
                    color: item.percentChange >= 0 ? "#4caf50" : "#f44336",
                  }}
                >
                  {item.percentChange >= 0
                    ? `+${item.percentChange}%`
                    : `${item.percentChange}%`}
                </span> */}
                    </div>

                    <div className="kpi-stats">
                      <div className="kpi-attribute">
                        <span className="kpi-label">Total Events</span>
                        <div className="kpi-inline-value">
                          <span className="kpi-value">{item.totalEvents}</span>
                          <span
                            className="change-indicator"
                            style={{
                              // backgroundColor:
                              //   item.percentChange >= 0 ? "#f7fcec" : "#f9f0f0",
                              color:
                                item.percentChange >= 0 ? "#4caf50" : "#f44336",
                            }}
                          >
                            {item.percentChange >= 0
                              ? `+${item.percentChange}%`
                              : `${item.percentChange}%`}
                          </span>
                        </div>
                        <span className="kpi-subtext">
                          &nbsp;from{" "}
                          <strong>{item.totalArticles} articles</strong>
                        </span>
                      </div>

                      <div className="kpi-attribute">
                        <div className="kpi-label">Misinformation</div>
                        <div className="kpi-value">{item.misInfoPercent}%</div>
                      </div>
                      <div className="kpi-attribute-last">
                        <span className="kpi-label">Crisis Indicator</span>
                        <span className="crisis-status">
                          {item.crisisIndicator}
                        </span>
                      </div>
                    </div>

                    <div className="kpi-trending-themes">
                      <span className="kpi-label">Trending Themes</span>
                      <div className="theme-tags">
                        {item.trendingThemes?.slice(0, 2).map((theme, idx) => (
                          <span
                            key={idx}
                            className="theme-tag"
                            style={{ backgroundColor: theme.themecolour }}
                          >
                            {theme.top_themes} ({theme.articles})
                          </span>
                        ))}
                        {item.trendingThemes?.length > 2 && (
                          <span className="theme-tag">
                            +{item.trendingThemes.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    style={{ flex: "0 0 auto" }}
                    className="custom-kpi-card"
                    key={index}
                    onClick={() => handleKpiDeepdive(item)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="custom-kpi-card-text">{item.text}</div>
                      <div
                        className="custom-kpi-card-percentage"
                        style={{
                          background:
                            parseFloat(item?.percent_change) < 0
                              ? "#FFEBEE"
                              : "#F7FCEC",
                          color:
                            parseFloat(item?.percent_change) < 0
                              ? "#F44336"
                              : "#4CAF50",
                        }}
                      >
                        {item?.percent_change}%
                      </div>
                    </div>
                    <div
                      className="custom-kpi-card-value"
                      style={{
                        color:
                          item?.text_color === "#FFFFFF"
                            ? "#000"
                            : item?.text_color
                            ? item?.text_color
                            : "#000",
                        fontWeight: item.text === "Trending Theme" ? "400" : "",
                        fontSize: item.text === "Trending Theme" ? "12px" : "",
                        fontFamily:
                          item.text === "Trending Theme" ? "Noto Sans" : "",
                      }}
                    >
                      {item.text === "Trending Theme" ? (
                        <span
                          style={{
                            background: item?.text_bg_color || "",
                            borderRadius: "6px",
                            padding: "2px 6px",
                            display: "inline-block",
                          }}
                        >
                          {/* Add icon logic here if needed */}
                          {item.value}
                        </span>
                      ) : (
                        item.value
                      )}
                    </div>
                    <div className="custom-kpi-card-sub-text">
                      <div>
                        <span className="custom-kpi-card-sub-text-1">
                          {item.sub_text?.split("|$|")?.[0]}
                        </span>
                        <span className="custom-kpi-card-sub-text-2">
                          {" "}
                          {item.sub_text?.split("|$|")?.[1]}
                        </span>
                      </div>
                      <div>
                        {item?.info_icon ? (
                          <Tooltip title={item?.info_text}>
                            <img src={InfoIcon} />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          {isCarousel && (
            <img
              src={RightIcon}
              alt="right"
              className="carousel-arrow right-arrow"
              onClick={() => handleScroll("right")}
            />
          )}
        </div>
      ) : (
        <div
          style={{
            marginTop: selectedMenu === "1" ? "" : "20px",
            marginBottom: selectedMenu === "1" ? "" : "20px",
          }}
          className="custom-kpi-wrapper"
        >
          {data?.map((item, index) => (
            <div
              style={{ flex: "1 1 calc(20% - 16px)" }}
              className="custom-kpi-card"
              key={index}
              onClick={() => handleKpiDeepdive(item)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="custom-kpi-card-text">{item.text}</div>
                {/* <div
                  className="custom-kpi-card-percentage"
                  // style={{ background: "#F7FCEC", color: "#4CAF50" }}
                  style={{
                    background:
                      parseFloat(item?.percent_change) < 0
                        ? "#FFEBEE"
                        : "#F7FCEC",
                    color:
                      parseFloat(item?.percent_change) < 0
                        ? "#F44336"
                        : "#4CAF50",
                  }}
                >
                  {item?.percent_change}%
                </div> */}
              </div>
              <div
                className="custom-kpi-card-value"
                style={{
                  display: "flex",
                  color:
                    item?.text_color === "#FFFFFF"
                      ? "#000"
                      : item?.text_color
                      ? item?.text_color
                      : "#000",
                  fontWeight: item.text === "Trending Theme" ? "400" : "",
                  fontSize: item.text === "Trending Theme" ? "12px" : "",
                  fontFamily: item.text === "Trending Theme" ? "Noto Sans" : "",
                }}
              >
                {item.text === "Trending Theme" ? (
                  <span
                    style={{
                      background: item?.text_bg_color || "",
                      borderRadius: "6px",
                      padding: "2px 6px",
                      display: "inline-block",
                    }}
                  >
                    {item.value === "Finance & Investments" ? (
                      <img src={FinanceAndInvestmentsIcon} />
                    ) : item.value === "Share Market Dynamics" ? (
                      <img src={ShareMktDynamicsIcon} />
                    ) : item.value === "New Products & Services" ? (
                      <img src={NewProductsAndServicesIcon} />
                    ) : item.value === "Frauds & Breaches" ? (
                      <img src={FraudsAndBreachesIcon} />
                    ) : item.value === "Tech & Innovations" ? (
                      <img src={TechAndInnovationsIcon} />
                    ) : item.value === "Workforce & HR" ? (
                      <img src={WorkforceAndHRIcon} />
                    ) : item.value ===
                      "Corporate Social Responsibility (CSR)" ? (
                      <img src={CSRIcon} />
                    ) : item.value === "Mergers & Acquisitions" ? (
                      <img src={MergersAndAcquisitionsIcon} />
                    ) : item.value === "Sustainability & ESG" ? (
                      <img src={SustainabilityAndESGIcon} />
                    ) : item.value === "Key People" ? (
                      <img src={KeyPeopleIcon} />
                    ) : (
                      ""
                    )}
                    {item.value}
                  </span>
                ) : (
                  item.value
                )}
                <div
                  className="custom-kpi-card-percentage"
                  // style={{ background: "#F7FCEC", color: "#4CAF50" }}
                  style={{
                    background:
                      parseFloat(item?.percent_change) < 0
                        ? "#FFEBEE"
                        : "#F7FCEC",
                    color:
                      parseFloat(item?.percent_change) < 0
                        ? "#F44336"
                        : "#4CAF50",
                  }}
                >
                  {item?.percent_change}%
                </div>
              </div>
              <div className="custom-kpi-card-sub-text">
                <div>
                  <span className="custom-kpi-card-sub-text-1">
                    {item.sub_text?.split("|$|")?.[0]}
                  </span>
                  <span className="custom-kpi-card-sub-text-2">
                    {" "}
                    {item.sub_text?.split("|$|")?.[1]}
                  </span>
                </div>
                <div>
                  {item?.info_icon ? (
                    <Tooltip title={item?.info_text}>
                      <img src={InfoIcon} />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CustomKpi;
