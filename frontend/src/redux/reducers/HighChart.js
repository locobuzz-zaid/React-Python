let initialState = {
  Options: {},
  highChartDeepDive: { data: null, flag: false, id: null },
  highChartRightClick: { data: null, flag: false, id: null },
  highChartClickedNetworkNode: { data: null, flag: false, id: null },
};

const Highchart = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OPTION_HIGHCHART":
      return {
        ...state,
        Options: action.payload,
      };
    case "SET_HIGHCHART_DEEP_DIVE":
      return {
        ...state,
        highChartDeepDive: action.payload,
      };
    case "SET_HIGHCHART_RIGHT_CLICK":
      return {
        ...state,
        highChartRightClick: action.payload,
      };
    case "SET_HIGHCHART_CLICKED_NETWORK_NODE":
      return {
        ...state,
        highChartClickedNetworkNode: action.payload,
      };
    default:
      return state;
  }
};
export default Highchart;
