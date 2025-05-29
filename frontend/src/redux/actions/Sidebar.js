import axios from "axios";
import Config from "../../config";

import { callNotification } from "../constants";

export const getfeedbackResponse = (feedbackObj) => {
  return (dispatch) => {
    let url = `${Config.config1.api_link}/feedback`;
    axios.post(url, feedbackObj).then((response) => {
      if (response.data.status === "successful") {
        dispatch({
          type: "SET_FEEDBACK_RESPONSE",
          payload: response,
        });
        !feedbackObj?.report_download &&
          callNotification("Your request has been submitted!", "success");
      } else if (response.data.status === "error") {
        !feedbackObj?.report_download &&
          callNotification("Request failed. Please try again!", "error");
      }
    });
  };
};

export const displayFeedback = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_FEEDBACK", payload: value });
  };
};

export const setSidebarVisibility = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_SIDEBAR_VISIBILITY", payload: value });
  };
};
