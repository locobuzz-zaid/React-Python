import React from "react";
import AllNodata from "../../../../assets/Analytics/All_NoData.svg";
import NoDataImg from "../../../../assets/Analytics/No_Data_Found.svg";

const NoGraphData = ({
  errorCode,
  isPreviewState,
  isDeepDiveList,
  isDeepDiveTimeLineList,
  trends,
  isCommandCenterScreen,
}) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className={`d-flex  align-items-center`}
    >
      <div className={`w-100 text-center`}>
        <div className={`Nodata_img ${isCommandCenterScreen ? "" : "mb-15"}`}>
          <img
            src={isCommandCenterScreen ? NoDataImg : AllNodata}
            alt="no data"
            style={
              isCommandCenterScreen
                ? { maxWidth: "200px", margin: "auto" }
                : isDeepDiveTimeLineList
                ? { width: "100px" }
                : {}
            }
          />
        </div>
        <div
          className={`${
            isCommandCenterScreen ? "Nodata_img--text" : ""
          } text_regular-gray`}
        >
          {errorCode ? errorCode : "No data found"}
        </div>
      </div>
    </div>
  );
};

export default NoGraphData;
