import React, { useMemo } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "antd";
import KpiCards from "./KpiCards";

const { Panel } = Collapse;

const CardList = ({
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
  noteExist,
  metaWidgetConfig,
}) => {
  const dispatch = useDispatch();

  const getcardData = () => {
    let cData =
      widgetGraphConfig?.brands && widgetGraphConfig?.brands[0]?.competitor
        ? widgetGraphConfig?.card_settings &&
          widgetGraphConfig?.card_settings[
            widgetGraphConfig?.card_settings?.length - 1
          ]?.response
        : (widgetGraphConfig?.card_settings &&
            widgetGraphConfig?.card_settings[
              widgetGraphConfig?.card_settings?.length - 1
            ]?.x_axis?.atrribute) ||
          (widgetGraphConfig?.card_settings &&
            widgetGraphConfig?.card_settings[
              widgetGraphConfig?.card_settings?.length - 1
            ]?.y_series) ||
          (widgetGraphConfig?.card_settings &&
            widgetGraphConfig?.card_settings[
              widgetGraphConfig?.card_settings?.length - 1
            ]?.response)
        ? widgetGraphConfig?.card_settings &&
          widgetGraphConfig?.card_settings[
            widgetGraphConfig?.card_settings?.length - 1
          ]?.response
        : widgetGraphConfig?.card_settings &&
          widgetGraphConfig?.card_settings[
            widgetGraphConfig?.card_settings?.length - 2
          ]?.response;
    return cData;
  };

  const card_data = useMemo(() => getcardData(), []);

  if (cardPosition == undefined) cardPosition = "";

  const onChange = (key) => {};

  return (
    <>
      {metaWidgetKpiData?.kpi?.[0]?.data || card_data?.[0]?.data ? (
        <>
          {metaWidgetKpiData?.kpi?.length ? (
            <div
              className={`d-flex flex-wrap w-100 wm-chart-cards ${
                cardPosition === "Bottom"
                  ? "border-top border-left border-color custom_scroll1"
                  : cardPosition === "Top"
                  ? "border-left border-color custom_scroll1"
                  : ""
              } ${
                (cardPosition && cardPosition === "Left") ||
                cardPosition === "Right"
                  ? "custom_scroll1 card__list--scrollable"
                  : "justify-content-between"
              }`}
              style={
                type === "map" &&
                !dashboard &&
                (!PdfDownloadStatus || !ppt_generating_status)
                  ? { maxHeight: "calc(100vh - 165px)", overflow: "auto" }
                  : PdfDownloadStatus || ppt_generating_status
                  ? { maxHeight: "685px" }
                  : type !== "map" && dashboard && dashboard
                  ? ppt_generating_status
                    ? { maxHeight: "535px" }
                    : cardPosition &&
                      (cardPosition === "Left" || cardPosition === "Right")
                    ? { maxHeight: "480px" }
                    : {}
                  : {}
              }
            >
              {metaWidgetKpiData?.kpi?.map((d, i) => {
                let previousCardsCount = 0;
                if (i === 0) {
                  previousCardsCount = 0;
                } else {
                  for (let j = 0; j < i; j++)
                    previousCardsCount +=
                      metaWidgetKpiData?.kpi?.[j]?.data?.length;
                }
                if (previousCardsCount >= 15) return null;

                return (
                  <>
                    <Collapse
                      bordered={false}
                      className={`bg__white w-100 ${
                        ppt_generating_status
                          ? "border border-color"
                          : "border-0"
                      }`}
                      expandIconPosition="right"
                      defaultActiveKey={[i]}
                      onChange={onChange}
                      accordion
                      expandIcon={({ isActive }) =>
                        isActive ? <UpOutlined /> : <DownOutlined />
                      }
                    >
                      <Panel
                        className="custom_kpi w-100 border-bottom-0"
                        header={
                          <div className="text_regular font-weight500">
                            {d?.trace_name}
                          </div>
                        }
                        key={i}
                        showArrow={
                          PdfDownloadStatus || ppt_generating_status
                            ? false
                            : true
                        }
                      >
                        <div className="flex-wrap d-flex w-100">
                          <KpiCards
                            metaWidgetKpiData={metaWidgetKpiData}
                            widgetGraphConfig={widgetGraphConfig}
                            count={previousCardsCount}
                            cardPosition={cardPosition}
                            widgetShareOfData={widgetShareOfData}
                            widgetDurationComparison={widgetDurationComparison}
                            type={type}
                            dashboard={dashboard}
                            PdfDownloadStatus={PdfDownloadStatus}
                            ppt_generating_status={ppt_generating_status}
                            widget_index={widget_index}
                            section_index={section_index}
                            kpi_data={d?.data}
                            noteExist={noteExist}
                            metaWidgetConfig={metaWidgetConfig}
                          />
                        </div>
                      </Panel>
                    </Collapse>
                  </>
                );
              })}
            </div>
          ) : (
            ""
          )}

          {!metaWidgetKpiData && card_data?.length ? (
            <div
              className={`flex-wrap w-100 wm-chart-cards d-flex ${
                cardPosition === "Bottom" ? "border-top border-color" : ""
              } ${
                (cardPosition && cardPosition === "Left") ||
                cardPosition === "Right"
                  ? "custom_scroll1 card__list--scrollable"
                  : "justify-content-between"
              }`}
            >
              {card_data?.map((d, i) => {
                let previousCardsCount = 0;
                if (i === 0) {
                  previousCardsCount = 0;
                } else {
                  for (let j = 0; j < i; j++)
                    previousCardsCount += card_data?.[j]?.data?.length;
                }
                if (previousCardsCount >= 15) return null;
                return (
                  <>
                    <Collapse
                      // bordered={false}
                      className={`bg__white w-100 ${
                        ppt_generating_status
                          ? "border border-color"
                          : "border-0"
                      }`}
                      expandIconPosition="right"
                      defaultActiveKey={[i]}
                      onChange={onChange}
                      accordion
                      expandIcon={({ isActive }) =>
                        isActive ? <UpOutlined /> : <DownOutlined />
                      }
                    >
                      <Panel
                        className="custom_kpi w-100 border-bottom-0"
                        header={
                          <div className="text_regular font-weight500">
                            {d?.trace_name}{" "}
                            {`(${d?.data?.length}/${d?.no_of_cards})`}
                          </div>
                        }
                        key={i}
                        showArrow={
                          PdfDownloadStatus || ppt_generating_status
                            ? false
                            : true
                        }
                      >
                        <div className="flex-wrap d-flex w-100">
                          {widgetGraphConfig?.chart_type !== "kpi" &&
                            widgetGraphConfig?.chart_type !== "post-card" && (
                              <KpiCards
                                metaWidgetKpiData={metaWidgetKpiData}
                                widgetGraphConfig={widgetGraphConfig}
                                count={previousCardsCount}
                                cardPosition={cardPosition}
                                widgetShareOfData={widgetShareOfData}
                                widgetDurationComparison={
                                  widgetDurationComparison
                                }
                                type={type}
                                dashboard={dashboard}
                                PdfDownloadStatus={PdfDownloadStatus}
                                ppt_generating_status={ppt_generating_status}
                                widget_index={widget_index}
                                section_index={section_index}
                                kpi_data={d?.data}
                                noteExist={noteExist}
                                metaWidgetConfig={metaWidgetConfig}
                              />
                            )}
                        </div>
                      </Panel>
                    </Collapse>
                  </>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          {metaWidgetKpiData?.kpi?.length ? (
            <div
              className={`d-flex flex-wrap w-100 wm-chart-cards ${
                cardPosition === "Bottom"
                  ? "border-top border-left border-color"
                  : cardPosition === "Top"
                  ? "border-left border-color"
                  : ""
              } ${
                (cardPosition && cardPosition === "Left") ||
                cardPosition === "Right"
                  ? "custom_scroll1 card__list--scrollable"
                  : "justify-content-between"
              }`}
              style={
                type === "map" && (!PdfDownloadStatus || !ppt_generating_status)
                  ? { maxHeight: "calc(100vh - 165px)" }
                  : PdfDownloadStatus || ppt_generating_status
                  ? { maxHeight: "685px" }
                  : type !== "map" && dashboard && dashboard
                  ? ppt_generating_status
                    ? { maxHeight: "535px" }
                    : cardPosition &&
                      (cardPosition === "Left" || cardPosition === "Right")
                    ? { maxHeight: "480px" }
                    : {}
                  : {}
              }
            >
              <KpiCards
                metaWidgetKpiData={metaWidgetKpiData}
                widgetGraphConfig={widgetGraphConfig}
                count={count}
                cardPosition={cardPosition}
                widgetShareOfData={widgetShareOfData}
                widgetDurationComparison={widgetDurationComparison}
                type={type}
                dashboard={dashboard}
                PdfDownloadStatus={PdfDownloadStatus}
                ppt_generating_status={ppt_generating_status}
                widget_index={widget_index}
                section_index={section_index}
                kpi_data={metaWidgetKpiData?.kpi}
                noteExist={noteExist}
                metaWidgetConfig={metaWidgetConfig}
              />
            </div>
          ) : (
            ""
          )}
          {!metaWidgetKpiData && card_data?.length ? (
            <div
              className={`flex-wrap w-100 wm-chart-cards d-flex ${
                cardPosition === "Bottom" ? "border-top border-color" : ""
              } ${
                (cardPosition && cardPosition === "Left") ||
                cardPosition === "Right"
                  ? "custom_scroll1 card__list--scrollable"
                  : "justify-content-between"
              }`}
            >
              {widgetGraphConfig?.chart_type !== "kpi" &&
                widgetGraphConfig?.chart_type !== "post-card" && (
                  <KpiCards
                    metaWidgetKpiData={metaWidgetKpiData}
                    widgetGraphConfig={widgetGraphConfig}
                    count={count}
                    cardPosition={cardPosition}
                    widgetShareOfData={widgetShareOfData}
                    widgetDurationComparison={widgetDurationComparison}
                    type={type}
                    dashboard={dashboard}
                    PdfDownloadStatus={PdfDownloadStatus}
                    ppt_generating_status={ppt_generating_status}
                    widget_index={widget_index}
                    section_index={section_index}
                    kpi_data={card_data}
                    noteExist={noteExist}
                    metaWidgetConfig={metaWidgetConfig}
                  />
                )}
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default CardList;
