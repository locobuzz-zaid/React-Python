export const setWidgetLibraryArray = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_WIDGET_LIBRARY_ARRAY", payload: value });
  };
};
export const setWidgetLibraryCheckedList = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_WIDGET_LIBRARY_CHECKED_LIST", payload: value });
  };
};

export const setWidgetShow = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_WIDGET_SHOW", payload: value });
  };
};

export const setEditWidget = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_EDIT_WIDGET", payload: value });
  };
};

export const setFilterLoader = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_FILTER_LOADER", payload: value });
  };
};

export const setWidgetLibraryTabName = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_WIDGET_LIBRARY_TAB_NAME", payload: value });
  };
};

export const setWidgetSelectedList = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_WIDGET_SELECTED_LIST", payload: value });
  };
};
export const setDataSource = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_DATA_SOURCE", payload: value });
  };
};

export const setWidgetLibraryFilter = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_WIDGET_LIBRARY_FILTER", payload: value });
  };
};
