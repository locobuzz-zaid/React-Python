/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import error1 from "../../assets/error.svg";
import { notification, Button } from "antd";
import successful from "../../assets/successful.svg";
import info from "../../assets/information.svg";
import alert from "../../assets/alert.svg";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { isArray } from "highcharts";

export const initialPanes = [
  {
    title: "New Worksheet",
    key: "1",
    homePage: true,
    filterObj: [],
    splitObj: null,
    primeAttribute: null,
    secondAttribute: null,
    base: "mentions",
    report_id: null,
  },
];
export var urlParams; // url encrypted parameters
//Function to get url params from URL and set it to urlParams variable
(window.onpopstate = function () {
  var match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    query = window.location.search.substring(1);

  urlParams = {};
  while ((match = search.exec(query)))
    urlParams[decode(match[1])] = decode(match[2]);
})();

export const errorCode = [
  { key: -1, value: "Internal server error", msg: "unknown error" },
  { key: 6, value: "session expired! Please reload page" },
  {
    key: 1,
    value: "Split attribute name and Graph attribute names must be different",
  },
  { key: 2, value: "No data found for selected filter combinations" },
  {
    key: 3,
    value: "Something went wrong!",
    msg: "incomplete data from frontend",
  },
  {
    key: 4,
    value: "Internal server error",
  },
  { key: 5, value: "No data available for selected attributes" },
  {
    key: 7,
    value: "Internal server error. Please contact AWA team.",
    msg: "no database source available issue",
  },
  {
    key: 11,
    value:
      "Requested workspace does not exist! Redirecting you to reports page...",
    msg: "Report id does not exist",
  },
  {
    key: 13,
    value: "Cannot filter on multiple channels for page widgets",
    msg: "Cannot filter on multiple channels for page widgets",
  },
  {
    key: 9,
    value: "Your session has expired!",
    msg: "You are not logged in",
  },
  {
    key: 100,
    value: "You have exceeded the mention limit! Please contact AWA team.",
    msg: "Mention limit surpassed",
  },
  {
    key: 101,
    value:
      "You have exceeded the active workspace limit! Please contact AWA team.",
    msg: "active ws limit surpassed",
  },

  {
    key: 102,
    value: "Try again after a minute.",
    msg: "Keep one minute gap between report creation",
  },
  {
    key: 103,
    value: "Workspace creation timeout! Please try again.",
    msg: "Workspace creation timeout, retry from estimate",
  },

  {
    key: 104,
    value: "Another workspace creation in progress. Please wait!",
    msg: "Another workspace is in creation, wait for completion",
  },
  {
    key: 500,
    value: "user does not have access to the dashboard",
    msg: "user does not have access to the dashboard",
  },
  {
    key: 501,
    value: "dashboard does not exist",
    msg: "dashboard does not exist",
  },
  {
    key: 600,
    value: "Invalid password",
    msg: "invalid share link password",
  },
  {
    key: 5,
    value: "Share link expired",
    msg: "Share link expired",
  },
];

export const localArray = [
  { name: "Word Cloud", key: "2" },
  { name: "Category", key: "3" },
  { name: "Influencers", key: "4" },
  { name: "Source of Post", key: "5" },
  { name: "Mentions", key: "1" },
];

//function to get cookie
export const getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const callNotification = (message, value) => {
  return notification.open({
    className: "notification_body",
    key: 1,
    placement: "bottomLeft",
    icon: (
      <img
        src={
          value === "error"
            ? error1
            : value === "info"
            ? info
            : value === "alert"
            ? alert
            : successful
        }
        alt={
          value === "error"
            ? "error"
            : value === "info"
            ? "info"
            : value === "alert"
            ? "alert"
            : "successful"
        }
      />
    ),
    btn: (
      <Button
        type="primary"
        size="small"
        className="notification_btn"
        onClick={() => notification.close(1)}
      >
        Dismiss
      </Button>
    ),
    message: (
      <span className="notification_message">
        {value === "error"
          ? message
            ? message
            : "Internal Server Error!"
          : message}
      </span>
    ),
  });
};

export const sessionExpired = (value) => {
  let timer = null;
  if (value) {
    timer = setTimeout(() => {
      window.location.href = "/sessionexpired";
    }, 1000);
  }
  return () => {
    clearTimeout(timer);
  };
};

export const workspaceNotExist = (value) => {
  let timer = null;
  if (value) {
    timer = setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
  }
  return () => {
    clearTimeout(timer);
  };
};

export function getColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 70 * Math.random()) +
    "%," +
    (85 + 10 * Math.random()) +
    "%)"
  );
}

//threesplitdate

export const getThreeSplitDate = (dateStrings, startDate, endDate) => {
  var Diff_in_days = setDiffInDays(dateStrings);

  let divideDateThree = Math.floor(Diff_in_days / 3);
  let d1, f1, d2, f2;

  let defaultDate1, defaultDate2, defaultDate3;

  if (Diff_in_days === 3) {
    d1 = moment(startDate).format("YYYY/MM/DD");
    defaultDate1 = [startDate, `${d1} 23:59`];

    f1 = moment(d1).add(1, "days").format("YYYY/MM/DD");
    defaultDate2 = [`${f1} 00:00`, `${f1} 23:59`];

    f2 = moment(f1).add(1, "days").format("YYYY/MM/DD");
    defaultDate3 = [`${f2} 00:00`, endDate];
  } else if (Diff_in_days >= 3) {
    d1 = moment(startDate).add(divideDateThree, "days").format("YYYY/MM/DD");
    defaultDate1 = [startDate, `${d1} 23:59`];

    f1 = moment(d1).add(1, "days").format("YYYY/MM/DD");
    d2 = moment(d1).add(divideDateThree, "days").format("YYYY/MM/DD");
    defaultDate2 = [`${f1} 00:00`, `${d2} 23:59`];

    f2 = moment(d2).add(1, "days").format("YYYY/MM/DD");
    d2 = moment(d1).add(divideDateThree, "days").format("YYYY/MM/DD");
    defaultDate3 = [`${f2} 00:00`, endDate];
  } else if (Diff_in_days < 3) {
    defaultDate1 = [`${startDate}`, `${endDate}`];
    defaultDate2 = [`${startDate}`, `${endDate}`];
    defaultDate3 = [`${startDate}`, `${endDate}`];
  }

  return { defaultDate1, defaultDate2, defaultDate3 };
};

export const getCrisisDates = (reportInfo, startDate, endDate, timeValue) => {
  let reportStartDate = reportInfo?.result?.report_date_range.start;
  let reportEndDate = reportInfo?.result?.report_date_range.end;
  let defaultDate3, defaultDate2, defaultDate1;

  defaultDate1 = getCrisisValidation(reportInfo, startDate, endDate);
  // defaultDate1 = [startDate, endDate];
  let defaultDate2StartDate = reportStartDate;
  let defaultDate2endDate = moment(startDate)
    .subtract(1, "days")
    .set({ hour: 23, minute: 59 })
    .format("YYYY/MM/DD HH:mm");
  defaultDate2 = getCrisisValidation(
    reportInfo,
    defaultDate2StartDate,
    defaultDate2endDate
  );
  let defaultDate3StartDate = moment(endDate)
    .add(1, "days")
    .set({ hour: 0, minute: 0 })
    .format("YYYY/MM/DD HH:mm");
  let defaultDate3endDate = reportEndDate;
  defaultDate3 = getCrisisValidation(
    reportInfo,
    defaultDate3StartDate,
    defaultDate3endDate
  );

  return { defaultDate1, defaultDate2, defaultDate3 };
};

export const getCrisisValidation = (reportInfo, startDate, endDate) => {
  let defaultDate;
  let reportStartDate = reportInfo?.result?.report_date_range.start;
  let reportEndDate = reportInfo?.result?.report_date_range.end;
  if (
    !moment(startDate).isSame(reportStartDate, "date") &&
    moment(endDate).isSame(reportEndDate, "date")
  ) {
    defaultDate = [
      moment(startDate).set({ hour: 0, minute: 0 }),
      reportEndDate,
    ];
  } else if (
    moment(startDate).isSame(reportStartDate, "date") &&
    !moment(endDate).isSame(reportEndDate, "date")
  ) {
    defaultDate = [
      reportStartDate,
      moment(endDate).set({ hour: 23, minute: 59 }),
    ];
  } else if (
    moment(startDate).isSame(endDate, "date") &&
    !(
      moment(startDate).isSame(reportStartDate, "date") &&
      moment(endDate).isSame(reportEndDate, "date")
    )
  ) {
    defaultDate = [
      moment(startDate).set({ hour: 0, minute: 0 }),
      moment(endDate).set({ hour: 23, minute: 59 }),
    ];
  } else if (
    moment(startDate).isSame(reportStartDate, "date") &&
    moment(endDate).isSame(reportEndDate, "date")
  ) {
    defaultDate = [reportStartDate, reportEndDate];
  } else if (
    !moment(startDate).isSame(reportStartDate, "date") &&
    !moment(endDate).isSame(reportEndDate, "date")
  ) {
    defaultDate = [
      moment(startDate).set({ hour: 0, minute: 0 }),
      moment(endDate).set({ hour: 23, minute: 59 }),
    ];
  }
  return defaultDate;
};

export const getTimeExtendChecks = (extendDates, date) => {
  let finalTimeObj;
  if (
    moment(date[0]).isSame(extendDates?.start, "date") &&
    moment(date[1]).isSame(extendDates?.start, "date")
  ) {
    finalTimeObj = {
      type: "createWorkspace",
      data: {
        startTime: "00:00",
        endTime: moment(extendDates?.start)
          .subtract(1, "minutes")
          .format("HH:mm"),
      },
    };
  } else if (
    moment(date[0]).isSame(extendDates?.end, "date") &&
    moment(date[1]).isSame(extendDates?.end, "date")
  ) {
    finalTimeObj = {
      type: "createWorkspace",
      data: {
        startTime: moment(extendDates?.end).add(1, "minutes").format("HH:mm"),
        endTime: "23:59",
      },
    };
  } else if (
    moment(date[0]).isSame(extendDates?.start, "date") &&
    moment(date[1]).isSame(extendDates?.end, "date")
  ) {
    finalTimeObj = {
      type: "createWorkspace",
      data: {
        startTime: moment(extendDates?.start).add(1, "minutes").format("HH:mm"),
        endTime: moment(extendDates?.end)
          .subtract(1, "minutes")
          .format("HH:mm"),
      },
    };
  } else if (
    !moment(date[0]).isSame(extendDates?.start, "date") &&
    moment(date[1]).isSame(extendDates?.start, "date")
  ) {
    finalTimeObj = {
      type: "createWorkspace",
      data: {
        startTime: "00:00",
        endTime: moment(extendDates?.start)
          .subtract(1, "minutes")
          .format("HH:mm"),
      },
    };
  } else if (
    moment(date[0]).isSame(extendDates?.end, "date") &&
    !moment(date[1]).isSame(extendDates?.end, "date")
  ) {
    finalTimeObj = {
      type: "createWorkspace",
      data: {
        startTime: moment(extendDates?.end).add(1, "minutes").format("HH:mm"),
        endTime: "23:59",
      },
    };
  } else if (
    !moment(date[0]).isSame(extendDates?.start, "date") &&
    !moment(date[1]).isSame(extendDates?.end, "date")
  ) {
    finalTimeObj = {
      type: "createWorkspace",
      data: {
        startTime: "00:00",
        endTime: "23:59",
      },
    };
  } else if (
    moment(date[0]).isSame(extendDates?.start, "date") &&
    moment(extendDates?.end).isBetween(date[0], date[1], "date")
  ) {
    finalTimeObj = {
      type: "createWorkspace",
      data: {
        startTime: moment(extendDates?.start).format("HH:mm"),
        endTime: "23:59",
      },
    };
  } else if (
    moment(date[1]).isSame(extendDates?.end, "date") &&
    moment(extendDates?.start).isBetween(date[0], date[1], "date")
  ) {
    finalTimeObj = {
      type: "createWorkspace",
      data: {
        startTime: "00:00",
        endTime: moment(extendDates?.end).format("HH:mm"),
      },
    };
  }
  return finalTimeObj;
};

//function to get the customized date range
export const getCustomizedDate = (value, type, custom_relative, mode_type) => {
  let currentDate = new Date();
  let newDate = null;
  if (type === "Minutes") {
    newDate = moment(currentDate).subtract(value, "minutes")._d;
  } else if (type === "Hours") {
    newDate = moment(currentDate).subtract(value, "h")._d;
  } else if (type === "Days") {
    newDate = moment(currentDate).subtract(value, "d")._d;
  } else if (type === "Weeks") {
    newDate = moment(currentDate).subtract(value, "week")._d;
  } else if (type === "Months") {
    newDate = moment(currentDate).subtract(value, "month")._d;
  } else if (type === "Years") {
    newDate = moment(currentDate).subtract(value, "year")._d;
  }
  let fromDate = custom_relative
    ? moment(newDate).add(1, "d").format("DD MMM  YYYY")
    : moment(newDate).format("DD MMM  YYYY");
  let fromTime = moment(newDate).format("HH:mm");
  let toDate = moment(currentDate).format("DD MMM YYYY");
  let toTime1 = moment(currentDate).format("HH:mm");
  let toTime = "23:59";

  let timeValue = {
    startTime: type === "Hours" || type === "Minutes" ? fromTime : "00:00",
    endTime:
      type === "Hours" ||
      type === "Minutes" ||
      mode_type === "schedule_date_time"
        ? toTime1
        : toTime,
  };
  return { date: [fromDate, toDate], time: timeValue };
};
export const getDefaultDateRange = () => {
  let obj = getCustomizedDate(14, "Days");
  let dateObj = {
    days: 15,
    from:
      moment(obj?.date[0]).format("YYYY/MM/DD") + " " + obj?.time?.startTime,

    to: moment(obj?.date[1]).format("YYYY/MM/DD") + " " + obj?.time?.endTime,
  };
  return dateObj;
};
export const rangePickerDisabledDate = (
  current,
  startDate,
  endDate,
  duration,
  extend
) => {
  // You cannot choose today or later, you can only choose [Today ~ 90 days forward]. Today is optional.

  let durationStart, durationEnd;
  let extendStart = moment(duration?.start).set({ hour: 0, minute: 0 });
  let extendEnd = moment(duration?.end).set({ hour: 23, minute: 59 });
  if (extend) {
    if (moment(duration?.start).isSame(extendStart)) {
      durationStart = moment(duration?.start).subtract(1, "days");
    } else {
      durationStart = moment(duration?.start);
    }
    if (moment(duration?.end).isSame(extendEnd)) {
      durationEnd = moment(duration?.end).endOf("day");
    } else {
      durationEnd = moment(duration?.end).subtract(1, "days");
    }
  }
  let startDate1 = moment(startDate).format("YYYY/MM/DD");

  if (current) {
    if (
      duration &&
      current > moment(durationStart).subtract("days") &&
      current < moment(durationEnd).endOf("day")
    ) {
      return true;
    }
    if (
      current < moment(startDate1).subtract("days") ||
      current > moment(endDate).endOf("day")
    ) {
      return true;
    } else {
      return false;
    }
  }
};
export function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);

  var hDisplay =
    h > 0
      ? h +
        (h == 1
          ? m > 0
            ? " hour, "
            : " hour "
          : m > 0
          ? " hours, "
          : " hours ")
      : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";

  return hDisplay + mDisplay;
}
export const setDiffInDays = (date) => {
  //to get the difference of days
  let date1 = new Date(date && date[0]);
  let date2 = new Date(date && date[1]);
  let Diff_time = date1.getTime() - date2.getTime();
  let Diff_in_days = isNaN(date1)
    ? 0
    : Math.abs(Math.round(Diff_time / (1000 * 3600 * 24)));

  return Diff_in_days + 1;
};

export const showNotification = (message) => {
  var options = {
    body: message,
    icon: "https://i.postimg.cc/W4R0f574/AWA123.png",
    dir: "ltr",
  };

  new Notification("Analytics Workspace App", options);
};
export const getFrequentConfigData = (schema) => {
  let obj = {};
  schema &&
    Object?.entries(schema)?.map((e) => {
      if (e[1].is_group === true) {
        Object.entries(e[1].members).map((el, i) => {
          return (obj[el[0]] = el[1]);
        });
      }
    });
  return obj;
};
export const dashboardInitialPanes = [
  {
    title: "Dashboards",
    description: null,

    key: "1",
    duration: null,
    brands: null,
    sections: null,
    onlyWidgets: null,
    isDashboard: false,
    isDeepDive: false,
    deepdive: { deepdiveResponse: [], tabName: null },
    pills: "All Dashboards",
    sortOrder: "asc",
    sortBy: "name",
    dashboard_template_filters: {
      search_text: "",
      pill: "All Dashboards",
      offset: 0,
      no_of_rows: 12,
      sort_expression: null,
      sort_order: null,
      type: "dashboard",
    },
    filter_template_details: {
      filter_templates: [],
      pinned_filters: [],
    },
    selected_pills: [],
  },
];

export const setCookie = (cname, cvalue) => {
  document.cookie = cname + "=" + cvalue + ";" + ";path=/";
};
export const getPaneIndex = (panes, activeKey) => {
  let index;
  panes?.map((el, i) => {
    if (el?.key === activeKey) index = i;
  });

  return index;
};
// export const getCheckedState = (config, preDefineTabs) => {
//   let myArray = [];
//   if (config?.mentions) {
//     Object.entries(config?.mentions)?.map((el, index) => {
//       if (preDefineTabs && el[1].datatype === "varchar")
//         el[1]?.values?.forEach((element) => {
//           myArray = {
//             ...myArray,
//             [el[0]]: {
//               ...myArray[el[0]],
//               [`${el[0]}#${element?.id}`]: "include",
//             },
//           };
//         });
//     });
//   }
//   return myArray;
// };

export const getValue = (filterObj) => {
  let obj = {};
  filterObj.forEach((el) => {
    if (el.attribute?.toLowerCase() !== "brandid" && el.type === "varchar") {
      let g = {
        [el.attribute]: [{ name: null, type: "include" }],
      };
      obj = { ...obj, ...g };
    }
  });
  return obj;
};

export const getFilterArray = (filterPanelData, isDefault) => {
  let myArray = [];
  if (isDefault) {
    myArray = filterPanelData?.map((el, i) => {
      if (el?.datatype === "boolean") {
        return {
          type: el?.datatype,
          attribute: el?.attribute,
          columns: [{ name: null, type: "include" }],
        };
      } else {
        return {
          type: el?.datatype,
          attribute: el?.attribute,
          columns: el?.id
            ?.filter((e) => e?.name === "All")
            ?.map((e) => {
              return { name: e?.id, type: "include" };
            }),
        };
      }
    });
  } else {
    myArray = filterPanelData?.map((el, i) => {
      if (el?.datatype === "boolean") {
        return {
          type: el?.datatype,
          attribute: el?.attribute,
          columns: el.id,
        };
      } else {
        return {
          type: el?.datatype,
          attribute: el?.attribute,
          columns: el?.id?.map((e) => {
            return { name: e?.id, type: "include" };
          }),
        };
      }
    });
  }
  let finalArray = myArray?.filter((el) => el?.columns?.length > 0);
  return finalArray;
};
export const getFilterPanelData = (
  config,
  preDefineTabs,
  supported_filters,
  ticket_dashboard
) => {
  let obj = {};
  if (config) {
    if (!preDefineTabs) {
      Object.entries(config).forEach((data_source) => {
        obj[data_source[0]] = [];
        Object.entries(data_source?.[1]).forEach((el) => {
          if (el[1].is_group === true) {
            return Object.entries(el[1].members).map((e, i) => {
              if (e[1].is_filter && !supported_filters) {
                obj[data_source[0]].push({
                  title: e[1]?.title,
                  values: e[1]?.values,
                  datatype: e[1]?.datatype,
                  attribute: e[0],
                  type: el[0],
                  is_searchable: e[1].is_searchable,
                  id_attribute: e[1]?.id_attribute,
                  data_source: e[1]?.type,
                  filter_type: e?.[1]?.filter_type ? e?.[1]?.filter_type : null,
                });
              } else {
                return;
              }
            });
          }
          if (el[0] === "others" && !supported_filters) {
            obj[data_source[0]].push({
              title: el[1]?.members.Description.title,

              datatype: el[1]?.members.Description.datatype,
              attribute: "Description",
            });
          }
        });
        return obj;
      });
    } else {
      let data_source = ticket_dashboard ? "ticket" : "mentions";

      obj[data_source] = [];

      Object.entries(config)?.map((el, index) => {
        if (el[1].is_group === true) {
          return Object.entries(el[1].members).map((e, i) => {
            if (
              (e[1].is_filter && !supported_filters) ||
              (supported_filters &&
                supported_filters?.includes(e[0]) &&
                e[1].is_filter)
            ) {
              obj[data_source].push({
                title: e[1]?.title,
                values: e[1]?.values,
                datatype: e[1]?.datatype,
                attribute: e[0],
                type: el[0],
                is_searchable: e[1].is_searchable,
                id_attribute: e[1]?.id_attribute,
                filter_type: e?.[1]?.filter_type ? e?.[1]?.filter_type : null,
              });
            } else {
              return;
            }
          });
        }
        if (el[0] === "others" && !supported_filters) {
          obj[data_source].push({
            title: el[1]?.members.Description.title,

            datatype: el[1]?.members.Description.datatype,
            attribute: "Description",
          });
        }
        if (preDefineTabs)
          obj[data_source].push({
            title: el[1]?.title,
            datatype: el[1]?.datatype,
            attribute: el[0],
            values: el[1]?.values?.map((e) => e?.name),
            id: el[1]?.values,
          });
      });
    }
  }
  // console.log("obj", obj);
  return obj;
};

export const getAllFilters = (
  graphConditionConfig,
  panes,
  index,
  section_index,
  widget_index,
  brands,
  brand_ids,
  widgetObj,
  sectionObj,
  quickFilterRes
) => {
  let GlobalFilter = panes?.[index]?.filters ? panes[index].filters : [];

  let widget_metadata =
    section_index >= 0
      ? panes?.[index]?.sections?.[section_index]?.widgets?.[widget_index]
      : panes?.[index]?.section?.[0]?.widgets?.[widget_index];
  let data_source = widget_metadata?.data_source
    ? widget_metadata?.data_source
    : "mentions";
  // console.log("widget_metadata", widget_metadata, "data_source", data_source);

  let hidden_filter = panes?.[index]?.hidden_filter
    ? [panes?.[index]?.hidden_filter]
    : [];
  if (hidden_filter?.[0]) {
    hidden_filter[0].data_source = true;
  }
  // console.log("hidden_filter", hidden_filter);

  // let quickFilterAttribute = panes?.[index]?.quick_filter
  //   ? panes?.[index]?.quick_filter === "AccountID"
  //     ? "SettingID"
  //     : panes?.[index]?.quick_filter === "Category"
  //     ? "CategoryID"
  //     : panes?.[index]?.quick_filter
  //   : null;
  let quickFilter = quickFilterRes?.[0]?.columns
    ? quickFilterRes
    : panes?.[index]?.quick_filter_value
    ? [panes?.[index]?.quick_filter_value]
    : [];
  if (quickFilter?.[0]) {
    quickFilter[0].data_source = true;
  }
  // console.log("quickFilter", quickFilter);

  // let quickFilter = quickFilterRes?.[0]?.columns
  //   ? quickFilterRes
  //   : quickFilterAttribute && GlobalFilter?.length
  //   ? GlobalFilter?.filter((el) => el?.attribute === quickFilterAttribute)
  //   : [];
  let getFilters = sectionObj
    ? sectionObj?.brand_ids || sectionObj?.brand_groups
      ? getBrands(
          brands,
          sectionObj?.brand_ids ? sectionObj?.brand_ids : null,
          sectionObj?.singleBrands,
          sectionObj?.brand_groups ? sectionObj?.brand_groups : null,
          data_source
        )
      : null
    : panes[index]?.sections
    ? getBrands(
        brands,
        panes[index]?.sections?.[section_index]?.brand_ids
          ? panes[index]?.sections?.[section_index]?.brand_ids
          : null,
        widgetObj?.singleBrands,
        panes[index]?.sections?.[section_index]?.brand_groups
          ? panes[index]?.sections?.[section_index]?.brand_groups
          : null,
        data_source
      )
    : null;
  let sectionBrandFilter = getFilters ? [getFilters] : [];
  let sectionDateFilter = sectionObj?.dateFilters
    ? sectionObj?.dateFilters
    : panes?.[index]?.sections
    ? panes?.[index]?.sections[section_index]?.dateFilters
      ? panes?.[index]?.sections[section_index]?.dateFilters
      : []
    : panes[index]?.section && panes[index]?.section[0]?.dateFilters
    ? panes[index]?.section[0]?.dateFilters
    : [];
  if (sectionDateFilter?.length) {
    sectionDateFilter?.map((d) => {
      d.data_source = data_source;
    });
  }
  let sectionFilter = sectionObj?.filters
    ? sectionObj?.filters
    : panes[index]?.sections
    ? panes[index]?.sections[section_index]?.filters
      ? panes[index]?.sections[section_index]?.filters
      : []
    : panes[index]?.section && panes[index]?.section[0]?.filters
    ? panes[index]?.section[0]?.filters
    : [];
  // to filter section level date and brands filter if these are exits in sectionFilter
  sectionFilter = sectionFilter?.filter(
    (el) =>
      el?.attribute?.toLowerCase() !== "createddate" &&
      el?.attribute?.toLowerCase() !== "brandid"
  );
  let WidgetFilter = widgetObj?.filters
    ? widgetObj?.filters
    : panes && panes[index]?.sections
    ? panes[index]?.sections[section_index]?.widgets?.[widget_index]?.filters
      ? panes[index]?.sections[section_index]?.widgets?.[widget_index]?.filters
      : []
    : panes[index]?.section &&
      panes[index]?.section[0]?.widgets?.[widget_index]?.filters
    ? panes[index]?.section[0]?.widgets?.[widget_index]?.filters
    : [];

  // to filter widget level date and brands filter if these are exits in WidgetFilter
  WidgetFilter = WidgetFilter?.filter(
    (el) =>
      el?.attribute?.toLowerCase() !== "brandid" &&
      el?.attribute?.toLowerCase() !== "createddate"
  );
  let finalBrand_list =
    brand_ids?.length > 0 || widgetObj?.brand_groups?.length > 0
      ? getBrands(
          brands,
          brand_ids,
          widgetObj?.singleBrands,
          widgetObj?.brand_groups,
          data_source
        )
      : null;
  let WidgetBrandFilter = finalBrand_list ? [finalBrand_list] : [];
  let WidgetDateFilter = widgetObj?.duration?.from
    ? [
        {
          attribute: "createddate",
          type: "datetime",
          columns: widgetObj?.duration,
          data_source: data_source,
        },
      ]
    : [];
  if (WidgetDateFilter?.length === 0) {
    if (panes[index]?.sections || panes[index]?.section) {
      if (
        (panes[index]?.sections &&
          panes[index]?.sections[section_index]?.widgets?.[widget_index]
            ?.dateFilters) ||
        (panes[index]?.section &&
          panes[index]?.section[0]?.widgets?.[widget_index]?.dateFilters)
      ) {
        WidgetDateFilter = panes[index]?.sections
          ? panes[index]?.sections[section_index]?.widgets?.[widget_index]
              ?.dateFilters
          : panes[index]?.section[0]?.widgets?.[widget_index]?.dateFilters;
      } else if (
        (panes[index]?.sections &&
          panes[index]?.sections[section_index]?.widgets?.[widget_index]
            ?.start_date) ||
        (panes[index]?.section &&
          panes[index]?.section[0]?.widgets?.[widget_index]?.start_date)
      ) {
        WidgetDateFilter = [
          {
            attribute: "createddate",
            type: "datetime",
            columns: {
              from: panes[index]?.sections
                ? panes[index]?.sections[section_index]?.widgets?.[widget_index]
                    ?.start_date
                : panes[index]?.section[0]?.widgets?.[widget_index]?.start_date,
              to: panes[index]?.sections
                ? panes[index]?.sections[section_index]?.widgets?.[widget_index]
                    ?.end_date
                : panes[index]?.section[0]?.widgets?.[widget_index]?.end_date,
            },
            data_source: data_source,
          },
        ];
      } else {
        WidgetDateFilter = [];
      }
    }
  }
  //combine all filters array to make final filter array
  let totalFilter = [];
  let isSectionLocked = sectionObj?.is_locked
    ? sectionObj?.is_locked
    : panes[index]?.sections
    ? panes[index]?.sections[section_index]?.is_locked
      ? panes[index]?.sections[section_index]?.is_locked
      : false
    : panes[index]?.section && panes[index]?.section[0]?.is_locked
    ? panes[index]?.section[0]?.is_locked
    : false;
  isSectionLocked = isSectionLocked ? isSectionLocked : false;
  let isWidgetLocked = widgetObj?.is_locked
    ? widgetObj?.is_locked
    : panes[index]?.sections
    ? panes[index]?.sections[section_index]?.widgets?.[widget_index]?.is_locked
      ? panes[index]?.sections[section_index]?.widgets?.[widget_index]
          ?.is_locked
      : false
    : panes[index]?.section &&
      panes[index]?.section[0]?.widgets?.[widget_index]?.is_locked
    ? panes[index]?.section[0]?.widgets?.[widget_index]?.is_locked
    : false;
  isWidgetLocked = isWidgetLocked ? isWidgetLocked : false;
  let widget_type = widgetObj?.type
    ? widgetObj?.type
    : panes[index]?.sections
    ? panes[index]?.sections[section_index]?.widgets?.[widget_index]?.type
      ? panes[index]?.sections[section_index]?.widgets?.[widget_index]?.type
      : false
    : panes[index]?.section &&
      panes[index]?.section[0]?.widgets?.[widget_index]?.type
    ? panes[index]?.section[0]?.widgets?.[widget_index]?.type
    : false;
  let widget_data_source = widgetObj?.data_source
    ? widgetObj?.data_source
    : panes?.[index]?.sections
    ? panes?.[index]?.sections?.[section_index]?.widgets?.[widget_index]
        ?.data_source
      ? panes?.[index]?.sections?.[section_index]?.widgets?.[widget_index]
          ?.data_source
      : false
    : panes?.[index]?.section &&
      panes?.[index]?.section?.[0]?.widgets?.[widget_index]?.data_source
    ? panes?.[index]?.section?.[0]?.widgets?.[widget_index]?.data_source
    : false;
  let widget_id = widgetObj?.widget_id
    ? widgetObj?.widget_id
    : panes?.[index]?.sections
    ? panes?.[index]?.sections?.[section_index]?.widgets?.[widget_index]
        ?.widget_id
      ? panes?.[index]?.sections?.[section_index]?.widgets?.[widget_index]
          ?.widget_id
      : false
    : panes?.[index]?.section &&
      panes?.[index]?.section?.[0]?.widgets?.[widget_index]?.widget_id
    ? panes?.[index]?.section?.[0]?.widgets?.[widget_index]?.widget_id
    : false;
  widget_id = widget_id ? widget_id : false;
  widget_data_source = widget_data_source ? widget_data_source : false;
  widget_type = widget_type ? widget_type : false;

  // let saved_similar_hidden_filter_obj = null;
  // let saved_similar_quick_filter_obj = null;
  // if (quickFilter?.length && GlobalFilter?.length) {
  //   saved_similar_quick_filter_obj = getSimilarStaticFilter(
  //     [],
  //     GlobalFilter,
  //     quickFilter
  //   );
  //   GlobalFilter = GlobalFilter?.filter(
  //     (el) => el?.attribute !== quickFilter?.[0]?.attribute
  //   );
  // }

  // // console.log("panes?.[index]", panes?.[index]);

  // if (
  //   hidden_filter?.length &&
  //   GlobalFilter?.length &&
  //   (panes?.[index]?.private_conversation ||
  //     panes?.[index]?.private_conversation === undefined)
  // ) {
  //   saved_similar_hidden_filter_obj = getSimilarStaticFilter(
  //     hidden_filter,
  //     GlobalFilter,
  //     []
  //   );
  //   GlobalFilter = GlobalFilter?.filter(
  //     (el) => el?.attribute !== hidden_filter?.[0]?.attribute
  //   );
  // }

  // console.log(
  //   "saved_similar_hidden_filter_obj : ",
  //   saved_similar_hidden_filter_obj,
  //   "saved_similar_quick_filter_obj : ",
  //   saved_similar_quick_filter_obj
  // );

  // if (saved_similar_hidden_filter_obj?.filter?.length) {
  //   GlobalFilter = [
  //     ...GlobalFilter,
  //     ...saved_similar_hidden_filter_obj?.filter,
  //   ];
  // }
  // if (saved_similar_quick_filter_obj?.filter?.length) {
  //   GlobalFilter = [...GlobalFilter, ...saved_similar_quick_filter_obj?.filter];
  // }

  // console.log("GlobalFilter : ", GlobalFilter);

  if (isSectionLocked) {
    if (isWidgetLocked) {
      totalFilter = [...hidden_filter, ...quickFilter, ...WidgetFilter];
    } else if (!isWidgetLocked) {
      let finalFilter =
        widget_type === "predefined" &&
        widget_data_source !== "realtime" &&
        !(
          widget_id &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.length > 0 &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.includes(widget_id)
        )
          ? [...WidgetFilter]
          : [...sectionFilter, ...WidgetFilter];

      totalFilter = [
        ...hidden_filter,
        ...quickFilter,
        ...finalFilter,
        ...WidgetBrandFilter,
        ...WidgetDateFilter,
      ];
    }
  } else if (!isSectionLocked) {
    if (isWidgetLocked) {
      totalFilter = [...hidden_filter, ...quickFilter, ...WidgetFilter];
    } else if (!isWidgetLocked) {
      let finalFilter = [];

      finalFilter =
        widget_type === "predefined" &&
        widget_data_source !== "realtime" &&
        !(
          widget_id &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.length > 0 &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.includes(widget_id)
        )
          ? [...WidgetFilter]
          : [...GlobalFilter, ...sectionFilter, ...WidgetFilter];
      totalFilter = [
        ...hidden_filter,
        ...quickFilter,
        ...finalFilter,
        ...sectionBrandFilter,
        ...WidgetBrandFilter,
        ...sectionDateFilter,
        ...WidgetDateFilter,
      ];
    }
  }
  return totalFilter;
};

