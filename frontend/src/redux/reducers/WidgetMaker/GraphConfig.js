import uuid from "react-uuid";

let initialState = {
  widgetGraphConfig: {
    x_axis: null,
    y_axis: {
      y_series_1: {
        attribute: null,
        aggregation: null,
      },
    },
    y_axis_settings: [],
    breakdown_by: [],
    filter_by: [],
    fields: [],
    chart_type: "line",
    duration: null,
    brands: null,
    filters: [],
    show_marker: true,
    card_position: "Top",
    card_limit: 5,
    card_settings: [
      {
        card_id: uuid(),
        card_name: 1,
        card_value: null,
        x_axis: null,
        y_series: null,
        response: [],
      },
    ],
    chart_settings: {
      global_data_label: false,
      is_stacked: true,
      is_stacked_disabled: false,
      data_count_card: true,
      duration_comparison: false, // This is used for only KPI
      show_previous_duration_comparison: false, // This is used for charts
      show_previous_duration_data: false, // This is used for charts
      card_percent: true,
      chart_percent: false,
      gradient_color: false,
      group_line_agg: null,
      benchmark_line: false,
      duplicate_for_brands: false,
      total_row: false,
      split_cards: true,
      top_posts_in_cards: false,
      wordcloud_color: "0",
      // border_sentiment: false,
      // dynamic_radius: true,
    },
    chart_property: {
      chart_name: null,
      legend_position: "bottom",
      y_axis_mode: 2,
      no_of_top_posts: 1,
      screen_width: window?.innerWidth,
      screen_height: window?.innerHeight,
    },
    widget_description: null,
    dragDataType: {
      varchar: false,
      int: false,
      datetime: false,
    },
    edit_fields: {
      boolValue: false,
      series: "",
      data: "",
    },
    order_by: null,
    custom_attribute: {
      name: null,
      description: null,
      formula: null,
      custom_column: [
        {
          parameters: {
            attribute: null,
            display_name: null,
            data_type: null,
            selected: true,
          },
          operator: { value: null, selected: false },
          pair: {
            parameters: {
              attribute: null,
              display_name: null,
              data_type: null,
              selected: false,
            },
            numeric: { value: null, selected: false },
          },
          combined_operator: {
            value: null,
            selected: false,
          },
        },
      ],
    },
    widgetResetState: false,
    trends: null,
    filter_by_data: [],
    postcard_pills_filter: null,
    tags: [],
    data_source: null,
  },
};
const GraphConfig = (state = initialState, action) => {
  switch (action.type) {
    case "SET_X_ATTRIBUTE":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_Y_ATTRIBUTE":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_FILTER_OBJ":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_DURATION":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_BRANDS":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_CHART_TYPE":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_TAGS":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_CHART_NAME":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_CHART_DESCRIPTION":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_LEGEND_POSITION":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_NUMBER_TOP_POSTS":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_GLOBAL_DATA_LABEL":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_DUPLICATE_FOR_BRANDS":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };

    case "SET_WIDGET_DATA_LABEL_IN_PERCENT":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_GRADIENT_COLOR":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_GLOBAL_STACKED":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_GLOBAL_STACKED_DISABLED":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_GLOBAL_DURATION_COMPARISION":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_GLOBAL_DURATION_COMPARISION_FOR_CHART":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_GLOBAL_DURATION_DATA_FOR_CHART":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_SHARE_OF_DATA":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_SHOW_MARKER":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_DATA_COUNT_CARD":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_CARD_POSITION":
      return {
        ...state,

        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_CARD_LIMIT":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_CARD_SETIINGS":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_Y_AXIS_SCALE":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_CARD_SETIINGS_DATA":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_CARD_SETIINGS_CARD_DATA":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_CHART_Y_AXIS_SETIINGS_DATA":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_CHART_Y_AXIS_SCALE":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_CHART_Y_AXIS_MAP_AT":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_CHART_Y_AXIS_MODE":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_CHART_EDIT_FIELDS":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_POST_CARD_ORDER_BY":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_POLIFIC_ORDER_BY_ATTRIBUTE":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_CARD_SETTING_SERIES_AGGREGATION":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_CARD_SETTING_BENCHMARK_LINE":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_POST_CARD_FILTERS_BY_DATA":
      return {
        ...state,
        filters_by_data: action.widgetGraphConfig,
      };
    case "SET_WIDGET_TOTAL_ROW":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_MAKER_SPLIT_CARDS":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_MAKER_TOP_POSTS":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WORDCLOUD_COLOUR":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_MAKER_DYNAMIC_RADIUS":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_MAKER_BORDER_SENTIMENT":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };
    case "SET_WIDGET_MAKER_DATA_SOURCE":
      return {
        ...state,
        widgetGraphConfig: action.widgetGraphConfig,
      };

    default:
      return state;
  }
};

export default GraphConfig;
