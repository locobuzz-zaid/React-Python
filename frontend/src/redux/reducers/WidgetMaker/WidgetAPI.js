let initialState = {
  configuration_data: null,
  support_attribute: null,
  search_data: null,
  widget_maker_graph_data: null,
  selected_chart_type_name: "line",
  widgetLibraryList: null,
  deletewidgetLibrary: false,
  duplicatewidgetLibrary: null,
  chart_data: {
    name: null,
    legend_position: "bottom",
    y_axis_mode: null,
  },
  chart_card_data: {
    card1: null,
    card2: null,
    card3: null,
    card4: null,
    card5: null,
    card6: null,
    card7: null,
    card8: null,
  },
  chart_loader: false,
  filterwidgetLibrary: null,
  save_widget: null,
  widgetPreview: null,
  widgetMakerListLoader: false,
  widgetPreviewLoader: false,
  isUpdateImpression: false,
  dashboardListPreview: false,
  addToDashboard: null,
  dashboardListPreviewLoader: false,
  widgetMakerShareChart: null,
  widgetmakerPostCardTrands: [
    { widget_id: 0, chart_type: "user_profile", widget_loader: true },
    { widget_id: 1, chart_type: "kpi", widget_loader: true },
    { widget_id: 2, chart_type: "line", widget_loader: true },
    { widget_id: 3, chart_type: "donut", widget_loader: true },
    { widget_id: 4, chart_type: "wordcloud", widget_loader: true },
    { widget_id: 5, chart_type: "engaged_profiles_data", widget_loader: true },
    { widget_id: 6, chart_type: "retweet_map", widget_loader: true },
    { widget_id: 7, chart_type: "reply_map", widget_loader: true },
  ],
  widgetLibraryFilterLoader: false,
  deepDiveLoader: false,
  widgetFetchLoader: false,
  competitorBrands: null,
  profileList: null,
  predefined_widgets_data: null,
  trendsData: null,
  dashboardTrendsFlag: false,
};

const WidgetAPI = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMPETITOR_BRANDS":
      return {
        ...state,
        competitorBrands: action.payload,
      };
    case "SET_PREDEFINED_WIDGETS":
      return {
        ...state,
        predefined_widgets_data: action.payload,
      };
    case "SET_PROFILE_LIST":
      return {
        ...state,
        profileList: action.payload,
      };
    case "SET_DASHBOARD_LIST_SECTION":
      return {
        ...state,
        addToDashboard: action.payload,
      };
    case "SET_WIDGET_MAKER_SHARE_CHART":
      return {
        ...state,
        widgetMakerShareChart: action.payload,
      };
    case "SET_FILTER_WIDGET_LIBRARY":
      return {
        ...state,
        filterwidgetLibrary: action.payload,
      };
    case "SET_WIDGET_FETCH_LOADER":
      return {
        ...state,
        widgetFetchLoader: action.payload,
      };
    case "SET_DELETE_WIDGET_LIBRARY":
      return {
        ...state,
        deletewidgetLibrary: action.payload,
      };
    case "SET_WIDGET_LIBRARY_LIST":
      return {
        ...state,
        widgetLibraryList: action.payload,
      };
    case "SET_WIDGET_LIBRARY_DUPLICATE":
      return {
        ...state,
        duplicatewidgetLibrary: action.payload,
      };
    case "SET_CONFIGURATION":
      return {
        ...state,
        configuration_data: action.payload,
      };
    case "SET_SUPPORT_ATTRIBUTES":
      return {
        ...state,
        support_attribute: action.payload,
      };
    case "SET_SEARCH_FILTERS":
      return {
        ...state,
        search_data: action.payload,
      };
    case "SET_WIDGET_MAKER_CHART":
      return {
        ...state,
        widget_maker_graph_data: action.payload,
      };
    case "SET_SELECTED_CHART_TYPE_NAME":
      return {
        ...state,
        selected_chart_type_name: action.payload,
      };
    case "SET_CHART_CARD_DATA":
      return {
        ...state,
        chart_card_data: action.payload,
      };
    case "SET_CHART_DATA":
      return {
        ...state,
        chart_data: action.payload,
      };
    case "SET_CHART_LOADER":
      return {
        ...state,
        chart_loader: action.payload,
      };
    case "SET_SAVE_WIDGET":
      return {
        ...state,
        save_widget: action.payload,
      };
    case "SET_WIDGET_PREVIEW":
      return {
        ...state,
        widgetPreview: action.payload,
      };
    case "SET_WIDGET_MAKER_LIST_LOADER":
      return {
        ...state,
        widgetMakerListLoader: action.payload,
      };
    case "SET_WIDGET_PREVIEW_LOADER":
      return {
        ...state,
        widgetPreviewLoader: action.payload,
      };
    case "SET_UPDATE_IMPRESSION":
      return {
        ...state,
        isUpdateImpression: action.payload,
      };
    case "SET_DASHBOARD_LIST_PREVIEW":
      return {
        ...state,
        dashboardListPreview: action.payload,
      };
    case "SET_DASHBOARD_LIST_PREVIEW_LOADER":
      return {
        ...state,
        dashboardListPreviewLoader: action.payload,
      };
    case "SET_POST_CARDS_TRENDS":
      return {
        ...state,
        widgetmakerPostCardTrands: action.payload,
      };
    case "SET_POST_CARDS_TRENDS_INITIAL":
      return {
        ...state,
        widgetmakerPostCardTrands: initialState?.widgetmakerPostCardTrands,
      };
    case "SET_WIDGET_LIBRARY_FILTER_LOADER":
      return {
        ...state,
        widgetLibraryFilterLoader: action.payload,
      };
    case "SET_DEEP_DIVE_LOADER":
      return {
        ...state,
        deepDiveLoader: action.payload,
      };
    case "SET_TRENDS_DATA":
      return {
        ...state,
        trendsData: action.payload,
      };
    case "SET_DASHBOARD_TRENDS_FLAG":
      return {
        ...state,
        dashboardTrendsFlag: action.payload,
      };
    default:
      return state;
  }
};

export default WidgetAPI;
