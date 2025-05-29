import { Excel } from "antd-table-saveas-excel";
import moment from "moment";
import {
  getDefaultDuration,
  getPaneIndex,
  getWindowLocationPath,
  kFormatter,
} from "../../../../redux/constants";
import { setHighchartWordCloudShape } from "./highcharts.options";
import { useDispatch as dispatch } from "react-redux";
import { set_WM_DeepDive } from "../../../../redux/actions/WidgetMaker/WidgetMaker";
import { getCustomizedDate } from "../../../../redux/constants";
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
const newColorShadeInHex6 = (hexColor, magnitude) => {
  let newColor = calculateNewShadeOfColor(hexColor, magnitude);
  newColor = newColor?.replace(`#`, ``);
  if (newColor?.length < 6) {
    for (let i = newColor?.length; i < 6; i++) {
      newColor += "0";
    }
  }
  return "#" + newColor;
};
const globalChartColor = [
  "#6060FF",
  "#9D48FF",
  "#FF00FF",
  "#DFAAAA",
  "#29CFCF",
  "#FF7D6C",
  "#FF7D6C",
  "#CD97FF",
  "#FFD58B",
  "#75FF75",
  "#FFC0CB",
  "#C66060",
  "#A5A5DC",
  "#00A669",
  "#00A669",
  "#9898FF",
  "#EEEE52",
  "#FF83F7",
  "#3FE7AC",
  "#B600AA",
  "#39A7E4",
  "#6600DA",
  "#FFB940",
  "#FF4040",
  "#24E224",
  "#FFDB4D",
  "#CE9ECE",
  "#1C9F00",
  "#FFC1B9",
  "#FF9C73",
  "#5656B2",
  "#FF6E31",
  "#9FE9E9",
];
const getPointCategoryName = (point, dimension) => {
  var series = point?.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis?.categories[point[isY ? "y" : "x"]];
};
const getTotalCount = (array) => {
  let totalCount = 0;
  array?.forEach((data) => {
    totalCount = totalCount + data;
  });
  return totalCount;
};
function formatInCommaSeprated(num) {
  return ("" + num)?.replace(
    /(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g,
    function (m, s1, s2) {
      return s2 || s1 + ",";
    }
  );
}
const handleDeepDive = (event) => {
  dispatch(set_WM_DeepDive(true));
  alert("hello");
};

const getNumericFormatterLabel = (value) => {
  let numeric = ["K", "M", "G", "T", "P", "E"],
    i = numeric?.length,
    undefined,
    ret;
  while (i-- && ret === undefined) {
    let multi = Math.pow(1000, i + 1);
    if (value >= multi && numeric[i] !== null) {
      //ret = Highcharts.numberFormat(this.y / multi, -1) + numeric[i];
      ret = Math.floor(value / multi) + numeric[i];
    }
  }
  if (ret == undefined) ret = value;
  return ret;
};

export const SecondstoHumanReadable = (seconds, inShortForm, level) => {
  if (
    seconds == null ||
    seconds == undefined ||
    seconds == "" ||
    seconds == "0"
  ) {
    seconds = 0;
  }
  var mobject = moment.duration(seconds, "seconds");
  let asYears = parseInt(mobject?.years());
  let asMonth = parseInt(mobject?.asMonths());
  let asDays = parseInt(mobject?.asDays());
  let final_duration;
  let duration_array = [];
  //var asHours = parseInt(mobject.asHours());
  //var asMinutes = parseInt(mobject.asMinutes());
  //var asSeconds = parseInt(mobject.asSeconds());
  if (!inShortForm) {
    if (asYears > 0) {
      final_duration =
        asYears +
        (asYears > 1 ? " Years, " : " Year, ") +
        mobject?.months() +
        (mobject?.months() > 1 ? " months, " : " month, ") +
        mobject?.days() +
        (mobject?.days() > 1 ? " days, " : " day, ") +
        mobject?.hours() +
        (mobject?.hours() > 1 ? " hrs, " : " hr, ") +
        mobject?.minutes() +
        (mobject?.minutes() > 1 ? " mins, " : " min, ") +
        mobject?.seconds() +
        (mobject?.seconds() > 1 ? " secs" : " sec");
    } else if (asMonth > 0) {
      final_duration =
        asMonth +
        (asMonth > 1 ? " Months, " : " Month, ") +
        mobject?.days() +
        (mobject?.days() > 1 ? " days, " : " day, ") +
        mobject?.hours() +
        (mobject?.hours() > 1 ? " hrs, " : " hr, ") +
        mobject?.minutes() +
        (mobject?.minutes() > 1 ? " mins, " : " min, ") +
        mobject?.seconds() +
        (mobject?.seconds() > 1 ? " secs" : " sec");
    } else if (asDays > 0) {
      final_duration =
        asDays +
        (asDays > 1 ? " Days, " : " Day, ") +
        mobject?.hours() +
        (mobject?.hours() > 1 ? " hrs, " : " hr, ") +
        mobject?.minutes() +
        (mobject?.minutes() > 1 ? " mins, " : " min, ") +
        mobject?.seconds() +
        (mobject?.seconds() > 1 ? " secs" : " sec");
    } else if (mobject.hours() > 0) {
      final_duration =
        mobject?.hours() +
        (mobject?.hours() > 1 ? " hrs, " : " hr, ") +
        mobject?.minutes() +
        (mobject?.minutes() > 1 ? " mins, " : " min, ") +
        mobject?.seconds() +
        (mobject?.seconds() > 1 ? " secs" : " sec");

      //mobject.hours + " hrs, " + mobject.minutes + " mins, " + mobject.seconds + " sec";
    } else if (mobject?.minutes() > 0) {
      final_duration =
        mobject?.minutes() +
        (mobject?.minutes() > 1 ? " mins, " : " min, ") +
        mobject?.seconds() +
        (mobject?.seconds() > 1 ? " secs" : " sec");

      //mobject.minutes + " mins, " + mobject.seconds + " sec";
    } else if (mobject?.seconds() > 0) {
      if (mobject?.seconds() > 1) {
        final_duration = mobject?.seconds() + " secs";
      } else {
        final_duration = mobject?.seconds() + " sec";
      }
    } else {
      final_duration = "0 sec";
    }
    if (level) duration_array = final_duration?.split(",");
    if (duration_array?.length > level) {
      duration_array.length = level;
      final_duration = duration_array?.join();
    }

    return final_duration;
  } else {
    if (asYears > 0) {
      return (
        asYears + "Y, " + mobject?.months() + "M, " + mobject?.days() + "D"
      );
    } else if (asMonth > 0) {
      return asMonth + "M, " + mobject?.days() + "D, " + mobject?.hours() + "H";
    } else if (asDays > 0) {
      return (
        asDays + "D, " + mobject?.hours() + "H, " + mobject?.minutes() + "m"
      );
    } else if (mobject?.hours() > 0) {
      return (
        mobject?.hours() +
        "H, " +
        mobject?.minutes() +
        "m, " +
        mobject?.seconds() +
        "s"
      ); //mobject.hours + " hrs, " + mobject.minutes + " mins, " + mobject.seconds + " sec";
    } else if (mobject?.minutes() > 0) {
      return mobject?.minutes() + "m, " + mobject?.seconds() + "s"; //mobject.minutes + " mins, " + mobject.seconds + " sec";
    } else if (mobject?.seconds() > 0) {
      if (mobject?.seconds() > 1) {
        return mobject?.seconds() + " s";
      } else {
        return mobject?.seconds() + " s";
      }
    } else {
      return "0 s";
    }
  }
};

const handleDateFormat = (
  panes,
  index,
  section_index,
  widget_index,
  metadata,
  metadata_xaxis,
  xaxis,
  metadata_date_part,
  single,
  section,
  template_widget,
  shareTemplateData,
  pdfStatus,
  isScheduleReportOpen,
  screen,
  templateDetails
) => {
  let dateFormat;
  if (panes?.[index]?.is_widget_maker_open_obj?.open_flag) {
    dateFormat = metadata?.x_axis?.date_part
      ? metadata?.x_axis?.date_part
      : metadata?.x_axis?.date_aggregation;
  } else if (isScheduleReportOpen) {
    dateFormat = metadata?.x_axis?.date_part
      ? metadata?.x_axis?.date_part
      : metadata?.x_axis?.date_aggregation;
  } else if (pdfStatus) {
    dateFormat = metadata?.x_axis?.date_part
      ? metadata?.x_axis?.date_part
      : metadata?.x_axis?.date_aggregation;
  } else if (template_widget) {
    if (section_index >= 0) {
      dateFormat =
        section &&
        section[section_index]?.data &&
        section[section_index]?.data[widget_index]?.x_axis?.date_aggregation;
    } else {
      dateFormat =
        section &&
        section[0]?.data &&
        section[0]?.data[widget_index]?.x_axis?.date_aggregation;
    }
  } else if (shareTemplateData) {
    if (section_index >= 0) {
      dateFormat =
        shareTemplateData?.sections &&
        shareTemplateData?.sections[section_index]?.widgets &&
        shareTemplateData?.sections[section_index]?.widgets[widget_index]
          ?.x_axis?.date_aggregation;
    } else {
      dateFormat =
        shareTemplateData?.section &&
        shareTemplateData?.section[0]?.widgets &&
        shareTemplateData?.section[0]?.widgets[widget_index]?.x_axis
          ?.date_aggregation;
    }
  } else {
    if (
      (window.location.pathname.split("/")?.[1] === "dashboard" ||
        window.location.pathname.split("/")?.[1] === "pin-dashboard") &&
      section_index >= 0
    ) {
      dateFormat =
        panes[index]?.sections &&
        panes[index]?.sections[section_index]?.widgets &&
        panes[index]?.sections[section_index]?.widgets[widget_index]?.x_axis
          ?.date_aggregation;
    } else if (
      (window.location.pathname.split("/")?.[1] === "dashboard" ||
        window.location.pathname.split("/")?.[1] === "pin-dashboard") &&
      panes?.[index]?.section
    ) {
      dateFormat =
        panes[index]?.section &&
        panes[index]?.section[0]?.widgets &&
        panes[index]?.section[0]?.widgets[widget_index]?.x_axis
          ?.date_aggregation;
    } else if (
      getWindowLocationPath()?.toLowerCase() === "CommandCenter"?.toLowerCase()
    ) {
      dateFormat =
        screen &&
        screen?.widgets &&
        screen?.widgets[widget_index]?.x_axis?.date_aggregation;
    }
  }
  let finalData;
  if (
    dateFormat === "1h" ||
    dateFormat === "2h" ||
    dateFormat === "3h" ||
    dateFormat === "4h" ||
    dateFormat === "6h" ||
    dateFormat === "8h" ||
    dateFormat === "12h"
  ) {
    let defaultDuration = getDefaultDuration();
    let todayDuration =
      getWindowLocationPath()?.toLowerCase() === "CommandCenter"?.toLowerCase()
        ? screen?.duration
        : shareTemplateData
        ? shareTemplateData?.duration
          ? shareTemplateData?.duration
          : shareTemplateData?.start_date && shareTemplateData?.end_date
          ? {
              from: shareTemplateData?.start_date,
              to: shareTemplateData?.end_date,
            }
          : null
        : template_widget
        ? templateDetails?.templateDuration
          ? templateDetails?.templateDuration
          : defaultDuration
        : panes?.[index]?.duration;
    let todaysDate = moment(todayDuration?.from).isSame(
      todayDuration?.to,
      "day"
    );
    if (todaysDate) {
      finalData = single?.map((e) => moment(e)?.format("HH:mm"));
    } else {
      finalData = single?.map((e) => moment(e)?.format("MMM DD YYYY H:mm"));
    }
  } else if (dateFormat === "D") {
    finalData = single?.map((e) => moment(e)?.format("MMM DD YYYY"));
  } else if (
    dateFormat == "ww" ||
    dateFormat == "M" ||
    dateFormat == "hh" ||
    dateFormat == "dd" ||
    dateFormat == "dw" ||
    dateFormat == "mm" ||
    dateFormat == "qq" ||
    dateFormat == "Y" ||
    [
      5,
      10,
      15,
      30,
      60,
      2 * 60,
      4 * 60,
      8 * 60,
      16 * 60,
      24 * 60,
      48 * 60,
    ]?.includes(dateFormat)
  ) {
    finalData = single?.map((e) => e);
  } else {
    finalData = single?.map((e) => moment(e).format("MMM DD YYYY"));
  }
  return finalData;
};

export const getHeat = (graphObject, authParams) => {
  let date_check = moment(
    graphObject?.single && graphObject?.single[0]?.x[0]
  ).isValid();
  const obj = {
    chart: {
      height: graphObject?.style.height,
      type: "heatmap",
      // marginTop: 40,
      // marginBottom: 80,
      plotBorderWidth: 1,
      reflow: true,
      style: {
        fontFamily: '"Roboto", sans-serif',
        color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
      },
    },

    title: {
      text: null,
    },

    xAxis: {
      categories: graphObject?.single[0]?.x,
      title: {
        text: graphObject?.xaxis,
        //enabled:true,
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      labels: {
        formatter: function () {
          return date_check || graphObject?.pdfDownloadStatus
            ? this.value
            : this.value.length > 12 && this.axis?.max + 1 > 5
            ? this.value?.slice(0, 12) + (this.value?.length > 12 ? "..." : "")
            : this.value;
        },
        rotation: graphObject?.single[0]?.x?.length > 5 ? -45 : 0,
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      tickWidth: 1,
      tickmarkPlacement: "on",
    },

    yAxis: {
      min: undefined,
      title: {
        text: graphObject?.yaxis,
        //enabled:true
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      categories: graphObject?.single[0]?.y,
      // tickWidth: 1,
      // tickmarkPlacement: 'on',
      //reversed: true,
      labels: {
        formatter: function () {
          return this.value.length > 12
            ? this.value?.slice(0, 12) + (this.value?.length > 12 ? "..." : "")
            : kFormatter(this.value);
        },
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      allowDecimals: false,
    },
    tooltip: {
      enabled: true,
      useHTML: true,
      borderWidth: 0,
      shadow: false,
      backgroundColor: "transparent",
      //headerFormat: 'X:{point.key}<br/>',
      // pointFormat:'Y:{point.y}<br/>',
      // footerFormat:'Count:{point.z}',
      style: {
        fontSize: "14px",
        fontFamily: '"Roboto", sans-serif',
        color: "#3b5175",
      },
      formatter: function () {
        return (
          "<div class='tooltip_chart text-Darkgray'> X : " +
          getPointCategoryName(this.point, "x") +
          "<br> Y : " +
          getPointCategoryName(this.point, "y") +
          "<br>Count : " +
          this.point.value?.toLocaleString() +
          "</div>"
        );
      },
    },
    colorAxis: {
      min: 0,
      // minColor: "#185edf21",
      maxColor: "#185edf",
      minColor: "#fa1919",
      //minColor:'#fa191921'
      allowDecimals: false,
      labels: {
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
    },

    legend: {
      align: "right",
      layout: "vertical",
      margin: 0,
      verticalAlign: "top",
      y: 25,
      symbolHeight: 280,
      itemStyle: {
        fontFamily: '"Roboto", sans-serif',
        color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
      },
      itemHoverStyle: {
        color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: null,
        borderWidth: 1,
        data: graphObject?.single[0]?.z,
        dataLabels: {
          enabled: true,
          //color: "#3b5175",
          formatter: function () {
            return !graphObject?.split ? this.point.value : "";
          },
          style: {
            textOutline: 0,
            color: "#FFFFFF",
            fontWeight: "normal",
          },
        },
      },
    ],
    exporting: {
      filename: graphObject?.widget_name
        ? graphObject?.widget_name
        : graphObject?.type,
      enabled:
        graphObject?.pdfDownloadStatus ||
        graphObject?.pptDownloadStatus ||
        authParams?.screen_id
          ? false
          : true,
      buttons: {
        contextButton: {
          menuItems: [
            "downloadPNG",
            "downloadJPEG",
            "downloadSVG",
            //"separator",
          ],
        },
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            yAxis: {
              labels: {
                formatter: function () {
                  return this.value.charAt(0);
                },
              },
              style: {
                color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
              },
            },
          },
        },
      ],
    },
  };
  return obj;
};
export const getPie = (graphObject, authParams) => {
  // const colorArray = [
  // 	"#57E2CF",
  // 	"#57AEE3",
  // 	"#5568E0",
  // 	"#8B56E3",
  // 	"#E256AD",
  // 	"#E35668",
  // 	"#E38957",
  // 	"#E2CF56",
  // 	"#AEE357",
  // 	"#68E357",
  // ];
  const colorArray = globalChartColor;
  let piedata = [];
  let j = 0;
  // let totalYValue = 0;
  // graphObject?.single?.forEach((data) => {
  // 	totalYValue = totalYValue + data?.y;
  // });
  let noOfIterationInColors = 0;
  let lengthOfColors = colorArray?.length;
  graphObject?.single &&
    graphObject?.single?.map((el, i) => {
      let dataColor;
      if (
        el?.color !== undefined &&
        el?.color !== "#000000" &&
        el?.color !== null
      ) {
        dataColor = el?.color;
      } else {
        if (j >= lengthOfColors) {
          noOfIterationInColors = parseInt(j / lengthOfColors);
          let rem = parseInt(j % lengthOfColors);
          dataColor =
            noOfIterationInColors > 0
              ? newColorShadeInHex6(
                  globalChartColor[rem],
                  parseInt(noOfIterationInColors * 5)
                )
              : globalChartColor[j];
        } else {
          dataColor = globalChartColor[j];
        }
        j++;
      }
      let lighterColor = newColorShadeInHex6(dataColor, 60);
      let darkerColor = dataColor;
      piedata?.push({
        color: {
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7,
          },
          stops: [
            [0, lighterColor],
            [1, darkerColor], // darken
          ],
        },
        name:
          graphObject?.xaxis === "Review Ratings" ? `${el?.name} ⭐` : el?.name,
        y: el?.y,
        // dataLabels: {
        // 	distance: (el?.y / totalYValue) * 100 >= 6 ? "-30%" : "30%",
        // },
      });
    });
  const obj = {
    chart: {
      height: graphObject?.style?.height,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      // spacingLeft: 0,
      // spacingRight: 0,
      // spacingTop: 0,
      // spacingBottom: 0,
      reflow: true,
      style: {
        fontFamily: '"Roboto", sans-serif',
        color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        fill: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
      },
    },
    title: {
      text: null,
      align: "center",
      verticalAlign: "middle",
      y: -30,
      style: {
        fontWeight: 200,
      },
    },
    subtitle: {
      text: null,
      align: "center",
      verticalAlign: "middle",
      y: 0,
      style: {
        color: "#3b5175",
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      useHTML: true,
      borderWidth: 0,
      shadow: false,
      backgroundColor: "transparent",
      headerFormat:
        '<div class="tooltip_chart"><span class="text-Darkgray fontSize-14 font-weight600 d-block mb-1">{point.point.name}</span><div class="d-flex align-items-center">',
      pointFormatter: function () {
        let clr = this?.color
          ? this?.color?.stops?.length
            ? this?.color?.stops?.[0]?.[1]
            : this?.color
          : this?.series?.color?.stops?.length
          ? this?.series?.color?.stops?.[0]?.[1]
          : this?.series?.color;
        return (
          '<span class="stackbar__tooltip" style="background-color:' +
          clr +
          ';">' +
          this?.y?.toLocaleString() +
          (this?.percentage
            ? " | " + this?.percentage?.toFixed(1)?.replace(/\.0$/, "") + "%"
            : "") +
          "</span></div></div>"
        );
      },
      // formatter: function () {
      // 	var percentage = Math.round(this.percentage * 10) / 10
      // 	return '<b style="color:white">' + this.point.name + ' : ' + this.y + ' | </b><b style="color:yellow">' + percentage + '%</b>';
      // },
      //borderRadius: 0,
      //itemMarginBottom: 3,
      //borderWidth: 1,
      //backgroundColor: '#00000',
      style: { fontSize: "14px", fontFamily: '"Roboto", sans-serif' },
      //shadow: true
    },
    plotOptions: {
      series: {
        cursor: "pointer",

        states: {
          hover: {
            enabled: true,
          },
        },
      },
      pie: {
        size:
          graphObject?.metadata?.span === "half"
            ? "75%"
            : graphObject?.metadata?.span === "two_third"
            ? "50%"
            : graphObject?.metadata?.span === "one_third"
            ? "50%"
            : "80%",
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          //crop:false,
          //overflow: 'justify',
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            fontSize: "11px",
            fontFamily: "Roboto",
            //fill: '#869DAD',
            fontWeight: "bold",
            textOutline: "none",
            wordWrap: "break-word",
          },
          //format: "{point.name} : {point.y} | {point.percentage:.1f}%",
          //format: "{point.name}<br>{point.y:,.2f} | {point.percentage:.1f}%",
          formatter: function () {
            let formattedNumber = formatInCommaSeprated(
              this?.y?.toFixed(2)?.replace(/\.00$/, "")
            );
            return (
              this?.key +
              "<br>" +
              formattedNumber +
              (this?.percentage
                ? " | " +
                  this?.percentage?.toFixed(1)?.replace(/\.0$/, "") +
                  "%"
                : "")
            );
          },
          distance: "30%",
        },

        point: {
          events: {
            legendItemClick: () => false,
          },
        },
        showInLegend: true,
        borderWidth: 2,
        borderColor: authParams?.theme_type === "1" ? "#1b2f50" : "#fff",
        //colors: ["#a5c559", "#edf3de"],
      },
    },
    series:
      graphObject?.type === "pie"
        ? [
            {
              innerSize: "0%",
              borderRadius: "4px",
              data: piedata,
            },
          ]
        : [
            {
              innerSize: "50%",
              borderRadius: "4px",
              data: piedata,
            },
          ],
    exporting: {
      filename: graphObject?.widget_name
        ? graphObject?.widget_name
        : graphObject?.type,
      enabled:
        graphObject?.pdfDownloadStatus ||
        graphObject?.pptDownloadStatus ||
        authParams?.screen_id
          ? false
          : true,
      menuItemDefinitions: {
        // Custom definition
        xsl: {
          onclick: () => {
            const excel = new Excel();
            let columns = [
              {
                title: graphObject?.xaxis,
                dataIndex: graphObject?.xaxis,
              },
              {
                title: graphObject?.yaxis,
                dataIndex: graphObject?.yaxis,
              },
            ];

            let datasource = graphObject?.single?.map((el, i) => {
              return {
                [columns[0]?.title]: el?.name,
                [columns[1]?.title]: el?.y,
              };
            });
            excel
              .addSheet("test")
              .addColumns(columns)
              .addDataSource(datasource, {
                str2Percent: true,
              })
              .saveAs(
                `${
                  graphObject?.widget_name
                    ? graphObject?.widget_name
                    : graphObject?.type
                }.xlsx`
              );
          },
          text: "Download excel sheet",
        },
      },
      buttons: {
        contextButton: {
          menuItems:
            graphObject?.xaxis && graphObject?.yaxis
              ? [
                  "downloadPNG",
                  "downloadJPEG",
                  "downloadSVG",
                  "separator",
                  "xsl",
                ]
              : ["downloadPNG", "downloadJPEG", "downloadSVG"],
        },
      },
    },
    credits: {
      enabled: false,
    },
    // legend: {
    // 	itemStyle: {
    // 		color: "#787878",
    // 	},
    // 	symbolRadius: 0,
    // },
    legend: graphObject?.legend_position
      ? {
          itemWidth:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? undefined
              : authParams?.screen_id === "000-000-556"
              ? 100
              : 200,
          layout:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? "horizontal"
              : "vertical",
          align:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? "center"
              : graphObject?.legend_position,
          verticalAlign:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? graphObject?.legend_position
              : "middle",
          itemStyle: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          itemHoverStyle: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        }
      : {
          itemWidth: undefined,
          enabled: true,
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          itemStyle: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          itemHoverStyle: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
  };
  return obj;
};
// const onLegendItemClicked=(targetEvent)=>{
// 	targetEvent?.target && targetEvent?.target?.series?.data.map((el,i)=>{
// 		if(el?.visible){
// 			getPercentage(el?.y,el?.total) >=6 ? el.labelDistance='-30%' :el.labelDistance='30%';
// 			return true;
// 		}else{
// 			return false;
// 		}
// 	});
// };
// const getPercentage=(value,total)=>{
// 	return value && total ? (value/total)*100 : 0;
// }

export const getLine = (graphObject, authParams) => {
  if (graphObject?.single[0]?.y_axis) {
    let obj = { ...graphObject };
    obj.single = graphObject.single[0];
    return getCombination(obj, authParams);
  } else {
    let ySeriesFromConfig = graphObject?.metadata?.y_series
      ? graphObject?.metadata?.y_series
      : Object?.entries(graphObject?.widgetGraphConfig?.y_axis);
    let flrSeriesExists = false;

    let graphConditionConfig =
      graphObject?.graphConditionConfig?.["time-label-attrs"];
    ySeriesFromConfig?.forEach((yseries, index) => {
      if (yseries?.attribute) {
        if (yseries && graphConditionConfig?.includes(yseries?.attribute))
          flrSeriesExists = true;
      } else if (
        yseries &&
        graphConditionConfig?.includes(yseries[1]?.attribute)
      )
        flrSeriesExists = true;
    });
    let seriesData = [];
    let seriesColorsFlag = false;
    let date_check = moment(
      graphObject?.single && graphObject?.single[0]?.x[0]
    ).isValid();

    if (
      graphObject?.single[0]?.colors != undefined &&
      graphObject?.single[0]?.colors?.length > 0
    ) {
      seriesColorsFlag = true;
      seriesData = graphObject?.single[0]?.y?.map((yElem, i) => {
        return {
          y: yElem,
          color:
            graphObject?.single[0]?.colors != undefined
              ? graphObject?.single[0]?.colors[i] != "#000000"
                ? graphObject?.single[0]?.colors[i]
                : ""
              : "",
        };
      });
    }
    const xaxisDataList = [];
    graphObject?.single[0]?.x?.map((el, i) => {
      xaxisDataList.push(`${el} ⭐`);
    });

    const durationType =
      (graphObject?.dashboard ||
        graphObject?.screen ||
        graphObject?.panes?.[graphObject?.index]?.is_widget_maker_open_obj
          ?.open_flag) &&
      handleDateFormat(
        graphObject?.panes,
        graphObject?.index,
        graphObject?.section_index,
        graphObject?.widget_index,
        graphObject?.metadata,
        graphObject?.metadata?.x_axis?.attribute,
        graphObject?.xaxis,
        graphObject?.metadata?.x_axis?.date_part,
        graphObject?.single[0]?.x,
        graphObject?.section,
        graphObject?.template_widget,
        graphObject?.shareTemplateData,
        graphObject?.pdfDownloadStatus,
        graphObject?.isScheduleReportOpen,
        graphObject?.screen,
        graphObject?.template_details
      );
    let x_date_part = graphObject?.metadata?.x_axis?.date_part;
    let x_date_agg = graphObject?.metadata?.x_axis?.date_aggregation;

    const obj = {
      chart: {
        //type: graphObject?.type,
        type: "spline",
        reflow: true,
        height: graphObject?.style?.height,
      },
      title: {
        text: "",
      },
      yAxis: {
        style: {
          fontFamily: '"Roboto", sans-serif',
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
        },
        min:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? 0.1
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? 0.1
            : flrSeriesExists
            ? 0
            : undefined, //aiLogScale:aiLogScale!==null? aiLogScale : log,
        minTickInterval: flrSeriesExists ? 60 : undefined,
        type:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? "logarithmic"
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? "logarithmic"
            : "", //aiLogScale:aiLogScale!==null? aiLogScale : log,
        title: {
          text: graphObject.yaxis,
          //enabled: chartGlobalDataLabel === false ? chartGlobalDataLabel : true,
          enabled: true,
          style: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.screen_id
              ? "#fff"
              : authParams?.theme_type === "1"
              ? "#b1bdd0"
              : "#3B5175",
          },
        },

        labels: {
          formatter: flrSeriesExists
            ? function () {
                return SecondstoHumanReadable(this?.value, true);
              }
            : function () {
                return kFormatter(this.value);
              },

          style: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.screen_id
              ? "#fff"
              : authParams?.theme_type === "1"
              ? "#b1bdd0"
              : "#3B5175",
          },
        },
        allowDecimals: false,
      },
      xAxis: {
        // type:
        //   graphObject?.yAxisScale &&
        //   graphObject?.yAxisScale[0]?.y_axis_scale === "log"
        //     ? "logarithmic"
        //     : "",
        title: {
          text:
            graphObject?.metadata?.x_axis?.attribute &&
            graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
              graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
            )
              ? !x_date_part && !x_date_agg
                ? "Date"
                : !x_date_part && x_date_agg === "1h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "2h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "3h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "4h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "6h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "8h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "12h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "ww"
                ? "Week of Year"
                : !x_date_part && x_date_agg === "M"
                ? "Month of Year"
                : !x_date_part && x_date_agg === "Y"
                ? "Years"
                : graphObject?.metadata?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "1h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "2h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "3h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "4h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "6h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "8h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "12h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "M"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "D"
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.metadata?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.metadata?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.metadata?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.metadata?.x_axis?.date_part
              : !graphObject?.metadata?.x_axis?.attribute &&
                (graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                  "recorddate" ||
                  graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                    "createddate")
              ? graphObject?.widgetGraphConfig?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part
              : graphObject?.xaxis,
          enabled: true,
          style: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.screen_id
              ? "#fff"
              : authParams?.theme_type === "1"
              ? "#b1bdd0"
              : "#3B5175",
          },
        },
        categories:
          // (graphObject?.metadata &&
          //   graphObject?.metadata?.x_axis?.attribute?.toLowerCase() === "recorddate") ||
          // (graphObject?.xaxis === "Date" &&
          //   graphObject?.metadata?.x_axis?.date_part == null)
          //   ? graphObject?.single[0]?.x?.map((e) =>
          //       moment(e).format("MMM DD YYYY")
          //     )
          graphObject?.metadata &&
          (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
            graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
          ) ||
            graphObject?.xaxis === "Date") &&
          ((graphObject?.pdfDownloadStatus &&
            graphObject?.metadata?.x_axis?.date_part !== null) ||
            ((!graphObject?.pdfDownloadStatus ||
              graphObject?.isScheduleReportOpen) &&
              graphObject?.metadata?.x_axis?.date_part == null)) &&
          durationType
            ? durationType
            : graphObject?.metadata &&
              (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
                graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
              ) ||
                graphObject?.xaxis === "Date") &&
              graphObject?.metadata?.x_axis?.date_part !== null
            ? graphObject?.single[0]?.x?.map((e) => e)
            : graphObject?.xaxis === "Date" &&
              graphObject?.widgetGraphConfig?.x_axis?.date_part == null
            ? graphObject?.single[0]?.x?.map((e) =>
                moment(e).format("MMM DD YYYY")
              )
            : graphObject?.xaxis === "Review Ratings" && xaxisDataList
            ? xaxisDataList
            : graphObject?.single[0]?.x,
        labels: {
          formatter: function () {
            return date_check || graphObject?.pdfDownloadStatus
              ? this.value
              : this.value.length > 12 && graphObject?.single[0]?.x?.length > 5
              ? this.value?.slice(0, 12) +
                (this.value?.length > 12 ? "..." : "")
              : this.value;
          },
          rotation: graphObject?.single[0]?.x?.length > 5 ? -45 : 0,
          style: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.screen_id
              ? "#fff"
              : authParams?.theme_type === "1"
              ? "#b1bdd0"
              : "#3B5175",
          },
        },
        gridLineWidth: 1,
        tickmarkPlacement: "on",
        tickWidth: 1,
        style: {
          fontFamily: '"Roboto", sans-serif',
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
        },
      },
      tooltip: {
        enabled: true,
        useHTML: true,
        borderWidth: 0,
        shadow: false,
        backgroundColor: "transparent",
        //pointFormat: " {point.y})",
        headerFormat:
          "<div class='tooltip_chart fontSize-14 d-flex align-items-center'><span class='text-Darkgray font-weight600 mr-1'>{point.key} </span> ",
        pointFormatter: function () {
          let clr = this?.color
            ? this?.color?.stops?.length
              ? this?.color?.stops?.[0]?.[1]
              : this?.color
            : this?.series?.color?.stops?.length
            ? this?.series?.color?.stops?.[0]?.[1]
            : this?.series?.color;
          return (
            '<span class="stackbar__tooltip" style="background-color:' +
            clr +
            ';">' +
            (flrSeriesExists
              ? SecondstoHumanReadable(this?.y)
              : this?.y?.toLocaleString()) +
            "</span></div>"
          );
        },
        style: {
          fontSize: "14px",
          fontFamily: '"Roboto", sans-serif',
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
        },
      },
      plotOptions: {
        series: {
          cursor: "pointer",
          lineWidth: 3,
          events: {
            click: function (event) {
              return "hello";
            },
          },
          label: {
            connectorAllowed: false,
          },
          style: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
          },
          marker: {
            enabled:
              graphObject?.chartMarkers === false
                ? graphObject?.chartMarkers
                : true,
            //radius:graphObject?.chartMarkers === true ? 4 : 0
            symbol: "circle",
            fillColor: "#FFFFFF",
            lineWidth: 3,
            lineColor: null, // inherit from series
          },
          showInLegend: false,
          dataLabels: {
            enabled: graphObject?.chartGlobalDataLabel ? true : false,
            style: {
              fontWeight: "500",
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
              fontSize: "10px",
              fontFamily: '"Roboto", sans-serif',
            },
            formatter: flrSeriesExists
              ? function () {
                  return (this.y / 60).toFixed(0) + " mins";
                }
              : function () {
                  return kFormatter(this.y);
                },
          },
        },
        spline: {
          animation: graphObject?.pdfDownloadStatus ? false : true,
        },
      },
      series: [
        {
          name: graphObject?.single[0]?.name
            ? graphObject?.single[0]?.name
            : "Timeline",
          data: seriesColorsFlag ? seriesData : graphObject?.single[0]?.y,
          color: !seriesColorsFlag
            ? graphObject?.single[0]?.color != undefined &&
              graphObject?.single[0]?.color != "#000000"
              ? graphObject?.single[0]?.color
              : globalChartColor[0]
            : undefined,
          //  shadow: {
          //         color: !seriesColorsFlag
          //         ? graphObject?.single[0]?.color != undefined &&
          //           graphObject?.single[0]?.color != "#000000"
          //           ? graphObject?.single[0]?.color
          //           : globalChartColor[1]
          //         : seriesColorsFlag &&
          //           seriesData?.[0]?.color!= undefined &&
          //           seriesData?.[0]?.color != "#000000"
          //         ? seriesData?.[0]?.color
          //         : '#d5d3d31a',
          //         width: 10,
          //         opacity: 1,
          //         offsetX: 0,
          //         offsetY: 0
          //     }
        },
      ],
      exporting: {
        filename: graphObject?.widget_name
          ? graphObject?.widget_name
          : graphObject?.type,
        enabled:
          graphObject?.pdfDownloadStatus ||
          graphObject?.pptDownloadStatus ||
          authParams?.screen_id
            ? false
            : true,
        menuItemDefinitions: {
          // Custom definition
          xsl: {
            onclick: () => {
              const excel = new Excel();
              let columns = [
                {
                  title: graphObject?.xaxis,
                  dataIndex: graphObject?.xaxis,
                },
                {
                  title: graphObject?.yaxis,
                  dataIndex: graphObject?.yaxis,
                },
              ];

              let datasource = graphObject?.single[0]?.y?.map((yElem, i) => {
                return {
                  [columns[0]?.title]: graphObject?.single[0]?.x[i],
                  [columns[1]?.title]: flrSeriesExists
                    ? SecondstoHumanReadable(yElem)
                    : yElem,
                };
              });
              excel
                .addSheet("test")
                .addColumns(columns)
                .addDataSource(datasource, {
                  str2Percent: true,
                })
                .saveAs(
                  `${
                    graphObject?.widget_name
                      ? graphObject?.widget_name
                      : graphObject?.type
                  }.xlsx`
                );
            },
            text: "Download excel sheet",
          },
        },
        buttons: {
          contextButton: {
            menuItems:
              graphObject?.xaxis && graphObject?.yaxis
                ? [
                    "downloadPNG",
                    "downloadJPEG",
                    "downloadSVG",
                    "separator",
                    "xsl",
                  ]
                : ["downloadPNG", "downloadJPEG", "downloadSVG"],
          },
        },
      },
      credits: {
        enabled: false,
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
      legend: graphObject?.legend_position
        ? {
            itemWidth:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? undefined
                : 200,
            layout:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "horizontal"
                : "vertical",
            align:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "center"
                : graphObject?.legend_position,
            verticalAlign:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? graphObject?.legend_position
                : "middle",
            itemStyle: {
              fontFamily: '"Roboto", sans-serif',
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
            },
          }
        : {
            itemWidth: undefined,
            enabled: true,
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            itemStyle: {
              fontFamily: '"Roboto", sans-serif',
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
            },
          },
    };
    return obj;
  }
};

