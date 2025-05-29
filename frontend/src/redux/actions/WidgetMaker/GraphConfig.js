import uuid from "react-uuid";
import { compose } from "redux";
import { getRadiusAttributeValue } from "../../constants";
import { globalChartColor } from "../../constants/enums";

export const setX_attribute = (value) => {
  return (dispatch) => {
    dispatch({
      type: "SET_X_ATTRIBUTE",
      widgetGraphConfig: value,
    });
  };
};
export const setY_attribute = (value) => {
  return (dispatch) => {
    dispatch({
      type: "SET_Y_ATTRIBUTE",
      widgetGraphConfig: value,
    });
  };
};
export const setFilterObj = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.filter_by_data = null;
  if (updateWidgetGraphConfig?.order_by?.attribute) {
    updateWidgetGraphConfig.order_by = {
      ...updateWidgetGraphConfig.order_by,
      offset: 0,
    };
  }
  updateWidgetGraphConfig.filters = value;
  return (dispatch) => {
    dispatch({
      type: "SET_FILTER_OBJ",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetMakerDuration = (value, obj, x_axis_data) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.duration = value;
  updateWidgetGraphConfig.x_axis = x_axis_data ? x_axis_data : obj?.x_axis;
  updateWidgetGraphConfig.filter_by_data = null;
  updateWidgetGraphConfig.postcard_pills_filter = null;

  if (updateWidgetGraphConfig?.order_by?.attribute) {
    updateWidgetGraphConfig.order_by = {
      ...updateWidgetGraphConfig?.order_by,
      offset: 0,
    };
  }

  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_DURATION",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetBrands = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.brands = value;
  updateWidgetGraphConfig.filter_by_data = null;
  updateWidgetGraphConfig.postcard_pills_filter = null;

  if (updateWidgetGraphConfig?.order_by?.attribute) {
    updateWidgetGraphConfig.order_by = {
      ...updateWidgetGraphConfig?.order_by,
      offset: 0,
    };
  }

  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_BRANDS",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetChartType = (value, obj, brands, graphConditions) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_type = value;

  if (updateWidgetGraphConfig?.data_source) {
    updateWidgetGraphConfig.data_source = null;
  }

  if (updateWidgetGraphConfig.edit_fields) {
    updateWidgetGraphConfig.edit_fields.boolValue = false;
  }
  updateWidgetGraphConfig.dragDataType.datetime = false;
  updateWidgetGraphConfig.dragDataType.int = false;
  updateWidgetGraphConfig.dragDataType.varchar = false;

  let arr = [];
  arr = Object.keys(updateWidgetGraphConfig?.y_axis).map(
    (key) => updateWidgetGraphConfig?.y_axis[key]
  );

  let updated = arr?.map((d) => {
    if (d?.percent) {
      d.percent = false;
    }
    return d;
  });

  let finalUpdateYseries = {};
  Object.entries(updated).forEach((e, i) => {
    finalUpdateYseries = {
      ...finalUpdateYseries,
      [`y_series_${i + 1}`]: { ...e[1] },
    };
  });

  if (value === "combination") {
    if (updateWidgetGraphConfig.x_axis) {
      updateWidgetGraphConfig.x_axis.x_limit = 30;
    }
    updateWidgetGraphConfig.filter_by = [];
    updateWidgetGraphConfig.order_by = null;
    updateWidgetGraphConfig.chart_settings.is_stacked_disabled = false;
    if (
      finalUpdateYseries?.y_series_1?.attribute === "nss" ||
      finalUpdateYseries?.y_series_1?.attribute === "srs" ||
      graphConditions?.["time-label-attrs"]?.includes(
        finalUpdateYseries?.y_series_1?.attribute
      )
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
        y_series_2: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    } else {
      if (
        updateWidgetGraphConfig?.brands &&
        updateWidgetGraphConfig?.brands?.length &&
        updateWidgetGraphConfig?.brands?.[0].competitor
      ) {
        updateWidgetGraphConfig.chart_settings.benchmark_line = false;
      }
      if (!updateWidgetGraphConfig.breakdown_by?.length) {
        updateWidgetGraphConfig.chart_settings.is_stacked = false;
        updateWidgetGraphConfig.chart_settings.gradient_color = true;
      } else if (!updateWidgetGraphConfig?.chart_settings?.is_stacked) {
        updateWidgetGraphConfig.chart_settings.gradient_color = true;
      }
      if (updateWidgetGraphConfig.breakdown_by?.length > 1) {
        updateWidgetGraphConfig.breakdown_by.pop();
        updateWidgetGraphConfig.breakdown_by.map((d) => {
          d.is_pivot = false;
        });
      }

      updateWidgetGraphConfig.x_axis = updateWidgetGraphConfig.x_axis;
      updateWidgetGraphConfig.breakdown_by =
        updateWidgetGraphConfig.breakdown_by;

      if (Object.keys(finalUpdateYseries)?.length > 0) {
        let arr = [];
        arr = Object.keys(finalUpdateYseries).map(
          (key) => finalUpdateYseries[key]
        );
        let filteredArray = arr?.filter((d) => d.attribute);

        if (filteredArray?.length == 1) {
          let yseriesObject = {};
          Object.entries(filteredArray).forEach((e, i) => {
            yseriesObject = {
              ...yseriesObject,
              [`y_series_${i + 1}`]:
                e?.[1]?.data_source !== "page"
                  ? { ...e[1] }
                  : { attribute: null, aggregation: null },
              y_series_2: {
                attribute: null,
                aggregation: "COUNT",
              },
            };
          });
          updateWidgetGraphConfig.y_axis = yseriesObject;
        } else if (filteredArray?.length > 0) {
          let yseriesObject = {};
          let y_axis_settings_array = [];

          Object.entries(filteredArray).forEach((e, i) => {
            if (i < 5) {
              yseriesObject = {
                ...yseriesObject,
                [`y_series_${i + 1}`]:
                  e?.[1]?.data_source !== "page"
                    ? { ...e[1] }
                    : { attribute: null, aggregation: null },
              };
              y_axis_settings_array = [
                ...y_axis_settings_array,
                {
                  show_as: i === 0 ? "bar" : "line",
                  y_axis_map_at: i === 0 ? 0 : 1,
                  y_axis_scale: "linear",
                  color_pattern_code: 1,
                  key: uuid(),
                },
              ];
            }
          });
          updateWidgetGraphConfig.y_axis_settings = y_axis_settings_array;
          updateWidgetGraphConfig.y_axis = yseriesObject;
        } else {
          updateWidgetGraphConfig.y_axis = {
            y_series_1: {
              attribute: null,
              aggregation: "COUNT",
            },
            y_series_2: {
              attribute: null,
              aggregation: "COUNT",
            },
          };
        }
      } else {
        // For Edit widget in dashboards
        updateWidgetGraphConfig.y_axis = {
          y_series_1: {
            attribute: null,
            aggregation: "COUNT",
          },
          y_series_2: {
            attribute: null,
            aggregation: "COUNT",
          },
        };
      }
    }
  } else if (value === "networkgraph") {
    if (updateWidgetGraphConfig.x_axis) {
      let radiusAttribute = getRadiusAttributeValue(
        graphConditions,
        value,
        updateWidgetGraphConfig?.x_axis?.attribute
      );
      updateWidgetGraphConfig.x_axis.x_limit = 30;
      updateWidgetGraphConfig.x_axis.radius_attribute = radiusAttribute;
      updateWidgetGraphConfig.x_axis.color = updateWidgetGraphConfig?.x_axis
        ?.color
        ? updateWidgetGraphConfig?.x_axis?.color
        : globalChartColor?.[0];
    }
    updateWidgetGraphConfig.filter_by = [];
    updateWidgetGraphConfig.order_by = null;
    updateWidgetGraphConfig.chart_settings.is_stacked_disabled = false;
    if (updateWidgetGraphConfig.breakdown_by?.length > 0) {
      updateWidgetGraphConfig.breakdown_by.map((d, index) => {
        let radiusAttribute = getRadiusAttributeValue(
          graphConditions,
          value,
          d?.attribute
        );
        d.is_pivot = false;
        d.radius_attribute = radiusAttribute;
        d.color = d?.color ? d?.color : globalChartColor?.[index];
      });
    }

    updateWidgetGraphConfig.x_axis = updateWidgetGraphConfig.x_axis;
    updateWidgetGraphConfig.breakdown_by = updateWidgetGraphConfig.breakdown_by;
  } else if (
    value === "bar" ||
    value === "horizontal-bar" ||
    value === "area" ||
    value === "line"
  ) {
    if (updateWidgetGraphConfig.x_axis) {
      updateWidgetGraphConfig.x_axis.x_limit = 30;
    }
    //by default stacked is set false in case of area chart to avoid data points confusion in multiple area chart
    if (value === "area") {
      updateWidgetGraphConfig.chart_settings.is_stacked = false;
    }
    if (value === "horizontal-bar") {
      if (
        updateWidgetGraphConfig?.brands &&
        updateWidgetGraphConfig?.brands?.length &&
        updateWidgetGraphConfig?.brands?.[0].competitor
      ) {
        updateWidgetGraphConfig.chart_settings.benchmark_line = false;
      }
    }
    updateWidgetGraphConfig.filter_by = [];
    if (updateWidgetGraphConfig.breakdown_by?.length > 1) {
      updateWidgetGraphConfig.breakdown_by.pop();
      updateWidgetGraphConfig.breakdown_by.map((d) => {
        d.is_pivot = false;
      });
    }

    if (Object.keys(finalUpdateYseries)?.length > 0) {
      let arr = [];
      arr = Object.keys(finalUpdateYseries).map(
        (key) => finalUpdateYseries[key]
      );
      let filteredArray = arr?.filter((d) => d.attribute);

      if (filteredArray?.length > 0) {
        let yseriesObject = {};
        let y_axis_settings_array = [];

        Object.entries(filteredArray).forEach((e, i) => {
          if (i < 5) {
            yseriesObject = {
              ...yseriesObject,
              [`y_series_${i + 1}`]: { ...e[1] },
            };
            y_axis_settings_array = [
              ...y_axis_settings_array,
              {
                show_as: i === 0 ? "bar" : "line",
                y_axis_map_at: i === 0 ? 0 : 1,
                y_axis_scale: "linear",
                color_pattern_code: 1,
                key: uuid(),
              },
            ];
          }
        });

        updateWidgetGraphConfig.y_axis_settings = y_axis_settings_array;
        updateWidgetGraphConfig.y_axis = yseriesObject;
        if (
          graphConditions?.["time-label-attrs"]?.includes(
            finalUpdateYseries?.y_series_1?.attribute
          ) &&
          !graphConditions?.["time-label-attrs"]?.includes(
            finalUpdateYseries?.y_series_2?.attribute
          )
        ) {
          updateWidgetGraphConfig.x_axis = null;
          updateWidgetGraphConfig.breakdown_by = [];
          updateWidgetGraphConfig.y_axis = {
            y_series_1: {
              attribute: null,
              aggregation: "COUNT",
            },
          };
        }
      } else {
        updateWidgetGraphConfig.y_axis = {
          y_series_1: {
            attribute: null,
            aggregation: "COUNT",
          },
        };
      }
    } else {
      // For Edit widget in dashboards
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    }
    updateWidgetGraphConfig.order_by = null; //for prolific user data to get cleared
    updateWidgetGraphConfig.x_axis = updateWidgetGraphConfig.x_axis;
    updateWidgetGraphConfig.breakdown_by = updateWidgetGraphConfig.breakdown_by;
  } else if (
    value === "donut" ||
    value === "pie" ||
    value === "kpi" ||
    value === "wordcloud"
  ) {
    updateWidgetGraphConfig.y_axis_settings = [];
    if (value === "kpi") {
      // set split card false
      updateWidgetGraphConfig.chart_settings.split_cards = false;
    }
    if (updateWidgetGraphConfig.x_axis && value === "kpi") {
      updateWidgetGraphConfig.x_axis.x_limit = 10;
    }
    if (Object.keys(finalUpdateYseries)?.length > 0) {
      let arr = [];
      arr = Object.keys(finalUpdateYseries).map(
        (key) => finalUpdateYseries[key]
      );
      let filteredArray = arr?.filter((d) => d.attribute);
      let yseriesObject = {};
      if (filteredArray?.length > 0) {
        Object.entries(filteredArray).forEach((e, i) => {
          if (i < 1) {
            yseriesObject = {
              ...yseriesObject,
              [`y_series_${i + 1}`]:
                value === "kpi" ? { ...e[1] } : { ...e[1], filters: [] },
            };
          }
        });
        updateWidgetGraphConfig.y_axis = yseriesObject;
      } else {
        updateWidgetGraphConfig.y_axis = {
          y_series_1: {
            attribute: null,
            aggregation: "COUNT",
          },
        };
      }
    } else {
      // For Edit widget in dashboards
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    }
    updateWidgetGraphConfig.filter_by = [];
    updateWidgetGraphConfig.breakdown_by = [];
    updateWidgetGraphConfig.order_by = null; //for prolific user data to get cleared
    if (
      updateWidgetGraphConfig.y_axis?.y_series_1?.attribute === "nss" ||
      finalUpdateYseries?.y_series_1?.attribute === "srs" ||
      graphConditions?.["time-label-attrs"]?.includes(
        finalUpdateYseries?.y_series_1?.attribute
      )
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    } else if (
      value === "kpi" &&
      (updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
        "hashtags" ||
        updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
          "keyword" ||
        updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
          "tagcloud" ||
        updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
          "createddate")
    ) {
      if (updateWidgetGraphConfig.x_axis) {
        updateWidgetGraphConfig.x_axis.x_limit = 10;
      }
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    } else if (value === "pie" || value === "donut") {
      if (updateWidgetGraphConfig.x_axis) {
        updateWidgetGraphConfig.x_axis.x_limit = 6;
      }
      if (
        updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
        "createddate"
      ) {
        updateWidgetGraphConfig.x_axis.date_part = "ww";
      }
      updateWidgetGraphConfig.x_axis = updateWidgetGraphConfig.x_axis;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = updateWidgetGraphConfig.y_axis;
    } else if (value === "wordcloud") {
      if (updateWidgetGraphConfig.x_axis) {
        updateWidgetGraphConfig.x_axis.x_limit = 20;
      }
      if (
        updateWidgetGraphConfig?.x_axis &&
        (updateWidgetGraphConfig?.x_axis.attribute?.toLowerCase() ===
          "rating" ||
          updateWidgetGraphConfig?.x_axis.attribute?.toLowerCase() ===
            "createddate")
      ) {
        updateWidgetGraphConfig.x_axis = null;
        updateWidgetGraphConfig.breakdown_by = [];
        updateWidgetGraphConfig.y_axis = {
          y_series_1: {
            attribute: null,
            aggregation: "COUNT",
          },
        };
      } else {
        updateWidgetGraphConfig.breakdown_by = [];
        updateWidgetGraphConfig.y_axis = {};
        updateWidgetGraphConfig.y_axis =
          Object.keys(obj.y_axis)?.length > 0
            ? {
                y_series_1: {
                  ...obj.y_axis.y_series_1,
                  filters: [],
                },
              }
            : {
                y_series_1: {
                  attribute: null,
                  aggregation: "COUNT",
                },
              };
      }
    }
  } else if (value === "map") {
    updateWidgetGraphConfig.y_axis_settings = [];

    if (Object.keys(finalUpdateYseries)?.length > 0) {
      let arr = [];
      arr = Object.keys(finalUpdateYseries).map(
        (key) => finalUpdateYseries[key]
      );
      let filteredArray = arr?.filter((d) => d.attribute);
      let yseriesObject = {};
      if (filteredArray?.length > 0) {
        Object.entries(filteredArray).forEach((e, i) => {
          if (i < 1) {
            yseriesObject = {
              ...yseriesObject,
              [`y_series_${i + 1}`]:
                e?.[1]?.data_source !== "page"
                  ? { ...e[1], filters: [] }
                  : { attribute: null, aggregation: null },
            };
          }
        });
        updateWidgetGraphConfig.y_axis = yseriesObject;
      } else {
        updateWidgetGraphConfig.y_axis = {
          y_series_1: {
            attribute: null,
            aggregation: "COUNT",
          },
        };
      }
    } else {
      // For Edit widget in dashboards
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    }

    updateWidgetGraphConfig.filter_by = [];
    updateWidgetGraphConfig.order_by = null; //for prolific user data to get cleared
    if (
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
      "createddate"
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    }
    if (
      updateWidgetGraphConfig.y_axis?.y_series_1?.attribute === "nss" ||
      finalUpdateYseries?.y_series_1?.attribute === "srs" ||
      graphConditions?.["time-label-attrs"]?.includes(
        finalUpdateYseries?.y_series_1?.attribute
      )
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    } else {
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.x_axis = null;
    }
  } else if (value === "grid" || value === "networkgraph") {
    if (!updateWidgetGraphConfig?.chart_settings?.show_peak) {
      updateWidgetGraphConfig.chart_settings.show_peak = true;
    }
    if (!updateWidgetGraphConfig?.chart_settings?.show_valley) {
      updateWidgetGraphConfig.chart_settings.show_valley = true;
    }

    updateWidgetGraphConfig.y_axis_settings = [];

    if (updateWidgetGraphConfig.x_axis) {
      updateWidgetGraphConfig.x_axis.x_limit = 50;
    }
    updateWidgetGraphConfig.filter_by = [];
    updateWidgetGraphConfig.order_by = null; //for prolific user data to get cleared
    if (
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
      "createddate"
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    }
    if (
      updateWidgetGraphConfig.y_axis?.y_series_1?.attribute === "nss" ||
      finalUpdateYseries?.y_series_1?.attribute === "srs" ||
      graphConditions?.["time-label-attrs"]?.includes(
        finalUpdateYseries?.y_series_1?.attribute
      )
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    } else if (
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
        "hashtags" ||
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() === "keyword" ||
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() === "tagcloud"
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    } else {
      // When we are coming from KPI chart to grid with page attribute
      // Reset the y-axis state, because page is supported in only in KPI Chart
      // if (updateWidgetGraphConfig?.y_axis?.y_series_1?.data_source === "page") {
      //   updateWidgetGraphConfig.y_axis = {
      //     y_series_1: {
      //       attribute: null,
      //       aggregation: "COUNT",
      //     },
      //   };
      // }

      // To Reset filter in grid chart or networkgraph
      if (value === "grid" || value === "networkgraph") {
        if (Object.keys(finalUpdateYseries)?.length > 0) {
          let arr = [];
          arr = Object.keys(finalUpdateYseries).map(
            (key) => finalUpdateYseries[key]
          );
          let filteredArray = arr?.filter((d) => d.attribute);
          let yseriesObject = {};
          if (filteredArray?.length > 0) {
            Object.entries(filteredArray).forEach((e, i) => {
              if (i < 1) {
                yseriesObject = {
                  ...yseriesObject,
                  [`y_series_${i + 1}`]: { ...e[1], filters: [] },
                };
              }
            });
            updateWidgetGraphConfig.y_axis = yseriesObject;
          } else {
            updateWidgetGraphConfig.y_axis = {
              y_series_1: {
                attribute: null,
                aggregation: "COUNT",
              },
            };
          }
        }
      }
      // To Reset filter in networkgraph
      if (value === "networkgraph") {
        if (Object.keys(finalUpdateYseries)?.length > 0) {
          let arr = [];
          arr = Object.keys(finalUpdateYseries).map(
            (key) => finalUpdateYseries[key]
          );
          let filteredArray = arr?.filter((d) => d.attribute);
          let yseriesObject = {};
          if (filteredArray?.length > 0) {
            Object.entries(filteredArray).forEach((e, i) => {
              if (i < 1) {
                yseriesObject = {
                  ...yseriesObject,
                  [`y_series_${i + 1}`]: { ...e[1], filters: [] },
                };
              }
            });
            updateWidgetGraphConfig.y_axis = yseriesObject;
          } else {
            updateWidgetGraphConfig.y_axis = {
              y_series_1: {
                attribute: null,
                aggregation: "COUNT",
              },
            };
          }
        }
      }
      if (updateWidgetGraphConfig.breakdown_by?.length > 0)
        updateWidgetGraphConfig.breakdown_by?.map((d) => {
          d.y_limit = 5;
          if (d?.is_pivot) {
            d.is_pivot = false;
          }
          return d;
        });
    }
  } else if (value === "pivot-grid") {
    if (!updateWidgetGraphConfig?.chart_settings?.show_peak) {
      updateWidgetGraphConfig.chart_settings.show_peak = true;
    }
    if (!updateWidgetGraphConfig?.chart_settings?.show_valley) {
      updateWidgetGraphConfig.chart_settings.show_valley = true;
    }

    updateWidgetGraphConfig.y_axis_settings = [];

    if (updateWidgetGraphConfig.x_axis) {
      updateWidgetGraphConfig.x_axis.x_limit = 50;
    }
    if (Object.keys(finalUpdateYseries)?.length > 0) {
      let arr = [];
      arr = Object.keys(finalUpdateYseries).map(
        (key) => finalUpdateYseries[key]
      );
      let filteredArray = arr?.filter((d) => d.attribute);
      let yseriesObject = {};
      if (filteredArray?.length > 0) {
        Object.entries(filteredArray).forEach((e, i) => {
          if (i < 1) {
            yseriesObject = {
              ...yseriesObject,
              [`y_series_${i + 1}`]: { ...e[1], filters: [] },
            };
          }
        });
        updateWidgetGraphConfig.y_axis = yseriesObject;
      } else {
        updateWidgetGraphConfig.y_axis = {
          y_series_1: {
            attribute: null,
            aggregation: "COUNT",
          },
        };
      }
    } else {
      // For Edit widget in dashboards
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    }

    updateWidgetGraphConfig.filter_by = [];
    updateWidgetGraphConfig.order_by = null; //for prolific user data to get cleared
    if (
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
      "createddate"
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    }
    if (
      updateWidgetGraphConfig.y_axis?.y_series_1?.attribute === "nss" ||
      finalUpdateYseries?.y_series_1?.attribute === "srs" ||
      graphConditions?.["time-label-attrs"]?.includes(
        finalUpdateYseries?.y_series_1?.attribute
      )
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    } else if (
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
        "hashtags" ||
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() === "keyword" ||
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() === "tagcloud"
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    } else if (
      value === "pivot-grid" &&
      updateWidgetGraphConfig.breakdown_by?.length > 0
    ) {
      if (updateWidgetGraphConfig.breakdown_by?.length > 1) {
        updateWidgetGraphConfig.breakdown_by.pop();
      }
      updateWidgetGraphConfig.breakdown_by?.map((d) => {
        d.y_limit = null;
        if (d?.is_pivot) {
          d.is_pivot = true;
        }
        return d;
      });
    }
  } else if (value === "post-card") {
    updateWidgetGraphConfig.order_by = null; //for prolific user data to get cleared

    // To reset the added cards from card settings
    if (updateWidgetGraphConfig?.card_settings?.[0]?.x_axis) {
      updateWidgetGraphConfig.card_settings = [
        {
          card_id: uuid(),
          card_name: 1,
          card_value: null,
          x_axis: null,
          y_series: null,
          response: [],
        },
      ];
    }

    if (
      updateWidgetGraphConfig.y_axis?.y_series_1?.attribute === "nss" ||
      finalUpdateYseries?.y_series_1?.attribute === "srs" ||
      graphConditions?.["time-label-attrs"]?.includes(
        finalUpdateYseries?.y_series_1?.attribute
      )
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
      let obj = {
        data_source: "mentions",
        attribute: "engagement",
        offset: 0,
        sort_order: "desc",
      };
      updateWidgetGraphConfig.order_by = obj;
    } else {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
      let obj = {
        data_source: "mentions",
        attribute: "engagement",
        offset: 0,
        sort_order: "desc",
      };
      updateWidgetGraphConfig.order_by = obj;
    }
  } else if (value === "review-card") {
    // To reset the added cards from card settings
    if (updateWidgetGraphConfig?.card_settings?.[0]?.x_axis) {
      updateWidgetGraphConfig.card_settings = [
        {
          card_id: uuid(),
          card_name: 1,
          card_value: null,
          x_axis: null,
          y_series: null,
          response: [],
        },
      ];
    }

    if (
      updateWidgetGraphConfig.y_axis?.y_series_1?.attribute === "nss" ||
      finalUpdateYseries?.y_series_1?.attribute === "srs" ||
      graphConditions?.["time-label-attrs"]?.includes(
        finalUpdateYseries?.y_series_1?.attribute
      )
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
      let obj = {
        data_source: "mentions",
        attribute: "engagement",
        offset: 0,
        sort_order: "desc",
      };
      updateWidgetGraphConfig.order_by = obj;
    } else {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
      let obj = {
        data_source: "mentions",
        attribute: "createddate",
        offset: 0,
        sort_order: "desc",
      };
      updateWidgetGraphConfig.order_by = obj;
    }
  } else if (value === "author-card") {
    // To reset the added cards from card settings
    if (updateWidgetGraphConfig?.card_settings?.[0]?.y_series?.attribute) {
      updateWidgetGraphConfig.card_settings = [
        {
          card_id: uuid(),
          card_name: 1,
          card_value: null,
          x_axis: null,
          y_series: null,
          response: [],
        },
      ];
    }

    if (
      updateWidgetGraphConfig.y_axis?.y_series_1?.attribute === "nss" ||
      finalUpdateYseries?.y_series_1?.attribute === "srs" ||
      graphConditions?.["time-label-attrs"]?.includes(
        finalUpdateYseries?.y_series_1?.attribute
      )
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
      let obj = {
        data_source: "mentions",
        attribute: "engagement",
        offset: 0,
        sort_order: "desc",
      };
      updateWidgetGraphConfig.order_by = obj;
    } else {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
      let obj = {
        data_source: "mentions",
        attribute: "followerscount",
        offset: 0,
        sort_order: "desc",
      };
      updateWidgetGraphConfig.order_by = obj;
    }
  } else if (
    value !== "pivot-grid" &&
    updateWidgetGraphConfig.breakdown_by?.length > 0
  ) {
    if (value === "prolific-user") {
      updateWidgetGraphConfig.filter_by = [];
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };

      let obj = {
        data_source: "mentions",
        attribute: "engagement",
        offset: 0,
        sort_order: "desc",
      };
      updateWidgetGraphConfig.order_by = obj;
      if (
        updateWidgetGraphConfig?.brands?.[0]?.competitor ||
        updateWidgetGraphConfig?.brands?.[0]?.group ||
        !updateWidgetGraphConfig?.brands
      ) {
        updateWidgetGraphConfig.brands = [brands[0]];
      }
    }
    if (value === "bubble" || value === "heatmap" || value === "sunburst") {
      if (value === "bubble") {
        if (updateWidgetGraphConfig.x_axis) {
          updateWidgetGraphConfig.x_axis.x_limit = 20;
        }
      } else if (value === "heatmap") {
        if (updateWidgetGraphConfig.x_axis) {
          updateWidgetGraphConfig.x_axis.x_limit = 30;
        }
      } else if (value === "sunburst") {
        if (updateWidgetGraphConfig.x_axis) {
          updateWidgetGraphConfig.x_axis.x_limit = 10;
        }
      }

      if (Object.keys(finalUpdateYseries)?.length > 0) {
        let arr = [];
        arr = Object.keys(finalUpdateYseries).map(
          (key) => finalUpdateYseries[key]
        );
        let filteredArray = arr?.filter((d) => d.attribute);
        let yseriesObject = {};
        if (filteredArray?.length > 0) {
          Object.entries(filteredArray).forEach((e, i) => {
            if (i < 1) {
              yseriesObject = {
                ...yseriesObject,
                [`y_series_${i + 1}`]: { ...e[1], filters: [] },
              };
            }
          });
          updateWidgetGraphConfig.y_axis = yseriesObject;
        } else {
          updateWidgetGraphConfig.y_axis = {
            y_series_1: {
              attribute: null,
              aggregation: "COUNT",
            },
          };
        }
      } else {
        // For Edit widget in dashboards
        updateWidgetGraphConfig.y_axis = {
          y_series_1: {
            attribute: null,
            aggregation: "COUNT",
          },
        };
      }

      if (
        updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
          "createddate" ||
        updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
          "rating" ||
        updateWidgetGraphConfig?.breakdown_by
          ?.map((d) => d?.attribute)
          ?.includes("rating")
      ) {
        updateWidgetGraphConfig.x_axis = null;
        updateWidgetGraphConfig.breakdown_by = [];
        updateWidgetGraphConfig.y_axis = {
          y_series_1: {
            attribute: null,
            aggregation: "COUNT",
          },
        };
      }

      // When we are coming from KPI chart to grid with page attribute
      // Reset the y-axis state, because page is supported in only in KPI Chart
      // if (updateWidgetGraphConfig?.y_axis?.y_series_1?.data_source === "page") {
      //   updateWidgetGraphConfig.y_axis = {
      //     y_series_1: {
      //       attribute: null,
      //       aggregation: "COUNT",
      //     },
      //   };
      // }
    }

    if (updateWidgetGraphConfig.breakdown_by?.length > 1) {
      updateWidgetGraphConfig.breakdown_by.pop();
      updateWidgetGraphConfig.breakdown_by.map((d) => {
        d.is_pivot = false;
      });
    }
    if (
      updateWidgetGraphConfig.y_axis?.y_series_1?.attribute === "nss" ||
      finalUpdateYseries?.y_series_1?.attribute === "srs" ||
      graphConditions?.["time-label-attrs"]?.includes(
        finalUpdateYseries?.y_series_1?.attribute
      )
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    } else if (
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
        "hashtags" ||
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() === "keyword" ||
      updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() === "tagcloud"
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    } else {
      updateWidgetGraphConfig.breakdown_by?.map((d) => {
        if (d?.is_pivot) {
          d.is_pivot = false;
        }
        return d;
      });
    }
  } else if (value === "prolific-user") {
    // To reset the added cards from card settings
    if (updateWidgetGraphConfig?.card_settings?.[0]?.x_axis) {
      updateWidgetGraphConfig.card_settings = [
        {
          card_id: uuid(),
          card_name: 1,
          card_value: null,
          x_axis: null,
          y_series: null,
          response: [],
        },
      ];
    }

    updateWidgetGraphConfig.filter_by = [];
    updateWidgetGraphConfig.x_axis = null;
    updateWidgetGraphConfig.breakdown_by = [];
    updateWidgetGraphConfig.y_axis = {
      y_series_1: {
        attribute: null,
        aggregation: "COUNT",
      },
    };

    let obj = {
      data_source: "mentions",
      attribute: "engagement",
      offset: 0,
      sort_order: "desc",
    };
    updateWidgetGraphConfig.order_by = obj;
    if (
      updateWidgetGraphConfig?.brands?.[0]?.competitor ||
      updateWidgetGraphConfig?.brands?.[0]?.group ||
      !updateWidgetGraphConfig?.brands
    ) {
      updateWidgetGraphConfig.brands = [brands[0]];
    }
  } else if (value !== "prolific-user") {
    if (updateWidgetGraphConfig.breakdown_by?.length > 1) {
      updateWidgetGraphConfig.breakdown_by.pop();
      updateWidgetGraphConfig.breakdown_by.map((d) => {
        d.is_pivot = false;
      });
    }
    updateWidgetGraphConfig.order_by = null;

    if (
      updateWidgetGraphConfig.y_axis?.y_series_1?.attribute === "nss" ||
      finalUpdateYseries?.y_series_1?.attribute === "srs" ||
      graphConditions?.["time-label-attrs"]?.includes(
        finalUpdateYseries?.y_series_1?.attribute
      )
    ) {
      updateWidgetGraphConfig.x_axis = null;
      updateWidgetGraphConfig.breakdown_by = [];
      updateWidgetGraphConfig.y_axis = {
        y_series_1: {
          attribute: null,
          aggregation: "COUNT",
        },
      };
    }

    if (value === "bubble" || value === "heatmap" || value === "sunburst") {
      if (value === "bubble") {
        if (updateWidgetGraphConfig.x_axis) {
          updateWidgetGraphConfig.x_axis.x_limit = 20;
        }
      } else if (value === "heatmap") {
        if (updateWidgetGraphConfig.x_axis) {
          updateWidgetGraphConfig.x_axis.x_limit = 30;
        }
      } else if (value === "sunburst") {
        if (updateWidgetGraphConfig.x_axis) {
          updateWidgetGraphConfig.x_axis.x_limit = 10;
        }
      }

      if (
        updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
          "createddate" ||
        updateWidgetGraphConfig?.x_axis?.attribute?.toLowerCase() ===
          "rating" ||
        updateWidgetGraphConfig?.breakdown_by
          ?.map((d) => d?.attribute)
          ?.includes("rating")
      ) {
        updateWidgetGraphConfig.x_axis = null;
        updateWidgetGraphConfig.breakdown_by = [];
        updateWidgetGraphConfig.y_axis = {
          y_series_1: {
            attribute: null,
            aggregation: "COUNT",
          },
        };
      }

      // When we are coming from KPI chart to grid with page attribute
      // Reset the y-axis state, because page is supported in only in KPI Chart
      // if (updateWidgetGraphConfig?.y_axis?.y_series_1?.data_source === "page") {
      //   updateWidgetGraphConfig.y_axis = {
      //     y_series_1: {
      //       attribute: null,
      //       aggregation: "COUNT",
      //     },
      //   };
      // }
    }
  }
  if (value !== "grid") {
    updateWidgetGraphConfig.chart_settings.show_previous_duration_comparison = false;
    updateWidgetGraphConfig.chart_settings.show_previous_duration_data = false;
  }

  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_CHART_TYPE",
      widgetGraphConfig: { ...updateWidgetGraphConfig },
    });
  };
};

