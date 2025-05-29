import axios from "axios";
import Config from "../../../config";
import { showToast } from "../../constants";
import {
  setSignUpStep,
  setSignUpLoader,
  setOtpValidateLoader,
  setSignUpConfig,
  setVerifiedOtpFlag,
  setRedirectToDashboard,
  setLinkedinHandleLoader,
  setTwitterHandleLoader,
  setIndustryLoader,
  setSignInStep,
  setRedirectToSignIn,
  setDashboardTabsNameLoader,
  setDashboardTabsNameList,
  setDashboardBrandsList,
  setDashboardsData,
  setCompanyLoader,
  setTemplateLoader,
  setSectionLoader,
  setAccountSettingsData,
} from "./NewzVerse";
import { format } from "date-fns";

// Sign Up API
export const signUpAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      name: payloadObj?.name,
      email: payloadObj?.email,
      password: payloadObj?.password,
      captcha_token: payloadObj?.captcha_token,
    };

    let url = `${Config.config1.api_link}/auth/sign-up`;
    dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          dispatch(setSignUpStep(3));
          dispatch(setSignUpLoader(false));
        } else {
          if (response?.data?.message) {
            showToast(response?.data?.message, "error");
          }
          dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSignUpLoader(false));
        console.log("auth/sign-up API catch error", error);
      });
  };
};
// Validate OTP API
export const validateOtpAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      email: payloadObj?.email,
      otp: payloadObj?.otp,
    };

    let url = `${Config.config1.api_link}/auth/validate-otp`;
    dispatch(setOtpValidateLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log("validate-otp response =>", response);
          if (payloadObj?.forgot_password_flow) {
            dispatch(setVerifiedOtpFlag(true));
            dispatch(setOtpValidateLoader(false));

            localStorage.setItem("tmp_token", response?.data?.tmp_token);

            // After 2 secs, redirect to next page
            setTimeout(() => {
              dispatch(setSignInStep(4));
              dispatch(setVerifiedOtpFlag(false));
            }, 2000);
          } else {
            dispatch(setVerifiedOtpFlag(true));
            let arrayData = [
              {
                key: "1",
                companies: response?.data?.companies,
                industries: response?.data?.industry,
                handles: [
                  {
                    type: "linkedin",
                    data: response?.data?.linkedin_profiles?.[0]?.data,
                  },
                  {
                    type: "twitter",
                    data: response?.data?.twitter_profiles?.[0]?.data,
                  },
                ],
              },
            ];
            dispatch(setSignUpConfig(arrayData));
            dispatch(setOtpValidateLoader(false));

            localStorage.setItem("tmp_token", response?.data?.tmp_token);

            // After 2 secs, redirect to next page
            setTimeout(() => {
              dispatch(setSignUpStep(4));
              dispatch(setVerifiedOtpFlag(false));
            }, 2000);
          }
        } else if (response?.data?.status === "error") {
          if (
            response?.data?.message ==
            "Too many failed attempts. Please request a new OTP."
          ) {
            showToast(response?.data?.message, "error");
          } else {
            showToast(response?.data?.message, "error");
          }
          dispatch(setOtpValidateLoader(false));
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setOtpValidateLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setOtpValidateLoader(false));
        console.log("validate-otp API catch error", error);
      });
  };
};
// Get Email Info API
export const getAiEmailInfoAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      operation: payloadObj?.operation,
      payload: {
        company_name: payloadObj?.payload?.company_name,
        industry_name: payloadObj?.payload?.industry_name,
      },
    };

    let url = `${Config.config1.api_link}/ai_data/ai-info-email`;

    if (payloadObj?.operation === -1) {
      dispatch(
        setCompanyLoader({
          flag: true,
          key: payloadObj?.key,
        })
      );
    } else {
      dispatch(
        setIndustryLoader({
          flag: true,
          key: payloadObj?.key,
        })
      );
    }

    axios
      .post(url, body)
      .then((response) => {
        if (payloadObj?.operation === -1) {
          let updatedArray = payloadObj?.sign_up_config?.map((d, index) => {
            if (Number(payloadObj?.key) === index + 1) {
              d.companies = response?.data;
              d.industries = [];
              d.handles = [];
            }
            return d;
          });
          dispatch(setSignUpConfig(updatedArray));

          dispatch(
            setCompanyLoader({
              flag: false,
              key: null,
            })
          );
        } else if (
          response ||
          response?.status === 200 ||
          response?.data?.status === "successful"
        ) {
          // console.log("response =>", response?.data, "key", payloadObj);
          let updatedArray = payloadObj?.sign_up_config?.map((d, index) => {
            if (Number(payloadObj?.key) === index + 1) {
              d.industries = response?.data?.industry_suggestions;
              d.handles = [];
            }
            return d;
          });
          dispatch(setSignUpConfig(updatedArray));
          dispatch(
            setIndustryLoader({
              flag: false,
              key: null,
            })
          );
        } else {
          showToast(response?.data?.message, "error");

          dispatch(
            setCompanyLoader({
              flag: false,
              key: null,
            })
          );
          dispatch(
            setIndustryLoader({
              flag: false,
              key: null,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setCompanyLoader({
            flag: false,
            key: null,
          })
        );
        dispatch(
          setIndustryLoader({
            flag: false,
            key: null,
          })
        );
        console.log("ai-info-email API catch error", error);
      });
  };
};
// Get Ai Social Profiles
export const getAiSocialProfiles = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      brand_name: payloadObj?.brand_name,
      industry_name: payloadObj?.industry_name,
      channel: payloadObj?.channel,
    };

    let url = `${Config.config1.api_link}/ai_data/get-ai-social-profiles`;
    dispatch(
      setLinkedinHandleLoader({
        flag: true,
        key: payloadObj?.key,
      })
    );
    dispatch(
      setTwitterHandleLoader({
        flag: true,
        key: payloadObj?.key,
      })
    );
    axios
      .post(url, body)
      .then((response) => {
        if (
          response ||
          response?.status === 200 ||
          response?.data?.status === "successful"
        ) {
          // console.log(
          //   "get-ai-social-profiles response =>",
          //   response?.data?.data,
          //   "payloadObj",
          //   payloadObj
          // );
          let updatedArray = payloadObj?.sign_up_config?.map((d, index) => {
            if (Number(payloadObj?.key) === index + 1) {
              d.handles = [
                {
                  type: "linkedin",
                  data: response?.data?.data?.[1]?.data,
                },
                {
                  type: "twitter",
                  data: response?.data?.data?.[0]?.data,
                },
              ];
              // d.handles[1].data = response?.data?.data?.[0];
              // d.handles[0].data = response?.data?.data?.[1];
            }
            return d;
          });
          dispatch(setSignUpConfig(updatedArray));
          dispatch(
            setLinkedinHandleLoader({
              flag: false,
              key: null,
            })
          );
          dispatch(
            setTwitterHandleLoader({
              flag: false,
              key: null,
            })
          );
        } else {
          showToast(response?.data?.message, "error");

          dispatch(
            setLinkedinHandleLoader({
              flag: false,
              key: null,
            })
          );
          dispatch(
            setTwitterHandleLoader({
              flag: false,
              key: null,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setLinkedinHandleLoader({
            flag: false,
            key: null,
          })
        );
        dispatch(
          setTwitterHandleLoader({
            flag: false,
            key: null,
          })
        );
        console.log("get-ai-social-profiles API catch error", error);
      });
  };
};
// Create Account API
export const createAccountAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      tmp_token: payloadObj?.tmp_token,
      brand_list: payloadObj?.brand_list,
    };

    let url = `${Config.config1.api_link}/auth/create-account`;
    dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          dispatch(setSignUpLoader(false));
          dispatch(setSignUpStep(5));
          dispatch(setRedirectToDashboard(true));

          localStorage.setItem("p_token", response?.data?.p_token);
          localStorage.removeItem("tmp_token");
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSignUpLoader(false));
        console.log("/auth/create-account API catch error", error);
      });
  };
};
// Create Linkedin Profile API
export const createLinkedinProfileAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      linkedin_url: payloadObj?.linkedin_url,
    };

    let url = `${Config.config1.api_link}/ai_data/verify-linkedin-profile`;
    dispatch(
      setLinkedinHandleLoader({
        flag: true,
        key: payloadObj?.key,
      })
    );
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log("verify-linkedin-profile response =>", response);
          let updatedArray = payloadObj?.sign_up_config?.map((d, index) => {
            if (Number(payloadObj?.key) === index + 1) {
              if (d?.handles?.[0]?.type === payloadObj?.type) {
                let newObj = response?.data?.data?.[0];
                newObj.manual_linkedin_url = true;
                if (
                  d?.handles?.[0]?.data
                    ?.map((d) => d?.username)
                    ?.includes(newObj?.username)
                ) {
                  showToast("This profile already exsists.", "error");
                } else {
                  d.handles[0].data = [...d?.handles?.[0]?.data, newObj];
                }
              }
            }
            return d;
          });
          dispatch(setSignUpConfig(updatedArray));

          dispatch(
            setLinkedinHandleLoader({
              flag: false,
              key: null,
            })
          );
        } else {
          showToast(response?.data?.message, "error");

          dispatch(
            setLinkedinHandleLoader({
              flag: false,
              key: null,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setLinkedinHandleLoader({
            flag: false,
            key: null,
          })
        );
        console.log("verify-linkedin-profile API catch error", error);
      });
  };
};
// Create Twitter Profile API
export const createTwitterProfileAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      twitter_handle: payloadObj?.twitter_handle,
    };

    let url = `${Config.config1.api_link}/ai_data/verify-twitter-profile`;
    dispatch(
      setTwitterHandleLoader({
        flag: true,
        key: payloadObj?.key,
      })
    );
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log(
          //   "verify-twitter-profile response =>",
          //   response,
          //   "payloadObj",
          //   payloadObj
          // );
          let updatedArray = payloadObj?.sign_up_config?.map((d, index) => {
            if (Number(payloadObj?.key) === index + 1) {
              if (d?.handles?.[1]?.type === payloadObj?.type) {
                let newObj = response?.data?.data?.[0];
                newObj.manual_twitter_url = true;
                if (
                  d?.handles?.[1]?.data
                    ?.map((d) => d?.username)
                    ?.includes(newObj?.username)
                ) {
                  showToast("This profile already exsists.", "error");
                } else {
                  d.handles[1].data = [...d?.handles?.[1]?.data, newObj];
                }
              }
            }
            return d;
          });
          dispatch(setSignUpConfig(updatedArray));

          dispatch(
            setTwitterHandleLoader({
              flag: false,
              key: null,
            })
          );
        } else {
          showToast(response?.data?.message, "error");

          dispatch(
            setTwitterHandleLoader({
              flag: false,
              key: null,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setTwitterHandleLoader({
            flag: false,
            key: null,
          })
        );
        console.log("verify-twitter-profile API catch error", error);
      });
  };
};

