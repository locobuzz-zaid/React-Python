import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import {
  setHighChartClickedNetworkNode,
  setHighChartDeepDive,
  setHighChartRightClick,
} from "../../../../redux/actions/HighChart";
import { useDispatch } from "react-redux";
const HighChartrender = ({
  opData,
  clickcondition,
  id,
  rightClickCondition,
  dashboard,
  pptDownloadStatus,
  pdfDownloadStatus,
  single,
  type,
}) => {
  const dispatch = useDispatch();
  const handleClick = (value, e) => {
    if (type === "network-graph") {
      let selectedName = e?.srcElement?.point?.name;
      let result = getNodeOfNetwork(single, selectedName);
      dispatch(
        setHighChartClickedNetworkNode({ data: result, flag: true, id: id })
      );
    } else {
      dispatch(setHighChartDeepDive({ data: value, flag: true, id: id }));
    }
  };
  const handleRightClick = (value) => {
    dispatch(setHighChartRightClick({ data: value, flag: true, id: id }));
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

  return (
    <div>
      {opData && (
        <HighchartsReact
          isPureConfig={true}
          highcharts={Highcharts}
          options={{
            ...opData,
            plotOptions: {
              ...opData?.plotOptions,

              series: {
                ...opData?.plotOptions?.series,
                trackByArea: type === "area" ? true : false,
                cursor: "pointer",
                // *** To enable animation in every chart ***
                animation:
                  pptDownloadStatus || pdfDownloadStatus ? false : true,
                // *** to control multiple rendering ***
                // animation: pptDownloadStatus || pdfDownloadStatus
                //   ? false
                //   : dashboard && opData && opData[id]?.count <= 0
                //     ? true
                //     : !dashboard
                //     ? true
                //     : true,
                // *** To disabled animation comment upper code and uncomment this ***
                // animation: false,
                point: {
                  events: {
                    contextmenu: (event) => {
                      rightClickCondition && event.preventDefault();
                      return rightClickCondition && handleRightClick(event);
                    },
                    click:
                      clickcondition &&
                      function (e) {
                        handleClick(this, e);
                      },
                  },
                },
              },
            },
          }}
          // allowChartUpdate={!graphLoader ? true : false}
          allowChartUpdate={true}
          //callback={thisCurrentGraph}
        />
      )}
    </div>
  );
};

export default HighChartrender;
