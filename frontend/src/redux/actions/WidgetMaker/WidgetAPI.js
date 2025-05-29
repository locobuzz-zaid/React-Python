// import axios from "axios";
// import Config from "../../../config";
// import {
//   sessionExpired,
//   callNotification,
//   errorCode,
//   getFilterPanelData,
//   getCustomizedDate,
//   getUTCOffset,
//   deepCopy,
//   getDuplicateWidgets,
//   addDashboardCalledApiList,
//   deleteDashboardCalledApiList,
//   clearHighChartopData,
//   getSimilarStaticFilter,
//   getWindowLocationPath,
//   formatQuickFilters,
//   API_RETRY_LIMIT,
// } from "../../constants";
// import { setOptionHighChart } from "../HighChart";
// import {
//   setCardSettingsData,
//   setWidgetMakerDataSource,
//   setX_attribute,
// } from "./GraphConfig";
// import { setFilterPanelData } from "../Filter";
// import { setEditWidget, setFilterLoader, setWidgetShow } from "./WidgetLibrary";
// import moment from "moment";
// import uuid from "react-uuid";
// import {
//   setAddSection,
//   setClearTemplateWidgetGraphData,
//   setTemplateDetails,
//   setTemplateWidgetData,
// } from "../section/section";
// import {
//   setCampaignDate,
//   setClearGraphData,
//   setClearWidgetGraphData,
//   setDashboardCalledApiList,
//   setDeepDiveData,
//   setGlobalFilter,
//   setIsAccessType,
//   setPaneBrands,
//   setPaneDuration,
//   setPaneOffset,
//   setTemplateInPane,
//   setWidgetGraphData,
// } from "../dashboard/Tab1";
// import {
//   getProfileFilterList,
//   setGraphConditionLoader,
//   setGraphLoader,
//   setProfileLoader,
//   setTrendsLoader,
// } from "../ApiCall";
// import {
//   setFetchSectionData,
//   setGlobalLoader,
//   setSectionLoader,
//   setWidgetLoader,
// } from "../ApiCall/apiCall";
// import { setErrorCode } from "../Workspace";
// import { setIsDuplicate } from "./WidgetMaker";
// import {
//   setDeepDiveInfoLoader,
//   setDeepDiveWidgetLoaders,
//   setMentionPageData,
//   setMentionPageInnerTabs,
//   setMentionTabsNews,
// } from "../DeepDive";
// import {
//   setChannelImage,
//   setProfileImage,
//   setSelectProfileId,
// } from "../Template";
// import { setReachRefreshTime } from "../Attribute";
// import { setScheduleQuickFilter } from "../scheduleReport/scheduleReport";
// import { getScreenDeepDiveData } from "../commandCenter/commandCenterApi";

// var urlParams; // url encrypted parameters

// //Function to get url params from URL and set it to urlParams variable
// (window.onpopstate = function () {
//   var match,
//     pl = /\+/g, // Regex for replacing addition symbol with a space
//     search = /([^&=]+)=?([^&]*)/g,
//     decode = function (s) {
//       return decodeURIComponent(s.replace(pl, " "));
//     },
//     query = window.location.search.substring(1);

//   urlParams = {};
//   while ((match = search.exec(query)))
//     urlParams[decode(match[1])] = decode(match[2]);
// })();

// var urlParams; // url encrypted parameters

// //Function to get url params from URL and set it to urlParams variable
// (window.onpopstate = function () {
//   var match,
//     pl = /\+/g, // Regex for replacing addition symbol with a space
//     search = /([^&=]+)=?([^&]*)/g,
//     decode = function (s) {
//       return decodeURIComponent(s.replace(pl, " "));
//     },
//     query = window.location.search.substring(1);

//   urlParams = {};
//   while ((match = search.exec(query)))
//     urlParams[decode(match[1])] = decode(match[2]);
// })();

// var urlParams; // url encrypted parameters

// //Function to get url params from URL and set it to urlParams variable
// (window.onpopstate = function () {
//   var match,
//     pl = /\+/g, // Regex for replacing addition symbol with a space
//     search = /([^&=]+)=?([^&]*)/g,
//     decode = function (s) {
//       return decodeURIComponent(s.replace(pl, " "));
//     },
//     query = window.location.search.substring(1);

//   urlParams = {};
//   while ((match = search.exec(query)))
//     urlParams[decode(match[1])] = decode(match[2]);
// })();

// //api call to set FIlter widget Library data
// export const setFilterWidgetLibrary = (attrWidget) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (attrWidget?.authParams) {
//       let body = {
//         ptoken: attrWidget?.authParams?.ptoken,
//         utcoffset: getUTCOffset(),
//         attributes: attrWidget?.attributes,
//         chart_type: attrWidget?.chart_type,
//       };
//       let url = `${Config.config1.api_link}/widget-maker/filter`;
//       dispatch(setWidgetLibraryFilterLoader(true));
//       await axios
//         .post(url, body)
//         .then((response) => {
//           dispatch(setWidgetLibraryFilterLoader(false));
//           if (response?.data?.status === "successful") {
//             dispatch({ type: "SET_FILTER_WIDGET_LIBRARY", payload: response });
//           }
//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           dispatch(setWidgetLibraryFilterLoader(false));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_FILTER_WIDGET_LIBRARY", payload: null });
//     }
//   };
// };

// export const setWidgetMakerListLoader = (value) => {
//   return { type: "SET_WIDGET_MAKER_LIST_LOADER", payload: value };
// };

// //api call to set widget Library config data
// export const setWidgetLibraryConfiguration = (widgetLibraryObject) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (widgetLibraryObject?.authParams) {
//       let body = {
//         ptoken: widgetLibraryObject?.authParams?.ptoken,
//         utcoffset: getUTCOffset(),
//       };
//       dispatch(setWidgetMakerListLoader(true));
//       let url = `${Config.config1.api_link}/widget-maker/list`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch({ type: "SET_WIDGET_LIBRARY_LIST", payload: response });
//           dispatch(setWidgetMakerListLoader(false));
//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           dispatch(setWidgetMakerListLoader(false));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_WIDGET_LIBRARY_LIST", payload: null });
//     }
//   };
// };

// export const setWidgetLibraryList = (widgetLibraryObject) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (widgetLibraryObject?.authParams) {
//       let body = {
//         ptoken: widgetLibraryObject?.authParams?.ptoken,
//         utcoffset: getUTCOffset(),
//         filter: {
//           search_text: widgetLibraryObject?.search_text,
//           pill: widgetLibraryObject?.pill,
//           offset: widgetLibraryObject?.offset,
//           no_of_rows: widgetLibraryObject?.no_of_rows,
//           sort_expression: widgetLibraryObject?.sort_expression,
//           sort_order: widgetLibraryObject?.sort_order,
//           chart_type: widgetLibraryObject?.chart_type,
//           attribute: widgetLibraryObject?.attribute,
//           type: widgetLibraryObject?.type,
//         },
//       };
//       dispatch(setWidgetLibraryFilterLoader(true));
//       let url = `${Config.config1.api_link}/widget-maker/widget-list`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           if (response?.data?.status === "successful") {
//             dispatch({ type: "SET_WIDGET_LIBRARY_LIST", payload: response });
//             dispatch(setWidgetLibraryFilterLoader(false));
//           }
//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           dispatch(setWidgetLibraryFilterLoader(false));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_WIDGET_LIBRARY_LIST", payload: null });
//     }
//   };
// };

// export const setWidgetLibraryDuplicate = (
//   widgetLibraryduplicat,
//   widgetLibraryupdated
// ) => {
//   let errorMessage;
//   let brands = widgetLibraryduplicat?.brands?.columns
//     ? widgetLibraryduplicat?.brands?.columns
//     : widgetLibraryduplicat?.brands;

//   let single_brands = [];
//   let brandsGroupName = [];

//   if (!widgetLibraryduplicat?.isBrandModified) {
//     brandsGroupName =
//       brands && brands?.[0]?.brand_list
//         ? [
//             {
//               brand_group_name: brands?.[0]?.brand_group_name,
//             },
//           ]
//         : single_brands?.push({
//             brand_id: brands && brands?.[0]?.brand_id && brands?.[0]?.brand_id,
//             brand_name:
//               brands && brands?.[0]?.brand_name && brands?.[0]?.brand_name,
//           });
//   } else {
//     if (brands && brands?.[0]?.competitor) {
//       single_brands.push({
//         brand_id: brands?.[0]?.name,
//         brand_name: brands?.[0]?.brand_name,
//       });
//     } else {
//       brands &&
//         brands?.forEach((el) => {
//           if (el?.group || el?.brand_group_name) {
//             brandsGroupName.push({
//               brand_group_name: el?.brand_group_name,
//             });
//           }
//         });

//       brands?.forEach((el) => {
//         if (!el?.group) {
//           single_brands.push({
//             brand_id: el?.brand_id ? el?.brand_id : el?.name,
//             brand_name: el?.brand_name
//               ? el?.brand_name
//               : el?.brand_friendly_name,
//           });
//         }
//       });
//     }
//   }
//   return async (dispatch) => {
//     if (widgetLibraryduplicat?.authParams) {
//       let body = {
//         ptoken: widgetLibraryduplicat?.authParams?.ptoken,
//         utcoffset: getUTCOffset(),
//         widget_id: widgetLibraryduplicat?.widget_id,
//         predefined: widgetLibraryduplicat?.predefined ? true : false,
//         brand_groups: widgetLibraryduplicat?.predefined
//           ? brandsGroupName?.length > 0
//             ? brandsGroupName
//             : null
//           : null,
//         comp_brand_list: widgetLibraryduplicat?.predefined
//           ? brands && brands?.[0]?.competitor
//             ? brands?.[0]?.competitorList
//             : null
//           : null,
//         brand_list: widgetLibraryduplicat?.predefined
//           ? single_brands && single_brands?.[0]?.brand_id
//             ? single_brands
//             : null
//           : null,
//         start_date: widgetLibraryduplicat?.predefined
//           ? widgetLibraryduplicat?.duration?.from
//           : null,
//         end_date: widgetLibraryduplicat?.predefined
//           ? widgetLibraryduplicat?.duration?.to
//           : null,
//       };
//       let url = `${Config.config1.api_link}/widget-maker/widget/duplicate`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch({ type: "SET_WIDGET_LIBRARY_DUPLICATE", payload: response });

//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           } else if (response?.data?.status === "successful") {
//             dispatch(
//               setWidgetPreview(
//                 widgetLibraryduplicat?.authParams,
//                 response?.data?.result?.widget_id,
//                 getUTCOffset()
//               )
//             );
//             dispatch(
//               setIsDuplicate({
//                 redirect: true,
//                 widget_id: response?.data?.result?.widget_id,
//               })
//             );
//             dispatch(setWidgetLibraryList(widgetLibraryupdated));
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_WIDGET_LIBRARY_DUPLICATE", payload: null });
//     }
//   };
// };

// //api call to set widget Library Delete data
// export const setWidgetLibraryDelete = (
//   widgetLibraryObject,
//   widgetLibraryupdated
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let body = {
//       ptoken: widgetLibraryObject?.authParams?.ptoken,
//       utcoffset: getUTCOffset(),
//       widget_id_list: widgetLibraryObject?.widget_id,
//     };
//     let url = `${Config.config1.api_link}/widget-maker/widget/delete`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_DELETE_WIDGET_LIBRARY",
//           payload: response,
//         });
//         if (response?.data?.status === "error") {
//           errorCode?.map((el, i) => {
//             return el.key === response?.data?.error_code
//               ? (errorMessage = el.value)
//               : null;
//           });
//           errorMessage = errorMessage ? errorMessage : "Widget deletion failed";

//           callNotification(errorMessage, "error");
//           if (response?.data?.error_code === 9) {
//             sessionExpired(true);
//           }
//         } else if (response?.data?.status === "successful") {
//           callNotification("Widget deleted successfully!", "success");
//           dispatch(setWidgetLibraryList(widgetLibraryupdated));

//           dispatch(setFilterWidgetLibrary(null));
//         }
//       })
//       .catch((error) => {
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// //api call to set widget maker config data
// export const setWidgetMakerConfiguration = (
//   authParams,
//   obj,
//   count,
//   All_WM_attributes
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken && authParams?.ptoken,
//       };
//       // let url = `${Config.config1.api_link}/widget-maker/configuration/${
//       //   obj?.value === "mentions" ? "mentions" : "page"
//       // }`;
//       let url = `${Config.config1.api_link}/configuration/v2/fetch`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           if (authParams && authParams?.category_id) {
//             // let WM_attributes = {};
//             // Object.entries(response?.data?.result?.schema?.mentions).forEach(
//             //   (el) => {
//             //     WM_attributes = {
//             //       ...WM_attributes,
//             //       [el[0]]: Object.entries(el[1].members),
//             //     };
//             //   }
//             // );
//             // let attributesList = {};
//             // Object.entries(response?.data?.result?.schema?.mentions)?.forEach(
//             //   (el) => {
//             //     Object.entries(el[1].members)?.forEach((e) => {
//             //       attributesList = { ...attributesList, [e[0]]: e[1].title };
//             //     });
//             //   }
//             // );
//           }

//           let attributesList = {};
//           Object.entries(response?.data?.result?.schema)?.forEach(
//             (data_source) => {
//               Object.entries(data_source?.[1])?.forEach((el) => {
//                 Object.entries(el?.[1]?.members)?.forEach((e) => {
//                   attributesList = {
//                     ...obj?.attributesList,
//                     ...attributesList,
//                     [e[0]]: e?.[1]?.title,
//                   };
//                 });
//               });
//             }
//           );
//           dispatch({
//             type: "SET_All_WM_ATTRIBUTES",
//             payload: attributesList,
//           });

//           let filterPanelData = getFilterPanelData(response.data);
//           dispatch(setFilterPanelData(filterPanelData));
//           let response_obj = {
//             mentions:
//               obj?.value === "mentions" ? response : obj?.mention_response,
//             page: obj?.value === "page" ? response : null,
//           };
//           dispatch({
//             type: "SET_CONFIGURATION",
//             payload: response?.data?.result?.schema,
//           });

//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_CONFIGURATION", payload: null });
//     }
//   };
// };

// export const setWidgetMakerGraphConditionConfiguration = (
//   authParams,
//   count
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setGraphConditionLoader(true));
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken && authParams?.ptoken,
//         share_id: urlParams?.share_id,
//       };
//       let url = `${Config.config1.api_link}/configuration/graph-conditions`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch(setGraphConditionLoader(false));

//           dispatch({
//             type: "SET_GRAPH_CONDITIONS_CONFIGURATION_DATA",
//             payload: response?.data[`pivot-grid`]?.y_axes?.include,
//           });
//           dispatch({
//             type: "SET_PROLIFIC_FILTERS",
//             payload: response?.data[`prolific-user`]?.filters?.include,
//           });
//           dispatch({
//             type: "SET_GRAPH_CONDITIONS",
//             payload: response?.data,
//           });

//           if (response?.data?.status === "error") {
//             dispatch(setGraphConditionLoader(false));
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               !count &&
//                 dispatch(
//                   setWidgetMakerGraphConditionConfiguration(authParams, 1)
//                 );
//               if (count) {
//                 sessionExpired(true);
//               }
//             }
//           }
//         })
//         .catch((error) => {
//           dispatch(setGraphConditionLoader(false));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({
//         type: "SET_GRAPH_CONDITIONS_CONFIGURATION_DATA",
//         payload: null,
//       });
//     }
//   };
// };

// //api call to set support attribute data
// export const setWidgetMakerSupportAttributes = (
//   authParams,
//   x_axis_ttribute
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         attribute: x_axis_ttribute !== "New Worksheet" ? x_axis_ttribute : null,
//       };
//       let url = `${Config.config1.api_link}/widget-maker/configuration/support-attrs`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch({ type: "SET_SUPPORT_ATTRIBUTES", payload: response });

//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_SUPPORT_ATTRIBUTES", payload: null });
//     }
//   };
// };

// //api call to set search filters data
// export const setSearchFilter = (
//   authParams,
//   axisPanelAtt,
//   searchTerm,
//   filterData,
//   graphObject
// ) => {
//   let errorMessage;
//   let brands =
//     graphObject?.brands?.columns && !authParams?.screen_id
//       ? graphObject?.panes[graphObject?.index]?.predefined &&
//         graphObject?.panes[graphObject?.index]?.template_type === "ticket" &&
//         !Array.isArray(graphObject?.brands?.columns)
//         ? [graphObject?.brands?.columns]
//         : graphObject?.brands?.columns
//       : graphObject?.brands?.columns
//       ? !Array.isArray(graphObject?.brands?.columns)
//         ? [graphObject?.brands?.columns]
//         : graphObject?.brands?.columns
//       : graphObject?.brands && !Array.isArray(graphObject?.brands)
//       ? [graphObject?.brands]
//       : graphObject?.brands;
//   let share_brands = graphObject?.brand_list?.columns
//     ? graphObject?.brand_list?.columns
//     : Array.isArray(graphObject?.brand_list)
//     ? graphObject?.brand_list
//     : graphObject?.brand_list?.selected_brand_groups?.length
//     ? graphObject?.brand_list?.selected_brand_groups
//     : graphObject?.brand_list?.selected_brand_ids;
//   let single_brands = [];
//   let brandsGroupName = [];