export const getMultiLine = (graphObject, authParams, Highcharts) => {
  let twoMonthsDuration = getCustomizedDate(6, "Days");
  let defaultDuration = {
    from:
      moment(twoMonthsDuration?.date?.[0]).format("YYYY/MM/DD") +
      " " +
      twoMonthsDuration?.time?.startTime,
    to:
      moment(twoMonthsDuration?.date?.[1]).format("YYYY/MM/DD") +
      " " +
      twoMonthsDuration?.time?.endTime,
  };

  let ticketOverviewId =
    graphObject?.index >= 0 &&
    graphObject?.panes[graphObject?.index]?.template_id;
  let startdate =
    graphObject?.index >= 0 &&
    graphObject?.panes?.[graphObject?.index]?.duration?.from
      ? graphObject?.index >= 0 &&
        graphObject?.panes?.[graphObject?.index]?.duration?.from
      : defaultDuration?.from;
  let endDate =
    graphObject?.index >= 0 &&
    graphObject?.panes?.[graphObject?.index]?.duration?.to
      ? graphObject?.index >= 0 &&
        graphObject?.panes?.[graphObject?.index]?.duration?.to
      : defaultDuration?.to;
  let diffDay = moment(endDate).diff(moment(startdate), "day");

  if (graphObject?.single?.[0]?.y_axis) {
    let obj = { ...graphObject };
    obj.single = graphObject.single?.[0];
    return getCombination(obj, authParams);
  } else {
    let ySeriesFromConfig = graphObject?.metadata?.y_series
      ? graphObject?.metadata?.y_series
      : Object?.entries(graphObject?.widgetGraphConfig?.y_axis);

    let arr = [];
    arr = graphObject?.metadata?.y_series
      ? graphObject?.metadata?.y_series
      : Object.keys(graphObject?.widgetGraphConfig?.y_axis).map(
          (key) => graphObject?.widgetGraphConfig?.y_axis[key]
        );
    let filteredArray = arr?.filter((d) => d.attribute);
    let updatedYAxisLabel = [];
    filteredArray?.map((d, i) => {
      if (i >= 1) {
        updatedYAxisLabel = updatedYAxisLabel + ", " + d.trace_name;
      } else {
        updatedYAxisLabel = updatedYAxisLabel + d.trace_name;
      }
    });

    let flrSeriesExists = false;
    let graphConditionConfig =
      graphObject?.graphConditionConfig?.["time-label-attrs"];
    ySeriesFromConfig?.forEach((yseries, index) => {
      if (yseries?.attribute) {
        if (yseries && graphConditionConfig?.includes(yseries?.attribute))
          flrSeriesExists = true;
      } else if (
        yseries &&
        graphConditionConfig?.includes(yseries[1]?.attribute)
      )
        flrSeriesExists = true;
    });
    let multiData = [];
    let j = 0;
    let noOfIterationInColors = 0;
    let lengthOfColors = globalChartColor?.length;
    graphObject?.single?.[0]?.data?.map((d, i) => {
      let dataColor;
      if (
        d?.color !== undefined &&
        d?.color !== "#000000" &&
        d?.color !== null
      ) {
        dataColor = d?.color;
      } else {
        if (j >= lengthOfColors) {
          noOfIterationInColors = parseInt(j / lengthOfColors);
          let rem = parseInt(j % lengthOfColors);
          dataColor =
            noOfIterationInColors > 0
              ? newColorShadeInHex6(
                  globalChartColor[rem],
                  parseInt(noOfIterationInColors * 5)
                )
              : globalChartColor[j];
        } else {
          dataColor = globalChartColor[j];
        }
        j++;
      }
      if (d?.attribute?.toLowerCase() === "rating") {
        multiData.push({
          name: `${d?.name} ⭐`,
          data: d?.y,
          color: dataColor,
          // shadow: {
          //       color: d?.color != undefined && d?.color != "#000000"
          //       ? d?.color
          //       : globalChartColor[i],
          //       width: 10,
          //       opacity: 1,
          //       offsetX: 0,
          //       offsetY: 0
          //   }
        });
      } else {
        multiData.push({
          name: d?.name,
          data: d?.y,
          color: dataColor,
          //  shadow: {
          //         color: d?.color != undefined && d?.color != "#000000"
          //         ? d?.color
          //         : globalChartColor[i],
          //         width: 10,
          //         opacity: 1,
          //         offsetX: 0,
          //         offsetY: 0
          //     }
        });
      }
    });
    let date_check = moment(
      graphObject?.single && graphObject?.single?.[0]?.x[0]
    ).isValid();
    const xaxisDataList = [];
    graphObject?.single?.[0]?.x?.map((el, i) => {
      xaxisDataList.push(`${el} ⭐`);
    });
    const durationType =
      (graphObject?.dashboard ||
        graphObject?.screen ||
        graphObject?.panes?.[graphObject?.index]?.is_widget_maker_open_obj
          ?.open_flag) &&
      handleDateFormat(
        graphObject?.panes,
        graphObject?.index,
        graphObject?.section_index,
        graphObject?.widget_index,
        graphObject?.metadata,
        graphObject?.metadata?.x_axis?.attribute,
        graphObject?.xaxis,
        graphObject?.metadata?.x_axis?.date_part,
        graphObject?.single?.[0]?.x,
        graphObject?.section,
        graphObject?.template_widget,
        graphObject?.shareTemplateData,
        graphObject?.pdfDownloadStatus,
        graphObject?.isScheduleReportOpen,
        graphObject?.screen,
        graphObject?.template_details
      );

    let x_date_part = graphObject?.metadata?.x_axis?.date_part;
    let x_date_agg = graphObject?.metadata?.x_axis?.date_aggregation;

    const obj = {
      chart: {
        //type: graphObject?.type,
        type: "spline",
        reflow: true,
        height: graphObject?.style?.height,
        style: {
          fontFamily: '"Roboto", sans-serif',
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      title: {
        text: "",
      },
      yAxis: {
        min:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? 0.1
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? 0.1
            : flrSeriesExists
            ? 0
            : undefined, //aiLogScale:aiLogScale!==null? aiLogScale : log,
        minTickInterval: flrSeriesExists ? 60 : undefined,
        type:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? "logarithmic"
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? "logarithmic"
            : "", //aiLogScale:aiLogScale!==null? aiLogScale : log,
        title: {
          text:
            updatedYAxisLabel?.length > 0
              ? updatedYAxisLabel
              : graphObject?.yaxis,
          enabled: true,
          style: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        labels: {
          formatter: flrSeriesExists
            ? function () {
                return SecondstoHumanReadable(this?.value, true);
              }
            : function () {
                return kFormatter(this.value);
              },
          style: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        allowDecimals: false,
        //endOnTick: false,
      },
      xAxis: {
        type: graphObject?.xAxisScale === "log" ? "logarithmic" : "",
        title: {
          text:
            graphObject?.metadata?.x_axis?.attribute &&
            graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
              graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
            )
              ? authParams?.screen_id &&
                graphObject?.screen?.selected_duration_type === "15Minutes"
                ? "Minutes"
                : !x_date_part && !x_date_agg
                ? "Date"
                : !x_date_part && x_date_agg === "1h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "2h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "3h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "4h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "6h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "8h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "12h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "ww"
                ? "Week of Year"
                : !x_date_part && x_date_agg === "M"
                ? "Month of Year"
                : !x_date_part && x_date_agg === "Y"
                ? "Years"
                : graphObject?.metadata?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "1h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "2h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "3h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "4h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "6h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "8h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "12h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "M"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "D"
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.metadata?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.metadata?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.metadata?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.metadata?.x_axis?.date_part
              : !graphObject?.metadata?.x_axis?.attribute &&
                (graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                  "recorddate" ||
                  graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                    "createddate")
              ? graphObject?.widgetGraphConfig?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part
              : graphObject?.xaxis,
          enabled: true,
          style: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        categories:
          graphObject?.dashboard &&
          ticketOverviewId === "000-000-004" &&
          // diffDay < 6 &&
          graphObject?.ticket_chart_type !== "W" &&
          graphObject?.ticket_chart_type !== "M" &&
          graphObject?.ticket_chart_type !== "Y" &&
          (graphObject?.ticket_status_duration === 60 ||
            graphObject?.ticket_status_duration === 120 ||
            graphObject?.ticket_status_duration === 180 ||
            graphObject?.ticket_status_duration === 240 ||
            graphObject?.ticket_status_duration === 360 ||
            graphObject?.ticket_status_duration === 480 ||
            graphObject?.ticket_status_duration === 720)
            ? graphObject?.single[0]?.x?.map((e) =>
                moment(e).format("D MMM H:mm")
              )
            : graphObject?.dashboard &&
              ticketOverviewId === "000-000-004" &&
              // diffDay >= 6 &&
              graphObject?.ticket_chart_type !== "W" &&
              graphObject?.ticket_chart_type !== "M" &&
              graphObject?.ticket_chart_type !== "Y" &&
              graphObject?.ticket_chart_type === "D"
            ? graphObject?.single?.[0]?.x?.map((e) => moment(e).format("D MMM"))
            : graphObject?.dashboard &&
              ticketOverviewId === "000-000-004" &&
              diffDay >= 6 &&
              graphObject?.ticket_chart_type === "M"
            ? graphObject?.single?.[0]?.x?.map((e) =>
                moment(e).format("MMM YYYY")
              )
            : graphObject?.dashboard &&
              ticketOverviewId === "000-000-004" &&
              diffDay >= 6 &&
              (graphObject?.ticket_chart_type === "W" ||
                graphObject?.ticket_chart_type === "Y")
            ? graphObject?.single?.[0]?.x?.map((e) => e)
            : // : (graphObject?.metadata &&
            //     graphObject?.metadata?.x_axis?.attribute?.toLowerCase() === "recorddate") ||
            //   (graphObject?.xaxis === "date" &&
            //     graphObject?.metadata?.x_axis?.date_part == null)
            // ? graphObject?.single[0]?.x?.map((e) =>
            //     moment(e).format("MMM DD YYYY")
            //   )

            graphObject?.metadata &&
              (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
                graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
              ) ||
                graphObject?.xaxis === "Date") &&
              ((graphObject?.pdfDownloadStatus &&
                graphObject?.metadata?.x_axis?.date_part !== null) ||
                ((!graphObject?.pdfDownloadStatus ||
                  graphObject?.isScheduleReportOpen) &&
                  graphObject?.metadata?.x_axis?.date_part == null)) &&
              durationType
            ? durationType
            : graphObject?.metadata &&
              (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
                graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
              ) ||
                graphObject?.xaxis === "Date") &&
              graphObject?.metadata?.x_axis?.date_part !== null
            ? graphObject?.single?.[0]?.x?.map((e) => e)
            : graphObject?.xaxis === "Date" &&
              graphObject?.widgetGraphConfig?.x_axis?.date_part == null
            ? graphObject?.single?.[0]?.x?.map((e) =>
                moment(e).format("MMM DD YYYY")
              )
            : graphObject?.xaxis === "Review Ratings" && xaxisDataList
            ? xaxisDataList
            : graphObject?.single?.[0]?.x,
        labels: {
          formatter: function () {
            return date_check || graphObject?.pdfDownloadStatus
              ? this.value
              : this.value.length > 12 &&
                graphObject?.single?.[0]?.x?.length > 5
              ? this.value?.slice(0, 12) +
                (this.value?.length > 12 ? "..." : "")
              : this.value;
          },
          rotation: graphObject?.single?.[0]?.x?.length > 5 ? -45 : 0,
          style: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        style: {
          fontFamily: '"Roboto", sans-serif',
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      tooltip: {
        enabled: true,
        borderWidth: 0,
        useHTML: true,
        shadow: false,
        backgroundColor: "transparent",
        headerFormat:
          '<div class="tooltip_chart"><span class="text-Darkgray fontSize-14 font-weight600 d-block mb-1">{series.name}</span> <div class="d-flex align-items-center"><span class="text-Darkgray mr-1"> {point.key} </span> ',
        //pointFormat: ",{point.y})"#3b5175,
        pointFormatter: function () {
          let clr = this?.color
            ? this?.color?.stops?.length
              ? this?.color?.stops?.[0]?.[1]
              : this?.color
            : this?.series?.color?.stops?.length
            ? this?.series?.color?.stops?.[0]?.[1]
            : this?.series?.color;
          return (
            '<span class="stackbar__tooltip" style="background-color:' +
            clr +
            ';">' +
            (flrSeriesExists
              ? SecondstoHumanReadable(this?.y)
              : this?.y?.toLocaleString()) +
            "</span></div></div>"
          );
        },
        style: {
          fontSize: "14px",
          fontFamily: '"Roboto", sans-serif',
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          lineWidth: 3,
          marker: {
            enabled:
              graphObject?.chartMarkers === false
                ? graphObject?.chartMarkers
                : true,
            //radius:graphObject?.chartMarkers === true ? 4 : 0
            symbol: "circle",
            fillColor: "#FFFFFF",
            lineWidth: 3,
            lineColor: null, // inherit from series
          },
          showInLegend: true,
          dataLabels: {
            enabled: graphObject?.chartGlobalDataLabel ? true : false,
            style: {
              fontWeight: "500",
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
              fontSize: "10px",
              fontFamily: '"Roboto", sans-serif',
              textOutline: "none",
            },
            formatter: flrSeriesExists
              ? function () {
                  return (this.y / 60).toFixed(0) + " mins";
                }
              : function () {
                  return kFormatter(this.y);
                },
          },
        },
        spline: {
          animation: graphObject?.pdfDownloadStatus ? false : true,
        },
      },
      series: multiData,
      exporting: {
        filename: graphObject?.widget_name
          ? graphObject?.widget_name
          : graphObject?.type,
        enabled:
          graphObject?.pdfDownloadStatus ||
          graphObject?.pptDownloadStatus ||
          authParams?.screen_id
            ? false
            : true,
        menuItemDefinitions: {
          // Custom definition
          xsl: {
            onclick: () => {
              const excel = new Excel();
              let columns = [
                {
                  title: graphObject?.xaxis,
                  dataIndex: graphObject?.xaxis,
                },
              ];
              let datasource = [];
              let lengthOfMultiData = multiData?.length;
              let lengthOfColumns = lengthOfMultiData + 1;
              for (let i = 0; i < lengthOfColumns; i++) {
                if (i == 0) {
                  graphObject?.single?.[0]?.x?.forEach((xElem, x_index) => {
                    datasource[x_index] = { [columns[i]?.title]: xElem };
                  });
                } else {
                  columns[i] = {
                    title: multiData[i - 1]?.name,
                    dataIndex: multiData[i - 1]?.name,
                  };
                  multiData[i - 1]?.data?.forEach((data, data_index) => {
                    datasource[data_index] = {
                      ...datasource[data_index],
                      [columns[i]?.title]: flrSeriesExists
                        ? SecondstoHumanReadable(data)
                        : data,
                    };
                  });
                }
              }
              excel
                .addSheet("test")
                .addColumns(columns)
                .addDataSource(datasource, {
                  str2Percent: true,
                })
                .saveAs(
                  `${
                    graphObject?.widget_name
                      ? graphObject?.widget_name
                      : graphObject?.type
                  }.xlsx`
                );
            },
            text: "Download excel sheet",
          },
        },
        buttons: {
          contextButton: {
            menuItems:
              graphObject?.xaxis && graphObject?.yaxis
                ? [
                    "downloadPNG",
                    "downloadJPEG",
                    "downloadSVG",
                    "separator",
                    "xsl",
                  ]
                : ["downloadPNG", "downloadJPEG", "downloadSVG"],
          },
        },
      },
      credits: {
        enabled: false,
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
      legend: graphObject?.legend_position
        ? {
            itemWidth:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? undefined
                : 200,
            layout:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "horizontal"
                : "vertical",
            align:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "center"
                : graphObject?.legend_position,
            verticalAlign:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? graphObject?.legend_position
                : "middle",
            itemStyle: {
              fontFamily: '"Roboto", sans-serif',
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
            itemHoverStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
          }
        : {
            itemWidth: undefined,
            enabled: true,
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            itemStyle: {
              fontFamily: '"Roboto", sans-serif',
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
            itemHoverStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
          },
    };
    return obj;
  }
};

export const getArea = (graphObject, authParams) => {
  if (graphObject?.single[0]?.y_axis) {
    let obj = { ...graphObject };
    obj.single = graphObject.single[0];
    return getCombination(obj, authParams);
  } else {
    let ySeriesFromConfig = graphObject?.metadata?.y_series
      ? graphObject?.metadata?.y_series
      : Object?.entries(graphObject?.widgetGraphConfig?.y_axis);

    let graphConditionConfig =
      graphObject?.graphConditionConfig?.["time-label-attrs"];
    let flrSeriesExists = false;
    ySeriesFromConfig?.forEach((yseries, index) => {
      if (yseries?.attribute) {
        if (yseries && graphConditionConfig?.includes(yseries?.attribute))
          flrSeriesExists = true;
      } else if (
        yseries &&
        graphConditionConfig?.includes(yseries[1]?.attribute)
      )
        flrSeriesExists = true;
    });
    let seriesData = [];
    let seriesColorsFlag = false;
    let zoneColors = [];
    let date_check = moment(
      graphObject?.single && graphObject?.single[0]?.x[0]
    ).isValid();
    // zoneColors.push({
    // 	value:yElem,
    // 	color:single[0]?.color != undefined ? single[0]?.color[i]:'',
    // });
    if (
      graphObject?.single[0]?.colors != undefined &&
      graphObject?.single[0]?.colors?.length > 0
    ) {
      seriesColorsFlag = true;
      seriesData = graphObject?.single[0]?.y?.map((yElem, i) => {
        return {
          y: yElem,
          color:
            graphObject?.single[0]?.colors != undefined
              ? graphObject?.single[0]?.colors[i] != "#000000"
                ? graphObject?.single[0]?.colors[i]
                : ""
              : "",
        };
      });
    }
    const xaxisDataList = [];
    graphObject?.single[0]?.x?.map((el, i) => {
      xaxisDataList.push(`${el} ⭐`);
    });

    const durationType =
      (graphObject?.dashboard ||
        graphObject?.screen ||
        graphObject?.panes?.[graphObject?.index]?.is_widget_maker_open_obj
          ?.open_flag) &&
      handleDateFormat(
        graphObject?.panes,
        graphObject?.index,
        graphObject?.section_index,
        graphObject?.widget_index,
        graphObject?.metadata,
        graphObject?.metadata?.x_axis?.attribute,
        graphObject?.xaxis,
        graphObject?.metadata?.x_axis?.date_part,
        graphObject?.single[0]?.x,
        graphObject?.section,
        graphObject?.template_widget,
        graphObject?.shareTemplateData,
        graphObject?.pdfDownloadStatus,
        graphObject?.isScheduleReportOpen,
        graphObject?.screen,
        graphObject?.template_details
      );

    let x_date_part = graphObject?.metadata?.x_axis?.date_part;
    let x_date_agg = graphObject?.metadata?.x_axis?.date_aggregation;

    const obj = {
      chart: {
        //type: graphObject?.type,
        type: "areaspline",
        reflow: true,
        height: graphObject?.style?.height,
        style: {
          fontFamily: '"Roboto", sans-serif',
        },
      },
      title: {
        text: "",
      },
      xAxis: {
        title: {
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          text:
            graphObject?.metadata?.x_axis?.attribute &&
            graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
              graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
            )
              ? !x_date_part && !x_date_agg
                ? "Date"
                : !x_date_part && x_date_agg === "1h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "2h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "3h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "4h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "6h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "8h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "12h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "ww"
                ? "Week of Year"
                : !x_date_part && x_date_agg === "M"
                ? "Month of Year"
                : !x_date_part && x_date_agg === "Y"
                ? "Years"
                : graphObject?.metadata?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "1h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "2h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "3h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "4h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "6h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "8h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "12h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "M"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "D"
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.metadata?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.metadata?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.metadata?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.metadata?.x_axis?.date_part
              : !graphObject?.metadata?.x_axis?.attribute &&
                (graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                  "recorddate" ||
                  graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                    "createddate")
              ? graphObject?.widgetGraphConfig?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part
              : graphObject?.xaxis,
          enabled: true,
        },
        allowDecimals: false,
        categories:
          graphObject?.metadata &&
          (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
            graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
          ) ||
            graphObject?.xaxis === "Date") &&
          ((graphObject?.pdfDownloadStatus &&
            graphObject?.metadata?.x_axis?.date_part !== null) ||
            ((!graphObject?.pdfDownloadStatus ||
              graphObject?.isScheduleReportOpen) &&
              graphObject?.metadata?.x_axis?.date_part == null)) &&
          durationType
            ? durationType
            : graphObject?.metadata &&
              (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
                graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
              ) ||
                graphObject?.xaxis === "Date") &&
              graphObject?.metadata?.x_axis?.date_part !== null
            ? graphObject?.single[0]?.x?.map((e) => e)
            : // (graphObject?.metadata &&
            //   graphObject?.metadata?.x_axis?.attribute?.toLowerCase() === "recorddate") ||
            // (graphObject?.xaxis === "Date" &&
            //   graphObject?.metadata?.x_axis?.date_part == null)
            //   ? graphObject?.single[0]?.x?.map((e) =>
            //       moment(e).format("MMM DD YYYY")
            //     )
            graphObject?.xaxis === "Date" &&
              graphObject?.widgetGraphConfig?.x_axis?.date_part == null
            ? graphObject?.single[0]?.x?.map((e) =>
                moment(e).format("MMM DD YYYY")
              )
            : graphObject?.xaxis === "Review Ratings" && xaxisDataList
            ? xaxisDataList
            : graphObject?.single[0]?.x,
        labels: {
          formatter: function () {
            return date_check || graphObject?.pdfDownloadStatus
              ? this.value
              : this.value.length > 12 && graphObject?.single[0]?.x?.length > 5
              ? this.value?.slice(0, 12) +
                (this.value?.length > 12 ? "..." : "")
              : this.value;
          },
          rotation: graphObject?.single[0]?.x?.length > 5 ? -45 : 0,
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          //padding:0,
        },
        tickmarkPlacement: "on",
        gridLineWidth: 1,
        tickWidth: 1,
      },
      yAxis: {
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
        min:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? 0.1
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? 0.1
            : flrSeriesExists
            ? 0
            : undefined, //aiLogScale:aiLogScale!==null? aiLogScale : log,
        minTickInterval: flrSeriesExists ? 60 : undefined,
        type:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? "logarithmic"
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? "logarithmic"
            : "", //aiLogScale:aiLogScale!==null? aiLogScale : log,
        title: {
          text: graphObject?.yaxis,
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        labels: {
          formatter: flrSeriesExists
            ? function () {
                return SecondstoHumanReadable(this?.value, true);
              }
            : function () {
                return kFormatter(this.value);
              },
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        allowDecimals: false,
      },

      // tooltip: {
      // 	pointFormat: "{series.name} <b>{point.y:,.0f}</b><br/> {point.x}",
      // },
      tooltip: {
        enabled: true,
        useHTML: true,
        borderWidth: 0,
        shadow: false,
        backgroundColor: "transparent",
        headerFormat:
          "<div class='tooltip_chart fontSize-14 d-flex align-items-center'><span class='text-Darkgray font-weight600 mr-1'>{point.key} </span> ",
        pointFormatter: function () {
          let clr = this?.color
            ? this?.color?.stops?.length
              ? this?.color?.stops?.[0]?.[1]
              : this?.color
            : this?.series?.color?.stops?.length
            ? this?.series?.color?.stops?.[0]?.[1]
            : this?.series?.color;
          return (
            '<span class="stackbar__tooltip" style="background-color:' +
            clr +
            ';">' +
            (flrSeriesExists
              ? SecondstoHumanReadable(this?.y)
              : this?.y?.toLocaleString()) +
            "</span></div>"
          );
        },
        style: {
          fontSize: "14px",
          fontFamily: '"Roboto", sans-serif',
          color: "#3b5175",
        },
      },
      plotOptions: {
        areaspline: {
          // pointStart: 1940,
          animation: graphObject?.pdfDownloadStatus ? false : true,
          lineWidth: 3,
          marker: {
            enabled:
              graphObject?.chartMarkers === false
                ? graphObject?.chartMarkers
                : true,
            //radius:graphObject?.chartMarkers === true ? 4 : 0
            symbol: "circle",
            fillColor: "#FFFFFF",
            lineWidth: 3,
            lineColor: null, // inherit from series
          },
          showInLegend: false,
          dataLabels: {
            enabled: graphObject?.chartGlobalDataLabel ? true : false,
            style: {
              fontWeight: "500",
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
              fontSize: "10px",
              fontFamily: '"Roboto", sans-serif',
            },
            formatter: flrSeriesExists
              ? function () {
                  return (this.y / 60).toFixed(0) + " mins";
                }
              : function () {
                  return kFormatter(this.y);
                },
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: graphObject?.single[0]?.name
            ? graphObject?.single[0]?.name
            : "Timeline",
          data: seriesColorsFlag ? seriesData : graphObject?.single[0]?.y,
          color: !seriesColorsFlag
            ? graphObject?.single[0]?.color != undefined &&
              graphObject?.single[0]?.color != "#000000"
              ? `${graphObject?.single[0]?.color}99`
              : `${globalChartColor[0]}99`
            : `${globalChartColor[0]}99`,
          //pointIntervalUnit: 1,
          //zoneAxis:seriesColorsFlag?'x':'y',
          //zones:seriesColorsFlag ? zoneColors:[{}],
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [
                0,
                graphObject?.single[0]?.color != undefined &&
                graphObject?.single[0]?.color != "#000000"
                  ? `${graphObject?.single[0]?.color}99`
                  : `${globalChartColor[0]}99`,
              ],
              [
                1,
                graphObject?.single[0]?.color != undefined &&
                graphObject?.single[0]?.color != "#000000"
                  ? `${graphObject?.single[0]?.color}1a`
                  : `${globalChartColor[0]}1a`,
              ],
            ],
          },
        },
      ],
      exporting: {
        filename: graphObject?.widget_name
          ? graphObject?.widget_name
          : graphObject?.type,
        enabled:
          graphObject?.pdfDownloadStatus ||
          graphObject?.pptDownloadStatus ||
          authParams?.screen_id
            ? false
            : true,
        menuItemDefinitions: {
          // Custom definition
          xsl: {
            onclick: () => {
              const excel = new Excel();
              let columns = [
                {
                  title: graphObject?.xaxis,
                  dataIndex: graphObject?.xaxis,
                },
                {
                  title: graphObject?.yaxis,
                  dataIndex: graphObject?.yaxis,
                },
              ];

              let datasource = graphObject?.single[0]?.y?.map((yElem, i) => {
                return {
                  [columns[0]?.title]: graphObject?.single[0]?.x[i],
                  [columns[1]?.title]: flrSeriesExists
                    ? SecondstoHumanReadable(yElem)
                    : yElem,
                };
              });
              excel
                .addSheet("test")
                .addColumns(columns)
                .addDataSource(datasource, {
                  str2Percent: true,
                })
                .saveAs(
                  `${
                    graphObject?.widget_name
                      ? graphObject?.widget_name
                      : graphObject?.type
                  }.xlsx`
                );
            },
            text: "Download excel sheet",
          },
        },
        buttons: {
          contextButton: {
            menuItems:
              graphObject?.xaxis && graphObject?.yaxis
                ? [
                    "downloadPNG",
                    "downloadJPEG",
                    "downloadSVG",
                    "separator",
                    "xsl",
                  ]
                : ["downloadPNG", "downloadJPEG", "downloadSVG"],
          },
        },
      },
      legend: graphObject?.legend_position
        ? {
            itemWidth:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? undefined
                : 200,
            layout:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "horizontal"
                : "vertical",
            align:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "center"
                : graphObject?.legend_position,
            verticalAlign:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? graphObject?.legend_position
                : "middle",
            itemStyle: {
              fontFamily: '"Roboto", sans-serif',
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
            itemHoverStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
          }
        : {
            itemWidth: undefined,
            enabled: true,
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            itemStyle: {
              fontFamily: '"Roboto", sans-serif',
              color: "#3b5175",
            },
            itemHoverStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
          },
    };
    return obj;
  }
};

export const getMultiArea = (graphObject, authParams) => {
  if (graphObject?.single[0]?.y_axis) {
    let obj = { ...graphObject };
    obj.single = graphObject.single[0];
    return getCombination(obj, authParams);
  } else {
    let arr = [];
    arr = graphObject?.metadata?.y_series
      ? graphObject?.metadata?.y_series
      : Object.keys(graphObject?.widgetGraphConfig?.y_axis).map(
          (key) => graphObject?.widgetGraphConfig?.y_axis[key]
        );
    let filteredArray = arr?.filter((d) => d.attribute);
    let updatedYAxisLabel = [];
    filteredArray?.map((d, i) => {
      if (i >= 1) {
        updatedYAxisLabel = updatedYAxisLabel + ", " + d.trace_name;
      } else {
        updatedYAxisLabel = updatedYAxisLabel + d.trace_name;
      }
    });

    let ySeriesFromConfig = graphObject?.metadata?.y_series
      ? graphObject?.metadata?.y_series
      : Object?.entries(graphObject?.widgetGraphConfig?.y_axis);
    let flrSeriesExists = false;
    let graphConditionConfig =
      graphObject?.graphConditionConfig?.["time-label-attrs"];
    ySeriesFromConfig?.forEach((yseries, index) => {
      if (yseries?.attribute) {
        if (yseries && graphConditionConfig?.includes(yseries?.attribute))
          flrSeriesExists = true;
      } else if (
        yseries &&
        graphConditionConfig?.includes(yseries[1]?.attribute)
      )
        flrSeriesExists = true;
    });
    let multiData = [];
    let j = 0;
    let noOfIterationInColors = 0;
    let lengthOfColors = globalChartColor?.length;
    graphObject?.single[0]?.data?.map((d, i) => {
      let dataColor;
      if (
        d?.color !== undefined &&
        d?.color !== "#000000" &&
        d?.color !== null
      ) {
        dataColor = d?.color;
      } else {
        if (j >= lengthOfColors) {
          noOfIterationInColors = parseInt(j / lengthOfColors);
          let rem = parseInt(j % lengthOfColors);
          dataColor =
            noOfIterationInColors > 0
              ? newColorShadeInHex6(
                  globalChartColor[rem],
                  parseInt(noOfIterationInColors * 5)
                )
              : globalChartColor[j];
        } else {
          dataColor = globalChartColor[j];
        }
        j++;
      }
      if (d?.attribute?.toLowerCase() === "rating") {
        multiData.push({
          name: `${d?.name} ⭐`,
          data: d?.y,
          color: `${dataColor}99`,
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [0, `${dataColor}99`],
              [1, `${dataColor}1a`],
            ],
          },
        });
      } else {
        multiData.push({
          name: d?.name,
          data: d?.y,
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [0, `${dataColor}99`],
              [1, `${dataColor}1a`],
            ],
          },
          color: `${dataColor}99`,
        });
      }
    });
    let date_check = moment(
      graphObject?.single && graphObject?.single[0]?.x[0]
    ).isValid();
    const xaxisDataList = [];
    graphObject?.single[0]?.x?.map((el, i) => {
      xaxisDataList.push(`${el} ⭐`);
    });

    let x_date_part = graphObject?.metadata?.x_axis?.date_part;
    let x_date_agg = graphObject?.metadata?.x_axis?.date_aggregation;

    const durationType =
      (graphObject?.dashboard ||
        graphObject?.panes?.[graphObject?.index]?.is_widget_maker_open_obj
          ?.open_flag) &&
      handleDateFormat(
        graphObject?.panes,
        graphObject?.index,
        graphObject?.section_index,
        graphObject?.widget_index,
        graphObject?.metadata,
        graphObject?.metadata?.x_axis?.attribute,
        graphObject?.xaxis,
        graphObject?.metadata?.x_axis?.date_part,
        graphObject?.single[0]?.x,
        graphObject?.section,
        graphObject?.template_widget,
        graphObject?.shareTemplateData,
        graphObject?.pdfDownloadStatus,
        graphObject?.isScheduleReportOpen,
        graphObject?.screen,
        graphObject?.template_details
      );

    const obj = {
      chart: {
        //type: graphObject?.type,
        type: "areaspline",
        reflow: true,
        height: graphObject?.style?.height,
        style: {
          fontFamily: '"Roboto", sans-serif',
        },
      },
      title: {
        text: "",
      },
      xAxis: {
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
        title: {
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          text:
            graphObject?.metadata?.x_axis?.attribute &&
            graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
              graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
            )
              ? !x_date_part && !x_date_agg
                ? "Date"
                : !x_date_part && x_date_agg === "1h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "2h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "3h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "4h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "6h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "8h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "12h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "ww"
                ? "Week of Year"
                : !x_date_part && x_date_agg === "M"
                ? "Month of Year"
                : !x_date_part && x_date_agg === "Y"
                ? "Years"
                : graphObject?.metadata?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "1h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "2h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "3h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "4h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "6h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "8h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "12h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "M"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "D"
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.metadata?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.metadata?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.metadata?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.metadata?.x_axis?.date_part
              : !graphObject?.metadata?.x_axis?.attribute &&
                (graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                  "recorddate" ||
                  graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                    "createddate")
              ? graphObject?.widgetGraphConfig?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part
              : graphObject?.xaxis,
          enabled: true,
        },
        allowDecimals: false,
        categories:
          graphObject?.metadata &&
          (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
            graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
          ) ||
            graphObject?.xaxis === "Date") &&
          ((graphObject?.pdfDownloadStatus &&
            graphObject?.metadata?.x_axis?.date_part !== null) ||
            ((!graphObject?.pdfDownloadStatus ||
              graphObject?.isScheduleReportOpen) &&
              graphObject?.metadata?.x_axis?.date_part == null)) &&
          durationType
            ? durationType
            : graphObject?.metadata &&
              (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
                graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
              ) ||
                graphObject?.xaxis === "Date") &&
              graphObject?.metadata?.x_axis?.date_part !== null
            ? graphObject?.single[0]?.x?.map((e) => e)
            : // (graphObject?.metadata &&
            //   graphObject?.metadata?.x_axis?.attribute?.toLowerCase() === "recorddate") ||
            // (graphObject?.xaxis === "Date" &&
            //   graphObject?.metadata?.x_axis?.date_part == null)
            //   ? graphObject?.single[0]?.x?.map((e) =>
            //       moment(e).format("MMM DD YYYY")
            //     )
            graphObject?.xaxis === "Date" &&
              graphObject?.widgetGraphConfig?.x_axis?.date_part == null
            ? graphObject?.single[0]?.x?.map((e) =>
                moment(e).format("MMM DD YYYY")
              )
            : graphObject?.xaxis === "Review Ratings" && xaxisDataList
            ? xaxisDataList
            : graphObject?.single[0]?.x,
        labels: {
          formatter: function () {
            return date_check || graphObject?.pdfDownloadStatus
              ? this.value
              : this.value.length > 12 && graphObject?.single[0]?.x?.length > 5
              ? this.value?.slice(0, 12) +
                (this.value?.length > 12 ? "..." : "")
              : this.value;
          },
          rotation: graphObject?.single[0]?.x?.length > 5 ? -45 : 0,
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
      },
      yAxis: {
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
        min:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? 0.1
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? 0.1
            : flrSeriesExists
            ? 0
            : undefined, //aiLogScale:aiLogScale!==null? aiLogScale : log,
        minTickInterval: flrSeriesExists ? 60 : undefined,
        type:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? "logarithmic"
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? "logarithmic"
            : "", //aiLogScale:aiLogScale!==null? aiLogScale : log,
        title: {
          text:
            updatedYAxisLabel?.length > 0
              ? updatedYAxisLabel
              : graphObject?.yaxis,
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        labels: {
          formatter: flrSeriesExists
            ? function () {
                return SecondstoHumanReadable(this?.value, true);
              }
            : function () {
                return kFormatter(this.value);
              },
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        allowDecimals: false,
        //endOnTick: false,
      },

      tooltip: {
        enabled: true,
        useHTML: true,
        borderWidth: 0,
        shadow: false,
        backgroundColor: "transparent",
        headerFormat:
          '<div class="tooltip_chart"><span class="text-Darkgray fontSize-14 font-weight600 d-block mb-1">{series.name}</span> <div class="d-flex align-items-center"><span class="text-Darkgray mr-1"> {point.key} </span> ',
        //pointFormat: ",{point.y})"#3b5175,
        pointFormatter: function () {
          let clr = this?.color
            ? this?.color?.stops?.length
              ? this?.color?.stops?.[0]?.[1]
              : this?.color
            : this?.series?.color?.stops?.length
            ? this?.series?.color?.stops?.[0]?.[1]
            : this?.series?.color;
          return (
            '<span class="stackbar__tooltip" style="background-color:' +
            clr +
            ';">' +
            (flrSeriesExists
              ? SecondstoHumanReadable(this?.y)
              : this?.y?.toLocaleString()) +
            "</span></div></div>"
          );
        },
        style: {
          fontSize: "14px",
          fontFamily: '"Roboto", sans-serif',
          color: "#3b5175",
        },
      },
      plotOptions: {
        lineWidth: 3,
        areaspline: {
          animation: graphObject?.pdfDownloadStatus ? false : true,
          stacking: graphObject?.chartGlobalDataStacked
            ? "normal"
            : graphObject?.chartGlobalDataStacked == undefined
            ? "normal"
            : undefined,
          lineWidth: 3,
          marker: {
            enabled:
              graphObject?.chartMarkers === false
                ? graphObject?.chartMarkers
                : true,
            //radius:graphObject?.chartMarkers === true ? 4 : 0
            symbol: "circle",
            fillColor: "#FFFFFF",
            lineWidth: 3,
            lineColor: null, // inherit from series
          },
          showInLegend: true,
        },
        series: {
          dataLabels: {
            enabled: graphObject?.chartGlobalDataLabel ? true : false,
            style: {
              fontWeight: "500",
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
              fontSize: "10px",
              fontFamily: '"Roboto", sans-serif',
              textOutline: "none",
            },
            formatter: flrSeriesExists
              ? function () {
                  return (this.y / 60).toFixed(0) + " mins";
                }
              : function () {
                  return kFormatter(this.y);
                },
          },
        },
      },
      exporting: {
        filename: graphObject?.widget_name
          ? graphObject?.widget_name
          : graphObject?.type,
        enabled:
          graphObject?.pdfDownloadStatus ||
          graphObject?.pptDownloadStatus ||
          authParams?.screen_id
            ? false
            : true,
        menuItemDefinitions: {
          // Custom definition
          xsl: {
            onclick: () => {
              const excel = new Excel();
              let columns = [
                {
                  title: graphObject?.xaxis,
                  dataIndex: graphObject?.xaxis,
                },
              ];
              let datasource = [];
              let lengthOfMultiData = multiData?.length;
              let lengthOfColumns = lengthOfMultiData + 1;
              for (let i = 0; i < lengthOfColumns; i++) {
                if (i == 0) {
                  graphObject?.single[0]?.x?.forEach((xElem, x_index) => {
                    datasource[x_index] = { [columns[i]?.title]: xElem };
                  });
                } else {
                  columns[i] = {
                    title: multiData[i - 1]?.name,
                    dataIndex: multiData[i - 1]?.name,
                  };
                  multiData[i - 1]?.data?.forEach((data, data_index) => {
                    datasource[data_index] = {
                      ...datasource[data_index],
                      [columns[i]?.title]: flrSeriesExists
                        ? SecondstoHumanReadable(data)
                        : data,
                    };
                  });
                }
              }
              excel
                .addSheet("test")
                .addColumns(columns)
                .addDataSource(datasource, {
                  str2Percent: true,
                })
                .saveAs(
                  `${
                    graphObject?.widget_name
                      ? graphObject?.widget_name
                      : graphObject?.type
                  }.xlsx`
                );
            },
            text: "Download excel sheet",
          },
        },
        buttons: {
          contextButton: {
            menuItems:
              graphObject?.xaxis && graphObject?.yaxis
                ? [
                    "downloadPNG",
                    "downloadJPEG",
                    "downloadSVG",
                    "separator",
                    "xsl",
                  ]
                : ["downloadPNG", "downloadJPEG", "downloadSVG"],
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: multiData,
      legend: graphObject?.legend_position
        ? {
            itemWidth:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? undefined
                : 200,
            layout:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "horizontal"
                : "vertical",
            align:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "center"
                : graphObject?.legend_position,
            verticalAlign:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? graphObject?.legend_position
                : "middle",
            itemStyle: {
              fontFamily: '"Roboto", sans-serif',
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
            itemHoverStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
          }
        : {
            itemWidth: undefined,
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            itemStyle: {
              fontFamily: '"Roboto", sans-serif',
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
            itemHoverStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
          },
    };
    return obj;
  }
};

export const getSunburst = (graphObject, authParams) => {
  // let multiData = [];
  // single[0]?.ids?.map((d, i) => {
  // 	multiData.push({
  // 		id: d,getSunburst
  // 		parent: single[0]?.parent[i],
  // 		name: single[0]?.labels[i],
  // 		value: single[0]?.values[i],
  // 	});
  // });
  let j = 0;
  let noOfIterationInColors = 0;
  let lengthOfColors = globalChartColor?.length;
  let multiData = graphObject?.single?.map((el, i) => {
    let dataColor;
    if (
      el?.color !== undefined &&
      el?.color !== "#000000" &&
      el?.color !== null
    ) {
      dataColor = el?.color;
    } else {
      if (j >= lengthOfColors) {
        noOfIterationInColors = parseInt(j / lengthOfColors);
        let rem = parseInt(j % lengthOfColors);
        dataColor =
          noOfIterationInColors > 0
            ? newColorShadeInHex6(
                globalChartColor[rem],
                parseInt(noOfIterationInColors * 5)
              )
            : globalChartColor[j];
      } else {
        dataColor = globalChartColor[j];
      }
      j++;
    }
    return {
      id: el?.id,
      parent: el?.parent,
      name: el?.name,
      value: el?.value,
      // color:
      //   el?.color != undefined && el?.color != "#000000"
      //     ? el?.color
      //     : undefined,
      color: authParams?.screen_id
        ? dataColor
        : {
            radialGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7,
            },
            stops: [
              [0, `${dataColor}99`],
              [1, dataColor], // darken
            ],
          },
    };
  });
  //let multiData = graphObject?.single;

  if (
    authParams?.screen_id === "000-000-552" &&
    graphObject?.screen &&
    multiData?.length
  ) {
    let categoryFilterName = null;
    let categoryFilterValue = null;

    let subCategoryFilterName = null;
    let subCategoryFilterValue = null;

    let userLocationFilterValue = false;
    graphObject?.screen?.category_screen_filters?.map((d) => {
      if (d?.attribute === "Category") {
        categoryFilterValue = d?.chart_value;
        categoryFilterName = d?.columns?.[0].name;
      }
      if (d?.attribute === "SubCategory") {
        subCategoryFilterValue = d?.chart_value;
        subCategoryFilterName = d?.columns?.[0].name;
      }
      if (d?.attribute === "UserLocation") {
        userLocationFilterValue = true;
      }
    });
    multiData?.map((d) => {
      if (categoryFilterName && !subCategoryFilterName) {
        if (d?.name === categoryFilterName) {
          d.color = "#185edf";
          d.dataLabels = {
            color: "#fff",
          };
        } else {
          d.color = "#2d416f";
          d.dataLabels = {
            color: "#fff",
          };
        }
      } else if (categoryFilterName && subCategoryFilterName) {
        if (userLocationFilterValue && d?.name === subCategoryFilterName) {
          d.color = "#185edf";
          d.dataLabels = {
            color: "#fff",
          };
        } else if (
          !userLocationFilterValue &&
          d?.name === subCategoryFilterName &&
          d?.value === subCategoryFilterValue
        ) {
          d.color = "#185edf";
          d.dataLabels = {
            color: "#fff",
          };
        } else {
          d.color = "#2d416f";
          d.dataLabels = {
            color: "#fff",
          };
        }
      }
    });
  }

  const obj = {
    chart: {
      type: graphObject?.type,
      height: graphObject?.style?.height,
      reflow: true,
      style: {
        fontFamily: '"Roboto", sans-serif',
      },
    },
    // Let the center circle be transparent
    colors: ["transparent"].concat(globalChartColor),
    //colors: (globalChartColor),
    title: {
      text: "",
    },
    // subtitle: {
    // 	text: multiData[0]?.parent,
    // 	align: "center",
    // 	verticalAlign: "middle",
    // 	y: 0,
    // },
    series: [
      {
        type: "sunburst",
        size: graphObject?.pdfDownloadStatus ? "70%" : null,
        // innerSize: "30%",
        data: multiData,
        name: "Root",
        allowDrillToNode: !graphObject?.metadata?.chart?.chart_settings
          ?.allow_deepdive
          ? true
          : false,
        cursor: "pointer",
        borderWidth: 2,
        borderColor: authParams?.theme_type === "1" ? "#1b2f50" : "#fff",
        borderRadius: 4,
        dataLabels: {
          format: "{point.name}",
          filter: {
            property: "innerArcLength",
            operator: ">",
            value: 1,
          },
          rotationMode: "circular",
          // style: {
          // 	fontSize: "12px",
          // 	//textOutline: 0,
          // 	//fontWeight:"normal",
          // },
          style:
            graphObject?.pdfDownloadStatus ||
            graphObject?.pptDownloadStatus ||
            authParams?.screen_id
              ? {
                  //color: '#869DAD',
                  fontFamily: '"Roboto", sans-serif',
                  //fill: '#869DAD',
                  fontWeight: "bold",
                  textOutline: "none",
                }
              : {
                  //color: '#869DAD',
                  fontSize: "12px",
                  fontFamily: '"Roboto", sans-serif',
                  //fill: '#869DAD',
                  fontWeight: "bold",
                  textOutline: "none",
                },
        },
        levels: [
          {
            level: 1,
            levelIsConstant: false,
            dataLabels: {
              filter: {
                property: "outerArcLength",
                operator: ">",
                value: 1,
              },
              style: authParams?.screen_id
                ? { color: "#f5f6f8" }
                : graphObject?.pdfDownloadStatus ||
                  graphObject?.pptDownloadStatus
                ? { color: "#3b5175" }
                : {
                    fontSize: "12px",
                    color: "#3b5175",
                  },
            },
          },
          {
            level: 2,
            colorByPoint: true,
            dataLabels:
              graphObject?.pdfDownloadStatus || graphObject?.pptDownloadStatus
                ? {}
                : {
                    style: authParams?.screen_id
                      ? { color: "#f5f6f8" }
                      : {
                          fontSize: "8px",
                        },
                  },
          },
          {
            level: 3,
            colorVariation: {
              key: "brightness",
              to: 0.3,
            },
            dataLabels:
              graphObject?.pdfDownloadStatus || graphObject?.pptDownloadStatus
                ? {}
                : {
                    style: authParams?.screen_id
                      ? { color: "#f5f6f8" }
                      : {
                          fontSize: "6px",
                        },
                  },
          },
          {
            level: 4,
            colorVariation: {
              key: "brightness",
              to: 0.8,
            },
            dataLabels: {
              style:
                graphObject?.pdfDownloadStatus ||
                graphObject?.pptDownloadStatus ||
                authParams?.screen_id
                  ? {}
                  : {
                      fontSize: "6px",
                    },
            },
          },
        ],
      },
    ],
    exporting: {
      filename: graphObject?.widget_name
        ? graphObject?.widget_name
        : graphObject?.type,
      enabled:
        graphObject?.pdfDownloadStatus ||
        graphObject?.pptDownloadStatus ||
        authParams?.screen_id
          ? false
          : true,
      buttons: {
        contextButton: {
          menuItems: [
            "downloadPNG",
            "downloadJPEG",
            "downloadSVG",
            //"separator",
          ],
        },
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      useHTML: true,
      borderWidth: 0,
      shadow: false,
      backgroundColor: "transparent",
      headerFormat: "",
      pointFormatter: function () {
        let clr = this?.color
          ? this?.color?.stops?.length
            ? this?.color?.stops?.[0]?.[1]
            : this?.color
          : this?.series?.color?.stops?.length
          ? this?.series?.color?.stops?.[0]?.[1]
          : this?.series?.color;
        return (
          '<div class="tooltip_chart d-flex align-items-center"><span class="text-Darkgray fontSize-14 font-weight600 mr-1">' +
          this?.name +
          "</span>" +
          '<span class="stackbar__tooltip" style="background-color:' +
          clr +
          ';">' +
          this?.value?.toLocaleString() +
          "</span></div>"
        );
      },
    },
  };

  return obj;
};

export const getBarChart = (graphObject, authParams) => {
  const xaxisDataList = [];
  graphObject?.single[0]?.x?.map((el, i) => {
    xaxisDataList.push(`${el} ⭐`);
  });
  let j = 0;
  let noOfIterationInColors = 0;
  let lengthOfColors = globalChartColor?.length;
  if (graphObject?.single[0]?.y_axis) {
    let obj = { ...graphObject };
    obj.single = graphObject.single[0];
    return getCombination(obj, authParams);
  } else {
    let ySeriesFromConfig = graphObject?.metadata?.y_series
      ? graphObject?.metadata?.y_series
      : Object?.entries(graphObject?.widgetGraphConfig?.y_axis);
    let flrSeriesExists = false;
    let graphConditionConfig =
      graphObject?.graphConditionConfig?.["time-label-attrs"];
    ySeriesFromConfig?.forEach((yseries, index) => {
      if (yseries?.attribute) {
        if (yseries && graphConditionConfig?.includes(yseries?.attribute))
          flrSeriesExists = true;
      } else if (
        yseries &&
        graphConditionConfig?.includes(yseries[1]?.attribute)
      )
        flrSeriesExists = true;
    });
    let seriesData = [];
    let seriesColorsFlag = false;
    let date_check = moment(
      graphObject?.single && graphObject?.single[0]?.x[0]
    ).isValid();
    if (
      graphObject?.single[0]?.colors != undefined &&
      graphObject?.single[0]?.colors?.length > 0
    ) {
      seriesColorsFlag = true;
      seriesData = graphObject?.single[0]?.y?.map((yElem, i) => {
        let dataColor;
        if (
          graphObject?.single[0]?.colors != undefined &&
          graphObject?.single[0]?.colors[i] !== undefined &&
          graphObject?.single[0]?.colors[i] !== "#000000" &&
          graphObject?.single[0]?.colors[i] !== null
        ) {
          dataColor = graphObject?.single[0]?.colors[i];
        } else {
          if (j >= lengthOfColors) {
            noOfIterationInColors = parseInt(j / lengthOfColors);
            let rem = parseInt(j % lengthOfColors);
            dataColor =
              noOfIterationInColors > 0
                ? newColorShadeInHex6(
                    globalChartColor[rem],
                    parseInt(noOfIterationInColors * 5)
                  )
                : globalChartColor[j];
          } else {
            dataColor = globalChartColor[j];
          }
          j++;
        }
        let lighterColor = newColorShadeInHex6(dataColor, 60);
        let darkerColor = dataColor;
        return {
          y: yElem,
          color: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1,
            },
            stops: [
              [0, darkerColor],
              [1, lighterColor],
            ],
          },
        };
      });
    }

    const totalCount = getTotalCount(graphObject?.single[0]?.y);

    const durationType =
      (graphObject?.dashboard ||
        graphObject?.panes?.[graphObject?.index]?.is_widget_maker_open_obj
          ?.open_flag) &&
      handleDateFormat(
        graphObject?.panes,
        graphObject?.index,
        graphObject?.section_index,
        graphObject?.widget_index,
        graphObject?.metadata,
        graphObject?.metadata?.x_axis?.attribute,
        graphObject?.xaxis,
        graphObject?.metadata?.x_axis?.date_part,
        graphObject?.single[0]?.x,
        graphObject?.section,
        graphObject?.template_widget,
        graphObject?.shareTemplateData,
        graphObject?.pdfDownloadStatus,
        graphObject?.isScheduleReportOpen,
        graphObject?.screen,
        graphObject?.template_details
      );

    let x_date_part = graphObject?.metadata?.x_axis?.date_part;
    let x_date_agg = graphObject?.metadata?.x_axis?.date_aggregation;
    let bandColor = 0;
    let bandColorCount = 0;
    if (
      graphObject?.metadata?.x_axis?.attribute?.toLowerCase() ===
        "flrbenchmark" ||
      graphObject?.metadata?.x_axis?.attribute?.toLowerCase() ===
        "resolutionbenchmark"
    ) {
      for (let i = 0; i < graphObject?.single[0]?.colors?.length; i++) {
        if (!bandColor) {
          bandColor = graphObject?.single[0]?.colors[i];
        }
        if (bandColor && bandColor !== graphObject?.single[0]?.colors[i]) {
          bandColorCount = i;
          break;
        }
      }
    }

    const configObj = {
      chart: {
        height: graphObject?.style?.height,
        type: graphObject?.type === "horizontal-bar" ? "bar" : "column",
        //marginTop: 50,
        marginRight: graphObject?.type === "horizontal-bar" ? 30 : undefined,
        reflow: true,
        style: {
          fontFamily: '"Roboto", sans-serif',
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      title: {
        text: "",
        style: {
          fontWeight: "bold",
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },

      xAxis: {
        plotBands:
          graphObject?.metadata?.x_axis?.attribute?.toLowerCase() ===
            "flrbenchmark" ||
          graphObject?.metadata?.x_axis?.attribute?.toLowerCase() ===
            "resolutionbenchmark"
            ? [
                {
                  color: "#5ED14230",
                  from: -1,
                  to: bandColorCount - 0.5,
                  id: "green_breach",
                  zIndex: 1,
                },
                {
                  color: "#FF5D4830",
                  from: bandColorCount - 0.5,
                  to: graphObject?.single?.[0]?.x?.length,
                  id: "red_breach",
                  zIndex: 1,
                },
              ]
            : undefined,
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
        title: {
          style: {
            fontWeight: "bold",
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          text:
            graphObject?.metadata?.x_axis?.attribute &&
            graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
              graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
            )
              ? graphObject?.metadata?.x_axis?.attribute?.toLowerCase() ===
                  "flrbenchmark" ||
                graphObject?.metadata?.x_axis?.attribute?.toLowerCase() ===
                  "resolutionbenchmark"
                ? ""
                : !x_date_part && !x_date_agg
                ? "Date"
                : !x_date_part && x_date_agg === "1h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "2h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "3h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "4h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "6h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "8h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "12h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "ww"
                ? "Week of Year"
                : !x_date_part && x_date_agg === "M"
                ? "Month of Year"
                : !x_date_part && x_date_agg === "Y"
                ? "Years"
                : graphObject?.metadata?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "1h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "2h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "3h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "4h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "6h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "8h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "12h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "M"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "D"
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.metadata?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.metadata?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.metadata?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.metadata?.x_axis?.date_part
              : !graphObject?.metadata?.x_axis?.attribute &&
                (graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                  "recorddate" ||
                  graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                    "createddate")
              ? graphObject?.widgetGraphConfig?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part
              : graphObject?.xaxis,
          enabled: graphObject?.chartAxisLabel ? true : false,
        },
        categories:
          graphObject?.metadata &&
          (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
            graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
          ) ||
            graphObject?.xaxis === "Date") &&
          ((graphObject?.pdfDownloadStatus &&
            graphObject?.metadata?.x_axis?.date_part !== null) ||
            ((!graphObject?.pdfDownloadStatus ||
              graphObject?.isScheduleReportOpen) &&
              graphObject?.metadata?.x_axis?.date_part == null)) &&
          durationType
            ? durationType
            : graphObject?.metadata &&
              (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
                graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
              ) ||
                graphObject?.xaxis === "Date") &&
              graphObject?.metadata?.x_axis?.date_part !== null
            ? graphObject?.single[0]?.x?.map((e) => e)
            : // (graphObject?.metadata &&
            //   graphObject?.metadata?.x_axis?.attribute?.toLowerCase() === "recorddate") ||
            // (graphObject?.xaxis === "Date" &&
            //   graphObject?.metadata?.x_axis?.date_part == null)
            //   ? graphObject?.single[0]?.x?.map((e) =>
            //       moment(e).format("MMM DD YYYY")
            //     )
            graphObject?.xaxis === "Date" &&
              graphObject?.widgetGraphConfig?.x_axis?.date_part == null
            ? graphObject?.single[0]?.x?.map((e) =>
                moment(e).format("MMM DD YYYY")
              )
            : graphObject?.xaxis === "Review Ratings" && xaxisDataList
            ? xaxisDataList
            : graphObject?.single[0]?.x,
        // categories: graphObject?.single[0]?.x,
        // categories: single[0]?.x?.map(
        // 	(e) => e?.slice(0, 15) + (e?.length > 15 ? "..." : "")
        // ),
        labels: {
          useHTML: true, // Enable HTML rendering
          formatter:
            graphObject?.type === "horizontal-bar" // formatting for horizontal bar
              ? function () {
                  return date_check || graphObject?.pdfDownloadStatus
                    ? this.value
                    : this.value.length > 12 &&
                      graphObject?.single[0]?.x?.length > 5
                    ? this.value?.slice(0, 12) +
                      (this.value?.length > 12 ? "..." : "")
                    : this.value;
                }
              : function () {
                  // formatting for all other cases
                  if (date_check || graphObject?.pdfDownloadStatus) {
                    return this.value; // No formatting needed in this case
                  }

                  const text = this.value;
                  const maxLengthPerLine = 24;

                  if (text.length <= maxLengthPerLine) {
                    return `<div style="text-align: right;">${text}</div>`; // Single-line, right-aligned
                  }

                  // Find the last space before maxLengthPerLine for a natural word break
                  let firstLineEnd = text.lastIndexOf(" ", maxLengthPerLine);
                  if (firstLineEnd === -1) firstLineEnd = maxLengthPerLine; // If no space found, force split

                  const firstLine = text.slice(0, firstLineEnd);
                  let secondLine = text.slice(firstLineEnd + 1);

                  // Truncate the second line if it exceeds maxLengthPerLine
                  if (secondLine.length > maxLengthPerLine) {
                    secondLine =
                      secondLine.slice(0, maxLengthPerLine - 3) + "...";
                  }

                  // Return wrapped text with right alignment using div and HTML
                  return `<div style="text-align: right;">${firstLine}<br>${secondLine}</div>`;
                },
          rotation:
            graphObject?.type === "horizontal-bar"
              ? 0
              : graphObject?.single[0]?.x?.length > 5
              ? -90
              : 0,
          //style: { fontWeight: "normal",color:"#869DAD" },
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
      },
      yAxis: {
        min:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? 0.1
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? 0.1
            : flrSeriesExists
            ? 0
            : undefined, //aiLogScale:aiLogScale!==null? aiLogScale : log,
        minTickInterval: flrSeriesExists
          ? 60
          : graphObject?.scaleFromZeroToOne
          ? 1
          : undefined,
        type:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? "logarithmic"
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? "logarithmic"
            : "", //aiLogScale:aiLogScale!==null? aiLogScale : log,
        // min: 0,
        title: {
          text: graphObject?.yaxis,
          //style: { fontWeight: "normal",color:"#869DAD" },
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          enabled: graphObject?.chartAxisLabel ? true : false,
        },
        // labels: {
        //   //style: { fontWeight: "normal",color:"#869DAD" },
        // },
        labels: {
          formatter: flrSeriesExists
            ? function () {
                return SecondstoHumanReadable(this?.value, true);
              }
            : function () {
                return graphObject?.scaleFromZeroToOne &&
                  !Number?.isInteger(this?.value)
                  ? kFormatter(Math?.floor(this?.value))
                  : kFormatter(this?.value);
              },
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          enabled: graphObject?.chartAxisLabel ? true : false,
        },
        allowDecimals: false,
        endOnTick: graphObject?.chartAxisLabel ? true : false,
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },

      exporting: {
        filename: graphObject?.widget_name
          ? graphObject?.widget_name
          : graphObject?.type,
        enabled:
          graphObject?.pdfDownloadStatus ||
          graphObject?.pptDownloadStatus ||
          authParams?.screen_id
            ? false
            : true,
        menuItemDefinitions: {
          // Custom definition
          xsl: {
            onclick: () => {
              const excel = new Excel();
              let columns = [
                {
                  title: graphObject?.xaxis,
                  dataIndex: graphObject?.xaxis,
                },
                {
                  title: graphObject?.yaxis,
                  dataIndex: graphObject?.yaxis,
                },
              ];

              let datasource = graphObject?.single[0]?.y?.map((yElem, i) => {
                return {
                  [columns[0]?.title]: `${graphObject?.single[0]?.x[i]} ${
                    columns[0]?.title === "Review Ratings" ? "*" : ""
                  }`,
                  [columns[1]?.title]: flrSeriesExists
                    ? SecondstoHumanReadable(yElem)
                    : yElem,
                };
              });
              excel
                .addSheet("test")
                .addColumns(columns)
                .addDataSource(datasource, {
                  str2Percent: true,
                })
                .saveAs(
                  `${
                    graphObject?.widget_name
                      ? graphObject?.widget_name
                      : graphObject?.type
                  }.xlsx`
                );
            },
            text: "Download excel sheet",
          },
        },
        buttons: {
          contextButton: {
            menuItems:
              graphObject?.xaxis && graphObject?.yaxis
                ? [
                    "downloadPNG",
                    "downloadJPEG",
                    "downloadSVG",
                    "separator",
                    "xsl",
                  ]
                : ["downloadPNG", "downloadJPEG", "downloadSVG"],
          },
        },
      },
      credits: {
        enabled: false,
      },
      // legend: {
      // 	reversed: true,
      // },
      tooltip: {
        enabled: true,
        useHTML: true,
        //headerFormat: "X: {point.key}<br/>",
        //pointFormat: "Y :{point.y}",
        shadow: {
          color: "#0000001A",
        },
        style: {
          fontSize: "14px",
          fontFamily: '"Roboto", sans-serif',
          color: "#3b5175",
        },
        className: "custom_background",
        formatter: function () {
          let clr = this?.color
            ? this?.color?.stops?.length
              ? this?.color?.stops?.[0]?.[1]
              : this?.color
            : this?.series?.color?.stops?.length
            ? this?.series?.color?.stops?.[0]?.[1]
            : this?.points?.[0]?.color?.stops?.length
            ? this?.points?.[0]?.color?.stops?.[0]?.[1]
            : this?.series?.color;
          let valueOfY =
            this.point?.y >= 0 ? this.point?.y : this?.points?.[0]?.y;
          let yTooltipValue = flrSeriesExists
            ? SecondstoHumanReadable(valueOfY)
            : this.point?.y >= 0
            ? this.point?.y?.toLocaleString()
            : this?.points?.[0]?.y;
          let xTooltipValue = this.point?.category
            ? this.point?.category
            : this?.points?.[0]?.x;
          return (
            "<div class='tooltip_chart--dark d-flex align-items-center fontSize-14 font-weight600'><span class='text-Darkgray  d-block mb-1'> <span class='text-Darkgray mr-1'> X: </span>" +
            xTooltipValue +
            " </span></div><div class='tooltip_chart--dark d-flex align-items-center fontSize-14 '><span class='text-Darkgray font-weight600 mr-1'> Y : </span><span class='stackbar__tooltip' style='background-color:" +
            clr +
            ";'>" +
            yTooltipValue +
            " | " +
            ((valueOfY / totalCount) * 100).toFixed(1)?.replace(/\.0$/, "") +
            "%" +
            "</span></div>"
          );
        },
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: graphObject?.chartGlobalDataLabel ? true : false,
            style: {
              fontWeight: "500",
              fontSize: "10px",
              fontFamily: '"Roboto", sans-serif',
              color:
                authParams?.theme_type === "1"
                  ? !graphObject?.chartAxisLabel
                    ? "#fffff"
                    : "#b1bdd0"
                  : "#3B5175",
              textOutline: "none",
              fill: "#ffffff",
            },
            crop: graphObject?.chartAxisLabel ? true : false,
            overflow: graphObject?.chartAxisLabel ? "justify" : "allow",
            formatter: flrSeriesExists
              ? function () {
                  return (this.y / 60).toFixed(0) + " mins";
                }
              : graphObject?.agentActivit
              ? function () {
                  return (
                    kFormatter(this.y) +
                    " | " +
                    ((this?.y / totalCount) * 100)
                      .toFixed(1)
                      ?.replace(/\.0$/, "") +
                    "%"
                  );
                }
              : function () {
                  return kFormatter(this.y);
                },
          },
          animation: graphObject?.pdfDownloadStatus ? false : true,
          // : {
          //     defer: 1000,
          //   },
          pointPadding: 0.1,
          groupPadding: 0,
          borderWidth: 0,
          shadow: false,
          //pointWidth: 28,
          showInLegend: false,
          borderRadius: {
            radius: 10,
          },

          borderColor: authParams?.theme_type === "1" ? "#1b2f50" : "#fff",
        },
      },

      series: [
        {
          name: "",
          data: seriesColorsFlag ? seriesData : graphObject?.single[0]?.y,
          color: seriesColorsFlag
            ? undefined
            : {
                linearGradient: {
                  x1: 0,
                  x2: 0,
                  y1: 0,
                  y2: 1,
                },
                stops: !seriesColorsFlag
                  ? graphObject?.single[0]?.color != undefined &&
                    graphObject?.single[0]?.color != "#000000"
                    ? [
                        [0, graphObject?.single[0]?.color],
                        [1, `${graphObject?.single[0]?.color}80`],
                      ]
                    : [
                        [0, globalChartColor[0]],
                        [1, `${globalChartColor[0]}80`],
                      ]
                  : [],
              },
        },
      ],
      legend: graphObject?.legend_position
        ? {
            itemWidth:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? undefined
                : 200,
            layout:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "horizontal"
                : "vertical",
            align:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "center"
                : graphObject?.legend_position,
            verticalAlign:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? graphObject?.legend_position
                : "middle",
            itemStyle: {
              fontFamily: '"Roboto", sans-serif',
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
            itemHoverStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
          }
        : {
            itemWidth: undefined,
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            itemStyle: {
              fontFamily: '"Roboto", sans-serif',
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
            itemHoverStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
          },
    };
    configObj["customLegend"] =
      graphObject?.single && graphObject?.single?.[0]?.legends ? true : false;
    return configObj;
  }
};

export const getStackBarChart = (graphObject, authParams) => {
  const xaxisDataList = [];
  graphObject?.single[0]?.x?.map((el, i) => {
    xaxisDataList.push(`${el} ⭐`);
  });
  let ySeriesFromConfig = graphObject?.metadata?.y_series
    ? graphObject?.metadata?.y_series
    : Object?.entries(graphObject?.widgetGraphConfig?.y_axis);
  let flrSeriesExists = false;
  let graphConditionConfig =
    graphObject?.graphConditionConfig?.["time-label-attrs"];
  ySeriesFromConfig?.forEach((yseries, index) => {
    if (yseries?.attribute) {
      if (yseries && graphConditionConfig?.includes(yseries?.attribute))
        flrSeriesExists = true;
    } else if (yseries && graphConditionConfig?.includes(yseries[1]?.attribute))
      flrSeriesExists = true;
  });
  let twoMonthsDuration = getCustomizedDate(6, "Days");
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

  let ticketOverviewId =
    graphObject?.index >= 0 &&
    graphObject?.panes[graphObject?.index]?.template_id;
  let startdate =
    graphObject?.index >= 0 &&
    graphObject?.panes[graphObject?.index]?.duration?.from
      ? graphObject?.index >= 0 &&
        graphObject?.panes[graphObject?.index]?.duration?.from
      : defaultDuration?.from;
  let endDate =
    graphObject?.index >= 0 &&
    graphObject?.panes[graphObject?.index]?.duration?.to
      ? graphObject?.index >= 0 &&
        graphObject?.panes[graphObject?.index]?.duration?.to
      : defaultDuration?.to;
  let diffDay = moment(endDate).diff(moment(startdate), "day");

  let date_check = moment(
    graphObject?.single && graphObject?.single[0]?.x[0]
  ).isValid();
  if (graphObject?.single[0]?.y_axis) {
    let obj = { ...graphObject };
    obj.single = graphObject.single[0];
    return getCombination(obj, authParams);
  } else {
    let arr = [];
    arr = graphObject?.metadata?.y_series
      ? graphObject?.metadata?.y_series
      : Object.keys(graphObject?.widgetGraphConfig?.y_axis).map(
          (key) => graphObject?.widgetGraphConfig?.y_axis[key]
        );
    let filteredArray = arr?.filter((d) => d.attribute);
    let updatedYAxisLabel = [];
    filteredArray?.map((d, i) => {
      if (i >= 1) {
        updatedYAxisLabel = updatedYAxisLabel + ", " + d.trace_name;
      } else {
        updatedYAxisLabel = updatedYAxisLabel + d.trace_name;
      }
    });
    let j = 0;
    let noOfIterationInColors = 0;
    let lengthOfColors = globalChartColor?.length;
    let yAxisData = graphObject?.single?.map((e) => {
      return e?.data?.map((el, i) => {
        let dataColor;
        if (
          el?.color !== undefined &&
          el?.color !== "#000000" &&
          el?.color !== null
        ) {
          dataColor = el?.color;
        } else {
          if (j >= lengthOfColors) {
            noOfIterationInColors = parseInt(j / lengthOfColors);
            let rem = parseInt(j % lengthOfColors);
            dataColor =
              noOfIterationInColors > 0
                ? newColorShadeInHex6(
                    globalChartColor[rem],
                    parseInt(noOfIterationInColors * 5)
                  )
                : globalChartColor[j];
          } else {
            dataColor = globalChartColor[j];
          }
          j++;
        }
        let lighterColor = graphObject?.chartGradientColor
          ? newColorShadeInHex6(dataColor, 60)
          : null;
        let darkerColor = dataColor;
        return {
          name: el?.name,
          data: el?.y,
          color: graphObject?.chartGradientColor
            ? {
                linearGradient: {
                  x1: 0,
                  x2: 0,
                  y1: 0,
                  y2: 1,
                },
                stops: [
                  [0, darkerColor],
                  [1, lighterColor],
                ],
              }
            : dataColor,
          attribute: el?.attribute,
        };
      });
    });

    let xAxisData = [];
    graphObject?.single?.forEach((e) => {
      xAxisData = [...xAxisData, ...e?.x];
    });

    let yAxisdataRating = [];
    yAxisData[0] &&
      yAxisData[0].map((el, i) => {
        if (el.attribute?.toLowerCase() === "rating") {
          yAxisdataRating.push({ ...el, name: `${el.name} ⭐` });
        } else {
          yAxisdataRating.push({ ...el, name: el.name });
        }
      });

    const durationType =
      (graphObject?.dashboard ||
        graphObject?.panes?.[graphObject?.index]?.is_widget_maker_open_obj
          ?.open_flag) &&
      handleDateFormat(
        graphObject?.panes,
        graphObject?.index,
        graphObject?.section_index,
        graphObject?.widget_index,
        graphObject?.metadata,
        graphObject?.metadata?.x_axis?.attribute,
        graphObject?.xaxis,
        graphObject?.metadata?.x_axis?.date_part,
        graphObject?.single[0]?.x,
        graphObject?.section,
        graphObject?.template_widget,
        graphObject?.shareTemplateData,
        graphObject?.pdfDownloadStatus,
        graphObject?.isScheduleReportOpen,
        graphObject?.screen,
        graphObject?.template_details
      );

    let x_date_part = graphObject?.metadata?.x_axis?.date_part;
    let x_date_agg = graphObject?.metadata?.x_axis?.date_aggregation;

    // graphObject?.ticket_chart_type,
    // graphObject?.ticket_status_duration
    // );

    const configObj = {
      chart: {
        height: graphObject?.style.height,
        type: graphObject?.type === "horizontal-bar" ? "bar" : "column",
        // marginTop: 50,
        marginRight: graphObject?.type === "horizontal-bar" ? 30 : undefined,
        reflow: true,
        style: {
          fontFamily: '"Roboto", sans-serif',
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      title: {
        text: "",
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      xAxis: {
        scrollbar: {
          enabled:
            graphObject?.single?.[0]?.x?.length > 10 &&
            graphObject?.metadata?.widget_id === "000-700-003"
              ? true
              : false,
        },
        min:
          graphObject?.single?.[0]?.x?.length > 10 &&
          graphObject?.metadata?.widget_id === "000-700-003"
            ? 0
            : undefined,
        max:
          graphObject?.single?.[0]?.x?.length > 10 &&
          graphObject?.metadata?.widget_id === "000-700-003"
            ? 9
            : undefined,
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
        title: {
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          text:
            graphObject?.metadata?.x_axis?.attribute &&
            graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
              graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
            )
              ? !x_date_part && !x_date_agg
                ? "Date"
                : !x_date_part && x_date_agg === "1h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "2h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "3h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "4h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "6h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "8h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "12h"
                ? "Hour of Day"
                : !x_date_part && x_date_agg === "ww"
                ? "Week of Year"
                : !x_date_part && x_date_agg === "M"
                ? "Month of Year"
                : !x_date_part && x_date_agg === "Y"
                ? "Years"
                : graphObject?.metadata?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "1h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "2h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "3h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "4h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "6h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "8h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "12h"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "M"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "D"
                ? "Date"
                : graphObject?.metadata?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.metadata?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.metadata?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.metadata?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.metadata?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.metadata?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.metadata?.x_axis?.date_part
              : !graphObject?.metadata?.x_axis?.attribute &&
                (graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                  "recorddate" ||
                  graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                    "createddate")
              ? graphObject?.widgetGraphConfig?.x_axis?.date_part === null
                ? "Date"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "hh"
                ? "Hour of Day"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dd"
                ? "Day of Month"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dw"
                ? "Day of Week"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "mm"
                ? "Month of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "ww"
                ? "Week of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part === "qq"
                ? "Quarter of Year"
                : graphObject?.widgetGraphConfig?.x_axis?.date_part
              : graphObject?.xaxis,
          enabled: true,
        },
        // categories: single[0]?.x?.map(
        // 	(e) => e?.slice(0, 15) + (e?.length > 15 ? "..." : "")
        // ),
        categories:
          graphObject?.dashboard &&
          graphObject?.ticket_widget_id === "tickets_overview_1" &&
          ticketOverviewId === "000-000-004" &&
          // diffDay < 6 &&
          graphObject?.ticket_chart_type !== "W" &&
          graphObject?.ticket_chart_type !== "M" &&
          graphObject?.ticket_chart_type !== "Y" &&
          (graphObject?.ticket_status_duration === 60 ||
            graphObject?.ticket_status_duration === 120 ||
            graphObject?.ticket_status_duration === 180 ||
            graphObject?.ticket_status_duration === 240 ||
            graphObject?.ticket_status_duration === 360 ||
            graphObject?.ticket_status_duration === 480 ||
            graphObject?.ticket_status_duration === 720)
            ? graphObject?.single[0]?.x?.map((e) =>
                moment(e).format("D MMM H:mm")
              )
            : graphObject?.dashboard &&
              graphObject?.ticket_widget_id === "tickets_overview_1" &&
              ticketOverviewId === "000-000-004" &&
              // diffDay >= 6  &&
              graphObject?.ticket_chart_type !== "W" &&
              graphObject?.ticket_chart_type !== "M" &&
              graphObject?.ticket_chart_type !== "Y"
            ? graphObject?.single[0]?.x?.map((e) => moment(e).format("D MMM"))
            : graphObject?.dashboard &&
              graphObject?.ticket_widget_id === "tickets_overview_1" &&
              ticketOverviewId === "000-000-004" &&
              diffDay >= 6 &&
              graphObject?.ticket_chart_type === "M"
            ? graphObject?.single[0]?.x?.map((e) =>
                moment(e).format("MMM YYYY")
              )
            : graphObject?.dashboard &&
              graphObject?.ticket_widget_id === "tickets_overview_1" &&
              ticketOverviewId === "000-000-004" &&
              diffDay >= 6 &&
              (graphObject?.ticket_chart_type === "W" ||
                graphObject?.ticket_chart_type === "Y")
            ? graphObject?.single[0]?.x?.map((e) => e)
            : // : (graphObject?.metadata &&
            //     graphObject?.metadata?.x_axis?.attribute?.toLowerCase() === "recorddate") ||
            //   (graphObject?.xaxis === "Date" &&
            //     graphObject?.metadata?.x_axis?.date_part == null)
            // ? graphObject?.single[0]?.x?.map((e) =>
            //     moment(e).format("MMM DD YYYY")
            //   )
            graphObject?.metadata &&
              (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
                graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
              ) ||
                graphObject?.xaxis === "Date") &&
              ((graphObject?.pdfDownloadStatus &&
                graphObject?.metadata?.x_axis?.date_part !== null) ||
                ((!graphObject?.pdfDownloadStatus ||
                  graphObject?.isScheduleReportOpen) &&
                  graphObject?.metadata?.x_axis?.date_part == null)) &&
              durationType
            ? durationType
            : graphObject?.metadata &&
              (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
                graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
              ) ||
                graphObject?.xaxis === "Date") &&
              graphObject?.metadata?.x_axis?.date_part !== null
            ? graphObject?.single[0]?.x?.map((e) => e)
            : graphObject?.xaxis === "Date" &&
              graphObject?.widgetGraphConfig?.x_axis?.date_part == null
            ? graphObject?.single[0]?.x?.map((e) =>
                moment(e).format("MMM DD YYYY")
              )
            : graphObject?.xaxis === "Review Ratings" && xaxisDataList
            ? xaxisDataList
            : graphObject?.single[0]?.x,
        labels: {
          formatter: function () {
            return date_check || graphObject?.pdfDownloadStatus
              ? this.value
              : this.value.length > 12 && graphObject?.single[0]?.x?.length > 5
              ? this.value?.slice(0, 12) +
                (this.value?.length > 12 ? "..." : "")
              : this.value;
          },
          rotation:
            graphObject?.type === "horizontal-bar"
              ? 0
              : graphObject?.single[0]?.x?.length > 5
              ? -45
              : 0,
          //style: { fontWeight: "normal",color:"#869DAD" },
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        // labels: {
        //   formatter: function () {
        //     return this.value.length > 12 &&
        //       graphObject?.single[0]?.x?.length > 5
        //       ? this.value?.slice(0, 12) +
        //           (this.value?.length > 12 ? "..." : "")
        //       : this.value;
        //   },
        //   rotation: graphObject?.single[0]?.x?.length > 5 ? 45 : 0,
        // },
      },
      yAxis: {
        min:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? 0.1
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? 0.1
            : flrSeriesExists
            ? 0
            : undefined, //aiLogScale:aiLogScale!==null? aiLogScale : log,
        minTickInterval: flrSeriesExists
          ? 60
          : graphObject?.scaleFromZeroToOne
          ? 1
          : undefined,
        type:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? "logarithmic"
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? "logarithmic"
            : "", //aiLogScale:aiLogScale!==null? aiLogScale : log,
        // min: 0,
        title: {
          text:
            updatedYAxisLabel?.length > 0
              ? updatedYAxisLabel
              : graphObject?.yaxis,
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        endOnTick: true,
        labels: {
          //format: graphObject?.chartDataLabelInPercent ? "{text}%" : "{text}",
          formatter:
            flrSeriesExists && !graphObject?.chartDataLabelInPercent
              ? function () {
                  return SecondstoHumanReadable(this?.value, true);
                }
              : graphObject?.chartDataLabelInPercent
              ? function () {
                  return this.value + "%";
                }
              : function () {
                  return graphObject?.scaleFromZeroToOne &&
                    !Number?.isInteger(this?.value)
                    ? kFormatter(Math?.floor(this?.value))
                    : kFormatter(this?.value);
                },
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        stackLabels: {
          enabled: graphObject?.chartDataLabelInPercent
            ? false
            : graphObject?.chartGlobalDataLabel
            ? true
            : graphObject?.chartGlobalDataLabel == undefined
            ? true
            : false,
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
            fontSize: "9px",
            fontFamily: `"Roboto", sans-serif`,
            fill: "#869DAD",
            fontWeight: "bold",
            textOutline: "none",
          },
          // style: {
          // 	fontWeight: "bold",
          // 	//color: 'gray',
          // 	textOutline: "none",
          // },
          //format: percent ? "{total}%" : "{total}",
          formatter: flrSeriesExists
            ? function () {
                return this.total != 0
                  ? (this.total / 60).toFixed(0) + " mins"
                  : "";
              }
            : function () {
                return this.total != 0 ? kFormatter(this.total) : "";
              },
          // formatter: function () {
          //   return this.total != 0 ? kFormatter(this.total) : "";
          // },
        },
        allowDecimals: false,
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },

      credits: {
        enabled: false,
      },
      // legend: {
      // 	reversed: true,
      // },
      tooltip: {
        enabled: true,
        useHTML: true,
        borderWidth: 0,
        shadow: false,
        backgroundColor: "transparent",
        headerFormat:
          '<div class="tooltip_chart"><span class="text-Darkgray fontSize-14 font-weight600 d-block mb-1">{series.name}</span><span class="text-Darkgray d-block mb-1"> <span class="text-Darkgray mr-1"> X: </span> {point.key} </span><div class="d-flex align-items-center"> ',
        // pointFormat: graphObject?.chartGlobalDataStacked
        //   ? "Y :{point.y} | {point.percentage:.1f}%"
        //   : "Y :{point.y}",
        pointFormatter: function () {
          let clr = this?.color
            ? this?.color?.stops?.length
              ? this?.color?.stops?.[0]?.[1]
              : this?.color
            : this?.series?.color?.stops?.length
            ? this?.series?.color?.stops?.[0]?.[1]
            : this?.series?.color;
          if (flrSeriesExists && graphObject?.chartGlobalDataStacked) {
            return (
              '<span class="text-Darkgray mr-1"> Y : </span><span class="stackbar__tooltip" style="background-color:' +
              clr +
              ';">' +
              SecondstoHumanReadable(this?.y) +
              (this?.percentage
                ? " | " +
                  this?.percentage?.toFixed(1)?.replace(/\.0$/, "") +
                  "%"
                : "") +
              "</span></div></div>"
            );
          } else if (flrSeriesExists) {
            return (
              '<span class="text-Darkgray mr-1"> Y : </span><span class="stackbar__tooltip" style="background-color:' +
              clr +
              ';">' +
              SecondstoHumanReadable(this?.y) +
              "</span></div></div>"
            );
          } else if (graphObject?.chartGlobalDataStacked) {
            return (
              '<span class="text-Darkgray mr-1"> Y : </span><span class="stackbar__tooltip" style="background-color:' +
              clr +
              ';">' +
              this?.y?.toLocaleString() +
              (this?.percentage
                ? " | " +
                  this?.percentage?.toFixed(1)?.replace(/\.0$/, "") +
                  "%"
                : "") +
              "</span></div></div>"
            );
          } else {
            return (
              '<span class="text-Darkgray mr-1"> Y : </span><span class="stackbar__tooltip" style=";background-color:' +
              clr +
              ';">' +
              this?.y?.toLocaleString() +
              "</span></div></div>"
            );
          }
        },
        style: {
          fontSize: "14px",
          fontFamily: '"Roboto", sans-serif',
          color: "#3b5175",
        },
      },
      plotOptions: {
        column: {
          grouping: graphObject?.chartGlobalDataStacked
            ? false
            : graphObject?.chartGlobalDataStacked == undefined
            ? false
            : true,
        },
        series: {
          stacking:
            graphObject?.chartGlobalDataStacked &&
            graphObject?.chartDataLabelInPercent
              ? "percent"
              : graphObject?.chartGlobalDataStacked
              ? "normal"
              : graphObject?.chartGlobalDataStacked == undefined
              ? "normal"
              : undefined,
          dataLabels: {
            enabled: graphObject?.chartGlobalDataLabel
              ? true
              : graphObject?.chartGlobalDataLabel == undefined
              ? true
              : false,
            //format:graphObject?.chartDataLabelInPercent?'{percentage:.0f}%':'{y}',
            formatter: function () {
              return this.y != 0
                ? flrSeriesExists && !graphObject?.chartDataLabelInPercent
                  ? (this.y / 60).toFixed(0) + " mins"
                  : graphObject?.chartDataLabelInPercent
                  ? Number.parseFloat(this.percentage)
                      .toFixed(1)
                      ?.replace(/\.0$/, "") + "%"
                  : kFormatter(this.y)
                : this.y == 0
                ? flrSeriesExists && !graphObject?.chartDataLabelInPercent
                  ? "0 mins"
                  : graphObject?.chartDataLabelInPercent
                  ? Number.parseFloat(this.percentage)
                      .toFixed(1)
                      ?.replace(/\.0$/, "") + "%"
                  : ""
                : "";
            },
            style: !graphObject?.chartGlobalDataStacked
              ? {
                  color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
                  fontSize: "9px",
                  fontFamily: `"Roboto", sans-serif`,
                  fill: "#869DAD",
                  fontWeight: "bold",
                  textOutline: "none",
                }
              : {
                  color: "#ffffff",
                  //color: "#3b5175",
                  fontSize: "9px",
                  fontFamily: `"Roboto", sans-serif`,
                  fill: "#ffffff",
                  fontWeight: "normal",
                  textOutline: "none",
                },
            animation: graphObject?.pdfDownloadStatus ? false : true,
            // : {
            //     defer: 2000,
            //   },
            crop: true,
            overflow: !graphObject?.chartGlobalDataStacked
              ? "justify"
              : "center",
            inside: !graphObject?.chartGlobalDataStacked ? undefined : true,
            rotation:
              graphObject?.type === "horizontal-bar"
                ? 0
                : graphObject?.chartDataLabelInPercent
                ? -90
                : 0,
            borderWidth: 0,
            padding: 0,
          },
          animation: graphObject?.pdfDownloadStatus ? false : true,
          // : {
          //     defer: 1000,
          //   },
          //pointPadding: 0.1,
          useHTML: true,
          groupPadding: 0.2,
          shadow: false,
          //pointWidth: undefined,
          //minPointWidth: 8,
          maxPointWidth: 60,
          showInLegend: true,
          borderRadius: {
            radius: 10,
            scope: graphObject?.chartGlobalDataStacked
              ? "stack"
              : graphObject?.chartGlobalDataStacked === undefined
              ? "stack"
              : "point",
          },
          borderWidth: graphObject?.chartGlobalDataStacked
            ? 1
            : graphObject?.chartGlobalDataStacked == undefined
            ? 1
            : 0,
          borderColor: authParams?.theme_type === "1" ? "#1b2f50" : "#fff",
        },
      },
      series: yAxisdataRating ? yAxisdataRating : yAxisData[0],
      exporting: {
        filename: graphObject?.widget_name
          ? graphObject?.widget_name
          : graphObject?.type,
        enabled:
          graphObject?.pdfDownloadStatus ||
          graphObject?.pptDownloadStatus ||
          authParams?.screen_id
            ? false
            : true,
        menuItemDefinitions: {
          // Custom definition
          xsl: {
            onclick: () => {
              const excel = new Excel();
              let multiData = yAxisData[0];
              let columns = [
                {
                  title: graphObject?.xaxis,
                  dataIndex: graphObject?.xaxis,
                },
              ];
              let datasource = [];
              let lengthOfMultiData = multiData?.length;
              let lengthOfColumns = lengthOfMultiData + 1;
              for (let i = 0; i < lengthOfColumns; i++) {
                if (i == 0) {
                  graphObject?.single[0]?.x?.forEach((xElem, x_index) => {
                    datasource[x_index] = { [columns[i]?.title]: xElem };
                  });
                } else {
                  columns[i] = {
                    title: `${multiData[i - 1]?.name}`,
                    dataIndex: `${multiData[i - 1]?.name}`,
                  };
                  multiData[i - 1]?.data?.forEach((data, data_index) => {
                    datasource[data_index] = {
                      ...datasource[data_index],
                      [columns[i]?.title]: flrSeriesExists
                        ? SecondstoHumanReadable(data)
                        : data,
                    };
                  });
                }
              }
              excel
                .addSheet("test")
                .addColumns(columns)
                .addDataSource(datasource, {
                  str2Percent: true,
                })
                .saveAs(
                  `${
                    graphObject?.widget_name
                      ? graphObject?.widget_name
                      : graphObject?.type
                  }.xlsx`
                );
            },
            text: "Download excel sheet",
          },
        },
        buttons: {
          contextButton: {
            menuItems:
              graphObject?.xaxis && graphObject?.yaxis
                ? [
                    "downloadPNG",
                    "downloadJPEG",
                    "downloadSVG",
                    "separator",
                    "xsl",
                  ]
                : ["downloadPNG", "downloadJPEG", "downloadSVG"],
          },
        },
      },
      // series: [
      // 	{
      // 		name: "John",
      // 		data: yAxisData[0],
      // 	},
      // 	{
      // 		name: "Jane",
      // 		data: yAxisData[1],
      // 	},
      // ],
      legend: graphObject?.legend_position
        ? {
            itemWidth:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? undefined
                : 200,
            layout:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "horizontal"
                : "vertical",
            align:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? "center"
                : graphObject?.legend_position,
            verticalAlign:
              graphObject?.legend_position == "top" ||
              graphObject?.legend_position == "bottom"
                ? graphObject?.legend_position
                : "middle",

            itemStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
              fontFamily: `"Roboto", sans-serif`,
            },
            itemHoverStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
          }
        : {
            itemWidth: undefined,
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            itemStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
              fontFamily: `"Roboto", sans-serif`,
            },
            itemHoverStyle: {
              color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            },
          },
    };
    return configObj;
  }
};

export const getScatter = (graphObject, authParams) => {
  let multiData = [];
  graphObject?.single[0]?.data?.map((d) => {
    multiData.push({ name: d?.name, data: d?.y });
  });

  const obj = {
    chart: {
      type: "scatter",
      zoomType: "xy",
      reflow: true,
      height: graphObject?.style?.height,
      style: {
        fontFamily: '"Roboto", sans-serif',
      },
    },
    title: {
      text: "",
    },
    xAxis: {
      title: {
        enabled: true,
        text: graphObject?.xaxis,
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
    },
    yAxis: {
      min: undefined,
      title: {
        text: graphObject?.yaxis,
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
    },
    legend: graphObject?.legend_position
      ? {
          itemWidth:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? undefined
              : 200,
          layout:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? "horizontal"
              : "vertical",
          align:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? "center"
              : graphObject?.legend_position,
          verticalAlign:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? graphObject?.legend_position
              : "middle",
          itemStyle: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          itemHoverStyle: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        }
      : {
          itemWidth: undefined,
          enabled: true,
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          itemStyle: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          itemHoverStyle: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
    plotOptions: {
      scatter: {
        marker: {
          radius: 6,
          states: {
            hover: {
              enabled: true,
              lineColor: "rgb(100,100,100)",
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br>",
          pointFormat: "{point.x} cm, {point.y} kg",
          style: {
            fontFamily: '"Roboto", sans-serif',
            color: "#3b5175",
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: multiData,
  };
  return obj;
};

export const getCombination = (graphObject, authParams) => {
  const xaxisDataList = [];
  graphObject?.single?.x_axis?.map((el, i) => {
    xaxisDataList.push(`${el} ⭐`);
  });

  // Commented this because of logic updated
  // let arr = [];
  // arr = graphObject?.metadata?.y_series
  //   ? graphObject?.metadata?.y_series
  //   : Object.keys(graphObject?.widgetGraphConfig?.y_axis).map(
  //       (key) => graphObject?.widgetGraphConfig?.y_axis[key]
  //     );
  // let filteredArray = arr?.filter((d) => d.attribute);
  // let updatedXAxisLabel=[];
  // let updatedYAxisLabel = [];
  // filteredArray?.map((d, i) => {
  //   if (i >= 1) {
  //     if (i >= 2) {
  //       updatedYAxisLabel = updatedYAxisLabel + ", " + d.trace_name;
  //     } else {
  //       updatedYAxisLabel = updatedYAxisLabel + d.trace_name;
  //     }
  //   }else if(i===0){
  //     updatedXAxisLabel = d.trace_name;
  //   }
  // });

  let previewBenchmark = graphObject?.metadata?.comp_brand_list;
  let y_axes_settings = graphObject?.metadata?.y_axis_settings
    ? graphObject?.metadata?.y_axis_settings
    : graphObject?.metadata?.chart?.chart_settings?.y_axes_settings;
  let graph_type = y_axes_settings?.filter((a) => a.show_as);
  let graph_y_axis_map_at = y_axes_settings;

  // currently disbaled this functionality
  // let sameShowAsExists=true;
  // let typeOfG1="bar";
  // graph_type?.forEach((g)=>{
  //   if(g?.show_as!==typeOfG1){
  //     sameShowAsExists=false;
  //   }
  // })
  // if(sameShowAsExists){
  //   updatedXAxisLabel=updatedXAxisLabel + ", " + updatedYAxisLabel;
  //   updatedYAxisLabel="";
  // }

  // let y_axis = graphObject?.metadata?.y_axis
  //   ? graphObject?.metadata?.y_axis
  //   : graphObject?.metadata?.y_series;
  // let meta_y_series_array = [];
  // meta_y_series_array = graphObject?.metadata?.y_series?.map((d) => {
  //   return graphObject?.attribute[d.attribute];
  // });
  let ySeriesFromConfig = graphObject?.metadata?.y_series
    ? graphObject?.metadata?.y_series
    : Object?.entries(graphObject?.widgetGraphConfig?.y_axis);
  // let y_series_array = [];
  // y_series_array =
  //   graphObject?.All_WM_attributes &&
  //   Object.keys(graphObject?.widgetGraphConfig?.y_axis).map(
  //     (key) =>
  //       graphObject?.All_WM_attributes[
  //         graphObject?.widgetGraphConfig?.y_axis[key]?.attribute
  //       ]
  //   );
  let s_data = [];
  let stackeBarData = [];
  let smallestMin = 0;
  let greatestMax = 0;
  let flrSeriesExists = false;
  let allSeriesIsFLR = true;
  let latchAllAxisInSingle = false;
  let graphConditionConfig =
    graphObject?.graphConditionConfig?.["time-label-attrs"];
  let seriesColorsFlag = false;
  graphObject?.single?.y_axis?.forEach((d, i) => {
    if (ySeriesFromConfig?.length > i) {
      if (
        !(
          (ySeriesFromConfig[i]?.attribute &&
            graphConditionConfig?.includes(ySeriesFromConfig[i]?.attribute)) ||
          graphConditionConfig?.includes(ySeriesFromConfig[i][1]?.attribute)
        )
      ) {
        allSeriesIsFLR = false;
      }
    }
  });
  let j = 0;
  let noOfIterationInColors = 0;
  let lengthOfColors = globalChartColor?.length;
  graphObject?.single?.y_axis?.map((d, i) => {
    if (d?.y[0]?.name) {
      stackeBarData = d.y?.map((el, ind) => {
        let dataColor;
        if (
          el?.color !== undefined &&
          el?.color !== "#000000" &&
          el?.color !== null
        ) {
          dataColor = el?.color;
        } else {
          if (j >= lengthOfColors) {
            noOfIterationInColors = parseInt(j / lengthOfColors);
            let rem = parseInt(j % lengthOfColors);
            dataColor =
              noOfIterationInColors > 0
                ? newColorShadeInHex6(
                    globalChartColor[rem],
                    parseInt(noOfIterationInColors * 5)
                  )
                : globalChartColor[j];
          } else {
            dataColor = globalChartColor[j];
          }
          j++;
        }
        return {
          name: el?.name,
          data: el?.y,
          stacking: !graphObject?.chartGlobalDataStacked ? undefined : "normal",
          type:
            graph_type && !graphObject?.competitorBenchmark && !previewBenchmark
              ? graph_type[i]?.show_as === "bar" || d?.chart_type === "bar"
                ? "column"
                : d?.chart_type
                ? d?.chart_type
                : graph_type[i]?.show_as
              : d?.chart_type === "bar"
              ? "column"
              : d.chart_type === "horizontal-bar"
              ? "bar"
              : d?.chart_type,
          color: dataColor,
          attribute: d?.attribute,
          yAxis:
            graph_y_axis_map_at?.length > 0 &&
            graph_y_axis_map_at?.[i]?.y_axis_map_at === 1
              ? 1
              : 0,
          parentName: d?.name,
          parentNameUsed: ind === 0 ? true : false,
          dataLabels: {
            style: {
              color: graphObject?.chartGlobalDataStacked
                ? "#ffffff"
                : authParams?.theme_type === "1"
                ? "#b1bdd0"
                : "#3B5175",
            },
          },
        };
      });
    }

    let seriesData = [];
    seriesColorsFlag = false;
    if (d?.colors != undefined && d?.colors?.length > 0) {
      seriesColorsFlag = true;
      seriesData = d?.y?.map((yElem, i) => {
        return {
          y: yElem,
          color:
            d?.colors != undefined
              ? d?.colors[i] != "#000000"
                ? d?.colors[i]
                : undefined
              : undefined,
        };
      });
    }
    if (ySeriesFromConfig?.length > i) {
      if (
        ySeriesFromConfig[i]?.attribute &&
        graphConditionConfig?.includes(ySeriesFromConfig[i]?.attribute)
      ) {
        flrSeriesExists = true;
      } else if (
        graphConditionConfig?.includes(ySeriesFromConfig[i][1]?.attribute)
      ) {
        flrSeriesExists = true;
      }
    }

    latchAllAxisInSingle =
      graphObject?.yAxisMode != 2 &&
      !flrSeriesExists &&
      graphObject?.yAxisScale &&
      ((graphObject?.yAxisScale?.[0]?.y_axis_scale !== "log" &&
        graphObject?.yAxisScale?.[1]?.y_axis_scale !== "log") ||
        (graphObject?.yAxisScale?.[0]?.y_axis_scale === "log" &&
          graphObject?.yAxisScale?.[1]?.y_axis_scale === "log"))
        ? true
        : false;
    if (!d?.y[0]?.name) {
      let dataColor;
      if (
        d?.color !== undefined &&
        d?.color !== "#000000" &&
        d?.color !== null
      ) {
        dataColor = d?.color;
      } else {
        if (j >= lengthOfColors) {
          noOfIterationInColors = parseInt(j / lengthOfColors);
          let rem = parseInt(j % lengthOfColors);
          dataColor =
            noOfIterationInColors > 0
              ? newColorShadeInHex6(
                  globalChartColor[rem],
                  parseInt(noOfIterationInColors * 5)
                )
              : globalChartColor[j];
        } else {
          dataColor = globalChartColor[j];
        }
        j++;
      }
      s_data.push({
        //  name: meta_y_series_array ? meta_y_series_array[i] : y_series_array[i],
        name: d?.name,
        type:
          graph_type?.length > 0 &&
          !graphObject?.competitorBenchmark &&
          !previewBenchmark
            ? graph_type[i]?.show_as === "bar"
              ? "column"
              : graph_type[i]?.show_as
            : d.chart_type === "bar"
            ? "column"
            : d.chart_type === "horizontal-bar"
            ? "bar"
            : d.chart_type,
        stacking: undefined,
        data: seriesColorsFlag ? seriesData : d?.y,
        color: seriesColorsFlag ? undefined : dataColor,
        attribute: d?.attribute,
        // yAxis: i < 2 && i + 1
        yAxis:
          (ySeriesFromConfig?.length > i &&
            ySeriesFromConfig[i]?.attribute &&
            graphConditionConfig?.includes(ySeriesFromConfig[i]?.attribute)) ||
          (ySeriesFromConfig?.length > i &&
            graphConditionConfig?.includes(
              ySeriesFromConfig[i][1]?.attribute
            )) ||
          i >= ySeriesFromConfig?.length ||
          (i > 0 &&
            ((ySeriesFromConfig[i - 1]?.attribute &&
              graphConditionConfig?.includes(
                ySeriesFromConfig[i - 1]?.attribute
              )) ||
              graphConditionConfig?.includes(
                ySeriesFromConfig[i - 1][1]?.attribute
              )) &&
            !ySeriesFromConfig[i]?.attribute &&
            ySeriesFromConfig?.length > i &&
            !ySeriesFromConfig[i][1]?.attribute)
            ? graphObject?.yAxisMode != 2
              ? 0
              : !allSeriesIsFLR
              ? 0
              : graph_y_axis_map_at?.length > 0 && i === 0
              ? graph_y_axis_map_at?.[i]?.y_axis_map_at === 1
                ? 1
                : 0
              : graph_y_axis_map_at?.length > 0 &&
                graph_y_axis_map_at?.[i]?.y_axis_map_at === 0
              ? 0
              : 1
            : latchAllAxisInSingle && !flrSeriesExists
            ? 0
            : graph_y_axis_map_at?.length > 0 && i === 0
            ? graph_y_axis_map_at?.[i]?.y_axis_map_at === 1
              ? 1
              : 0
            : graph_y_axis_map_at?.length > 0 &&
              graph_y_axis_map_at?.[i]?.y_axis_map_at === 0
            ? 0
            : 1,
      });
    }

    if (d?.min < smallestMin) {
      smallestMin = d?.min;
    }
    if (d?.max > greatestMax) {
      greatestMax = d?.max;
    }
  });

  if (stackeBarData?.length > 0) {
    s_data = [...stackeBarData, ...s_data];
  }

  s_data = s_data?.filter((d) => d?.name);
  //if (s_data?.length > 0) s_data[0].yAxis = 0;

  let updatedXAxisLabel = "";
  let updatedYAxisLabel = "";
  //change related to make line & area to spline & areaspline
  s_data =
    s_data &&
    s_data.map((g, i) => {
      // g.stacking =
      //   g?.type === "line" || g?.type === "area"
      //     ? undefined
      //     : !graphObject?.chartGlobalDataStacked
      //     ? undefined
      //     : "normal";
      g.type =
        g?.type === "line"
          ? "spline"
          : g?.type === "area"
          ? "areaspline"
          : g?.type;
      //For Update color and shadows
      // if (g?.type === "spline") {
      //   g.shadow = {
      //     color:
      //       g?.color != undefined && g?.color != "#000000"
      //         ? `${g?.color}`
      //         : `${globalChartColor[i]}`,
      //     width: 10,
      //     opacity: 1,
      //     offsetX: 0,
      //     offsetY: 0,
      //   };
      // }
      if (g?.type === "column") {
        if (g?.color) {
          g.color = graphObject?.chartGradientColor
            ? {
                linearGradient: {
                  x1: 0,
                  x2: 0,
                  y1: 0,
                  y2: 1,
                },
                stops:
                  g?.color != undefined && g?.color != "#000000"
                    ? [
                        [0, g?.color],
                        [1, `${g?.color}80`],
                      ]
                    : [
                        [0, globalChartColor[j]],
                        [1, `${globalChartColor[j++]}80`],
                      ],
              }
            : g?.color !== undefined &&
              g?.color !== "#000000" &&
              g?.color !== null
            ? g?.color
            : globalChartColor[j++];
        } else if (g?.data?.[0]?.color) {
          g.data = g?.data?.map((s, ind) => {
            s.color = graphObject?.chartGradientColor
              ? {
                  linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 1,
                  },
                  stops:
                    s?.color != undefined && s?.color != "#000000"
                      ? [
                          [0, s?.color],
                          [1, `${s?.color}80`],
                        ]
                      : [
                          [0, globalChartColor[j]],
                          [1, `${globalChartColor[j++]}80`],
                        ],
                }
              : s?.color !== undefined &&
                s?.color !== "#000000" &&
                s?.color !== null
              ? s?.color
              : globalChartColor[j++];
            return s;
          });
        }
      }
      if (g?.type === "areaspline") {
        g.fillColor = {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [
              0,
              g?.color != undefined && g?.color != "#000000"
                ? `${g?.color}99`
                : `${globalChartColor[j]}99`,
            ],
            [
              1,
              g?.color != undefined && g?.color != "#000000"
                ? `${g?.color}1a`
                : `${globalChartColor[j]}1a`,
            ],
          ],
        };
        g.color =
          g?.color != undefined && g?.color != "#000000"
            ? `${g?.color}99`
            : `${globalChartColor[j++]}99`;
      }
      // In last i'm checking yAxis for Label update
      if (g?.yAxis === 0) {
        if (g?.parentName && g?.parentNameUsed) {
          if (updatedXAxisLabel === "") {
            updatedXAxisLabel = updatedXAxisLabel + g?.parentName;
          } else {
            updatedXAxisLabel = updatedXAxisLabel + ", " + g?.parentName;
          }
        } else if (!g?.parentName) {
          if (updatedXAxisLabel === "") {
            updatedXAxisLabel = updatedXAxisLabel + g?.name;
          } else {
            updatedXAxisLabel = updatedXAxisLabel + ", " + g?.name;
          }
        }
      } else if (g?.yAxis === 1) {
        if (g?.parentName && g?.parentNameUsed) {
          if (updatedYAxisLabel === "") {
            updatedYAxisLabel = updatedYAxisLabel + g?.parentName;
          } else {
            updatedYAxisLabel = updatedYAxisLabel + ", " + g?.parentName;
          }
        } else if (!g?.parentName) {
          if (updatedYAxisLabel === "") {
            updatedYAxisLabel = updatedYAxisLabel + g?.name;
          } else {
            updatedYAxisLabel = updatedYAxisLabel + ", " + g?.name;
          }
        }
      }
      return g;
    });
  let date_check = moment(graphObject?.single?.x_axis?.[0]).isValid();

  const durationType =
    (graphObject?.dashboard ||
      graphObject?.panes?.[graphObject?.index]?.is_widget_maker_open_obj
        ?.open_flag) &&
    handleDateFormat(
      graphObject?.panes,
      graphObject?.index,
      graphObject?.section_index,
      graphObject?.widget_index,
      graphObject?.metadata,
      graphObject?.metadata?.x_axis?.attribute,
      graphObject?.xaxis,
      graphObject?.metadata?.x_axis?.date_part,
      graphObject?.single?.x_axis,
      graphObject?.section,
      graphObject?.template_widget,
      graphObject?.shareTemplateData,
      graphObject?.pdfDownloadStatus,
      graphObject?.isScheduleReportOpen,
      graphObject?.screen,
      graphObject?.template_details
    );

  let x_date_part = graphObject?.metadata?.x_axis?.date_part;
  let x_date_agg = graphObject?.metadata?.x_axis?.date_aggregation;

  // to bind xAxisLabel and YAxisLabel in case of YAxisMode === 1
  if (latchAllAxisInSingle && updatedYAxisLabel?.length) {
    updatedXAxisLabel = updatedXAxisLabel + ", " + updatedYAxisLabel;
    updatedYAxisLabel = "";
  }
  //to check all series lied on same axis based on yAxis
  let allSeriesMappedAtSameAxis = true;
  let axisOfG1 = null;
  s_data?.forEach((g) => {
    if (axisOfG1 === null) {
      axisOfG1 = g.yAxis;
    }
    if (axisOfG1 !== null && axisOfG1 !== g.yAxis) {
      allSeriesMappedAtSameAxis = false;
    }
  });
  const obj = {
    chart: {
      height: graphObject?.style?.height,
      zoomType: "xy",
      reflow: true,
      style: {
        fontFamily: '"Roboto", sans-serif',
        color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
      },
    },
    title: {
      text: "",
      style: {
        color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
      },
    },
    xAxis: {
      title: {
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
        text:
          graphObject?.metadata?.x_axis?.attribute &&
          graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
            graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
          )
            ? !x_date_part && !x_date_agg
              ? "Date"
              : !x_date_part && x_date_agg === "1h"
              ? "Hour of Day"
              : !x_date_part && x_date_agg === "2h"
              ? "Hour of Day"
              : !x_date_part && x_date_agg === "3h"
              ? "Hour of Day"
              : !x_date_part && x_date_agg === "4h"
              ? "Hour of Day"
              : !x_date_part && x_date_agg === "6h"
              ? "Hour of Day"
              : !x_date_part && x_date_agg === "8h"
              ? "Hour of Day"
              : !x_date_part && x_date_agg === "12h"
              ? "Hour of Day"
              : !x_date_part && x_date_agg === "ww"
              ? "Week of Year"
              : !x_date_part && x_date_agg === "M"
              ? "Month of Year"
              : !x_date_part && x_date_agg === "Y"
              ? "Years"
              : graphObject?.metadata?.x_axis?.date_part === null
              ? "Date"
              : graphObject?.metadata?.x_axis?.date_part === "1h"
              ? "Hour of Day"
              : graphObject?.metadata?.x_axis?.date_part === "2h"
              ? "Hour of Day"
              : graphObject?.metadata?.x_axis?.date_part === "3h"
              ? "Hour of Day"
              : graphObject?.metadata?.x_axis?.date_part === "4h"
              ? "Hour of Day"
              : graphObject?.metadata?.x_axis?.date_part === "6h"
              ? "Hour of Day"
              : graphObject?.metadata?.x_axis?.date_part === "8h"
              ? "Hour of Day"
              : graphObject?.metadata?.x_axis?.date_part === "12h"
              ? "Hour of Day"
              : graphObject?.metadata?.x_axis?.date_part === "M"
              ? "Month of Year"
              : graphObject?.metadata?.x_axis?.date_part === "D"
              ? "Date"
              : graphObject?.metadata?.x_axis?.date_part === "hh"
              ? "Hour of Day"
              : graphObject?.metadata?.x_axis?.date_part === "dd"
              ? "Day of Month"
              : graphObject?.metadata?.x_axis?.date_part === "dw"
              ? "Day of Week"
              : graphObject?.metadata?.x_axis?.date_part === "mm"
              ? "Month of Year"
              : graphObject?.metadata?.x_axis?.date_part === "ww"
              ? "Week of Year"
              : graphObject?.metadata?.x_axis?.date_part === "qq"
              ? "Quarter of Year"
              : graphObject?.metadata?.x_axis?.date_part
            : !graphObject?.metadata?.x_axis?.attribute &&
              (graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                "recorddate" ||
                graphObject?.widgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
                  "createddate")
            ? graphObject?.widgetGraphConfig?.x_axis?.date_part === null
              ? "Date"
              : graphObject?.widgetGraphConfig?.x_axis?.date_part === "hh"
              ? "Hour of Day"
              : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dd"
              ? "Day of Month"
              : graphObject?.widgetGraphConfig?.x_axis?.date_part === "dw"
              ? "Day of Week"
              : graphObject?.widgetGraphConfig?.x_axis?.date_part === "mm"
              ? "Month of Year"
              : graphObject?.widgetGraphConfig?.x_axis?.date_part === "ww"
              ? "Week of Year"
              : graphObject?.widgetGraphConfig?.x_axis?.date_part === "qq"
              ? "Quarter of Year"
              : graphObject?.widgetGraphConfig?.x_axis?.date_part
            : graphObject?.xaxis,
        enabled: true,
      },
      categories:
        graphObject?.template_id === "agent_activity_001" &&
        graphObject?.trends_type === "time"
          ? graphObject?.single?.x_axis?.map((e) =>
              moment(e).format("MMM DD YYYY HH:mm")
            )
          : graphObject?.metadata &&
            (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
              graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
            ) ||
              graphObject?.xaxis === "Date") &&
            ((graphObject?.pdfDownloadStatus &&
              graphObject?.metadata?.x_axis?.date_part !== null) ||
              ((!graphObject?.pdfDownloadStatus ||
                graphObject?.isScheduleReportOpen) &&
                graphObject?.metadata?.x_axis?.date_part == null)) &&
            durationType
          ? durationType
          : graphObject?.metadata &&
            (graphObject?.graphConditionConfig?.[`date-attributes`]?.includes(
              graphObject?.metadata?.x_axis?.attribute?.toLowerCase()
            ) ||
              graphObject?.xaxis === "Date") &&
            graphObject?.metadata?.x_axis?.date_part !== null
          ? graphObject?.single?.x_axis?.map((e) => e)
          : // (graphObject?.metadata &&
          //   graphObject?.metadata?.x_axis?.attribute?.toLowerCase() === "recorddate") ||
          // (graphObject?.xaxis === "Date" &&
          //   graphObject?.metadata?.x_axis?.date_part == null)
          //   ? graphObject?.single?.x_axis?.map((e) =>
          //       moment(e).format("MMM DD YYYY")
          //     )
          graphObject?.xaxis === "Date" &&
            graphObject?.widgetGraphConfig?.x_axis?.date_part == null
          ? graphObject?.single?.x_axis?.map((e) =>
              moment(e).format("MMM DD YYYY")
            )
          : graphObject?.xaxis === "Review Ratings" && xaxisDataList
          ? xaxisDataList
          : graphObject?.single?.x_axis,

      // categories: graphObject?.single?.x_axis,
      crosshair: true,
      labels: {
        formatter: function () {
          return date_check || graphObject?.pdfDownloadStatus
            ? this.value
            : this.value.length > 12 && graphObject?.single?.x_axis?.length > 5
            ? this.value?.slice(0, 12) + (this.value?.length > 12 ? "..." : "")
            : this.value;
        },
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
      },
    },
    // xAxis: [
    //   {
    //     categories: graphObject?.single?.x_axis,
    //     crosshair: true,
    //     labels: {
    //       formatter: function () {
    //         return date_check || graphObject?.pdfDownloadStatus
    //           ? this.value
    //           : this.value.length > 12 &&
    //             graphObject?.single?.x_axis?.length > 5
    //           ? this.value?.slice(0, 12) +
    //             (this.value?.length > 12 ? "..." : "")
    //           : this.value;
    //       },
    //       rotation: graphObject?.single?.x_axis?.length > 5 ? -45 : 0,
    //       //style: { fontWeight: "normal",color:"#869DAD" },
    //     },
    //     // labels: {
    //     //   formatter: function () {
    //     //     return this.value.length > 12 &&
    //     //       graphObject?.single?.x_axis?.length > 5
    //     //       ? this.value?.slice(0, 12) +
    //     //           (this.value?.length > 12 ? "..." : "")
    //     //       : this.value;
    //     //   },
    //     //   rotation: graphObject?.single?.x_axis?.length > 5 ? -45 : 0,
    //     //   //style: { fontWeight: "normal",color:"#869DAD" },
    //     // },
    //   },
    //   {
    //     title: {
    //       text: graphObject?.xaxis,
    //     },
    //   },
    // ],
    yAxis: [
      {
        min:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? 0.1
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? 0.1
            : graphObject?.yAxisMode != 2 && latchAllAxisInSingle
            ? smallestMin
            : flrSeriesExists
            ? 0
            : undefined, //aiLogScale:aiLogScale!==null? aiLogScale : log,
        // Primary yAxis
        max:
          graphObject?.yAxisMode != 2 && latchAllAxisInSingle
            ? greatestMax
            : undefined,
        type:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? "logarithmic"
            : "",
        title: {
          text:
            latchAllAxisInSingle &&
            !flrSeriesExists &&
            updatedXAxisLabel?.length > 0
              ? updatedXAxisLabel
              : updatedXAxisLabel?.length > 0
              ? updatedXAxisLabel
              : allSeriesMappedAtSameAxis
              ? ""
              : graphObject?.yaxis,
          //text: graphObject?.yaxis,
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        labels: {
          formatter:
            (ySeriesFromConfig &&
              ySeriesFromConfig?.[0]?.attribute &&
              graphConditionConfig?.includes(
                ySeriesFromConfig?.[0]?.attribute
              )) ||
            (ySeriesFromConfig &&
              graphConditionConfig?.includes(
                ySeriesFromConfig?.[0]?.[1]?.attribute
              ))
              ? function () {
                  return SecondstoHumanReadable(this?.value, true);
                }
              : function () {
                  return kFormatter(this.value);
                },
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        allowDecimals: false,
        //endOnTick: false,
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
        minTickInterval:
          (ySeriesFromConfig &&
            ySeriesFromConfig?.[0]?.attribute &&
            graphConditionConfig?.includes(
              ySeriesFromConfig?.[0]?.attribute
            )) ||
          (ySeriesFromConfig &&
            graphConditionConfig?.includes(
              ySeriesFromConfig?.[0]?.[1]?.attribute
            ))
            ? 60
            : undefined,
      },
      {
        // Secondary yAxis
        min:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[0]?.y_axis_scale === "log"
            ? 0.1
            : graphObject?.aiLogScale && graphObject?.aiLogScale === true
            ? 0.1
            : allSeriesIsFLR && graphObject?.yAxisMode == 2
            ? 0
            : undefined, //aiLogScale:aiLogScale!==null? aiLogScale : log,
        type:
          graphObject?.yAxisScale &&
          graphObject?.yAxisScale?.[1]?.y_axis_scale === "log"
            ? "logarithmic"
            : "",
        title: {
          text:
            updatedYAxisLabel?.length > 0
              ? updatedYAxisLabel
              : (latchAllAxisInSingle && !flrSeriesExists) ||
                allSeriesMappedAtSameAxis
              ? ""
              : graphObject?.y_series2,
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
        labels: {
          formatter:
            allSeriesIsFLR &&
            ((ySeriesFromConfig &&
              ySeriesFromConfig?.[1]?.attribute &&
              graphConditionConfig?.includes(
                ySeriesFromConfig?.[1]?.attribute
              )) ||
              (ySeriesFromConfig &&
                graphConditionConfig?.includes(
                  ySeriesFromConfig?.[1]?.[1]?.attribute
                )))
              ? function () {
                  return SecondstoHumanReadable(this?.value, true);
                }
              : function () {
                  return kFormatter(this.value);
                },
          style: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          enabled:
            graphObject?.yAxisMode == 2 ||
            flrSeriesExists ||
            !latchAllAxisInSingle
              ? true
              : false,
        },
        linkedTo: latchAllAxisInSingle ? 0 : undefined,
        opposite: true,
        allowDecimals: false,
        //endOnTick: false,
        style: {
          color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
        },
        minTickInterval:
          allSeriesIsFLR && graphObject?.yAxisMode == 2 ? 60 : undefined,
      },
    ],
    tooltip: {
      shared: true,
      enabled: true,
      useHTML: true,
      shadow: {
        color: "#0000001A",
      },
      className: "custom_background",
      // headerFormat:"<span style='font-size: 10px'>{point.x} </span><br/>",
      // pointFormatter: function () {
      //   return '<span style="color:'+this.color+'">●</span>' + this.series.name + ' : <b>' + this.y + '</b><br/>';
      // }
      formatter:
        (ySeriesFromConfig &&
          ySeriesFromConfig?.[0]?.attribute &&
          graphConditionConfig?.includes(ySeriesFromConfig?.[0]?.attribute)) ||
        (ySeriesFromConfig &&
          graphConditionConfig?.includes(
            ySeriesFromConfig?.[0]?.[1]?.attribute
          ))
          ? function () {
              let tooltipForCom =
                "<div class='tooltip_chart--dark'><span class='font-weight600 fontSize-14 text-Darkgray d-block mb-1'>" +
                this.x +
                "</span>";
              this.points?.forEach((point) => {
                let yPointValue =
                  (ySeriesFromConfig?.length > point?.series?.index &&
                    ySeriesFromConfig[point?.series?.index]?.attribute &&
                    graphConditionConfig?.includes(
                      ySeriesFromConfig[point?.series?.index]?.attribute
                    )) ||
                  (ySeriesFromConfig?.length > point?.series?.index &&
                    graphConditionConfig?.includes(
                      ySeriesFromConfig[point?.series?.index][1]?.attribute
                    )) ||
                  point?.series?.index >= ySeriesFromConfig?.length ||
                  (point?.series?.index > 0 &&
                    ((ySeriesFromConfig[point?.series?.index - 1]?.attribute &&
                      graphConditionConfig?.includes(
                        ySeriesFromConfig[point?.series?.index - 1]?.attribute
                      )) ||
                      graphConditionConfig?.includes(
                        ySeriesFromConfig[point?.series?.index - 1][1]
                          ?.attribute
                      )) &&
                    !ySeriesFromConfig[point?.series?.index]?.attribute &&
                    ySeriesFromConfig?.length > point?.series?.index &&
                    !ySeriesFromConfig[point?.series?.index][1]?.attribute)
                    ? SecondstoHumanReadable(point?.y)
                    : point?.y?.toLocaleString();
                let clr = point?.color
                  ? point?.color?.stops?.length
                    ? point?.color?.stops?.[0]?.[1]
                    : point?.color
                  : point?.series?.color?.stops?.length
                  ? point?.series?.color?.stops?.[0]?.[1]
                  : point?.series?.color;
                tooltipForCom =
                  tooltipForCom +
                  "<div class='d-flex align-items-center mb-1'><span class='text-Darkgray fontSize-12 mr-1'>" +
                  point?.series?.name +
                  "</span>" +
                  '<span class="stackbar__tooltip" style=";background-color:' +
                  clr +
                  ';">' +
                  yPointValue +
                  "</span></div>";
              });
              tooltipForCom = tooltipForCom + "</div>";
              return tooltipForCom;
            }
          : function () {
              let tooltipForCom =
                "<div class='tooltip_chart--dark'><span class='font-weight600 fontSize-14 text-Darkgray d-block mb-1'>" +
                this.x +
                "</span>";
              this.points?.forEach((point) => {
                let yPointValue = point?.y?.toLocaleString();
                let clr = point?.color
                  ? point?.color?.stops?.length
                    ? point?.color?.stops?.[0]?.[1]
                    : point?.color
                  : point?.series?.color?.stops?.length
                  ? point?.series?.color?.stops?.[0]?.[1]
                  : point?.series?.color;
                tooltipForCom =
                  tooltipForCom +
                  "<div class='d-flex align-items-center mb-1'><span class='text-Darkgray fontSize-12 mr-1'>" +
                  point?.series?.name +
                  "</span>" +
                  '<span class="stackbar__tooltip" style=";background-color:' +
                  clr +
                  ';">' +
                  yPointValue +
                  "</span></div>";
              });
              tooltipForCom = tooltipForCom + "</div>";
              return tooltipForCom;
            },
    },
    legend: graphObject?.legend_position
      ? {
          itemWidth:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? undefined
              : 200,
          layout:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? "horizontal"
              : "vertical",
          align:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? "center"
              : graphObject?.legend_position,
          verticalAlign:
            graphObject?.legend_position == "top" ||
            graphObject?.legend_position == "bottom"
              ? graphObject?.legend_position
              : "middle",
          itemStyle: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            fill: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          itemHoverStyle: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            fill: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        }
      : {
          itemWidth: undefined,
          enabled: true,
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          itemStyle: {
            fontFamily: '"Roboto", sans-serif',
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            fill: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
          itemHoverStyle: {
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            fill: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
          },
        },
    credits: {
      enabled: false,
    },
    series: s_data,
    exporting: {
      filename: graphObject?.widget_name
        ? graphObject?.widget_name
        : graphObject?.type,
      enabled:
        graphObject?.pdfDownloadStatus ||
        graphObject?.pptDownloadStatus ||
        authParams?.screen_id
          ? false
          : true,
      menuItemDefinitions: {
        // Custom definition
        xsl: {
          onclick: () => {
            const excel = new Excel();
            let multiData = s_data;
            let columns = [
              {
                title: graphObject?.xaxis,
                dataIndex: graphObject?.xaxis,
              },
            ];
            let datasource = [];
            let lengthOfMultiData = multiData?.length;
            let lengthOfColumns = lengthOfMultiData + 1;
            for (let i = 0; i < lengthOfColumns; i++) {
              if (i == 0) {
                graphObject?.single?.x_axis?.forEach((xElem, x_index) => {
                  datasource[x_index] = { [columns[i]?.title]: xElem };
                });
              } else {
                columns[i] = {
                  title: multiData[i - 1]?.name,
                  dataIndex: multiData[i - 1]?.name,
                };
                multiData[i - 1]?.data?.forEach((data, data_index) => {
                  datasource[data_index] = {
                    ...datasource[data_index],
                    [columns[i]?.title]:
                      data?.y >= 0
                        ? graphConditionConfig?.includes(
                            multiData[i - 1]?.attribute
                          )
                          ? SecondstoHumanReadable(data?.y)
                          : data?.y
                        : graphConditionConfig?.includes(
                            multiData[i - 1]?.attribute
                          )
                        ? SecondstoHumanReadable(data)
                        : data,
                  };
                });
              }
            }
            excel
              .addSheet("test")
              .addColumns(columns)
              .addDataSource(datasource, {
                str2Percent: true,
              })
              .saveAs(
                `${
                  graphObject?.widget_name
                    ? graphObject?.widget_name
                    : graphObject?.type
                }.xlsx`
              );
          },
          text: "Download excel sheet",
        },
      },
      buttons: {
        contextButton: {
          menuItems:
            graphObject?.xaxis && graphObject?.yaxis
              ? [
                  "downloadPNG",
                  "downloadJPEG",
                  "downloadSVG",
                  "separator",
                  "xsl",
                ]
              : ["downloadPNG", "downloadJPEG", "downloadSVG"],
          buttonSpacing: 1,
          height: 20,
          symbolSize: 12,
          symbolStrokeWidth: 2,
          symbolX: 10.5,
          symbolY: 10.5,
          width: 20,
          x: -2,
          y: -12,
        },
      },
    },
    plotOptions: {
      series: {
        lineWidth: 3,
        marker: {
          enabled:
            graphObject?.chartMarkers === false
              ? graphObject?.chartMarkers
              : true,
          //radius: graphObject?.chartMarkers === false ? 0 : 4,
          symbol: "circle",
          fillColor: "#FFFFFF",
          lineWidth: 3,
          lineColor: undefined, // inherit from series
        },
        stacking: "normal",
        dataLabels: {
          enabled: graphObject?.chartGlobalDataLabel ? true : false,
          style: {
            fontWeight: "500",
            color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3b5175",
            fontSize: "10px",
            fontFamily: '"Roboto", sans-serif',
            textOutline: "none",
          },
          formatter: function () {
            let index = this?.series?.index;
            let yDataLabel =
              (ySeriesFromConfig?.length > index &&
                ySeriesFromConfig[index]?.attribute &&
                graphConditionConfig?.includes(
                  ySeriesFromConfig[index]?.attribute
                )) ||
              (ySeriesFromConfig?.length > index &&
                graphConditionConfig?.includes(
                  ySeriesFromConfig[index][1]?.attribute
                )) ||
              (flrSeriesExists && index >= ySeriesFromConfig?.length) ||
              (flrSeriesExists &&
                !ySeriesFromConfig[index]?.attribute &&
                !ySeriesFromConfig[index][1]?.attribute)
                ? (this?.y / 60)?.toFixed(1)?.replace(/\.0$/, "") + " mins"
                : this.y != 0
                ? kFormatter(this.y)
                : "";
            return yDataLabel;
          },
        },
        showInLegend: true,
        // borderRadius: {
        //   radius: 10,
        //   scope: graphObject?.chartGlobalDataStacked ? "stack" : "point",
        // },
        borderRadius: {
          radius: 10,
          scope: graphObject?.chartGlobalDataStacked
            ? "stack"
            : graphObject?.chartGlobalDataStacked === undefined
            ? "stack"
            : "point",
        },
        borderWidth: 1,
        borderColor: authParams?.theme_type === "1" ? "#1b2f50" : "#fff",
      },
    },
    // series: stackeBarData
    // 	? [
    // 			...stackeBarData,
    // 			{
    // 				name: y_series2,
    // 				type:
    // 					yAxisChartType === "horizontal-bar"
    // 						? "bar"
    // 						: yAxisChartType === "bar"
    // 						? "column"
    // 						: yAxisChartType,
    // 				data: single?.y_axis?.line?.y,
    // 				// data: yData && yData[0]?.data[0].y,
    // 			},
    // 	  ]
    // 	: [
    // 			{
    // 				type:
    // 					xAxisChartType === "horizontal-bar"
    // 						? "bar"
    // 						: xAxisChartType === "bar"
    // 						? "column"
    // 						: xAxisChartType,

    // 				yAxis: 1,
    // 				name: yaxis,
    // 				data: single?.y_axis?.bar?.y,
    // 			},
    // 			// xAxisData[0],
    // 			{
    // 				name: y_series2,
    // 				type:
    // 					yAxisChartType === "horizontal-bar"
    // 						? "bar"
    // 						: yAxisChartType === "bar"
    // 						? "column"
    // 						: yAxisChartType,
    // 				data: single?.y_axis?.line?.y,
    // 				// data: yData && yData[0]?.data[0].y,
    // 			},
    // 	  ],
  };
  return obj;
};
// let easeOutBounce = function (pos) {
//     if ((pos) < (1 / 2.75)) {
//         return (7.5625 * pos * pos);
//     }
//     if (pos < (2 / 2.75)) {
//         return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
//     }
//     if (pos < (2.5 / 2.75)) {
//         return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
//     }
//     return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
// };

// Math.easeOutBounce = easeOutBounce;
export const getWordcloud = (graphObject, Highcharts, authParams) => {
  let differentialWordcloudData = [];
  let wordcloudData = [];
  let j = 0;
  let noOfIterationInColors = 0;
  let lengthOfColors = globalChartColor?.length;
  let wordcloud_color = graphObject?.metadata?.chart?.chart_settings
    ?.wordcloud_color
    ? graphObject?.metadata?.chart?.chart_settings?.wordcloud_color
    : graphObject?.widgetGraphConfig?.chart_settings?.wordcloud_color
    ? graphObject?.widgetGraphConfig?.chart_settings?.wordcloud_color
    : "0";

  graphObject?.single && graphObject?.single?.[0]?.name != undefined
    ? graphObject?.single?.forEach((differentialData) => {
        let dataColor;
        if (
          differentialData?.color !== undefined &&
          differentialData?.color !== "#000000" &&
          differentialData?.color !== null &&
          wordcloud_color === "0"
        ) {
          dataColor = differentialData?.color;
        } else {
          dataColor = getDataColor(wordcloud_color, differentialData, j);
          j++;
        }
        differentialData?.data?.forEach((data, i) => {
          if (data?.text?.length <= 50) {
            differentialWordcloudData.push({
              name: data?.text,
              weight: data?.value,
              color: dataColor,
              percentage: data?.percent,
              SentimentType: data?.SentimentType ? data?.SentimentType : null,
            });
          }
        });
      })
    : graphObject?.single?.map((data, i) => {
        if (data?.text?.length <= 50) {
          let dataColor;
          if (
            data?.color !== undefined &&
            data?.color !== "#000000" &&
            data?.color !== null &&
            wordcloud_color === "0"
          ) {
            dataColor = data?.color;
          } else {
            dataColor = getDataColor(wordcloud_color, data, j);
            j++;
          }
          wordcloudData?.push({
            name: data?.text,
            weight: data?.value,
            color: dataColor,
            percentage: data?.percent,
            SentimentType: data?.SentimentType ? data?.SentimentType : null,
          });
        }
      });
  let shapeType = ["default", "random", "square", "spiral", "oval"];
  let selectedShapeType = setHighchartWordCloudShape(shapeType[0], Highcharts);
  const obj = {
    chart: {
      type: "wordcloud",
      reflow: true,
      height:
        differentialWordcloudData?.length > 0
          ? Number(String(graphObject?.style?.height)?.replace("px", "")) - 50
          : graphObject?.style?.height,
      // marginRight: 0,
      // marginLeft: 0,
      // marginBottom: 0,
      style: {
        fontFamily: graphObject?.fontFamily ? graphObject?.fontFamily : "Arial",
        // fontFamily: '"Rubik", serif',
        //textTransform: "uppercase",
      },
    },
    // accessibility: {
    // 	screenReaderSection: {
    // 		beforeChartFormat: '<h5>{chartTitle}</h5>' +
    // 			'<div>{chartSubtitle}</div>' +
    // 			'<div>{chartLongdesc}</div>' +
    // 			'<div>{viewTableButton}</div>'
    // 	}
    // },
    credits: {
      enabled: false,
    },
    series: [
      selectedShapeType === "spiral"
        ? {
            data:
              graphObject?.single && graphObject?.single[0]?.name
                ? differentialWordcloudData
                : wordcloudData,
            rotation: {
              from: 0,
              to: 0,
            },
            minFontSize: 7,
            style: {
              fontFamily: graphObject?.fontFamily
                ? graphObject?.fontFamily
                : "Arial",
              // fontFamily: '"Rubik", serif',
              fontWeight: "700",
              //textTransform: "uppercase",
            },
            spiral: "archimedean",
            placementStrategy: "center",
          }
        : selectedShapeType === "random"
        ? {
            data:
              graphObject?.single && graphObject?.single[0]?.name
                ? differentialWordcloudData
                : wordcloudData,
            rotation: {
              from: 0,
              to: 0,
            },
            minFontSize: 7,
            style: {
              fontFamily: graphObject?.fontFamily
                ? graphObject?.fontFamily
                : "Arial",
              // fontFamily: '"Rubik", serif',
              fontWeight: "700",
              //textTransform: "uppercase",
            },
            spiral: "rectangular",
            placementStrategy: "random",
          }
        : selectedShapeType === "square"
        ? {
            data:
              graphObject?.single && graphObject?.single[0]?.name
                ? differentialWordcloudData
                : wordcloudData,
            rotation: {
              from: 0,
              to: 0,
            },
            minFontSize: 7,
            style: {
              fontFamily: graphObject?.fontFamily
                ? graphObject?.fontFamily
                : "Arial",
              // ffontFamily: '"Rubik", serif',
              fontWeight: "700",
              //textTransform: "uppercase",
            },
            spiral: "square",
            placementStrategy: "center",
          }
        : selectedShapeType === "oval"
        ? {
            data:
              graphObject?.single && graphObject?.single[0]?.name
                ? differentialWordcloudData
                : wordcloudData,
            rotation: {
              from: 0,
              to: 0,
            },
            minFontSize: 7,
            style: {
              fontFamily: graphObject?.fontFamily
                ? graphObject?.fontFamily
                : "Arial",
              // fontFamily: '"Rubik", serif',
              fontWeight: "700",
              //textTransform: "uppercase",
            },
            spiral: "oval",
            placementStrategy: "center",
          }
        : {
            data:
              graphObject?.single && graphObject?.single[0]?.name != undefined
                ? differentialWordcloudData
                : wordcloudData,
            rotation: {
              from: 0,
              to: 0,
            },
            minFontSize: 7,
            style: {
              fontFamily: graphObject?.fontFamily
                ? graphObject?.fontFamily
                : "Arial",
              // fontFamily: '"Rubik", serif',
              fontWeight: "700",
              //textTransform: "uppercase",
            },
            spiral: "rectangular",
            placementStrategy: "center",
          },
    ],
    exporting: {
      filename: graphObject?.widget_name
        ? graphObject?.widget_name
        : graphObject?.type,
      enabled:
        graphObject?.pdfDownloadStatus ||
        graphObject?.pptDownloadStatus ||
        authParams?.screen_id
          ? false
          : true,
      menuItemDefinitions: {
        // Custom definition
        xsl: {
          onclick: () => {
            const excel = new Excel();
            let columns = [
              {
                title: graphObject?.xaxis,
                dataIndex: graphObject?.xaxis,
              },
              {
                title: graphObject?.yaxis,
                dataIndex: graphObject?.yaxis,
              },
            ];

            let datasource = graphObject?.single?.map((el, i) => {
              return {
                [columns[0]?.title]: el?.text,
                [columns[1]?.title]: el?.value + " | " + el?.percent + "%",
              };
            });
            excel
              .addSheet("test")
              .addColumns(columns)
              .addDataSource(datasource, {
                str2Percent: true,
              })
              .saveAs(
                `${
                  graphObject?.widget_name
                    ? graphObject?.widget_name
                    : graphObject?.type
                }.xlsx`
              );
          },
          text: "Download excel sheet",
        },
      },
      buttons: {
        contextButton: {
          menuItems:
            graphObject?.xaxis && graphObject?.yaxis
              ? [
                  "downloadPNG",
                  "downloadJPEG",
                  "downloadSVG",
                  "separator",
                  "xsl",
                ]
              : ["downloadPNG", "downloadJPEG", "downloadSVG"],
        },
      },
    },
    title: {
      text: graphObject?.title,
    },
    subtitle: {
      text: graphObject?.subtitle,
    },
    tooltip: {
      useHTML: true,
      borderWidth: 0,
      shadow: false,
      backgroundColor: "transparent",
      headerFormat:
        '<div class="tooltip_chart"><span class="text-Darkgray fontSize-14 font-weight600 d-block mb-1">{point.key}</span><div class="d-flex align-items-center">',
      pointFormatter: function () {
        let clr = this?.color
          ? this?.color?.stops?.length
            ? this?.color?.stops?.[0]?.[1]
            : this?.color
          : this?.series?.color?.stops?.length
          ? this?.series?.color?.stops?.[0]?.[1]
          : this?.series?.color;
        return (
          '<span class="stackbar__tooltip" style="background-color:' +
          clr +
          ';">' +
          Number.parseInt(this?.weight)?.toLocaleString() +
          (this?.percentage
            ? " | " + this?.percentage?.toFixed(1)?.replace(/\.0$/, "") + "%"
            : "") +
          "</span></div></div>"
        );
      },
      // pointFormatter: function (point) {

      //   return (
      //     "" +this.weight+
      //     " | " + (graphObject?.single && graphObject?.single[0]?.name
      //     ? differentialWordcloudData[this.index]?.percentage
      //     : wordcloudData[this.index]?.percentage) +
      //     "%"
      //   );
      // },
      style: {
        fontSize: "14px",
        fontFamily: "Arial",
        // fontFamily: '"Rubik", serif',
        fontWeight: "700",
        textTransform: "uppercase",
      },
    },
    plotOptions: {
      wordcloud: {
        animation: graphObject?.pdfDownloadStatus ? false : true,
        // animation: {
        //   defer: 0,
        //   duration: 1000,
        // },
      },
    },
  };
  obj["wordCloudLegend"] =
    graphObject?.single && graphObject?.single[0]?.name ? true : false;
  return obj;
};

const getDataColor = (wordcloud_color, data, j) => {
  let dataColor;
  let lengthOfColors = globalChartColor?.length;
  let noOfIterationInColors = 0;

  if (wordcloud_color === "0") {
    if (j >= lengthOfColors) {
      noOfIterationInColors = parseInt(j / lengthOfColors);
      let rem = parseInt(j % lengthOfColors);
      dataColor =
        noOfIterationInColors > 0
          ? newColorShadeInHex6(
              globalChartColor[rem],
              parseInt(noOfIterationInColors * 5)
            )
          : globalChartColor[j];
    } else {
      dataColor = globalChartColor[j];
    }
  } else if (wordcloud_color === "1") {
    if (data?.aspect_sentiment) {
      dataColor =
        data?.aspect_sentiment === "Positive"
          ? "#1c9f00"
          : data?.aspect_sentiment === "Negative"
          ? "#dc1e1e"
          : data?.aspect_sentiment === "Neutral"
          ? "#deaa0c"
          : data?.aspect_sentiment === "Others"
          ? "#6060FF"
          : data?.color;
    } else {
      dataColor =
        data?.SentimentType === "Positive"
          ? "#1c9f00"
          : data?.SentimentType === "Negative"
          ? "#dc1e1e"
          : data?.SentimentType === "Neutral"
          ? "#deaa0c"
          : data?.SentimentType === "Others"
          ? "#6060FF"
          : data?.color;
    }
  } else {
    dataColor = wordcloud_color;
  }
  return dataColor;
};

async function imageUrlToBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return base64Data;
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    return imageUrl;
  }
}
// function imageUrlToBase64(imageUrl) {
//   const xhr = new XMLHttpRequest();
//   xhr?.open("GET", imageUrl, false); // Synchronous request
//   xhr?.send();

//   if (xhr?.status === 200) {
//     // Convert the response to Base64
//     const base64Data = btoa(xhr?.responseText);
//     return `data:image/jpeg;base64,${base64Data}`; // Adjust the MIME type as needed
//   } else {
//     console.error("Error fetching image:", xhr.statusText);
//     return null;
//   }
// }

const getCircularImageOld = () => {
  // await domtoimage
  //       .toPng(htmlScreens, {
  //         cacheBust: true,
  //         cacheDisable: true,
  //       })
  //       .then((dataUrl) => {
  //         dispatch(setPptImageUrl(dataUrl, chartTypeData[i], image_list));
  //       })
  //       .catch(function (error) {
  //         console.error("oops, something went wrong!", error);
  //         dispatch(setPptImageUrl(null, chartTypeData[i], image_list));
  //       });

  // Base64-encoded circular image data URL
  const imageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";

  const markerStyle = {
    width: 30, // Set the marker size
    height: 30,
    backgroundImage: `url(${imageUrl})`, // Use the data URL
    backgroundSize: "cover", // Ensure the image fills the marker
    borderRadius: "50%", // Apply circular border radius
  };

  return <div style={markerStyle} />;
  return;
};

const getCircularImage = async (imageUrl) => {
  // const imageUrl = "https://example.com/image.jpg"; // Replace with your image URL
  const base64ImageFromUrl = await imageUrlToBase64(imageUrl);

  if (base64ImageFromUrl) {
    const markerStyle = {
      width: 30,
      height: 30,
      backgroundImage: `url(${base64ImageFromUrl})`, // Set the background image
      backgroundSize: "cover",
      borderRadius: "50%",
    };
    return <div style={markerStyle} />;
  } else {
    console.error("Error: Base64 image is null");
    return null;
  }
};
// const calculateImageWidth = (scale, numOfNetwork = 1) => {
//   // Get the screen width
//   const screenWidth = window.innerWidth;
//   const screenHeight = window.innerHeight;
//   console.log(
//     "screenWidth : ",
//     screenWidth,
//     "screenHeight : ",
//     screenHeight,
//     "scale : ",
//     scale
//   );

//   // Calculate the width of the image
//   const imageWidth = parseInt(
//     (Math.min(screenWidth, screenHeight) * scale) / numOfNetwork
//   );

//   return imageWidth;
// };
const getSingleNetworkSeriesData = (series, numOfNetwork, series_index) => {
  // console.log("getSingleNetworkSeriesData got called : ", series);
  let singleSeries = {
    id: "",
    data: [],
  };
  if (series?.data && Array.isArray(series?.data) && series?.data?.length > 0) {
    singleSeries.data = series?.data;
    singleSeries.id = series?.id ? series?.id : "network_graph_" + series_index;
    singleSeries.name = series?.name
      ? series?.name
      : "network_graph_" + series_index;
    singleSeries.keys = ["from", "to"]; // Define the keys for node connections
    const colorArray = globalChartColor;
    let j = 0;
    let noOfIterationInColors = 0;
    let lengthOfColors = colorArray?.length;
    singleSeries.nodes = Object.keys(series?.nodes).map(function (id, index) {
      let dataColor;
      let el = series?.nodes?.[id];
      if (
        el?.color !== undefined &&
        el?.color !== "#000000" &&
        el?.color !== null
      ) {
        dataColor = el?.color;
      } else {
        if (j >= lengthOfColors) {
          noOfIterationInColors = parseInt(j / lengthOfColors);
          let rem = parseInt(j % lengthOfColors);
          dataColor =
            noOfIterationInColors > 0
              ? newColorShadeInHex6(
                  globalChartColor[rem],
                  parseInt(noOfIterationInColors * 5)
                )
              : globalChartColor[j];
        } else {
          dataColor = globalChartColor[j];
        }
        j++;
      }
      let lighterColor = newColorShadeInHex6(dataColor, 60);
      let darkerColor = dataColor;
      if (
        el?.link_color !== undefined &&
        el?.link_color !== "#000000" &&
        el?.link_color !== null &&
        !singleSeries?.link
      ) {
        singleSeries.link = {
          color: el?.link_color,
        };
      } else if (!singleSeries?.link) {
        singleSeries.link = {
          color: dataColor,
        };
      }
      // // calculate width/height of image
      // let widthAndHeight = calculateImageWidth(el?.percent_share, numOfNetwork);
      // console.log("widthAndHeight : ", widthAndHeight);

      let base64ImageFromUrl = null;
      // Call imageUrlToBase64 function and handle the result
      // imageUrlToBase64(el?.u_picurl)
      //   .then((base64Image) => {
      //     console.log("Base64 image:", base64Image);
      //     base64ImageFromUrl = base64Image; // Set the Base64 image in component state
      //   })
      //   .catch((error) => {
      //     console.error("Error converting image to Base64:", error);
      //   });
      // base64ImageFromUrl = await getCircularImage(el?.u_picurl);

      // console.log("base64ImageFromUrl : ", base64ImageFromUrl);

      return {
        // ...el,
        id: el?.AuthorScreenName,
        name: el?.AuthorScreenName,
        label: el?.AuthorScreenName,
        marker: {
          enabled: true,
          radius:
            el?.radius > 100
              ? 100
              : el?.radius < 20
              ? 20
              : parseInt(el?.radius),
          // symbol: "circle",
          // symbol: base64ImageFromUrl ? `url(${base64ImageFromUrl})` : "circle",
          symbol: "url(" + el?.u_picurl + ")",
          width:
            el?.radius > 100
              ? 100
              : el?.radius < 20
              ? 20
              : parseInt(el?.radius),
          height:
            el?.radius > 100
              ? 100
              : el?.radius < 20
              ? 20
              : parseInt(el?.radius),
          lineColor: el?.link_color,
        },
        color: {
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7,
          },
          stops: [
            [0, lighterColor],
            [1, darkerColor], // darken
          ],
        },
      };
    });
  }
  return singleSeries;
};

const getNodeOfNetwork = (seriesData, id) => {
  let node;
  if (seriesData && Array.isArray(seriesData)) {
    for (let i = 0; i < seriesData?.length; i++) {
      let series = seriesData?.[i];
      if (series?.nodes?.[id]) {
        node = series?.nodes?.[id];
        break;
      }
    }
  } else if (seriesData && seriesData?.nodes) {
    if (seriesData?.nodes?.[id]) {
      node = seriesData?.nodes?.[id];
    }
  }
  return node;
};

export const getNetworkGraph = (graphObject, Highcharts, authParams) => {
  let sereisData = [];
  // sereisData?.push(getSingleNetworkSeriesData(sereisTempData?.[0]));
  if (graphObject?.single && Array.isArray(graphObject?.single)) {
    graphObject?.single?.forEach((series, series_index) => {
      sereisData?.push(
        getSingleNetworkSeriesData(
          series,
          graphObject?.single?.length,
          series_index
        )
      );
    });
  } else if (graphObject?.single && graphObject?.single?.data) {
    sereisData?.push(getSingleNetworkSeriesData(graphObject?.single, 1, 0));
  }
  const obj = {
    chart: {
      type: "networkgraph",
      reflow: true,
      height: graphObject?.style?.height,
    },
    title: {
      text: "",
    },
    exporting: {
      filename: graphObject?.widget_name
        ? graphObject?.widget_name
        : graphObject?.type,
      enabled: graphObject?.pdfDownloadStatus ? false : true,
      buttons: {
        contextButton: {
          menuItems: ["viewFullscreen"],
        },
      },
    },
    // exporting: {
    //   filename: graphObject?.widget_name
    //     ? graphObject?.widget_name
    //     : graphObject?.type,
    //   enabled: graphObject?.pdfDownloadStatus ? false : true,
    //   menuItemDefinitions: {
    //     // Custom definition
    //     xsl: {
    //       onclick: () => {
    //         const excel = new Excel();
    //         let columns = [
    //           {
    //             title: graphObject?.xaxis,
    //             dataIndex: graphObject?.xaxis,
    //           },
    //           {
    //             title: graphObject?.yaxis,
    //             dataIndex: graphObject?.yaxis,
    //           },
    //         ];

    //         let datasource = graphObject?.single[0]?.y?.map((yElem, i) => {
    //           return {
    //             [columns[0]?.title]: graphObject?.single[0]?.x[i],
    //             [columns[1]?.title]: yElem,
    //           };
    //         });
    //         excel
    //           .addSheet("test")
    //           .addColumns(columns)
    //           .addDataSource(datasource, {
    //             str2Percent: true,
    //           })
    //           .saveAs(
    //             `${
    //               graphObject?.widget_name
    //                 ? graphObject?.widget_name
    //                 : graphObject?.type
    //             }.xlsx`
    //           );
    //       },
    //       text: "Download excel sheet",
    //     },
    //   },
    //   buttons: {
    //     contextButton: {
    //       menuItems:
    //         graphObject?.xaxis && graphObject?.yaxis
    //           ? [
    //               "downloadPNG",
    //               "downloadJPEG",
    //               "downloadSVG",
    //               "separator",
    //               "xsl",
    //             ]
    //           : ["downloadPNG", "downloadJPEG", "downloadSVG"],
    //     },
    //   },
    // },
    credits: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            // legend: {
            //   layout: "horizontal",
            //   align: "center",
            //   verticalAlign: "bottom",
            // },
          },
        },
      ],
    },
    tooltip: {
      enabled: true,
      useHTML: true,
      borderWidth: 0,
      shadow: {
        color: "#0000001A",
      },

      style: {
        fontSize: "14px",
        fontFamily: '"Roboto", sans-serif',
        color: "#3b5175",
      },
      className: "custom_background",
      formatter: function () {
        let node = getNodeOfNetwork(graphObject?.single, this?.point?.name);
        let clr = this?.color
          ? this?.color?.stops?.length
            ? this?.color?.stops?.[0]?.[1]
            : this?.color
          : this?.series?.color?.stops?.length
          ? this?.series?.color?.stops?.[0]?.[1]
          : this?.points?.[0]?.color?.stops?.length
          ? this?.points?.[0]?.color?.stops?.[0]?.[1]
          : this?.series?.color;
        let yTooltipValue =
          node?.value >= 0
            ? node?.value?.toLocaleString()
            : this.point?.y >= 0
            ? this.point?.y?.toLocaleString()
            : this?.points?.[0]?.y;
        let yPercentValue = node?.percent >= 0 ? node?.percent : 0;
        let xTooltipValue = node?.name ? node.name : this.point?.name;
        return (
          "<div class='tooltip_chart--dark d-flex align-items-center fontSize-14 font-weight600'><span class='text-Darkgray  d-block mr-1'>" +
          xTooltipValue +
          " </span><span class='stackbar__tooltip' style='background-color:" +
          clr +
          ";'>" +
          yTooltipValue?.toLocaleString() +
          (yPercentValue
            ? " | " + yPercentValue?.toFixed(1)?.replace(/\.0$/, "") + "%"
            : "") +
          "</span></div>"
        );
      },
      style: {
        fontSize: "14px",
        fontFamily: '"Roboto", sans-serif',
        color: authParams?.theme_type === "1" ? "#b1bdd0" : "#3B5175",
      },
    },
    plotOptions: {
      networkgraph: {
        accessibility: {
          enabled: true,
        },
        dataLabels: {
          enabled: graphObject?.chartGlobalDataLabel ? true : false,
          linkFormat: "",
          // style: {
          //   fontSize: "0.8em",
          //   fontWeight: "normal",
          // },
          allowOverlap: true,
        },
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: true,
          integration: "verlet",
          // linkLength: graphObject?.networkLinkLength
          //   ? graphObject?.networkLinkLength
          //   : 150,
          linkLength: 125,
          // maxIterations: 1000,
          // friction: -0.9,
        },
      },
    },
    series: sereisData,
  };
  return obj;
};

let selectedColorArray = globalChartColor;
export const getSankey = (graphObject, authParams) => {
  selectedColorArray = graphObject?.accentColors
    ? graphObject?.accentColors
    : globalChartColor;
  let j = 0;
  let noOfIterationInColors = 0;
  let lengthOfColors = selectedColorArray?.length;
  let multiData = graphObject?.single?.nodes?.map((el, i) => {
    let dataColor;
    if (el?.id === "start_Positive" || el?.id === "end_Positive") {
      dataColor = "#35B819";
    } else if (el?.id === "start_Negative" || el?.id === "end_Negative") {
      dataColor = "#F33737";
    } else if (el?.id === "start_Neutral" || el?.id === "end_Neutral") {
      dataColor = "#DEAA0C";
    } else if (
      el?.color !== undefined &&
      el?.color !== "#000000" &&
      el?.color !== null
    ) {
      dataColor = el?.color;
    } else {
      if (j >= lengthOfColors) {
        noOfIterationInColors = parseInt(j / lengthOfColors);
        let rem = parseInt(j % lengthOfColors);
        dataColor =
          noOfIterationInColors > 0
            ? newColorShadeInHex6(
                selectedColorArray[rem],
                parseInt(noOfIterationInColors * 5)
              )
            : selectedColorArray[j];
      } else {
        dataColor = selectedColorArray[j];
      }
      j++;
    }
    return {
      id: el?.id,
      color: dataColor,
      name: el?.display_name,
    };
  });
  function convertToSankeyData(inputData) {
    let sankeyData = inputData?.map((item) => {
      const [from, to, weight, colors] = item;
      return [
        from,
        to,
        weight,
        {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
          stops: [
            [0, colors?.[0]],
            [1, colors?.[1]],
          ],
        },
      ];
    });

    return sankeyData;
  }
  let sankeyData = convertToSankeyData(graphObject?.single?.data);
  const obj = {
    title: {
      text: "",
    },
    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.from} to {point.to}, " + "{point.weight}.",
      },
    },
    tooltip: {
      enabled: true,
      useHTML: true,
      borderWidth: 0,
      headerFormat: null,
      shadow: false,
      backgroundColor: "transparent",
      pointFormatter: function () {
        let clr = this?.color;
        return (
          '<div class="tooltip_chart"><span class="text-Darkgray fontSize-14 font-weight600 d-block mb-1">' +
          this.from +
          "\u2192" +
          this?.to +
          " " +
          '<span class="stackbar__tooltip" style="background-color:' +
          this?.options?.color?.stops?.[1]?.[1] +
          ';">' +
          this?.weight +
          "</span></span></div>"
        );
      },
      nodeFormatter: function () {
        let clr = this?.color;
        return (
          '<div class="tooltip_chart"><span class="text-Darkgray fontSize-14 font-weight600 d-block mb-1">' +
          this?.name +
          " " +
          '<span class="stackbar__tooltip" style="background-color:' +
          clr +
          ';">' +
          this?.sum +
          "</span></span></div>"
        );
      },
    },
    style: {
      height: graphObject?.style?.height,
      width: graphObject?.style?.width,
    },
    series: [
      {
        keys: ["from", "to", "weight", "color"],
        nodes: multiData,
        data: sankeyData,
        type: "sankey",
      },
    ],
    exporting: {
      filename: graphObject?.widget_name
        ? graphObject?.widget_name
        : graphObject?.type,
      enabled:
        graphObject?.pdfDownloadStatus ||
        graphObject?.pptDownloadStatus ||
        graphObject?.isScheduleReportOpen ||
        authParams?.screen_id
          ? false
          : true,

      buttons: {
        contextButton: {
          menuItems:
            graphObject?.xaxis && graphObject?.yaxis
              ? ["downloadPNG", "downloadJPEG", "downloadSVG"]
              : ["downloadPNG", "downloadJPEG", "downloadSVG"],
          buttonSpacing: 1,
          height: 20,
          symbolSize: 12,
          symbolStrokeWidth: 2,
          symbolX: 10.5,
          symbolY: 10.5,
          width: 20,
          x: -2,
          y: -12,
        },
      },
    },
  };
  return obj;
};
