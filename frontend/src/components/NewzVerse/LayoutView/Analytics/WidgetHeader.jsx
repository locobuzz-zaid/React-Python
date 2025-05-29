import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./WidgetHeader.scss";

const WidgetHeader = ({
  graph, //graph page
  id,
  type,
  graph_type,
  data,
  section_id,
  widget_id,
  section_index,
  span,
  widget_index,
  widget_name,
  widget_description,
  widgets,
  template_widget,
  dashboard,
  datatype,
  stacked,
  desc,
  allData,
  sections,
  splitcolumns,
  chart_type,
  metaWidgetGraphData,
  note,
  widHeaderLoader,
  widgetData,
  insightsExist,
  pane_section,
  templateAccessType,
  selectedDeepdiveWidget,
  filterPills,
  metadata,
  isPreviewState,
  isAnimatedCardWidget,
}) => {
  const dispatch = useDispatch();
  const authParams = useSelector((state) => state.Authentication.authParams);

  return (
    <>
      <div
        className="cards_header"
        style={{
          background: "#fff",
          border: "1px solid #edf2f6",
          boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
          padding: "15px",
        }}
      >
        {
          <div
            className={`d-flex justify-content-between align-items-center w-100 ${
              widHeaderLoader ? "" : ""
            } `}
            id={
              selectedDeepdiveWidget?.section_index === section_index &&
              selectedDeepdiveWidget?.widget_index === widget_index
                ? `${
                    section_index ? section_index : "widget_only"
                  }_${widget_index}`
                : ""
            }
          >
            <div className="portlet__title fontSize-16 font-weight500">
              <span style={{ fontSize: "14px", fontWeight: "600" }}>
                {widget_name}
              </span>
            </div>

            {/* For Animated Duration Selection */}
            {/* {isAnimatedCardWidget &&
            !isPdfPreview &&
            !isScheduleReportOpen &&
            !isPPTModalOpen &&
            !PdfDownloadStatus &&
            !widHeaderLoader &&
            typeof widgetData?.graphData !== "string" ? (
              <>
                <Tooltip title={"Animation Duration"}>
                  <div className="cards_header--duration-option mr-1">
                    <Select
                      popupClassName="select__dropDown"
                      onChange={handleDurationSelectionChange}
                      value={selectedDurationOp}
                    >
                      {durationSelectionOptions &&
                      Array.isArray(durationSelectionOptions) ? (
                        <>
                          {durationSelectionOptions?.map((op, ind) => {
                            return (
                              <Option
                                value={op}
                                title={""}
                                key={"post_presence_time_op_" + ind}
                              >{`${op} Sec`}</Option>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                    </Select>
                  </div>
                </Tooltip>

                <div className="d-flex align-items-center">
                    <Tooltip title={"Animation Time"}>
                      <img
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        src={ClockYellowIcon}
                        alt="Animation"
                        className="widget__icons--filter"
                      />
                    </Tooltip>

                    <Input.Group compact>
                      <InputNumber
                        size="small"
                        min={0}
                        max={60}
                        value={postPresenceMinutes}
                        style={{ width: "45%" }}
                        id="post_presence_time_minute"
                        name="post_presence_time_minute"
                        onChange={(value) => {
                          handleAnimationTimeSettings(
                            "post_presence_time_minute",
                            value
                          );
                        }}
                      />
                      <span
                        className="text-white text-center fontSize-14 font-weight500"
                        style={{ minWidth: "5%", margin: "auto" }}
                      >
                        {" "}
                        :{" "}
                      </span>
                      <InputNumber
                        size="small"
                        min={5}
                        max={60}
                        value={postPresenceSeconds}
                        style={{ width: "45%" }}
                        id="post_presence_time_seconds"
                        name="post_presence_time_seconds"
                        onChange={(value) => {
                          handleAnimationTimeSettings(
                            "post_presence_time_seconds",
                            value
                          );
                        }}
                      />
                    </Input.Group>
                  </div>
              </>
            ) : (
              ""
            )} */}

            <div
              className={`${
                authParams?.screen_id === "000-000-556" &&
                widget_id === "000-100-965"
                  ? "widget__headerIcons"
                  : ""
              } d-flex align-items-center`}
            >
              {/* {authParams?.screen_id === "000-000-556" &&
              widget_id === "000-100-965" ? (
                <>
                  {filterPills &&
                    Array.isArray(filterPills) &&
                    filterPills?.map((d, i) => {
                      let channelImage = d?.text?.split("|$|")?.[0]?.trim();
                      let ProfileName = d?.text?.split("|$|")?.[1]?.trim();
                      return (
                        <div key={i} className="d-flex align-items-center">
                          <div className="widget__headerIcons--wrap d-flex align-items-center">
                            {d?.text?.includes("|$|") ? (
                              <>
                                <img
                                  src={
                                    channelImage
                                      ? SocialMedialogoForBrandPost?.[
                                          channelImage
                                        ]
                                        ? SocialMedialogoForBrandPost?.[
                                            channelImage
                                          ]
                                        : SocialMedialogo?.[channelImage]
                                        ? SocialMedialogo?.[channelImage]
                                        : defaultImage
                                      : SocialMedialogo?.[channelImage]
                                      ? SocialMedialogo?.[channelImage]
                                      : defaultImage
                                  }
                                />
                                <div>
                                  <Tooltip
                                    placement="bottom"
                                    title={ProfileName + ": " + d?.value}
                                  >
                                    <span
                                      className={`wm-chart-card-value mr-1`}
                                    >
                                      {kFormatter(d?.value)}
                                    </span>
                                  </Tooltip>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <Tooltip placement="bottom" title={d?.value}>
                                    <span
                                      className={`wm-chart-card-value mr-1`}
                                    >
                                      {kFormatter(d?.value)}
                                    </span>
                                  </Tooltip>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </>
              ) : (
                ""
              )} */}

              {/* {chart_type === "news-card" &&
              !isPdfPreview &&
              !isScheduleReportOpen &&
              !isPPTModalOpen &&
              !PdfDownloadStatus &&
              typeof widgetData?.graphData !== "string" ? (
                <div
                  className={`${
                    widHeaderLoader ? "d-none" : "d-flex"
                  } align-items-center cards_header--switchdetails`}
                >
                  Show Details
                  <Tooltip
                    title={
                      isShowDetailsChecked ? "Hide details" : "Unhide details"
                    }
                    placement="bottom"
                  >
                    <div className="switch">
                      <input
                        type="checkbox"
                        id="toggleDetailsOfCard"
                        onChange={handleShowDetailsChange}
                        checked={isShowDetailsChecked}
                        className="switch--input"
                      />
                      <label
                        for="toggleDetailsOfCard"
                        className="switch--label"
                      ></label>
                    </div>
                  </Tooltip>
                </div>
              ) : (
                ""
              )} */}

              {/* {["network-graph-v2"]?.includes(chart_type) ? (
                <div className="portlet__title--secondary fontSize-14 mr-2">
                  <span class="error">*</span>Double Click on node to deep dive
                  analysis.
                </div>
              ) : (
                ""
              )} */}

              {/* {!isPdfPreview &&
                !isScheduleReportOpen &&
                !isPPTModalOpen &&
                !PdfDownloadStatus &&
                widgetData?.filters &&
                widgetData?.filters?.length > 0 && (
                  <Tooltip
                    color="#3B5175"
                    placement="leftTop"
                    title={
                      widgetData?.filters?.length > 0 ? (
                        <div
                          className="custom_scroll"
                          style={{
                            maxWidth: "270px",
                            maxHeight: "230px",
                            overflow: "auto",
                            scrollBehavior: "smooth",
                          }}
                        >
                          <div className="mb-1">
                            {widgetData?.filters?.map((filterData, index) => {
                              return (
                                <div key={index}>
                                  <p
                                    className="mb-0"
                                    style={{
                                      color:
                                        filterData?.type === "include"
                                          ? "#5ed66d"
                                          : filterData?.type === "exclude" &&
                                            "#fb7665",
                                    }}
                                  >
                                    <strong>
                                      {All_Share_attributes
                                        ? All_Share_attributes?.[
                                            filterData?.attribute?.toLowerCase()
                                          ]
                                          ? All_Share_attributes?.[
                                              filterData?.attribute?.toLowerCase()
                                            ]
                                          : filterData?.attribute?.toLowerCase() ===
                                            "categoryid"
                                          ? "Category"
                                          : filterData?.attribute?.toLowerCase() ===
                                            "subcategoryid_aug"
                                          ? "Sub Category"
                                          : filterData?.attribute?.toLowerCase() ===
                                            "subsubcategoryid"
                                          ? "Sub Sub Category"
                                          : filterData?.attribute?.endsWith(
                                              "ID"
                                            )
                                          ? filterData?.attribute?.replace(
                                              "ID",
                                              ""
                                            )
                                          : filterData?.attribute?.replace(
                                              "Type",
                                              ""
                                            )
                                        : filterData?.attribute?.endsWith("ID")
                                        ? filterData?.attribute?.replace(
                                            "ID",
                                            ""
                                          )
                                        : filterData?.attribute?.replace(
                                            "Type",
                                            ""
                                          )}
                                    </strong>
                                  </p>
                                  {filterData?.type === "int" &&
                                    !Array.isArray(filterData?.columns) && (
                                      <span className="font-weight-light text-white">
                                        {filterData?.columns?.from +
                                          " - " +
                                          filterData?.columns?.to}
                                      </span>
                                    )}

                                  <div>
                                    {Array.isArray(filterData?.columns) &&
                                      filterData?.columns?.map((e, index) => {
                                        return (
                                          <span
                                            className="font-weight-light"
                                            style={{
                                              color:
                                                e?.type === "include"
                                                  ? "#5ed66d"
                                                  : e?.type === "exclude"
                                                  ? "#fb7665"
                                                  : "#fff",
                                            }}
                                          >
                                            {[
                                              "FeedBackEnabled",
                                              "ShowDeletedFromSocial",
                                              "AutoClosureEnabled",
                                              "IsWorkingHour",
                                            ]?.includes(filterData?.attribute)
                                              ? e?.name === null
                                                ? "Any"
                                                : e?.name === 0
                                                ? "No"
                                                : e?.name === 1 && "Yes"
                                              : (index ? ", " : "") +
                                                (e?.display_name
                                                  ? e?.display_name
                                                  : e?.name)}
                                          </span>
                                        );
                                      })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        "Filters"
                      )
                    }
                  >
                    <Badge
                      size="small"
                      count={
                        widgetData?.filters ? widgetData?.filters?.length : 0
                      }
                      title=""
                    >
                      <img
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        src={FilterLogo}
                        alt="Filters"
                        className="widget__icons--filter"
                      />
                    </Badge>
                  </Tooltip>
                )} */}

              {/* {colorRepresentTextShow ? (
                <div className="portlet__title--secondary fontSize-14">
                  <span class="error">*</span>Colors Represents Upper Category{" "}
                </div>
              ) : (
                ""
              )} */}

              {/* {screen?.selected_duration_type !== "15Minutes" &&
                (widget_id === "000-100-953" ||
                  widget_id === "000-100-960" ||
                  widget_id === "000-100-991") &&
                typeof widgetData?.graphData !== "string" && (
                  <>
                    <div
                      style={{ width: "120px" }}
                      className="portlet__title fontSize-16 font-weight500"
                    >
                      <DateAggregation
                        section_index={section_index}
                        widget_index={widget_index}
                        widgetData={widgetData}
                        template_widget={template_widget}
                      />
                    </div>
                  </>
                )} */}

              {/* <div className="d-flex align-items-center">
                <div
                  className={`portlet__title ml-2 fontSize-14 ${
                    (isWidgetEdit ||
                      PdfDownloadStatus ||
                      (authParams?.screen_id === "000-000-556" &&
                        chart_type !== "wordcloud")) &&
                    "d-none"
                  }`}
                >
                  {(chart_type === "wordcloud" &&
                    (templateAccessType == 1 ||
                      (authParams?.screen_id &&
                        authParams?.screen_id === "000-000-550" &&
                        (screen?.widgets?.length > 1 ||
                          (widgetData &&
                            ((!widgetData?.com_brand_ids &&
                              widgetData?.exclude_words?.length) ||
                              widgetData?.temp_exclude_words?.length)) ||
                          (widgetData &&
                            widgetData?.comp_exclude_words?.find(
                              (el) =>
                                el?.[widgetData?.com_brand_ids?.[0]?.brand_id]
                            )?.[widgetData?.com_brand_ids?.[0]?.brand_id]
                              ?.length))) ||
                      (authParams?.screen_id &&
                        ((widgetData &&
                          ((!widgetData?.com_brand_ids &&
                            widgetData?.exclude_words?.length) ||
                            widgetData?.temp_exclude_words?.length)) ||
                          (widgetData &&
                            widgetData?.comp_exclude_words?.find(
                              (el) =>
                                el?.[widgetData?.com_brand_ids?.[0]?.brand_id]
                            )?.[widgetData?.com_brand_ids?.[0]?.brand_id]
                              ?.length))) ||
                      tempWords?.length ||
                      (window.location.pathname === "/dashboard" &&
                        allData?.percent))) ||
                  listOfBrandHiddenWords?.length ? (
                    <Popover
                      content={menu}
                      placement="bottomLeft"
                      overlayClassName={
                        authParams?.theme_type === "1"
                          ? "darkTheme"
                          : "lightTheme"
                      }
                    >
                      <span
                        className="ant-dropdown-link fontSize-18 cursor-pointer"
                        onClick={(e) => e?.preventDefault()}
                      >
                        <i className="fa fa-ellipsis-h cursor-pointer"></i>{" "}
                      </span>
                    </Popover>
                  ) : templateAccessType == 1 ||
                    authParams?.screen_id ||
                    widgetData?.chart?.chart_type === "text" ? (
                    ""
                  ) : (
                    wordCloudCondition && (
                      <Popover
                        content={menu}
                        placement="bottomLeft"
                        overlayClassName={
                          authParams?.theme_type === "1"
                            ? "darkTheme"
                            : "lightTheme"
                        }
                      >
                        <span
                          className="ant-dropdown-link fontSize-18 cursor-pointer"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fa fa-ellipsis-h cursor-pointer" />
                        </span>
                      </Popover>
                    )
                  )}
                </div>
              </div> */}
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default WidgetHeader;