export const getAllShareFilters = (
  graphConditionConfig,
  shareTemplateData,
  section_index,
  widget_index,
  shareBrands
) => {
  let hidden_filter = shareTemplateData?.hidden_filter
    ? [shareTemplateData?.hidden_filter]
    : [];
  let quickFilter = shareTemplateData?.quick_filter
    ? [shareTemplateData?.quick_filter]
    : [];
  let section = shareTemplateData?.sections
    ? shareTemplateData?.sections?.[section_index]
    : shareTemplateData?.section?.[0];

  let widget_metadata =
    section_index >= 0
      ? shareTemplateData?.sections?.[section_index]?.widgets?.[widget_index]
      : shareTemplateData?.section?.[0]?.widgets?.[widget_index];
  let data_source = widget_metadata?.data_source
    ? widget_metadata?.data_source
    : "mentions";
  let section_brands = getBrands(
    shareBrands?.brand_groups,
    section?.brand_ids,
    shareBrands?.brand_list,
    section?.brand_groups,
    data_source
  );

  let sectionBrandFilter = section_brands ? [section_brands] : [];

  if (hidden_filter?.[0]) {
    hidden_filter[0].data_source = true;
  }
  if (quickFilter?.[0]) {
    quickFilter[0].data_source = true;
  }

  let sectionDateFilter = [];
  if (sectionDateFilter?.length === 0) {
    if (shareTemplateData?.sections) {
      if (shareTemplateData?.sections[section_index]?.dateFilters) {
        sectionDateFilter =
          shareTemplateData?.sections[section_index]?.dateFilters;
      } else if (shareTemplateData?.sections[section_index]?.start_date) {
        sectionDateFilter = [
          {
            attribute: "createddate",
            type: "datetime",
            columns: {
              from: shareTemplateData?.sections[section_index]?.start_date,
              to: shareTemplateData?.sections[section_index]?.end_date,
            },
            data_source: data_source,
          },
        ];
      } else {
        sectionDateFilter = [];
      }
    }
  }

  let sectionFilter = shareTemplateData?.sections
    ? shareTemplateData?.sections?.[section_index]?.filters
      ? shareTemplateData?.sections?.[section_index]?.filters
      : []
    : shareTemplateData?.section?.[0]?.filters
    ? shareTemplateData?.section?.[0]?.filters
    : [];
  // to filter section level date and brands filter if these are exits in sectionFilter
  sectionFilter = sectionFilter?.filter(
    (el) =>
      el?.attribute?.toLowerCase() !== "createddate" &&
      el?.attribute?.toLowerCase() !== "brandid"
  );
  let WidgetFilter = shareTemplateData?.sections
    ? shareTemplateData?.sections?.[section_index]?.widgets?.[widget_index]
        ?.filters
      ? shareTemplateData?.sections?.[section_index]?.widgets?.[widget_index]
          ?.filters
      : []
    : shareTemplateData?.section &&
      shareTemplateData?.section?.[0]?.widgets?.[widget_index]?.filters
    ? shareTemplateData?.section?.[0]?.widgets?.[widget_index]?.filters
    : [];
  // to filter widget level date and brands filter if these are exits in WidgetFilter
  WidgetFilter = WidgetFilter?.filter(
    (el) =>
      el?.attribute?.toLowerCase() !== "brandid" &&
      el?.attribute?.toLowerCase() !== "createddate"
  );
  let widegetBrand_list = getBrands(
    shareBrands?.brand_groups,
    section?.widgets?.[widget_index]?.brand_ids,
    shareBrands?.brand_list,
    section?.widgets?.[widget_index]?.brand_groups,
    data_source
  );
  let WidgetBrandFilter = widegetBrand_list ? [widegetBrand_list] : [];

  let WidgetDateFilter = [];
  if (WidgetDateFilter?.length === 0) {
    if (section) {
      if (section?.widgets?.[widget_index]?.dateFilters) {
        WidgetDateFilter = section?.widgets[widget_index]?.dateFilters;
      } else if (section?.widgets?.[widget_index]?.start_date) {
        WidgetDateFilter = [
          {
            attribute: "createddate",
            type: "datetime",
            columns: {
              from: section?.widgets[widget_index]?.start_date,
              to: section?.widgets[widget_index]?.end_date,
            },
            data_source: data_source,
          },
        ];
      } else {
        WidgetDateFilter = [];
      }
    }
  }

  //combine all filters array to make final filter array

  let totalFilter = [];
  let isSectionLocked = shareTemplateData?.sections
    ? shareTemplateData?.sections[section_index]?.is_locked
      ? shareTemplateData?.sections[section_index]?.is_locked
      : false
    : false;
  let isWidgetLocked = section
    ? section?.widgets?.[widget_index]?.is_locked
      ? section?.widgets?.[widget_index]?.is_locked
      : false
    : false;
  let widget_type = section
    ? section?.widgets?.[widget_index]?.type
      ? section?.widgets?.[widget_index]?.type
      : false
    : false;
  let widget_data_source = section
    ? section?.widgets?.[widget_index]?.data_source
      ? section?.widgets?.[widget_index]?.data_source
      : false
    : false;
  let widget_id = section
    ? section?.widgets?.[widget_index]?.widget_id
      ? section?.widgets?.[widget_index]?.widget_id
      : false
    : false;
  widget_id = widget_id ? widget_id : false;
  widget_data_source = widget_data_source ? widget_data_source : false;
  //global filters + comp_hidden_filters
  let global_filters = shareTemplateData?.filters
    ? shareTemplateData?.filters
    : [];
  if (isSectionLocked) {
    if (isWidgetLocked) {
      totalFilter = [...hidden_filter, ...quickFilter, ...WidgetFilter];
    } else if (!isWidgetLocked) {
      let finalFilter =
        widget_type === "predefined" &&
        widget_data_source !== "realtime" &&
        !(
          widget_id &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.length > 0 &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.includes(widget_id)
        )
          ? [...WidgetFilter]
          : [...sectionFilter, ...WidgetFilter];

      totalFilter = [
        ...hidden_filter,
        ...quickFilter,
        ...finalFilter,
        ...WidgetBrandFilter,
        ...WidgetDateFilter,
      ];
    }
  } else if (!isSectionLocked) {
    if (isWidgetLocked) {
      totalFilter = [...hidden_filter, ...quickFilter, ...WidgetFilter];
    } else if (!isWidgetLocked) {
      let finalFilter = [];

      finalFilter =
        widget_type === "predefined" &&
        widget_data_source !== "realtime" &&
        !(
          widget_id &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.length > 0 &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.includes(widget_id)
        )
          ? [...WidgetFilter]
          : [...global_filters, ...sectionFilter, ...WidgetFilter];

      totalFilter = [
        ...hidden_filter,
        ...quickFilter,
        ...finalFilter,
        ...sectionBrandFilter,
        ...WidgetBrandFilter,
        ...sectionDateFilter,
        ...WidgetDateFilter,
      ];
    }
  }
  return totalFilter;
};
export const getAllTemplateFilters = (
  graphConditionConfig,
  Section,
  section_index,
  widget_index,
  SectionObj
) => {
  let GlobalFilter = SectionObj?.filters ? SectionObj?.filters : [];
  let hidden_filter = SectionObj?.hidden_filter
    ? [SectionObj?.hidden_filter]
    : [];
  let quickFilter = SectionObj?.quick_filter_value
    ? [SectionObj?.quick_filter_value]
    : [];
  let sectionBrandFilter =
    Section[section_index] && Section[section_index]?.brands
      ? Section[section_index]?.brands
      : [];

  let widget_metadata =
    section_index >= 0
      ? Section?.[section_index]?.data?.[widget_index]
      : Section?.[0]?.data?.[widget_index];
  let data_source = widget_metadata?.data_source
    ? widget_metadata?.data_source
    : "mentions";

  if (sectionBrandFilter?.length) {
    sectionBrandFilter?.map((d) => {
      d.data_source = data_source;
    });
  }

  let sectionDateFilter = Section[section_index]?.dateFilters
    ? Section[section_index]?.dateFilters?.[0]?.columns
      ? Section[section_index]?.dateFilters
      : [
          {
            attribute: "createddate",
            type: "datetime",
            columns: {
              from: Section[section_index]?.dateFilters?.from,
              to: Section[section_index]?.dateFilters?.to,
            },
            data_source: data_source,
          },
        ]
    : [];
  let sectionFilter =
    Section[section_index] && Section[section_index]?.filters
      ? Section[section_index]?.filters
      : [];
  // to filter section level date and brands filter if these are exits in sectionFilter
  sectionFilter = sectionFilter?.filter(
    (el) =>
      el?.attribute?.toLowerCase() !== "createddate" &&
      el?.attribute?.toLowerCase() !== "brandid"
  );

  if (hidden_filter?.[0]) {
    hidden_filter[0].data_source = true;
  }
  if (quickFilter?.[0]) {
    quickFilter[0].data_source = true;
  }

  let WidgetFilter = SectionObj?.filterChange
    ? SectionObj?.currentFilter
    : section_index
    ? Section?.[section_index] &&
      Section?.[section_index]?.data[widget_index]?.filters
      ? Section?.[section_index]?.data[widget_index]?.filters
      : []
    : Section?.[0]?.data[widget_index]?.filters
    ? Section?.[0]?.data[widget_index]?.filters
    : [];

  // to filter widget level date and brands filter if these are exits in WidgetFilter
  WidgetFilter = WidgetFilter?.filter(
    (el) =>
      el?.attribute?.toLowerCase() !== "brandid" &&
      el?.attribute?.toLowerCase() !== "createddate"
  );
  let WidgetBrandFilter = section_index
    ? Section?.[section_index] &&
      Section?.[section_index]?.data?.[widget_index]?.brands
      ? Section?.[section_index]?.data?.[widget_index]?.brands
      : []
    : Section?.[0]?.data?.[widget_index]?.brands
    ? Section?.[0]?.data?.[widget_index]?.brands
    : [];

  if (WidgetBrandFilter?.length) {
    WidgetBrandFilter?.map((d) => {
      d.data_source = data_source;
    });
  }

  let WidgetDateFilter = section_index
    ? Section?.[section_index]?.data?.[widget_index]?.dateFilters
      ? Section?.[section_index]?.data?.[widget_index]?.dateFilters?.columns
        ? Section?.[section_index]?.data?.[widget_index]?.dateFilters
        : [
            {
              attribute: "createddate",
              type: "datetime",
              columns: {
                from: Section?.[section_index]?.data?.[widget_index]
                  ?.dateFilters?.from,
                to: Section?.[section_index]?.data?.[widget_index]?.dateFilters
                  ?.to,
              },
              data_source: data_source,
            },
          ]
      : Section?.[section_index]?.data?.[widget_index]?.duration?.from
      ? [
          {
            attribute: "createddate",
            type: "datetime",
            columns: Section?.[section_index]?.data?.[widget_index]?.duration,
            data_source: data_source,
          },
        ]
      : []
    : Section?.[0]?.data?.[widget_index]?.dateFilters
    ? Section?.[0]?.data?.[widget_index]?.dateFilters?.columns
      ? Section?.[0]?.data?.[widget_index]?.dateFilters
      : [
          {
            attribute: "createddate",
            type: "datetime",
            columns: {
              from: Section?.[0]?.data?.[widget_index]?.dateFilters?.from,
              to: Section?.[0]?.data?.[widget_index]?.dateFilters?.to,
            },
            data_source: data_source,
          },
        ]
    : Section?.[0]?.data?.[widget_index]?.duration?.from
    ? [
        {
          attribute: "createddate",
          type: "datetime",
          columns: Section?.[0]?.data?.[widget_index]?.duration,
          data_source: data_source,
        },
      ]
    : [];

  //combine all filters array to make final filter array

  let totalFilter = [];
  let isSectionLocked = section_index
    ? Section[section_index] && Section[section_index]?.is_locked
      ? Section[section_index]?.is_locked
      : false
    : Section && Section[0]?.is_locked
    ? Section[0]?.is_locked
    : false;
  let isWidgetLocked = section_index
    ? Section[section_index] &&
      Section[section_index]?.data[widget_index]?.is_locked
      ? Section[section_index]?.data[widget_index]?.is_locked
      : false
    : Section && Section[0]?.data[widget_index]?.is_locked
    ? Section[0]?.data[widget_index]?.is_locked
    : false;
  let widget_type = section_index
    ? Section[section_index] && Section[section_index]?.data[widget_index]?.type
      ? Section[section_index]?.data[widget_index]?.type
      : false
    : Section && Section[0]?.data[widget_index]?.type
    ? Section[0]?.data[widget_index]?.type
    : false;
  let widget_data_source = section_index
    ? Section[section_index] &&
      Section[section_index]?.data[widget_index]?.data_source
      ? Section[section_index]?.data[widget_index]?.data_source
      : false
    : Section && Section[0]?.data[widget_index]?.data_source
    ? Section[0]?.data[widget_index]?.data_source
    : false;
  let widget_id = section_index
    ? Section[section_index] &&
      Section[section_index]?.data[widget_index]?.widget_id
      ? Section[section_index]?.data[widget_index]?.widget_id
      : false
    : Section && Section[0]?.data[widget_index]?.widget_id
    ? Section[0]?.data[widget_index]?.widget_id
    : false;
  widget_id = widget_id ? widget_id : false;
  widget_data_source = widget_data_source ? widget_data_source : false;
  if (isSectionLocked) {
    if (isWidgetLocked) {
      totalFilter = [...hidden_filter, ...quickFilter, ...WidgetFilter];
    } else if (!isWidgetLocked) {
      let finalFilter =
        widget_type === "predefined" &&
        widget_data_source !== "realtime" &&
        !(
          widget_id &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.length > 0 &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.includes(widget_id)
        )
          ? [...WidgetFilter]
          : [...sectionFilter, ...WidgetFilter];

      totalFilter = [
        ...hidden_filter,
        ...quickFilter,
        ...finalFilter,
        ...WidgetBrandFilter,
        ...WidgetDateFilter,
      ];
    }
  } else if (!isSectionLocked) {
    if (isWidgetLocked) {
      totalFilter = [...hidden_filter, ...quickFilter, ...WidgetFilter];
    } else if (!isWidgetLocked) {
      let finalFilter = [];

      finalFilter =
        widget_type === "predefined" &&
        widget_data_source !== "realtime" &&
        !(
          widget_id &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.length > 0 &&
          graphConditionConfig?.["ticket_user_widget_ids"]?.includes(widget_id)
        )
          ? [...WidgetFilter]
          : [...GlobalFilter, ...sectionFilter, ...WidgetFilter];
      totalFilter = [
        ...hidden_filter,
        ...quickFilter,
        ...finalFilter,
        ...sectionBrandFilter,
        ...WidgetBrandFilter,
        ...sectionDateFilter,
        ...WidgetDateFilter,
      ];
    }
  }

  return totalFilter;
};
export const getUniqueFilters = (finalFilter) => {
  const result = [];
  const map = new Map();
  for (const item of finalFilter) {
    if (!map.has(item?.attribute)) {
      map.set(item?.attribute, true);
      result.push({
        attribute: item?.attribute,
        type: item?.type,
        columns: item?.columns,
        predefined_filters: item?.predefined_filters,
        data_source: item?.data_source,
      });
    } else {
      const resultItemIndex = result.findIndex(
        (el) => el?.attribute === item?.attribute
      );
      if (resultItemIndex !== -1) {
        result[resultItemIndex].columns = item?.columns?.length
          ? item?.columns
          : [];
        // for (let i = 0; i < item?.columns?.length; i++) {
        //   if (
        //     !resultItem?.columns?.find(
        //       (el) => el?.name === item?.columns?.[i]?.name
        //     )
        //   ) {
        //     console.log("If got called ")
        //     resultItem?.columns.push({
        //       name: item?.columns[i]?.name ? item?.columns[i]?.name : null,
        //       type: item?.columns[i]?.type ? item?.columns[i]?.type : null,
        //       display_name: item?.columns[i]?.display_name ? item?.columns[i]?.display_name : null,
        //       brand_id: item?.columns[i]?.brand_id ? item?.columns[i]?.brand_id : null,
        //       profile_channel: item?.columns[i]?.profile_channel ? item?.columns[i]?.profile_channel : null,
        //     });
        //   } else {
        //     console.log("else got called ")
        //     resultItem.columns[i].type = item?.columns[i]?.type;
        //   }
        // }
      }
    }
  }
  return result;
};
export const getUpdatedPredefinedFilter = (widgetFilter, uniqueFilters) => {
  let finalFilter = uniqueFilters?.length ? [...uniqueFilters] : [];
  let predefinedWidgetFilter =
    widgetFilter?.length &&
    widgetFilter?.filter((el) => el?.predefined_filters);
  if (predefinedWidgetFilter && predefinedWidgetFilter?.length) {
    finalFilter = finalFilter?.map((el) => {
      for (let i = 0; i < predefinedWidgetFilter?.length; i++) {
        if (el?.attribute === predefinedWidgetFilter[i]?.attribute) {
          el = { ...el, ...predefinedWidgetFilter[i] };
          break;
        }
      }
      return el;
    });
  }
  return finalFilter;
};
export const dataDurations = {
  Hourly: [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
    { label: "13", value: 13 },
    { label: "14", value: 14 },
    { label: "15", value: 15 },
    { label: "16", value: 16 },
    { label: "17", value: 17 },
    { label: "18", value: 18 },
    { label: "19", value: 19 },
    { label: "20", value: 20 },
    { label: "21", value: 21 },
    { label: "22", value: 22 },
    { label: "23", value: 23 },
  ],
  Daily: [
    { label: "Today", value: "Today" },
    { label: "Yesterday", value: "Yesterday" },
    { label: "Last X days", value: "LastXDays" },
    { label: "This week so far", value: "ThisWkSoFar" },
    { label: "This month so far", value: "ThisMthSoFar" },
    { label: "Custom", value: "Custom" },
  ],
  Weekly: [
    { label: "This week so far", value: "ThisWkSoFar" },
    { label: "Last week", value: "LastWeek" },
    { label: "Custom", value: "Custom" },
  ],
  Monthly: [
    { label: "This month so far", value: "ThisMthSoFar" },
    { label: "Last month", value: "LastMonth" },
    { label: "Custom", value: "Custom" },
  ],
};

export const reportDeliveryDaysList = [
  { name: "S", isSelected: false, value: 1, fullName: "Sunday" },
  { name: "M", isSelected: false, value: 2, fullName: "Monday" },
  { name: "T", isSelected: false, value: 3, fullName: "Tuesday" },
  { name: "W", isSelected: false, value: 4, fullName: "Wednesday" },
  { name: "T", isSelected: false, value: 5, fullName: "Thursday" },
  { name: "F", isSelected: false, value: 6, fullName: "Friday" },
  { name: "S", isSelected: false, value: 7, fullName: "Saturday" },
];

export const timeOptionList = [
  { label: "12:00 AM" },
  { label: "12:15 AM" },
  { label: "12:30 AM" },
  { label: "12:45 AM" },
  { label: "01:00 AM" },
  { label: "01:15 AM" },
  { label: "01:30 AM" },
  { label: "01:45 AM" },
  { label: "02:00 AM" },
  { label: "02:15 AM" },
  { label: "02:30 AM" },
  { label: "02:45 AM" },
  { label: "03:00 AM" },
  { label: "03:15 AM" },
  { label: "03:30 AM" },
  { label: "03:45 AM" },
  { label: "04:00 AM" },
  { label: "04:15 AM" },
  { label: "04:30 AM" },
  { label: "04:45 AM" },
  { label: "05:00 AM" },
  { label: "05:15 AM" },
  { label: "05:30 AM" },
  { label: "05:45 AM" },
  { label: "06:00 AM" },
  { label: "06:15 AM" },
  { label: "06:30 AM" },
  { label: "06:45 AM" },
  { label: "07:00 AM" },
  { label: "07:15 AM" },
  { label: "07:30 AM" },
  { label: "07:45 AM" },
  { label: "08:00 AM" },
  { label: "08:15 AM" },
  { label: "08:30 AM" },
  { label: "08:45 AM" },
  { label: "09:00 AM" },
  { label: "09:15 AM" },
  { label: "09:30 AM" },
  { label: "09:45 AM" },
  { label: "10:00 AM" },
  { label: "10:15 AM" },
  { label: "10:30 AM" },
  { label: "10:45 AM" },
  { label: "11:00 AM" },
  { label: "11:15 AM" },
  { label: "11:30 AM" },
  { label: "11:45 AM" },
  { label: "12:00 PM" },
  { label: "12:15 PM" },
  { label: "12:30 PM" },
  { label: "12:45 PM" },
  { label: "01:00 PM" },
  { label: "01:15 PM" },
  { label: "01:30 PM" },
  { label: "01:45 PM" },
  { label: "02:00 PM" },
  { label: "02:15 PM" },
  { label: "02:30 PM" },
  { label: "02:45 PM" },
  { label: "03:00 PM" },
  { label: "03:15 PM" },
  { label: "03:30 PM" },
  { label: "03:45 PM" },
  { label: "04:00 PM" },
  { label: "04:15 PM" },
  { label: "04:30 PM" },
  { label: "04:45 PM" },
  { label: "05:00 PM" },
  { label: "05:15 PM" },
  { label: "05:30 PM" },
  { label: "05:45 PM" },
  { label: "06:00 PM" },
  { label: "06:15 PM" },
  { label: "06:30 PM" },
  { label: "06:45 PM" },
  { label: "07:00 PM" },
  { label: "07:15 PM" },
  { label: "07:30 PM" },
  { label: "07:45 PM" },
  { label: "08:00 PM" },
  { label: "08:15 PM" },
  { label: "08:30 PM" },
  { label: "08:45 PM" },
  { label: "09:00 PM" },
  { label: "09:15 PM" },
  { label: "09:30 PM" },
  { label: "09:45 PM" },
  { label: "10:00 PM" },
  { label: "10:15 PM" },
  { label: "10:30 PM" },
  { label: "10:45 PM" },
  { label: "11:00 PM" },
  { label: "11:15 PM" },
  { label: "11:30 PM" },
  { label: "11:45 PM" },
  { label: "11:59 PM" },
];

export const API_RETRY_LIMIT = 1;

export const days = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

