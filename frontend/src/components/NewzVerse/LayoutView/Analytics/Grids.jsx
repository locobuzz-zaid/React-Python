import React, { useEffect, useMemo, useState } from "react";
import { Progress, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import { isNumber } from "highcharts";
import defaultProfileImage from "../../../../assets/Pages/default_profile_img.png";
import { SocialMedialogo } from "./SocialMediaPlatforms";
import { getCustomizedDate, useQuery } from "../../../../redux/constants";
import moment from "moment";
import NoGraphData from "./NoGraphData";
import ProgressBar from "./ProgressBar";

const { Column } = Table;

const Grids = ({
  tableColumns,
  dataSource,
  colors,
  PdfDownloadStatus,
  metadata,
  noteExist,
  insightsExist,
  tree_grid,
  grand_total,
  widgetDurationComparisonForChart,
  widgetDurationDataForChart,
  isGridDeepDiveEnabled,
  gridDeepDiveOn,
  hideColumns,
  rowSpanOn,
  widgetContainerHeight,
  widget_index,
  section_index,
  hidePagination,
}) => {
  const dispatch = useDispatch();
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );

  const [scrollAbleTable, setScrollAbleTable] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    current: 1,
    pageSize: scrollAbleTable,
  });
  const [pdfView, setPdfView] = useState(false);
  const [totalVolume, setTotalVolume] = useState(0);
  const [deepDiveToggle, setDeepDiveToggle] = useState(false);

  useEffect(() => {
    const crossIcons = document.querySelectorAll(".cross__icon");
    if (crossIcons) {
      crossIcons?.forEach((icon) => {
        const parentTr = icon?.closest("tr");
        if (parentTr) {
          parentTr?.classList?.add("active__location");
        }
      });
    }
  }, [deepDiveToggle]);

  const isString = (value) => {
    return typeof value === "string";
  };

  const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color = color + letters?.[Math?.floor(Math?.random() * 16)];
    }
    return color;
  };
  const getTableColumnsWithSorting = (columns) => {
    if (!columns || !Array.isArray(columns)) return [];
    columns = columns
      ?.map((column, i) => {
        let isHiddenColumn =
          gridDeepDiveOn && Array.isArray(gridDeepDiveOn)
            ? gridDeepDiveOn?.findIndex(
                (e) =>
                  e?.attribute === column?.title ||
                  e?.attribute === column?.dataIndex
              ) !== -1
            : hideColumns && Array.isArray(hideColumns)
            ? hideColumns?.includes(column?.title || column?.dataIndex)
            : false;
        if (
          column?.title === "row_span" ||
          column?.title === "category_type" ||
          isHiddenColumn ||
          column?.title === "Description" ||
          column?.title === "Link" ||
          column?.title === "News Date" ||
          column?.title === "Picture"
        )
          return null;
        if (column?.children?.length) {
          setPdfView(true);
          column.children = getTableColumnsWithSorting(column?.children);
        } else {
          column.key = column?.title + "_" + i;
          if (!rowSpanOn) {
            column.sorter = (a, b) => {
              if (a[column?.dataIndex]) {
                let aData =
                  a[column?.dataIndex]?.value !== null &&
                  a[column?.dataIndex]?.value !== undefined
                    ? a[column?.dataIndex]?.value
                    : a[column?.dataIndex];
                let bData =
                  b[column?.dataIndex]?.value !== null &&
                  b[column?.dataIndex]?.value !== undefined
                    ? b[column?.dataIndex]?.value
                    : b[column?.dataIndex];
                if (isString(aData) && isString(bData)) {
                  if ((a?.total_flag || b?.total_flag) && grand_total) return 0;
                  else return aData?.localeCompare(bData);
                } else if (
                  (isString(aData) && isNumber(bData)) ||
                  (isNumber(aData) && isString(bData))
                ) {
                  if ((a?.total_flag || b?.total_flag) && grand_total) return 0;
                  else return isString(aData) && isNumber(bData) ? -1 : 1;
                } else {
                  if ((a?.total_flag || b?.total_flag) && grand_total) return 0;
                  else return aData - bData;
                }
              } else {
                let aData =
                  a[column?.title]?.value !== null &&
                  a[column?.title]?.value !== undefined
                    ? a[column?.title]?.value
                    : a[column?.title];
                let bData =
                  b[column?.title]?.value !== null &&
                  b[column?.title]?.value !== undefined
                    ? b[column?.title]?.value
                    : b[column?.title];
                if (isString(aData) && isString(bData)) {
                  if ((a?.total_flag || b?.total_flag) && grand_total) return 0;
                  else return aData?.localeCompare(bData);
                } else if (
                  (isString(aData) && isNumber(bData)) ||
                  (isNumber(aData) && isString(bData))
                ) {
                  if ((a?.total_flag || b?.total_flag) && grand_total) return 0;
                  else return isString(aData) && isNumber(bData) ? -1 : 1;
                } else {
                  if ((a?.total_flag || b?.total_flag) && grand_total) return 0;
                  else return aData - bData;
                }
              }
            };
          }
        }
        return column;
      })
      ?.filter((el) => el);
    return columns;
  };
  const getUpdatedDataSource = (sources) => {
    let updatedDataSource =
      sources && Array.isArray(sources) ? structuredClone(sources) : [];
    if (grand_total && updatedDataSource?.length)
      updatedDataSource[updatedDataSource?.length - 1].total_flag = true;
    let totalVolume = 0;
    if (updatedDataSource?.length) {
      updatedDataSource =
        sources &&
        sources.map((el, i) => {
          let columnNames = Object.keys(el);
          if (el?.["category_type"]) {
            el["category_type"] = {
              type: el?.["category_type"]?.type
                ? el?.["category_type"]?.type
                : el?.["category_type"],
              color: el?.["category_type"]?.color
                ? el?.["category_type"]?.color
                : getRandomColor(),
            };
          }
          if (tree_grid) {
            if (columnNames?.length > 0) {
              let updatedEl = { ...el };
              columnNames?.forEach((c) => {
                let rowData = updatedEl?.[c];
                if (c?.includes("Review Ratings")) {
                  updatedEl[c] = `${updatedEl[`Review Ratings`]} ⭐`;
                } else if (c?.includes("Rating")) {
                  updatedEl[c] = `${updatedEl[`Rating`]} ⭐`;
                }
              });
              return updatedEl;
            } else {
              return el;
            }
          } else if (columnNames?.includes("Review Ratings")) {
            return {
              ...el,
              [`Review Ratings`]: `${el[`Review Ratings`]} ⭐`,
            };
          } else if (columnNames?.includes("Rating")) {
            return { ...el, [`Rating`]: `${el[`Rating`]} ⭐` };
          } else {
            return el;
          }
        });

      if (PdfDownloadStatus) {
        if (noteExist && insightsExist && updatedDataSource?.length > 8)
          updatedDataSource = updatedDataSource?.slice(0, 8);
        else if (updatedDataSource?.length > 11)
          updatedDataSource = pdfView
            ? updatedDataSource?.slice(0, 9)
            : updatedDataSource?.slice(0, 7);
      }
    }

    return updatedDataSource;
  };

  const updatedTableColumn = useMemo(
    () => getTableColumnsWithSorting(tableColumns),
    [tableColumns]
  );

  const updatedDataSource = useMemo(
    () => getUpdatedDataSource(dataSource),
    [dataSource]
  );

  const getDefautNewsIconImg = (e) => {
    return (e.target.src = defaultNewsIcon);
  };
  const getDefautProfileIconImg = (e) => {
    return (e.target.src = defaultProfileImage);
  };
  const calculatePercentage = (volume, totalVolume) => {
    volume = parseInt(volume);
    totalVolume = parseInt(totalVolume);
    if (totalVolume === 0) {
      return 0; // Handle cases where the total is 0 to avoid division by zero
    }
    return (volume / totalVolume) * 100;
  };
  return updatedTableColumn ? (
    <div
      id={`table_${metadata?.widget_id}`}
      className={`widgetmaker-grid-chart p-15 w-100`}
    >
      {tree_grid ? (
        <Table
          dataSource={updatedDataSource}
          columns={updatedTableColumn}
          className="custom_table_scroll"
          scroll={
            PdfDownloadStatus || metadata?.span === "one_third"
              ? {}
              : {
                  x: 1000,
                }
          }
          pagination={
            PdfDownloadStatus || hidePagination
              ? false
              : {
                  hideOnSinglePage: dataSource?.length > 10 ? false : true,
                  defaultPageSize: 10,
                }
          }
        />
      ) : (
        <>
          <Table
            tableLayout="auto"
            dataSource={updatedDataSource}
            className={``}
            rowClassName={""}
            showHeader={true}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  console.log("row clicked", record, rowIndex);
                }, // click row
              };
            }}
            scroll={{ y: 375, x: "100%" }}
            pagination={{
              hideOnSinglePage: updatedDataSource?.length > 10 ? false : true,
              defaultPageSize: 10,
              current: currentPage,
              showSizeChanger: false,
              total: updatedDataSource?.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total}`,
              onChange: (page) => setCurrentPage(page),
            }}
          >
            {/* ${metadata?.show_marker ? '':''} */}
            {updatedTableColumn?.map((col, i) => {
              return (
                <Column
                  // height="90vh"
                  width={`${col?.title?.length * 8.5 + 51}px`}
                  title={(value) => {
                    let channelImage = col?.title?.split("|$|")?.[0]?.trim();
                    let ProfileName = col?.title?.split("|$|")?.[1]?.trim();
                    let genderName = col?.title?.split("|G|")?.[1]?.trim();
                    let countryName = col?.title?.split("|C|")?.[1]?.trim();
                    return colors && colors[i] !== "#000000" ? (
                      <Tooltip title={col?.title}>
                        <span
                          style={{
                            color:
                              colors && colors[i] !== "#000000"
                                ? colors[i]
                                : "",
                          }}
                          //className="d-inline-block"
                        >
                          <span>
                            {col?.title?.includes("|$|") ? (
                              <>
                                <img
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    margin: "5px",
                                  }}
                                  src={
                                    channelImage
                                      ? SocialMedialogo?.[channelImage]
                                      : defaultProfileImage
                                  }
                                />
                                {ProfileName}
                              </>
                            ) : col?.title?.includes("|G|") ? (
                              <>
                                <img
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    margin: "5px",
                                  }}
                                  src={getGenderLogo(genderName)}
                                />
                                {genderName}
                              </>
                            ) : col?.title?.includes("|C|") ? (
                              <>
                                {getCountryLogo(countryName, {
                                  width: "15px",
                                  height: "15px",
                                  margin: "5px",
                                })}
                                {countryName}
                              </>
                            ) : (
                              <>
                                {col?.title}{" "}
                                {col?.title === "Unactioned" && (
                                  <Tooltip title="These tickets were  created  during the selected duration and are still in agent's queue or are unactioned by the user.">
                                    <i className="fa fa-info-circle cursor-pointer ml-1" />
                                  </Tooltip>
                                )}
                              </>
                            )}
                          </span>
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        {col?.title}{" "}
                        {col?.title === "Unactioned" && (
                          <Tooltip title="These tickets were  created  during the selected duration and are still in agent's queue or are unactioned by the user.">
                            <i className="fa fa-info-circle cursor-pointer ml-1" />
                          </Tooltip>
                        )}
                      </>
                    );
                  }}
                  dataIndex={col?.title}
                  key={i}
                  render={(value, obj, index) => {
                    const updatedObj = {
                      children: value,
                      props: {},
                    };
                    if (
                      rowSpanOn &&
                      (col?.title === rowSpanOn || col?.dataIndex === rowSpanOn)
                    ) {
                      const trueIndex =
                        index +
                        paginationInfo?.pageSize *
                          (paginationInfo?.current - 1);
                      if (
                        index >= 1 &&
                        value ===
                          updatedDataSource?.[trueIndex - 1]?.[col?.title]
                      ) {
                        updatedObj.props.rowSpan = 0;
                      } else {
                        for (
                          let i = 0;
                          trueIndex + i !== updatedDataSource?.length &&
                          value ===
                            updatedDataSource?.[trueIndex + i]?.[col?.title];
                          i += 1
                        ) {
                          updatedObj.props.rowSpan = i + 1;
                        }
                        //updatedObj.props.rowSpan = obj?.row_span?.frequency;
                      }
                    } else if (rowSpanOn) {
                      updatedObj.props.className = "text-center";
                    }
                    let randomColor = getRandomColor();
                    let appliedLocationFilter;

                    let channelImage = value?.value
                      ? isString(value?.value) && value?.value?.includes("|$|")
                        ? value?.value?.split("|$|")?.[0]?.trim()
                        : null
                      : isString(value) && value?.includes("|$|")
                      ? value?.split("|$|")?.[0]?.trim()
                      : null;
                    let ProfileName = value?.value
                      ? isString(value?.value) && value?.value?.includes("|$|")
                        ? value?.value?.split("|$|")?.[1]?.trim()
                        : null
                      : isString(value) && value?.includes("|$|")
                      ? value?.split("|$|")?.[1]?.trim()
                      : null;

                    let brand_obj = dashboardBrandsList.find(
                      (brand) => brand.brand_name === obj["Brand Name"]
                    );

                    updatedObj.children = (
                      <span
                        key={value}
                        style={{
                          padding: col?.title === "Risk" ? "6px 12px" : "",
                          borderRadius: col?.title === "Risk" ? "6px" : "",
                          fontWeight: col?.title === "Risk" ? "500" : "",
                          background:
                            col?.title === "Risk" && obj["Risk"] === "High"
                              ? "#ffe9e3"
                              : col?.title === "Risk" &&
                                obj["Risk"] === "Medium"
                              ? "#fff1db"
                              : col?.title === "Risk" && obj["Risk"] === "Low"
                              ? "#e3ffe4"
                              : "",
                          color:
                            col?.title === "Risk" && obj["Risk"] === "High"
                              ? "#f44336"
                              : col?.title === "Risk" &&
                                obj["Risk"] === "Medium"
                              ? "#ff9c07"
                              : col?.title === "Risk" && obj["Risk"] === "Low"
                              ? "#4caf50"
                              : "",
                          maxWidth:
                            metadata?.widget_id === "000-100-988"
                              ? "100%"
                              : "500px",
                        }}
                        className={` ${
                          i === 0 && metadata?.widget_id === "000-100-963"
                            ? String(value).toLowerCase() ===
                              String("Negative").toLowerCase()
                              ? "negative negative-left-border"
                              : String(value).toLowerCase() ===
                                String("Positive").toLowerCase()
                              ? "positive positive-left-border"
                              : String(value).toLowerCase() ===
                                String("Neutral").toLowerCase()
                              ? "neutral neutral-left-border"
                              : ""
                            : ""
                        } ${
                          i === 0
                            ? "d-flex align-items-center word-wrap GoogleTrends--Trend"
                            : i === 0
                            ? `d-flex align-items-center word-wrap`
                            : "word-wrap"
                        }`}
                      >
                        {i === 0 && (
                          <span
                            className="d-none"
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "10px",
                              backgroundColor: "red",
                            }}
                          />
                        )}

                        {metadata?.chart?.chart_settings?.total_row &&
                        updatedDataSource[updatedDataSource?.length - 1] ===
                          obj &&
                        !widgetDurationComparisonForChart ? (
                          <>
                            <b>{value?.toLocaleString()}</b>
                          </>
                        ) : typeof value === "object" ? (
                          <>
                            <div
                              className={` ${"d-flex flex-direction-column align-items-center"} `}
                            >
                              <span className={``}>
                                {isString(value?.value) &&
                                value?.value?.includes("|$|") ? (
                                  <>
                                    <img
                                      style={{
                                        width: "15px",
                                        height: "15px",
                                        margin: "5px",
                                      }}
                                      src={
                                        channelImage
                                          ? SocialMedialogo?.[channelImage]
                                          : defaultProfileImage
                                      }
                                    />
                                    {ProfileName}
                                  </>
                                ) : (
                                  <>{value?.value?.toLocaleString()}</>
                                )}
                              </span>
                              {widgetDurationComparisonForChart ? (
                                <span
                                  className={`text_regular d-flex align-items-baseline ${
                                    String(value?.text).toLowerCase() ===
                                    String("Negative").toLowerCase()
                                      ? value?.percent_change > 0
                                        ? "negative"
                                        : value?.percent_change < 0
                                        ? "positive"
                                        : "text-gray"
                                      : value?.percent_change > 0
                                      ? "positive"
                                      : value?.percent_change < 0
                                      ? "negative"
                                      : "text-gray"
                                  } font-size12`}
                                >
                                  {value?.percent_change === null ? (
                                    ""
                                  ) : value?.percent_change > 0 ? (
                                    <>
                                      <CaretUpFilled className="font-size18" />
                                      {" " +
                                        Number(
                                          value?.percent_change
                                        )?.toLocaleString() +
                                        "%"}
                                    </>
                                  ) : value?.percent_change < 0 ? (
                                    <>
                                      <CaretDownFilled className="font-size18" />
                                      {" " +
                                        Number(
                                          value?.percent_change
                                        )?.toLocaleString() +
                                        "%"}
                                    </>
                                  ) : (
                                    value?.percent_change !== null && "NA"
                                  )}{" "}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {i === 0 ? (
                              <>
                                {col?.title === "Brand Name" ? (
                                  <img
                                    src={brand_obj?.brand_logo}
                                    alt="brand logo"
                                    className="grid-brand-logo"
                                  />
                                ) : (
                                  ""
                                )}
                                <Tooltip
                                  title={
                                    isString(value) &&
                                    value?.includes("|$|") ? (
                                      <>
                                        <img
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                            margin: "5px",
                                          }}
                                          src={
                                            channelImage
                                              ? SocialMedialogo?.[channelImage]
                                              : defaultProfileImage
                                          }
                                        />
                                        {ProfileName}
                                      </>
                                    ) : (
                                      <>{value?.toLocaleString()}</>
                                    )
                                  }
                                  placement="topLeft"
                                >
                                  <span
                                    className={``}
                                    //   onClick={}
                                  >
                                    {isString(value) &&
                                    value?.includes("|$|") ? (
                                      <span className="d-flex">
                                        <img
                                          style={{
                                            width: "20px",
                                            height: "20px",
                                            margin: "5px",
                                          }}
                                          src={
                                            channelImage
                                              ? SocialMedialogo?.[channelImage]
                                              : defaultProfileImage
                                          }
                                        />
                                        {ProfileName}
                                      </span>
                                    ) : (
                                      <>{value?.toLocaleString()}</>
                                    )}
                                  </span>
                                </Tooltip>
                              </>
                            ) : (
                              <span className={``}>
                                {isString(value) && value?.includes("|$|") ? (
                                  <>
                                    <img
                                      style={{
                                        width: "15px",
                                        height: "15px",
                                        margin: "5px",
                                      }}
                                      src={
                                        channelImage
                                          ? SocialMedialogo?.[channelImage]
                                          : defaultProfileImage
                                      }
                                    />
                                    {ProfileName}
                                  </>
                                ) : (
                                  <>
                                    {/* metadata?.y_series?.[i]?.attribute === "nv_sentiment_coverage" */}
                                    {/* col.title === "Sentiment Distibution" */}
                                    {/* {console.log("col", col, "value", value)} */}

                                    {col.title === "Sentiment Distibution" ? (
                                      <ProgressBar value={value} />
                                    ) : (
                                      value?.toLocaleString()
                                    )}
                                  </>
                                )}
                              </span>
                            )}
                          </>
                        )}

                        {isGridDeepDiveEnabled &&
                        (gridDeepDiveOn && Array.isArray(gridDeepDiveOn)
                          ? gridDeepDiveOn?.findIndex(
                              (e) =>
                                e?.trace_name === col?.title ||
                                e?.trace_name === col?.dataIndex
                            ) !== -1
                          : false) ? (
                          <>
                            <Tooltip title={"Open Category Details"}>
                              <span
                                style={{ display: "inline-block" }}
                                className="blue-text font-size14 cursor-pointer ml-2"
                              >
                                <i
                                  className={`fas fa-external-link-alt`}
                                  style={{ width: "20px", height: "20px" }}
                                />
                              </span>
                            </Tooltip>
                          </>
                        ) : (
                          ""
                        )}
                      </span>
                    );
                    return updatedObj;
                  }}
                  showSorterTooltip={null} //soting tooltip
                  sortDirections={["ascend", "descend"]}
                  sorter={PdfDownloadStatus ? null : col?.sorter}
                  sortOrder={col?.sortOrder ? col?.sortOrder : null}
                />
              );
            })}
          </Table>
          {metadata?.widget_name === "Risk Indicator" ? (
            <>
              <div className="threshold-card-text">
                Calculated based on volume and negative tone of crisis-related
                keywords across News, Twitter, and LinkedIn.
              </div>
              <div className="threshold-card">
                <div className="threshold-title">
                  Threshold for Crisis Indicator
                </div>
                <div className="threshold-grid">
                  <div className="threshold-item">
                    <div className="threshold-badge low">Low</div>
                    <div className="threshold-range">0-4</div>
                  </div>
                  <div className="threshold-item">
                    <div className="threshold-badge medium">Medium</div>
                    <div className="threshold-range">5-6</div>
                  </div>
                  <div className="threshold-item">
                    <div className="threshold-badge high">High</div>
                    <div className="threshold-range">7+</div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  ) : (
    <NoGraphData errorCode="No data found" />
  );
};

export default Grids;
