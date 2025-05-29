let initialState = {
  auth: null,
  authParams: null,
  reportId: null,
  authLoader: false,
  authFlag: false,
  enableAWA: null,
  signOut: null,
  loginStatus: null,
};

const Authentication = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OAUTH":
      return {
        ...state,
        auth: action.payload,
      };
    case "SET_AUTH_PARAMS":
      return {
        ...state,
        authParams: action.payload,
      };
    case "SET_REPORT_ID":
      return {
        ...state,
        reportId: action.payload,
      };
    case "SET_AUTH_LOADER":
      return {
        ...state,
        authLoader: action.payload,
      };
    case "SET_AUTH_FLAG":
      return {
        ...state,
        authFlag: action.payload,
      };
    case "SET_ENABLE_AWA":
      return {
        ...state,
        enableAWA: action.payload,
      };
    case "SET_SIGN_OUT":
      return {
        ...state,
        signOut: action.payload,
      };
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        loginStatus: action.payload,
      };

    default:
      return state;
  }
};

export default Authentication;