export const handleScheduleDateChange = (
  e,
  frequency,
  dataDuration,
  lastXDays,
  scheduleDay,
  scheduleTime,
  scheduleMonth,
  timeOffsetText,
  scheduleDays,
  reportDeliveryTime
) => {
  let startDate,
    endDate,
    scheduleDateTime,
    scheduleReportJSON = null;
  if (frequency === "Hourly") {
    startDate = moment(e).subtract(dataDuration, "h");
    endDate = moment(e);
    scheduleDateTime = moment(e);
    const { workingStartTime, workingEndTime } = getReportWorkingDates(
      e,
      reportDeliveryTime
    );

    scheduleReportJSON = {
      ScheduleDetails: {
        ScheduleDays: scheduleDays,
        WorkingHrs: {
          startTime: moment(workingStartTime).format("HH:mm:ss"),
          endTime: moment(workingEndTime).format("HH:mm:ss"),
        },
        DataDuration: dataDuration,
        ScheduleDateTime: moment(scheduleDateTime)
          .tz(timeOffsetText.split(" ")[1])
          .format("YYYY-MM-DD HH:mm:ss"),
      },
      timeOffsetText: timeOffsetText,
    };
  } else if (frequency === "Daily") {
    if (dataDuration === "Today") {
      startDate = moment(e).tz(timeOffsetText.split(" ")[1]).startOf("day");
      endDate = moment(e).tz(timeOffsetText.split(" ")[1]);
      scheduleDateTime = moment(e).tz(timeOffsetText.split(" ")[1]);
    } else if (dataDuration === "Yesterday") {
      startDate = moment(e)
        .tz(timeOffsetText.split(" ")[1])
        .startOf("day")
        .subtract(1, "days");
      endDate = moment(e)
        .tz(timeOffsetText.split(" ")[1])
        .endOf("day")
        .subtract(1, "days");
      scheduleDateTime = moment(e).tz(timeOffsetText.split(" ")[1]);
    } else if (dataDuration === "LastXDays") {
      startDate = moment(e)
        .tz(timeOffsetText.split(" ")[1])
        .subtract(lastXDays, "days");
      endDate = moment(e).tz(timeOffsetText.split(" ")[1]);
      scheduleDateTime = moment(e).tz(timeOffsetText.split(" ")[1]);
    } else if (dataDuration === "ThisWkSoFar") {
      startDate = moment(e).tz(timeOffsetText.split(" ")[1]).startOf("week");
      endDate = moment(e).tz(timeOffsetText.split(" ")[1]);
      scheduleDateTime = moment(e).tz(timeOffsetText.split(" ")[1]);
    } else if (dataDuration === "ThisMthSoFar") {
      startDate = moment(e).tz(timeOffsetText.split(" ")[1]).startOf("month");
      endDate = moment(e).tz(timeOffsetText.split(" ")[1]);
      scheduleDateTime = moment(e).tz(timeOffsetText.split(" ")[1]);
    } else if (dataDuration === "Custom") {
      if (typeof e?.from === "string") {
        startDate = moment(e?.from);
        endDate = moment(e?.to);
      } else {
        scheduleDateTime = moment(e).tz(timeOffsetText.split(" ")[1]);
      }
    }

    if (dataDuration === "LastXDays" && lastXDays) {
      scheduleReportJSON = {
        ScheduleDetails: {
          [dataDuration]: {
            ScheduleDateTime: moment(scheduleDateTime)
              .tz(timeOffsetText.split(" ")[1])
              .format("YYYY-MM-DD HH:mm:ss"),

            dataDuration: lastXDays,
          },
        },
        timeOffsetText: timeOffsetText,
      };
    } else {
      scheduleReportJSON = {
        ScheduleDetails: {
          [dataDuration]: {
            ScheduleDateTime: moment(scheduleDateTime)
              .tz(timeOffsetText.split(" ")[1])
              .format("YYYY-MM-DD HH:mm:ss"),
          },
        },
        timeOffsetText: timeOffsetText,
      };
    }
  } else if (frequency === "Weekly") {
    const isCurrentWeek = moment()
      .tz(timeOffsetText.split(" ")[1])
      .startOf("week")
      .add({
        days: scheduleDay - 1,
        hours:
          moment(scheduleTime, ["h:mm A"])?.format("HH:mm")?.split(":")[0] || 0,
        minutes:
          moment(scheduleTime, ["h:mm A"])
            ?.format("HH:mm")
            ?.split(":")[1]
            ?.split(" ")[0] || 0,
      })
      .diff(moment().tz(timeOffsetText.split(" ")[1]));
    if (dataDuration === "ThisWkSoFar") {
      if (isCurrentWeek > 0) {
        startDate = moment().tz(timeOffsetText.split(" ")[1]).startOf("week");
        endDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .startOf("week")
          .add({
            days: scheduleDay - 1,
            hours:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[0] || 0,
            minutes:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[1]
                ?.split(" ")[0] || 0,
          });
      } else {
        startDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .add(1, "w")
          .startOf("week");
        endDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .add(1, "w")
          .startOf("week")
          .add({
            days: scheduleDay - 1,
            hours:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[0] || 0,
            minutes:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[1]
                ?.split(" ")[0] || 0,
          });
      }
      scheduleDateTime = endDate;
    } else if (dataDuration === "LastWeek") {
      if (isCurrentWeek > 0) {
        startDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .startOf("week")
          .subtract(1, "week");
        endDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .endOf("week")
          .subtract(1, "week");
        scheduleDateTime = moment()
          .tz(timeOffsetText.split(" ")[1])
          .startOf("week")
          .add({
            days: scheduleDay - 1,
            hours:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[0] || 0,
            minutes:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[1]
                ?.split(" ")[0] || 0,
          });
      } else {
        startDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .add(1, "w")
          .startOf("week")
          .subtract(1, "week");
        endDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .add(1, "w")
          .endOf("week")
          .subtract(1, "week");
        scheduleDateTime = moment()
          .tz(timeOffsetText.split(" ")[1])
          .add(1, "w")
          .startOf("week")
          .add({
            days: scheduleDay - 1,
            hours:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[0] || 0,
            minutes:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[1]
                ?.split(" ")[0] || 0,
          });
      }
    } else if (dataDuration === "Custom") {
      if (typeof e?.from === "string") {
        startDate = moment(e?.from);
        endDate = moment(e?.to);
      } else {
        if (isCurrentWeek > 0) {
          scheduleDateTime = moment()
            .tz(timeOffsetText.split(" ")[1])
            .startOf("week")
            .add({
              days: scheduleDay - 1,
              hours:
                moment(scheduleTime, ["h:mm A"])
                  ?.format("HH:mm")
                  ?.split(":")[0] || 0,
              minutes:
                moment(scheduleTime, ["h:mm A"])
                  ?.format("HH:mm")
                  ?.split(":")[1]
                  ?.split(" ")[0] || 0,
            });
        } else {
          scheduleDateTime = moment()
            .tz(timeOffsetText.split(" ")[1])
            .add(1, "w")
            .startOf("week")
            .add({
              days: scheduleDay - 1,
              hours:
                moment(scheduleTime, ["h:mm A"])
                  ?.format("HH:mm")
                  ?.split(":")[0] || 0,
              minutes:
                moment(scheduleTime, ["h:mm A"])
                  ?.format("HH:mm")
                  ?.split(":")[1]
                  ?.split(" ")[0] || 0,
            });
        }
      }
    }
    if (scheduleDay && scheduleTime) {
      scheduleReportJSON = {
        ScheduleDetails: {
          [dataDuration]: {
            ScheduleDays: scheduleDay,
            ScheduleTime: scheduleTime,
          },
        },
        timeOffsetText: timeOffsetText,
      };
    }
  } else if (frequency === "Monthly") {
    let daysInMonth;
    const isCurrentMonth = moment()
      .tz(timeOffsetText.split(" ")[1])
      .startOf("month")
      .add({
        days: scheduleMonth - 1,
        hours:
          moment(scheduleTime, ["h:mm A"])?.format("HH:mm")?.split(":")[0] || 0,
        minutes:
          moment(scheduleTime, ["h:mm A"])
            ?.format("HH:mm")
            ?.split(":")[1]
            ?.split(" ")[0] || 0,
      })
      .diff(moment().tz(timeOffsetText.split(" ")[1]));
    if (dataDuration === "ThisMthSoFar") {
      if (isCurrentMonth > 0) {
        daysInMonth = moment().tz(timeOffsetText.split(" ")[1]).daysInMonth();
        startDate = moment().tz(timeOffsetText.split(" ")[1]).startOf("month");
        endDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .startOf("month")
          .add({
            days:
              (scheduleMonth >= daysInMonth ? daysInMonth : scheduleMonth) - 1,
            hours:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[0] || 0,
            minutes:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[1]
                ?.split(" ")[0] || 0,
          });
      } else {
        daysInMonth = moment()
          .tz(timeOffsetText.split(" ")[1])
          .add(1, "M")
          .daysInMonth();
        startDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .add(1, "M")
          .startOf("month");
        endDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .add(1, "M")
          .startOf("month")
          .add({
            days:
              (scheduleMonth >= daysInMonth ? daysInMonth : scheduleMonth) - 1,
            hours:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[0] || 0,
            minutes:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[1]
                ?.split(" ")[0] || 0,
          });
      }
      scheduleDateTime = endDate;
    } else if (dataDuration === "LastMonth") {
      if (isCurrentMonth > 0) {
        daysInMonth = moment().tz(timeOffsetText.split(" ")[1]).daysInMonth();
        startDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .subtract(1, "M")
          .startOf("month");
        endDate = moment()
          .tz(timeOffsetText.split(" ")[1])
          .subtract(1, "M")
          .endOf("month");
        scheduleDateTime = moment()
          .tz(timeOffsetText.split(" ")[1])
          .startOf("month")
          .add({
            days:
              (scheduleMonth >= daysInMonth ? daysInMonth : scheduleMonth) - 1,
            hours:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[0] || 0,
            minutes:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[1]
                ?.split(" ")[0] || 0,
          });
      } else {
        daysInMonth = moment()
          .tz(timeOffsetText.split(" ")[1])
          .add(1, "M")
          .daysInMonth();
        startDate = moment().tz(timeOffsetText.split(" ")[1]).startOf("month");
        endDate = moment().tz(timeOffsetText.split(" ")[1]).endOf("month");
        scheduleDateTime = moment()
          .tz(timeOffsetText.split(" ")[1])
          .add(1, "M")
          .startOf("month")
          .add({
            days:
              (scheduleMonth >= daysInMonth ? daysInMonth : scheduleMonth) - 1,
            hours:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[0] || 0,
            minutes:
              moment(scheduleTime, ["h:mm A"])
                ?.format("HH:mm")
                ?.split(":")[1]
                ?.split(" ")[0] || 0,
          });
      }
    } else if (dataDuration === "Custom") {
      daysInMonth = moment().daysInMonth();
      if (typeof e?.from === "string") {
        startDate = moment(e?.from);
        endDate = moment(e?.to);
      } else {
        if (isCurrentMonth > 0) {
          scheduleDateTime = moment()
            .startOf("month")
            .add({
              days:
                (scheduleMonth >= daysInMonth ? daysInMonth : scheduleMonth) -
                1,
              hours:
                moment(scheduleTime, ["h:mm A"])
                  ?.format("HH:mm")
                  ?.split(":")[0] || 0,
              minutes:
                moment(scheduleTime, ["h:mm A"])
                  ?.format("HH:mm")
                  ?.split(":")[1]
                  ?.split(" ")[0] || 0,
            });
        } else {
          daysInMonth = moment().add(1, "M").daysInMonth();
          scheduleDateTime = moment()
            .startOf("month")
            .add(1, "M")
            .add({
              days:
                (scheduleMonth >= daysInMonth ? daysInMonth : scheduleMonth) -
                1,
              hours:
                moment(scheduleTime, ["h:mm A"])
                  ?.format("HH:mm")
                  ?.split(":")[0] || 0,
              minutes:
                moment(scheduleTime, ["h:mm A"])
                  ?.format("HH:mm")
                  ?.split(":")[1]
                  ?.split(" ")[0] || 0,
            });
        }
      }
    }
    if (scheduleMonth && scheduleTime) {
      scheduleReportJSON = {
        ScheduleDetails: {
          [dataDuration]: {
            ScheduleDays: scheduleMonth,
            ScheduleTime: scheduleTime,
          },
        },
        timeOffsetText: timeOffsetText,
      };
    }
  }

  return { startDate, endDate, scheduleDateTime, scheduleReportJSON };
};

export const getReportWorkingDates = (scheduleDate, reportDeliveryTime) => {
  const workingStartTime = moment(scheduleDate ? scheduleDate : undefined)
    .startOf("day")
    .add({
      hours: moment(reportDeliveryTime?.startTime, ["h:mm A"])
        .format("HH:mm")
        ?.split(":")[0],
      minutes: moment(reportDeliveryTime?.startTime, ["h:mm A"])
        .format("HH:mm")
        ?.split(":")[1],
    });
  const workingEndTime = moment(scheduleDate ? scheduleDate : undefined)
    .startOf("day")
    .add({
      hours: moment(reportDeliveryTime?.endTime, ["h:mm A"])
        .format("HH:mm")
        ?.split(":")[0],
      minutes: moment(reportDeliveryTime?.endTime, ["h:mm A"])
        .format("HH:mm")
        ?.split(":")[1],
    });
  return { workingStartTime, workingEndTime };
};

export const handleGenerateDateChange = (e) => {
  let startDate,
    endDate = null;

  startDate = moment(e?.from).format("YYYY-MM-DD HH:mm:ss");
  endDate = moment(e?.to).format("YYYY-MM-DD HH:mm:ss");
  return { startDate, endDate, relative: e?.relative ? e?.relative : null };
};

export const getTimeInterval = (enddate, startdate) => {
  let currentDate = moment(new Date()).format("YYYY/MM/DD H:mm");
  let hourDiff = moment(currentDate).diff(moment(startdate), "hour");

  let diff;
  if (hourDiff < 24) {
    diff = hourDiff;
  } else {
    diff = moment(enddate).diff(moment(startdate), "hour");
  }

  let defaultVal;
  let timeList;
  let obj;

  if (diff == 1) {
    defaultVal = 60;
    timeList = [60];
  } else if (diff <= 3) {
    defaultVal = 60;
    timeList = [60, 120];
  } else if (diff <= 5) {
    defaultVal = 60;
    timeList = [60, 120, 180, 240];
  } else if (diff <= 6) {
    defaultVal = 60;
    timeList = [60, 120, 180, 240, 360];
  } else if (diff <= 12) {
    defaultVal = 60;
    timeList = [60, 120, 180, 240, 360, 720];
  } else if (diff < 24) {
    defaultVal = 60;
    timeList = [60, 120, 180, 240, 360];
  } else if (diff < 2 * 24) {
    defaultVal = 240;
    timeList = [60, 240, 480, 720];
  } else if (diff < 7 * 24) {
    defaultVal = 720;
    timeList = [240, 480, 720, "D"];
  } else if (diff < 14 * 24) {
    defaultVal = 720;
    timeList = [480, 720, "D"];
  } else if (diff < 31 * 24) {
    defaultVal = "W";
    timeList = ["D", "W"];
  } else if (diff < 90 * 24) {
    defaultVal = "W";
    timeList = ["W", "M", "Y"];
  } else if (diff < 365 * 24) {
    defaultVal = "M";
    timeList = ["W", "M", "Y"];
  } else if (diff > 365 * 24) {
    defaultVal = "Y";
    timeList = ["W", "M", "Y"];
  }
  obj = {
    defaultVal,
    timeList,
  };
  return obj;
};
export const getNewTimeIntervalDate = (
  lastEndDate,
  dataSource,
  attribute,
  dateAggregation
) => {
  if (!lastEndDate) return lastEndDate;
  let hourlyList = ["1h", "2h", "3h", "4h", "6h", "8h", "12h"];
  let newDate = null;
  if (!dateAggregation || dateAggregation === "D") {
    newDate = moment(deepCopy(lastEndDate))
      ?.add(1, "days")
      ?.format("YYYY/MM/DD HH:mm");
  } else if (dateAggregation === "1m") {
    let hours = parseInt(String(dateAggregation)?.replace("h", ""));
    newDate = moment(deepCopy(lastEndDate))
      ?.add(hours, "minutes")
      ?.format("YYYY/MM/DD HH:mm");
  } else if (hourlyList?.includes(dateAggregation)) {
    let hours = parseInt(String(dateAggregation)?.replace("h", ""));
    newDate = moment(deepCopy(lastEndDate))
      ?.add(hours, "hours")
      ?.format("YYYY/MM/DD HH:mm");
  }
  return newDate;
};
export const getTimeIntervalDate = (
  enddate,
  startdate,
  data_source,
  attribute
) => {
  if (data_source === "page" || data_source === "nps") {
    let currentDate = moment(new Date()).format("YYYY/MM/DD H:mm");
    let hourDiff = moment(currentDate).diff(moment(startdate), "hour");

    let diff;
    if (hourDiff < 24) {
      diff = hourDiff;
    } else {
      diff = moment(enddate).diff(moment(startdate), "hour");
    }

    let defaultVal;
    let timeList;
    let obj;

    if (diff == 1) {
      defaultVal = null;
      timeList = ["D"];
    } else if (diff <= 3) {
      defaultVal = null;
      timeList = ["D"];
    } else if (diff <= 5) {
      defaultVal = null;
      timeList = ["D"];
    } else if (diff <= 6) {
      defaultVal = null;
      timeList = ["D"];
    } else if (diff <= 12) {
      defaultVal = null;
      timeList = ["D"];
    } else if (diff < 24) {
      defaultVal = null;
      timeList = ["D"];
    } else if (diff < 2 * 24) {
      defaultVal = null;
      timeList = ["D"];
    } else if (diff < 7 * 24) {
      defaultVal = null;
      timeList = ["D"];
    } else if (diff < 14 * 24) {
      defaultVal = null;
      timeList = ["D"];
    } else if (diff < 31 * 24) {
      defaultVal = null;
      timeList = ["D", "ww"];
    } else if (diff < 90 * 24) {
      defaultVal = "ww";
      timeList = ["ww", "M"];
    } else if (diff < 365 * 24) {
      defaultVal = "M";
      timeList = ["ww", "M"];
    } else if (diff > 365 * 24) {
      defaultVal = "M";
      timeList = ["ww", "M", "Y"];
    }
    obj = {
      defaultVal,
      timeList,
    };
    return obj;
  } else if (data_source === "ticket") {
    let currentDate = moment(new Date()).format("YYYY/MM/DD H:mm");
    let hourDiff = moment(currentDate).diff(moment(startdate), "hour");

    let diff;
    if (hourDiff < 24) {
      diff = hourDiff;
    } else {
      diff = moment(enddate).diff(moment(startdate), "hour");
    }

    let defaultVal;
    let timeList;
    let obj;
    if (attribute === "FLRBenchmark") {
      defaultVal = 30;
      timeList = [5, 10, 15, 30, 1 * 60, 4 * 60];
    } else if (attribute === "ResolutionBenchmark") {
      defaultVal = 240;
      timeList = [1 * 60, 2 * 60, 4 * 60, 8 * 60, 16 * 60, 24 * 60, 48 * 60];
    } else {
      if (diff == 1) {
        defaultVal = "1h";
        timeList = ["1h"];
      } else if (diff <= 3) {
        defaultVal = "1h";
        timeList = ["1h", "2h"];
      } else if (diff <= 5) {
        defaultVal = "1h";
        timeList = ["1h", "2h", "3h", "4h"];
      } else if (diff <= 6) {
        defaultVal = "1h";
        timeList = ["1h", "2h", "3h", "4h", "6h"];
      } else if (diff <= 12) {
        defaultVal = "1h";
        timeList = ["1h", "2h", "3h", "4h", "6h", "12h"];
      } else if (diff < 24) {
        defaultVal = "1h";
        timeList = ["1h", "2h", "3h", "4h", "6h"];
      } else if (diff < 2 * 24) {
        defaultVal = "1h";
        timeList = ["1h", "4h", "8h", "12h"];
      } else if (diff < 7 * 24) {
        defaultVal = "8h";
        timeList = ["4h", "8h", "12h", "D"];
      } else if (diff < 14 * 24) {
        defaultVal = "8h";
        timeList = ["8h", "12h", "D"];
      } else if (diff < 31 * 24) {
        defaultVal = "D";
        timeList = ["D", "ww"];
      } else if (diff < 60 * 24) {
        defaultVal = "ww";
        timeList = ["D", "ww", "M"];
      } else if (diff < 90 * 24) {
        defaultVal = "ww";
        timeList = ["ww", "M", "Y"];
      } else if (diff < 365 * 24) {
        defaultVal = "M";
        timeList = ["ww", "M", "Y"];
      } else if (diff > 365 * 24) {
        defaultVal = "M";
        timeList = ["ww", "M", "Y"];
      }
    }

    obj = {
      defaultVal,
      timeList,
    };
    return obj;
  } else {
    let currentDate = moment(new Date()).format("YYYY/MM/DD H:mm");
    let hourDiff = moment(currentDate).diff(moment(startdate), "hour");

    let diff;
    if (hourDiff < 24) {
      diff = hourDiff;
    } else {
      diff = moment(enddate).diff(moment(startdate), "hour");
    }

    let defaultVal;
    let timeList;
    let obj;

    if (diff == 1) {
      defaultVal = "1h";
      timeList = ["1h"];
    } else if (diff <= 3) {
      defaultVal = "1h";
      timeList = ["1h", "2h"];
    } else if (diff <= 5) {
      defaultVal = "1h";
      timeList = ["1h", "2h", "3h", "4h"];
    } else if (diff <= 6) {
      defaultVal = "1h";
      timeList = ["1h", "2h", "3h", "4h", "6h"];
    } else if (diff <= 12) {
      defaultVal = "1h";
      timeList = ["1h", "2h", "3h", "4h", "6h", "12h"];
    } else if (diff < 24) {
      defaultVal = "1h";
      timeList = ["1h", "2h", "3h", "4h", "6h"];
    } else if (diff < 2 * 24) {
      defaultVal = "1h";
      timeList = ["1h", "4h", "8h", "12h"];
    } else if (diff < 7 * 24) {
      defaultVal = "D";
      timeList = ["4h", "8h", "12h", "D"];
    } else if (diff < 14 * 24) {
      defaultVal = "D";
      timeList = ["8h", "12h", "D"];
    } else if (diff < 31 * 24) {
      defaultVal = null;
      timeList = ["D", "ww"];
    } else if (diff < 60 * 24) {
      defaultVal = "ww";
      timeList = ["D", "ww", "M"];
    } else if (diff < 90 * 24) {
      defaultVal = "ww";
      timeList = ["ww", "M"];
    } else if (diff < 365 * 24) {
      defaultVal = "M";
      timeList = ["ww", "M"];
    } else if (diff > 365 * 24) {
      defaultVal = "M";
      timeList = ["ww", "M", "Y"];
    }
    obj = {
      defaultVal,
      timeList,
    };
    return obj;
  }
};

export const getTimeIntervalForDate = (enddate, startdate, chart_type, att) => {
  let diff = moment(enddate).diff(moment(startdate), "hour");

  let defaultVal;
  let timeList;
  let obj;
  if (att === "recorddate") {
    if (diff < 24) {
      defaultVal = chart_type === "pie" || chart_type === "donut" ? "mm" : null;
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "dd", "dw", "mm", "ww", "qq"];
    } else if (diff < 2 * 24) {
      defaultVal = chart_type === "pie" || chart_type === "donut" ? "mm" : null;
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "dd", "dw", "mm", "ww", "qq"];
    } else if (diff < 7 * 24) {
      defaultVal = chart_type === "pie" || chart_type === "donut" ? "mm" : null;
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "dd", "dw", "mm", "ww", "qq"];
    } else if (diff < 14 * 24) {
      defaultVal = chart_type === "pie" || chart_type === "donut" ? "mm" : null;
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "dd", "dw", "mm", "ww", "qq"];
    } else if (diff <= 31 * 24) {
      defaultVal = chart_type === "pie" || chart_type === "donut" ? "mm" : null;
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "dd", "dw", "mm", "ww", "qq"];
    } else if (diff <= 180 * 24) {
      defaultVal = "ww";
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "dd", "dw", "mm", "ww", "qq"];
    } else if (diff < 180 * 24) {
      defaultVal = "ww";
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : ["hh", "dw", "mm", "ww", "qq"];
    } else {
      defaultVal = "mm";
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : ["hh", "dw", "mm", "qq"];
    }
  } else {
    if (diff < 24) {
      defaultVal = chart_type === "pie" || chart_type === "donut" ? "mm" : null;
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "hh", "dd", "dw", "mm", "ww", "qq"];
    } else if (diff < 2 * 24) {
      defaultVal = chart_type === "pie" || chart_type === "donut" ? "mm" : null;
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "hh", "dd", "dw", "mm", "ww", "qq"];
    } else if (diff < 7 * 24) {
      defaultVal = chart_type === "pie" || chart_type === "donut" ? "mm" : null;
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "hh", "dd", "dw", "mm", "ww", "qq"];
    } else if (diff < 14 * 24) {
      defaultVal = chart_type === "pie" || chart_type === "donut" ? "mm" : null;
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "hh", "dd", "dw", "mm", "ww", "qq"];
    } else if (diff <= 31 * 24) {
      defaultVal = chart_type === "pie" || chart_type === "donut" ? "mm" : null;
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "hh", "dd", "dw", "mm", "ww", "qq"];
    } else if (diff <= 180 * 24) {
      defaultVal = "ww";
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : [null, "hh", "dd", "dw", "mm", "ww", "qq"];
    } else if (diff < 180 * 24) {
      defaultVal = "ww";
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : ["hh", "dd", "dw", "mm", "ww", "qq"];
    } else {
      defaultVal = "mm";
      timeList =
        chart_type === "pie" || chart_type === "donut"
          ? ["mm", "ww", "qq"]
          : ["hh", "dd", "dw", "mm", "qq"];
    }
  }

  obj = {
    defaultVal,
    timeList,
  };
  return obj;
};

export const getBrands = (
  LogicalBrands,
  brand_list,
  singleBrands,
  brand_groups,
  data_source
) => {
  let brandCol = [];
  let brandGroupCol = [];
  if (brand_list && brand_list?.length > 0) {
    brandCol = singleBrands
      ?.filter((o1) => brand_list?.some((o2) => o1?.brand_id == o2?.brand_id))
      .map((o) => {
        return {
          group: false,
          name: o?.brand_id,
          type: "include",
          brand_friendly_name: o?.brand_friendly_name,
          competitor: o?.competitor,
          competitorList: o?.competitorList,
          brand_name: o?.brand_name,
          brand_logo: o?.brand_logo,
          brand_id: o?.brand_id,
        };
      });
  }

  if (
    brand_groups &&
    brand_groups?.length > 0 &&
    brand_groups?.[0]?.brand_group_name
  ) {
    brandGroupCol = LogicalBrands?.filter((o1) =>
      brand_groups?.some((o2) => o1?.brand_group_name == o2?.brand_group_name)
    ).map((o) => {
      return {
        group: true,
        name: o?.brand_group_name,
        type: "include",
        brand_friendly_name: o?.brand_group_name,
        brand_group_name: o?.brand_group_name,
        brand_logo_image: o?.brand_logo_image,
      };
    });
  }

  let finalBrands = {
    attribute: "BrandID",
    type: "varchar",
    columns: brandCol && brandGroupCol ? [...brandCol, ...brandGroupCol] : [],
    data_source: data_source,
  };

  return finalBrands?.columns?.length > 0 ? finalBrands : null;
};

export const secondsToDhms = (seconds) => {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " D, " : " D, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " h, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " m, " : " m, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
export const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};
export const kFormatter = (num, roundOfNotFlag, kpi) => {
  let isNegative = num < 0;
  if (Math.abs(num) >= 1000000000) {
    return (
      (isNegative ? "-" : "") +
      (Math.abs(num) / 1000000000).toFixed(1).replace(/\.0$/, "") +
      "G"
    );
  } else if (Math.abs(num) >= 1000000) {
    return (
      (isNegative ? "-" : "") +
      (Math.abs(num) / 1000000).toFixed(1).replace(/\.0$/, "") +
      "M"
    );
  } else if (Math.abs(num) >= 1000) {
    return (
      (isNegative ? "-" : "") +
      (Math.abs(num) / 1000).toFixed(1).replace(/\.0$/, "") +
      "k"
    );
  } else if (Math.abs(num)) {
    if (isFloat(num)) {
      if (kpi) {
        if (roundOfNotFlag) {
          return (isNegative ? "-" : "") + Math.abs(num).toFixed(2);
        } else {
          return (
            (isNegative ? "-" : "") +
            Math?.abs(num)?.toFixed(0)?.replace(/\.0$/, "")
          );
        }
      } else {
        return (
          (isNegative ? "-" : "") +
          Math?.abs(num)?.toFixed(1)?.replace(/\.0$/, "")
        );
      }
    } else {
      return num;
    }
  } else return num;
};