// Sign In API
export const signInAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      username: payloadObj?.email,
      password: payloadObj?.password,
    };

    let url = `http://localhost:8000/api/login`;
    // let url = `${Config.config1.api_link}/auth/sign-in`;
    dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          console.log("API SUCCESSFUL", response);

          // localStorage.setItem("p_token", response?.data?.p_token);
          // window.location = "/dashboard";
          dispatch(setSignUpLoader(false));
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSignUpLoader(false));
        console.log("auth/sign-in API catch error", error);
      });
  };
};
// Sign In API
export const createUserAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      name: payloadObj?.name,
      email: payloadObj?.email,
      password: payloadObj?.password,
    };

    let url = `http://localhost:8000/api/user`;
    // let url = `${Config.config1.api_link}/auth/sign-in`;
    dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response) {
          console.log("API SUCCESSFUL", response);

          // localStorage.setItem("p_token", response?.data?.p_token);
          // window.location = "/dashboard";
          dispatch(setSignUpLoader(false));
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSignUpLoader(false));
        console.log("auth/sign-in API catch error", error);
      });
  };
};
// Forgot Password Flow / Generate OTP API
export const generateOtpAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      email: payloadObj?.email,
    };

    let url = `${Config.config1.api_link}/auth/generate-otp`;
    dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // localStorage.setItem("p_token", response?.data?.p_token);

          dispatch(setSignUpLoader(false));
          dispatch(setSignInStep(3));
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSignUpLoader(false));
        console.log("auth/sign-in API catch error", error);
      });
  };
};
// Forgot Password Flow / Set Password API
export const setPasswordAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      tmp_token: payloadObj?.tmp_token,
      password: payloadObj?.password,
    };

    let url = `${Config.config1.api_link}/auth/set-password`;
    dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          dispatch(setRedirectToSignIn(true));
          dispatch(setSignInStep(5));
          dispatch(setSignUpLoader(false));
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSignUpLoader(false));
        console.log("set-password API catch error", error);
      });
  };
};

