import React from "react";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import { getPaneIndex, kFormatter } from "../../../../redux/constants";
import defaultImage from "../../../../assets/Pages/default_profile_img.png";
import { SocialMedialogo } from "./SocialMediaPlatforms";
import { SecondstoHumanReadable } from "../../../utils/charts/HighCharts/graphFunction";
// import { getCountryLogo, getGenderLogo } from "../../../../utils/Logos";

const KpiCards = ({
  metaWidgetKpiData,
  widgetGraphConfig,
  count,
  cardPosition,
  widgetShareOfData,
  widgetDurationComparison,
  type,
  dashboard,
  PdfDownloadStatus,
  ppt_generating_status,
  widget_index,
  section_index,
  kpi_data,
  noteExist,
  metaWidgetConfig,
}) => {
  const dispatch = useDispatch();
  const panes = useSelector((state) => state?.Tab1?.panes);
  const activeKey = useSelector((state) => state?.Tab1?.activeKey);

  const graphConditionConfig = useSelector(
    (state) => state?.apiCall?.graphConditions
  );
  let index = getPaneIndex(panes, activeKey);

  let widget_metadata = panes?.[index]?.section?.[0]?.widgets?.[widget_index];

  const isString = (value) => {
    return typeof value === "string";
  };

  const TooltipFormatter = (num) => {
    if (Math.abs(num)) {
      return (Math.round(num * 100) / 100).toFixed(2);
    } else return num;
  };

  if (cardPosition == undefined) cardPosition = "";

  let flrSeriesExists = false;
  metaWidgetConfig?.y_series?.forEach((yseries, index) => {
    if (yseries?.attribute) {
      if (yseries?.attribute === "flr") {
        flrSeriesExists = true;
      }
    } else {
      flrSeriesExists = false;
    }
  });

  return (
    <>
      {kpi_data?.map((data, i) => {
        count = count + 1;
        const pptStatus =
          ppt_generating_status &&
          (cardPosition === "Left" || cardPosition === "Right")
            ? count <= 5
            : (PdfDownloadStatus || ppt_generating_status) && type !== "kpi"
            ? cardPosition &&
              (cardPosition === "Left" || cardPosition === "Right")
              ? noteExist
                ? count <= 6
                : count <= 8
              : count <= 15
            : count <= 15;

        const valueArray = isNaN(data?.value) && data?.value?.split(",");
        let channelImage =
          isString(data?.text) && data?.text?.includes("|$|")
            ? data?.text?.split("|$|")?.[0]?.trim()
            : null;
        let ProfileName =
          isString(data?.text) && data?.text?.includes("|$|")
            ? data?.text?.split("|$|")?.[1]?.trim()
            : null;
        let profile_filter_flag = data?.[0]?.text?.includes("|$|");
        let genderName =
          isString(data?.text) && data?.text?.includes("|G|")
            ? data?.text?.split("|G|")?.[1]?.trim()
            : null;
        let countryName =
          isString(data?.text) && data?.text?.includes("|C|")
            ? data?.text?.split("|C|")?.[1]?.trim()
            : null;
        if (pptStatus)
          if (Array.isArray(data)) {
            let channelImage1 = data?.[0]?.text?.split("|$|")?.[0]?.trim();
            let ProfileName1 = data?.[0]?.text?.split("|$|")?.[1]?.trim();
            let genderName1 = data?.[0]?.text?.split("|G|")?.[1]?.trim();
            let countryName1 = data?.[0]?.text?.split("|C|")?.[1]?.trim();
            let flrValue =
              flrSeriesExists &&
              data?.value &&
              data?.value?.toString()?.includes(" | ") &&
              data?.value?.toString()?.split(" | ");
            return (
              <>
                <div
                  key={`${data?.value}_${i}`}
                  className={`portlet1 border-color ${
                    ppt_generating_status ? "border" : ""
                  } ${
                    PdfDownloadStatus || ppt_generating_status
                      ? cardPosition === "Left"
                        ? "border-bottom border-right p-5"
                        : cardPosition === "Right"
                        ? "border-bottom border-left border-right p-5"
                        : "border-bottom border-right p-5"
                      : cardPosition === "Left"
                      ? "border-bottom border-right p-3"
                      : cardPosition === "Right"
                      ? "border-bottom border-left border-right p-3"
                      : "border-bottom border-right pt-4 pb-4"
                  } text-center ${
                    (cardPosition && cardPosition === "Left") ||
                    cardPosition === "Right"
                      ? "wm-chart-cards-left w-100"
                      : ""
                  }`}
                  style={
                    data?.color && data?.color?.trim() != "#000000"
                      ? {
                          boxShadow: "0 0 6px " + data?.color?.trim() + "10",
                          //border: "1px solid " + data?.color?.trim() + "80",
                          backgroundColor: data?.color?.trim() + "30",
                          color: "#",
                          cursor: data?.attribute ? "pointer" : null,
                          flex:
                            cardPosition === "Left" ||
                            cardPosition === "Right" ||
                            (ppt_generating_status &&
                              type !== "kpi" &&
                              widget_metadata?.span !== "one_third" &&
                              widget_metadata?.span !== "half" &&
                              kpi_data?.length <= 4)
                              ? ""
                              : widget_metadata?.span === "half" &&
                                !PdfDownloadStatus
                              ? "1 0 calc(50% - 1.5rem)"
                              : widget_metadata?.span === "one_third" &&
                                !PdfDownloadStatus
                              ? "1 0 calc(100% - 15px)"
                              : PdfDownloadStatus || ppt_generating_status
                              ? "1 0 calc(20% - 15px)"
                              : "1 0 calc(25% - 15px)",
                          width:
                            cardPosition === "Left" || cardPosition === "Right"
                              ? ""
                              : ppt_generating_status &&
                                type !== "kpi" &&
                                widget_metadata?.span !== "one_third" &&
                                widget_metadata?.span !== "half" &&
                                kpi_data?.length <= 4
                              ? kpi_data?.length === 1
                                ? "100%"
                                : kpi_data?.length === 2
                                ? "50%"
                                : kpi_data?.length === 3
                                ? "33.3%"
                                : kpi_data?.length === 4
                                ? "25%"
                                : ""
                              : "",
                        }
                      : {
                          boxShadow: "0 0 6px #c3cbd710",
                          // border:
                          //   authParams?.theme_type === "1"
                          //     ? ""
                          //     : "1px solid #c3cbd7",
                          cursor: data?.attribute ? "pointer" : null,
                          flex:
                            cardPosition === "Left" ||
                            cardPosition === "Right" ||
                            (ppt_generating_status &&
                              type !== "kpi" &&
                              widget_metadata?.span !== "one_third" &&
                              widget_metadata?.span !== "half" &&
                              kpi_data?.length <= 4)
                              ? ""
                              : widget_metadata?.span === "half" &&
                                !PdfDownloadStatus
                              ? "1 0 calc(50% - 1.5rem)"
                              : widget_metadata?.span === "one_third" &&
                                !PdfDownloadStatus
                              ? "1 0 calc(100% - 15px)"
                              : PdfDownloadStatus || ppt_generating_status
                              ? "1 0 calc(20% - 15px)"
                              : "1 0 calc(25% - 15px)",
                          width:
                            cardPosition === "Left" || cardPosition === "Right"
                              ? ""
                              : ppt_generating_status &&
                                type !== "kpi" &&
                                widget_metadata?.span !== "one_third" &&
                                widget_metadata?.span !== "half" &&
                                kpi_data?.length <= 4
                              ? kpi_data?.length === 1
                                ? "100%"
                                : kpi_data?.length === 2
                                ? "50%"
                                : kpi_data?.length === 3
                                ? "33.3%"
                                : kpi_data?.length === 4
                                ? "25%"
                                : ""
                              : "",
                        }
                  }
                  // onClick={}
                >
                  <Tooltip
                    title={
                      data?.[0]?.text && data?.[0]?.text?.includes("|$|") ? (
                        <>
                          <img
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                            src={
                              channelImage1
                                ? SocialMedialogo?.[channelImage1]
                                : defaultImage
                            }
                          />
                          {ProfileName1}
                        </>
                      ) : data?.[0]?.text &&
                        data?.[0]?.text?.includes("|G|") ? (
                        <>
                          <img
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                            src={getGenderLogo(genderName1)}
                          />
                          {genderName1}
                        </>
                      ) : data?.[0]?.text &&
                        data?.[0]?.text?.includes("|C|") ? (
                        <>
                          {getCountryLogo(countryName1)}
                          {countryName1}
                        </>
                      ) : (
                        ""
                      )
                    }
                  >
                    <span
                      className={`${
                        ppt_generating_status ? "d-block" : "d-inline-block"
                      } text-ellipsis wm-chart-card-title`}
                      style={{ width: ppt_generating_status ? "100%" : "" }}
                    >
                      {data?.[0]?.text && data?.[0]?.text?.includes("|$|") ? (
                        <>
                          <img
                            style={{
                              width: "15px",
                              height: "15px",
                              margin: "5px",
                            }}
                            src={
                              channelImage1
                                ? SocialMedialogo?.[channelImage1]
                                : defaultImage
                            }
                          />
                          {ProfileName1}
                        </>
                      ) : data?.[0]?.text &&
                        data?.[0]?.text?.includes("|G|") ? (
                        <>
                          <img
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                            src={getGenderLogo(genderName1)}
                          />
                          {genderName1}
                        </>
                      ) : data?.[0]?.text &&
                        data?.[0]?.text?.includes("|C|") ? (
                        <>
                          {getCountryLogo(countryName1)}
                          {countryName1}
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </Tooltip>
                  <div className="row m-0">
                    <div className="col-12 col-md-6 border-right border-color px-5px">
                      {widgetShareOfData && data?.share ? (
                        <>
                          <div className="d-flex align-items-baseline justify-content-center">
                            <Tooltip
                              placement="bottom"
                              title={
                                data?.value && flrSeriesExists
                                  ? data?.value?.toString()?.includes(" | ")
                                    ? SecondstoHumanReadable(
                                        flrValue?.[0],
                                        true
                                      ) +
                                      " | " +
                                      flrValue?.[1]
                                    : SecondstoHumanReadable(data?.value, true)
                                  : data?.value
                                  ? TooltipFormatter(data?.value)
                                  : ""
                              }
                            >
                              <span
                                className={`${
                                  data?.text_color &&
                                  data?.text_color !== "#000000"
                                    ? "wm-chart-card-value-color"
                                    : "wm-chart-card-value"
                                } mr-1 no--wrap`}
                                style={
                                  data?.text_color &&
                                  data?.text_color !== "#000000"
                                    ? { color: data?.text_color }
                                    : {}
                                }
                              >
                                {data?.value === null
                                  ? "NA"
                                  : data?.value && flrSeriesExists
                                  ? data?.value?.toString()?.includes(" | ")
                                    ? SecondstoHumanReadable(
                                        flrValue?.[0],
                                        true
                                      ) +
                                      " | " +
                                      flrValue?.[1]
                                    : SecondstoHumanReadable(data?.value, true)
                                  : graphConditionConfig?.round_kpi_attrs?.includes(
                                      data?.attribute
                                    )
                                  ? isNaN(data?.value) && valueArray?.length > 1
                                    ? valueArray[0] + " " + valueArray[1]
                                    : kFormatter(data?.value, false, true)
                                  : isNaN(data?.value) && valueArray?.length > 1
                                  ? valueArray[0] + " " + valueArray[1]
                                  : kFormatter(data?.value, true)}
                              </span>
                            </Tooltip>
                            {data?.share ? (
                              <span className="d-flex align-items-center font-size12 font-weight600 text-blue cursor-default ml-1 no--wrap">
                                {/* <img
                                          src={ShareIcon}
                                          style={{ maxWidth: "15px" }}
                                          className="mr-1"
                                        /> */}
                                <span
                                  className="pie__of--share mr-1"
                                  style={{
                                    border: "2px solid " + "#185EDF",
                                    backgroundImage:
                                      "conic-gradient(" +
                                      "#185EDF " +
                                      data?.share * 3.6 +
                                      "deg,#ffff " +
                                      data?.share * 3.6 +
                                      "deg)",
                                  }}
                                ></span>
                                <span>{data?.share} %</span>
                              </span>
                            ) : (
                              <span className="text_regular font-size12 font-weight600 text-gray"></span>
                            )}
                          </div>
                          <div>
                            {widgetDurationComparison &&
                            data?.percent_change !== null ? (
                              <span
                                className={`text_regular justify-content-center ${
                                  data?.percent_change === 0
                                    ? "d-flex"
                                    : "d-flex"
                                } align-items-baseline ${
                                  String(data?.text).toLowerCase() ===
                                  String("Negative").toLowerCase()
                                    ? data?.percent_change > 0
                                      ? "negative"
                                      : data?.percent_change < 0
                                      ? "positive"
                                      : "text-gray"
                                    : data?.percent_change > 0
                                    ? "positive"
                                    : data?.percent_change < 0
                                    ? "negative"
                                    : "text-gray"
                                } font-size12`}
                              >
                                {data?.percent_change === null ? (
                                  ""
                                ) : data?.percent_change > 0 ? (
                                  <>
                                    <CaretUpFilled className="font-size18" />
                                    {" " +
                                      Number(
                                        data?.percent_change
                                      )?.toLocaleString() +
                                      "%"}
                                  </>
                                ) : data?.percent_change < 0 ? (
                                  <>
                                    <CaretDownFilled className="font-size18" />
                                    {" " +
                                      Number(
                                        data?.percent_change
                                      )?.toLocaleString() +
                                      "%"}
                                  </>
                                ) : (
                                  data?.percent_change !== null && "NA"
                                )}{" "}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="d-flex align-items-baseline justify-content-center">
                          <span
                            className={`${
                              data?.[0]?.text_color &&
                              data?.[0]?.text_color !== "#000000"
                                ? "wm-chart-card-value-color"
                                : "wm-chart-card-value"
                            } mr-1`}
                            style={
                              data?.[0]?.text_color &&
                              data?.[0]?.text_color !== "#000000"
                                ? { color: data?.[0]?.text_color }
                                : {}
                            }
                          >
                            <Tooltip
                              placement="bottom"
                              className="d-flex"
                              title={
                                data?.[0]?.value
                                  ? TooltipFormatter(data?.[0]?.value)
                                  : ""
                              }
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {data?.[0]?.value === null
                                ? "NA"
                                : graphConditionConfig?.round_kpi_attrs?.includes(
                                    data?.[0]?.attribute
                                  )
                                ? isNaN(data?.[0]?.value) &&
                                  valueArray?.length > 1
                                  ? valueArray[0] + " " + valueArray[1]
                                  : kFormatter(data?.[0]?.value, false, true)
                                : isNaN(data?.[0]?.value) &&
                                  valueArray?.length > 1
                                ? valueArray[0] + " " + valueArray[1]
                                : kFormatter(data?.[0]?.value, true)}
                            </Tooltip>
                          </span>

                          {widgetDurationComparison &&
                          data?.percent_change !== null ? (
                            <span
                              className={`text_regular ${
                                data?.percent_change === 0 ? "d-flex" : "d-flex"
                              } align-items-baseline ${
                                String(data?.text).toLowerCase() ===
                                String("Negative").toLowerCase()
                                  ? data?.percent_change > 0
                                    ? "negative"
                                    : data?.percent_change < 0
                                    ? "positive"
                                    : "text-gray"
                                  : data?.percent_change > 0
                                  ? "positive"
                                  : data?.percent_change < 0
                                  ? "negative"
                                  : "text-gray"
                              } font-size12`}
                            >
                              {data?.percent_change === null ? (
                                ""
                              ) : data?.percent_change > 0 ? (
                                <>
                                  <CaretUpFilled className="font-size18" />
                                  {" " +
                                    Number(
                                      data?.percent_change
                                    )?.toLocaleString() +
                                    "%"}
                                </>
                              ) : data?.percent_change < 0 ? (
                                <>
                                  <CaretDownFilled className="font-size18" />
                                  {" " +
                                    Number(
                                      data?.percent_change
                                    )?.toLocaleString() +
                                    "%"}
                                </>
                              ) : (
                                data?.percent_change !== null && "NA"
                              )}{" "}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                      <div className="wm-chart-card-title line-height-normal">
                        <Tooltip
                          title="Total / New Followers"
                          placement="top"
                          className="text-ellipsis d-inline-block wm-chart-card-title"
                        >
                          {data?.[0]?.base_name}
                        </Tooltip>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 px-5px">
                      <Tooltip
                        title={
                          data?.[1]?.base_name && <>{data?.[1]?.base_name}</>
                        }
                        placement="top"
                        className="text-ellipsis d-inline-block wm-chart-card-title"
                      >
                        <div className="wm-chart-card-value">
                          {data?.[1]?.value}
                        </div>
                        <div className="text-ellipsis d-inline-block wm-chart-card-title line-height-normal">
                          {data?.[1]?.base_name && <>{data?.[1]?.base_name}</>}
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </>
            );
          } else {
            let flrValue =
              flrSeriesExists &&
              data?.value &&
              data?.value?.toString()?.includes(" | ") &&
              data?.value?.toString()?.split(" | ");
            return (
              <div
                key={`${data?.value}_${i}`}
                className={`portlet1 border-color ${
                  ppt_generating_status ? "border" : ""
                } ${
                  PdfDownloadStatus || ppt_generating_status
                    ? cardPosition === "Left"
                      ? "border-bottom border-right p-5"
                      : cardPosition === "Right"
                      ? "border-bottom border-left border-right p-5"
                      : "border-bottom border-right p-5"
                    : cardPosition === "Left"
                    ? "border-bottom border-right p-3"
                    : cardPosition === "Right"
                    ? "border-bottom border-left border-right p-3"
                    : "border-bottom border-right pt-4 pb-4"
                } text-center ${
                  (cardPosition && cardPosition === "Left") ||
                  cardPosition === "Right"
                    ? "wm-chart-cards-left w-100"
                    : ""
                }`}
                style={
                  data?.color && data?.color?.trim() != "#000000"
                    ? {
                        boxShadow: "0 0 6px " + data?.color?.trim() + "10",
                        //border: "1px solid " + data?.color?.trim() + "80",
                        backgroundColor: data?.color?.trim() + "30",
                        color: "#",
                        cursor: data?.attribute ? "pointer" : null,
                        flex:
                          cardPosition === "Left" ||
                          cardPosition === "Right" ||
                          (ppt_generating_status &&
                            type !== "kpi" &&
                            widget_metadata?.span !== "one_third" &&
                            widget_metadata?.span !== "half" &&
                            kpi_data?.length <= 4)
                            ? ""
                            : widget_metadata?.span === "half" &&
                              !PdfDownloadStatus
                            ? "1 0 calc(50% - 1.5rem)"
                            : widget_metadata?.span === "one_third" &&
                              !PdfDownloadStatus
                            ? "1 0 calc(100% - 15px)"
                            : PdfDownloadStatus || ppt_generating_status
                            ? "1 0 calc(20% - 15px)"
                            : "1 0 calc(25% - 15px)",
                        width:
                          cardPosition === "Left" || cardPosition === "Right"
                            ? ""
                            : ppt_generating_status &&
                              type !== "kpi" &&
                              widget_metadata?.span !== "one_third" &&
                              widget_metadata?.span !== "half" &&
                              kpi_data?.length <= 4
                            ? kpi_data?.length === 1
                              ? "100%"
                              : kpi_data?.length === 2
                              ? "50%"
                              : kpi_data?.length === 3
                              ? "33.3%"
                              : kpi_data?.length === 4
                              ? "25%"
                              : ""
                            : "",
                      }
                    : {
                        boxShadow: "0 0 6px #c3cbd710",
                        // border:
                        //   authParams?.theme_type === "1"
                        //     ? ""
                        //     : "1px solid #c3cbd7",
                        cursor: data?.attribute ? "pointer" : null,
                        flex:
                          cardPosition === "Left" ||
                          cardPosition === "Right" ||
                          (ppt_generating_status &&
                            type !== "kpi" &&
                            widget_metadata?.span !== "one_third" &&
                            widget_metadata?.span !== "half" &&
                            kpi_data?.length <= 4)
                            ? ""
                            : widget_metadata?.span === "half" &&
                              !PdfDownloadStatus
                            ? "1 0 calc(50% - 1.5rem)"
                            : widget_metadata?.span === "one_third" &&
                              !PdfDownloadStatus
                            ? "1 0 calc(100% - 15px)"
                            : PdfDownloadStatus || ppt_generating_status
                            ? "1 0 calc(20% - 15px)"
                            : "1 0 calc(25% - 15px)",
                        width:
                          cardPosition === "Left" || cardPosition === "Right"
                            ? ""
                            : ppt_generating_status &&
                              type !== "kpi" &&
                              widget_metadata?.span !== "one_third" &&
                              widget_metadata?.span !== "half" &&
                              kpi_data?.length <= 4
                            ? kpi_data?.length === 1
                              ? "100%"
                              : kpi_data?.length === 2
                              ? "50%"
                              : kpi_data?.length === 3
                              ? "33.3%"
                              : kpi_data?.length === 4
                              ? "25%"
                              : ""
                            : "",
                      }
                }
                //   onClick={}
              >
                <div className="wm-chart-card-title mb-1 line-height-normal">
                  <Tooltip
                    title={
                      channelImage ? (
                        <>
                          <img
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                            src={
                              channelImage
                                ? SocialMedialogo?.[channelImage]
                                : defaultImage
                            }
                          />
                          {ProfileName}
                        </>
                      ) : genderName ? (
                        <>
                          <img
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                            src={getGenderLogo(genderName)}
                          />
                          {genderName}
                        </>
                      ) : countryName ? (
                        <>
                          {getCountryLogo(countryName)}
                          {countryName}
                        </>
                      ) : (
                        <>
                          {data?.attribute?.toLowerCase() === "rating"
                            ? `${data?.text} ⭐`
                            : data?.text}
                        </>
                      )
                    }
                    placement="top"
                    className="text-ellipsis d-inline-block wm-chart-card-title"
                  >
                    <span>
                      {channelImage ? (
                        <>
                          <img
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                            src={
                              channelImage
                                ? SocialMedialogo?.[channelImage]
                                : defaultImage
                            }
                          />
                          {ProfileName}
                        </>
                      ) : genderName ? (
                        <>
                          <img
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                            src={getGenderLogo(genderName)}
                          />
                          {genderName}
                        </>
                      ) : countryName ? (
                        <>
                          {getCountryLogo(countryName)}
                          {countryName}
                        </>
                      ) : (
                        <>
                          {data?.attribute?.toLowerCase() === "rating"
                            ? `${
                                data?.text?.length >= 40
                                  ? `${data?.text.substring(0, 40)}...`
                                  : data?.text
                              } ⭐`
                            : data?.text?.length >= 40
                            ? `${data?.text.substring(0, 40)}...`
                            : data?.text}
                        </>
                      )}
                    </span>
                  </Tooltip>
                  {data?.info_help_text && (
                    <Tooltip
                      title={data?.info_help_text}
                      placement="top"
                      className="text-ellipsis d-inline-block"
                    >
                      <i className="fa fa-question-circle cursor-pointer ml-1" />
                    </Tooltip>
                  )}
                  {data?.info_text && (
                    <Tooltip
                      title={data?.info_text}
                      placement="top"
                      className="text-ellipsis d-inline-block wm-chart-card-title"
                    >
                      <i className="fa fa-info-circle cursor-pointer ml-1" />
                    </Tooltip>
                  )}
                </div>
                {widgetShareOfData && data?.share ? (
                  <>
                    <div className={`d-flex align-items-baseline`}>
                      <Tooltip
                        placement="bottom"
                        title={
                          data?.value && flrSeriesExists
                            ? data?.value?.toString()?.includes(" | ")
                              ? SecondstoHumanReadable(flrValue?.[0], true) +
                                " | " +
                                flrValue?.[1]
                              : SecondstoHumanReadable(data?.value, true)
                            : data?.value
                            ? TooltipFormatter(data?.value)
                            : ""
                        }
                      >
                        <span
                          className={`${
                            data?.text_color && data?.text_color !== "#000000"
                              ? "wm-chart-card-value-color"
                              : "wm-chart-card-value"
                          } mr-1 no--wrap`}
                          style={
                            data?.text_color && data?.text_color !== "#000000"
                              ? { color: data?.text_color }
                              : {}
                          }
                        >
                          {data?.value === null
                            ? "NA"
                            : data?.value && flrSeriesExists
                            ? data?.value?.toString()?.includes(" | ")
                              ? SecondstoHumanReadable(flrValue?.[0], true) +
                                " | " +
                                flrValue?.[1]
                              : SecondstoHumanReadable(data?.value, true)
                            : graphConditionConfig?.round_kpi_attrs?.includes(
                                data?.attribute
                              )
                            ? isNaN(data?.value) && valueArray?.length > 1
                              ? valueArray[0] + " " + valueArray[1]
                              : kFormatter(data?.value, false, true)
                            : isNaN(data?.value) && valueArray?.length > 1
                            ? valueArray[0] + " " + valueArray[1]
                            : kFormatter(data?.value, true)}
                        </span>
                      </Tooltip>
                      {data?.share ? (
                        <span className="d-flex align-items-center font-size12 font-weight600 text-blue cursor-default ml-1 no--wrap">
                          {/* <img
                                          src={ShareIcon}
                                          style={{ maxWidth: "15px" }}
                                          className="mr-1"
                                        /> */}
                          <span
                            className="pie__of--share mr-1"
                            style={{
                              border: "2px solid " + "#185EDF",
                              backgroundImage:
                                "conic-gradient(" +
                                "#185EDF " +
                                data?.share * 3.6 +
                                "deg,#ffff " +
                                data?.share * 3.6 +
                                "deg)",
                            }}
                          ></span>
                          <span>{data?.share} %</span>
                        </span>
                      ) : (
                        <span className="text_regular font-size12 font-weight600 text-gray"></span>
                      )}
                    </div>
                    <div>
                      {widgetDurationComparison &&
                      data?.percent_change !== null ? (
                        <span
                          className={`text_regular justify-content-center ${
                            data?.percent_change === 0 ? "d-flex" : "d-flex"
                          } align-items-baseline ${
                            String(data?.text).toLowerCase() ===
                            String("Negative").toLowerCase()
                              ? data?.percent_change > 0
                                ? "negative"
                                : data?.percent_change < 0
                                ? "positive"
                                : "text-gray"
                              : data?.percent_change > 0
                              ? "positive"
                              : data?.percent_change < 0
                              ? "negative"
                              : "text-gray"
                          } font-size12`}
                        >
                          {data?.percent_change === null ? (
                            ""
                          ) : data?.percent_change > 0 ? (
                            <>
                              <CaretUpFilled className="font-size18" />
                              {" " +
                                Number(data?.percent_change)?.toLocaleString() +
                                "%"}
                            </>
                          ) : data?.percent_change < 0 ? (
                            <>
                              <CaretDownFilled className="font-size18" />
                              {" " +
                                Number(data?.percent_change)?.toLocaleString() +
                                "%"}
                            </>
                          ) : (
                            data?.percent_change !== null && "NA"
                          )}{" "}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  <div className={`d-flex align-items-baseline`}>
                    <Tooltip
                      placement="bottom"
                      //className="d-flex"
                      title={
                        data?.value && flrSeriesExists
                          ? data?.value?.toString()?.includes(" | ")
                            ? SecondstoHumanReadable(flrValue?.[0], true) +
                              " | " +
                              flrValue?.[1]
                            : SecondstoHumanReadable(data?.value, true)
                          : data?.value
                      }
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <span
                        className={`${
                          data?.text_color && data?.text_color !== "#000000"
                            ? "wm-chart-card-value-color"
                            : "wm-chart-card-value"
                        } mr-1 no--wrap`}
                        style={
                          widget_metadata?.widget_id === "000-100-984"
                            ? { color: "#fff" }
                            : data?.text_color && data?.text_color !== "#000000"
                            ? { color: data?.text_color }
                            : {}
                        }
                      >
                        {data?.value === null
                          ? "NA"
                          : data?.value && flrSeriesExists
                          ? data?.value?.toString()?.includes(" | ")
                            ? SecondstoHumanReadable(flrValue?.[0], true) +
                              " | " +
                              flrValue?.[1]
                            : SecondstoHumanReadable(data?.value, true)
                          : graphConditionConfig?.round_kpi_attrs?.includes(
                              data?.attribute
                            )
                          ? isNaN(data?.value) && valueArray?.length > 1
                            ? valueArray[0] + " " + valueArray[1]
                            : kFormatter(data?.value, false, true)
                          : isNaN(data?.value) && valueArray?.length > 1
                          ? valueArray[0] + " " + valueArray[1]
                          : kFormatter(data?.value, true)}
                      </span>
                    </Tooltip>
                    {widgetDurationComparison &&
                    data?.percent_change !== null ? (
                      <span
                        className={`text_regular ${
                          data?.percent_change === 0 ? "d-flex" : "d-flex"
                        } align-items-baseline ${
                          String(data?.text).toLowerCase() ===
                          String("Negative").toLowerCase()
                            ? data?.percent_change > 0
                              ? "negative"
                              : data?.percent_change < 0
                              ? "positive"
                              : "text-gray"
                            : data?.percent_change > 0
                            ? "positive"
                            : data?.percent_change < 0
                            ? "negative"
                            : "text-gray"
                        } font-size12`}
                      >
                        {data?.percent_change === null ? (
                          ""
                        ) : data?.percent_change > 0 ? (
                          <>
                            <CaretUpFilled className="font-size18" />
                            {" " +
                              Number(data?.percent_change)?.toLocaleString() +
                              "%"}
                          </>
                        ) : data?.percent_change < 0 ? (
                          <>
                            <CaretDownFilled className="font-size18" />
                            {" " +
                              Number(data?.percent_change)?.toLocaleString() +
                              "%"}
                          </>
                        ) : (
                          data?.percent_change !== null && "NA"
                        )}{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            );
          }
      })}
    </>
  );
};

export default KpiCards;