export const getUTCOffset = () => {
  const d = new Date();
  let utcOffset = d.getTimezoneOffset();
  return utcOffset;
};

export const getDefaultCompBrand = (competitorBrands) => {
  let comp_arr =
    competitorBrands?.length > 0 &&
    competitorBrands[0]?.comp_brand_list?.filter((el, i) => {
      if (i < 5) return el;
    });
  let a = [
    {
      group: false,
      name: competitorBrands[0]?.brand_id,
      type: "include",
      brand_name: competitorBrands[0]?.brand_name,
      brand_friendly_name: competitorBrands[0]?.brand_friendly_name,
      brand_color: competitorBrands[0]?.brand_color,
      brand_group_name: null,
      competitor: true,
      competitorList:
        comp_arr?.length > 0 &&
        comp_arr?.map((el, i) => {
          return {
            brand_id: el?.comp_brand_id,
            brand_name: el?.comp_brand_name,
            brand_friendly_name: el?.comp_brand_friendly_name,
            comp_brand_color: el?.comp_brand_color,
          };
        }),
    },
  ];
  return a;
};
export const getSelectedCompBrand = (
  competitorBrands,
  brand_ids,
  comp_brand_list
) => {
  let index = competitorBrands?.findIndex(
    (el) => el?.brand_id == brand_ids[0]?.brand_id
  );
  let obj = competitorBrands?.[index];

  let brand_id_arr = comp_brand_list?.map((el) => el.brand_id);

  let arr = obj?.comp_brand_list?.filter((el) =>
    brand_id_arr.includes(el?.comp_brand_id)
  );

  arr?.map((el) => {
    el.brand_name = el?.comp_brand_name;
    el.brand_id = el?.comp_brand_id;
    el.brand_friendly_name = el?.comp_brand_friendly_name;
    el.comp_brand_color = el?.comp_brand_color;
  });

  let finalObj = [
    {
      group: false,
      name: obj?.brand_id,
      type: "include",
      brand_name: obj?.brand_name,
      brand_friendly_name: obj?.brand_friendly_name,
      brand_group_name: false,
      competitor: true,
      competitorList: arr,
    },
  ];
  return finalObj;
};
export const deepCopy = (oldValue) => {
  let newValue;
  try {
    let strValue = JSON.stringify(oldValue);
    newValue = JSON.parse(strValue);
  } catch (error) {
    newValue = oldValue;
  }
  return newValue;
};
export const getDuplicateWidgets = (
  compBrandList,
  widget,
  singleBrands,
  objForTemporyWordFunctionality
) => {
  if (!compBrandList || !widget) return null;
  if (compBrandList?.length > 0) {
    let duplicateWidgets = [];
    compBrandList?.forEach((br, i) => {
      let newWidgetData = deepCopy(widget);
      let brIndex = -1;
      if (!(br?.brand_friendly_name && br?.brand_friendly_name?.length > 0)) {
        brIndex =
          singleBrands &&
          singleBrands?.findIndex((s) => s?.brand_id === br?.brand_id);
      }
      newWidgetData["com_brand_ids"] = [br];
      newWidgetData.span =
        widget["chart"]["chart_type"] === "post-card" ||
        widget["chart"]["chart_type"] === "author-card"
          ? "full"
          : "half";
      if (i === 0) {
        newWidgetData.originalWidgetName = deepCopy(widget["widget_name"]);
      }
      newWidgetData.widget_name =
        br?.brand_friendly_name && br?.brand_friendly_name?.length > 0
          ? widget["widget_name"] + " (" + br?.brand_friendly_name?.trim() + ")"
          : brIndex > -1 && singleBrands
          ? widget["widget_name"] +
            " (" +
            singleBrands[brIndex]["brand_friendly_name"]?.trim() +
            ")"
          : widget["chart"]["chart_type"];
      newWidgetData.duplicate_for_brands = true;
      if (i !== 0) {
        // newWidgetData.widget_id = uuid();
        newWidgetData.childId = widget["widget_id"];
      } else {
        newWidgetData.parentId = widget["widget_id"];
      }
      if (objForTemporyWordFunctionality) {
        let widget_id = widget["widget_id"] + "#" + br?.brand_id;
        let word =
          objForTemporyWordFunctionality?.temporary_words?.[
            objForTemporyWordFunctionality?.template_id
          ]?.[objForTemporyWordFunctionality?.section_id]?.[widget_id]
            ?.exclude_words;
        let temp_exclude_words = word?.length ? word : null;
        newWidgetData.temp_exclude_words = temp_exclude_words;
      }

      duplicateWidgets.push(newWidgetData);
    });
    return duplicateWidgets;
  } else {
    return null;
  }
};
export const getFilterDuplicateWidgets = (
  Section,
  forParticularSection,
  objForTemporyWordFunctionality
) => {
  let sectionObject;
  if (forParticularSection) {
    sectionObject = Section?.map((el, i) => {
      if (i === forParticularSection?.section_index) {
        if (el?.data && el?.data?.length > 0) {
          let sectionWidgetObject = [];
          el?.data &&
            el?.data?.map((e) => {
              if (
                forParticularSection?.widget_id === e?.parentId ||
                forParticularSection?.widget_id === e?.childId
              ) {
                if (!(e?.childId && e?.duplicate_for_brands)) {
                  if (e?.duplicate_for_brands && e?.parentId) {
                    if (
                      forParticularSection &&
                      e?.chart?.["chart_type"] === "wordcloud"
                    ) {
                      let widget_id = e["widget_id"];
                      let word =
                        forParticularSection?.temporary_words?.[
                          forParticularSection?.template_id
                        ]?.[el?.section_id]?.[widget_id]?.exclude_words;
                      let temp_exclude_words = word?.length ? word : null;
                      e.temp_exclude_words = temp_exclude_words;
                    }
                    e["widget_name"] = e?.originalWidgetName;
                    delete e?.duplicate_for_brands;
                    delete e?.parentId;
                    delete e?.childId;
                    delete e?.span;
                    delete e?.originalWidgetName;
                    delete e?.com_brand_ids;
                    if (e?.graphData) {
                      delete e?.graphData;
                    }
                  }
                  sectionWidgetObject.push(e);
                }
              } else {
                return sectionWidgetObject.push(e);
              }
            });
          el.data = sectionWidgetObject;
          el.widgets = sectionWidgetObject;
          return el;
        } else if (el?.widgets && el?.widgets?.length > 0) {
          let sectionWidgetObject = [];
          el?.widgets &&
            el?.widgets?.map((e) => {
              if (
                forParticularSection?.widget_id === e?.parentId ||
                forParticularSection?.widget_id === e?.childId
              ) {
                if (!(e?.childId && e?.duplicate_for_brands)) {
                  if (e?.duplicate_for_brands && e?.parentId) {
                    if (
                      forParticularSection &&
                      e?.chart?.["chart_type"] === "wordcloud"
                    ) {
                      let widget_id = e["widget_id"];
                      let word =
                        forParticularSection?.temporary_words?.[
                          forParticularSection?.template_id
                        ]?.[el?.section_id]?.[widget_id]?.exclude_words;
                      let temp_exclude_words = word?.length ? word : null;
                      e.temp_exclude_words = temp_exclude_words;
                    }
                    e["widget_name"] = e?.originalWidgetName;
                    delete e?.duplicate_for_brands;
                    delete e?.parentId;
                    delete e?.childId;
                    delete e?.span;
                    delete e?.originalWidgetName;
                    delete e?.com_brand_ids;
                    if (e?.graphData) {
                      delete e?.graphData;
                    }
                  }
                  sectionWidgetObject.push(e);
                }
              } else {
                return sectionWidgetObject.push(e);
              }
            });
          el.data = sectionWidgetObject;
          el.widgets = sectionWidgetObject;
          return el;
        }
      } else {
        return el;
      }
    });
  } else {
    sectionObject = Section?.map((el) => {
      if (el?.data && el?.data?.length > 0) {
        let sectionWidgetObject = [];
        el?.data &&
          el?.data?.map((e) => {
            if (!(e?.childId && e?.duplicate_for_brands)) {
              if (e?.duplicate_for_brands && e?.parentId) {
                if (
                  objForTemporyWordFunctionality &&
                  e?.chart?.["chart_type"] === "wordcloud"
                ) {
                  let widget_id = e["widget_id"];
                  let word =
                    objForTemporyWordFunctionality?.temporary_words?.[
                      objForTemporyWordFunctionality?.template_id
                    ]?.[el?.section_id]?.[widget_id]?.exclude_words;
                  let temp_exclude_words = word?.length ? word : null;
                  e.temp_exclude_words = temp_exclude_words;
                }
                e["widget_name"] = e?.originalWidgetName;
                delete e?.duplicate_for_brands;
                delete e?.parentId;
                delete e?.childId;
                delete e?.span;
                delete e?.originalWidgetName;
                delete e?.com_brand_ids;
                if (e?.graphData) {
                  delete e?.graphData;
                }
              }

              sectionWidgetObject.push(e);
            }
          });
        el.data = sectionWidgetObject;
        el.widgets = sectionWidgetObject;
        return el;
      } else if (el?.widgets && el?.widgets?.length > 0) {
        let sectionWidgetObject = [];
        el?.widgets &&
          el?.widgets?.map((e) => {
            if (!(e?.childId && e?.duplicate_for_brands)) {
              if (e?.duplicate_for_brands && e?.parentId) {
                if (
                  objForTemporyWordFunctionality &&
                  e?.chart?.["chart_type"] === "wordcloud"
                ) {
                  let widget_id = e["widget_id"];
                  let word =
                    objForTemporyWordFunctionality?.temporary_words?.[
                      objForTemporyWordFunctionality?.template_id
                    ]?.[el?.section_id]?.[widget_id]?.exclude_words;
                  let temp_exclude_words = word?.length ? word : null;
                  e.temp_exclude_words = temp_exclude_words;
                }
                e["widget_name"] = e?.originalWidgetName;
                delete e?.duplicate_for_brands;
                delete e?.parentId;
                delete e?.childId;
                delete e?.span;
                delete e?.originalWidgetName;
                delete e?.com_brand_ids;
                if (e?.graphData) {
                  delete e?.graphData;
                }
              }
              sectionWidgetObject.push(e);
            }
          });
        el.data = sectionWidgetObject;
        el.widgets = sectionWidgetObject;
        return el;
      }
    });
  }
  return sectionObject;
};

export const getWordCloudSectionsWidgets = (Section) => {
  let sectionObject;
  sectionObject = Section?.map((el) => {
    if (el?.widgets && el?.widgets?.length > 0) {
      let sectionWidgetObject = [];
      el?.widgets &&
        el?.widgets?.map((e) => {
          if (e?.chart?.["chart_type"] === "wordcloud") {
            if (e?.graphData) {
              delete e?.graphData;
            }
          }
          sectionWidgetObject.push(e);
        });
      el.data = sectionWidgetObject;
      el.widgets = sectionWidgetObject;
      return el;
    }
  });
  return sectionObject;
};
export const checkForDuplicateWidgets = (Section, forParticularSection) => {
  let response = {
    duplicateExists: false,
    parentExists: false,
  };
  let checkForDuplicateWidgets = false;
  let checkForParentExists = false;
  if (forParticularSection) {
    if (
      Section &&
      Section?.[forParticularSection?.section_index]?.data?.length > 0
    ) {
      Section?.[forParticularSection?.section_index]?.data?.map((el) => {
        if (
          !el?.duplicate_for_brands &&
          el?.chart &&
          (el?.chart?.["chart_type"] === "wordcloud" ||
            el?.chart?.["chart_type"] === "grid" ||
            el?.chart?.["chart_type"] === "post-card" ||
            el?.chart?.["chart_type"] === "author-card") &&
          el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
        ) {
          checkForDuplicateWidgets = true;
        } else if (
          el?.duplicate_for_brands &&
          el?.parentId &&
          el?.chart &&
          (el?.chart?.["chart_type"] === "wordcloud" ||
            el?.chart?.["chart_type"] === "grid" ||
            el?.chart?.["chart_type"] === "post-card" ||
            el?.chart?.["chart_type"] === "author-card") &&
          el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
        ) {
          checkForParentExists = true;
        }
      });
    } else if (
      Section &&
      Section?.[forParticularSection?.section_index]?.widgets?.length > 0
    ) {
      Section?.[forParticularSection?.section_index]?.widgets?.map((el) => {
        if (
          !el?.duplicate_for_brands &&
          el?.chart &&
          (el?.chart?.["chart_type"] === "wordcloud" ||
            el?.chart?.["chart_type"] === "grid" ||
            el?.chart?.["chart_type"] === "post-card" ||
            el?.chart?.["chart_type"] === "author-card") &&
          el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
        ) {
          checkForDuplicateWidgets = true;
        } else if (
          el?.duplicate_for_brands &&
          el?.chart &&
          el?.parentId &&
          (el?.chart?.["chart_type"] === "wordcloud" ||
            el?.chart?.["chart_type"] === "grid" ||
            el?.chart?.["chart_type"] === "post-card" ||
            el?.chart?.["chart_type"] === "author-card") &&
          el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
        ) {
          checkForParentExists = true;
        }
      });
    }
  } else {
    if (Section && Section[0]?.data?.length > 0) {
      Section?.map((sec, secIndex) => {
        sec?.data?.map((el) => {
          if (
            !el?.duplicate_for_brands &&
            el?.chart &&
            (el?.chart?.["chart_type"] === "wordcloud" ||
              el?.chart?.["chart_type"] === "grid" ||
              el?.chart?.["chart_type"] === "post-card" ||
              el?.chart?.["chart_type"] === "author-card") &&
            el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
          ) {
            checkForDuplicateWidgets = true;
          } else if (
            el?.duplicate_for_brands &&
            el?.parentId &&
            el?.chart &&
            (el?.chart?.["chart_type"] === "wordcloud" ||
              el?.chart?.["chart_type"] === "grid" ||
              el?.chart?.["chart_type"] === "post-card" ||
              el?.chart?.["chart_type"] === "author-card") &&
            el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
          ) {
            checkForParentExists = true;
          }
        });
      });
    } else if (Section && Section[0]?.widgets?.length > 0) {
      Section?.map((sec, secIndex) => {
        sec?.widgets?.map((el) => {
          if (
            !el?.duplicate_for_brands &&
            el?.chart &&
            (el?.chart?.["chart_type"] === "wordcloud" ||
              el?.chart?.["chart_type"] === "grid" ||
              el?.chart?.["chart_type"] === "post-card" ||
              el?.chart?.["chart_type"] === "author-card") &&
            el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
          ) {
            checkForDuplicateWidgets = true;
          } else if (
            el?.duplicate_for_brands &&
            el?.chart &&
            el?.parentId &&
            (el?.chart?.["chart_type"] === "wordcloud" ||
              el?.chart?.["chart_type"] === "grid" ||
              el?.chart?.["chart_type"] === "post-card" ||
              el?.chart?.["chart_type"] === "author-card") &&
            el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
          ) {
            checkForParentExists = true;
          }
        });
      });
    }
  }
  response.duplicateExists = checkForDuplicateWidgets;
  response.parentExists = checkForParentExists;
  return response;
};
export const splitSectionWidgets = (updatedSection, newBrandList, brands) => {
  let newSection = deepCopy(updatedSection);
  updatedSection?.map((sec, secIndex) => {
    let newDataListForSection = [];
    if (sec?.data?.length > 0) {
      sec?.data?.map((el) => {
        if (
          !el?.duplicate_for_brands &&
          (el?.chart?.["chart_type"] === "wordcloud" ||
            el?.chart?.["chart_type"] === "grid" ||
            el?.chart?.["chart_type"] === "post-card" ||
            el?.chart?.["chart_type"] === "author-card") &&
          el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
        ) {
          let duplicateWidgets = getDuplicateWidgets(newBrandList, el, brands);
          if (duplicateWidgets) {
            newDataListForSection = [
              ...newDataListForSection,
              ...duplicateWidgets,
            ];
          } else {
            newDataListForSection.push(el);
          }
        } else {
          newDataListForSection.push(el);
        }
      });
    } else if (sec?.widgets?.length > 0) {
      sec?.widgets?.map((el) => {
        if (
          !el?.duplicate_for_brands &&
          (el?.chart?.["chart_type"] === "wordcloud" ||
            el?.chart?.["chart_type"] === "grid" ||
            el?.chart?.["chart_type"] === "post-card" ||
            el?.chart?.["chart_type"] === "author-card") &&
          el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
        ) {
          let duplicateWidgets = getDuplicateWidgets(newBrandList, el, brands);
          if (duplicateWidgets) {
            newDataListForSection = [
              ...newDataListForSection,
              ...duplicateWidgets,
            ];
          } else {
            newDataListForSection.push(el);
          }
        } else {
          newDataListForSection.push(el);
        }
      });
    }
    newSection[secIndex].data = newDataListForSection;
    newSection[secIndex].widgets = newDataListForSection;
  });
  return newSection;
};
export const splitSectionWidgetsInShare = (
  updatedSection,
  newBrandList,
  brands
) => {
  let newSection = deepCopy(updatedSection);
  updatedSection?.map((sec, secIndex) => {
    let newDataListForSection = [];
    let secLockedOnBrand =
      sec?.is_locked &&
      (sec?.brand_groups?.length > 0 || sec?.brand_ids?.length > 0);
    let comBrandtypeExists =
      sec?.comp_brand_type === false || sec?.comp_brand_type === true
        ? true
        : false;
    if (!secLockedOnBrand && !comBrandtypeExists && sec?.data?.length > 0) {
      sec?.data?.map((el) => {
        if (
          !el?.duplicate_for_brands &&
          (el?.chart?.["chart_type"] === "wordcloud" ||
            el?.chart?.["chart_type"] === "grid" ||
            el?.chart?.["chart_type"] === "post-card" ||
            el?.chart?.["chart_type"] === "author-card") &&
          el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
        ) {
          let duplicateWidgets = getDuplicateWidgets(newBrandList, el, brands);
          if (duplicateWidgets) {
            newDataListForSection = [
              ...newDataListForSection,
              ...duplicateWidgets,
            ];
          } else {
            newDataListForSection.push(el);
          }
        } else {
          newDataListForSection.push(el);
        }
      });
    } else if (
      !secLockedOnBrand &&
      !comBrandtypeExists &&
      sec?.widgets?.length > 0
    ) {
      sec?.widgets?.map((el) => {
        if (
          !el?.duplicate_for_brands &&
          (el?.chart?.["chart_type"] === "wordcloud" ||
            el?.chart?.["chart_type"] === "grid" ||
            el?.chart?.["chart_type"] === "post-card" ||
            el?.chart?.["chart_type"] === "author-card") &&
          el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
        ) {
          let duplicateWidgets = getDuplicateWidgets(newBrandList, el, brands);
          if (duplicateWidgets) {
            newDataListForSection = [
              ...newDataListForSection,
              ...duplicateWidgets,
            ];
          } else {
            newDataListForSection.push(el);
          }
        } else {
          newDataListForSection.push(el);
        }
      });
    }
    newSection[secIndex].data =
      secLockedOnBrand || comBrandtypeExists
        ? sec?.data
        : newDataListForSection;
    newSection[secIndex].widgets =
      secLockedOnBrand || comBrandtypeExists
        ? sec?.widgets
        : newDataListForSection;
  });
  return newSection;
};
export const getGlobalPaneBrandsValue = (
  authParams,
  paneObj,
  pane_template_id,
  quick_filter
) => {
  let paneObject = {
    selectBrands: null,
    panes: paneObj?.panes,
    index: paneObj?.index,
  };
  // let defaultSingleBrand = {
  //   columns: paneObj?.singleBrands ? [paneObj?.singleBrands?.[0]] : [],
  //   attribute: "BrandID",
  //   type: "varchar",
  // };
  let defaultSingleBrand = getBrands(
    paneObj?.brands,
    [paneObj?.singleBrands?.[0]],
    paneObj?.singleBrands,
    null
  );
  // let defaultLogicalBrand = {
  //   columns: paneObj?.brands ? [paneObj?.brands?.[0]] : [],
  //   attribute: "BrandID",
  //   type: "varchar",
  // };
  let defaultLogicalBrand = getBrands(
    paneObj?.brands,
    null,
    paneObj?.singleBrands,
    [paneObj?.brands?.[0]]
  );
  let defaultCompBrand =
    paneObj?.competitorBrands?.length > 0
      ? getDefaultCompBrand(paneObj?.competitorBrands)
      : null;

  if (authParams) {
    if (
      //ticket dashboards
      paneObj?.template_type === "ticket"
    ) {
      if (
        //global single brands
        paneObj?.global_dashboard_single_brands
      ) {
        paneObject.selectBrands = paneObj?.global_dashboard_single_brands;
      } else {
        //clear other pane brands(logical,comp) for ticket dashboards
        paneObject.selectBrands = defaultSingleBrand;
      }
    } else {
      //other dashboards
      //to set default comp brands in competiiton benchmark dashboard
      if (authParams?.brandID) {
        let obj = getBrands(
          paneObj?.brands,
          [{ brand_id: authParams?.brandID }],
          paneObj?.singleBrands,
          null
        );

        paneObject.selectBrands = obj?.columns
          ? obj?.columns
          : [{ brand_id: authParams?.brandID }];
      } else if (
        paneObj?.template_type === "competition" &&
        (!paneObj?.global_dashboard_brands ||
          (paneObj?.global_dashboard_brands &&
            !paneObj?.global_dashboard_brands?.columns?.[0]?.competitor))
      ) {
        if (!authParams?.ppt)
          paneObject.selectBrands = defaultCompBrand
            ? defaultCompBrand
            : defaultSingleBrand;
      } else if (paneObj?.global_dashboard_brands) {
        //to set global normal brands

        if (
          //to not update pane brands if benchmark dashboard is opened
          (paneObj?.global_dashboard_brands?.columns?.[0]?.competitor &&
            paneObj?.template_type === "competition") ||
          paneObj?.template_type !== "competition"
        ) {
          if (
            paneObj?.global_dashboard_brands?.columns?.[0]?.competitor &&
            paneObj?.template_type !== "competition" &&
            !authParams?.ppt
          ) {
            paneObject.selectBrands = paneObj?.global_dashboard_single_brands //if global single brands then add it to panes (formatting is diff)
              ? [paneObj?.global_dashboard_single_brands?.columns]
              : defaultLogicalBrand?.columns?.length && !quick_filter
              ? defaultLogicalBrand
              : defaultSingleBrand?.columns?.length
              ? defaultSingleBrand
              : null;
          } else if (quick_filter) {
            paneObject.selectBrands =
              !paneObj?.global_dashboard_brands?.columns?.[0]?.group &&
              paneObj?.global_dashboard_brands?.columns?.length
                ? {
                    columns: [paneObj?.global_dashboard_brands?.columns?.[0]],
                    attribute: "BrandID",
                    type: "varchar",
                  }
                : paneObj?.global_dashboard_single_brands //if global single brands then add it to panes (formatting is diff)
                ? [paneObj?.global_dashboard_single_brands?.columns]
                : defaultSingleBrand;
          } else {
            paneObject.selectBrands = paneObj?.global_dashboard_brands;
          }
        }
      } else {
        if (paneObj?.global_dashboard_single_brands) {
          //if global single brands then add it to panes (formatting is diff)
          paneObject.selectBrands = [
            paneObj?.global_dashboard_single_brands?.columns,
          ];
        } else {
          paneObject.selectBrands =
            defaultLogicalBrand?.columns?.length && !quick_filter
              ? defaultLogicalBrand
              : defaultSingleBrand?.columns?.length
              ? defaultSingleBrand
              : null;
        }
      }
    }
  } else if (quick_filter) {
    if (
      paneObj?.global_dashboard_brands &&
      paneObj?.global_dashboard_brands?.columns &&
      paneObj?.global_dashboard_brands?.columns?.length > 0 &&
      !paneObj?.global_dashboard_brands?.columns?.[0]?.group &&
      !paneObj?.global_dashboard_brands?.columns?.[0]?.competitor
    ) {
      paneObject.selectBrands = {
        columns: paneObj?.global_dashboard_brands?.columns?.length
          ? [paneObj?.global_dashboard_brands?.columns?.[0]]
          : [],
        attribute: "BrandID",
        type: "varchar",
      };
    } else if (paneObj?.global_dashboard_single_brands) {
      //if global single brands then add it to panes (formatting is diff)
      paneObject.selectBrands = [
        paneObj?.global_dashboard_single_brands?.columns,
      ];
    } else {
      paneObject.selectBrands = defaultSingleBrand;
    }
  } else if (pane_template_id) {
    //on dashbaord reload and dashboard open
    if (
      paneObj?.panes[paneObj?.index]?.template_type === "ticket" ||
      paneObj?.template_type === "ticket"
    ) {
      if (
        paneObj?.global_dashboard_brands ||
        paneObj?.global_dashboard_single_brands
      ) {
        if (paneObj?.global_dashboard_single_brands) {
          paneObject.selectBrands = paneObj?.global_dashboard_single_brands;
        } else if (paneObj?.global_dashboard_brands?.columns?.brand_id) {
          // this belongs to SingleBrand component
          paneObject.selectBrands = paneObj?.global_dashboard_brands;
        } else {
          paneObject.selectBrands = defaultSingleBrand;
        }
      } else {
        paneObject.selectBrands = defaultSingleBrand;
      }
    } else if (paneObj?.global_dashboard_brands) {
      if (
        paneObj?.template_type === "competition" ||
        (paneObj?.template_type
          ? paneObj?.template_type === "competition" &&
            paneObj?.panes &&
            paneObj?.panes[paneObj?.index]?.template_type === "competition"
          : paneObj?.panes &&
            paneObj?.panes[paneObj?.index]?.template_type === "competition")
      ) {
        if (
          paneObj?.global_dashboard_brands?.columns?.[0]?.competitor ||
          paneObj?.global_dashboard_brands?.competitor
        ) {
          paneObject.selectBrands = paneObj?.global_dashboard_brands;
        } else {
          // if (defaultCompBrand) paneObject.selectBrands = defaultCompBrand;
          paneObject.selectBrands = defaultCompBrand
            ? defaultCompBrand
            : defaultSingleBrand;
        }
      } else {
        if (
          paneObj?.global_dashboard_brands?.columns?.[0]?.competitor ||
          paneObj?.global_dashboard_brands?.competitor
        ) {
          paneObject.selectBrands = defaultLogicalBrand?.columns?.length
            ? defaultLogicalBrand
            : defaultSingleBrand?.columns?.length
            ? defaultSingleBrand
            : null;
        } else paneObject.selectBrands = paneObj?.global_dashboard_brands;
      }
    } else if (
      paneObj?.template_type === "competition" ||
      (paneObj?.template_type
        ? paneObj?.template_type === "competition" &&
          paneObj?.panes &&
          paneObj?.panes[paneObj?.index]?.template_type === "competition"
        : paneObj?.panes &&
          paneObj?.panes[paneObj?.index]?.template_type === "competition")
    ) {
      paneObject.selectBrands = defaultCompBrand
        ? defaultCompBrand
        : defaultSingleBrand;
    } else {
      paneObject.selectBrands = defaultLogicalBrand?.columns?.length
        ? defaultLogicalBrand
        : defaultSingleBrand?.columns?.length
        ? defaultSingleBrand
        : null;
    }
  }

  return paneObject;
};

export const getGlobalPPTBrandsValue = (authParams, paneObj) => {
  let paneObject = {
    selectBrands: null,
    panes: paneObj?.panes,
    index: paneObj?.index,
  };
  if (authParams?.brandId) {
    paneObject.selectBrands = authParams?.brandId;
  } else if (authParams?.brandGroup) {
    paneObject.selectBrands = authParams?.brandGroup;
  } else if (authParams?.compBrands) {
    paneObject.selectBrands = authParams?.compBrands;
  }
  return paneObject;
};

export const getGlobalBrands = (
  pane_brands,
  global_dashboard_single_brands,
  global_dashboard_brands,
  template_type
) => {
  let final_brands =
    template_type === "ticket"
      ? global_dashboard_single_brands?.columns
        ? global_dashboard_single_brands?.columns
        : global_dashboard_single_brands
      : pane_brands
      ? pane_brands
      : global_dashboard_brands
      ? template_type === "competition"
        ? global_dashboard_brands?.columns[0]?.competitor
          ? global_dashboard_brands?.columns
          : pane_brands
        : template_type !== "competition"
        ? !global_dashboard_brands?.columns[0]?.competitor
          ? global_dashboard_brands?.columns
          : pane_brands
        : pane_brands
      : pane_brands;
  return final_brands ? final_brands : null;
};