//   if (graphObject?.shareBrands) {
//     let obj = getShareDefaultBrands(graphObject, share_brands);
//     if (obj?.single_brands) single_brands = obj?.single_brands;
//     if (obj?.brandsGroupName) brandsGroupName = obj?.brandsGroupName;
//   } else {
//     if (!graphObject?.isBrandModified) {
//       brandsGroupName =
//         brands && brands?.[0]?.brand_list
//           ? [
//               {
//                 brand_group_name: brands?.[0]?.brand_group_name,
//               },
//             ]
//           : single_brands.push({
//               brand_id: brands?.[0]?.brand_id && brands?.[0]?.brand_id,
//               brand_name: brands?.[0]?.brand_name && brands?.[0]?.brand_name,
//             });
//     } else {
//       brands &&
//         brands?.forEach((el) => {
//           if (el?.group || el?.brand_group_name) {
//             brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//           }
//         });

//       brands?.forEach((el) => {
//         if (!el?.group) {
//           single_brands.push({
//             brand_id: el?.brand_id ? el?.brand_id : el?.name,
//             brand_name: el?.brand_name
//               ? el?.brand_name
//               : el?.brand_friendly_name,
//           });
//         }
//       });
//     }
//   }

//   return async (dispatch) => {
//     if (axisPanelAtt?.chart_type || axisPanelAtt?.x_axis) {
//       let body = {
//         share_id: graphObject?.share_id,
//         ptoken: !graphObject?.shareBrands && authParams?.ptoken,
//         start_date: axisPanelAtt?.duration?.from
//           ? axisPanelAtt?.duration?.from
//           : graphObject?.duration?.from,
//         end_date: axisPanelAtt?.duration?.to
//           ? axisPanelAtt?.duration?.to
//           : graphObject?.duration?.to,
//         brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//         brand_list:
//           authParams?.screen_id === "000-000-557"
//             ? graphObject?.screen?.stream_screen_brand
//             : single_brands && single_brands?.[0]?.brand_id
//             ? single_brands
//             : null,
//         comp_brand_list: brands?.[0]?.competitor
//           ? brands?.[0]?.competitorList
//           : graphObject?.shareBrands?.selected_comp_brand_ids
//           ? graphObject?.shareBrands?.selected_comp_brand_ids
//           : null,
//         primary_attribute: searchTerm?.key,
//         agg: axisPanelAtt?.x_axis?.aggregation
//           ? axisPanelAtt?.x_axis?.aggregation
//           : "w",
//         // filters:
//         //   axisPanelAtt?.filters && axisPanelAtt?.filters?.length > 0
//         //     ? axisPanelAtt?.filters
//         //     : [],
//         search_string: !searchTerm ? "" : searchTerm.search,
//       };
//       let url = `${Config.config1.api_link}/widget-maker/configuration/${
//         graphObject?.shareBrands ? "share-search-filters" : "search-filters"
//       }`;
//       await axios
//         .post(url, body)
//         .then((response) => {
//           let filterOnSearch = {};
//           Object.entries(filterData)?.map((data_source) => {
//             filterOnSearch[data_source[0]] = data_source?.[1]
//               ?.filter((el) => el)
//               ?.map((e) => {
//                 if (e.attribute === searchTerm.key) {
//                   return {
//                     ...e,
//                     values: [...response?.data?.result],
//                   };
//                 } else {
//                   return e;
//                 }
//               });
//           });

//           dispatch(setFilterPanelData(filterOnSearch));
//           dispatch(setFilterLoader(null));

//           dispatch({
//             type: "SET_SEARCH_FILTERS",
//             payload: response,
//           });

//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_SEARCH_FILTERS", payload: null });
//     }
//   };
// };

// //api to call deepdive

// export const getDeepDive = (
//   authParams,
//   deepdiveObj,
//   widget_ids,
//   share_id,
//   filter
// ) => {
//   const { tabName } = deepdiveObj;

//   let brands = deepdiveObj?.shareBrands
//     ? deepdiveObj?.brands?.columns
//       ? deepdiveObj?.brands?.columns
//       : Array.isArray(deepdiveObj?.brands)
//       ? deepdiveObj?.brands
//       : deepdiveObj?.brands?.selected_brand_groups?.length
//       ? deepdiveObj?.brands?.selected_brand_groups
//       : deepdiveObj?.brands?.selected_brand_ids
//     : deepdiveObj?.brands?.columns
//     ? deepdiveObj?.brands?.columns
//     : deepdiveObj?.brands;

//   let single_brands = [];
//   let brandsGroupName = [];
//   if (deepdiveObj?.shareBrands) {
//     if (
//       deepdiveObj?.brands?.selected_brand_groups?.length <= 0 &&
//       deepdiveObj?.brands?.selected_brand_ids?.length <= 0
//     ) {
//       deepdiveObj?.brands?.brand_groups?.length > 0
//         ? (brandsGroupName = brands?.[0]?.brand_group_name && [
//             {
//               brand_group_name: brands?.[0]?.brand_group_name,
//             },
//           ])
//         : deepdiveObj?.brands?.brand_list?.length > 0 &&
//           single_brands?.push({
//             brand_id: deepdiveObj?.brands?.brand_list?.[0]?.brand_id,
//             brand_name: deepdiveObj?.brands?.brand_list?.[0]?.brand_name,
//           });
//     } else {
//       if (deepdiveObj?.brands?.columns) {
//         brands?.forEach((el) => {
//           if (el?.group) {
//             brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//           }
//         });
//       } else {
//         brands?.forEach((el) => {
//           if (el?.group || el?.brand_group_name)
//             brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//         });
//       }
//     }

//     if (deepdiveObj?.brands?.columns) {
//       brands?.forEach((el) => {
//         if (!el?.group) {
//           single_brands.push({
//             brand_id: el?.brand_id ? el?.brand_id : el?.name,
//             brand_name: el?.brand_name
//               ? el?.brand_name
//               : el?.brand_friendly_name,
//           });
//         }
//       });
//     } else if (deepdiveObj?.brands?.length > 0) {
//       brands?.forEach((el) => {
//         if (!el?.group) {
//           single_brands.push({
//             brand_id: el?.brand_id ? el?.brand_id : el?.name,
//             brand_name: el?.brand_name
//               ? el?.brand_name
//               : el?.brand_friendly_name,
//           });
//         }
//       });
//     } else {
//       deepdiveObj?.brands?.selected_brand_ids?.length > 0 &&
//         deepdiveObj?.brands?.selected_brand_ids?.forEach((el) => {
//           if (!el?.group) {
//             single_brands.push({
//               brand_id: el?.brand_id ? el?.brand_id : el?.name,
//               brand_name: el?.brand_name
//                 ? el?.brand_name
//                 : el?.brand_friendly_name,
//             });
//           }
//         });
//     }
//   } else {
//     if (!deepdiveObj?.isBrandModified) {
//       brandsGroupName =
//         brands && brands?.[0]?.brand_list
//           ? [
//               {
//                 brand_group_name: brands?.[0]?.brand_group_name,
//               },
//             ]
//           : single_brands.push({
//               brand_id: brands?.[0]?.brand_id && brands?.[0]?.brand_id,
//               brand_name: brands?.[0]?.brand_name && brands?.[0]?.brand_name,
//             });
//     } else {
//       brands &&
//         brands?.forEach((el) => {
//           if (el?.group || el?.brand_group_name) {
//             brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//           }
//         });

//       brands?.forEach((el) => {
//         if (!el?.group) {
//           single_brands.push({
//             brand_id: el?.brand_id ? el?.brand_id : el?.name,
//             brand_name: el?.brand_name
//               ? el?.brand_name
//               : el?.brand_friendly_name,
//           });
//         }
//       });
//     }
//   }

//   return async (dispatch) => {
//     if (authParams || deepdiveObj?.shareBrands) {
//       let body = {
//         ptoken: !deepdiveObj?.shareBrands ? authParams?.ptoken : undefined,

//         start_date: deepdiveObj?.start_date,
//         end_date: deepdiveObj?.end_date,
//         brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//         comp_brand_list:
//           brands && brands?.[0]?.competitor
//             ? brands?.[0]?.competitorList
//             : deepdiveObj?.brands?.selected_comp_brand_ids
//             ? deepdiveObj?.brands?.selected_comp_brand_ids
//             : null,
//         brand_list:
//           single_brands && single_brands?.[0]?.brand_id ? single_brands : null,
//         filters: deepdiveObj?.filters,
//         deep_dive_on: deepdiveObj?.deepdive_on?.deep_dive_id
//           ? null
//           : deepdiveObj?.deepdive_on,
//         filter_by_data: deepdiveObj?.filter_by_data,
//         filter_by: deepdiveObj?.filter_by,
//         utcoffset: getUTCOffset(),
//       };
//       if (deepdiveObj?.shareBrands) {
//         body.share_id = share_id;
//       }
//       if (deepdiveObj?.deepdive_on?.deep_dive_id) {
//         dispatch(
//           getDeepDiveData(
//             deepdiveObj,
//             { ...body, widget_id: deepdiveObj?.deepdive_on?.deep_dive_id },
//             deepdiveObj?.deepdive_on?.deep_dive_id
//           )
//         );
//       } else if (filter) {
//         widget_ids?.map((widget_id, i) => {
//           return deepdiveObj?.screen
//             ? dispatch(
//                 getScreenDeepDiveData(
//                   deepdiveObj,
//                   { ...body, widget_id: widget_id },
//                   widget_id
//                 )
//               )
//             : dispatch(
//                 getDeepDiveData(
//                   deepdiveObj,
//                   { ...body, widget_id: widget_id },
//                   widget_id
//                 )
//               );
//         });
//       } else {
//         let loadingState = [];
//         widget_ids?.map((widget_id, i) => {
//           if (widget_id !== "info-bar") {
//             dispatch(
//               setDeepDiveWidgetLoaders({
//                 [tabName]: [...loadingState, { [i]: true }],
//               })
//             );
//             loadingState = [...loadingState, { [i]: true }];
//           }
//           return deepdiveObj?.screen
//             ? dispatch(
//                 getScreenDeepDiveData(
//                   deepdiveObj,
//                   { ...body, widget_id: widget_id },
//                   widget_id
//                 )
//               )
//             : dispatch(
//                 getDeepDiveData(
//                   deepdiveObj,
//                   { ...body, widget_id: widget_id },
//                   widget_id
//                 )
//               );
//         });
//       }
//     }
//   };
// };

// export const getDeepDiveData = (deepdiveObj, body, widget_id) => {
//   const { panes, tabName, paneIndex, shareBrands, shareTemplateData } =
//     deepdiveObj;
//   return async (dispatch) => {
//     dispatch(setDeepDiveLoader(true));
//     widget_id === "1.1" && dispatch(setMentionPageInnerTabs(true));
//     widget_id === "1.2" && dispatch(setMentionTabsNews(true));
//     let url = `${Config.config1.api_link}/graph/${
//       deepdiveObj?.shareBrands ? "share-deep-dive" : "deep-dive"
//     }`;
//     await axios
//       .post(url, body)
//       .then((data) => {
//         dispatch(setDeepDiveLoader(false));
//         if (widget_id === "info-bar") {
//           dispatch(
//             setDeepDiveData(
//               data?.data,
//               panes,
//               paneIndex,
//               widget_id,
//               null,
//               shareBrands,
//               shareTemplateData
//             )
//           );
//         } else if (widget_id === "1.1") {
//           let obj = {};
//           if (data?.data?.status === "error") {
//             obj = {
//               data: data?.data?.reason,
//               page: 1,
//               limit: 10,
//               no_of_pages: 1,
//             };
//           } else {
//             obj = {
//               data: data?.data?.result?.data?.slice(0, 12),
//               page: 1,
//               limit: 12,
//               no_of_pages: data?.data?.result?.no_of_pages,
//               no_of_cards: data?.data?.result?.no_of_cards,
//             };
//           }
//           dispatch(
//             setDeepDiveData(
//               data?.data,
//               global?.panes ? global?.panes : panes,
//               paneIndex,
//               widget_id,
//               tabName,
//               shareBrands,
//               shareTemplateData
//             )
//           );
//           dispatch(setMentionPageData(obj));
//           dispatch(setDeepDiveInfoLoader(false));
//           dispatch(setMentionPageInnerTabs(false));
//         } else if (widget_id === "1.2") {
//           dispatch(
//             setDeepDiveData(
//               data?.data,
//               global?.panes ? global?.panes : panes,
//               paneIndex,
//               widget_id,
//               tabName,
//               shareBrands,
//               shareTemplateData
//             )
//           );
//           dispatch(setDeepDiveInfoLoader(false));
//           dispatch(setMentionTabsNews(false));
//         } else {
//           dispatch(
//             setDeepDiveData(
//               data?.data,
//               global?.panes ? global?.panes : panes,
//               paneIndex,
//               widget_id,
//               tabName,
//               shareBrands,
//               shareTemplateData
//             )
//           );
//           dispatch(setDeepDiveInfoLoader(false));
//         }
//       })
//       .catch((error) => {
//         dispatch(setDeepDiveLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           if (error.message !== "Network Error") {
//             callNotification(null, "error");
//           }
//           if (widget_id === "info-bar") {
//             let obj = {
//               reason: "Something went wrong",
//               span: "full",
//               status: "error",
//               metadata: deepdiveObj,
//               widget_id: widget_id,
//             };
//             dispatch(
//               setDeepDiveData(
//                 obj,
//                 panes,
//                 paneIndex,
//                 widget_id,
//                 null,
//                 shareBrands,
//                 shareTemplateData
//               )
//             );
//           } else if (widget_id === "1.1") {
//             let obj1 = {
//               reason: "Something went wrong",
//               span: "full",
//               status: "error",
//               metadata: deepdiveObj,
//               widget_id: widget_id,
//             };
//             dispatch(
//               setDeepDiveData(
//                 obj1,
//                 global?.panes ? global?.panes : panes,
//                 paneIndex,
//                 widget_id,
//                 tabName,
//                 shareBrands,
//                 shareTemplateData
//               )
//             );
//             let obj = {
//               data: null,
//               page: 1,
//               limit: 10,
//               no_of_pages: 1,
//             };
//             dispatch(setMentionPageData(obj));
//             dispatch(setDeepDiveInfoLoader(false));
//             dispatch(setMentionPageInnerTabs(false));
//           } else if (widget_id === "1.2") {
//             let obj = {
//               reason: "Something went wrong",
//               span: "half",
//               status: "error",
//               metadata: deepdiveObj,
//               widget_id: widget_id,
//             };
//             dispatch(
//               setDeepDiveData(
//                 obj,
//                 global?.panes ? global?.panes : panes,
//                 paneIndex,
//                 widget_id,
//                 tabName,
//                 shareBrands,
//                 shareTemplateData
//               )
//             );
//             dispatch(setDeepDiveInfoLoader(false));
//             dispatch(setMentionTabsNews(false));
//           } else {
//             let obj = {
//               reason: "Something went wrong",
//               span: widget_id === "4.1" ? "full" : "half",
//               status: "error",
//               metadata: deepdiveObj,
//               result: null,
//               widget_id: widget_id,
//             };
//             dispatch(
//               setDeepDiveData(
//                 obj,
//                 global?.panes ? global?.panes : panes,
//                 paneIndex,
//                 widget_id,
//                 tabName,
//                 shareBrands,
//                 shareTemplateData
//               )
//             );
//             dispatch(setDeepDiveInfoLoader(false));
//           }
//         }
//       });
//   };
// };
// export const setDeepDiveLoader = (value) => {
//   return { type: "SET_DEEP_DIVE_LOADER", payload: value };
// };

// export const callUpdateReachImpression = (authParams, payloadObj, widget) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let currentTime = new Date(new Date().getTime() + 5 * 60 * 1000);
//     let updatedTime = moment(currentTime).format("HH:mm");
//     dispatch(setReachRefreshTime(updatedTime));

//     let brands = payloadObj?.brands?.columns
//       ? payloadObj?.brands?.columns
//       : payloadObj?.brands;

//     let single_brands = [];
//     let brandsGroupName = [];

//     if (!payloadObj?.isBrandModified) {
//       brandsGroupName =
//         brands && brands?.[0]?.brand_list
//           ? [
//               {
//                 brand_group_name: brands?.[0]?.brand_group_name,
//               },
//             ]
//           : single_brands?.push({
//               brand_id:
//                 brands && brands?.[0]?.brand_id && brands?.[0]?.brand_id,
//               brand_name:
//                 brands && brands?.[0]?.brand_name && brands?.[0]?.brand_name,
//             });
//     } else {
//       if (brands && brands?.[0]?.competitor) {
//         single_brands.push({
//           brand_id: brands?.[0]?.name,
//           brand_name: brands?.[0]?.brand_name,
//         });
//       } else {
//         brands &&
//           brands?.forEach((el) => {
//             if (el?.group || el?.brand_group_name) {
//               brandsGroupName.push({
//                 brand_group_name: el?.brand_group_name,
//               });
//             }
//           });

