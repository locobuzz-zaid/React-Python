import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import {
  format,
  addMonths,
  subMonths,
  startOfDay,
  endOfDay,
  subDays,
  startOfYear,
  endOfYear,
} from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardDataAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardGlobalBrands } from "../../../redux/constants/NewzVerseConst";
import { setDashboardsData } from "../../../redux/actions/NewzVerse/NewzVerse";
import "./CustomDatePicker.css";
import calendarIcon from "../../../assets/Dashboard/calendar_icon.svg";
import expandMore from "../../../assets/Dashboard/Filters/expand_more.svg";

// Shortcut definitions
const defineds = {
  today: [startOfDay(new Date()), endOfDay(new Date())],
  last7: [subDays(new Date(), 6), endOfDay(new Date())],
  last30: [subDays(new Date(), 29), endOfDay(new Date())],
  last90: [subDays(new Date(), 89), endOfDay(new Date())],
  year2025: [
    startOfYear(new Date(2025, 0, 1)),
    endOfYear(new Date(2025, 0, 1)),
  ],
  year2024: [
    startOfYear(new Date(2024, 0, 1)),
    endOfYear(new Date(2024, 0, 1)),
  ],
  year2023: [
    startOfYear(new Date(2023, 0, 1)),
    endOfYear(new Date(2023, 0, 1)),
  ],
};

const staticRanges = [
  {
    label: "Today",
    range: () => ({
      startDate: defineds.today[0],
      endDate: defineds.today[1],
    }),
  },
  {
    label: "Last 7 days",
    range: () => ({
      startDate: defineds.last7[0],
      endDate: defineds.last7[1],
    }),
  },
  {
    label: "Last 30 days",
    range: () => ({
      startDate: defineds.last30[0],
      endDate: defineds.last30[1],
    }),
  },
  {
    label: "Last 90 days",
    range: () => ({
      startDate: defineds.last90[0],
      endDate: defineds.last90[1],
    }),
  },
  {
    label: "2025",
    range: () => ({
      startDate: defineds.year2025[0],
      endDate: defineds.year2025[1],
    }),
  },
  {
    label: "2024",
    range: () => ({
      startDate: defineds.year2024[0],
      endDate: defineds.year2024[1],
    }),
  },
  {
    label: "2023",
    range: () => ({
      startDate: defineds.year2023[0],
      endDate: defineds.year2023[1],
    }),
  },
];