export const getTemporaryWords = (paneobject) => {
  let temp_exclude_words;
  if (
    paneobject?.temporary_words?.[paneobject?.template_id]?.[
      paneobject?.section_id
    ]?.[paneobject?.widget_id]
  ) {
    temp_exclude_words =
      paneobject?.temporary_words?.[paneobject?.template_id]?.[
        paneobject?.section_id
      ]?.[paneobject?.widget_id]?.exclude_words;
  }
  return temp_exclude_words;
};
export const getCombinedDate = (global_date, filters_date) => {
  let start_date_arr = global_date ? [global_date?.from] : [];
  let end_date_arr = global_date ? [global_date?.to] : [];

  filters_date &&
    filters_date?.map((d) => {
      start_date_arr = [...start_date_arr, d?.from];
    });
  filters_date &&
    filters_date?.map((d) => {
      end_date_arr = [...end_date_arr, d?.to];
    });

  let start = start_date_arr.map((d) => moment(d)),
    maxStartDate = moment.min(start);
  let start_date = moment(maxStartDate).format("YYYY/MM/DD H:mm");

  let end = end_date_arr.map((d) => moment(d)),
    maxEndDate = moment.max(end);
  let end_date = moment(maxEndDate).format("YYYY/MM/DD H:mm");

  let final_date_obj = {
    start_date: start_date,
    end_date: end_date,
  };
  return final_date_obj;
};

export const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

export const getDefaultDuration = (obj) => {
  let twoMonthsDuration = getCustomizedDate(
    obj?.chatWithData ? 30 : obj?.isCommandCenter ? 0 : 6,
    "Days"
  );
  let defaultDuration = {
    from:
      moment(twoMonthsDuration?.date[0]).format("YYYY/MM/DD") +
      " " +
      twoMonthsDuration?.time?.startTime,
    to:
      moment(twoMonthsDuration?.date[1]).format("YYYY/MM/DD") +
      " " +
      twoMonthsDuration?.time?.endTime,
  };
  return defaultDuration;
};
export const getWidgetGraphObject = (rawData) => {
  let graphObject;
  if (rawData?.type === "share_dashboard") {
    let Section_is_locked = rawData?.shareTemplateData?.sections
      ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
          ?.is_locked
      : null;
    let widgets_is_locked = rawData?.shareTemplateData?.sections
      ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
          ?.widgets?.[rawData?.widget_index]?.is_locked
      : rawData?.shareTemplateData?.section &&
        rawData?.shareTemplateData?.section?.[0]?.widgets?.[
          rawData?.widget_index
        ]?.is_locked;
    let defaultDuration = getDefaultDuration();
    let widgetData = rawData?.data ? rawData?.data : rawData?.widget;
    let sectionBrands = getBrands(
      rawData?.shareBrands?.brand_groups,
      rawData?.shareTemplateData?.sections?.[rawData?.section_index]?.brand_ids,
      rawData?.shareBrands?.brand_list,
      rawData?.shareTemplateData?.sections?.[rawData?.section_index]
        ?.brand_groups
    );
    let sectionComprtitorBrandType =
      rawData?.shareTemplateData?.sections?.[rawData?.section_index]
        ?.comp_brand_type === false ||
      rawData?.shareTemplateData?.sections?.[rawData?.section_index]
        ?.comp_brand_type === true
        ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
            ?.comp_brand_type
        : null;
    let sectionComprtitorBrandTypeExists =
      sectionComprtitorBrandType === false ||
      sectionComprtitorBrandType === true;

    let widgetBrands = getBrands(
      rawData?.shareBrands?.brand_groups,
      widgetData?.brand_ids,
      rawData?.shareBrands?.brand_list,
      widgetData?.brand_groups
    );
    let defaultBrands = rawData?.shareBrands ? rawData?.shareBrands : null;
    let updatedOrderBy;
    if (widgetData?.order_by) {
      updatedOrderBy = {
        ...widgetData?.order_by,
        offset: 0,
      };
    }

    // calculating brand in case of section comprtiotion brand type exists
    let updatedComBrandList = [];
    if (
      !(Section_is_locked && sectionBrands?.columns) &&
      sectionComprtitorBrandTypeExists
    ) {
      let comBrandExists = defaultBrands
        ? defaultBrands?.selected_brand_ids?.length &&
          defaultBrands?.selected_comp_brand_ids?.length > 0
        : null;
      if (comBrandExists) {
        if (sectionComprtitorBrandType === false) {
          let parentB = defaultBrands?.selected_brand_ids?.[0];
          updatedComBrandList.push({
            brand_id: parentB?.brand_id,
            brand_name: parentB?.brand_name,
            brand_friendly_name: parentB?.brand_friendly_name,
          });
        } else {
          defaultBrands?.selected_comp_brand_ids?.forEach((competitorBrand) => {
            updatedComBrandList.push(competitorBrand);
          });
        }
      } else {
        sectionComprtitorBrandTypeExists = false;
      }
    }

    // data_source handled for shared dashboard
    let data_source_type = rawData?.data_source;
    let data_source_based_filters = rawData?.filter?.filter(
      (d) =>
        d?.data_source === "common" ||
        d?.data_source === data_source_type ||
        d?.data_source === true
    );
    // console.log("shared data_source_filters", data_source_based_filters);

    let widgetSingleBrandFilter = widgetData?.widgetSingleBrandFilter?.brand_id
      ? [
          {
            brand_id: widgetData?.widgetSingleBrandFilter?.brand_id,
            brand_name: widgetData?.widgetSingleBrandFilter?.brand_name,
            brand_friendly_name:
              widgetData?.widgetSingleBrandFilter?.brand_friendly_name,
          },
        ]
      : null;
    if (
      rawData?.graphConditionConfig?.[`data-source`]?.includes(
        widgetData?.data_source
      ) ||
      widgetData?.x_axis ||
      widgetData?.y_series ||
      widgetData?.chart
    ) {
      graphObject = {
        start_date: widgetData?.is_locked
          ? widgetData?.start_date
            ? widgetData?.start_date
            : Section_is_locked
            ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.start_date
              ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                  ?.start_date
              : rawData?.duration?.from
              ? rawData?.duration?.from
              : defaultDuration?.from
            : rawData?.duration?.from
            ? rawData?.duration?.from
            : defaultDuration?.from
          : Section_is_locked
          ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
              ?.start_date
            ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.start_date
            : rawData?.duration?.from
            ? rawData?.duration?.from
            : defaultDuration?.from
          : rawData?.duration?.from
          ? rawData?.duration?.from
          : defaultDuration?.from,
        end_date: widgetData?.is_locked
          ? widgetData?.end_date
            ? widgetData?.end_date
            : Section_is_locked
            ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.end_date
              ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                  ?.end_date
              : rawData?.duration?.to
              ? rawData?.duration?.to
              : defaultDuration?.to
            : rawData?.duration?.to
            ? rawData?.duration?.to
            : defaultDuration?.to
          : Section_is_locked
          ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
              ?.end_date
            ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.end_date
            : rawData?.duration?.to
            ? rawData?.duration?.to
            : defaultDuration?.to
          : rawData?.duration?.to
          ? rawData?.duration?.to
          : defaultDuration?.to,
        brand_list: widgetSingleBrandFilter
          ? widgetSingleBrandFilter
          : widgets_is_locked
          ? widgetData?.brand_ids || widgetData?.brand_groups
            ? widgetBrands?.columns
            : Section_is_locked
            ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.brand_ids ||
              rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.brand_groups
              ? sectionBrands?.columns
              : widgetData?.duplicate_for_brands
              ? widgetData?.com_brand_ids
              : sectionComprtitorBrandTypeExists
              ? updatedComBrandList
              : defaultBrands
            : widgetData?.duplicate_for_brands
            ? widgetData?.com_brand_ids
            : sectionComprtitorBrandTypeExists
            ? updatedComBrandList
            : defaultBrands
          : Section_is_locked
          ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
              ?.brand_ids ||
            rawData?.shareTemplateData?.sections?.[rawData?.section_index]
              ?.brand_groups
            ? sectionBrands?.columns
            : widgetData?.duplicate_for_brands
            ? widgetData?.com_brand_ids
            : sectionComprtitorBrandTypeExists
            ? updatedComBrandList
            : defaultBrands
          : widgetData?.duplicate_for_brands
          ? widgetData?.com_brand_ids
          : sectionComprtitorBrandTypeExists
          ? updatedComBrandList
          : defaultBrands,

        order_by: !rawData?.offset_flag ? updatedOrderBy : widgetData?.order_by,
        offset_flag: rawData?.offset_flag,
        // filters: rawData?.filter ? rawData?.filter : null,
        filters: data_source_based_filters ? data_source_based_filters : null,
        x_axis: widgetData?.x_axis,
        // Break down data
        y_axes: widgetData?.y_axes,
        // y axis data
        y_series: widgetData?.y_series,
        widget_name: widgetData?.widget_name,
        chart: widgetData?.chart,
        comp_brand_list:
          (!widgets_is_locked &&
            !(widgetData?.brand_ids || widgetData?.brand_groups) &&
            widgetData?.duplicate_for_brands) ||
          (!Section_is_locked &&
            !(
              rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.brand_ids ||
              rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.brand_groups
            ) &&
            widgetData?.duplicate_for_brands)
            ? null
            : widgetData?.comp_brand_list,
        data_source: widgetData?.data_source,
        widget_id: widgetData?.widget_id,
        engine: widgetData?.engine,
        ticket: widgetData?.data_source === "ticket" ? true : false,
        campaign: widgetData?.data_source === "campaign" ? true : false,
        feedback: widgetData?.data_source === "feedback" ? true : false,
        nps: widgetData?.data_source === "nps" ? true : false,
        exclude_words: widgetData?.exclude_words
          ? [...widgetData?.exclude_words]
          : null,
        profile_filters:
          rawData?.profile_filters_flag && rawData?.profile_filters
            ? rawData?.profile_filters
            : null,
        filter_by: rawData?.filter_by ? rawData?.filter_by : null,
        filter_by_data: rawData?.filter_by_data
          ? rawData?.filter_by_data
          : null,
        complex_filters: rawData?.shareTemplateData?.complex_filters
          ? rawData?.shareTemplateData?.complex_filters
          : null,
      };
    } else {
      graphObject = {
        primary_attribute: widgetData?.primary,
        secondary_attribute: widgetData?.secondary,
        // filters: rawData?.filter ? rawData?.filter : null,
        filters: data_source_based_filters ? data_source_based_filters : null,
        splits: widgetData?.splits,
        graph_type: widgetData?.graph_type,
        brand_list: widgets_is_locked
          ? widgetData?.brand_ids || widgetData?.brand_groups
            ? widgetBrands?.columns
            : Section_is_locked
            ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.brand_ids ||
              rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.brand_groups
              ? sectionBrands?.columns
              : defaultBrands
            : defaultBrands
          : Section_is_locked
          ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
              ?.brand_ids ||
            rawData?.shareTemplateData?.sections?.[rawData?.section_index]
              ?.brand_groups
            ? sectionBrands?.columns
            : defaultBrands
          : defaultBrands,

        start_date: widgetData?.is_locked
          ? widgetData?.start_date
            ? widgetData?.start_date
            : Section_is_locked
            ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.start_date
              ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                  ?.start_date
              : rawData?.duration?.from
              ? rawData?.duration?.from
              : defaultDuration?.from
            : rawData?.duration?.from
            ? rawData?.duration?.from
            : defaultDuration?.from
          : Section_is_locked
          ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
              ?.start_date
            ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.start_date
            : rawData?.duration?.from
            ? rawData?.duration?.from
            : defaultDuration?.from
          : rawData?.duration?.from
          ? rawData?.duration?.from
          : defaultDuration?.from,
        end_date: widgetData?.is_locked
          ? widgetData?.end_date
            ? widgetData?.end_date
            : Section_is_locked
            ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.end_date
              ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                  ?.end_date
              : rawData?.duration?.to
              ? rawData?.duration?.to
              : defaultDuration?.to
            : rawData?.duration?.to
            ? rawData?.duration?.to
            : defaultDuration?.to
          : Section_is_locked
          ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
              ?.end_date
            ? rawData?.shareTemplateData?.sections?.[rawData?.section_index]
                ?.end_date
            : rawData?.duration?.to
            ? rawData?.duration?.to
            : defaultDuration?.to
          : rawData?.duration?.to
          ? rawData?.duration?.to
          : defaultDuration?.to,

        base: widgetData?.base,
        widget_id: rawData?.data?.widget_id,
        percent: rawData?.data?.percent,
        exclude_words: widgetData?.exclude_words
          ? [...widgetData?.exclude_words]
          : null,
        profile_filters:
          rawData?.profile_filters_flag && rawData?.profile_filters
            ? rawData?.profile_filters
            : null,
        filter_by: rawData?.filter_by ? rawData?.filter_by : null,
        filter_by_data: rawData?.filter_by_data
          ? rawData?.filter_by_data
          : null,
        complex_filters: rawData?.shareTemplateData?.complex_filters
          ? rawData?.shareTemplateData?.complex_filters
          : null,
      };
    }
    let global_date = {
      from: graphObject?.start_date,
      to: graphObject?.end_date,
    };
    let filter_date = [];
    graphObject?.filters?.filter((d) => {
      if (d.attribute?.toLowerCase() === "createddate") {
        filter_date = [...filter_date, d?.columns];
      }
    });
    let combinedDate = getCombinedDate(global_date, filter_date);
    let getInterval = getTimeIntervalDate(
      combinedDate?.end_date,
      combinedDate?.start_date,
      graphObject?.data_source,
      graphObject?.x_axis?.attribute
    );
    if (
      graphObject?.x_axis?.date_part === null &&
      rawData?.graphConditionConfig?.[`date_agg-chart_type`]?.includes(
        graphObject?.chart?.chart_type
      ) &&
      rawData?.graphConditionConfig &&
      rawData?.graphConditionConfig?.[`date-attributes`]?.includes(
        graphObject?.x_axis?.attribute?.toLowerCase()
      )
    ) {
      graphObject.x_axis.date_aggregation = getInterval?.defaultVal;
    }

    graphObject.isBrandModified =
      (widgets_is_locked && widgetBrands) ||
      (Section_is_locked && sectionBrands) ||
      widgetData?.duplicate_for_brands
        ? true
        : false;

    if (
      graphObject?.chart?.chart_type === "wordcloud" &&
      widgetData?.duplicate_for_brands
    ) {
      let indexOfCompWords = widgetData?.comp_exclude_words?.findIndex(
        (el) => el?.[graphObject?.brand_list?.[0]?.brand_id]
      );
      let parmanentExcluededWords = widgetData?.comp_exclude_words?.[
        indexOfCompWords
      ]?.[graphObject?.brand_list?.[0]?.brand_id]
        ? widgetData?.comp_exclude_words?.[indexOfCompWords]?.[
            graphObject?.brand_list?.[0]?.brand_id
          ]
        : [];

      graphObject.exclude_words = widgetData?.exclude_words?.length
        ? [...widgetData?.exclude_words, ...parmanentExcluededWords]
        : parmanentExcluededWords;
    }
  } else {
    let Section_is_locked =
      rawData?.type === "template"
        ? rawData?.sectionObj?.is_locked
          ? rawData?.sectionObj?.is_locked
          : null
        : rawData?.panes?.[rawData?.paneIndex]?.sections
        ? rawData?.panes?.[rawData?.paneIndex]?.sections?.[
            rawData?.section_index
          ]?.is_locked
        : null;
    Section_is_locked = Section_is_locked ? Section_is_locked : false;
    let widgets_is_locked =
      rawData?.type === "template"
        ? rawData?.widgetObj?.is_locked
          ? rawData?.widgetObj?.is_locked
          : null
        : rawData?.panes?.[rawData?.paneIndex]?.sections
        ? rawData?.panes?.[rawData?.paneIndex]?.sections?.[
            rawData?.section_index
          ]?.widgets?.[rawData?.widget_index]?.is_locked
        : rawData?.panes?.[rawData?.paneIndex]?.section &&
          rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.widgets?.[
            rawData?.widget_index
          ]?.is_locked;
    widgets_is_locked = widgets_is_locked ? widgets_is_locked : false;
    let defaultDuration = getDefaultDuration();
    let sectionDateFilter =
      rawData?.type === "template"
        ? rawData?.sectionObj?.duration?.from
          ? rawData?.sectionObj?.duration
          : null
        : rawData?.panes?.[rawData?.paneIndex]?.sections
        ? {
            from: rawData?.panes?.[rawData?.paneIndex]?.sections?.[
              rawData?.section_index
            ]?.start_date
              ? rawData?.panes?.[rawData?.paneIndex]?.sections?.[
                  rawData?.section_index
                ]?.start_date
              : null,
            to: rawData?.panes?.[rawData?.paneIndex]?.sections?.[
              rawData?.section_index
            ]?.end_date
              ? rawData?.panes?.[rawData?.paneIndex]?.sections?.[
                  rawData?.section_index
                ]?.end_date
              : null,
          }
        : rawData?.panes?.[rawData?.paneIndex]?.section
        ? {
            from: rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.start_date
              ? rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.start_date
              : null,
            to: rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.end_date
              ? rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.end_date
              : null,
          }
        : null;
    let widgetFilterDate =
      rawData?.type === "template"
        ? rawData?.widgetObj
          ? rawData?.widgetObj?.duration?.from
            ? rawData?.widgetObj?.duration
            : []
          : []
        : rawData?.panes?.[rawData?.paneIndex]?.sections
        ? {
            from: rawData?.panes?.[rawData?.paneIndex]?.sections?.[
              rawData?.section_index
            ]?.widgets?.[rawData?.widget_index]?.start_date
              ? rawData?.panes?.[rawData?.paneIndex]?.sections?.[
                  rawData?.section_index
                ]?.widgets?.[rawData?.widget_index]?.start_date
              : null,
            to: rawData?.panes?.[rawData?.paneIndex]?.sections?.[
              rawData?.section_index
            ]?.widgets?.[rawData?.widget_index]?.end_date
              ? rawData?.panes?.[rawData?.paneIndex]?.sections?.[
                  rawData?.section_index
                ]?.widgets?.[rawData?.widget_index]?.end_date
              : null,
          }
        : rawData?.panes?.[rawData?.paneIndex]?.section && {
            from: rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.widgets?.[
              rawData?.widget_index
            ]?.start_date
              ? rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.widgets?.[
                  rawData?.widget_index
                ]?.start_date
              : null,
            to: rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.widgets?.[
              rawData?.widget_index
            ]?.end_date
              ? rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.widgets?.[
                  rawData?.widget_index
                ]?.end_date
              : null,
          };

    let widgetData = rawData?.data ? rawData?.data : rawData?.widget;
    let paneObj = { temporary_words: rawData?.temporary_words };
    paneObj.template_id = rawData?.panes?.[rawData?.paneIndex]?.template_id;
    paneObj.section_id = rawData?.panes?.[rawData?.paneIndex]?.sections
      ? rawData?.panes?.[rawData?.paneIndex]?.sections?.[rawData?.section_index]
          ?.section_id
      : rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.section_id;
    paneObj.widget_id = widgetData?.widget_id
      ? widgetData?.widget_id
      : rawData?.panes?.[rawData?.paneIndex]?.sections
      ? rawData?.panes?.[rawData?.paneIndex]?.sections?.[rawData?.section_index]
          ?.widgets?.[rawData?.widget_index]?.widget_id
      : rawData?.panes?.[rawData?.paneIndex]?.section?.[0]?.widgets?.[
          rawData?.widget_index
        ]?.widget_id;
    //for exploded wordcloud by comptitor brands
    if (widgetData.duplicate_for_brands) {
      paneObj.widget_id = getTemporaryWordWidgetId(widgetData);
    }
    let temp_exclude_words = getTemporaryWords(paneObj);

    // if (!widgetData.temp_exclude_words) {
    //   console.log("&&&", temp_exclude_words);
    //   widgetData.temp_exclude_words = temp_exclude_words;
    // }

    let sectionBrands =
      rawData?.sectionObj?.brand_ids || rawData?.sectionObj?.brand_groups
        ? getBrands(
            rawData?.brandlogicalgroup?.length > 0
              ? rawData?.brandlogicalgroup
              : rawData?.brands,
            rawData?.sectionObj?.brand_ids
              ? rawData?.sectionObj?.brand_ids
              : null,
            rawData?.sectionObj?.singleBrands,
            rawData?.sectionObj?.brand_groups
              ? rawData?.sectionObj?.brand_groups
              : null
          )
        : rawData?.sectionObj?.brandFilters
        ? rawData?.sectionObj?.brandFilters
        : getBrands(
            rawData?.brandlogicalgroup?.length > 0
              ? rawData?.brandlogicalgroup
              : rawData?.brands,
            rawData?.panes?.[rawData?.paneIndex]?.sections?.[
              rawData?.section_index
            ]?.brand_ids,
            rawData?.brands,
            rawData?.panes?.[rawData?.paneIndex]?.sections?.[
              rawData?.section_index
            ]?.brand_groups
          );
    let sectionComprtitorBrandType = rawData?.sectionObj
      ? rawData?.sectionObj?.comp_brand_type === false ||
        rawData?.sectionObj?.comp_brand_type === true
        ? rawData?.sectionObj?.comp_brand_type
        : null
      : rawData?.panes?.[rawData?.paneIndex]?.sections?.[rawData?.section_index]
          ?.comp_brand_type === false ||
        rawData?.panes?.[rawData?.paneIndex]?.sections?.[rawData?.section_index]
          ?.comp_brand_type === true
      ? rawData?.panes?.[rawData?.paneIndex]?.sections?.[rawData?.section_index]
          ?.comp_brand_type
      : null;
    let sectionComprtitorBrandTypeExists =
      sectionComprtitorBrandType === false ||
      sectionComprtitorBrandType === true;
    let widgetBrands = widgetData?.brandFilters?.columns
      ? widgetData?.brandFilters
      : getBrands(
          rawData?.brandlogicalgroup?.length > 0
            ? rawData?.brandlogicalgroup
            : rawData?.brands,
          widgetData?.brand_ids,
          rawData?.brands,
          widgetData?.brand_groups
        );

    let finalExcludeWords =
      rawData?.exclude_words && !widgetData?.duplicate_for_brands
        ? widgetData?.exclude_words
          ? [...rawData?.exclude_words, ...widgetData?.exclude_words]
          : [...rawData?.exclude_words]
        : temp_exclude_words &&
          widgetData?.exclude_words &&
          !widgetData?.duplicate_for_brands
        ? [...temp_exclude_words, ...widgetData?.exclude_words]
        : !widgetData?.duplicate_for_brands && widgetData?.exclude_words
        ? [...widgetData?.exclude_words]
        : temp_exclude_words
        ? [...temp_exclude_words]
        : [];

    let updatedOrderBy;
    if (widgetData?.order_by) {
      updatedOrderBy = {
        ...widgetData?.order_by,
        offset: 0,
      };
    }

    // console.log("main rawData", rawData);

    let updatedFilter = getDiscardedFilters(rawData);
    // console.log("final step 1", updatedFilter, rawData);
    if (!updatedFilter) {
      let obj;
      if (rawData?.profile_filters_list?.length > 0) {
        obj = {
          attribute: "SocialMediaProfiles",
          type: "varchar",
          columns: [
            {
              name: rawData?.profile_filters_list?.[0]?.id
                ? rawData?.profile_filters_list?.[0]?.id
                : null,
              type: "include",
              display_name: rawData?.profile_filters_list?.[0]?.name
                ? rawData?.profile_filters_list?.[0]?.name
                : null,
              profile_channel: rawData?.profile_filters_list?.[0]?.channel
                ? rawData?.profile_filters_list?.[0]?.channel
                : null,
              brand_id: rawData?.profile_filters_list?.[0]?.brand_id
                ? rawData?.profile_filters_list?.[0]?.brand_id
                : null,
            },
          ],
        };
      } else {
        obj = null;
      }
      updatedFilter = obj;
    }
    // console.log("final step ", rawData,rawData?.global_brands);

    // calculating brand in case of section comprtiotion brand type exists
    let updatedComBrandList = [];
    if (
      !(Section_is_locked && sectionBrands?.columns) &&
      sectionComprtitorBrandTypeExists
    ) {
      let comBrand = rawData?.global_brands?.columns?.[0]?.competitor
        ? rawData?.global_brands?.columns?.[0]
        : rawData?.global_brands?.[0]?.competitor
        ? rawData?.global_brands?.[0]
        : rawData?.global_brands?.competitor
        ? rawData?.global_brands
        : null;
      if (comBrand?.competitor) {
        if (sectionComprtitorBrandType === false) {
          updatedComBrandList.push({
            brand_id: comBrand?.name,
            brand_name: comBrand?.brand_name,
            brand_friendly_name: comBrand?.brand_friendly_name,
          });
        } else {
          comBrand?.competitorList?.forEach((competitorBrand) => {
            updatedComBrandList.push(competitorBrand);
          });
        }
      } else {
        sectionComprtitorBrandTypeExists = false;
      }
    }

    // data_source handled for view dashboard
    let data_source_type = rawData?.data_source;
    let data_source_based_filters = rawData?.filter?.filter(
      (d) =>
        d?.data_source === "common" ||
        d?.data_source === data_source_type ||
        d?.data_source === true
    );
    // console.log("View data_source_filters", data_source_based_filters);

    if (
      rawData?.graphConditionConfig?.[`data-source`]?.includes(
        widgetData?.data_source
      ) ||
      widgetData?.x_axis ||
      widgetData?.y_series ||
      widgetData?.chart
    ) {
      graphObject = {
        start_date: widgetData?.is_locked
          ? widgetData?.start_date
            ? widgetData?.start_date
            : widgetFilterDate?.from
            ? widgetFilterDate?.from
            : Section_is_locked
            ? sectionDateFilter?.from
              ? sectionDateFilter?.from
              : rawData?.duration?.from
              ? rawData?.duration?.from
              : defaultDuration?.from
            : rawData?.duration?.from
            ? rawData?.duration?.from
            : defaultDuration?.from
          : Section_is_locked
          ? sectionDateFilter?.from
            ? sectionDateFilter?.from
            : rawData?.duration?.from
            ? rawData?.duration?.from
            : defaultDuration?.from
          : rawData?.duration?.from
          ? rawData?.duration?.from
          : defaultDuration?.from,
        end_date: widgetData?.is_locked
          ? widgetData?.end_date
            ? widgetData?.end_date
            : widgetFilterDate?.to
            ? widgetFilterDate?.to
            : Section_is_locked
            ? sectionDateFilter?.to
              ? sectionDateFilter?.to
              : rawData?.duration?.to
              ? rawData?.duration?.to
              : defaultDuration?.to
            : rawData?.duration?.to
            ? rawData?.duration?.to
            : defaultDuration?.to
          : Section_is_locked
          ? sectionDateFilter?.to
            ? sectionDateFilter?.to
            : rawData?.duration?.to
            ? rawData?.duration?.to
            : defaultDuration?.to
          : rawData?.duration?.to
          ? rawData?.duration?.to
          : defaultDuration?.to,
        brands: widgets_is_locked
          ? widgetBrands?.columns
            ? widgetBrands?.columns
            : Section_is_locked
            ? sectionBrands?.columns
              ? sectionBrands?.columns
              : widgetData?.duplicate_for_brands
              ? widgetData?.com_brand_ids
              : sectionComprtitorBrandTypeExists
              ? updatedComBrandList
              : rawData?.global_brands
              ? rawData?.global_brands
              : rawData?.brandlogicalgroup?.length
              ? rawData?.brandlogicalgroup
              : rawData?.brands
            : widgetData?.duplicate_for_brands
            ? widgetData?.com_brand_ids
            : sectionComprtitorBrandTypeExists
            ? updatedComBrandList
            : rawData?.global_brands
            ? rawData?.global_brands
            : rawData?.brandlogicalgroup?.length
            ? rawData?.brandlogicalgroup
            : rawData?.brands
          : Section_is_locked
          ? sectionBrands?.columns
            ? sectionBrands?.columns
            : widgetData?.duplicate_for_brands
            ? widgetData?.com_brand_ids
            : sectionComprtitorBrandTypeExists
            ? updatedComBrandList
            : rawData?.global_brands
            ? rawData?.global_brands
            : rawData?.brandlogicalgroup?.length
            ? rawData?.brandlogicalgroup
            : rawData?.brands
          : widgetData?.duplicate_for_brands
          ? widgetData?.com_brand_ids
          : sectionComprtitorBrandTypeExists
          ? updatedComBrandList
          : rawData?.global_brands
          ? rawData?.global_brands
          : rawData?.brandlogicalgroup?.length
          ? rawData?.brandlogicalgroup
          : rawData?.brands,

        order_by: !rawData?.offset_flag ? updatedOrderBy : widgetData?.order_by,
        offset_flag: rawData?.offset_flag,
        // filters: rawData?.filter ? rawData?.filter : null,
        filters: data_source_based_filters ? data_source_based_filters : null,
        x_axis: widgetData?.x_axis,
        // Break down data
        y_axes: widgetData?.y_axes,
        // y axis data
        y_series: widgetData?.y_series,
        widget_name: widgetData?.widget_name,
        chart: widgetData?.chart,
        comp_brand_list:
          (!widgets_is_locked &&
            !(widgetData?.brand_ids || widgetData?.brand_groups) &&
            widgetData?.duplicate_for_brands) ||
          (!Section_is_locked &&
            !(
              rawData?.panes?.[rawData?.paneIndex]?.sections?.[
                rawData?.section_index
              ]?.brand_ids ||
              rawData?.panes?.[rawData?.paneIndex]?.sections?.[
                rawData?.section_index
              ]?.brand_groups
            ) &&
            widgetData?.duplicate_for_brands)
            ? null
            : widgetData?.comp_brand_list,
        data_source: widgetData?.data_source,
        widget_id: widgetData?.widget_id,
        engine: widgetData?.engine,
        ticket: widgetData?.data_source === "ticket" ? true : false,
        feedback: widgetData?.data_source === "feedback" ? true : false,
        nps: widgetData?.data_source === "nps" ? true : false,
        campaign: widgetData?.data_source === "campaign" ? true : false,
        exclude_words: finalExcludeWords,
        temp_exclude_words: temp_exclude_words,
        profile_filters:
          rawData?.profile_filters_flag && updatedFilter ? updatedFilter : null,
        filter_by: rawData?.filter_by ? rawData?.filter_by : null,
        filter_by_data: rawData?.filter_by_data
          ? rawData?.filter_by_data
          : null,
        complex_filters: rawData?.panes?.[rawData?.paneIndex]?.complex_filters
          ? rawData?.panes?.[rawData?.paneIndex]?.complex_filters
          : null,
      };
    } else {
      graphObject = {
        authParams: rawData?.authParams,
        firstAttr: widgetData?.primary,
        secondAttr: widgetData?.secondary,
        filterObj: rawData?.filter ? rawData?.filter : null,
        splitObj: widgetData?.splits,
        brands: widgets_is_locked
          ? widgetBrands?.columns
            ? widgetBrands?.columns
            : Section_is_locked
            ? sectionBrands?.columns
              ? sectionBrands?.columns
              : rawData?.global_brands
              ? rawData?.global_brands
              : rawData?.brandlogicalgroup?.length
              ? rawData?.brandlogicalgroup
              : rawData?.brands
            : rawData?.global_brands
            ? rawData?.global_brands
            : rawData?.brandlogicalgroup?.length
            ? rawData?.brandlogicalgroup
            : rawData?.brands
          : Section_is_locked
          ? sectionBrands?.columns
            ? sectionBrands?.columns
            : rawData?.global_brands
            ? rawData?.global_brands
            : rawData?.brandlogicalgroup?.length
            ? rawData?.brandlogicalgroup
            : rawData?.brands
          : rawData?.global_brands
          ? rawData?.global_brands
          : rawData?.brandlogicalgroup?.length
          ? rawData?.brandlogicalgroup
          : rawData?.brands,
        base: widgetData?.base,
        duration: widgets_is_locked
          ? widgetFilterDate?.from
            ? widgetFilterDate
            : Section_is_locked
            ? sectionDateFilter?.from
              ? sectionDateFilter
              : rawData?.duration
              ? rawData?.duration
              : defaultDuration
            : rawData?.duration
            ? rawData?.duration
            : defaultDuration
          : Section_is_locked
          ? sectionDateFilter?.from
            ? sectionDateFilter
            : rawData?.duration
            ? rawData?.duration
            : defaultDuration
          : rawData?.duration?.from
          ? rawData?.duration
          : defaultDuration,
        widget_id: widgetData?.widget_id,
        percent: widgetData?.percent,
        exclude_words: finalExcludeWords,
        graph_type: widgetData?.graph_type,
        temp_exclude_words: temp_exclude_words,
        profile_filters:
          rawData?.profile_filters_flag && updatedFilter ? updatedFilter : null,
        filter_by: rawData?.filter_by ? rawData?.filter_by : null,
        filter_by_data: rawData?.filter_by_data
          ? rawData?.filter_by_data
          : null,
        complex_filters: rawData?.panes?.[rawData?.paneIndex]?.complex_filters
          ? rawData?.panes?.[rawData?.paneIndex]?.complex_filters
          : null,
      };
    }

    let global_date = {
      from: graphObject?.start_date,
      to: graphObject?.end_date,
    };
    let filter_date = [];
    graphObject?.filters?.filter?.((d) => {
      if (d.attribute?.toLowerCase() === "createddate") {
        filter_date = [...filter_date, d?.columns];
      }
    });
    let combinedDate = getCombinedDate(global_date, filter_date);
    let getInterval = getTimeIntervalDate(
      combinedDate?.end_date,
      combinedDate?.start_date,
      graphObject?.data_source,
      graphObject?.x_axis?.attribute
    );

    if (
      (graphObject?.chart?.chart_type === "grid" &&
        graphObject?.data_source == "ticket" &&
        rawData?.graphConditionConfig &&
        rawData?.graphConditionConfig?.[`date-attributes`]?.includes(
          graphObject?.x_axis?.attribute?.toLowerCase()
        )) ||
      (graphObject?.x_axis?.date_part === null &&
        rawData?.graphConditionConfig?.[`date_agg-chart_type`]?.includes(
          graphObject?.chart?.chart_type
        ) &&
        rawData?.graphConditionConfig &&
        rawData?.graphConditionConfig?.[`date-attributes`]?.includes(
          graphObject?.x_axis?.attribute?.toLowerCase()
        ))
    ) {
      graphObject.x_axis.date_aggregation = getInterval?.defaultVal;
    }

    graphObject.isBrandModified =
      rawData?.global_brands ||
      (widgets_is_locked &&
        (widgetBrands?.columns
          ? widgetBrands?.columns?.length
          : widgetBrands?.length)) ||
      (Section_is_locked &&
        (sectionBrands?.columns
          ? sectionBrands?.columns?.length
          : sectionBrands?.length)) ||
      widgetData?.duplicate_for_brands
        ? true
        : false;
    if (
      graphObject?.chart?.chart_type === "wordcloud" &&
      widgetData?.duplicate_for_brands
    ) {
      let indexOfCompWords = widgetData?.comp_exclude_words?.findIndex(
        (el) => el?.[graphObject?.brands?.[0]?.brand_id]
      );
      let parmanentExcluededWords = widgetData?.comp_exclude_words?.[
        indexOfCompWords
      ]?.[graphObject?.brands?.[0]?.brand_id]
        ? widgetData?.comp_exclude_words?.[indexOfCompWords]?.[
            graphObject?.brands?.[0]?.brand_id
          ]
        : [];

      graphObject.exclude_words = finalExcludeWords?.length
        ? [...finalExcludeWords, ...parmanentExcluededWords]
        : parmanentExcluededWords;
    }
  }
  return graphObject;
};