//         brands?.forEach((el) => {
//           if (!el?.group) {
//             single_brands.push({
//               brand_id: el?.brand_id ? el?.brand_id : el?.name,
//               brand_name: el?.brand_name
//                 ? el?.brand_name
//                 : el?.brand_friendly_name,
//             });
//           }
//         });
//       }
//     }
//     let body = {
//       ptoken: authParams?.ptoken,
//       start_date: payloadObj?.start_date,
//       end_date: payloadObj?.end_date,
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       comp_brand_list:
//         brands && brands?.[0]?.competitor ? brands?.[0]?.competitorList : null,
//       brand_list:
//         single_brands && single_brands?.[0]?.brand_id ? single_brands : null,
//     };
//     let url = `${Config.config1.api_link}/template/section/widget/update-reach-impression`;
//     await axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(setUpdateImpression(true));
//           dispatch(setWidgetMakerGraphData(authParams, payloadObj, widget));
//         }
//         if (response?.data?.status === "error") {
//           callNotification(errorMessage, "error");
//           if (response?.data?.error_code === 9) {
//             sessionExpired(true);
//           }
//         }
//       })
//       .catch((error) => {
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//         dispatch(setWidgetPreviewLoader(false));
//       });
//   };
// };

// //api call to set chart data
// export const setWidgetMakerGraphData = (
//   authParams,
//   graphObject,
//   widget,
//   quick,
//   hidden_filter
// ) => {
//   let quickFilter = quick !== undefined && quick ? quick : [];
//   let errorMessage;
//   let series_filter_check;
//   Array.isArray(graphObject?.y_series) &&
//     graphObject?.y_series?.forEach((el) => {
//       if (el.filters === null && !widget && !graphObject?.edit) {
//         series_filter_check = graphObject?.predefined ? false : true;
//       }
//     });

//   return async (dispatch) => {
//     if (authParams && !series_filter_check) {
//       let brands = graphObject?.brands?.columns
//         ? graphObject?.brands?.columns
//         : graphObject?.brands;

//       let single_brands = [];
//       let brandsGroupName = [];

//       if (!graphObject?.isBrandModified) {
//         brandsGroupName =
//           brands && brands?.[0]?.brand_list
//             ? [
//                 {
//                   brand_group_name: brands?.[0]?.brand_group_name,
//                 },
//               ]
//             : single_brands?.push({
//                 brand_id:
//                   brands &&
//                   brands?.[0]?.brand_id &&
//                   (brands?.[0]?.brand_id
//                     ? brands?.[0]?.brand_id
//                     : brands?.[0]?.name),
//                 brand_name:
//                   brands && brands?.[0]?.brand_name && brands?.[0]?.brand_name,
//               });
//       } else {
//         if (brands && brands?.[0]?.competitor) {
//           single_brands.push({
//             brand_id: brands?.[0]?.name,
//             brand_name: brands?.[0]?.brand_name,
//           });
//         } else {
//           brands &&
//             brands?.forEach((el) => {
//               if (el?.group || el?.brand_group_name) {
//                 brandsGroupName.push({
//                   brand_group_name: el?.brand_group_name,
//                 });
//               }
//             });

//           brands?.forEach((el) => {
//             if (!el?.group) {
//               single_brands.push({
//                 brand_id: el?.brand_id ? el?.brand_id : el?.name,
//                 brand_name: el?.brand_name
//                   ? el?.brand_name
//                   : el?.brand_friendly_name,
//               });
//             }
//           });
//         }
//       }

//       // modifying x-axis date_aggregation
//       let updatedXais = deepCopy(graphObject.x_axis);
//       if (updatedXais?.date_aggregation) {
//         updatedXais.date_part = updatedXais.date_aggregation;
//       }

//       // Adding widget id in the array of panes and templateDetails
//       if (widget) {
//         let updatedArray = addDashboardCalledApiList(widget);
//         if (widget?.templateFilter) {
//           let templateDetails = global.template_details
//             ? global.template_details
//             : widget?.template_details;
//           dispatch(
//             setTemplateDetails(templateDetails, {
//               dashboard_called_api_list: updatedArray,
//             })
//           );
//         } else {
//           dispatch(
//             setDashboardCalledApiList(
//               updatedArray,
//               widget?.panes,
//               widget?.pane_index
//             )
//           );
//         }
//       }

//       widget &&
//         dispatch(
//           setWidgetLoader({
//             value: true,
//             widget_index: widget?.widget_index,
//             section_index: widget?.section_index,
//             widget_id: widget?.widget_id,
//             global: widget?.global ? true : false,
//           })
//         );
//       widget ? dispatch(setGraphLoader(true)) : dispatch(setChartLoader(true));

//       // panes graphData clear
//       if (widget) {
//         if (widget?.templateFilter) {
//           dispatch(
//             setClearTemplateWidgetGraphData(
//               widget?.section,
//               widget?.section_index,
//               widget?.widget_index
//             )
//           );
//         } else {
//           dispatch(
//             setClearWidgetGraphData(
//               widget?.panes,
//               widget?.pane_index,
//               widget?.section_index,
//               widget?.widget_index
//             )
//           );
//         }
//       }
//       //panes graph data clear end
//       //high chart option data clear start
//       let updateOpData = clearHighChartopData(widget, graphObject?.widget_id);
//       dispatch(setOptionHighChart(updateOpData));
//       //high chart option data clear end

//       let template_type;
//       let pathName = getWindowLocationPath();
//       if (pathName === "edit-dashboard" || pathName === "create-dashboard") {
//         template_type = widget?.template_details?.template_type;
//       } else {
//         template_type = widget?.panes?.[widget?.pane_index]?.template_type;
//       }
//       let body = graphObject?.payload
//         ? { ...graphObject?.payload, exclude_words: graphObject?.exclude_words }
//         : {
//             ptoken: authParams?.ptoken,
//             x_label: graphObject?.x_label, //by default attribute name
//             y_label: graphObject?.y_label, // by default mention count
//             filters: graphObject?.filters?.length
//               ? [...graphObject?.filters]
//               : graphObject?.filters,
//             hidden_filter: hidden_filter,
//             x_axis: updatedXais,
//             y_axes:
//               graphObject?.y_axes?.length > 0 ? graphObject?.y_axes : null,
//             y_series: graphObject?.y_series,
//             brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//             comp_brand_list:
//               brands && brands?.[0]?.competitor
//                 ? brands?.[0]?.competitorList
//                 : null,
//             brand_list:
//               single_brands && single_brands?.[0]?.brand_id
//                 ? single_brands
//                 : null,
//             start_date: graphObject?.start_date,
//             end_date: graphObject?.end_date,
//             widget_name: graphObject?.widget_name,
//             chart: graphObject?.chart,
//             order_by: graphObject?.order_by,
//             utcoffset: getUTCOffset(),
//             filter_by_data: graphObject?.filter_by_data,
//             filter_by: graphObject?.filter_by,
//             exclude_words:
//               graphObject?.exclude_words?.length > 0
//                 ? graphObject?.exclude_words
//                 : null,
//             theme_type: authParams?.theme_type, //Dark Theme Type for 1 and Light Theme Type 0
//             template_type: template_type,
//             complex_filters: graphObject?.complex_filters
//               ? graphObject?.complex_filters
//               : null,
//           };
//       body.chart.chart_settings.chart_property.screen_width =
//         window?.innerWidth;
//       body.chart.chart_settings.chart_property.screen_height =
//         window?.innerHeight;
//       if (graphObject?.isNetworkChartV2) {
//         body.widget_id = "NG-4";
//       }

//       let url = graphObject?.isNetworkChartV2
//         ? graphObject?.isUpdateImpression
//           ? `${Config.config1.api_link}/widget-maker/network-chart?ignore_cache=True`
//           : `${Config.config1.api_link}/widget-maker/network-chart`
//         : graphObject?.isUpdateImpression
//         ? `${Config.config1.api_link}/widget-maker/${
//             !widget
//               ? graphObject?.data_source === "mentions"
//                 ? "chart"
//                 : graphObject?.data_source + "-chart"
//               : "chart"
//           }?ignore_cache=True`
//         : `${Config.config1.api_link}/widget-maker/${
//             !widget
//               ? graphObject?.data_source === "mentions"
//                 ? "chart"
//                 : graphObject?.data_source + "-chart"
//               : "chart"
//           }`;

//       await axios

//         .post(url, body)
//         .then((response) => {
//           let timer1,
//             timer2 = null;
//           dispatch({
//             type: "SET_WIDGET_MAKER_CHART",
//             payload: response?.data?.result
//               ? response?.data?.result
//               : response?.data?.reason,
//           });

//           dispatch(setSectionLoader({ value: false, widget_id: null }));
//           widget &&
//             dispatch(
//               setWidgetLoader({
//                 value: false,
//                 widget_index: null,
//                 section_index: null,
//                 global: false,
//               })
//             );

//           if (response?.data?.status === "successful") {
//             // ChartLoader Added here to disable div properly

//             // setTimeout(() => {
//             //   widget
//             //     ? dispatch(setGraphLoader(false))
//             //     : dispatch(setChartLoader(false));
//             // }, 1000);

//             // condition added to close the loader
//             if (window.location.pathname === "/widgetMaker") {
//               timer1 = setTimeout(() => {
//                 widget
//                   ? dispatch(setGraphLoader(false))
//                   : dispatch(setChartLoader(false));
//               }, 1000);
//             } else {
//               widget
//                 ? dispatch(setGraphLoader(false))
//                 : dispatch(setChartLoader(false));
//             }
//             //import widget in dashboard

//             graphObject?.predefined
//               ? dispatch({
//                   type: "SET_WIDGET_PREVIEW",
//                   payload: {
//                     chart_data: response?.data?.result && {
//                       ...response?.data?.result,
//                     },
//                     metadata: graphObject && { ...graphObject },
//                   },
//                 })
//               : widget?.templateFilter
//               ? dispatch(
//                   setTemplateWidgetData(
//                     response?.data?.result,
//                     widget?.section,
//                     widget?.section_index,
//                     widget?.widget_index,
//                     graphObject,
//                     body
//                   )
//                 )
//               : widget &&
//                 dispatch(
//                   setWidgetGraphData(
//                     response?.data?.result,
//                     widget?.pane_index,
//                     widget?.panes,
//                     widget?.section_index >= 0 ? widget?.section_index : null,
//                     widget?.widget_index,
//                     body,
//                     graphObject
//                   )
//                 );

//             if (
//               graphObject?.chart?.chart_type !== "kpi" &&
//               response?.data?.result?.data?.kpi?.length > 0 &&
//               !widget &&
//               !graphObject?.predefined
//             ) {
//               let kpiData = response?.data?.result?.data?.kpi;
//               dispatch(
//                 setCardSettingsData(
//                   kpiData,
//                   graphObject?.card_settings_index,
//                   graphObject?.widgetGraphConfig
//                 )
//               );
//               // For Edit widget in dashboard
//               if (
//                 graphObject?.panes?.[graphObject?.index]
//                   ?.is_widget_maker_open_obj?.open_flag
//               ) {
//                 let updatePanes = [...graphObject?.panes];
//                 graphObject.panes[
//                   graphObject?.index
//                 ].edited_widgetGraphConfig.card_settings[
//                   graphObject?.card_settings_index
//                 ].response = kpiData;
//                 dispatch({ type: "SET_WIDGET_GRAPH_DATA", panes: updatePanes });
//               }
//             } else if (
//               !widget &&
//               graphObject?.card_settings_index >= 0 &&
//               !graphObject?.predefined
//             ) {
//               let kpiData = [];
//               dispatch(
//                 setCardSettingsData(
//                   kpiData,
//                   graphObject?.card_settings_index,
//                   graphObject?.widgetGraphConfig
//                 )
//               );
//             }

//             // delete excecuted api from list
//             if (widget) {
//               let updatedArray = deleteDashboardCalledApiList(widget);
//               if (widget?.templateFilter) {
//                 let templateDetails = global.template_details
//                   ? global.template_details
//                   : widget?.template_details;
//                 dispatch(
//                   setTemplateDetails(templateDetails, {
//                     dashboard_called_api_list: updatedArray,
//                   })
//                 );
//               } else {
//                 dispatch(
//                   setDashboardCalledApiList(
//                     updatedArray,
//                     widget?.panes,
//                     widget?.pane_index
//                   )
//                 );
//               }
//             }
//           }

//           if (response?.data?.status === "error") {
//             // ChartLoader Added here to disable div properly
//             timer2 = setTimeout(() => {
//               widget
//                 ? dispatch(setGraphLoader(false))
//                 : dispatch(setChartLoader(false));
//             }, 1000);

//             graphObject?.predefined
//               ? dispatch({
//                   type: "SET_WIDGET_PREVIEW",
//                   payload: {
//                     chart_data:
//                       response?.data?.error_code === 4
//                         ? "No data found"
//                         : response?.data?.reason,

//                     metadata: graphObject && { ...graphObject },
//                   },
//                 })
//               : widget?.templateFilter
//               ? dispatch(
//                   setTemplateWidgetData(
//                     response?.data?.error_code === 4
//                       ? "No data found"
//                       : response?.data?.reason,
//                     widget?.section,
//                     widget?.section_index,
//                     widget?.widget_index,
//                     graphObject
//                   )
//                 )
//               : widget &&
//                 dispatch(
//                   setWidgetGraphData(
//                     response?.data?.error_code === 4
//                       ? "No data found"
//                       : response?.data?.reason,
//                     widget?.pane_index,
//                     widget?.panes,
//                     widget?.section_index,
//                     widget?.widget_index,
//                     body,
//                     graphObject
//                   )
//                 );

//             dispatch(setErrorCode(response?.data?.error_code));
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }

//             dispatch(setChartLoader(false));

//             // delete excecuted api from list
//             if (widget) {
//               let updatedArray = deleteDashboardCalledApiList(widget);
//               if (widget?.templateFilter) {
//                 let templateDetails = global.template_details
//                   ? global.template_details
//                   : widget?.template_details;
//                 dispatch(
//                   setTemplateDetails(templateDetails, {
//                     dashboard_called_api_list: updatedArray,
//                   })
//                 );
//               } else {
//                 dispatch(
//                   setDashboardCalledApiList(
//                     updatedArray,
//                     widget?.panes,
//                     widget?.pane_index
//                   )
//                 );
//               }
//             }
//           }
//           // update data_source of widgetgraphconfig
//           !widget &&
//             dispatch(
//               setWidgetMakerDataSource(
//                 graphObject?.data_source,
//                 graphObject?.widgetGraphConfig
//               )
//             );
//           return () => {
//             clearTimeout(timer1);
//             clearTimeout(timer2);
//           };
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             let widget_metadata = widget?.templateFilter
//               ? widget?.section?.[widget?.section_index]?.data?.[
//                   widget?.widget_index
//                 ]
//               : widget?.section_index >= 0 &&
//                 widget?.panes?.[widget?.pane_index]?.sections
//               ? widget?.panes?.[widget?.pane_index]?.sections?.[
//                   widget?.section_index
//                 ]?.widgets?.[widget?.widget_index]
//               : widget?.panes?.[widget?.pane_index]?.section?.[0]?.widgets?.[
//                   widget?.widget_index
//                 ];
//             let retry_count = widget_metadata?.retry_count
//               ? widget_metadata?.retry_count + 1
//               : 0;
//             if (retry_count > API_RETRY_LIMIT) {
//               widget?.templateFilter
//                 ? dispatch(
//                     setTemplateWidgetData(
//                       "Something went wrong",
//                       widget?.section,
//                       widget?.section_index,
//                       widget?.widget_index,
//                       graphObject
//                     )
//                   )
//                 : widget &&
//                   dispatch(
//                     setWidgetGraphData(
//                       "Something went wrong",
//                       widget?.pane_index,
//                       widget?.panes,
//                       widget?.section_index,
//                       widget?.widget_index,
//                       body,
//                       graphObject
//                     )
//                   );
//             } else {
//               widget?.templateFilter
//                 ? dispatch(
//                     setTemplateWidgetData(
//                       null,
//                       widget?.section,
//                       widget?.section_index,
//                       widget?.widget_index,
//                       graphObject,
//                       retry_count
//                     )
//                   )
//                 : widget &&
//                   dispatch(
//                     setWidgetGraphData(
//                       null,
//                       widget?.pane_index,
//                       widget?.panes,
//                       widget?.section_index,
//                       widget?.widget_index,
//                       body,
//                       graphObject,
//                       retry_count
//                     )
//                   );
//             }

