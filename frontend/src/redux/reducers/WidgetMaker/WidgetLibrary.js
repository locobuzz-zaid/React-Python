let initialState = {
  widgetLibraryArray: null,
  widgetLibrarycheckedList: null,
  filterLoader: null,
  widgetShow: false,
  editWidget: false,
  widgetLibraryTabName: "All Widgets",
  widgetSelectedList: [],
  data_source: "mentions",
  widgetLibraryFilter: {
    search_text: "",
    pill: "All Widgets",
    offset: 0,
    no_of_rows: 12,
    sort_expression: "created_date",
    sort_order: "desc",
    chart_type: "",
    attribute: "",
  },
  widget_maker_enabled: false,
};

const WidgetLibrary = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WIDGET_LIBRARY_ARRAY":
      return {
        ...state,
        widgetLibraryArray: action.payload,
      };
    case "SET_WIDGET_LIBRARY_CHECKED_LIST":
      return {
        ...state,
        widgetLibrarycheckedList: action.payload,
      };
    case "SET_WIDGET_SHOW":
      return {
        ...state,
        widgetShow: action.payload,
      };
    case "SET_EDIT_WIDGET":
      return {
        ...state,
        editWidget: action.payload,
      };
    case "SET_FILTER_LOADER":
      return {
        ...state,
        filterLoader: action.payload,
      };
    case "SET_WIDGET_LIBRARY_TAB_NAME":
      return {
        ...state,
        widgetLibraryTabName: action.payload,
      };
    case "SET_WIDGET_SELECTED_LIST":
      return {
        ...state,
        widgetSelectedList: action.payload,
      };
    case "SET_DATA_SOURCE":
      return {
        ...state,
        data_source: action.payload,
      };
    case "SET_WIDGET_LIBRARY_FILTER":
      return {
        ...state,
        widgetLibraryFilter: action.payload,
      };
    case "SET_WIDGET_MAKER_ENABLED":
      return {
        ...state,
        widget_maker_enabled: action.payload,
      };
    default:
      return state;
  }
};

export default WidgetLibrary;