export const addDashboardCalledApiList = (widget) => {
  if (widget?.shareTemplateData) {
    // let updatedShareTemplateData = widget?.shareTemplateData;
    let updatedShareTemplateApiCalledList = global.shareTemplateApiCalledList
      ? [...global.shareTemplateApiCalledList]
      : widget?.shareTemplateData?.dashboard_called_api_list;

    let oldList = updatedShareTemplateApiCalledList
      ? updatedShareTemplateApiCalledList
      : [];
    let widgetId =
      widget?.widget_id + "#" + widget?.section_id + "#" + widget?.widget_index;
    let updatedArray = [];
    updatedArray = [...oldList, widgetId];

    // let shareTemplateDataObj = {
    //   ...updatedShareTemplateData,
    //   dashboard_called_api_list: updatedArray,
    // };
    // global.shareTemplateData = shareTemplateDataObj;

    global.shareTemplateApiCalledList = updatedArray;

    return updatedArray;
  } else if (widget?.templateFilter) {
    // console.log("Add Edit")
    // let updatedTemplateDetails = widget?.template_details;

    let updatedTemplateDetailsApiCalledList =
      global.templateDetailsApiCalledList
        ? [...global.templateDetailsApiCalledList]
        : widget?.template_details?.dashboard_called_api_list;

    let oldList = updatedTemplateDetailsApiCalledList
      ? updatedTemplateDetailsApiCalledList
      : [];
    let widgetId =
      widget?.widget_id + "#" + widget?.section_id + "#" + widget?.widget_index;
    let updatedArray = [];
    updatedArray = [...oldList, widgetId];

    // let templateDetailsObj = {
    //   ...updatedTemplateDetails,
    //   dashboard_called_api_list: updatedArray,
    // };
    // global.templateDetails = templateDetailsObj;

    global.templateDetailsApiCalledList = updatedArray;

    return updatedArray;
  } else {
    // console.log("Add View");
    let updatedPanes = global.panes ? [...global.panes] : [...widget?.panes];
    let oldList = updatedPanes?.[widget?.pane_index]?.dashboard_called_api_list
      ? updatedPanes?.[widget?.pane_index]?.dashboard_called_api_list
      : [];
    let widgetId =
      widget?.widget_id + "#" + widget?.section_id + "#" + widget?.widget_index;
    let updatedArray = [];
    updatedArray = [...oldList, widgetId];
    return updatedArray;
  }
};

export const deleteDashboardCalledApiList = (widget) => {
  if (widget?.shareTemplateData) {
    let updatedShareTemplateApiCalledList = global.shareTemplateApiCalledList
      ? [...global.shareTemplateApiCalledList]
      : widget?.shareTemplateData?.dashboard_called_api_list;

    // let dashboardCalledList = updatedShareTemplateCalledList;
    let widgetId =
      widget?.widget_id + "#" + widget?.section_id + "#" + widget?.widget_index;
    let updatedArray = updatedShareTemplateApiCalledList?.filter(
      (d) => d !== widgetId
    );

    // let shareTemplateDataObj = {
    //   ...updatedShareTemplateData,
    //   dashboard_called_api_list: updatedArray,
    // };
    // global.shareTemplateData = shareTemplateDataObj;

    global.shareTemplateApiCalledList = updatedArray;

    return updatedArray;
  } else if (widget?.templateFilter) {
    // console.log("edit delete");
    let updatedTemplateDetailsApiCalledList =
      global.templateDetailsApiCalledList
        ? [...global.templateDetailsApiCalledList]
        : widget?.template_details?.dashboard_called_api_list;

    // let dashboardCalledList = updatedTemplateDetailsApiCalledList;
    let widgetId =
      widget?.widget_id + "#" + widget?.section_id + "#" + widget?.widget_index;
    let updatedArray = updatedTemplateDetailsApiCalledList?.filter(
      (d) => d !== widgetId
    );

    // let templateDetailsObj = {
    //   ...updatedTemplateDetails,
    //   dashboard_called_api_list: updatedArray,
    // };
    // global.templateDetails = templateDetailsObj;

    global.templateDetailsApiCalledList = updatedArray;

    return updatedArray;
  } else {
    // console.log("view delete");
    let updatedPanes = global.panes ? [...global.panes] : [...widget?.panes];
    let dashboardCalledList =
      updatedPanes?.[widget?.pane_index]?.dashboard_called_api_list;
    let widgetId =
      widget?.widget_id + "#" + widget?.section_id + "#" + widget?.widget_index;
    let updatedArray = dashboardCalledList?.filter((d) => d !== widgetId);
    return updatedArray;
  }
};

export const clearHighChartopData = (widget, widget_id) => {
  let updateOpData = global.options ? { ...global.options } : {};
  let sectionIndex = widget?.section_index ? widget?.section_index : 0;
  if (updateOpData?.[widget_id + sectionIndex + widget?.widget_index]) {
    delete updateOpData[widget_id + sectionIndex + widget?.widget_index];
  } else {
    let checkId = widget_id + sectionIndex + widget?.widget_index;
    Object.keys(updateOpData)?.map((el, i) => {
      if (el?.slice(0, -1).includes(checkId)) {
        delete updateOpData[el];
      }
    });
  }
  return updateOpData;
};

export const getTemporaryWordWidgetId = (widget_metadata) => {
  let widget_id = widget_metadata?.parentId
    ? widget_metadata?.parentId +
      "#" +
      widget_metadata?.com_brand_ids?.[0]?.brand_id
    : widget_metadata?.childId +
      "#" +
      widget_metadata?.com_brand_ids?.[0]?.brand_id;
  return widget_id;
};
export const clearGlobalvariables = () => {
  global.panes = null;
  global.Section = null;
  global.template_details = null;
};

export const getGlobalFilterAndFilterCountObject = (
  type,
  selectedPane,
  graphConditionConfig
) => {
  let finalFilters = [];

  if (!selectedPane) {
    return { filters: finalFilters, count: finalFilters?.length };
  }
  if (type === "view_dashboard") {
    // let quickFilterAttribute =
    //   selectedPane?.quick_filter === "AccountID"
    //     ? "SettingID"
    //     : selectedPane?.quick_filter === "Category"
    //     ? "CategoryID"
    //     : selectedPane?.quick_filter;
    // quickFilterAttribute = graphConditionConfig?.[
    //   `quick-filter-keys`
    // ]?.includes(quickFilterAttribute)
    //   ? quickFilterAttribute
    //   : null;
    // let quick_filter = selectedPane?.quick_filter_value
    //   ? [selectedPane?.quick_filter_value]
    //   : [];
    // quickFilterAttribute && selectedPane?.profiles?.length
    //   ? [
    //       {
    //         attribute: quickFilterAttribute,
    //         type: "varchar",
    //         columns: [
    //           {
    //             name:
    //               selectedPane?.quick_filter === "Category"
    //                 ? (selectedPane?.profiles?.[0]?.id).toString()
    //                 : (selectedPane?.profiles?.[0]?.id).toString(),
    //             type: "include",
    //           },
    //         ],
    //       },
    //     ]
    //   : [];
    let hidden_filter = selectedPane?.hidden_filter
      ? [selectedPane?.hidden_filter]
      : [];
    try {
      finalFilters = selectedPane?.filters?.length
        ? selectedPane?.filters?.filter((d) => d?.columns[0]?.name !== null)
        : [];
    } catch (error) {
      finalFilters = [];
    }
    // // To check hidden filters already present in filters list
    // let hidden_filter_present = finalFilters
    //   ?.map((d) => d?.columns?.[0]?.name)
    //   ?.includes(selectedPane?.hidden_filter?.columns?.[0]?.name) ;

    // // To Add Hidden filters, If Private Conversation include or True
    // if (
    //   !hidden_filter_present &&
    //   selectedPane?.hidden_filter?.attribute
    // ) {
    //   finalFilters = [...finalFilters, ...hidden_filter];
    // }

    // let saved_similar_quick_filter_obj = getSimilarStaticFilter(
    //   [],
    //   finalFilters,
    //   quick_filter
    // );

    // let saved_similar_hidden_filter_obj = getSimilarStaticFilter(
    //   hidden_filter,
    //   selectedPane?.filters,
    //   []
    // );

    // if (selectedPane?.hidden_filter || selectedPane?.quick_filter) {
    //   finalFilters = removeHiddenAndQuickFilters(
    //     selectedPane?.quick_filter,
    //     selectedPane?.hidden_filter,
    //     finalFilters
    //   );
    // }

    if (hidden_filter?.length) {
      finalFilters = [...finalFilters, ...hidden_filter];
    }

    // let saved_similar_quick_filter = saved_similar_quick_filter_obj?.filter;
    // if (saved_similar_quick_filter?.length) {
    //   finalFilters = [...finalFilters, ...saved_similar_quick_filter];
    // }
    // let saved_similar_hidden_filter = saved_similar_hidden_filter_obj?.filter;
    // if (saved_similar_hidden_filter?.length) {
    //   finalFilters = [...finalFilters, ...saved_similar_hidden_filter];
    // }

    // To Merge Hidden Filters and Private Conversarion Channel filters
    finalFilters = mergeSimilarAttributeInTooltip(
      finalFilters ? finalFilters : [],
      selectedPane?.hidden_filter ? selectedPane?.hidden_filter : [],
      selectedPane?.saved_filters ? selectedPane?.saved_filters : []
    );
    // if (selectedPane?.hidden_filter?.attribute && finalFilters?.length) {
    //   finalFilters?.map((d) => {
    //     if (d?.attribute === selectedPane?.hidden_filter?.attribute) {
    //       let columns = [];
    //       d.columns?.map((c) => {
    //         if (c?.name !== selectedPane?.hidden_filter?.columns?.[0]?.name) {
    //           columns.push(c);
    //         }
    //       });
    //       columns.push(selectedPane?.hidden_filter?.columns?.[0]);
    //       d.columns = columns;
    //     }
    //     return d;
    //   });
    // }

    // // To check hidden filters already present in filters list
    // let hidden_filter_present = finalFilters
    //   ?.map((d) => d?.attribute)
    //   ?.includes(selectedPane?.hidden_filter?.attribute);

    // // To Add Hidden filters, If Private Conversation include or True
    // if (
    //   !hidden_filter_present &&
    //   selectedPane?.hidden_filter?.attribute &&
    //   selectedPane?.private_conversation
    // ) {
    //   finalFilters = [...finalFilters, selectedPane?.hidden_filter];
    // }
  } else if (type === "edit_dashboard") {
    // let quick_filter = selectedPane?.quick_filter_value
    //   ? [selectedPane?.quick_filter_value]
    //   : [];

    finalFilters = selectedPane?.templateFilters?.length
      ? selectedPane?.templateFilters?.filter(
          (d) => d?.columns[0]?.name !== null
        )
      : [];
    let hidden_filter = selectedPane?.hidden_filter
      ? [selectedPane?.hidden_filter]
      : [];
    // let saved_similar_quick_filter_obj = getSimilarStaticFilter(
    //   [],
    //   finalFilters,
    //   quick_filter
    // );
    // let saved_similar_hidden_filter_obj = getSimilarStaticFilter(
    //   hidden_filter,
    //   finalFilters,
    //   []
    // );

    // if (selectedPane?.hidden_filter || selectedPane?.quick_filter) {
    //   finalFilters = removeHiddenAndQuickFilters(
    //     selectedPane?.quick_filter,
    //     selectedPane?.hidden_filter,
    //     finalFilters
    //   );
    // }

    // let saved_similar_quick_filter = saved_similar_quick_filter_obj?.filter;
    // if (saved_similar_quick_filter?.length) {
    //   finalFilters = [...finalFilters, ...saved_similar_quick_filter];
    // }
    // let saved_similar_hidden_filter = saved_similar_hidden_filter_obj?.filter;
    // if (saved_similar_hidden_filter?.length) {
    //   finalFilters = [...finalFilters, ...saved_similar_hidden_filter];
    // }
    if (hidden_filter?.length) {
      finalFilters = [...finalFilters, ...hidden_filter];
    }
    // To Merge Hidden Filters and Private Conversarion Channel filters
    finalFilters = mergeSimilarAttributeInTooltip(
      finalFilters ? finalFilters : [],
      selectedPane?.hidden_filter ? selectedPane?.hidden_filter : [],
      selectedPane?.saved_filters ? selectedPane?.saved_filters : []
    );
    // To check hidden filters already present in filters list
    // let hidden_filter_present = finalFilters
    //   ?.map((d) => d?.attribute)
    //   ?.includes(selectedPane?.hidden_filter?.attribute);

    // // To Add Hidden filters, If Private Conversation include or True
    // if (
    //   !hidden_filter_present &&
    //   selectedPane?.hidden_filter?.attribute &&
    //   selectedPane?.private_conversation
    // ) {
    //   finalFilters = [...finalFilters, selectedPane?.hidden_filter];
    // }
    // console.log("edit finalFilters", finalFilters);
  } else if (type === "share_dashboard") {
    // let quickFilterAttribute =
    //   selectedPane?.quick_filter === "AccountID"
    //     ? "SettingID"
    //     : selectedPane?.quick_filter === "Category"
    //     ? "CategoryID"
    //     : selectedPane?.quick_filter;
    // quickFilterAttribute = graphConditionConfig?.[
    //   `quick-filter-keys`
    // ]?.includes(quickFilterAttribute)
    //   ? quickFilterAttribute
    //   : null;
    // let quick_filter = selectedPane?.quick_filter_value
    //   ? [selectedPane?.quick_filter_value]
    //   : [];

    // quickFilterAttribute && selectedPane?.profiles?.length
    //   ? [
    //       {
    //         attribute: quickFilterAttribute,
    //         type: "varchar",
    //         columns: [
    //           {
    //             name:
    //               selectedPane?.quick_filter === "Category"
    //                 ? (selectedPane?.profiles?.[0]?.id).toString()
    //                 : (selectedPane?.profiles?.[0]?.id).toString(),
    //             type: "include",
    //           },
    //         ],
    //       },
    //     ]
    //   : [];

    finalFilters = selectedPane?.filters?.length
      ? selectedPane?.filters?.filter((d) => d?.columns[0]?.name !== null)
      : [];
    let hidden_filter = selectedPane?.hidden_filter
      ? [selectedPane?.hidden_filter]
      : [];
    // let saved_similar_quick_filter_obj = getSimilarStaticFilter(
    //   [],
    //   finalFilters,
    //   quick_filter
    // );
    // let saved_similar_hidden_filter_obj = getSimilarStaticFilter(
    //   hidden_filter,
    //   selectedPane?.filters,
    //   []
    // );
    // if (selectedPane?.hidden_filter || selectedPane?.quick_filter) {
    //   finalFilters = removeHiddenAndQuickFilters(
    //     selectedPane?.quick_filter,
    //     selectedPane?.hidden_filter,
    //     finalFilters
    //   );
    // }

    // let saved_similar_quick_filter = saved_similar_quick_filter_obj?.filter;
    // if (saved_similar_quick_filter?.length) {
    //   finalFilters = [...finalFilters, ...saved_similar_quick_filter];
    // }
    // let saved_similar_hidden_filter = saved_similar_hidden_filter_obj?.filter;
    // if (saved_similar_hidden_filter?.length) {
    //   finalFilters = [...finalFilters, ...saved_similar_hidden_filter];
    // }
    if (hidden_filter?.length) {
      finalFilters = [...finalFilters, ...hidden_filter];
    }

    // To Merge Hidden Filters and Private Conversarion Channel filters
    finalFilters = mergeSimilarAttributeInTooltip(
      finalFilters ? finalFilters : [],
      selectedPane?.hidden_filter ? selectedPane?.hidden_filter : [],
      selectedPane?.saved_filters ? selectedPane?.saved_filters : []
    );
    // if (selectedPane?.hidden_filter?.attribute && finalFilters?.length) {
    //   finalFilters?.map((d) => {
    //     if (d?.attribute === selectedPane?.hidden_filter?.attribute) {
    //       let columns = [];
    //       d.columns?.map((c) => {
    //         if (c?.name !== selectedPane?.hidden_filter?.columns?.[0]?.name) {
    //           columns.push(c);
    //         }
    //       });
    //       columns.push(selectedPane?.hidden_filter?.columns?.[0]);
    //       d.columns = columns;
    //     }
    //     return d;
    //   });
    // }
    // To check hidden filters already present in filters list
    // let hidden_filter_present = finalFilters
    //   ?.map((d) => d?.attribute)
    //   ?.includes(selectedPane?.hidden_filter?.attribute);

    // // To Add Hidden filters, If Private Conversation include or True
    // if (
    //   !hidden_filter_present &&
    //   selectedPane?.hidden_filter?.attribute &&
    //   selectedPane?.private_conversation
    // ) {
    //   finalFilters = [...finalFilters, selectedPane?.hidden_filter];
    // }
  } else if (type === "pdf_schedule") {
    // let quick_filter = selectedPane?.quick_filter_value
    //   ? [selectedPane?.quick_filter_value]
    //   : [];

    let hidden_filter = selectedPane?.hidden_filter
      ? [selectedPane?.hidden_filter]
      : [];
    finalFilters =
      selectedPane?.filters && selectedPane?.filters?.length > 0
        ? selectedPane?.filters?.filter((d) => d?.columns[0]?.name !== null)
        : [];

    if (hidden_filter?.length) {
      finalFilters = [...finalFilters, ...hidden_filter];
    }

    // To Merge Hidden Filters and Private Conversarion Channel filters
    finalFilters = mergeSimilarAttributeInTooltip(
      finalFilters ? finalFilters : [],
      selectedPane?.hidden_filter ? selectedPane?.hidden_filter : [],
      selectedPane?.saved_filters ? selectedPane?.saved_filters : []
    );
  }
  return { filters: finalFilters, count: finalFilters?.length };
};

export const getTemplateListBasicObject = (
  authParams,
  panes,
  index,
  pageSize,
  graphConditionConfig,
  schedulePath
) => {
  let basicObj;
  if (schedulePath) {
    basicObj = {
      authParams: authParams,
      search_text:
        window.location.pathname === "/schedule"
          ? ""
          : panes?.[index]?.dashboard_template_filters?.search_text?.trim()
          ? panes?.[index]?.dashboard_template_filters?.search_text?.trim()
          : "",
      pill:
        window.location.pathname === "/schedule"
          ? "All Dashboards"
          : panes?.[index]?.dashboard_template_filters?.pill
          ? panes?.[index]?.dashboard_template_filters?.pill
          : "All Dashboards",
      offset:
        window.location.pathname === "/schedule"
          ? 0
          : panes?.[index]?.dashboard_template_filters?.offset
          ? panes?.[index]?.dashboard_template_filters?.offset
          : 0,
      no_of_rows: pageSize,
      sort_expression:
        window.location.pathname === "/schedule"
          ? "usage_count"
          : panes?.[index]?.dashboard_template_filters?.sort_expression
          ? panes?.[index]?.dashboard_template_filters?.sort_expression
          : graphConditionConfig?.[`static-categories`] ===
            authParams?.category_id
          ? "template_name"
          : "usage_count",
      sort_order:
        window.location.pathname === "/schedule"
          ? "desc"
          : panes?.[index]?.dashboard_template_filters?.sort_order
          ? panes?.[index]?.dashboard_template_filters?.sort_order
          : graphConditionConfig?.[`static-categories`] ===
            authParams?.category_id
          ? "asc"
          : "desc",
      type:
        window.location.pathname === "/schedule"
          ? "report"
          : panes?.[index]?.dashboard_template_filters?.type
          ? panes?.[index]?.dashboard_template_filters?.type
          : "dashboard",
    };
  } else {
    basicObj = {
      authParams: authParams,
      search_text: panes?.[
        index
      ]?.dashboard_template_filters?.search_text?.trim()
        ? panes?.[index]?.dashboard_template_filters?.search_text?.trim()
        : "",
      pill: panes?.[index]?.dashboard_template_filters?.pill
        ? panes?.[index]?.dashboard_template_filters?.pill
        : "All Dashboards",
      offset: panes?.[index]?.dashboard_template_filters?.offset
        ? panes?.[index]?.dashboard_template_filters?.offset
        : 0,
      no_of_rows: pageSize,
      sort_expression: panes?.[index]?.dashboard_template_filters
        ?.sort_expression
        ? panes?.[index]?.dashboard_template_filters?.sort_expression
        : graphConditionConfig?.[`static-categories`] ===
          authParams?.category_id
        ? "template_name"
        : "usage_count",
      sort_order: panes?.[index]?.dashboard_template_filters?.sort_order
        ? panes?.[index]?.dashboard_template_filters?.sort_order
        : graphConditionConfig?.[`static-categories`] ===
          authParams?.category_id
        ? "asc"
        : "desc",
      type: panes?.[index]?.dashboard_template_filters?.type
        ? panes?.[index]?.dashboard_template_filters?.type
        : "dashboard",
    };
  }
  return basicObj;
};