//             if (widget) {
//               let updatedArray = deleteDashboardCalledApiList(widget);
//               if (widget?.shareTemplateData) {
//                 dispatch({
//                   type: "SET_SHARE_TEMPLATE_DATA",
//                   payload: {
//                     ...widget?.shareTemplateData,
//                     dashboard_called_api_list: updatedArray,
//                   },
//                 });
//               } else if (widget?.templateFilter) {
//                 let templateDetails = global.template_details
//                   ? global.template_details
//                   : widget?.template_details;
//                 dispatch(
//                   setTemplateDetails(templateDetails, {
//                     dashboard_called_api_list: updatedArray,
//                   })
//                 );
//               } else {
//                 dispatch(
//                   setDashboardCalledApiList(
//                     updatedArray,
//                     widget?.panes,
//                     widget?.pane_index
//                   )
//                 );
//               }
//             }
//             if (error.message !== "Network Error") {
//               callNotification(null, "error");
//             }
//           } else {
//             // delete excecuted api from list
//             if (widget) {
//               let updatedArray = deleteDashboardCalledApiList(widget);
//               if (widget?.templateFilter) {
//                 let templateDetails = global.template_details
//                   ? global.template_details
//                   : widget?.template_details;
//                 dispatch(
//                   setTemplateDetails(templateDetails, {
//                     dashboard_called_api_list: updatedArray,
//                   })
//                 );
//               } else {
//                 dispatch(
//                   setDashboardCalledApiList(
//                     updatedArray,
//                     widget?.panes,
//                     widget?.pane_index
//                   )
//                 );
//               }
//             }
//           }

//           dispatch(setSectionLoader({ value: false, widget_id: null }));
//           widget
//             ? dispatch(setGraphLoader(false))
//             : dispatch(setChartLoader(false));
//         });
//     } else {
//       dispatch({ type: "SET_WIDGET_MAKER_CHART", payload: null });
//     }
//   };
// };

// // Set Selected Chart Type Name
// export const setSelectedChartTypeName = (value) => {
//   return { type: "SET_SELECTED_CHART_TYPE_NAME", payload: value };
// };

// export const setChartCardData = (value) => {
//   return { type: "SET_CHART_CARD_DATA", payload: value };
// };

// export const setChartData = (value) => {
//   return { type: "SET_CHART_DATA", payload: value };
// };

// export const setChartLoader = (value) => {
//   return { type: "SET_CHART_LOADER", payload: value };
// };

// //api call to set search filters data
// export const setCreateWidget = (widgetObject, widget_obj) => {
//   let errorMessage;

//   return async (dispatch) => {
//     if (widgetObject?.authParams) {
//       let brands = widgetObject?.brands?.columns
//         ? widgetObject?.brands?.columns
//         : widgetObject?.brands;
//       let single_brands = [];
//       let brandsGroupName = [];
//       if (!widgetObject?.isBrandModified) {
//         brandsGroupName =
//           brands && brands?.[0]?.brand_list
//             ? [
//                 {
//                   brand_group_name: brands?.[0]?.brand_group_name,
//                 },
//               ]
//             : single_brands?.push({
//                 brand_id:
//                   brands && brands?.[0]?.brand_id && brands?.[0]?.brand_id,
//                 brand_name:
//                   brands && brands?.[0]?.brand_name && brands?.[0]?.brand_name,
//               });
//       } else {
//         if (brands?.[0]?.competitor) {
//           single_brands.push({
//             brand_id: brands?.[0]?.name,
//             brand_name: brands?.[0]?.brand_name,
//           });
//         } else {
//           brands &&
//             brands?.forEach((el) => {
//               if (el?.group || el?.brand_group_name) {
//                 brandsGroupName.push({
//                   brand_group_name: el?.brand_group_name,
//                 });
//               }
//             });

//           brands?.forEach((el) => {
//             if (!el?.group) {
//               single_brands.push({
//                 brand_id: el?.brand_id ? el?.brand_id : el?.name,
//                 brand_name: el?.brand_name
//                   ? el?.brand_name
//                   : el?.brand_friendly_name,
//               });
//             }
//           });
//         }
//       }
//       let body = {
//         ptoken: widgetObject?.authParams?.ptoken,
//         chart: widgetObject?.chart,
//         widget_name: widgetObject?.widget_name,
//         widget_description: widgetObject?.widget_description,
//         x_axis: widgetObject?.x_axis,
//         y_axes: widgetObject?.y_axes,
//         order_by: widgetObject?.order_by,
//         y_series: widgetObject?.y_series,
//         x_label: widgetObject?.x_label, //by default attribute name
//         y_label: widgetObject?.y_label, // by default mention count
//         data_source: widgetObject?.data_source,
//         filters: widgetObject?.filters,
//         start_date: widgetObject?.start_date,
//         end_date: widgetObject?.end_date,
//         comp_brand_list: brands?.[0]?.competitor
//           ? brands?.[0]?.competitorList
//           : null,
//         brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//         brand_list:
//           single_brands && single_brands?.[0]?.brand_id ? single_brands : null,
//         widget_id: widget_obj?.isEditWidget && widget_obj?.id,
//         utcoffset: widgetObject?.utcoffset,
//         tags: widgetObject?.tags ? widgetObject?.tags : [],
//       };
//       dispatch(setWidgetPreviewLoader(true));

//       let url = `${Config.config1.api_link}/widget-maker/widget/${
//         widget_obj?.isEditWidget ? "update" : "create"
//       }`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch({ type: "SET_SAVE_WIDGET", payload: response });

//           if (response?.data?.status === "successful") {
//             const widgetLibraryObject = {
//               authParams: widgetObject?.authParams,
//               utcoffset: getUTCOffset(),
//               search_text: widgetObject?.search_text,
//               pill: widgetObject?.pill,
//               offset: widgetObject?.offset,
//               no_of_rows: widgetObject?.no_of_rows,
//               sort_expression: widgetObject?.sort_expression,
//               sort_order: widgetObject?.sort_order,
//               chart_type: widgetObject?.chart_type,
//               attribute: widgetObject?.attribute,
//               type: widgetObject?.type,
//             };

//             callNotification("Widget saved successfully", "success");
//             callNotification(
//               `Widget ${
//                 widget_obj?.isEditWidget ? "updated" : "saved"
//               } successfully`,
//               "success"
//             );

//             dispatch(setWidgetLibraryList(widgetLibraryObject));

//             //reset states
//             dispatch(setWidgetShow(false));
//             dispatch(setEditWidget(false));
//             dispatch(setWidgetPreview(null));
//             dispatch(
//               setX_attribute({
//                 x_axis: null,
//                 y_axis: {
//                   y_series_1: {
//                     attribute: null,
//                     aggregation: "COUNT",
//                   },
//                 },
//                 y_axis_settings: [],
//                 breakdown_by: [],
//                 fields: [],
//                 chart_type: "line",
//                 duration: null,
//                 brands: null,
//                 filters: null,
//                 show_marker: true,
//                 card_position: "Top",
//                 card_limit: 5,
//                 card_settings: [
//                   {
//                     card_id: uuid(),
//                     card_name: 1,
//                     card_value: null,
//                     x_axis: null,
//                     y_axis: null,
//                     response: [],
//                   },
//                 ],
//                 chart_settings: {
//                   global_data_label: false,
//                   is_stacked: true,
//                   data_count_card: true,
//                   duration_comparison: false, // This is used for only KPI
//                   show_previous_duration_comparison: false, // This is used for charts
//                   show_previous_duration_data: false, // This is used for charts
//                   card_percent: true,
//                   chart_percent: false,
//                   gradient_color: false,
//                   split_cards: false,
//                   duplicate_for_brands: false,
//                   top_posts_in_cards: false,
//                   wordcloud_color: "0",
//                 },
//                 chart_property: {
//                   chart_name: null,
//                   legend_position: "bottom",
//                   y_axis_mode: 2,
//                   no_of_top_posts: 1,
//                 },

//                 dragDataType: {
//                   varchar: false,
//                   int: false,
//                   datetime: false,
//                 },
//                 tags: [],
//               })
//             );
//             dispatch(setIsDuplicate({ redirect: false, widget_id: null }));
//             dispatch(setWidgetMakerGraphData(null));
//             dispatch(setWidgetPreviewLoader(false));
//           }

//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//           dispatch(setWidgetPreviewLoader(false));
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//           dispatch(setWidgetPreviewLoader(false));
//         });
//     } else {
//       dispatch({ type: "SET_SAVE_WIDGET", payload: null });
//     }
//   };
// };

// //api call to set metadata and chart data for import widgets
// export const setWidgetPreview = (authParams, widget_id, offset_data) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch({ type: "SET_WIDGET_PREVIEW", payload: null });
//     dispatch(setWidgetPreviewLoader(true));

//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         widget_id: widget_id,
//         utcoffset: getUTCOffset(),
//       };
//       let url = `${Config.config1.api_link}/widget-maker/widget/preview`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           let timer1,
//             timer2 = null;
//           if (response?.data?.status === "successful") {
//             timer1 = setTimeout(() => {
//               dispatch({ type: "SET_WIDGET_PREVIEW", payload: response });
//             }, 500);
//             timer2 = setTimeout(() => {
//               dispatch(setWidgetPreviewLoader(false));
//             }, 1000);
//           }
//           if (response?.data?.status === "error") {
//             dispatch(setWidgetPreviewLoader(false));
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }

//           return () => {
//             clearTimeout(timer1);
//             clearTimeout(timer2);
//           };
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//           dispatch(setWidgetPreviewLoader(false));
//         });
//     } else {
//       dispatch({ type: "SET_WIDGET_PREVIEW", payload: null });
//     }
//   };
// };

// // lodaer for preview widget modal
// export const setWidgetPreviewLoader = (value) => {
//   return { type: "SET_WIDGET_PREVIEW_LOADER", payload: value };
// };

// export const setUpdateImpression = (value) => {
//   return { type: "SET_UPDATE_IMPRESSION", payload: value };
// };

// // lodaer for widget library filter
// export const setWidgetLibraryFilterLoader = (value) => {
//   return { type: "SET_WIDGET_LIBRARY_FILTER_LOADER", payload: value };
// };

// //loader for dashboard list in preview modal
// export const setDashboardListPreviewLoader = (value) => {
//   return { type: "SET_DASHBOARD_LIST_PREVIEW_LOADER", payload: value };
// };

// //api call to set dashboard list preview
// export const setDashboardListPreview = (authParams, widget_obj) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setDashboardListPreviewLoader(true));
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         search_text: widget_obj?.search_text,
//         sort_expression: widget_obj?.sort_expression,
//         sort_order: widget_obj?.sort_order,
//         // user_id: authParams?.userid,
//         // category_id: authParams?.category_id,
//         // category_name: authParams?.category_name,
//       };
//       let url = `${Config.config1.api_link}/template/fetch-list`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch({ type: "SET_DASHBOARD_LIST_PREVIEW", payload: response });
//           dispatch(setDashboardListPreviewLoader(false));

//           if (response?.data?.status === "successful") {
//           }
//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//           dispatch(setDashboardListPreviewLoader(false));
//         });
//     } else {
//       dispatch({ type: "SET_DASHBOARD_LIST_PREVIEW", payload: null });
//     }
//   };
// };

// export const setWidgetFetchloader = (value) => {
//   return (dispatch) =>
//     dispatch({ type: "SET_WIDGET_FETCH_LOADER", payload: value });
// };

// //api call to set widget maker metadata
// export const setWidgetMetaData = (authParams, widgetObj) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken && authParams?.ptoken,
//         // user_id: authParams?.userid && authParams?.userid,
//         // category_id: authParams?.category_id && authParams?.category_id,
//         // category_name: authParams?.category_name && authParams?.category_name,
//         widget_id_list: widgetObj?.widget_id,
//       };
//       dispatch(setWidgetFetchloader(true));
//       let url = `${Config.config1.api_link}/widget-maker/widget/fetch${
//         widgetObj?.preview_predefined_widget || widgetObj?.addWidget
//           ? "?clear_context=true"
//           : ""
//       }`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch({ type: "SET_WIDGET_LIBRARY_ARRAY", payload: response });
//           dispatch(setWidgetFetchloader(false));
//           if (response?.data?.status === "successful") {
//             //  dispatch(setOptionHighChart({}));

//             if (widgetObj?.preview_predefined_widget) {
//               let graphObject = {
//                 ...response?.data?.result?.[0],
//               };
//               graphObject.brands = widgetObj?.brands;
//               graphObject.start_date = widgetObj?.duration?.from;
//               graphObject.end_date = widgetObj?.duration?.to;
//               graphObject.preview = true;
//               graphObject.widgetGraphConfig = widgetObj?.widgetGraphConfig;
//               if (graphObject?.chart?.chart_type === "network-graph-v2") {
//                 graphObject.isNetworkChartV2 =
//                   graphObject?.chart?.chart_type === "network-graph-v2"
//                     ? true
//                     : false;
//               }
//               dispatch(setWidgetMakerGraphData(authParams, graphObject, null));
//             } else if (widgetObj?.is_section) {
//               // when create section
//               let multipleWidgetsDataList = [];
//               if (
//                 widgetObj?.templateDetails &&
//                 widgetObj?.templateDetails?.templateBrands?.columns &&
//                 widgetObj?.templateDetails?.templateBrands?.columns?.[0]
//                   ?.competitor
//               ) {
//                 response?.data?.result?.forEach((widgetResData, index) => {
//                   if (
//                     widgetResData?.chart &&
//                     (widgetResData?.chart?.["chart_type"] === "wordcloud" ||
//                       widgetResData?.chart?.["chart_type"] === "grid" ||
//                       widgetResData?.chart?.["chart_type"] === "post-card" ||
//                       widgetResData?.chart?.["chart_type"] === "author-card") &&
//                     widgetResData?.chart?.["chart_settings"]?.[
//                       "duplicate_for_brands"
//                     ]
//                   ) {
//                     let newBrandList = [];

//                     newBrandList.push({
//                       brand_id:
//                         widgetObj?.templateDetails?.templateBrands?.columns?.[0]
//                           ?.name,
//                       brand_name:
//                         widgetObj?.templateDetails?.templateBrands?.columns?.[0]
//                           ?.brand_name,
//                       brand_friendly_name:
//                         widgetObj?.templateDetails?.templateBrands?.columns?.[0]
//                           ?.brand_friendly_name,
//                     });
//                     widgetObj?.templateDetails?.templateBrands?.columns?.[0]?.competitorList?.forEach(
//                       (competitorBrand) => {
//                         newBrandList.push(competitorBrand);
//                       }
//                     );
//                     let duplicateWidgets = getDuplicateWidgets(
//                       newBrandList,
//                       widgetResData,
//                       widgetObj?.singleBrands
//                     );
//                     if (duplicateWidgets) {
//                       multipleWidgetsDataList = [
//                         ...multipleWidgetsDataList,
//                         ...duplicateWidgets,
//                       ];
//                     } else {
//                       multipleWidgetsDataList.push(widgetResData);
//                     }
//                   } else {
//                     multipleWidgetsDataList.push(widgetResData);
//                   }
//                 });
//               }
//               let section = [
//                 {
//                   id: widgetObj?.sectionValue?.id
//                     ? widgetObj?.sectionValue?.id
//                     : uuid(),
//                   name: widgetObj?.sectionValue?.name
//                     ? widgetObj?.sectionValue?.name
//                     : widgetObj?.name?.trim(),
//                   description: widgetObj?.sectionValue?.description
//                     ? widgetObj?.sectionValue?.description
//                     : widgetObj?.description?.trim(),
//                   isSectionAdded: true,
//                   isWidgetAdded: true,
//                   data: widgetObj?.sectionValue?.data
//                     ? multipleWidgetsDataList &&
//                       multipleWidgetsDataList?.length > 0
//                       ? [
//                           ...multipleWidgetsDataList,
//                           ...widgetObj?.sectionValue?.data,
//                         ]
//                       : [
//                           ...response?.data?.result,
//                           ...widgetObj?.sectionValue?.data,
//                         ]
//                     : multipleWidgetsDataList &&
//                       multipleWidgetsDataList?.length > 0
//                     ? multipleWidgetsDataList
//                     : response?.data?.result,
//                 },
//               ];

//               let newObj = {
//                 templateDetails: widgetObj?.templateDetails,
//                 newSection: true,
//                 authParams: authParams,
//                 global_brands: widgetObj?.templateDetails?.templateBrands
//                   ? widgetObj?.templateDetails?.templateBrands
//                   : null,
//                 brands: widgetObj?.brands,
//                 global_duration: widgetObj?.templateDetails?.templateDuration
//                   ? widgetObj?.templateDetails?.templateDuration
//                   : null,
//                 global_filters: widgetObj?.templateDetails?.templateFilters
//                   ? widgetObj?.templateDetails?.templateFilters
//                   : [],
//                 graphConditionConfig: widgetObj?.graphConditionConfig,
//               };

