let initialState = {
  on_boarding: {},
  // put this all in on borading key
  redirect_to_dashboard: false,
  redirect_to_sign_in: false,
  verified_otp_flag: false,
  sign_up_step: 1,
  sign_in_step: 1,
  change_password_step: 1,
  sign_up_loader: false,
  otp_validate_loader: false,
  sign_up_config: [
    {
      companies: [],
      industries: [],
      handles: [],
    },
  ],
  company_loader: {
    flag: false,
    key: null,
  },
  industry_loader: {
    flag: false,
    key: null,
  },
  linkedin_handle_loader: {
    flag: false,
    key: null,
  },
  twitter_handle_loader: {
    flag: false,
    key: null,
  },

  // Dashboard Code
  dashboard_deep_dive_level: 1,
  newTabIndex: 0,
  active_key: "1",
  dashboard_tabs_name_list: [],
  dashboard_tabs_name_loader: false,
  dashboard_brands_list: [],
  dashboards_data: [],
  dashboard_template_loader: false,
  dashboard_section_loader: false,
  account_settings_data: [],
  is_deep_dive_flag: false,
};

const NewzVerse = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DASHBOARD_ACTIVE_KEY":
      return {
        ...state,
        active_key: action.value,
      };
    case "SET_REDIRECT_TO_DASHBOARD":
      return {
        ...state,
        redirect_to_dashboard: action.value,
      };
    case "SET_REDIRECT_TO_SIGN_IN":
      return {
        ...state,
        redirect_to_sign_in: action.value,
      };
    case "SET_VERIFIED_OTP_FLAG":
      return {
        ...state,
        verified_otp_flag: action.value,
      };
    case "SET_SIGN_UP_STEP":
      return {
        ...state,
        sign_up_step: action.value,
      };
    case "SET_SIGN_IN_STEP":
      return {
        ...state,
        sign_in_step: action.value,
      };
    case "SET_CHANGE_PASSWORD_STEP":
      return {
        ...state,
        change_password_step: action.value,
      };
    case "SET_SIGN_UP_LOADER":
      return {
        ...state,
        sign_up_loader: action.value,
      };
    case "SET_OTP_VALIDATE_LOADER":
      return {
        ...state,
        otp_validate_loader: action.value,
      };
    case "SET_SIGN_UP_CONFIG":
      return {
        ...state,
        sign_up_config: action.value,
      };
    case "SET_COMPANY_LOADER":
      return {
        ...state,
        company_loader: action.value,
      };
    case "SET_INDUSTRY_LOADER":
      return {
        ...state,
        industry_loader: action.value,
      };
    case "SET_LINKEDIN_HANDLE_LOADER":
      return {
        ...state,
        linkedin_handle_loader: action.value,
      };
    case "SET_TWITTER_HANDLE_LOADER":
      return {
        ...state,
        twitter_handle_loader: action.value,
      };
    case "SET_DASHBOARD_DEEP_DIVE_LEVEL":
      return {
        ...state,
        dashboard_deep_dive_level: action.value,
      };
    case "UPDATE_DASHBOARD_TABS_DATA":
      return {
        ...state,
        dashboard_tabs_data: action.value,
      };
    case "SET_DASHBOARD_TABS_NAME_LOADER":
      return {
        ...state,
        dashboard_tabs_name_loader: action.value,
      };
    case "SET_DASHBOARD_TABS_NAME_LIST":
      return {
        ...state,
        dashboard_tabs_name_list: action.value,
      };
    case "SET_DASHBOARD_BRANDS_LIST":
      return {
        ...state,
        dashboard_brands_list: action.value,
      };
    case "SET_DASHBOARDS_DATA":
      return {
        ...state,
        dashboards_data: action.value,
      };
    case "SET_DASHBOARD_TEMPLATE_LOADER":
      return {
        ...state,
        dashboard_template_loader: action.value,
      };
    case "SET_DASHBOARD_SECTION_LOADER":
      return {
        ...state,
        dashboard_section_loader: action.value,
      };
    case "SET_ACCOUNT_SETTINGS_DATA":
      return {
        ...state,
        account_settings_data: action.value,
      };
    case "SET_IS_DEEP_DIVE_FLAG":
      return {
        ...state,
        is_deep_dive_flag: action.value,
      };

    default:
      return state;
  }
};

export default NewzVerse;
