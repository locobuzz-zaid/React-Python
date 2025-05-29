export const setOptionHighChart = (value) => {
  global.options = value;
  return (dispatch) => {
    dispatch({ type: "SET_OPTION_HIGHCHART", payload: value });
  };
};
export const setHighChartDeepDive = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_HIGHCHART_DEEP_DIVE", payload: value });
  };
};
export const setHighChartRightClick = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_HIGHCHART_RIGHT_CLICK", payload: value });
  };
};

export const setHighChartClickedNetworkNode = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_HIGHCHART_CLICKED_NETWORK_NODE", payload: value });
  };
};