//               dispatch(
//                 setAddSection(widgetObj?.Section, section, false, newObj)
//               );
//             } else if (widgetObj?.sectionValue) {
//               // only widgets not for section
//               let multipleWidgetsDataList = [];
//               if (
//                 widgetObj?.templateDetails &&
//                 widgetObj?.templateDetails?.templateBrands?.columns &&
//                 widgetObj?.templateDetails?.templateBrands?.columns?.[0]
//                   ?.competitor
//               ) {
//                 response?.data?.result?.forEach((widgetResData, index) => {
//                   if (
//                     widgetResData?.chart &&
//                     (widgetResData?.chart?.["chart_type"] === "wordcloud" ||
//                       widgetResData?.chart?.["chart_type"] === "grid" ||
//                       widgetResData?.chart?.["chart_type"] === "post-card" ||
//                       widgetResData?.chart?.["chart_type"] === "author-card") &&
//                     widgetResData?.chart?.["chart_settings"]?.[
//                       "duplicate_for_brands"
//                     ]
//                   ) {
//                     let newBrandList = [];

//                     newBrandList.push({
//                       brand_id:
//                         widgetObj?.templateDetails?.templateBrands?.columns?.[0]
//                           ?.name,
//                       brand_name:
//                         widgetObj?.templateDetails?.templateBrands?.columns?.[0]
//                           ?.brand_name,
//                       brand_friendly_name:
//                         widgetObj?.templateDetails?.templateBrands?.columns?.[0]
//                           ?.brand_friendly_name,
//                     });
//                     widgetObj?.templateDetails?.templateBrands?.columns?.[0]?.competitorList?.forEach(
//                       (competitorBrand) => {
//                         newBrandList.push(competitorBrand);
//                       }
//                     );
//                     let duplicateWidgets = getDuplicateWidgets(
//                       newBrandList,
//                       widgetResData,
//                       widgetObj?.singleBrands
//                     );
//                     if (duplicateWidgets) {
//                       multipleWidgetsDataList = [
//                         ...multipleWidgetsDataList,
//                         ...duplicateWidgets,
//                       ];
//                     } else {
//                       multipleWidgetsDataList.push(widgetResData);
//                     }
//                   } else {
//                     multipleWidgetsDataList.push(widgetResData);
//                   }
//                 });
//               }
//               let widgetData = widgetObj?.sectionValue?.data
//                 ? [...widgetObj?.sectionValue?.data]
//                 : [];
//               let section = [
//                 {
//                   id: widgetObj?.sectionValue?.id
//                     ? widgetObj?.sectionValue?.id
//                     : uuid(),
//                   name: widgetObj?.sectionValue?.name
//                     ? widgetObj?.sectionValue?.name
//                     : "",
//                   description: widgetObj?.sectionValue?.description
//                     ? widgetObj?.sectionValue?.description
//                     : "",
//                   isSectionAdded: widgetObj?.sectionValue?.isSectionAdded
//                     ? widgetObj?.sectionValue?.isSectionAdded
//                     : false,
//                   isWidgetAdded: widgetObj?.sectionValue?.isWidgetAdded
//                     ? widgetObj?.sectionValue?.isWidgetAdded
//                     : true,
//                   data:
//                     multipleWidgetsDataList &&
//                     multipleWidgetsDataList?.length > 0
//                       ? [...widgetData, ...multipleWidgetsDataList]
//                       : [...widgetData, ...response?.data?.result],
//                   duration: widgetObj?.sectionValue?.duration,
//                 },
//               ];
//               let newObj = {
//                 widgetList: response?.data?.result,
//                 section_index: widgetObj?.sectionIndex,
//                 templateDetails: widgetObj?.templateDetails,
//                 newWidget: true,
//                 authParams: authParams,
//                 global_brands: widgetObj?.templateDetails?.templateBrands
//                   ? widgetObj?.templateDetails?.templateBrands
//                   : null,
//                 brands: widgetObj?.brands,
//                 global_duration: widgetObj?.templateDetails?.templateDuration
//                   ? widgetObj?.templateDetails?.templateDuration
//                   : null,
//                 global_filters: widgetObj?.templateDetails?.templateFilters
//                   ? widgetObj?.templateDetails?.templateFilters
//                   : [],
//                 graphConditionConfig: widgetObj?.graphConditionConfig,
//               };

//               dispatch(
//                 setAddSection(widgetObj?.Section, section, false, newObj)
//               );
//             } else {
//               let widgetData = widgetObj?.sectionValue?.data
//                 ? [...widgetObj?.sectionValue?.data]
//                 : [];
//               let section = [
//                 {
//                   id: widgetObj?.sectionValue?.id
//                     ? widgetObj?.sectionValue?.id
//                     : uuid(),
//                   name: widgetObj?.sectionValue?.name
//                     ? widgetObj?.sectionValue?.name
//                     : "",
//                   description: widgetObj?.sectionValue?.description
//                     ? widgetObj?.sectionValue?.description
//                     : "",
//                   isSectionAdded: widgetObj?.sectionValue?.isSectionAdded
//                     ? widgetObj?.sectionValue?.isSectionAdded
//                     : false,
//                   isWidgetAdded: widgetObj?.sectionValue?.isWidgetAdded
//                     ? widgetObj?.sectionValue?.isWidgetAdded
//                     : true,
//                   data: [...widgetData, ...response?.data?.result],
//                   duration: widgetObj?.sectionValue?.duration,
//                 },
//               ];
//               let newObj = {
//                 widgetList: response?.data?.result,
//                 section_index: 0,
//                 templateDetails: widgetObj?.templateDetails,
//                 newWidget: true,
//                 authParams: authParams,
//                 global_brands: widgetObj?.templateDetails?.templateBrands
//                   ? widgetObj?.templateDetails?.templateBrands
//                   : null,
//                 brands: widgetObj?.brands,
//                 global_duration: widgetObj?.templateDetails?.templateDuration
//                   ? widgetObj?.templateDetails?.templateDuration
//                   : null,
//                 global_filters: widgetObj?.templateDetails?.templateFilters
//                   ? widgetObj?.templateDetails?.templateFilters
//                   : [],
//                 graphConditionConfig: widgetObj?.graphConditionConfig,
//               };
//               dispatch(
//                 setAddSection(widgetObj?.Section, section, false, newObj)
//               );
//             }
//           }

//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch(setWidgetFetchloader(false));
//       dispatch({ type: "SET_WIDGET_LIBRARY_ARRAY", payload: null });
//     }
//   };
// };

// //api call to set widget maker widget in dashboards section
// export const setAddToDashboard = (authParams, widget_obj) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setDashboardListPreviewLoader(true));
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         // user_id: authParams?.userid,
//         // category_id: authParams?.category_id,
//         // category_name: authParams?.category_name,
//         dashboards: widget_obj?.dashboardList,
//         widget_id: widget_obj?.widget_id_list,
//         utcoffset: getUTCOffset(),
//       };
//       let url = `${Config.config1.api_link}/widget-maker/widget/add-to-dashboard`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch({ type: "SET_DASHBOARD_LIST_SECTION", payload: response });
//           dispatch(setDashboardListPreviewLoader(false));

//           if (response?.data?.status === "successful") {
//             callNotification(
//               "Widget added to dashboard successfully",
//               "success"
//             );
//           }
//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//           dispatch(setDashboardListPreviewLoader(false));
//         });
//     } else {
//       dispatch({ type: "SET_DASHBOARD_LIST_PREVIEW", payload: null });
//     }
//   };
// };

// //api call to set widgetmaker share data
// export const setWidgetMakerShareGraphData = (
//   graphObject,
//   shareCategory,
//   index,
//   share,
//   share_id,
//   password
// ) => {
//   let errorMessage;

//   return async (dispatch) => {
//     let brands = graphObject?.brand_list?.columns
//       ? graphObject?.brand_list?.columns
//       : Array.isArray(graphObject?.brand_list)
//       ? graphObject?.brand_list
//       : graphObject?.brand_list?.selected_brand_groups?.length
//       ? graphObject?.brand_list?.selected_brand_groups
//       : graphObject?.brand_list?.selected_brand_ids;
//     let single_brands = [];
//     let brandsGroupName = [];
//     if (
//       graphObject?.brand_list?.selected_brand_groups?.length <= 0 &&
//       graphObject?.brand_list?.selected_brand_ids?.length <= 0
//     ) {
//       graphObject?.brand_list?.brand_groups?.length > 0
//         ? (brandsGroupName = brands?.[0]?.brand_group_name && [
//             {
//               brand_group_name: brands?.[0]?.brand_group_name,
//             },
//           ])
//         : graphObject?.brand_list?.brand_list?.length > 0 &&
//           single_brands?.push({
//             brand_id: graphObject?.brand_list?.brand_list?.[0]?.brand_id,
//             brand_name: graphObject?.brand_list?.brand_list?.[0]?.brand_name,
//           });
//     } else {
//       if (graphObject?.brand_list?.columns) {
//         brands?.forEach((el) => {
//           if (el?.group) {
//             brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//           }
//         });
//       } else {
//         brands?.forEach((el) => {
//           if (el?.group || el?.brand_group_name)
//             brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//         });
//       }
//     }

//     if (graphObject?.brand_list?.columns) {
//       brands?.forEach((el) => {
//         if (!el?.group) {
//           single_brands.push({
//             brand_id: el?.brand_id ? el?.brand_id : el?.name,
//             brand_name: el?.brand_name
//               ? el?.brand_name
//               : el?.brand_friendly_name,
//           });
//         }
//       });
//     } else if (graphObject?.brand_list?.length > 0) {
//       brands?.forEach((el) => {
//         if (!el?.group) {
//           single_brands.push({
//             brand_id: el?.brand_id ? el?.brand_id : el?.name,
//             brand_name: el?.brand_name
//               ? el?.brand_name
//               : el?.brand_friendly_name,
//           });
//         }
//       });
//     } else {
//       graphObject?.brand_list?.selected_brand_ids?.length > 0 &&
//         graphObject?.brand_list?.selected_brand_ids?.forEach((el) => {
//           if (!el?.group) {
//             single_brands.push({
//               brand_id: el?.brand_id ? el?.brand_id : el?.name,
//               brand_name: el?.brand_name
//                 ? el?.brand_name
//                 : el?.brand_friendly_name,
//             });
//           }
//         });
//     }

//     //clear graph data
//     let templateResponse = share?.sections
//       ? { ...share?.sections }
//       : { ...share?.section };

//     if (
//       templateResponse?.sections?.length >= 0 &&
//       templateResponse?.sections?.[index.section_index]?.widgets?.[
//         index?.widget_index
//       ]
//     ) {
//       delete templateResponse.sections[index.section_index].widgets[
//         index.widget_index
//       ].graphData;
//     } else if (
//       templateResponse?.section?.length >= 0 &&
//       templateResponse?.section?.[0]?.widgets?.[index.widget_index]
//     ) {
//       delete templateResponse.section[0].widgets[index.widget_index].graphData;
//     }
//     //clear graph data end

//     //high chart option data clear start
//     let updateOpData = clearHighChartopData(index, graphObject?.widget_id);
//     dispatch(setOptionHighChart(updateOpData));
//     //high chart option data clear end

//     // modifying x-axis date_aggregation
//     let updatedXais = deepCopy(graphObject.x_axis);
//     if (updatedXais?.date_aggregation) {
//       updatedXais.date_part = updatedXais.date_aggregation;
//     }

//     let body = {
//       share_id: share_id,
//       x_label: graphObject?.x_label, //by default attribute name
//       y_label: graphObject?.y_label, // by default mention count
//       filters: graphObject?.filters,
//       x_axis: updatedXais,
//       y_axes: graphObject?.y_axes,
//       y_series: graphObject?.y_series,
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       comp_brand_list: graphObject?.brand_list?.selected_comp_brand_ids
//         ? graphObject?.brand_list?.selected_comp_brand_ids
//         : null,
//       brand_list:
//         single_brands && single_brands?.[0]?.brand_id ? single_brands : null,
//       start_date: graphObject?.start_date,
//       end_date: graphObject?.end_date,
//       widget_name: graphObject?.widget_name,
//       chart: graphObject?.chart,
//       order_by: graphObject?.order_by,
//       utcoffset: getUTCOffset(),
//       filter_by_data: graphObject?.filter_by_data,
//       filter_by: graphObject?.filter_by,
//       exclude_words:
//         graphObject?.exclude_words?.length > 0
//           ? graphObject?.exclude_words
//           : null,
//       template_type: index?.shareTemplateData?.template_type,
//       complex_filters: graphObject?.complex_filters
//         ? graphObject?.complex_filters
//         : null,
//     };
//     dispatch(setGraphLoader(true));

//     dispatch(
//       setWidgetLoader({
//         value: true,
//         widget_index: index?.widget_index,
//         section_index: index?.section_index,
//         widget_id: graphObject?.widget_id,
//         global: index?.global ? true : false,
//       })
//     );

//     // Adding widget id in the array of panes and templateDetails
//     if (index) {
//       let updatedArray = addDashboardCalledApiList(index);
//       if (index?.shareTemplateData) {
//         dispatch({
//           type: "SET_SHARE_TEMPLATE_DATA",
//           payload: {
//             ...index?.shareTemplateData,
//             dashboard_called_api_list: updatedArray,
//           },
//         });
//       }
//     }

//     let url = `${Config.config1.api_link}/widget-maker/share-chart`;

//     await axios

//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_WIDGET_MAKER_SHARE_CHART",
//           payload: response?.data?.result,
//         });

//         dispatch(
//           setWidgetLoader({
//             value: false,
//             widget_index: index.widget_index,
//             section_index: index.section_index,
//             global: false,
//           })
//         );

//         if (response?.data?.status === "successful") {
//           // let templateResponse = share?.sections
//           //   ? { ...share?.sections }
//           //   : { ...share?.section };

//           if (templateResponse?.sections?.length >= 0) {
//             // To reset offset value in case of global changes
//             if (
//               !graphObject?.offset_flag &&
//               templateResponse?.sections?.[index?.section_index]?.widgets?.[
//                 index?.widget_index
//               ]?.order_by
//             ) {
//               templateResponse.sections[index.section_index].widgets[
//                 index.widget_index
//               ].order_by.offset = 0;
//             }

//             templateResponse.sections[index.section_index].widgets[
//               index.widget_index
//             ].graphData = response?.data?.result;

//             templateResponse.sections[index.section_index].widgets[
//               index.widget_index
//             ].payload = body;
//           } else if (templateResponse?.section?.length >= 0) {
//             // To reset offset value in case of global changes
//             if (
//               !graphObject?.offset_flag &&
//               templateResponse?.section?.[0]?.widgets?.[index?.widget_index]
//                 ?.order_by
//             ) {
//               templateResponse.section[0].widgets[
//                 index.widget_index
//               ].order_by.offset = 0;
//             }

//             templateResponse.section[0].widgets[index.widget_index].graphData =
//               response?.data?.result;

//             templateResponse.section[0].widgets[index.widget_index].payload =
//               body;
//           }

//           dispatch(setGraphLoader(false));
//           dispatch({
//             type: "SET_SHARE_TEMPLATE_DATA",
//             payload: templateResponse,
//           });

//           // delete excecuted api from list
//           if (index) {
//             let updatedArray = deleteDashboardCalledApiList(index);
//             if (index?.shareTemplateData) {
//               dispatch({
//                 type: "SET_SHARE_TEMPLATE_DATA",
//                 payload: {
//                   ...index?.shareTemplateData,
//                   dashboard_called_api_list: updatedArray,
//                 },
//               });
//             }
//           }
//         }

//         if (response?.data?.status === "error") {
//           let templateResponse = share?.sections
//             ? { ...share?.sections }
//             : { ...share?.section };

//           if (templateResponse?.sections?.length > 0) {
//             templateResponse.sections[index.section_index].widgets[
//               index.widget_index
//             ].graphData =
//               response?.data?.error_code === 4
//                 ? "No data found"
//                 : response?.data?.reason;
//           } else if (templateResponse?.section?.length > 0) {
//             templateResponse.section[0].widgets[index.widget_index].graphData =
//               response?.data?.error_code === 4
//                 ? "No data found"
//                 : response?.data?.reason;
//           }
//           dispatch({
//             type: "SET_SHARE_TEMPLATE_DATA",
//             payload: templateResponse,
//           });
//           dispatch(setGraphLoader(false));
//           errorCode?.map((el, i) => {
//             return el.key === response?.data?.error_code
//               ? (errorMessage = el.value)
//               : null;
//           });

//           // callNotification(errorMessage, "error");
//           if (response?.data?.error_code === 9) {
//             sessionExpired(true);
//           }
//           dispatch(setChartLoader(false));

//           // delete excecuted api from list
//           if (index) {
//             let updatedArray = deleteDashboardCalledApiList(index);
//             if (index?.shareTemplateData) {
//               dispatch({
//                 type: "SET_SHARE_TEMPLATE_DATA",
//                 payload: {
//                   ...index?.shareTemplateData,
//                   dashboard_called_api_list: updatedArray,
//                 },
//               });
//             }
//           }
//         }
//       })
//       .catch((error) => {
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           let widget_metadata =
//             index?.section_index >= 0 && index?.shareTemplateData?.sections
//               ? index?.shareTemplateData?.sections?.[index?.section_index]
//                   ?.widgets?.[index?.widget_index]
//               : index?.shareTemplateData?.section?.[0]?.widgets?.[
//                   index?.widget_index
//                 ];
//           let retry_count = widget_metadata?.retry_count
//             ? widget_metadata?.retry_count + 1
//             : 0;
//           if (retry_count > API_RETRY_LIMIT) {
//             let templateResponse = share?.sections
//               ? { ...share?.sections }
//               : { ...share?.section };
//             if (templateResponse?.sections) {
//               templateResponse.sections[index.section_index].widgets[
//                 index.widget_index
//               ].graphData = "Something went wrong";