// Change Password Flow / Change Password
export const changePasswordAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      old_password: payloadObj?.old_password,
      new_password: payloadObj?.new_password,
      p_token: payloadObj?.p_token,
    };

    let url = `${Config.config1.api_link}/auth/change-password`;
    dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // localStorage.setItem("p_token", response?.data?.p_token);

          dispatch(setSignUpLoader(false));
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSignUpLoader(false));
        console.log("auth/sign-in API catch error", error);
      });
  };
};
// Change Password Flow / Validate Change Password Otp
export const validateChangePasswordAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      email: payloadObj?.email,
      otp: payloadObj?.otp,
    };

    let url = `${Config.config1.api_link}/auth/validate-change-password-otp`;
    dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // localStorage.setItem("p_token", response?.data?.p_token);

          dispatch(setSignUpLoader(false));
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSignUpLoader(false));
        console.log("auth/validate-change-password-otp API catch error", error);
      });
  };
};

// ============================== Dashboard API ==================================
// Set Feedback for Tool
export const setToolFeedbackAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      module: payloadObj?.module,
      priority: payloadObj?.priority,
      issue_category: payloadObj?.issue_category,
      description: payloadObj?.description,
      image: payloadObj?.image,
    };

    let url = `${Config.config1.api_link}/auth/submit_feedback`;
    // dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // dispatch(setSignUpLoader(false));
          showToast(response?.data?.message, "success");
        } else {
          showToast(response?.data?.message, "error");

          // dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        // dispatch(setSignUpLoader(false));
        console.log("/auth/submit_feedback API catch error", error);
      });
  };
};
// Get Dashboard Tabs Name Name
export const getDashboardTabsNameAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
    };

    let url = `${Config.config1.api_link}/dashboard/get-dashboard-views`;
    dispatch(setDashboardTabsNameLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log(
          //   "get-dashboard-views response",
          //   response,
          //   "payloadObj",
          //   payloadObj
          // );

          let start_date = response?.data?.start_date
            ? response?.data?.start_date
            : null;
          let end_date = response?.data?.end_date
            ? response?.data?.end_date
            : null;

          const DEFAULT_RANGE = [
            {
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            },
          ];

          const now = new Date();
          const selectedEndDate = DEFAULT_RANGE?.[0]?.endDate;

          const mergedEndDate = new Date(
            selectedEndDate.getFullYear(),
            selectedEndDate.getMonth(),
            selectedEndDate.getDate(),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds()
          );

          let startDate = format(
            DEFAULT_RANGE[0].startDate,
            "yyyy-MM-dd HH:mm:ss"
          );
          let endDate = format(mergedEndDate, "yyyy-MM-dd HH:mm:ss");

          let updatedDashboardsData1 = [];
          response?.data?.data?.map((d, index) => {
            let obj = {
              key: index + 1,
              title: d?.dashboard_name,
              duration:
                index === 0
                  ? {
                      start_date: startDate,
                      end_date: endDate,
                    }
                  : {},
              brands: null,
              dashboard_type: d?.dashboard_type,
              dashboard_filters: [],
              selected_theme_data: null,
              selected_cluster_data: null,
              kpi_news: [],
              key_news: [],
              key_news_list: [],
              high_velocity_news: [],
              high_velocity_news_list: [],
              themes_list: [],
              linkedin_news: [],
              linkedin_news_list: [],
              twitter_news: [],
              twitter_news_list: [],
              curated_linkedin_news: [],
              curated_twitter_news: [],
              analytics_sections_level_1: [],
              analytics_sections_level_2: [],
              analytics_sections_level_3: [],
              article_event_summary: null,
              article_event_name_list: [],
              article_data_list: [],
              applied_dashboard_filters: [
                {
                  attribute: "nv_score_range",
                  // values: ["71-100"],
                  values: [],
                },
                {
                  attribute: "key_company",
                  values: [],
                },
                {
                  attribute: "key_people",
                  values: [],
                },
                {
                  attribute: "country",
                  values: [],
                },
                {
                  attribute: "sources",
                  values: [],
                },
                {
                  attribute: "tag",
                  values: [],
                },
                {
                  attribute: "sentiment",
                  values: [],
                },
                {
                  attribute: "sort_by",
                  values: ["Highest NV Score"],
                },
              ],
              deep_dive: [],
            };
            updatedDashboardsData1.push(obj);
          });
          dispatch(setDashboardsData(updatedDashboardsData1));

          dispatch(setDashboardTabsNameList(response?.data?.data));
          dispatch(setDashboardTabsNameLoader(false));
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setDashboardTabsNameLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setDashboardTabsNameLoader(false));
        console.log("/dashboard/get-dashboard-views API catch error", error);
      });
  };
};
// Get Dashboard Brands
export const getDashboardBrandsAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
    };

    let url = `${Config.config1.api_link}/dashboard/brands`;
    // dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (
          response?.data?.status === "successful" ||
          response?.data?.status === "success"
        ) {
          // console.log("Brand response", response);
          // dispatch(setSignUpLoader(false));
          dispatch(setDashboardBrandsList(response?.data?.brands));
        } else {
          showToast(response?.data?.message, "error");

          if (
            response?.data?.message === "User Logged Out" ||
            response?.data?.message === "Session invalidated"
          ) {
            localStorage.removeItem("p_token");
            window.location = "/sign-in";
          }

          // dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        // dispatch(setSignUpLoader(false));
        console.log("brands API catch error", error);
      });
  };
};
// Get Dashboard Data
export const getDashboardDataAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
      brand_list: payloadObj?.brand_list,
      start_date: payloadObj?.start_date,
      end_date: payloadObj?.end_date,
      filters: payloadObj?.filters,
      widget_id: payloadObj?.widget_id,
      dashboard_type: payloadObj?.dashboard_type,
      dashboard_filters: payloadObj?.dashboard_filters,
      offset: payloadObj?.offset,
      rows: payloadObj?.rows,
    };

    let url = `${Config.config1.api_link}/dashboard/dashboard-data`;
    // dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log(
          //   "payloadObj",
          //   payloadObj,
          //   "dashboard-data response",
          //   response
          // );
          if (
            payloadObj?.widget_id === "1.0" ||
            payloadObj?.widget_id === "1.1" ||
            payloadObj?.widget_id === "1.2" ||
            payloadObj?.widget_id === "1.3" ||
            payloadObj?.widget_id === "1.4" ||
            payloadObj?.widget_id === "1.5"
          ) {
            let updatedDashboardsData = payloadObj?.dashboardsData?.map(
              (dashboard, index) => {
                if (dashboard?.dashboard_type === payloadObj?.dashboard_type) {
                  if (payloadObj?.widget_id === "1.0") {
                    dashboard.kpi_news = response?.data?.result?.data?.kpi
                      ? response?.data?.result?.data?.kpi
                      : "No data available";
                  } else if (payloadObj?.widget_id === "1.1") {
                    dashboard.key_news = response?.data?.data
                      ? response?.data?.data
                      : "No data available";
                  } else if (payloadObj?.widget_id === "1.2") {
                    if (payloadObj?.rows === 10) {
                      dashboard.high_velocity_news_list.data = response?.data
                        ?.data
                        ? response?.data?.data
                        : "No data available";
                      dashboard.high_velocity_news_list.no_of_cards =
                        response?.data?.no_of_cards;
                      dashboard.high_velocity_news_list.no_of_pages =
                        response?.data?.no_of_pages;
                    } else {
                      dashboard.high_velocity_news = response?.data?.data
                        ? response?.data?.data
                        : "No data available";
                    }
                  } else if (payloadObj?.widget_id === "1.3") {
                    dashboard.themes_list = response?.data?.data
                      ? response?.data?.data
                      : "No data available";
                  } else if (payloadObj?.widget_id === "1.4") {
                    if (payloadObj?.rows === 10) {
                      dashboard.linkedin_news_list.data = response?.data?.data
                        ? response?.data?.data
                        : "No data available";
                      dashboard.linkedin_news_list.no_of_cards =
                        response?.data?.no_of_cards;
                      dashboard.linkedin_news_list.no_of_pages =
                        response?.data?.no_of_pages;
                    } else {
                      dashboard.linkedin_news = response?.data?.data
                        ? response?.data?.data
                        : "No data available";
                    }
                  } else if (payloadObj?.widget_id === "1.5") {
                    if (payloadObj?.rows === 10) {
                      dashboard.twitter_news_list.data = response?.data?.data
                        ? response?.data?.data
                        : "No data available";
                      dashboard.twitter_news_list.no_of_cards =
                        response?.data?.no_of_cards;
                      dashboard.twitter_news_list.no_of_pages =
                        response?.data?.no_of_pages;
                    } else {
                      dashboard.twitter_news = response?.data?.data
                        ? response?.data?.data
                        : "No data available";
                    }
                  }
                }
                return dashboard;
              }
            );
            // console.log("updatedDashboardsData", updatedDashboardsData);
            dispatch(setDashboardsData(updatedDashboardsData));
            // dispatch(setSignUpLoader(false));
          } else if (payloadObj?.widget_id === "2.1") {
            let updatedDashboardsData = payloadObj?.dashboardsData?.map(
              (dashboard, index) => {
                if (dashboard?.dashboard_type === payloadObj?.dashboard_type) {
                  if (payloadObj?.widget_id === "2.1") {
                    dashboard.key_news_list.data = response?.data?.data
                      ? response?.data?.data
                      : "No data available";
                    dashboard.key_news_list.no_of_cards =
                      response?.data?.no_of_cards;
                    dashboard.key_news_list.no_of_pages =
                      response?.data?.no_of_pages;
                  }
                }
                return dashboard;
              }
            );
            // console.log("updatedDashboardsData", updatedDashboardsData);
            dispatch(setDashboardsData(updatedDashboardsData));
            // dispatch(setSignUpLoader(false));
          } else if (payloadObj?.widget_id === "3.1") {
            let updatedDashboardsData = payloadObj?.dashboardsData?.map(
              (dashboard, index) => {
                if (dashboard?.dashboard_type === payloadObj?.dashboard_type) {
                  if (payloadObj?.widget_id === "3.1") {
                    dashboard.article_event_name_list = response?.data?.data
                      ? response?.data?.data
                      : "No data available";
                  }
                }
                return dashboard;
              }
            );
            // console.log("updatedDashboardsData", updatedDashboardsData);
            dispatch(setDashboardsData(updatedDashboardsData));
            // dispatch(setSignUpLoader(false));
          } else if (payloadObj?.widget_id === "3.2") {
            let updatedDashboardsData = payloadObj?.dashboardsData?.map(
              (dashboard, index) => {
                if (dashboard?.dashboard_type === payloadObj?.dashboard_type) {
                  if (payloadObj?.widget_id === "3.2") {
                    dashboard.article_event_summary = response?.data?.data
                      ? response?.data?.data
                      : "No data available";
                  }
                }
                return dashboard;
              }
            );
            // console.log("updatedDashboardsData", updatedDashboardsData);
            dispatch(setDashboardsData(updatedDashboardsData));
            // dispatch(setSignUpLoader(false));
          } else if (payloadObj?.widget_id === "3.3") {
            let updatedDashboardsData = payloadObj?.dashboardsData?.map(
              (dashboard, index) => {
                if (dashboard?.dashboard_type === payloadObj?.dashboard_type) {
                  if (payloadObj?.widget_id === "3.3") {
                    dashboard.article_data_list.data = response?.data?.data
                      ? response?.data?.data
                      : "No data available";
                    dashboard.article_data_list.no_of_cards =
                      response?.data?.no_of_cards;
                    dashboard.article_data_list.no_of_pages =
                      response?.data?.no_of_pages;
                  }
                }
                return dashboard;
              }
            );
            // console.log("updatedDashboardsData", updatedDashboardsData);
            dispatch(setDashboardsData(updatedDashboardsData));
            // dispatch(setSignUpLoader(false));
          }
        } else {
          // showToast(response?.data?.message, "error");
          // dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        // dispatch(setSignUpLoader(false));
        console.log("dashboard-data API catch error", error);
      });
  };
};
// Set Dashboard Actions
export const setDashboardActionsAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
      action_type: payloadObj?.action_type,
      action_value: payloadObj?.action_value,
      cluster_key: payloadObj?.ai_cluster_key,
    };

    let url = `${Config.config1.api_link}/dashboard/actions`;
    axios
      .post(url, body)
      .then((response) => {
        if (
          response?.data?.status === "successful" ||
          response?.data?.status === "success"
        ) {
          // console.log("INSIDE =>", payloadObj, "RESPONSE =>", response);

          let obj = {
            p_token: payloadObj?.p_token,
            brand_list: payloadObj?.brand_list,
            start_date: payloadObj?.start_date,
            end_date: payloadObj?.end_date,
            filters: payloadObj?.filters,
            widget_id: "1.1",
            dashboard_type: payloadObj?.dashboard_type,
            dashboardsData: payloadObj?.dashboardsData,
            offset: payloadObj?.offset,
            dashboard_filters: payloadObj?.dashboard_filters,
          };
          dispatch(getDashboardDataAPI(obj));
          showToast(response?.data?.message, "success");
        } else {
          showToast(response?.data?.message, "error");
        }
      })
      .catch((error) => {
        console.log("dashboard/actions API catch error", error);
      });
  };
};
// Get Dashboard Data
export const getDashboardFiltersAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
      brand_list: payloadObj?.brand_list,
      start_date: payloadObj?.start_date,
      end_date: payloadObj?.end_date,
      filters: payloadObj?.filters,
      widget_id: payloadObj?.widget_id,
      dashboard_type: payloadObj?.dashboard_type,
      dashboard_filters: payloadObj?.dashboard_filters,
      offset: payloadObj?.offset,
    };

    let url = `${Config.config1.api_link}/dashboard/get-filters`;
    // dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log(
          //   "payloadObj",
          //   payloadObj,
          //   "get filters response",
          //   response?.data?.filters
          // );
          let updatedDashboardsData = payloadObj?.dashboardsData?.map(
            (dashboard, index) => {
              if (dashboard?.dashboard_type === payloadObj?.dashboard_type) {
                dashboard.dashboard_filters = response?.data?.filters;
              }
              return dashboard;
            }
          );
          // console.log("updatedDashboardsData", updatedDashboardsData);
          dispatch(setDashboardsData(updatedDashboardsData));

          // dispatch(setSignUpLoader(false));
        } else {
          showToast(response?.data?.message, "error");

          // dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        // dispatch(setSignUpLoader(false));
        console.log("get-filters API catch error", error);
      });
  };
};

