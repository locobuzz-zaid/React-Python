//setting auth params
export const setAuthParams = (params, value, category_id) => {
  let updateParams = params ? { ...params } : value;
  updateParams.category_id = parseInt(value?.category_id);
  updateParams.category_name = value?.category_name;

  // New Code
  updateParams.ip_address = value?.ip_address;
  updateParams.visitor_id = value?.visitor_id;
  updateParams.user_id = value?.user_id;
  updateParams.credit_count = value?.credit_count;
  return (dispatch) => {
    dispatch({ type: "SET_AUTH_PARAMS", payload: updateParams });
  };
};
export const setPersistAuthParams = (params, value, category_id) => {
  let updateParams = params ? { ...params } : value;
  updateParams.category_id = parseInt(value?.category_id);
  updateParams.category_name = value?.category_name;

  return (dispatch) => {
    dispatch({ type: "SET_PERSIST_AUTH_PARAMS", payload: updateParams });
  };
};
export const updateAuthParamsTemplateId = (
  params,
  value,
  category_id,
  category_name
) => {
  let updateParams = { ...params };
  updateParams.template_id = value?.template_id;
  updateParams.category_id = parseInt(value?.category_id);
  updateParams.category_name = value?.category_name;

  return (dispatch) => {
    dispatch({ type: "SET_AUTH_PARAMS", payload: updateParams });
  };
};
export const updateAuthParamsDashboardThemeType = (params, value) => {
  let updateParams = { ...params };
  updateParams.theme_type = value?.theme_type;

  return (dispatch) => {
    dispatch({ type: "SET_AUTH_PARAMS", payload: updateParams });
  };
};

// setting screen_id in authparams
export const updateAuthParamsScreenId = (params, value) => {
  let updateParams = { ...params };
  updateParams.screen_id = value?.screen_id;
  updateParams.theme_type = value?.theme_type;
  return (dispatch) => {
    dispatch({ type: "SET_AUTH_PARAMS", payload: updateParams });
  };
};

//setting global duration for dashboards
export const setGlobalDuration = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_DASHBOARD_GLOBAL_DURATION", payload: value });
  };
};

//setting global brands for dashboards
export const setGlobalBrands = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_DASHBOARD_GLOBAL_BRANDS", payload: value });
  };
};

//setting global brands for dashboards
export const setGlobalSingleBrands = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_DASHBOARD_SINGLE_BRANDS", payload: value });
  };
};

//setting global brands for dashboards
export const setGlobalCategory_id = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_GLOBAL_CATEGORY_ID", payload: value });
  };
};