//               templateResponse.sections[index.section_index].widgets[
//                 index.widget_index
//               ].retry_count = 0;
//             } else if (templateResponse?.section) {
//               templateResponse.section[0].widgets[
//                 index.widget_index
//               ].graphData = "Something went wrong";

//               templateResponse.section[0].widgets[
//                 index.widget_index
//               ].retry_count = 0;
//             }
//             let updatedArray = deleteDashboardCalledApiList(index);
//             templateResponse.dashboard_called_api_list = updatedArray;
//             dispatch({
//               type: "SET_SHARE_TEMPLATE_DATA",
//               payload: templateResponse,
//             });
//           } else {
//             let templateResponse = share?.sections
//               ? { ...share?.sections }
//               : { ...share?.section };
//             if (templateResponse?.sections) {
//               templateResponse.sections[index.section_index].widgets[
//                 index.widget_index
//               ].graphData = null;

//               if (retry_count >= 0) {
//                 templateResponse.sections[index.section_index].widgets[
//                   index.widget_index
//                 ].retry_count = retry_count + 1;
//               } else {
//                 templateResponse.sections[index.section_index].widgets[
//                   index.widget_index
//                 ].retry_count = 0;
//               }
//             } else if (templateResponse?.section) {
//               templateResponse.section[0].widgets[
//                 index.widget_index
//               ].graphData = null;

//               if (retry_count >= 0) {
//                 templateResponse.section[0].widgets[
//                   index.widget_index
//                 ].retry_count = retry_count + 1;
//               } else {
//                 templateResponse.section[0].widgets[
//                   index.widget_index
//                 ].retry_count = 0;
//               }
//             }
//             let updatedArray = deleteDashboardCalledApiList(index);
//             templateResponse.dashboard_called_api_list = updatedArray;
//             dispatch({
//               type: "SET_SHARE_TEMPLATE_DATA",
//               payload: templateResponse,
//             });
//           }
//           if (error.message !== "Network Error") {
//             callNotification(null, "error");
//           }
//         } else {
//           // delete excecuted api from list
//           if (index) {
//             let updatedArray = deleteDashboardCalledApiList(index);
//             if (index?.shareTemplateData) {
//               dispatch({
//                 type: "SET_SHARE_TEMPLATE_DATA",
//                 payload: {
//                   ...index?.shareTemplateData,
//                   dashboard_called_api_list: updatedArray,
//                 },
//               });
//             }
//           }
//         }
//         dispatch(setChartLoader(false));
//         dispatch(setGraphLoader(false));
//       });
//   };
// };
// //api call to set widgetmaker share data
// const getShareDefaultBrands = (graphObject, brands) => {
//   let single_brands = [];
//   let brandsGroupName = [];
//   if (
//     graphObject?.brand_list?.selected_brand_groups?.length <= 0 &&
//     graphObject?.brand_list?.selected_brand_ids?.length <= 0
//   ) {
//     graphObject?.brand_list?.brand_groups?.length > 0
//       ? (brandsGroupName = brands?.[0]?.brand_group_name && [
//           {
//             brand_group_name: brands?.[0]?.brand_group_name,
//           },
//         ])
//       : graphObject?.brand_list?.brand_list?.length > 0 &&
//         single_brands?.push({
//           brand_id: graphObject?.brand_list?.brand_list?.[0]?.brand_id,
//           brand_name: graphObject?.brand_list?.brand_list?.[0]?.brand_name,
//         });
//   } else {
//     if (graphObject?.brand_list?.columns) {
//       brands?.map((el) => {
//         if (el?.group) {
//           brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//         }
//       });
//     } else {
//       brands?.forEach((el) => {
//         if (el?.group || el?.brand_group_name)
//           brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//       });
//     }
//   }

//   if (graphObject?.brand_list?.columns) {
//     brands?.forEach((el) => {
//       if (!el?.group) {
//         single_brands.push({
//           brand_id: el?.brand_id ? el?.brand_id : el?.name,
//           brand_name: el?.brand_name ? el?.brand_name : el?.brand_friendly_name,
//         });
//       }
//     });
//   } else if (graphObject?.brand_list?.length > 0) {
//     brands?.forEach((el) => {
//       if (!el?.group) {
//         single_brands.push({
//           brand_id: el?.brand_id ? el?.brand_id : el?.name,
//           brand_name: el?.brand_name ? el?.brand_name : el?.brand_friendly_name,
//         });
//       }
//     });
//   } else {
//     graphObject?.brand_list?.selected_brand_ids?.length > 0 &&
//       graphObject?.brand_list?.selected_brand_ids?.forEach((el) => {
//         if (!el?.group) {
//           single_brands.push({
//             brand_id: el?.brand_id ? el?.brand_id : el?.name,
//             brand_name: el?.brand_name
//               ? el?.brand_name
//               : el?.brand_friendly_name,
//           });
//         }
//       });
//   }
//   let obj = { single_brands: single_brands, brandsGroupName: brandsGroupName };
//   return obj;
// };
// export const setWidgetMakerSharePageGraphData = (
//   graphObject,
//   shareCategory,
//   index,
//   share,
//   share_id,
//   password
// ) => {
//   let errorMessage;

//   return async (dispatch) => {
//     let brands = graphObject?.brand_list?.columns
//       ? graphObject?.brand_list?.columns
//       : Array.isArray(graphObject?.brand_list)
//       ? graphObject?.brand_list
//       : graphObject?.brand_list?.selected_brand_groups?.length
//       ? graphObject?.brand_list?.selected_brand_groups
//       : graphObject?.brand_list?.selected_brand_ids;

//     let single_brands = [];
//     let brandsGroupName = [];
//     let obj = getShareDefaultBrands(graphObject, brands);
//     if (obj?.single_brands) single_brands = obj?.single_brands;
//     if (obj?.brandsGroupName) brandsGroupName = obj?.brandsGroupName;

//     //clear graph data
//     let templateResponse = share?.sections
//       ? { ...share?.sections }
//       : { ...share?.section };

//     if (
//       templateResponse?.sections?.length >= 0 &&
//       templateResponse?.sections?.[index.section_index]?.widgets?.[
//         index?.widget_index
//       ]
//     ) {
//       delete templateResponse.sections[index.section_index].widgets[
//         index.widget_index
//       ].graphData;
//     } else if (
//       templateResponse?.section?.length >= 0 &&
//       templateResponse?.section?.[0]?.widgets?.[index.widget_index]
//     ) {
//       delete templateResponse.section[0].widgets[index.widget_index].graphData;
//     }
//     //clear graph data end
//     //high chart option data clear start
//     let updateOpData = clearHighChartopData(index, graphObject?.widget_id);
//     dispatch(setOptionHighChart(updateOpData));
//     //high chart option data clear end

//     // modifying x-axis date_aggregation
//     let updatedXais = deepCopy(graphObject.x_axis);
//     if (updatedXais?.date_aggregation) {
//       updatedXais.date_part = updatedXais.date_aggregation;
//     }

//     // Adding widget id in the array of panes and templateDetails
//     if (index) {
//       let updatedArray = addDashboardCalledApiList(index);
//       if (index?.shareTemplateData) {
//         dispatch({
//           type: "SET_SHARE_TEMPLATE_DATA",
//           payload: {
//             ...index?.shareTemplateData,
//             dashboard_called_api_list: updatedArray,
//           },
//         });
//       }
//     }

//     let body = {
//       share_id: share_id,
//       x_label: graphObject?.x_label, //by default attribute name
//       y_label: graphObject?.y_label, // by default mention count
//       filters: graphObject?.filters,
//       x_axis: updatedXais,
//       y_axes: graphObject?.y_axes,
//       y_series: graphObject?.y_series,
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       comp_brand_list: graphObject?.brand_list?.selected_comp_brand_ids
//         ? graphObject?.brand_list?.selected_comp_brand_ids
//         : null,
//       brand_list:
//         single_brands && single_brands?.[0]?.brand_id ? single_brands : null,
//       start_date: graphObject?.start_date,
//       end_date: graphObject?.end_date,
//       widget_name: graphObject?.widget_name,
//       chart: graphObject?.chart,
//       order_by: graphObject?.order_by,
//       utcoffset: getUTCOffset(),
//       filter_by_data: graphObject?.filter_by_data,
//       filter_by: graphObject?.filter_by,
//       data_source: graphObject?.data_source,

//       widget_id: graphObject?.engine === "SP" ? graphObject?.widget_id : null,
//       profile_filters: graphObject?.profile_filters
//         ? graphObject?.profile_filters
//         : null,
//       exclude_words:
//         graphObject?.exclude_words?.length > 0
//           ? graphObject?.exclude_words
//           : null,
//       complex_filters: graphObject?.complex_filters
//         ? graphObject?.complex_filters
//         : null,
//     };
//     let url = `${Config.config1.api_link}/widget-maker/${
//       "share-" + graphObject?.data_source + "-chart"
//     }`;
//     dispatch(setGraphLoader(true));
//     dispatch(
//       setWidgetLoader({
//         value: true,
//         widget_index: index?.widget_index,
//         section_index: index?.section_index,
//         widget_id: graphObject?.widget_id,
//         global: index?.global ? true : false,
//       })
//     );
//     await axios

//       .post(url, body)
//       .then((response) => {
//         dispatch(setGraphLoader(false));
//         dispatch(
//           setWidgetLoader({
//             value: false,
//             widget_index: index.widget_index,
//             section_index: index.section_index,
//             global: false,
//           })
//         );

//         if (response?.data?.status === "successful") {
//           let templateResponse = share?.sections
//             ? { ...share?.sections }
//             : { ...share?.section };

//           if (templateResponse?.sections?.length > 0) {
//             // To update metadata for profile_filters
//             templateResponse.sections[index.section_index].widgets[
//               index.widget_index
//             ].profile_filters = graphObject?.profile_filters;

//             templateResponse.sections[index.section_index].widgets[
//               index.widget_index
//             ].graphData = response?.data?.result;

//             templateResponse.sections[index.section_index].widgets[
//               index.widget_index
//             ].payload = body;
//           } else if (templateResponse?.section?.length > 0) {
//             // To update metadata for profile_filters
//             templateResponse.section[0].widgets[
//               index.widget_index
//             ].profile_filters = graphObject?.profile_filters;

//             templateResponse.section[0].widgets[index.widget_index].graphData =
//               response?.data?.result;

//             if (
//               templateResponse.section[0].widgets[index.widget_index]
//                 ?.data_source === "realtime" &&
//               templateResponse.template_id === "000-000-228"
//             ) {
//               templateResponse.section[0].widgets[
//                 index.widget_index
//               ].persist_graphdata = response?.data?.result;
//             }

//             templateResponse.section[0].widgets[index.widget_index].payload =
//               body;
//           }

//           dispatch({
//             type: "SET_SHARE_TEMPLATE_DATA",
//             payload: templateResponse,
//           });

//           // delete excecuted api from list
//           if (index) {
//             let updatedArray = deleteDashboardCalledApiList(index);
//             if (index?.shareTemplateData) {
//               dispatch({
//                 type: "SET_SHARE_TEMPLATE_DATA",
//                 payload: {
//                   ...index?.shareTemplateData,
//                   dashboard_called_api_list: updatedArray,
//                 },
//               });
//             }
//           }
//         }

//         if (response?.data?.status === "error") {
//           let templateResponse = share?.sections
//             ? { ...share?.sections }
//             : { ...share?.section };

//           if (templateResponse?.sections?.length > 0) {
//             templateResponse.sections[index.section_index].widgets[
//               index.widget_index
//             ].graphData = response?.data?.reason;
//           } else if (templateResponse?.section?.length > 0) {
//             templateResponse.section[0].widgets[index.widget_index].graphData =
//               response?.data?.reason;
//           }
//           dispatch({
//             type: "SET_SHARE_TEMPLATE_DATA",
//             payload: templateResponse,
//           });

//           errorCode?.map((el, i) => {
//             return el.key === response?.data?.error_code
//               ? (errorMessage = el.value)
//               : null;
//           });

//           if (response?.data?.error_code === 9) {
//             sessionExpired(true);
//           }
//           dispatch(setChartLoader(false));

//           // delete excecuted api from list
//           if (index) {
//             let updatedArray = deleteDashboardCalledApiList(index);
//             if (index?.shareTemplateData) {
//               dispatch({
//                 type: "SET_SHARE_TEMPLATE_DATA",
//                 payload: {
//                   ...index?.shareTemplateData,
//                   dashboard_called_api_list: updatedArray,
//                 },
//               });
//             }
//           }
//         }
//       })
//       .catch((error) => {
//         // delete excecuted api from list
//         if (index) {
//           let updatedArray = deleteDashboardCalledApiList(index);
//           if (index?.shareTemplateData) {
//             dispatch({
//               type: "SET_SHARE_TEMPLATE_DATA",
//               payload: {
//                 ...index?.shareTemplateData,
//                 dashboard_called_api_list: updatedArray,
//               },
//             });
//           }
//         }

//         // To show no data found in case of 500 or else
//         // let templateResponse = share?.sections
//         //   ? { ...share?.sections }
//         //   : { ...share?.section };

//         // if (templateResponse?.sections?.length > 0) {
//         //   templateResponse.sections[index.section_index].widgets[
//         //     index.widget_index
//         //   ].graphData = "No Data Found";
//         // } else if (templateResponse?.section?.length > 0) {
//         //   templateResponse.section[0].widgets[index.widget_index].graphData =
//         //     "No Data Found";
//         // }

//         dispatch({
//           type: "SET_SHARE_TEMPLATE_DATA",
//           payload: templateResponse,
//         });

//         // Request aborted
//         if (error.message !== "Request aborted") {
//           // delete excecuted api from list
//           if (index) {
//             let updatedArray = deleteDashboardCalledApiList(index);
//             if (index?.shareTemplateData) {
//               dispatch({
//                 type: "SET_SHARE_TEMPLATE_DATA",
//                 payload: {
//                   ...index?.shareTemplateData,
//                   dashboard_called_api_list: updatedArray,
//                 },
//               });
//             }
//           }

//           callNotification(null, "error");
//         }
//         dispatch(setChartLoader(false));
//       });
//   };
// };
// export const setWidgetMakerTrandArray = (value) => {
//   return (dispatch) => {
//     dispatch({ type: "SET_POST_CARDS_TRENDS", payload: value });
//   };
// };
// export const setTrendsData = (value) => {
//   return (dispatch) => {
//     dispatch({ type: "SET_TRENDS_DATA", payload: value });
//   };
// };
// export const setDashboardTrendsFlag = (value) => {
//   return (dispatch) => {
//     dispatch({ type: "SET_DASHBOARD_TRENDS_FLAG", payload: value });
//   };
// };
// //api call to set support post card Trends data
// export const setWidgetMakerPostCardTrends = (
//   authParams,
//   graphObject,
//   tab_array
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         brand_id: graphObject?.brand_id,
//         card_type: graphObject?.card_type,
//         content_id: graphObject?.content_id,
//         author_id: graphObject?.author_id,
//         post_id: graphObject?.post_id,
//         retweet_id: graphObject?.retweet_id,
//         reply_id: graphObject?.reply_id,
//         channel_group_id: graphObject?.channel_group_id,
//         tag_id: graphObject?.tag_id,
//         widget_id: graphObject?.widget_id,
//         utcOffset: graphObject?.utcOffset,
//         isAll: graphObject?.isAll,
//         isVerified: graphObject?.isVerified,
//         sentimentType: graphObject?.sentimentType,
//         trends_duration: graphObject?.trends_duration,
//         isreply: graphObject?.isreply,
//         isretweet: graphObject?.isretweet,
//         isreplywmedia: graphObject?.isreplywmedia,
//         order_by: {
//           attribute: graphObject?.attribute ? graphObject?.attribute : null,
//           sort_order: graphObject?.sort_order ? graphObject?.sort_order : null,
//           offset: graphObject?.offset,
//         },
//         uniqueid: graphObject?.uniqueid,
//       };
//       let url = `${Config.config1.api_link}/graph/post-cards/trends`;
//       dispatch(setTrendsLoader(true));
//       let arr = tab_array ? [...tab_array] : [];
//       let index = arr?.findIndex(
//         (el) => el?.widget_id === graphObject?.widget_id
//       );
//       if (arr?.[index]) arr[index].widget_loader = true;
//       dispatch({ type: "SET_POST_CARDS_TRENDS", payload: arr });
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch(setTrendsLoader(false));
//           if (response?.data?.status === "successful") {
//             if (
//               graphObject?.widget_id == "0" ||
//               graphObject?.widget_id == "1"
//             ) {
//               if (document.getElementById("TreandsChartsContainer")) {
//                 document
//                   .getElementById("TreandsChartsContainer")
//                   .scrollTo(0, 15);
//               }
//             }
//             let arr = tab_array ? [...tab_array] : [];
//             let index = arr?.findIndex(
//               (el) => el?.widget_id === graphObject?.widget_id
//             );
//             arr[index].data = response?.data?.result;
//             arr[index].widget_loader = false;
//             dispatch({ type: "SET_POST_CARDS_TRENDS", payload: arr });
//           }
//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_POST_CARDS_TRENDS", payload: null });
//       dispatch(setGraphLoader(false));
//     }
//   };
// };