export const setWidgetChartName = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_property.chart_name = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_CHART_NAME",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetChartDescription = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.widget_description = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_CHART_DESCRIPTION",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetTags = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.tags = value;
  return (dispatch) => {
    dispatch({
      type: "SET_TAGS",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetLegendPosition = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_property.legend_position = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_LEGEND_POSITION",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetNumberTopPosts = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_property.no_of_top_posts = value;
  if (updateWidgetGraphConfig?.order_by?.offset) {
    updateWidgetGraphConfig.order_by.offset = 0;
  }
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_NUMBER_TOP_POSTS",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetGlobalDataLabel = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.global_data_label = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_GLOBAL_DATA_LABEL",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetDuplicateForBrands = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.duplicate_for_brands = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_DUPLICATE_FOR_BRANDS",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetDataLabelInPercent = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.chart_percent = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_DATA_LABEL_IN_PERCENT",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetGradientColor = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.gradient_color = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_GRADIENT_COLOR",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetGlobalStacked = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.is_stacked = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_GLOBAL_STACKED",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetGlobalStackedToDisabled = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.is_stacked_disabled = value;
  updateWidgetGraphConfig.chart_settings.is_stacked = !value;
  updateWidgetGraphConfig.chart_settings.gradient_color = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_GLOBAL_STACKED_DISABLED",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetGlobalDurationComparision = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.duration_comparison = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_GLOBAL_DURATION_COMPARISION",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetGlobalDurationComparisionForChart = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.show_previous_duration_comparison =
    value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_GLOBAL_DURATION_COMPARISION_FOR_CHART",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetGlobalDurationDataForChart = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.show_previous_duration_data = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_GLOBAL_DURATION_DATA_FOR_CHART",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetShareOfData = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.card_percent = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_SHARE_OF_DATA",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetTotalRow = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.total_row = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_TOTAL_ROW",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetMakerSplitCards = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.split_cards = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_MAKER_SPLIT_CARDS",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetMakerTopPosts = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.top_posts_in_cards = value;
  if (updateWidgetGraphConfig?.order_by?.offset) {
    updateWidgetGraphConfig.order_by.offset = 0;
  }
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_MAKER_TOP_POSTS",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetMakerDyanamicRadius = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.dynamic_radius = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_MAKER_DYNAMIC_RADIUS",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetMakerBorderSentiment = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.border_sentiment = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_MAKER_BORDER_SENTIMENT",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setWidgetMakerDataSource = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.data_source = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_MAKER_DATA_SOURCE",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetChartMarkers = (value, obj) => {
  //dynamic
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.show_marker = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_SHOW_MARKER",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetDataCountCard = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.data_count_card = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_DATA_COUNT_CARD",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setCardSeriesAggregation = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.group_line_agg = value;
  return (dispatch) => {
    dispatch({
      type: "SET_CARD_SETTING_BENCHMARK_LINE",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
export const setCardBenchmarkLine = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.benchmark_line = value;
  return (dispatch) => {
    dispatch({
      type: "SET_CARD_SETTING_BENCHMARK_LINE",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetCardPosition = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.card_position = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_CARD_POSITION",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetCardLimit = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.card_limit = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WIDGET_CARD_LIMIT",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setCardSettings = (value) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CARD_SETIINGS",
      widgetGraphConfig: value,
    });
  };
};

export const setYAxisScale = (value, obj) => {
  //dynamic
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.y_axis_scale = value;
  return (dispatch) => {
    dispatch({
      type: "SET_Y_AXIS_SCALE",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setCardSettingsData = (value, index, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.card_settings[index].response = value;

  return (dispatch) => {
    dispatch({
      type: "SET_CARD_SETIINGS_DATA",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setCardSettingsCardData = (value, index, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.card_settings[index].card_data = value;

  return (dispatch) => {
    dispatch({
      type: "SET_CARD_SETIINGS_CARD_DATA",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setChartYaxisSettingsData = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  let arr = updateWidgetGraphConfig?.y_axis_settings?.map((el, i) => {
    return { ...el, show_as: value[i]?.chart_type };
  });
  updateWidgetGraphConfig.y_axis_settings = arr;

  return (dispatch) => {
    dispatch({
      type: "SET_CHART_Y_AXIS_SETIINGS_DATA",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setChartYaxisScale = (value, obj, type) => {
  let updateWidgetGraphConfig = { ...obj };
  if (type !== "combination") {
    updateWidgetGraphConfig.y_axis_settings[0].y_axis_scale = value;
  } else {
    let arr = updateWidgetGraphConfig?.y_axis_settings?.map((el, i) => {
      return { ...el, y_axis_scale: value[i]?.y_axis_scale };
    });
    updateWidgetGraphConfig.y_axis_settings = arr;
  }

  return (dispatch) => {
    dispatch({
      type: "SET_CHART_Y_AXIS_SCALE",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setChartYAxisMapAt = (value, obj, type) => {
  let updateWidgetGraphConfig = { ...obj };
  if (type !== "combination") {
    updateWidgetGraphConfig.y_axis_settings[0].y_axis_map_at = value;
  } else {
    let arr = updateWidgetGraphConfig?.y_axis_settings?.map((el, i) => {
      return { ...el, y_axis_map_at: value?.[i]?.y_axis_map_at };
    });
    updateWidgetGraphConfig.y_axis_settings = arr;
  }
  return (dispatch) => {
    dispatch({
      type: "SET_CHART_Y_AXIS_MAP_AT",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setChartYAxisMode = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_property.y_axis_mode = value;

  return (dispatch) => {
    dispatch({
      type: "SET_CHART_Y_AXIS_MODE",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setChartEditField = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.edit_fields = value;

  return (dispatch) => {
    dispatch({
      type: "SET_CHART_EDIT_FIELDS",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setCustomAttributeName = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.custom_attribute.name = value;

  return (dispatch) => {
    dispatch({
      type: "SET_CUSTOM_ATTRIBUTE_NAME",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setPostCardOrderBy = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.order_by.offset = value;

  return (dispatch) => {
    dispatch({
      type: "SET_POST_CARD_ORDER_BY",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setPolificOrderByAttribute = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.order_by = value;

  return (dispatch) => {
    dispatch({
      type: "SET_POLIFIC_ORDER_BY_ATTRIBUTE",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};

export const setWidgetPreview = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_WIDGET_PREVIEW", payload: value });
  };
};

export const setWordcloudColour = (value, obj) => {
  let updateWidgetGraphConfig = { ...obj };
  updateWidgetGraphConfig.chart_settings.wordcloud_color = value;
  return (dispatch) => {
    dispatch({
      type: "SET_WORDCLOUD_COLOUR",
      widgetGraphConfig: updateWidgetGraphConfig,
    });
  };
};
