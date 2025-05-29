/* eslint-disable no-useless-concat */
import axios from "axios";
import Config from "../../config";

import { callNotification } from "../constants";
import { setGlobalLoader, setTemplateListLoader } from "./ApiCall/apiCall";
import {
  setGlobalBrands,
  setGlobalDuration,
  setGlobalSingleBrands,
} from "./AuthParams";
// import { onDashboardReset } from "./dashboard/Tab1";

function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

//setting report id
export const setReportId = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_REPORT_ID", payload: value });
  };
};

//setting auth loader
export const setAuthLoader = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_AUTH_LOADER", payload: value });
  };
};

//setting auth flag
export const setAuthFlag = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_AUTH_FLAG", payload: value });
  };
};

export const setEnableAWA = (ptoken, user_id) => {
  return async (dispatch) => {
    let body = {
      user_id: user_id,
      ptoken: ptoken,
    };

    let url = `${Config.config1.api_link}/enable_awa`;
    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: "SET_ENABLE_AWA",
          payload: response,
        });
        if (response?.data?.status === "successful") {
          callNotification("Your request has been submitted!", "success");
        } else if (response?.data?.status === "error") {
          callNotification(null, "error");
        }
      })
      .catch((error) => {
        callNotification(null, "error");
      });
  };
};

//sign out function
export const setSignOut = (ptoken, user_id) => {
  return async (dispatch) => {
    let body = {
      user_id: user_id,
      ptoken: ptoken,
    };

    let url = `${Config.config1.api_link}/user/logout`;
    dispatch(setGlobalLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        dispatch(setGlobalLoader(false));
        if (response?.data?.status === "successful") {
          dispatch({
            type: "SET_SIGN_OUT",
            payload: response,
          });
          deleteAllCookies();

          // reset all states
          dispatch(setGlobalDuration(null));
          dispatch(setGlobalBrands(null));
          dispatch(setGlobalSingleBrands(null));
          // dispatch(onDashboardReset());
          window.localStorage.clear();
        }
        if (response?.data?.status === "error") {
          callNotification(null, "error");
        }
      })
      .catch((error) => {
        callNotification(null, "error");
      });
  };
};

//Check Login status
export const setLoginStatus = (ptoken, user_id) => {
  return async (dispatch) => {
    if (ptoken) {
      let body = {
        //user_id: parseInt(user_id),
        ptoken: ptoken,
      };

      let url = `${Config.config1.api_link}/user/login/status`;
      axios
        .post(url, body)
        .then((response) => {
          dispatch({
            type: "SET_LOGIN_STATUS",
            payload: response,
          });
        })
        .catch((error) => {
          callNotification(null, "error");
        });
    } else {
      dispatch({
        type: "SET_LOGIN_STATUS",
        payload: null,
      });
    }
  };
};