// Dashboard Template Fetch API
export const getDashboardAnalyticsTemplateFetchAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
      dashboard_type: payloadObj?.dashboard_type?.toString(),
      deep_dive_level: payloadObj?.deep_dive_level,
    };

    let url = `${Config.config1.api_link}/analytics/template/fetch`;
    dispatch(setTemplateLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log(
          //   "payloadObj",
          //   payloadObj,
          //   "analytics/template/fetch response",
          //   response
          // );

          // Update the dashboard data with the response
          let updatedDashboardsData = payloadObj?.dashboardsData?.map(
            (dashboard, index) => {
              if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "1"
              ) {
                dashboard.analytics_sections_level_1 =
                  response?.data?.result?.sections;
              } else if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "2"
              ) {
                dashboard.analytics_sections_level_2 =
                  response?.data?.result?.sections;
              } else if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "3"
              ) {
                dashboard.analytics_sections_level_3 =
                  response?.data?.result?.sections;
              }
              return dashboard;
            }
          );
          dispatch(setDashboardsData(updatedDashboardsData));

          // Section Fetch API
          let sectionFetchPayloadObj = {
            p_token: payloadObj?.p_token ? payloadObj?.p_token : null,
            section_id: response?.data?.result?.sections?.[0]?.section_id,
            dashboard_type: payloadObj?.dashboard_type,
            deep_dive_level: payloadObj?.deep_dive_level,
            dashboardsData: updatedDashboardsData,
            start_date: payloadObj?.start_date,
            end_date: payloadObj?.end_date,
            brand_list: payloadObj?.brand_list,
            dashboard_filters: payloadObj?.dashboard_filters,
          };
          dispatch(
            getDashboardAnalyticsSectionFetchAPI(sectionFetchPayloadObj)
          );

          dispatch(setTemplateLoader(false));
        } else {
          showToast(response?.data?.message, "error");
          dispatch(setTemplateLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setTemplateLoader(false));
        console.log("analytics/template/fetch API catch error", error);
      });
  };
};
// Dashboard Template Fetch API
export const getDashboardAnalyticsSectionFetchAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
      dashboard_type: payloadObj?.dashboard_type.toString(),
      deep_dive_level: payloadObj?.deep_dive_level,
      section_id: payloadObj?.section_id,
    };

    let url = `${Config.config1.api_link}/analytics/section/fetch`;
    dispatch(setSectionLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log(
          //   "payloadObj",
          //   payloadObj,
          //   "analytics/section/fetch response",
          //   response
          // );

          let updatedDashboardsData = payloadObj?.dashboardsData?.map(
            (dashboard, index) => {
              if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "1"
              ) {
                dashboard?.analytics_sections_level_1?.map((sec) => {
                  if (sec?.section_id == payloadObj?.section_id) {
                    sec.widgets = response?.data?.result?.widgets;
                  }
                  return sec;
                });
              } else if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "2"
              ) {
                dashboard?.analytics_sections_level_2?.map((sec) => {
                  if (sec?.section_id == payloadObj?.section_id) {
                    sec.widgets = response?.data?.result?.widgets;
                  }
                  return sec;
                });
              } else if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "3"
              ) {
                dashboard?.analytics_sections_level_3?.map((sec) => {
                  if (sec?.section_id == payloadObj?.section_id) {
                    sec.widgets = response?.data?.result?.widgets;
                  }
                  return sec;
                });
              }
              return dashboard;
            }
          );
          dispatch(setDashboardsData(updatedDashboardsData));

          // Internal Chart API
          response?.data?.result?.widgets?.map((wid) => {
            let chartPayloadObj = {
              p_token: payloadObj?.p_token ? payloadObj?.p_token : null,
              dashboard_type: payloadObj?.dashboard_type,
              deep_dive_level: payloadObj?.deep_dive_level,
              section_id: payloadObj?.section_id,
              dashboardsData: payloadObj?.dashboardsData,

              brand_list: payloadObj?.brand_list,
              filters: wid?.filters,
              x_axis: wid?.x_axis,
              y_axes: wid?.y_axes,
              y_series: wid?.y_series,
              brand_groups: wid?.brand_groups ? wid?.brand_groups : null,
              comp_brand_list: wid?.comp_brand_list
                ? wid?.comp_brand_list
                : null,
              start_date: payloadObj?.start_date,
              end_date: payloadObj?.end_date,
              widget_name: wid?.widget_name,
              widget_id: wid?.widget_id,
              chart: wid?.chart,
              order_by: wid?.order_by ? wid?.order_by : null,
              utcoffset: wid?.utcoffset ? wid?.utcoffset : -330,
              filter_by_data: wid?.filter_by_data ? wid?.filter_by_data : [],
              filter_by: wid?.filter_by ? wid?.filter_by : null,
              exclude_words: wid?.exclude_words,
              theme_type: wid?.theme_type ? wid?.theme_type : "0",
              offset: wid?.offset ? wid?.offset : 0,
              dashboard_filters: payloadObj?.dashboard_filters,
            };
            dispatch(getDashboardAnalyticsChartAPI(chartPayloadObj));
          });

          dispatch(setSectionLoader(false));
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setSectionLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSectionLoader(false));
        console.log("analytics/section/fetch API catch error", error);
      });
  };
};
// Dashboard Internal Chart API
export const getDashboardAnalyticsChartAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
      brand_list: payloadObj?.brand_list,
      filters: payloadObj?.filters,
      x_axis: payloadObj?.x_axis,
      y_axes: payloadObj?.y_axes,
      y_series: payloadObj?.y_series,
      brand_groups: payloadObj?.brand_groups,
      comp_brand_list: payloadObj?.comp_brand_list,
      start_date: payloadObj?.start_date,
      end_date: payloadObj?.end_date,
      widget_name: payloadObj?.widget_name,
      widget_id: payloadObj?.widget_id,
      chart: payloadObj?.chart,
      order_by: payloadObj?.order_by,
      utcoffset: payloadObj?.utcoffset,
      filter_by_data: payloadObj?.filter_by_data,
      filter_by: payloadObj?.filter_by,
      exclude_words: payloadObj?.exclude_words,
      theme_type: payloadObj?.theme_type,
      offset: payloadObj?.offset,
      dashboard_filters: payloadObj?.dashboard_filters,
    };

    let url = `${Config.config1.api_link}/analytics/internal-chart`;
    // dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log(
          //   "payloadObj",
          //   payloadObj,
          //   "internal-chart response",
          //   response
          // );

          let updatedDashboardsData = payloadObj?.dashboardsData?.map(
            (dashboard, index) => {
              if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "1"
              ) {
                dashboard?.analytics_sections_level_1?.map((sec) => {
                  if (sec?.section_id == payloadObj?.section_id) {
                    sec?.widgets?.map((wid) => {
                      if (wid?.widget_id === payloadObj?.widget_id) {
                        wid.graphData = response?.data?.result;
                      }
                      return wid;
                    });
                  }
                  return sec;
                });
              } else if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "2"
              ) {
                dashboard?.analytics_sections_level_2?.map((sec) => {
                  if (sec?.section_id == payloadObj?.section_id) {
                    sec?.widgets?.map((wid) => {
                      if (wid?.widget_id === payloadObj?.widget_id) {
                        wid.graphData = response?.data?.result;
                      }
                      return wid;
                    });
                  }
                  return sec;
                });
              } else if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "3"
              ) {
                dashboard?.analytics_sections_level_3?.map((sec) => {
                  if (sec?.section_id == payloadObj?.section_id) {
                    sec?.widgets?.map((wid) => {
                      if (wid?.widget_id === payloadObj?.widget_id) {
                        wid.graphData = response?.data?.result;
                      }
                      return wid;
                    });
                  }
                  return sec;
                });
              }
              return dashboard;
            }
          );
          dispatch(setDashboardsData(updatedDashboardsData));

          // dispatch(setSignUpLoader(false));
        } else {
          let updatedDashboardsData = payloadObj?.dashboardsData?.map(
            (dashboard, index) => {
              if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "1"
              ) {
                dashboard?.analytics_sections_level_1?.map((sec) => {
                  if (sec?.section_id == payloadObj?.section_id) {
                    sec?.widgets?.map((wid) => {
                      if (wid?.widget_id === payloadObj?.widget_id) {
                        wid.graphData = "No Data Found";
                      }
                      return wid;
                    });
                  }
                  return sec;
                });
              } else if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "2"
              ) {
                dashboard?.analytics_sections_level_2?.map((sec) => {
                  if (sec?.section_id == payloadObj?.section_id) {
                    sec?.widgets?.map((wid) => {
                      if (wid?.widget_id === payloadObj?.widget_id) {
                        wid.graphData = "No Data Found";
                      }
                      return wid;
                    });
                  }
                  return sec;
                });
              } else if (
                dashboard?.dashboard_type == payloadObj?.dashboard_type &&
                payloadObj?.deep_dive_level === "3"
              ) {
                dashboard?.analytics_sections_level_3?.map((sec) => {
                  if (sec?.section_id == payloadObj?.section_id) {
                    sec?.widgets?.map((wid) => {
                      if (wid?.widget_id === payloadObj?.widget_id) {
                        wid.graphData = "No Data Found";
                      }
                      return wid;
                    });
                  }
                  return sec;
                });
              }
              return dashboard;
            }
          );
          dispatch(setDashboardsData(updatedDashboardsData));

          // showToast(response?.data?.message, "error");
          // dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        // dispatch(setSignUpLoader(false));
        console.log("analytics/chart API catch error", error);
      });
  };
};
// Dashboard Template Fetch API
export const getDashboardAnalyticsDeepDiveAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
      start_date: payloadObj?.start_date,
      end_date: payloadObj?.end_date,
      brand_list: payloadObj?.brand_list,
      brand_groups: null,
      comp_brand_list: null,
      filters: payloadObj?.filters,
      deep_dive_on: payloadObj?.deep_dive_on,
      filter_by: payloadObj?.filter_by,
      utcoffset: payloadObj?.utcoffset,
      offset: payloadObj?.offset ? payloadObj?.offset : 0,
    };

    let url = `${Config.config1.api_link}/analytics/deep-dive`;
    // dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log(
          //   "payloadObj =>",
          //   payloadObj,
          //   "deep-dive response =>",
          //   response
          // );

          let updatedDashboardsData = payloadObj?.dashboardsData?.map(
            (d, index) => {
              if (d?.dashboard_type === payloadObj?.dashboard_type) {
                d.deep_dive.data = response?.data?.data
                  ? response?.data?.data
                  : "No data available";
                d.deep_dive.no_of_cards = response?.data?.no_of_cards;
                d.deep_dive.no_of_pages = response?.data?.no_of_pages;
                d.deep_dive.widget_id = response?.data?.widget_id;
                d.deep_dive.payload = payloadObj;
              }
              return d;
            }
          );
          dispatch(setDashboardsData(updatedDashboardsData));

          // dispatch(setSignUpLoader(false));
        } else {
          let updatedDashboardsData = payloadObj?.dashboardsData?.map(
            (d, index) => {
              if (d?.dashboard_type === payloadObj?.dashboard_type) {
                d.deep_dive.data = "No data available";
                d.deep_dive.no_of_cards = null;
                d.deep_dive.no_of_pages = null;
                d.deep_dive.widget_id = null;
                d.deep_dive.payload = null;
              }
              return d;
            }
          );
          dispatch(setDashboardsData(updatedDashboardsData));

          // dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        // dispatch(setSignUpLoader(false));
        console.log("analytics/deep-dive API catch error", error);
      });
  };
};