export const getTemplateListDashboardObject = (
  authParams,
  pageSize,
  graphConditionConfig
) => {
  let dashboardObj = {
    search_text: "",
    pill: "All Dashboards",
    offset: 0,
    no_of_rows: pageSize,
    sort_expression:
      graphConditionConfig?.[`static-categories`] === authParams?.category_id
        ? "template_name"
        : "usage_count",
    sort_order:
      graphConditionConfig?.[`static-categories`] === authParams?.category_id
        ? "asc"
        : "desc",
    type: "dashboard",
  };
  return dashboardObj;
};

export const getWidgetLibraryListObject = (obj) => {
  let widgetLibraryListObject;
  if (obj?.widgetLibraryFilter) {
    widgetLibraryListObject = {
      authParams: obj?.authParams,
      search_text: obj?.searchTextEmpty
        ? ""
        : obj?.widgetLibraryFilter?.search_text
        ? obj?.widgetLibraryFilter?.search_text
        : "",
      pill: obj?.tabName
        ? obj?.tabName
        : obj?.widgetLibraryFilter?.pill
        ? obj?.widgetLibraryFilter?.pill
        : "All Widgets",
      offset: obj?.pageNo ? obj?.pageNo : 0,
      no_of_rows: obj?.widgetLibraryFilter?.no_of_rows
        ? obj?.widgetLibraryFilter?.no_of_rows
        : 12,
      sort_expression: obj?.sortExpression
        ? obj?.sortExpression
        : obj?.widgetLibraryFilter?.sort_expression
        ? obj?.widgetLibraryFilter?.sort_expression
        : obj?.tabKey === "3"
        ? "widget_name"
        : "created_date",
      sort_order: obj?.sortOrder
        ? obj?.sortOrder
        : obj?.widgetLibraryFilter?.sort_order
        ? obj?.widgetLibraryFilter?.sort_order
        : "desc",
      chart_type: obj?.chartTypeNameEmpty
        ? ""
        : obj?.chartTypeName
        ? obj?.chartTypeName
        : obj?.widgetLibraryFilter?.chart_type
        ? obj?.widgetLibraryFilter?.chart_type
        : "",
      attribute: obj?.attributeNameEmpty
        ? ""
        : obj?.attributeName
        ? obj?.attributeName
        : obj?.widgetLibraryFilter?.attribute
        ? obj?.widgetLibraryFilter?.attribute
        : "",
      type: obj?.tabKey === "3" ? "base-widget" : "widget-maker",
    };
  } else {
    widgetLibraryListObject = {
      authParams: obj?.authParams,
      search_text: "",
      pill: "All Widgets",
      offset: 0,
      no_of_rows: 12,
      sort_expression: obj?.tabKey === "3" ? "widget_name" : "created_date",
      sort_order: "desc",
      chart_type: "",
      attribute: "",
      type: obj?.tabKey === "3" ? "base-widget" : "widget-maker",
    };
  }

  return widgetLibraryListObject;
};

export const getDiscardedFilters = (rawData) => {
  let obj;
  let updatedColumns = [];

  if (rawData?.profile_filters_list) {
    // console.log("delete data here", rawData)
    rawData?.profile_filters_list?.map((d) => {
      rawData?.profile_filters?.columns?.map((c) => {
        if (c?.name === d?.id) {
          updatedColumns = [...updatedColumns, c];
        }
      });
    });
    // console.log("check updatedColumns", updatedColumns)

    if (updatedColumns?.length) {
      obj = {
        attribute: "SocialMediaProfiles",
        type: "varchar",
        columns: updatedColumns,
      };
    } else {
      obj = null;
    }

    // console.log("final obj", obj);
  }
  return obj;
};

export const getDefaultGlobalBrand = (graphObject) => {
  let brands = graphObject?.brands?.columns
    ? graphObject?.brands?.columns
    : graphObject?.brands;

  let single_brands = [];
  let brandsGroupName = [];
  if (graphObject?.brands) {
    if (brands && brands?.[0]?.brand_list) {
      brandsGroupName = [
        {
          brand_group_name: brands?.[0]?.brand_group_name,
        },
      ];
    } else {
      single_brands?.push({
        brand_id: brands && brands?.[0]?.brand_id && brands?.[0]?.brand_id,
        brand_name:
          brands && brands?.[0]?.brand_name && brands?.[0]?.brand_name,
      });
    }
  }
  return brandsGroupName?.length ? brandsGroupName : single_brands;
};

export const getWidgetMakerFlag = (widgetGraphConfig, wm_api_flag) => {
  let y_series_index = 0;
  let final_flag = false;
  let empty_fields = [];
  if (
    widgetGraphConfig?.chart_type === "combination" ||
    widgetGraphConfig?.chart_type === "bar" ||
    widgetGraphConfig?.chart_type === "area" ||
    widgetGraphConfig?.chart_type === "line" ||
    widgetGraphConfig?.chart_type === "horizontal-bar"
  ) {
    let y_series_array = Object.keys(widgetGraphConfig?.y_axis).map(
      (key) => widgetGraphConfig?.y_axis[key]
    );

    y_series_index = y_series_array?.findIndex((el) => !el?.attribute);
    let series_length_flag =
      widgetGraphConfig?.chart_type === "combination"
        ? y_series_array?.length > 2
          ? true
          : false
        : y_series_array?.length > 1
        ? true
        : false;
    if (series_length_flag) {
      if (!widgetGraphConfig?.y_axis?.y_series_1?.attribute) {
        empty_fields?.push("y_series_1");
      }
      if (!widgetGraphConfig?.y_axis?.y_series_2?.attribute) {
        empty_fields?.push("y_series_2");
      }
      if (!widgetGraphConfig?.x_axis?.attribute) {
        empty_fields?.push("x_axis");
      }
    }
    if (y_series_index > 0) {
      empty_fields?.push("y_series_" + (y_series_index + 1));
    }

    if (
      wm_api_flag ||
      y_series_index > 0 ||
      (series_length_flag &&
        !widgetGraphConfig?.y_axis?.y_series_1?.attribute) ||
      (series_length_flag &&
        !widgetGraphConfig?.y_axis?.y_series_2?.attribute) ||
      (series_length_flag && !widgetGraphConfig?.x_axis?.attribute)
    ) {
      final_flag = true;
    }
  }

  return { flag: final_flag, value: empty_fields };
};

export const getEmptyFieldNotification = () => {
  return callNotification(
    "Please add attribute to the asterisk(*) marked field(s)",
    "alert"
  );
};

export const getByDefaultProfileFilters = (profileFilterList) => {
  let obj;
  if (profileFilterList?.length > 0) {
    obj = {
      attribute: "SocialMediaProfiles",
      type: "varchar",
      columns: [
        {
          name: profileFilterList?.[0]?.id ? profileFilterList?.[0]?.id : null,
          type: "include",
          display_name: profileFilterList?.[0]?.name
            ? profileFilterList?.[0]?.name
            : null,
          profile_channel: profileFilterList?.[0]?.channel
            ? profileFilterList?.[0]?.channel
            : null,
          brand_id: profileFilterList?.[0]?.brand_id
            ? profileFilterList?.[0]?.brand_id
            : null,
        },
      ],
    };
  }
  return obj;
};

export const getPrivateConversationFilters = (
  comp_hidden_filter,
  global_filters,
  saved_filters
) => {
  comp_hidden_filter = comp_hidden_filter?.length
    ? deepCopy(comp_hidden_filter)
    : [];
  global_filters = global_filters?.length ? deepCopy(global_filters) : [];
  saved_filters = saved_filters?.length ? deepCopy(saved_filters) : [];

  let filters = [];
  let global_attribute_array = global_filters?.map((el) => {
    return el?.attribute;
  });
  //check in static filters if global filters contain static filter attribute, if not add it, if yes update it
  comp_hidden_filter?.map((el, i) => {
    if (!global_attribute_array?.includes(el?.attribute)) {
      filters.push(comp_hidden_filter?.[i]);
    } else {
      // let index = global_filters?.findIndex(
      //   (item) => item?.attribute === el?.attribute
      // );
      // global_filters[index] = el;

      if (global_filters?.length && saved_filters?.length) {
        global_filters?.map((g) => {
          saved_filters?.map((d, i) => {
            if (d?.attribute === el?.attribute) {
              d?.columns?.map((c) => {
                if (!d?.columns?.map((d) => d?.name)?.includes(c?.name)) {
                  g?.columns.push(c);
                }
              });
            }
          });

          if (g?.attribute === el?.attribute) {
            el?.columns?.map((c) => {
              if (!g?.columns?.map((d) => d?.name)?.includes(c?.name)) {
                g?.columns.unshift(c);
              }
            });
          }
        });
      } else if (global_filters?.length) {
        global_filters?.map((g) => {
          if (g?.attribute === el?.attribute) {
            el?.columns?.map((c) => {
              if (!g?.columns?.map((d) => d?.name)?.includes(c?.name)) {
                g?.columns.unshift(c);
              }
            });
          }
        });
      }
    }
  });

  return [...filters, ...global_filters];
};
export const removePrivateConversationFilters = (
  comp_hidden_filter,
  global_filters,
  saved_filters
) => {
  comp_hidden_filter = comp_hidden_filter?.length
    ? deepCopy(comp_hidden_filter)
    : [];
  global_filters = global_filters?.length ? deepCopy(global_filters) : [];
  saved_filters = saved_filters?.length ? deepCopy(saved_filters) : [];

  // console.log(
  //   "comp_hidden_filter",
  //   deepCopy(comp_hidden_filter),
  //   "global_filters",
  //   deepCopy(global_filters),
  //   "saved_filters",
  //   deepCopy(saved_filters)
  // );
  let mergedFilters = [...global_filters];

  global_filters?.map((g) => {
    comp_hidden_filter?.map((comp) => {
      if (g?.attribute === comp?.attribute) {
        comp?.columns?.map((c) => {
          if (!g?.columns?.map((d) => d?.name)?.includes(c?.name)) {
            g.columns.push(c);
          }
        });
        if (!mergedFilters?.map((d) => d?.attribute)?.includes(g?.attribute)) {
          mergedFilters = [...mergedFilters, g];
        }
      } else {
        if (
          !mergedFilters?.map((d) => d?.attribute)?.includes(comp?.attribute)
        ) {
          mergedFilters = [...mergedFilters, comp];
        }
        if (!mergedFilters?.map((d) => d?.attribute)?.includes(g?.attribute)) {
          mergedFilters = [...mergedFilters, g];
        }
      }
    });
    // if (saved_filters?.length) {
    //   saved_filters?.map((s) => {
    //     if (g?.attribute === s?.attribute) {
    //       s?.columns?.map((c) => {
    //         if (!g?.columns?.map((d) => d?.name)?.includes(c?.name)) {
    //           g.columns.push(c);
    //         }
    //       });
    //       if (
    //         !mergedFilters?.map((d) => d?.attribute)?.includes(g?.attribute)
    //       ) {
    //         mergedFilters = [...mergedFilters, g];
    //       }
    //     } else {
    //       if (
    //         !mergedFilters?.map((d) => d?.attribute)?.includes(s?.attribute)
    //       ) {
    //         mergedFilters = [...mergedFilters, s];
    //       }
    //       if (
    //         !mergedFilters?.map((d) => d?.attribute)?.includes(g?.attribute)
    //       ) {
    //         mergedFilters = [...mergedFilters, g];
    //       }
    //     }
    //   });
    // }
  });
  // console.log(
  //   "Start mergedFilters",
  //   mergedFilters,
  //   "comp_hidden_filter",
  //   comp_hidden_filter
  // );

  let filterData = [];
  comp_hidden_filter?.map((comp) => {
    mergedFilters?.map((m) => {
      if (comp?.attribute === m?.attribute) {
        // let updatedColumn = [...m?.columns];
        comp?.columns?.map((cCol) => {
          if (m?.columns?.map((d) => d?.name)?.includes(cCol?.name)) {
            m.columns = m?.columns?.filter(
              (d) =>
                d?.name !== cCol?.name ||
                (d?.name === cCol?.name && d?.type !== cCol?.type)
            );
          }
          // console.log("Inside updatedColumn", deepCopy(updatedColumn));
        });

        // console.log("updatedColumn", updatedColumn);
        // m.columns = updatedColumn;
        if (
          !filterData?.map((d) => d?.attribute)?.includes(m?.attribute) &&
          m?.columns?.length
        ) {
          filterData.push(m);
        }
      } else if (
        !comp_hidden_filter?.map((d) => d?.attribute)?.includes(m?.attribute) &&
        !filterData?.map((d) => d?.attribute)?.includes(m?.attribute)
      ) {
        // console.log("Inside else if", m);
        filterData.push(m);
      }
    });
  });

  // console.log("Updated filterData", filterData);
  return [...filterData];
};

export const removeSavedFilters = (
  global_filters,
  saved_filters,
  comp_hidden_filter,
  private_conversation
) => {
  global_filters = global_filters?.length ? deepCopy(global_filters) : [];
  saved_filters = saved_filters?.length ? deepCopy(saved_filters) : [];
  comp_hidden_filter = comp_hidden_filter?.length
    ? deepCopy(comp_hidden_filter)
    : [];
  // console.log(
  //   "global_filters",
  //   deepCopy(global_filters),
  //   "saved_filters",
  //   deepCopy(saved_filters),
  //   "comp_hidden_filter ",
  //   deepCopy(comp_hidden_filter),
  //   "private_conversation ",
  //   private_conversation
  // );

  let filterData = [];
  if (comp_hidden_filter?.length && private_conversation) {
    if (global_filters?.length) {
      getRemainingFilter(global_filters, comp_hidden_filter, filterData);
    }

    if (filterData?.length === 0 && saved_filters?.length) {
      filterData = [...saved_filters];
    } else if (saved_filters?.length === 0 && filterData?.length) {
      filterData = [...filterData];
    } else if (filterData?.length >= saved_filters?.length) {
      getRemainingFilter(filterData, saved_filters, filterData);
    } else if (filterData?.length) {
      getRemainingFilter(saved_filters, filterData, filterData);
    }
  } else if (comp_hidden_filter?.length && !private_conversation) {
    if (global_filters?.length >= comp_hidden_filter?.length) {
      getRemainingFilter(global_filters, comp_hidden_filter, filterData);
    } else {
      getRemainingFilter(comp_hidden_filter, global_filters, filterData);
    }

    if (filterData?.length === 0 && saved_filters?.length) {
      filterData = [...saved_filters];
    } else if (saved_filters?.length === 0 && filterData?.length) {
      filterData = [...filterData];
    } else if (filterData?.length >= saved_filters?.length) {
      getRemainingFilter(filterData, saved_filters, filterData);
    } else if (filterData?.length) {
      getRemainingFilter(saved_filters, filterData, filterData);
    }
  } else if (!comp_hidden_filter?.length) {
    if (global_filters?.length === 0 && saved_filters?.length) {
      filterData = [...saved_filters];
    } else if (saved_filters?.length === 0 && global_filters?.length) {
      filterData = [...global_filters];
    } else if (global_filters?.length >= saved_filters?.length) {
      getRemainingFilter(global_filters, saved_filters, filterData);
    } else if (global_filters?.length) {
      getRemainingFilter(saved_filters, global_filters, filterData);
    }
  }

  filterData = filterData?.filter((d) =>
    isArray(d?.columns) ? d?.columns?.length : Object?.keys(d?.columns)?.length
  );
  // console.log("Updated filterData ", filterData);
  return [...filterData];
};

export const getRemainingFilter = (
  highLengthFilters,
  lowLengthFilters,
  filterData
) => {
  lowLengthFilters?.map((s) => {
    highLengthFilters?.map((g) => {
      if (
        s?.attribute === g?.attribute &&
        isArray(s?.columns?.[0]?.name) &&
        isArray(g?.columns?.[0]?.name)
      ) {
        let array1 = highLengthFilters?.find(
          (d) => d?.attribute === s?.attribute
        );
        let array2 = lowLengthFilters?.find(
          (d) => d?.attribute === s?.attribute
        );
        let result = deleteSimilarObjects([array1], [array2]);
        result = result?.map((d) => {
          d.columns = d?.columns
            ?.map((col) => {
              if (col?.name?.length) {
                return col;
              } else {
                return null;
              }
            })
            .filter((d) => d);
          return d;
        });

        if (
          filterData
            ?.map((d) => d?.attribute)
            ?.includes(s?.attribute || g?.attribute)
        ) {
          filterData?.map((f) => {
            if (
              f?.attribute === s?.attribute ||
              f?.attribute === g?.attribute
            ) {
              f.columns = result?.[0]?.columns;
            }
          });
        } else {
          filterData.push(result?.[0]);
        }
      } else if (
        s?.attribute === g?.attribute &&
        s?.columns?.from &&
        g?.columns?.from
      ) {
        if (
          g?.columns?.from !== s?.columns?.from ||
          g?.columns?.to !== s?.columns?.to
        ) {
          filterData.push(g);
        } else {
          g.columns = [];
          filterData.push(g);
        }
      } else if (s?.attribute === g?.attribute) {
        s?.columns?.map((sCol) => {
          if (g?.columns?.map((d) => d?.name)?.includes(sCol?.name)) {
            g.columns = g?.columns?.filter(
              (d) =>
                d?.name !== sCol?.name ||
                (d?.name === sCol?.name && d?.type !== sCol?.type)
            );
          }
        });
        if (
          !filterData?.map((d) => d?.attribute)?.includes(g?.attribute) &&
          g?.columns?.length
        ) {
          // console.log("Inside if g ", g);
          filterData.push(g);
        }
      } else if (
        !lowLengthFilters?.map((d) => d?.attribute)?.includes(g?.attribute) &&
        !filterData?.map((d) => d?.attribute)?.includes(g?.attribute)
      ) {
        filterData.push(g);
      }
    });
  });
  // console.log("Final filterData", filterData);
  return filterData;
};

export const deleteSimilarObjects = (array1, array2) => {
  // console.log("array1", array1, "array2", array2);
  const namesByType = {};
  array2?.forEach((obj) => {
    obj?.columns?.forEach((col) => {
      if (!namesByType?.[col?.type]) {
        namesByType[col.type] = new Set();
      }
      isArray(col?.name) &&
        col?.name?.forEach((name) => namesByType?.[col.type]?.add(name));
    });
  });
  // console.log("namesByType", namesByType);

  // Loop through array1 and delete same name values
  const result = array1?.map((obj) => {
    const updatedColumns = obj?.columns?.map((col) => {
      if (namesByType?.[col?.type]) {
        let namesByTypeLength = [...namesByType[col?.type]];
        let uniqueNames = [];
        if (col?.name?.length >= namesByTypeLength?.length) {
          uniqueNames = col?.name?.filter(
            (name) => !namesByType[col?.type]?.has(name)
          );
        } else {
          uniqueNames = namesByTypeLength?.filter(
            (name) => !col?.name?.includes(name)
          );
        }
        return { ...col, name: uniqueNames };
      }
      return col;
    });
    array2?.[0]?.columns?.map((col) => {
      if (updatedColumns?.map((d) => d?.type)?.includes(col?.type)) {
        // console.log("Inside If", col);
      } else {
        // console.log("Inside Else", col);
        updatedColumns.push(col);
      }
    });
    // console.log("Final updatedColumns", updatedColumns);
    return { ...obj, columns: updatedColumns };
  });

  // console.log("result", result);
  return result;
};

// export const removePrivateConversationFilters1 = (
//   comp_hidden_filter,
//   global_filters,
//   saved_filters
// ) => {
//   comp_hidden_filter = comp_hidden_filter?.length
//     ? deepCopy(comp_hidden_filter)
//     : [];
//   global_filters = global_filters?.length ? deepCopy(global_filters) : [];
//   saved_filters = saved_filters?.length ? deepCopy(saved_filters) : [];

//   console.log("comp_hidden_filter", deepCopy(comp_hidden_filter));
//   console.log("global_filters", deepCopy(global_filters));
//   console.log("saved_filters", deepCopy(saved_filters));

//   let filters = [];
//   let add_saved_filter = [];
//   let comp_attribute_array = comp_hidden_filter?.map((el) => {
//     return el?.attribute;
//   });
//   let saved_filters_array = saved_filters?.map((el) => {
//     return el?.attribute;
//   });
//   global_filters?.map((el, i) => {
//     if (!comp_attribute_array?.includes(el?.attribute)) {
//       filters.push(el);
//     }
//     if (comp_attribute_array?.includes(el?.attribute)) {
//       let findObject = comp_hidden_filter?.find(
//         (d) => d?.attribute === el?.attribute
//       );

//       if (
//         el?.attribute === findObject?.attribute &&
//         el?.columns?.length !== findObject?.columns?.length
//       ) {
//         el.columns = el?.columns?.filter(
//           (d, i) => d?.name !== findObject?.columns?.[0]?.name
//         );
//         filters.push(el);
//       }
//     }
//     if (
//       comp_attribute_array?.includes(el?.attribute) &&
//       saved_filters_array?.includes(el?.attribute)
//     ) {
//       add_saved_filter.push(el?.attribute);
//     }
//   });
//   if (add_saved_filter?.length) {
//     saved_filters?.map((el) => {
//       if (add_saved_filter?.includes(el?.attribute)) {
//         if (!filters?.map((d) => d?.attribute)?.includes(el?.attribute)) {
//           filters.push(el);
//         }
//       }
//     });
//   }

//   console.log("Remove filters", filters);
//   return [...filters];
// };

export const removeHiddenAndQuickFilters = (
  quick_filter,
  hidden_filter,
  filters
) => {
  let final_quickFilter =
    quick_filter?.toLowerCase() === "category"
      ? "categoryid"
      : quick_filter?.toLowerCase() === "accountid"
      ? "settingid"
      : quick_filter?.toLowerCase();
  let finalFilters =
    quick_filter || hidden_filter
      ? filters?.filter(
          (el) =>
            el?.attribute !== final_quickFilter &&
            el?.attribute !== hidden_filter?.attribute
        )
      : filters;

  return finalFilters;
};

export const mergeSimilarAttributeInTooltip = (AllFilters) => {
  let finalFilters = [];

  for (let i = 0; i < AllFilters.length; i++) {
    const currentFilter = AllFilters[i];

    // Handling for followerscount attribute
    if (currentFilter.attribute === "followerscount") {
      const existingIndex = finalFilters.findIndex(
        (filter) =>
          filter.attribute === "followerscount" &&
          filter.columns.from === currentFilter.columns.from &&
          filter.columns.to === currentFilter.columns.to
      );

      if (existingIndex === -1) {
        finalFilters.push(currentFilter);
      }
      continue; // Skip further processing for this attribute
    }

    // General handling for other attributes
    const existingIndex = finalFilters.findIndex(
      (filter) => filter.attribute === currentFilter.attribute
    );

    if (existingIndex !== -1) {
      let existingFilter = finalFilters[existingIndex];
      let existingColumns = existingFilter.columns;
      let newColumns = currentFilter.columns;

      if (!Array.isArray(existingColumns)) existingColumns = [existingColumns];
      if (!Array.isArray(newColumns)) newColumns = [newColumns];

      newColumns.forEach((el) => {
        if (existingColumns.findIndex((e) => e.name === el.name) === -1) {
          existingColumns.push(el);
        }
      });

      finalFilters[existingIndex].columns = existingColumns;
    } else {
      finalFilters.push(currentFilter);
    }
  }

  return finalFilters;
};

export const getSimilarStaticFilter = (
  hidden_filter,
  filters,
  quick_filter
) => {
  // if (filters?.length && comp_hidden_filter?.length && hidden_filter?.length) {
  //   let filter = [];
  //   for (let i = 0; i < filters?.length; i++) {
  //     for (let j = 0; j < comp_hidden_filter?.length; j++) {
  //       if (
  //         filters?.[i]?.attribute === comp_hidden_filter?.[j]?.attribute &&
  //         comp_hidden_filter?.[j]?.attribute === hidden_filter?.[0]?.attribute
  //       ) {
  //         if (
  //           (filters?.[i]?.columns?.length === 1 &&
  //             hidden_filter?.[0]?.columns?.[0]?.name !=
  //               filters?.[i]?.columns?.[0]?.name) ||
  //           filters?.[j]?.columns?.length > 1
  //         ) {
  //           filter.push(filters?.[j]);
  //         }
  //       }
  //     }
  //   }
  //   return {
  //     value: true,
  //     filter: filter,
  //   };
  // }
  if (filters?.length && hidden_filter?.length) {
    let filter = [];
    for (let j = 0; j < filters?.length; j++) {
      if (filters?.[j]?.attribute === hidden_filter?.[0]?.attribute) {
        if (
          (filters?.[j]?.columns?.length === 1 &&
            hidden_filter?.[0]?.columns?.[0]?.name !=
              filters?.[j]?.columns?.[0]?.name) ||
          filters?.[j]?.columns?.length > 1
        ) {
          filter.push(filters?.[j]);
        }
      }
    }
    return {
      value: true,
      filter: filter,
    };
  } else if (filters?.length && quick_filter?.length) {
    let filter = [];
    for (let j = 0; j < filters?.length; j++) {
      if (filters?.[j]?.attribute === quick_filter?.[0]?.attribute) {
        if (
          (filters?.[j]?.columns?.length === 1 &&
            quick_filter?.[0]?.columns?.[0]?.name !=
              filters?.[j]?.columns?.[0]?.name) ||
          filters?.[j]?.columns?.length > 1
        ) {
          filter.push(filters?.[j]);
        }
      }
    }
    return {
      value: true,
      filter: filter,
    };
  } else return { value: false, filter: [] };
};
export const getFormattedBrandsForApi = (isBrandModified, brands) => {
  let brandsGroupName = [];
  let single_brands = [];
  if (!isBrandModified) {
    brandsGroupName =
      brands && brands?.[0]?.brand_list
        ? [
            {
              brand_group_name: brands?.[0]?.brand_group_name,
            },
          ]
        : single_brands?.push({
            brand_id:
              brands &&
              brands?.[0]?.brand_id &&
              (brands?.[0]?.brand_id
                ? brands?.[0]?.brand_id
                : brands?.[0]?.name),
            brand_name:
              brands && brands?.[0]?.brand_name && brands?.[0]?.brand_name,
          });
  } else {
    if (brands && brands?.[0]?.competitor) {
      single_brands.push({
        brand_id: brands?.[0]?.name,
        brand_name: brands?.[0]?.brand_name,
      });
    } else {
      brands &&
        brands?.forEach((el) => {
          if (el?.group || el?.brand_group_name) {
            brandsGroupName.push({
              brand_group_name: el?.brand_group_name,
            });
          }
        });

      brands?.forEach((el) => {
        if (!el?.group) {
          single_brands.push({
            brand_id: el?.brand_id ? el?.brand_id : el?.name,
            brand_name: el?.brand_name
              ? el?.brand_name
              : el?.brand_friendly_name,
          });
        }
      });
    }
  }
  return { brandsGroupName: brandsGroupName, single_brands: single_brands };
};
// export const getSimilarStaticFilterOld = (
//   hidden_filter,
//   comp_hidden_filter,
//   saved_filters,
//   quick_filter
// ) => {
//   if (
//     comp_hidden_filter?.length &&
//     hidden_filter?.length &&
//     saved_filters?.length
//   ) {
//     for (let i = 0; i < saved_filters?.length; i++) {
//       for (let j = 0; j < comp_hidden_filter?.length; j++) {
//         if (
//           saved_filters?.[i]?.attribute ===
//             comp_hidden_filter?.[j]?.attribute &&
//           comp_hidden_filter?.[j]?.attribute === hidden_filter?.[0]?.attribute
//         ) {
//           return {
//             value: true,
//             filter: [saved_filters?.[i], comp_hidden_filter?.[j]],
//           };
//         }
//       }
//     }
//   } else if (hidden_filter?.length && saved_filters?.length) {
//     for (let j = 0; j < saved_filters?.length; j++) {
//       if (saved_filters?.[j]?.attribute === hidden_filter?.[0]?.attribute) {
//         return { value: true, filter: [saved_filters?.[j]] };
//       }
//     }
//   } else if (quick_filter?.length && saved_filters?.length) {
//     for (let j = 0; j < saved_filters?.length; j++) {
//       if (saved_filters?.[j]?.attribute === quick_filter?.[0]?.attribute) {
//         return { value: true, filter: [saved_filters?.[j]] };
//       }
//     }
//   } else if (comp_hidden_filter?.length && hidden_filter?.length) {
//     for (let j = 0; j < comp_hidden_filter?.length; j++) {
//       if (
//         comp_hidden_filter?.[j]?.attribute === hidden_filter?.[0]?.attribute ||
//         saved_filters?.[j]?.attribute === quick_filter?.[0]?.attribute
//       ) {
//         return { value: true, filter: [comp_hidden_filter?.[j]] };
//       }
//     }
//   } else if (comp_hidden_filter?.length && saved_filters?.length) {
//     for (let i = 0; i < saved_filters?.length; i++) {
//       for (let j = 0; j < comp_hidden_filter?.length; j++) {
//         if (
//           saved_filters?.[i]?.attribute === comp_hidden_filter?.[j]?.attribute
//         ) {
//           return {
//             value: true,
//             filter: [saved_filters?.[i], comp_hidden_filter?.[j]],
//           };
//         }
//       }
//     }
//   }
//   return { value: false, filter: [] };
// };