// //api call to set support post card Trends data for share lik
// export const setWidgetMakerPostCardShareTrends = (
//   authParams,
//   graphObject,
//   tab_array
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (authParams) {
//       let body = {
//         category_id: authParams?.id,
//         category_name: authParams?.name,
//         brand_id: graphObject?.brand_id,
//         card_type: graphObject?.card_type,
//         content_id: graphObject?.content_id,
//         author_id: graphObject?.author_id,
//         post_id: graphObject?.post_id,
//         retweet_id: graphObject?.retweet_id,
//         reply_id: graphObject?.reply_id,
//         channel_group_id: graphObject?.channel_group_id,
//         tag_id: graphObject?.tag_id,
//         widget_id: graphObject?.widget_id,
//         utcOffset: graphObject?.utcOffset,
//         isAll: graphObject?.isAll,
//         isVerified: graphObject?.isVerified,
//         sentimentType: graphObject?.sentimentType,
//         trends_duration: graphObject?.trends_duration,
//         isreply: graphObject?.isreply,
//         isretweet: graphObject?.isretweet,
//         isreplywmedia: graphObject?.isreplywmedia,
//         order_by: {
//           attribute: graphObject?.attribute ? graphObject?.attribute : null,
//           sort_order: graphObject?.sort_order ? graphObject?.sort_order : null,
//           offset: graphObject?.offset,
//         },
//         uniqueid: graphObject?.uniqueid,
//       };
//       let url = `${Config.config1.api_link}/graph/share-trends`;
//       dispatch(setTrendsLoader({ value: true, id: body?.widget_id }));
//       let arr = tab_array ? [...tab_array] : [];
//       let index = arr?.findIndex(
//         (el) => el?.widget_id === graphObject?.widget_id
//       );
//       arr[index].widget_loader = true;
//       dispatch({ type: "SET_POST_CARDS_TRENDS", payload: arr });
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch(setTrendsLoader({ value: false, id: body?.widget_id }));
//           if (response?.data?.status === "successful") {
//             let arr = tab_array ? [...tab_array] : [];
//             let index = arr?.findIndex(
//               (el) => el?.widget_id === graphObject?.widget_id
//             );
//             arr[index].data = response?.data?.result;
//             arr[index].widget_loader = false;
//             dispatch({ type: "SET_POST_CARDS_TRENDS", payload: arr });
//           }
//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_POST_CARDS_TRENDS", payload: null });
//       dispatch(setGraphLoader(false));
//     }
//   };
// };

// //api call to set competitor brands
// export const setCompetitorBrands = (authParams, categoryId) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//       };
//       let url = `${Config.config1.api_link}/user/competition-brand-group`;

//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch({ type: "SET_COMPETITOR_BRANDS", payload: response });
//           if (response?.data?.status === "successful") {
//           }
//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//         })
//         .catch((error) => {
//           dispatch(setGlobalLoader(false));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_COMPETITOR_BRANDS", payload: null });
//     }
//   };
// };

// //api call to set brand based profiles
// export const setProfileList = (
//   authParams,
//   templatefetchRes,
//   paneObject,
//   type,
//   section_id
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setProfileLoader(true));
//     let twoMonthsDuration = getCustomizedDate(6, "Days");
//     let defaultDuration = {
//       from:
//         moment(twoMonthsDuration?.date?.[0]).format("YYYY/MM/DD") +
//         " " +
//         twoMonthsDuration?.time?.startTime,
//       to:
//         moment(twoMonthsDuration?.date?.[1]).format("YYYY/MM/DD") +
//         " " +
//         twoMonthsDuration?.time?.endTime,
//     };

//     let brands = paneObject?.templateGlobalBrands
//       ? paneObject?.templateGlobalBrands
//       : templatefetchRes?.brands?.columns
//       ? templatefetchRes?.brands?.columns
//       : templatefetchRes?.brands
//       ? templatefetchRes?.brands
//       : paneObject?.global_dashboard_brands?.columns
//       ? paneObject?.global_dashboard_brands?.columns
//       : paneObject?.global_dashboard_brands
//       ? paneObject?.global_dashboard_brands
//       : paneObject?.singleBrands;

//     let single_brands = [];
//     let brandsGroupName = [];

//     if (
//       !templatefetchRes?.isBrandModified &&
//       !paneObject?.templateGlobalBrands &&
//       !paneObject?.global_dashboard_brands
//     ) {
//       brandsGroupName =
//         brands && brands?.[0]?.brand_list
//           ? [
//               {
//                 brand_group_name: brands?.[0]?.brand_group_name,
//               },
//             ]
//           : single_brands?.push({
//               brand_id:
//                 brands && brands?.[0]?.brand_id && brands?.[0]?.brand_id,
//               brand_name:
//                 brands && brands?.[0]?.brand_name && brands?.[0]?.brand_name,
//             });
//     } else {
//       if (brands && brands?.[0]?.competitor) {
//         single_brands.push({
//           brand_id: brands?.[0]?.name,
//           brand_name: brands?.[0]?.brand_name,
//         });
//       } else {
//         brands &&
//           brands?.map((el) => {
//             if (el?.group || el?.brand_group_name) {
//               brandsGroupName.push({
//                 brand_group_name: el?.brand_group_name,
//               });
//             }
//           });

//         brands?.forEach((el) => {
//           if (!el?.group) {
//             single_brands.push({
//               brand_id: el?.brand_id ? el?.brand_id : el?.name,
//               brand_name: el?.brand_name
//                 ? el?.brand_name
//                 : el?.brand_friendly_name,
//             });
//           }
//         });
//       }
//     }

//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         start_date: templatefetchRes?.start_date
//           ? templatefetchRes?.start_date
//           : paneObject?.global_dashboard_duration?.from
//           ? paneObject?.global_dashboard_duration?.from
//           : defaultDuration?.from,
//         end_date: templatefetchRes?.end_date
//           ? templatefetchRes?.end_date
//           : paneObject?.global_dashboard_duration?.to
//           ? paneObject?.global_dashboard_duration?.to
//           : defaultDuration?.to,
//         brand_list:
//           single_brands && single_brands?.[0]?.brand_id ? single_brands : null,
//         brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//         filters: [],
//         hidden_filter: templatefetchRes?.hidden_filter,
//         quick_filter_key: templatefetchRes?.quick_filter,
//       };
//       let url = `${Config.config1.api_link}/template/search-quick-filter`;

//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch({ type: "SET_PROFILE_LIST", payload: response });
//           if (response?.data?.status === "successful") {
//             //campaign dashboard through url
//             let quickFilterIndex = response?.data?.result?.findIndex(
//               (el) => el?.id?.toString() === authParams?.quickFilterValue
//             );
//             let quickFilterMetaData =
//               quickFilterIndex >= 0
//                 ? response?.data?.result?.[quickFilterIndex]
//                 : null;

//             if (
//               templatefetchRes?.quick_filter?.toLowerCase() === "campaignid"
//             ) {
//               let start_date = quickFilterMetaData?.start_date
//                 ? moment(quickFilterMetaData?.start_date)
//                 : response?.data?.result &&
//                   moment(response?.data?.result?.[0]?.start_date);
//               let end_date = quickFilterMetaData?.end_date
//                 ? moment(quickFilterMetaData?.end_date)
//                 : response?.data?.result &&
//                   moment(response?.data?.result?.[0]?.end_date);
//               let dateDiff;

//               if (
//                 (response?.data?.result?.[0]?.start_date &&
//                   response?.data?.result?.[0]?.end_date) ||
//                 (quickFilterMetaData?.start_date &&
//                   quickFilterMetaData?.end_date)
//               ) {
//                 dateDiff = end_date.diff(start_date, "days") + 1;
//               }

//               let final_end_date;
//               let currentEndDate = moment(new Date()).format("YYYY/MM/DD H:mm");
//               if (
//                 response?.data?.result?.[0]?.start_date < currentEndDate &&
//                 response?.data?.result?.[0]?.end_date > currentEndDate
//               ) {
//                 final_end_date = currentEndDate;
//               }

//               // get date difference for which end date is greater than current date
//               let final_date_diff;
//               if (start_date && final_end_date) {
//                 final_date_diff =
//                   moment(final_end_date).diff(start_date, "days") + 1;
//               }

//               // if condition to get start_date in case of final_end_date
//               let final_start_date;
//               if (
//                 final_date_diff < 7 &&
//                 response?.data?.result?.[0]?.end_date > currentEndDate
//               ) {
//                 final_start_date = moment(
//                   response?.data?.result?.[0]?.start_date
//                 ).format("YYYY/MM/DD H:mm");
//               } else if (
//                 final_date_diff > 7 &&
//                 response?.data?.result?.[0]?.end_date > currentEndDate
//               ) {
//                 final_start_date = moment(final_end_date)
//                   .subtract(6, "d")
//                   .set({ hour: "00", minute: "00" })
//                   .format("YYYY/MM/DD HH:mm");
//               } else if (
//                 dateDiff > 7 &&
//                 response?.data?.result?.[0]?.end_date < currentEndDate
//               ) {
//                 //check if diff is more than 7, then make the selected date 7 days, i.e end date -7
//                 final_start_date = quickFilterMetaData?.end_date
//                   ? moment(quickFilterMetaData?.end_date)
//                       .subtract(6, "d")
//                       .set({ hour: "00", minute: "00" })
//                       .format("YYYY/MM/DD HH:mm")
//                   : moment(response?.data?.result?.[0]?.end_date)
//                       .subtract(6, "d")
//                       .set({ hour: "00", minute: "00" })
//                       .format("YYYY/MM/DD HH:mm");
//               }

//               let diffDuration = {
//                 from: final_start_date
//                   ? final_start_date
//                   : quickFilterMetaData?.start_date
//                   ? quickFilterMetaData?.start_date
//                   : response?.data?.result &&
//                     response?.data?.result?.[0]?.start_date,
//                 to: final_end_date
//                   ? final_end_date
//                   : quickFilterMetaData?.end_date
//                   ? quickFilterMetaData?.end_date
//                   : response?.data?.result &&
//                     response?.data?.result?.[0]?.end_date,
//               };

//               let duration = {
//                 from: quickFilterMetaData?.start_date
//                   ? quickFilterMetaData?.start_date
//                   : response?.data?.result &&
//                     response?.data?.result?.[0]?.start_date
//                   ? response?.data?.result?.[0]?.start_date
//                   : moment(
//                       moment()?.subtract(6, "days")?.format("YYYY-MM-DD") +
//                         " 00:00"
//                     )?.format("YYYY/MM/DD HH:mm"),
//                 to: quickFilterMetaData?.end_date
//                   ? quickFilterMetaData?.end_date
//                   : response?.data?.result &&
//                     response?.data?.result?.[0]?.end_date
//                   ? response?.data?.result?.[0]?.end_date
//                   : moment(new Date()).format("YYYY/MM/DD HH:mm"),
//               };

//               dispatch(
//                 setCampaignDate(duration, paneObject?.panes, paneObject?.index)
//               );
//               if (!authParams?.startDate) {
//                 //priority to url campaign dashboard
//                 let paneObj = {
//                   panes: paneObject?.panes,
//                   index: paneObject?.index,
//                   duration: dateDiff ? diffDuration : duration,
//                   templateGlobalDuration: dateDiff ? diffDuration : duration,
//                 };
//                 paneObject.global_dashboard_duration = dateDiff
//                   ? diffDuration
//                   : duration;
//                 dispatch(setPaneDuration(paneObj, "global_dashboard"));
//               }
//             }

//             let quick_filter = authParams?.quickFilterValue
//               ? {
//                   attribute:
//                     templatefetchRes.quick_filter?.toLowerCase() === "accountid"
//                       ? "settingid"
//                       : templatefetchRes?.quick_filter?.toLowerCase() ===
//                         "category"
//                       ? "categoryid"
//                       : templatefetchRes.quick_filter?.toLowerCase(),
//                   type: "varchar",
//                   columns: [
//                     {
//                       name: authParams?.quickFilterValue?.toString(),
//                       type: "include",
//                     },
//                   ],
//                 }
//               : response?.data?.result?.[0]?.id
//               ? {
//                   attribute:
//                     templatefetchRes.quick_filter?.toLowerCase() === "accountid"
//                       ? "settingid"
//                       : templatefetchRes?.quick_filter?.toLowerCase() ===
//                         "category"
//                       ? "categoryid"
//                       : templatefetchRes.quick_filter?.toLowerCase(),
//                   type: "varchar",
//                   columns: [
//                     {
//                       name:
//                         templatefetchRes?.quick_filter === "Category"
//                           ? (response?.data?.result?.[0]?.id).toString()
//                           : (response?.data?.result?.[0]?.id).toString(),
//                       type: "include",
//                       display_name: response?.data?.result?.[0]?.name,
//                     },
//                   ],
//                 }
//               : null;

//             let panes_filters = paneObject?.panes?.[paneObject?.index]?.filters
//               ? paneObject?.panes?.[paneObject?.index]?.filters
//               : templatefetchRes?.filters;

//             // let saved_similar_hidden_filter_obj = getSimilarStaticFilter(
//             //   hiddenFilter,
//             //   panes_filters,
//             //   []
//             // );

//             // let saved_similar_hidden_filter =
//             //   saved_similar_hidden_filter_obj?.filter;

//             // let hiddenfilterIndex = -1;
//             // let saved_similar_hidden_filter = [];
//             // if (hiddenFilter?.length && saved_filters?.length) {
//             //   hiddenfilterIndex = saved_filters?.findIndex(
//             //     (el) => el.attribute === hiddenFilter?.[0]?.attribute
//             //   );
//             //   if (hiddenfilterIndex >= 0) {
//             //     saved_similar_hidden_filter = saved_filters?.[hiddenfilterIndex]
//             //       ? [saved_filters?.[hiddenfilterIndex]]
//             //       : [];
//             //   }
//             // }

//             // let saved_similar_quick_filter_obj = getSimilarStaticFilter(
//             //   [],
//             //   panes_filters,
//             //   quick_filter
//             // );

//             // let saved_similar_quick_filter =
//             //   saved_similar_quick_filter_obj?.filter;

//             // let quickFilterAttribute =
//             //   templatefetchRes.quick_filter === "AccountID"
//             //     ? "SettingID"
//             //     : templatefetchRes?.quick_filter === "Category"
//             //     ? "CategoryID"
//             //     : templatefetchRes.quick_filter;

//             // let updatePanesFilters =
//             //   panes_filters?.length && hiddenFilter?.length
//             //     ? panes_filters?.filter(
//             //         (el) =>
//             //           el?.attribute !== quickFilterAttribute &&
//             //           el?.attribute !== hiddenFilter?.[0]?.attribute
//             //       )
//             //     : quickFilterAttribute
//             //     ? panes_filters?.filter(
//             //         (el) => el?.attribute !== quickFilterAttribute
//             //       )
//             //     : panes_filters;
//             // let final_pane_filters =
//             //   panes_filters && panes_filters?.length
//             //     ? updatePanesFilters
//             //       ? [...updatePanesFilters, ...quickAndHiddenFilter]
//             //       : [...panes_filters, ...quickAndHiddenFilter]
//             //     : [...quickAndHiddenFilter];
//             // if (saved_similar_hidden_filter?.length) {
//             //   final_pane_filters = [
//             //     ...final_pane_filters,
//             //     ...saved_similar_hidden_filter,
//             //   ];
//             // }
//             // if (saved_similar_quick_filter?.length) {
//             //   final_pane_filters = [
//             //     ...final_pane_filters,
//             //     ...saved_similar_quick_filter,
//             //   ];
//             // }

//             let final_pane_filters =
//               panes_filters && panes_filters?.length ? [...panes_filters] : [];
//             let template = {
//               ...templatefetchRes,
//               profiles: response?.data?.result,
//               saved_filters: templatefetchRes?.filters
//                 ? templatefetchRes?.filters
//                 : templatefetchRes?.saved_filters
//                 ? templatefetchRes?.saved_filters
//                 : [],
//               quick_filter_value: quick_filter,
//               filters: templatefetchRes?.template_id ? final_pane_filters : [],
//               competition_aggregation:
//                 templatefetchRes?.competition_aggregation,
//             };
//             dispatch(
//               setTemplateInPane(template, paneObject?.index, paneObject?.panes)
//             );

//             dispatch(
//               setSelectProfileId(
//                 quickFilterMetaData?.name
//                   ? quickFilterMetaData?.name
//                   : response?.data?.result
//                   ? response?.data?.result?.[0]?.name
//                   : ""
//               )
//             );
//             dispatch(
//               setProfileImage(
//                 response?.data?.result
//                   ? response?.data?.result?.[0]?.profile_icon_url
//                   : ""
//               )
//             );