// Get Users Account Settings API
export const getUsersAccountSettingsAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
    };

    let url = `${Config.config1.api_link}/settings/fetch`;
    // dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log(
          //   "payloadObj",
          //   payloadObj,
          //   "settings/fetch",
          //   response?.data?.result
          // );

          let newObj = {
            data_source: response?.data?.result?.brand_list,
            sign_up_config: response?.data?.result?.all_brands_list,
          };
          dispatch(setAccountSettingsData(newObj));
          // dispatch(setSignUpLoader(false));
        } else {
          dispatch(setAccountSettingsData([]));
          // dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        // dispatch(setSignUpLoader(false));
        console.log("settings/fetch API catch error", error);
      });
  };
};
// Update Account Settings API
export const updateAccountSettingsAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
      brand_list: payloadObj?.brand_list,
    };

    let url = `${Config.config1.api_link}/settings/update`;
    dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          // console.log(
          //   "payloadObj",
          //   payloadObj,
          //   "settings/update response",
          //   response
          // );

          showToast(response?.data?.result?.message, "success");
          dispatch(setSignUpLoader(false));
        } else {
          showToast(response?.data?.message, "error");
          dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSignUpLoader(false));
        console.log("/settings/update API catch error", error);
      });
  };
};
// Delete Account Settings Brand API
export const deleteAccountSettingsBrandAPI = (payloadObj) => {
  return async (dispatch) => {
    let body = {
      p_token: payloadObj?.p_token,
      brand_list: payloadObj?.brand_list,
    };

    let url = `${Config.config1.api_link}/settings/delete-brand`;
    dispatch(setSignUpLoader(true));
    axios
      .post(url, body)
      .then((response) => {
        if (response?.data?.status === "successful") {
          dispatch(setSignUpLoader(false));
          dispatch(setSignUpStep(5));
          dispatch(setRedirectToDashboard(true));

          localStorage.setItem("p_token", response?.data?.p_token);
          localStorage.removeItem("tmp_token");
        } else {
          showToast(response?.data?.message, "error");

          dispatch(setSignUpLoader(false));
        }
      })
      .catch((error) => {
        dispatch(setSignUpLoader(false));
        console.log("/auth/create-account API catch error", error);
      });
  };
};