export const getWindowLocationPath = () => {
  return window.location.pathname?.split("/")?.[1];
};

export const getUniqueBrandList = (brandList) => {
  let uniqueBrandIds = [];
  let uniqueBrandList = [];
  uniqueBrandList =
    brandList?.length > 0
      ? brandList?.filter((br, index) => {
          let isDuplicate = uniqueBrandIds?.includes(br?.brand_id);
          if (!isDuplicate) {
            uniqueBrandIds?.push(br?.brand_id);
            return true;
          } else {
            return false;
          }
        })
      : [];
  return uniqueBrandList;
};

export const formatDuration = (
  seconds = 0,
  timeStyle = "long",
  level = 6,
  separator = ","
) => {
  /*
    seconds : received value in seconds
    timeStyle : It's is defined style for info like : 'seconds','secs','s'
                It should be "long","medium" and "short"
    level : it is defined, how many levels used in final duration format
  */
  // Optimized code here
  if (!Number?.isInteger(seconds)) return seconds;
  if (
    seconds == null ||
    seconds == undefined ||
    seconds == "" ||
    seconds == "0"
  ) {
    return (
      "0" +
      (timeStyle === "short" ? "s" : timeStyle === "medium" ? "sec" : "second")
    );
  }
  let mobject = moment.duration(seconds, "seconds");
  const units =
    timeStyle === "short"
      ? [
          { label: "Y", duration: parseInt(mobject?.years()) },
          { label: "M", duration: parseInt(mobject?.months()) },
          { label: "D", duration: parseInt(mobject?.days()) },
          { label: "h", duration: parseInt(mobject?.hours()) },
          { label: "m", duration: parseInt(mobject?.minutes()) },
          { label: "s", duration: parseInt(mobject?.seconds()) },
        ]
      : timeStyle === "medium"
      ? [
          { label: "yr", duration: parseInt(mobject?.years()) },
          { label: "mon", duration: parseInt(mobject?.months()) },
          { label: "day", duration: parseInt(mobject?.days()) },
          { label: "hr", duration: parseInt(mobject?.hours()) },
          { label: "min", duration: parseInt(mobject?.minutes()) },
          { label: "sec", duration: parseInt(mobject?.seconds()) },
        ]
      : [
          { label: "year", duration: parseInt(mobject?.years()) },
          { label: "month", duration: parseInt(mobject?.months()) },
          { label: "day", duration: parseInt(mobject?.days()) },
          { label: "hour", duration: parseInt(mobject?.hours()) },
          { label: "minute", duration: parseInt(mobject?.minutes()) },
          { label: "second", duration: parseInt(mobject?.seconds()) },
        ];
  let durationArray = [];
  let finalDuration = "";
  let valueExists = false;
  for (let i = 0; i < units?.length; i++) {
    let unit = units[i]?.label;
    let value = units[i]?.duration;
    if (value == 0 && !valueExists) {
      continue;
    } else {
      valueExists = true;
    }

    if (
      !(
        value === 0 &&
        (unit?.startsWith("s") ||
          unit?.startsWith("sec") ||
          unit?.startsWith("second"))
      )
    ) {
      if (finalDuration) finalDuration += ", ";
      if (value > 1 && timeStyle !== "short") {
        unit += "s";
      }
      finalDuration += String(value) + "" + unit;
    }
  }

  durationArray = finalDuration?.split(",");
  let calLen = durationArray?.length;
  if (durationArray?.length > level) {
    calLen = level;
  }
  for (let i = calLen - 1; i >= 0; i--) {
    if (String(durationArray[i])?.trim()?.startsWith("0")) {
      calLen = i;
      continue;
    }
    break;
  }
  durationArray.length = calLen;
  finalDuration = durationArray?.join(separator);

  return finalDuration;
};

export const formatQuickFilters = (data) => {
  let ids = data?.split("&");
  const details = ids?.map((id) => {
    const obj = {
      name: id?.toString(),
      type: "include",
    };
    return obj;
  });
  return details;
};

export const getUpdatedDataSourceForExcel = (
  dataSource,
  graphConditionConfig
) => {
  let updatedDataSource = [];
  updatedDataSource = dataSource?.map((d) => {
    let obj = { ...d };
    Object.entries(d)?.map((n) => {
      if (n[0] === "Review Ratings" || n[0] === "Ratings") {
        n[1] = n[1] + " ⭐";
        obj[n[0]] = n[1];
        return n;
      } else if (n[1]?.value >= 0) {
        if (n[1]?.percent_change) {
          n[1] = n[1]?.value + " / " + n[1]?.percent_change + "%";
        } else if (n[1]?.percent_change === 0) {
          n[1] = n[1]?.value + " / " + "NA";
        } else if (!n[1]?.percent_change) {
          n[1] = n[1]?.value;
        }
        obj[n[0]] = n[1];
        return n;
      } else if (
        typeof n[1] === "string" &&
        (n[1]?.includes("|$|") ||
          n[1]?.includes("|G|") ||
          n[1]?.includes("|C|"))
      ) {
        let channelImage = n[1]?.split("|$|")?.[0]?.trim();
        let ProfileName = n[1]?.split("|$|")?.[1]?.trim();
        let genderName = n[1]?.split("|G|")?.[1]?.trim();
        let countryName = n[1]?.split("|C|")?.[1]?.trim();
        n[1] =
          n[1]?.includes("|$|") && channelImage !== ProfileName
            ? `${channelImage} | ${ProfileName}`
            : n[1]?.includes("|$|")
            ? `${ProfileName}`
            : n[1]?.includes("|G|")
            ? `${genderName}`
            : n[1]?.includes("|C|")
            ? `${countryName}`
            : n[1];
        obj[n[0]] = n[1];
      } else {
        return n;
      }
    });
    return obj;
  });
  return updatedDataSource;
};
export const getRadiusAttributeValue = (
  graphConditions,
  chart_type,
  axis_attribute
) => {
  let radiusAttributeValue =
    graphConditions?.[chart_type]?.order_by?.include &&
    graphConditions?.[chart_type]?.order_by?.include?.length > 0
      ? graphConditions?.[chart_type]?.order_by?.exclude?.[
          axis_attribute?.toLowerCase()
        ]
        ? !graphConditions?.[chart_type]?.order_by?.exclude?.[
            axis_attribute?.toLowerCase()
          ]
          ? graphConditions?.[chart_type]?.order_by?.include?.find(
              (attr) =>
                !graphConditions?.[chart_type]?.order_by?.exclude?.[
                  axis_attribute?.toLowerCase()
                ]?.includes(attr?.value)
            )
          : graphConditions?.[chart_type]?.order_by?.include?.[0]?.value
        : graphConditions?.[chart_type]?.order_by?.include?.[0]?.value
      : null;
  return radiusAttributeValue;
};

export const getExcludedWords = (all, active) => {
  let result = [];
  function processGroupArray(array) {
    array.forEach((item) => {
      let brandGroup = all.find((group) => group.brand_group === item);
      if (brandGroup) {
        brandGroup.excluded_word?.forEach((word) => {
          result.push({ name: brandGroup.brand_group, value: word });
        });
      }
    });
  }

  function processBrandArray(array) {
    array.forEach((item) => {
      let brandGroup = all.find((group) => +group.brand_id === item.brand_id);
      if (brandGroup) {
        brandGroup.excluded_word?.forEach((word) => {
          result.push({
            brand_id: brandGroup.brand_id,
            value: word,
            name: brandGroup?.brand_friendly_name || brandGroup?.brand_name,
          });
        });
      }
    });
  }

  if (active?.groups?.length > 0) {
    processGroupArray(active.groups);
  } else if (active?.brands?.length > 0) {
    processBrandArray(active.brands);
  }
  return result;
};

// export const separateBrandGroups = (activeGroupOrBrand) => {
//   let groupOrBrands = {
//     groups: [],
//     brands: [],
//   };
//   if (activeGroupOrBrand?.length > 0) {
//     activeGroupOrBrand.forEach((element) => {
//       if (element.group) {
//         groupOrBrands.groups.push(element.brand_friendly_name);
//       } else {
//         groupOrBrands.brands.push({
//           brand_id: element.name,
//           brand_name: element.brand_friendly_name,
//         });
//       }
//     });
//   }
//   return groupOrBrands;
// };

export const getTextWithWrapHtml = (
  text = "",
  cssClassForText = "",
  highlightWord = ""
) => {
  // const regex = /([#@][a-z0-9_$&+,:;=?@|'<>.-^*()%!]*)/gi;
  // const parts = text?.split(regex);

  // Dynamically create the regex pattern to match both @ or # words and the specific highlight word
  // Construct a regex to match hashtags, mentions, and the exact phrase for highlightWord only if it’s provided
  const regex = new RegExp(
    `([#@][a-z0-9_$&+,:;=?@|'<>.-^*()%!]+${
      highlightWord ? `|${highlightWord}` : ""
    })`,
    "gi"
  );
  const parts = text?.split(regex);
  return (
    <span className={cssClassForText}>
      {parts?.map((part, index) => {
        if (part?.match(regex)) {
          // Apply a different class if it matches the highlight word exactly
          const isHighlightWord =
            highlightWord &&
            part?.toLowerCase() === highlightWord?.toLowerCase();
          return (
            <span
              key={index}
              className={
                isHighlightWord
                  ? "highlight-keyword-text"
                  : "text-color-primary"
              }
            >
              {part}
            </span>
          );
        } else {
          return part;
        }
      })}
    </span>
  );
};
export const isScontentLinkExpire = (mediaUrl, channelType) => {
  let isExpired = false;
  try {
    if (
      mediaUrl &&
      mediaUrl.indexOf("s3.amazonaws") == -1 &&
      mediaUrl.indexOf("images.locobuzz.com") == -1
    ) {
      const tokens = mediaUrl.split("&");
      const HexDecimalCode = tokens.filter((x) => x.includes("oe="));
      if (
        HexDecimalCode != null &&
        HexDecimalCode.length > 0 &&
        HexDecimalCode[0].startsWith("oe=")
      ) {
        let DecimalEpoch = 0;
        if (HexDecimalCode.length > 0) {
          const HexDecimalTime = HexDecimalCode[0].replace("oe=", "");
          DecimalEpoch = parseInt(HexDecimalTime, 16);
        }
        // DateTimeOffset.Now.ToUnixTimeSeconds()
        if (moment().unix() > DecimalEpoch && DecimalEpoch > 0) {
          isExpired = true;
        }
      }
    }
  } catch (exception) {
    return false;
  }

  return isExpired;
};

export const getPinnedTemplateDetails = (filterTemplates, pinnedFiltersIds) => {
  const pinnedTemplateDetails = filterTemplates?.filter((item) => {
    return pinnedFiltersIds?.includes(item?.filter_template_id);
  });

  return pinnedTemplateDetails;
};

export const isDeepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  )
    return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !isDeepEqual(obj1[key], obj2[key]))
      return false;
  }

  return true;
};

// Function to check if saved array is a subset of filters array
export const isSubset = (filters, saved) => {
  return saved.every((savedItem) =>
    filters.some((filterItem) => isDeepEqual(filterItem, savedItem))
  );
};

export const isObjectEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// export const isSubsett = (subset, set) => {
//   return subset.every((subItem) =>
//     set.some((setItem) => isObjectEqual(subItem, setItem))
//   );
// };

export const updateFilters = (filters, saved) => {
  if (isSubset(filters, saved)) {
    // Remove saved items from filters
    filters = filters.filter(
      (filterItem) =>
        !saved.some((savedItem) => isDeepEqual(filterItem, savedItem))
    );
  } else {
    // Add saved items to filters
    filters = [...filters, ...saved];
  }
  return filters;
};

export const removeHiddenFromSaved = (saved, hidden) => {
  // Create a set to track indices to remove
  const indicesToRemove = new Set();

  hidden.forEach((hiddenItem) => {
    saved.forEach((savedItem, savedIndex) => {
      if (savedItem?.attribute === hiddenItem?.attribute) {
        if (hiddenItem?.attribute === "followerscount") {
          // Compare columns for 'followerscount'
          if (
            savedItem?.columns?.from === hiddenItem?.columns?.from &&
            savedItem?.columns?.to === hiddenItem?.columns?.to
          ) {
            indicesToRemove.add(savedIndex);
          }
        } else if (hiddenItem?.attribute === "bio") {
          let matchFound = hiddenItem?.columns?.every((hiddenColumn) => {
            return savedItem?.columns?.some(
              (savedColumn) =>
                JSON.stringify(savedColumn.name) ===
                  JSON.stringify(hiddenColumn.name) &&
                savedColumn.type === hiddenColumn.type
            );
          });

          if (matchFound) {
            indicesToRemove.add(savedIndex);
          }
        } else if (hiddenItem?.attribute === "simplifiedtext") {
          let matchFound = hiddenItem?.columns?.every((hiddenColumn) => {
            return savedItem?.columns?.some(
              (savedColumn) =>
                JSON.stringify(savedColumn.name) ===
                  JSON.stringify(hiddenColumn.name) &&
                savedColumn.type === hiddenColumn.type
            );
          });

          if (matchFound) {
            indicesToRemove.add(savedIndex);
          }
        } else {
          // Handle other attributes
          let columnsToRemove = [];
          if (Array.isArray(hiddenItem?.columns)) {
            hiddenItem?.columns.forEach((hiddenColumn) => {
              const columnIndex = savedItem?.columns?.findIndex(
                (savedColumn) =>
                  savedColumn?.name === hiddenColumn?.name &&
                  savedColumn.type === hiddenColumn.type
              );
              if (columnIndex > -1) {
                columnsToRemove.push(columnIndex);
              }
            });
          }

          // Remove matched columns
          if (columnsToRemove.length > 0) {
            columnsToRemove
              .sort((a, b) => b - a)
              .forEach((index) => savedItem?.columns?.splice(index, 1));

            // If no columns are left, mark the whole object for removal
            if (savedItem?.columns?.length === 0) {
              indicesToRemove.add(savedIndex);
            }
          }
        }
      }
    });
  });

  // Remove items from saved array based on indices
  saved = saved.filter((_, index) => !indicesToRemove.has(index));

  return saved;
};

export const mergeArrays = (arr1, arr2) => {
  const mergedArray = [...arr1];

  arr2.forEach((item2) => {
    const index = mergedArray.findIndex(
      (item1) => item1.attribute === item2.attribute
    );

    if (item2.attribute === "followerscount") {
      const followersIndex = mergedArray.findIndex(
        (item) => item.attribute === "followerscount"
      );
      if (followersIndex > -1) {
        // Check if the existing item is the same as the new item
        const existingItem = mergedArray[followersIndex];
        if (
          JSON.stringify(existingItem.columns) !== JSON.stringify(item2.columns)
        ) {
          mergedArray.push(item2);
        }
      } else {
        mergedArray.push(item2);
      }
    } else if (item2.attribute === "bio") {
      const bioIndex = mergedArray.findIndex(
        (item) => item.attribute === "bio"
      );
      if (bioIndex > -1) {
        const existingBio = mergedArray[bioIndex];
        const match = existingBio.columns.every(
          (col1, index) =>
            JSON.stringify(col1.name) ===
              JSON.stringify(item2.columns[index]?.name) &&
            col1.type === item2.columns[index]?.type
        );
        if (!match) {
          mergedArray.push(item2);
        }
      } else {
        mergedArray.push(item2);
      }
    } else if (item2.attribute === "simplifiedtext") {
      const bioIndex = mergedArray.findIndex(
        (item) => item.attribute === "simplifiedtext"
      );
      if (bioIndex > -1) {
        const existingBio = mergedArray[bioIndex];
        const match = existingBio.columns.every(
          (col1, index) =>
            JSON.stringify(col1.name) ===
              JSON.stringify(item2.columns[index]?.name) &&
            col1.type === item2.columns[index]?.type
        );
        if (!match) {
          mergedArray.push(item2);
        }
      } else {
        mergedArray.push(item2);
      }
    } else if (index > -1) {
      const mergedColumns = [...mergedArray[index].columns];

      item2.columns.forEach((column2) => {
        const exists = mergedColumns.some(
          (column1) =>
            column1.name === column2.name && column1.type === column2.type
        );

        if (!exists) {
          mergedColumns.push(column2);
        }
      });

      mergedArray[index].columns = mergedColumns;
    } else {
      mergedArray.push(item2);
    }
  });

  return mergedArray;
};

export const isSameFilterDiffTypes = (filtersA, filtersB) => {
  for (const filterB of filtersB) {
    const filterA = filtersA.find(
      (filter) => filter.attribute === filterB.attribute
    );
    try {
      if (filterA) {
        if (
          filterB.attribute === "followerscount" &&
          filterA.attribute === "followerscount"
        ) {
          return true;
        } else if (filterB.attribute === "bio" && filterA.attribute === "bio") {
          return true;
        } else if (
          filterB.attribute === "simplifiedtext" &&
          filterA.attribute === "simplifiedtext"
        ) {
          return true;
        } else {
          for (const columnB of filterB.columns) {
            const columnA = filterA.columns.find(
              (column) => column.name === columnB.name
            );
            if (columnA && columnA.type !== columnB.type) {
              return true;
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return false;
};
// If magnitude value in positive then it will calculate lighter color
// else calculate darker color
const calculateNewShadeOfColor = (hexColor, magnitude) => {
  hexColor = hexColor?.replace(`#`, ``);
  if (hexColor?.length < 6) {
    for (let i = hexColor?.length; i < 6; i++) {
      hexColor += "0";
    }
  }
  if (hexColor?.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return "#" + hexColor;
  }
};
export const newColorShadeInHex6 = (hexColor, magnitude) => {
  let newColor = calculateNewShadeOfColor(hexColor, magnitude);
  newColor = newColor?.replace(`#`, ``);
  if (newColor?.length < 6) {
    for (let i = newColor?.length; i < 6; i++) {
      newColor += "0";
    }
  }
  return "#" + newColor;
};
export const hexToGrayscale = (hex) => {
  // Remove the leading # if present
  hex = hex.replace(/^#/, "");

  // Convert hex to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance (simple average method)
  let luminance = Math.round((r + g + b) / 3);

  // Convert luminance to hex
  let grayscale = luminance.toString(16).padStart(2, "0");

  // Return the grayscale color in hex format
  return `#${grayscale}${grayscale}${grayscale}`;
};

export const createCommaSeparatedTags = (tags) => {
  let tagsArr = tags;
  let newTags = [];

  tagsArr?.forEach((item) => {
    if (item.includes(",")) {
      const splitItems = item?.split(",");
      splitItems?.forEach((splitItem) => {
        newTags.push(splitItem?.trim());
      });
    } else {
      newTags.push(item);
    }
  });

  while (newTags?.length > 0 && newTags[newTags.length - 1]?.trim() == "") {
    newTags.pop();
  }

  return newTags;
};
export const generateTimeOptions = () => {
  const times = [];
  let hour = 1;
  let minute = 0;

  while (hour <= 23 || minute <= 30) {
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMinute = minute === 0 ? "00" : "30";
    times.push(`${displayHour}:${displayMinute} ${ampm}`);

    if (minute === 30) {
      hour += 1;
      minute = 0;
    } else {
      minute = 30;
    }

    if (hour === 24) break;
  }
  return times;
};

export const countriesList = [
  {
    name: "Afghanistan",
    code: "AF",
    dialCode: "+93",
    flag: "https://flagcdn.com/w320/af.png",
  },
  {
    name: "Albania",
    code: "AL",
    dialCode: "+355",
    flag: "https://flagcdn.com/w320/al.png",
  },
  {
    name: "Algeria",
    code: "DZ",
    dialCode: "+213",
    flag: "https://flagcdn.com/w320/dz.png",
  },
  {
    name: "Andorra",
    code: "AD",
    dialCode: "+376",
    flag: "https://flagcdn.com/w320/ad.png",
  },
  {
    name: "Angola",
    code: "AO",
    dialCode: "+244",
    flag: "https://flagcdn.com/w320/ao.png",
  },
  {
    name: "Argentina",
    code: "AR",
    dialCode: "+54",
    flag: "https://flagcdn.com/w320/ar.png",
  },
  {
    name: "Armenia",
    code: "AM",
    dialCode: "+374",
    flag: "https://flagcdn.com/w320/am.png",
  },
  {
    name: "Australia",
    code: "AU",
    dialCode: "+61",
    flag: "https://flagcdn.com/w320/au.png",
  },
  {
    name: "Austria",
    code: "AT",
    dialCode: "+43",
    flag: "https://flagcdn.com/w320/at.png",
  },
  {
    name: "Bangladesh",
    code: "BD",
    dialCode: "+880",
    flag: "https://flagcdn.com/w320/bd.png",
  },
  {
    name: "Belgium",
    code: "BE",
    dialCode: "+32",
    flag: "https://flagcdn.com/w320/be.png",
  },
  {
    name: "Brazil",
    code: "BR",
    dialCode: "+55",
    flag: "https://flagcdn.com/w320/br.png",
  },
  {
    name: "Canada",
    code: "CA",
    dialCode: "+1",
    flag: "https://flagcdn.com/w320/ca.png",
  },
  {
    name: "China",
    code: "CN",
    dialCode: "+86",
    flag: "https://flagcdn.com/w320/cn.png",
  },
  {
    name: "Colombia",
    code: "CO",
    dialCode: "+57",
    flag: "https://flagcdn.com/w320/co.png",
  },
  {
    name: "Czechia",
    code: "CZ",
    dialCode: "+420",
    flag: "https://flagcdn.com/w320/cz.png",
  },
  {
    name: "Denmark",
    code: "DK",
    dialCode: "+45",
    flag: "https://flagcdn.com/w320/dk.png",
  },
  {
    name: "Egypt",
    code: "EG",
    dialCode: "+20",
    flag: "https://flagcdn.com/w320/eg.png",
  },
  {
    name: "Finland",
    code: "FI",
    dialCode: "+358",
    flag: "https://flagcdn.com/w320/fi.png",
  },
  {
    name: "France",
    code: "FR",
    dialCode: "+33",
    flag: "https://flagcdn.com/w320/fr.png",
  },
  {
    name: "Germany",
    code: "DE",
    dialCode: "+49",
    flag: "https://flagcdn.com/w320/de.png",
  },
  {
    name: "India",
    code: "IN",
    dialCode: "+91",
    flag: "https://flagcdn.com/w320/in.png",
  },
  {
    name: "Indonesia",
    code: "ID",
    dialCode: "+62",
    flag: "https://flagcdn.com/w320/id.png",
  },
  {
    name: "Italy",
    code: "IT",
    dialCode: "+39",
    flag: "https://flagcdn.com/w320/it.png",
  },
  {
    name: "Japan",
    code: "JP",
    dialCode: "+81",
    flag: "https://flagcdn.com/w320/jp.png",
  },
  {
    name: "Malaysia",
    code: "MY",
    dialCode: "+60",
    flag: "https://flagcdn.com/w320/my.png",
  },
  {
    name: "Mexico",
    code: "MX",
    dialCode: "+52",
    flag: "https://flagcdn.com/w320/mx.png",
  },
  {
    name: "Netherlands",
    code: "NL",
    dialCode: "+31",
    flag: "https://flagcdn.com/w320/nl.png",
  },
  {
    name: "New Zealand",
    code: "NZ",
    dialCode: "+64",
    flag: "https://flagcdn.com/w320/nz.png",
  },
  {
    name: "Norway",
    code: "NO",
    dialCode: "+47",
    flag: "https://flagcdn.com/w320/no.png",
  },
  {
    name: "Pakistan",
    code: "PK",
    dialCode: "+92",
    flag: "https://flagcdn.com/w320/pk.png",
  },
  {
    name: "Philippines",
    code: "PH",
    dialCode: "+63",
    flag: "https://flagcdn.com/w320/ph.png",
  },
  {
    name: "Poland",
    code: "PL",
    dialCode: "+48",
    flag: "https://flagcdn.com/w320/pl.png",
  },
  {
    name: "Portugal",
    code: "PT",
    dialCode: "+351",
    flag: "https://flagcdn.com/w320/pt.png",
  },
  {
    name: "Russia",
    code: "RU",
    dialCode: "+7",
    flag: "https://flagcdn.com/w320/ru.png",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    dialCode: "+966",
    flag: "https://flagcdn.com/w320/sa.png",
  },
  {
    name: "Singapore",
    code: "SG",
    dialCode: "+65",
    flag: "https://flagcdn.com/w320/sg.png",
  },
  {
    name: "South Africa",
    code: "ZA",
    dialCode: "+27",
    flag: "https://flagcdn.com/w320/za.png",
  },
  {
    name: "Spain",
    code: "ES",
    dialCode: "+34",
    flag: "https://flagcdn.com/w320/es.png",
  },
  {
    name: "Sweden",
    code: "SE",
    dialCode: "+46",
    flag: "https://flagcdn.com/w320/se.png",
  },
  {
    name: "Switzerland",
    code: "CH",
    dialCode: "+41",
    flag: "https://flagcdn.com/w320/ch.png",
  },
  {
    name: "Thailand",
    code: "TH",
    dialCode: "+66",
    flag: "https://flagcdn.com/w320/th.png",
  },
  {
    name: "Turkey",
    code: "TR",
    dialCode: "+90",
    flag: "https://flagcdn.com/w320/tr.png",
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "+44",
    flag: "https://flagcdn.com/w320/gb.png",
  },
  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: "https://flagcdn.com/w320/us.png",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    dialCode: "+971",
    flag: "https://flagcdn.com/w320/ae.png",
  },
  {
    name: "Vietnam",
    code: "VN",
    dialCode: "+84",
    flag: "https://flagcdn.com/w320/vn.png",
  },
];

export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) {
    errors.push("At least 8 characters.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Contain at least one lowercase letter.");
  }
  if (!/\d/.test(password)) {
    errors.push("Contain at least one number.");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Contain at least one special character.");
  }
  return errors;
};

export const showToast = (message, type = "info") => {
  let container = document.querySelector(".toast-container");

  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const text = document.createElement("span");
  text.innerText = message;

  const closeBtn = document.createElement("span");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => {
    toast.remove();
  };

  toast.appendChild(text);
  toast.appendChild(closeBtn);
  container.appendChild(toast);

  // Auto-dismiss after 4s
  setTimeout(() => {
    toast.remove();
  }, 4000);
};

export const parseAttachmentsXMLToElements = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  const items = xmlDoc.getElementsByTagName("Item");

  const elements = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const mediaType = item.getElementsByTagName("MediaType")[0]?.textContent;
    const url = item.getElementsByTagName("ThumbUrl")[0]?.textContent;

    if (!url) continue;

    const isLink = mediaType === "4";
    const containerStyle = `
      margin-right: 10px;
      margin-bottom: 10px;
      width: ${isLink ? "auto" : "100px"};
      height: ${isLink ? "auto" : "70px"};
      overflow: hidden;
      border-radius: 8px;
      display: inline-block;
    `;

    let innerElement = "";

    if (mediaType === "2") {
      innerElement = `
        <img src="${url}" alt="attachment-image-${i}" 
             style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />
      `;
    } else if (mediaType === "3") {
      innerElement = `
        <video controls 
           style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; pointer-events: none;">
          <source src="${url}" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      `;
    } else if (mediaType === "4") {
      innerElement = `
        <a href="${url}" target="_blank" rel="noopener noreferrer" 
          style="color: #1890ff; text-decoration: underline; white-space: nowrap; display: inline-block; overflow: hidden; text-overflow: ellipsis; max-width: 550px;">
          ${url}
        </a>
  `;
    } else {
      innerElement = `<a href="${url}" target="_blank">Download Attachment</a>`;
    }

    elements.push(`
      <div style="${containerStyle}">
        ${innerElement}
      </div>
    `);
  }

  return elements;
};

export const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now - time;

  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffMins < 60) {
    return `${diffMins}min`;
  } else if (diffDays < 7) {
    return `${diffDays}d`;
  } else {
    return `${diffWeeks}W`;
  }
};