//             dispatch(
//               setChannelImage(
//                 templatefetchRes.hidden_filter && response?.data?.result
//                   ? response?.data?.result?.[0]?.channel
//                   : null
//               )
//             );
//             if (paneObject?.isScheduleReportBrandsChange) {
//               // Need to update quick filter in case of scheduling
//               let qk_filter = response?.data?.result?.[0]?.id
//                 ? {
//                     attribute:
//                       templatefetchRes.quick_filter?.toLowerCase() ===
//                       "accountid"
//                         ? "settingid"
//                         : templatefetchRes?.quick_filter?.toLowerCase() ===
//                           "category"
//                         ? "categoryid"
//                         : templatefetchRes.quick_filter?.toLowerCase(),
//                     type: "varchar",
//                     columns: [
//                       {
//                         name:
//                           templatefetchRes?.quick_filter === "Category"
//                             ? (response?.data?.result?.[0]?.id).toString()
//                             : (response?.data?.result?.[0]?.id).toString(),
//                         type: "include",
//                       },
//                     ],
//                     name: response?.data?.result?.[0]?.name,
//                     profile_icon_url:
//                       response?.data?.result?.[0]?.profile_icon_url,
//                   }
//                 : null;
//               dispatch(
//                 setScheduleQuickFilter(qk_filter, paneObject?.scheduleObj)
//               );
//             } else if (type === "global_brands") {
//               !authParams?.ppt &&
//                 dispatch(setPaneBrands(paneObject, "global_dashboard"));
//               dispatch(
//                 setClearGraphData(
//                   paneObject?.index,
//                   paneObject?.panes,
//                   paneObject
//                 )
//               );
//               // dispatch(setOptionHighChart(null));
//               dispatch(
//                 setGlobalFilter(
//                   null,
//                   paneObject?.index,
//                   paneObject?.panes,
//                   paneObject
//                 )
//               );
//             } else if (type === "global_duration") {
//               dispatch(setPaneDuration(paneObject, "global_dashboard"));
//               dispatch(
//                 setClearGraphData(
//                   paneObject?.index,
//                   paneObject?.panes,
//                   paneObject
//                 )
//               );
//               dispatch(
//                 setGlobalFilter(
//                   null,
//                   paneObject?.index,
//                   paneObject?.panes,
//                   paneObject
//                 )
//               );
//               //  dispatch(setOptionHighChart(null));
//             } else {
//               // dispatch(setPaneOffset(0, paneObject?.index, paneObject?.panes));
//               paneObject.AllSection = templatefetchRes?.sections;
//               paneObject.onlyWidgets = templatefetchRes?.section_id
//                 ? true
//                 : false;
//               !urlParams?.ppt &&
//                 dispatch(
//                   setFetchSectionData(
//                     authParams,
//                     paneObject?.newSection
//                       ? paneObject?.newSection
//                       : templatefetchRes?.sections
//                       ? templatefetchRes?.sections?.[0]?.section_id
//                       : templatefetchRes?.section_id,
//                     paneObject,
//                     templatefetchRes?.template_id
//                   )
//                 );

//               !authParams?.ppt &&
//                 dispatch(
//                   setIsAccessType(
//                     templatefetchRes?.access_type,
//                     paneObject?.panes,
//                     paneObject?.index
//                   )
//                 );
//             }

//             if (!templatefetchRes?.template_id?.startsWith("000-")) {
//               // call Search-Profile API
//               dispatch(
//                 getProfileFilterList(authParams, templatefetchRes, paneObject)
//               );
//             }
//           }
//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             callNotification(errorMessage, "error");
//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//           }
//           dispatch(setProfileLoader(false));
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//           dispatch(setProfileLoader(false));
//         });
//     } else {
//       dispatch({ type: "SET_PROFILE_LIST", payload: null });
//     }
//   };
// };

// //api call to set brand based profiles
// export const setPredefinedWidgets = () => {
//   let errorMessage;
//   return async (dispatch) => {
//     let url = `${Config.config1.api_link}/configuration/predefined-widgets`;

//     await axios

//       .post(url)
//       .then((response) => {
//         dispatch({ type: "SET_PREDEFINED_WIDGETS", payload: response });
//         if (response?.data?.status === "successful") {
//         }
//         if (response?.data?.status === "error") {
//           errorCode?.map((el, i) => {
//             return el.key === response?.data?.error_code
//               ? (errorMessage = el.value)
//               : null;
//           });

//           callNotification(errorMessage, "error");
//           if (response?.data?.error_code === 9) {
//             sessionExpired(true);
//           }
//         }
//       })
//       .catch((error) => {
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// //api call to set brand based profiles
// export const setPageChart = (authParams, graphObject, widget, quick) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let brands = graphObject?.brands?.columns
//       ? graphObject?.brands?.columns
//       : graphObject?.brands;

//     let single_brands = [];
//     let brandsGroupName = [];

//     if (!widget) {
//       dispatch({ type: "SET_WIDGET_PREVIEW", payload: null });
//       dispatch(setWidgetPreviewLoader(true));
//     }

//     if (!graphObject?.isBrandModified) {
//       brandsGroupName =
//         brands && brands?.[0]?.brand_list
//           ? [
//               {
//                 brand_group_name: brands?.[0]?.brand_group_name,
//               },
//             ]
//           : single_brands?.push({
//               brand_id:
//                 brands && brands?.[0]?.brand_id && brands?.[0]?.brand_id,
//               brand_name:
//                 brands && brands?.[0]?.brand_name && brands?.[0]?.brand_name,
//             });
//     } else {
//       if (brands && brands?.[0]?.competitor) {
//         single_brands.push({
//           brand_id: brands?.[0]?.name,
//           brand_name: brands?.[0]?.brand_name,
//         });
//       } else {
//         brands &&
//           brands?.forEach((el) => {
//             if (el?.group || el?.brand_group_name) {
//               brandsGroupName.push({
//                 brand_group_name: el?.brand_group_name,
//               });
//             }
//           });

//         brands?.forEach((el) => {
//           if (!el?.group) {
//             single_brands.push({
//               brand_id: el?.brand_id ? el?.brand_id : el?.name,
//               brand_name: el?.brand_name
//                 ? el?.brand_name
//                 : el?.brand_friendly_name,
//             });
//           }
//         });
//       }
//     }

//     // modifying x-axis date_aggregation
//     let updatedXais = deepCopy(graphObject.x_axis);
//     if (updatedXais?.date_aggregation) {
//       updatedXais.date_part = updatedXais.date_aggregation;
//     }

//     // Adding widget id in the array of panes and templateDetails
//     if (widget) {
//       let updatedArray = addDashboardCalledApiList(widget);
//       if (widget?.templateFilter) {
//         let templateDetails = global.template_details
//           ? global.template_details
//           : widget?.template_details;
//         dispatch(
//           setTemplateDetails(templateDetails, {
//             dashboard_called_api_list: updatedArray,
//           })
//         );
//       } else {
//         dispatch(
//           setDashboardCalledApiList(
//             updatedArray,
//             widget?.panes,
//             widget?.pane_index
//           )
//         );
//       }
//     }

//     widget &&
//       dispatch(
//         setWidgetLoader({
//           value: true,
//           widget_index: widget?.widget_index,
//           section_index: widget?.section_index,
//           widget_id: widget?.widget_id,
//           global: widget?.global ? true : false,
//         })
//       );

//     widget ? dispatch(setGraphLoader(true)) : dispatch(setChartLoader(true));

//     // panes graphData clear
//     if (widget) {
//       if (widget?.templateFilter) {
//         dispatch(
//           setClearTemplateWidgetGraphData(
//             widget?.section,
//             widget?.section_index,
//             widget?.widget_index
//           )
//         );
//       } else {
//         dispatch(
//           setClearWidgetGraphData(
//             widget?.panes,
//             widget?.pane_index,
//             widget?.section_index,
//             widget?.widget_index
//           )
//         );
//       }
//     }
//     //panes graph data clear end

//     //high chart option data clear start
//     let updateOpData = clearHighChartopData(widget, graphObject?.widget_id);
//     dispatch(setOptionHighChart(updateOpData));
//     //high chart option data clear end

//     let body = {
//       theme_type: authParams?.theme_type, //Dark Theme Type for 1 and Light Theme Type 0
//       ptoken: authParams?.ptoken,
//       x_label: graphObject?.x_label, //by default attribute name
//       y_label: graphObject?.y_label, // by default mention count
//       filters: graphObject?.filters?.length
//         ? [...graphObject?.filters]
//         : graphObject?.filters,
//       x_axis: updatedXais,
//       y_axes: graphObject?.y_axes?.length > 0 ? graphObject?.y_axes : null,
//       y_series: graphObject?.y_series,
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       comp_brand_list: brands?.[0]?.competitor
//         ? brands?.[0]?.competitorList
//         : null,
//       brand_list:
//         single_brands && single_brands?.[0]?.brand_id ? single_brands : null,
//       start_date: graphObject?.start_date,
//       end_date: graphObject?.end_date,
//       widget_name: graphObject?.widget_name,
//       chart: graphObject?.chart,
//       order_by: graphObject?.order_by,
//       utcoffset: getUTCOffset(),
//       data_source: graphObject?.data_source,
//       widget_id: graphObject?.engine === "SP" ? graphObject?.widget_id : null,
//       engine: graphObject?.engine,
//       exclude_words:
//         graphObject?.exclude_words?.length > 0
//           ? graphObject?.exclude_words
//           : null,
//       profile_filters: graphObject?.profile_filters,
//       complex_filters: graphObject?.complex_filters
//         ? graphObject?.complex_filters
//         : null,
//     };
//     if (graphObject?.isNetworkChartV2) {
//       body.widget_id = "NG-4";
//     }
//     let url = `${Config.config1.api_link}/widget-maker/${
//       graphObject?.data_source + "-chart"
//     }`;

//     await axios

//       .post(url, body)
//       .then((response) => {
//         let timer = null;
//         dispatch({ type: "SET_PAGE_CHART", payload: response });
//         dispatch({
//           type: "SET_WIDGET_MAKER_CHART",
//           payload: response?.data?.result
//             ? response?.data?.result
//             : response?.data?.reason,
//         });
//         dispatch(setSectionLoader({ value: false, widget_id: null }));

//         widget &&
//           dispatch(
//             setWidgetLoader({
//               value: false,
//               widget_index: null,
//               section_index: null,
//               global: false,
//             })
//           );
//         widget
//           ? dispatch(setGraphLoader(false))
//           : dispatch(setChartLoader(false));

//         if (response?.data?.status === "successful") {
//           //import widget in dashboard

//           !widget &&
//             dispatch({
//               type: "SET_WIDGET_PREVIEW",
//               payload: {
//                 chart_data: response?.data?.result && {
//                   ...response?.data?.result,
//                 },
//                 metadata: graphObject && { ...graphObject },
//               },
//             });

//           if (!widget) {
//             timer = setTimeout(() => {
//               dispatch(setWidgetPreviewLoader(false));
//             }, 500);
//           }

//           widget?.templateFilter
//             ? dispatch(
//                 setTemplateWidgetData(
//                   response?.data?.result,
//                   widget?.section,
//                   widget?.section_index,
//                   widget?.widget_index,
//                   graphObject
//                 )
//               )
//             : widget &&
//               dispatch(
//                 setWidgetGraphData(
//                   response?.data?.result,
//                   widget?.pane_index,
//                   widget?.panes,
//                   widget?.section_index,
//                   widget?.widget_index,
//                   body,
//                   graphObject
//                 )
//               );

//           // delete excecuted api from list
//           if (widget) {
//             let updatedArray = deleteDashboardCalledApiList(widget);
//             if (widget?.templateFilter) {
//               let templateDetails = global.template_details
//                 ? global.template_details
//                 : widget?.template_details;
//               dispatch(
//                 setTemplateDetails(templateDetails, {
//                   dashboard_called_api_list: updatedArray,
//                 })
//               );
//             } else {
//               dispatch(
//                 setDashboardCalledApiList(
//                   updatedArray,
//                   widget?.panes,
//                   widget?.pane_index
//                 )
//               );
//             }
//           }
//         } else if (response?.data?.status === "error") {
//           !widget &&
//             dispatch({
//               type: "SET_WIDGET_PREVIEW",
//               payload: {
//                 chart_data:
//                   response?.data?.error_code === 4
//                     ? "No data found"
//                     : response?.data?.error_code === 16
//                     ? "Data for this widget cannot be shown as NPS type feedback is not enabled."
//                     : response?.data?.reason,
//                 metadata: graphObject && { ...graphObject },
//               },
//             });

//           dispatch(setWidgetPreviewLoader(false));
//           widget?.templateFilter
//             ? dispatch(
//                 setTemplateWidgetData(
//                   response?.data?.error_code === 4
//                     ? "No data found"
//                     : response?.data?.error_code === 16
//                     ? "Data for this widget cannot be shown as NPS type feedback is not enabled."
//                     : response?.data?.reason,
//                   widget?.section,
//                   widget?.section_index,
//                   widget?.widget_index,
//                   graphObject
//                 )
//               )
//             : widget &&
//               dispatch(
//                 setWidgetGraphData(
//                   response?.data?.error_code === 4
//                     ? "No data found"
//                     : response?.data?.error_code === 16
//                     ? "Data for this widget cannot be shown as NPS type feedback is not enabled."
//                     : response?.data?.reason,
//                   widget?.pane_index,
//                   widget?.panes,
//                   widget?.section_index,
//                   widget?.widget_index,
//                   body,
//                   graphObject
//                 )
//               );

//           dispatch(setErrorCode(response?.data?.error_code));
//           errorCode?.map((el, i) => {
//             return el.key === response?.data?.error_code
//               ? (errorMessage = el.value)
//               : null;
//           });

//           if (response?.data?.error_code === 9) {
//             sessionExpired(true);
//           }

//           dispatch(setChartLoader(false));

//           // delete excecuted api from list
//           if (widget) {
//             let updatedArray = deleteDashboardCalledApiList(widget);
//             if (widget?.templateFilter) {
//               let templateDetails = global.template_details
//                 ? global.template_details
//                 : widget?.template_details;
//               dispatch(
//                 setTemplateDetails(templateDetails, {
//                   dashboard_called_api_list: updatedArray,
//                 })
//               );
//             } else {
//               dispatch(
//                 setDashboardCalledApiList(
//                   updatedArray,
//                   widget?.panes,
//                   widget?.pane_index
//                 )
//               );
//             }
//           }
//         }
//         return () => {
//           clearTimeout(timer);
//         };
//       })
//       .catch((error) => {
//         // delete excecuted api from list
//         if (widget) {
//           let updatedArray = deleteDashboardCalledApiList(widget);
//           if (widget?.templateFilter) {
//             let templateDetails = global.template_details
//               ? global.template_details
//               : widget?.template_details;
//             dispatch(
//               setTemplateDetails(templateDetails, {
//                 dashboard_called_api_list: updatedArray,
//               })
//             );
//           } else {
//             dispatch(
//               setDashboardCalledApiList(
//                 updatedArray,
//                 widget?.panes,
//                 widget?.pane_index
//               )
//             );
//           }
//         }

//         dispatch(setWidgetPreviewLoader(false));
//         widget
//           ? dispatch(setGraphLoader(false))
//           : dispatch(setChartLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           // delete excecuted api from list
//           if (widget) {
//             let updatedArray = deleteDashboardCalledApiList(widget);
//             if (widget?.shareTemplateData) {
//               dispatch({
//                 type: "SET_SHARE_TEMPLATE_DATA",
//                 payload: {
//                   ...widget?.shareTemplateData,
//                   dashboard_called_api_list: updatedArray,
//                 },
//               });
//             } else if (widget?.templateFilter) {
//               let templateDetails = global.template_details
//                 ? global.template_details
//                 : widget?.template_details;
//               dispatch(
//                 setTemplateDetails(templateDetails, {
//                   dashboard_called_api_list: updatedArray,
//                 })
//               );
//             } else {
//               dispatch(
//                 setDashboardCalledApiList(
//                   updatedArray,
//                   widget?.panes,
//                   widget?.pane_index
//                 )
//               );
//             }
//           }

//           callNotification(null, "error");
//           // To show no data found in case of 500 or else
//           // widget?.templateFilter
//           //   ? dispatch(
//           //       setTemplateWidgetData(
//           //         "No Data Found",
//           //         widget?.section,
//           //         widget?.section_index,
//           //         widget?.widget_index,
//           //         graphObject
//           //       )
//           //     )
//           //   : widget &&
//           //     dispatch(
//           //       setWidgetGraphData(
//           //         "No Data Found",
//           //         widget?.pane_index,
//           //         widget?.panes,
//           //         widget?.section_index,
//           //         widget?.widget_index,
//           //         body,
//           //         graphObject
//           //       )
//           //     );
//         }
//       });
//   };
// };

// export const setWidgetMakerEnabled = (value) => {
//   return { type: "SET_WIDGET_MAKER_ENABLED", payload: value };
// };