const CustomDatePicker = () => {
  const dispatch = useDispatch();

  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  const dashboardDeepDiveLevel = useSelector(
    (state) => state?.NewzVerse?.dashboard_deep_dive_level
  );
  const isDeepDiveFlag = useSelector(
    (state) => state?.NewzVerse?.is_deep_dive_flag
  );
  let p_token = localStorage.getItem("p_token");

  const start = dashboardsData[dashboardActiveKey]?.duration?.start_date;
  const end = dashboardsData[dashboardActiveKey]?.duration?.end_date;

  const DEFAULT_RANGE = [
    {
      startDate: start ? new Date(start) : new Date(),
      endDate: end ? new Date(end) : new Date(),
      key: "selection",
    },
  ];

  const [open, setOpen] = useState(false);
  const [range, setRange] = useState(DEFAULT_RANGE);
  const [tempRange, setTempRange] = useState(DEFAULT_RANGE);
  const [focusedMonth, setFocusedMonth] = useState(new Date());
  const pickerRef = useRef();

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setOpen(false);
        setTempRange(range);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, range]);

  const buttonLabel =
    dashboardsData[dashboardActiveKey]?.duration?.start_date &&
    dashboardsData[dashboardActiveKey]?.duration.end_date
      ? `${format(
          dashboardsData[dashboardActiveKey]?.duration.start_date,
          "MMM dd, yyyy"
        )} - ${format(
          dashboardsData[dashboardActiveKey]?.duration.end_date,
          "MMM dd, yyyy"
        )}`
      : "Select Date Range";

  // API call simulation
  const handleAPICall = (selectedRange) => {
    const now = new Date();
    const selectedEndDate = selectedRange[0].endDate;

    const mergedEndDate = new Date(
      selectedEndDate.getFullYear(),
      selectedEndDate.getMonth(),
      selectedEndDate.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );

    let startDate = format(selectedRange[0].startDate, "yyyy-MM-dd HH:mm:ss");
    let endDate = format(mergedEndDate, "yyyy-MM-dd HH:mm:ss");

    if (isDeepDiveFlag) {
      let updatedDashboardsData = dashboardsData?.map((d, index) => {
        if (d?.dashboard_type === dashboardActiveKey + 1) {
          if (dashboardDeepDiveLevel === 1) {
            d.duration = {
              start_date: startDate,
              end_date: endDate,
            };
            d.analytics_sections_level_1 = [];
          } else if (dashboardDeepDiveLevel === 2) {
            d.duration = {
              start_date: startDate,
              end_date: endDate,
            };
            d.analytics_sections_level_2 = [];
          } else if (dashboardDeepDiveLevel === 3) {
            d.duration = {
              start_date: startDate,
              end_date: endDate,
            };
            d.analytics_sections_level_3 = [];
          }
        }
        return d;
      });
      dispatch(setDashboardsData(updatedDashboardsData));

      // Template Fetch API Call
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
    } else {
      let updatedDashboardsData = dashboardsData?.map((d, index) => {
        if (d?.dashboard_type === dashboardActiveKey + 1) {
          if (dashboardDeepDiveLevel === 1) {
            d.duration = {
              start_date: startDate,
              end_date: endDate,
            };
            d.kpi_news = [];
            d.key_news = [];
            d.high_velocity_news = [];
            d.themes_list = [];
            d.linkedin_news = [];
            d.twitter_news = [];
            d.analytics_sections_level_1 = [];
          } else if (dashboardDeepDiveLevel === 2) {
            d.duration = {
              start_date: startDate,
              end_date: endDate,
            };
            d.key_news_list.data = [];
            d.analytics_sections_level_2 = [];
          } else if (dashboardDeepDiveLevel === 3) {
            d.duration = {
              start_date: startDate,
              end_date: endDate,
            };
            d.article_event_summary = null;
            d.article_event_name_list = [];
            d.article_data_list = [];
            d.analytics_sections_level_3 = [];
          }
        }
        return d;
      });
      dispatch(setDashboardsData(updatedDashboardsData));

      if (dashboardDeepDiveLevel === 1) {
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
            start_date: startDate,
            end_date: endDate,
            filters: [],
            widget_id: widget_id,
            dashboard_type: dashboardActiveKey + 1,
            dashboardsData: dashboardsData,
            offset: 0,
            dashboard_filters: [{ attribute: "theme_id", values: [] }],
            rows: 5,
          };
          // dispatch(getDashboardDataAPI(payloadObj));
        });
      } else if (dashboardDeepDiveLevel === 2) {
        let global_brands = getDashboardGlobalBrands(
          dashboardsData,
          dashboardBrandsList,
          dashboardActiveKey
        );

        let theme_id = Number(
          dashboardsData?.[dashboardActiveKey]?.selected_theme_data?.theme_id
        );
        let templateFetchPayloadObj = {
          p_token: p_token ? p_token : null,
          dashboard_type: dashboardActiveKey + 1,
          deep_dive_level: "2",
          dashboardsData: dashboardsData,
          start_date:
            dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
          end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
          brand_list: global_brands,
          dashboard_filters: [
            ...dashboardsData?.[dashboardActiveKey]?.applied_dashboard_filters,
            { attribute: "theme_id", values: theme_id === 0 ? [] : [theme_id] },
          ],
        };
        dispatch(
          getDashboardAnalyticsTemplateFetchAPI(templateFetchPayloadObj)
        );

        let payloadObj = {
          p_token: p_token ? p_token : null,
          brand_list: global_brands,
          start_date:
            dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
          end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
          filters: [],
          widget_id: "2.1",
          dashboard_type: dashboardActiveKey + 1,
          dashboardsData: dashboardsData,
          dashboard_filters: [
            ...dashboardsData?.[dashboardActiveKey]?.applied_dashboard_filters,
            { attribute: "theme_id", values: theme_id === 0 ? [] : [theme_id] },
          ],
          offset: 0,
          rows: 10,
        };
        dispatch(getDashboardDataAPI(payloadObj));
      } else if (dashboardDeepDiveLevel === 3) {
        let global_brands = getDashboardGlobalBrands(
          dashboardsData,
          dashboardBrandsList,
          dashboardActiveKey
        );

        let ai_cluster_key =
          dashboardsData?.[dashboardActiveKey]?.selected_cluster_data
            ?.ai_cluster_key;
        let templateFetchPayloadObj = {
          p_token: p_token ? p_token : null,
          dashboard_type: dashboardActiveKey + 1,
          deep_dive_level: "3",
          dashboardsData: dashboardsData,
          start_date:
            dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
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
        dispatch(
          getDashboardAnalyticsTemplateFetchAPI(templateFetchPayloadObj)
        );

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
              ...dashboardsData?.[dashboardActiveKey]
                ?.applied_dashboard_filters,
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
    }
  };

  // Handle Done
  const handleDone = () => {
    setRange(tempRange);
    setOpen(false);
    handleAPICall(tempRange);
  };

  // Handle Reset
  const handleReset = () => {
    setTempRange(DEFAULT_RANGE);
    setFocusedMonth(new Date());
  };

  // Custom month navigation
  const handlePrevMonth = () => setFocusedMonth(subMonths(focusedMonth, 1));
  const handleNextMonth = () => setFocusedMonth(addMonths(focusedMonth, 1));

  // Custom sidebar
  const renderSidebar = () => (
    <div className="custom-sidebar">
      {staticRanges.map((rangeObj) => (
        <div
          key={rangeObj.label}
          className="sidebar-option"
          onClick={() => {
            setTempRange([
              {
                startDate: rangeObj.range().startDate,
                endDate: rangeObj.range().endDate,
                key: "selection",
              },
            ]);
          }}
        >
          {rangeObj.label}
        </div>
      ))}
    </div>
  );

  // Custom navigation bar
  const renderCustomNavigation = () => (
    <div className="custom-nav-bar">
      <button className="nav-arrow" onClick={handlePrevMonth}>
        &#8592;
      </button>
      <span className="nav-month">{format(focusedMonth, "MMMM yyyy")}</span>
      <button className="nav-arrow" onClick={handleNextMonth}>
        &#8594;
      </button>
    </div>
  );

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        lineHeight: "15px",
      }}
    >
      <button
        onClick={() => {
          setOpen((o) => !o);
          setTempRange(range);
          // setFocusedMonth(range[0].startDate || new Date());
          setFocusedMonth(
            range[0].startDate instanceof Date
              ? range[0].startDate
              : new Date(range[0].startDate)
          );
        }}
        style={{
          padding: "4px 10px",
          borderRadius: "6px",
          border: "1px solid #f0f0f0",
          fontSize: "12px",
          fontWeight: "500",
          background: "#fff",
          cursor: "pointer",
          marginTop: "-5px",
          alignSelf: "center",
          alignContent: "center",
        }}
      >
        <img
          src={calendarIcon}
          style={{
            marginTop: "-2px",
            marginRight: "5px",
            width: "15px",
            height: "15px",
          }}
        />
        <span
          style={{
            fontWeight: "500",
          }}
        >
          {buttonLabel}
        </span>
        <img src={expandMore} style={{ marginLeft: "2px" }} />
      </button>
      {open && (
        <div
          ref={pickerRef}
          style={{
            position: "absolute",
            right: "10%",
            top: "110%",
            zIndex: 999,
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 2px 24px rgba(0,0,0,0.15)",
            overflow: "hidden",
            minWidth: 650,
            display: "flex",
          }}
          className="custom-range-popup"
        >
          {/* Sidebar */}
          {renderSidebar()}

          {/* Calendar with custom navigation */}
          <div style={{ flex: 1, marginTop: "-15px" }}>
            {/* {renderCustomNavigation()} */}
            <DateRange
              onChange={(item) => setTempRange([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={tempRange}
              direction="horizontal"
              className="custom-range-picker"
              showMonthAndYearPickers={false}
              minDate={new Date(2000, 0, 1)}
              maxDate={new Date()}
              // force the calendar to show the focused month
              shownDate={focusedMonth}
              onShownDateChange={setFocusedMonth}
              weekdayDisplayFormat="EE"
            />
            <div className="picker-actions">
              <button className="reset-btn" onClick={handleReset}>
                Reset
              </button>
              <button className="done-btn" onClick={handleDone}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
