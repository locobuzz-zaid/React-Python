// import axios from "axios";
// import Config from "../../config";
// import "../../../app/custom.css";
// import { setErrorCode } from "./Workspace";
// import {
//   sessionExpired,
//   callNotification,
//   errorCode,
//   initialPanes,
//   workspaceNotExist,
//   getCustomizedDate,
//   getTimeInterval,
//   getFilterPanelData,
//   getFilterArray,
//   getUTCOffset,
//   getBrands,
//   addDashboardCalledApiList,
//   deleteDashboardCalledApiList,
//   clearHighChartopData,
// } from "../constants";
// import {
//   setClearWidgetGraphData,
//   setDashboardCalledApiList,
//   setGlobalProfileFilterList,
//   setSimpleViewDuration,
//   setWidgetGraphData,
// } from "./dashboard/Tab1";
// import {
//   setClearTemplateWidgetGraphData,
//   setClearWidgetGraphDataInEdit,
//   setTemplateDetails,
//   setTemplateFilter,
//   setTemplateSectionFilter,
//   setTemplateWidgetData,
//   setTemplateWidgetFilter,
// } from "./section/section";
// import {
//   setFetchSectionData,
//   setGlobalLoader,
//   setTicketOverviewInterval,
//   setTicketOverviewWidget1,
//   setTicketOverviewWidget2,
//   setWidgetLoader,
//   setWidgetUpdateFilterLoader,
// } from "./ApiCall/apiCall";
// import moment from "moment";
// import { setTicketSimpleView, setTicketTAT } from "./dashboard/Welcome";
// import { setTicketOffset } from "./ormWidget/Orm";
// import { set_Share_Attributes } from "./WidgetMaker/WidgetMaker";
// import { setTrendsData } from "./WidgetMaker/WidgetAPI";
// import { setSingleDate } from "./DateTime";
// import { setOptionHighChart } from "./HighChart";
// import { setWidgetData } from "./dashboard/Tab1";

// //function to get config data
// export const setConfigData = (authParams, count) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setConfigLoader(true));
//     let body = {
//       ptoken: authParams?.ptoken ? authParams?.ptoken : undefined,
//     };
//     //let url = `${Config.config1.api_link}/configuration/fetch`;
//     let url = `${Config.config1.api_link}/configuration/v2/fetch`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         dispatch(setConfigLoader(false));

//         if (response?.data?.status === "error") {
//           errorCode?.map((el, i) => {
//             return el.key === response?.data?.error_code
//               ? (errorMessage = el.value)
//               : null;
//           });

//           callNotification(errorMessage, "error");
//           if (response?.data?.error_code === 9) {
//             !count && dispatch(setConfigData(authParams, 1));
//             if (count) {
//               sessionExpired(true);
//             }
//           }
//           if (response?.data?.error_code === 11) {
//             dispatch({ type: "SET_PANE", panes: initialPanes });
//             workspaceNotExist(true);
//           }
//         } else if (response?.data?.status === "successful") {
//           dispatch({
//             type: "SET_CONFIG_DATA",
//             payload: response?.data?.result?.schema,
//           });
//           let attributesList = {};
//           Object.entries(response?.data?.result?.schema)?.forEach(
//             (data_source) => {
//               Object.entries(data_source?.[1])?.forEach((el) => {
//                 Object.entries(el?.[1]?.members)?.forEach((e) => {
//                   attributesList = {
//                     ...attributesList,
//                     [e[0]]: e?.[1]?.title,
//                   };
//                 });
//               });
//             }
//           );

//           dispatch(set_Share_Attributes(attributesList));
//         }
//       })
//       .catch((error) => {
//         dispatch(setConfigLoader(false));
//         dispatch(setGlobalLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// //function to get enum config data
// export const getEnumConfigData = (authParams) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setEnumConfigLoader(true));
//     let body = {
//       ptoken: authParams?.ptoken ? authParams?.ptoken : undefined,
//     };
//     let url = `${Config.config1.api_link}/configuration/enum-mappings`;
//     axios
//       .get(url)
//       .then((response) => {
//         dispatch(setEnumConfigLoader(false));
//         if (response?.status === "error") {
//           dispatch(setEnumConfigData(null));
//           errorCode?.map((el, i) => {
//             return el.key === response?.data?.error_code
//               ? (errorMessage = el.value)
//               : null;
//           });
//           callNotification(errorMessage, "error");
//         } else if (
//           response?.status === "successful" ||
//           response?.status === 200
//         ) {
//           dispatch(setEnumConfigData(response.data));
//         }
//       })
//       .catch((error) => {
//         dispatch(setEnumConfigLoader(false));
//         dispatch(setEnumConfigData(null));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// export const setGraphShareFetch = (
//   graphObject,
//   shareCategory,
//   index,
//   share,
//   share_id,
//   password
// ) => {
//   let errorMessage;
//   let brands = graphObject?.brand_list?.columns
//     ? graphObject?.brand_list?.columns
//     : graphObject?.brand_list &&
//       Array?.isArray(graphObject?.brand_list) &&
//       graphObject?.brand_list?.length
//     ? graphObject?.brand_list
//     : graphObject?.brand_list?.selected_brand_groups?.length
//     ? graphObject?.brand_list?.selected_brand_groups
//     : graphObject?.brand_list?.selected_brand_ids;

//   let single_brands = [];
//   let brandsGroupName = [];
//   if (
//     graphObject?.brand_list?.selected_brand_groups?.length <= 0 &&
//     graphObject?.brand_list?.selected_brand_ids?.length <= 0
//   ) {
//     brandsGroupName = brands[0]?.brand_group_name && [
//       {
//         brand_group_name: brands[0]?.brand_group_name,
//       },
//     ];
//   } else {
//     if (graphObject?.brand_list?.columns) {
//       brands?.map((el) => {
//         if (el?.group) {
//           brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//         }
//       });
//     } else {
//       brands?.map((el) => {
//         brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//       });
//     }
//   }

//   if (graphObject?.brand_list?.columns) {
//     brands?.map((el) => {
//       if (!el?.group) {
//         single_brands.push({
//           brand_id: el?.brand_id ? el?.brand_id : el?.name,
//           brand_name: el?.brand_name ? el?.brand_name : el?.brand_friendly_name,
//         });
//       }
//     });
//   } else {
//     if (graphObject?.brand_list?.selected_brand_ids?.length > 0) {
//       graphObject?.brand_list?.selected_brand_ids?.map((el) => {
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
//       graphObject?.brand_list?.length > 0 &&
//         graphObject?.brand_list?.map((el) => {
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
//   }

//   return async (dispatch) => {
//     let body = {
//       share_id: share_id,
//       primary_attribute: graphObject?.primary_attribute
//         ? graphObject?.primary_attribute
//         : null,
//       secondary_attribute: graphObject?.secondary_attribute
//         ? graphObject?.secondary_attribute
//         : null,
//       filters: graphObject?.filters ? graphObject?.filters : null,
//       splits: graphObject?.splits ? graphObject?.splits : null,
//       window_width: window.screen.width,
//       browser_width: window.innerWidth,
//       graph_type: graphObject?.graph_type,
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       brand_list:
//         single_brands && single_brands[0]?.brand_id ? single_brands : null,
//       start_date: graphObject?.start_date,
//       end_date: graphObject?.end_date,
//       base: graphObject?.base,
//       widget_id: graphObject?.widget_id,
//       password: password,
//       utcoffset: getUTCOffset(),
//     };

//     if (graphObject?.primary_attribute) {
//       dispatch(setGraphLoader(true));
//       dispatch(
//         setWidgetLoader({
//           value: true,
//           widget_index: index?.widget_index,
//           section_index: index?.section_index,
//           widget_id: graphObject?.widget_id,
//           global: index?.global ? true : false,
//         })
//       );

//       // Adding widget id in the array of panes and templateDetails
//       if (index) {
//         let updatedArray = addDashboardCalledApiList(index);
//         if (index?.shareTemplateData) {
//           dispatch({
//             type: "SET_SHARE_TEMPLATE_DATA",
//             payload: {
//               ...index?.shareTemplateData,
//               dashboard_called_api_list: updatedArray,
//             },
//           });
//         }
//       }

//       let url = `${Config.config1.api_link}/graph/share-fetch`;
//       axios
//         .post(url, body)
//         .then((response) => {
//           dispatch(setGraphLoader(false));

//           if (response?.data?.status === "successful") {
//             dispatch(
//               setWidgetLoader({
//                 value: true,
//                 widget_index: index.widget_index,
//                 section_index: index.section_index,
//                 global: false,
//               })
//             );

//             let templateResponse = share?.sections
//               ? { ...share?.sections }
//               : { ...share?.section };

//             if (templateResponse?.sections) {
//               templateResponse.sections[index.section_index].widgets[
//                 index.widget_index
//               ].graphData = response?.data?.result;
//             }
//             if (templateResponse?.section) {
//               templateResponse.section[0].widgets[
//                 index.widget_index
//               ].graphData = response?.data?.result;
//             }

//             dispatch({
//               type: "SET_SHARE_TEMPLATE_DATA",
//               payload: templateResponse,
//             });

//             // delete excecuted api from list
//             if (index) {
//               let updatedArray = deleteDashboardCalledApiList(index);
//               if (index?.shareTemplateData) {
//                 dispatch({
//                   type: "SET_SHARE_TEMPLATE_DATA",
//                   payload: {
//                     ...index?.shareTemplateData,
//                     dashboard_called_api_list: updatedArray,
//                   },
//                 });
//               }
//             }
//           }
//           if (response?.data?.status === "error") {
//             let templateResponse = share?.sections
//               ? { ...share?.sections }
//               : { ...share?.section };
//             if (templateResponse?.sections) {
//               templateResponse.sections[index.section_index].widgets[
//                 index.widget_index
//               ].graphData =
//                 response?.data?.error_code === 4
//                   ? "No data found"
//                   : response?.data?.reason;
//             } else if (templateResponse?.section) {
//               templateResponse.section[0].widgets[
//                 index.widget_index
//               ].graphData =
//                 response?.data?.error_code === 4
//                   ? "No data found"
//                   : response?.data?.reason;
//             }
//             dispatch({
//               type: "SET_SHARE_TEMPLATE_DATA",
//               payload: templateResponse,
//             });

//             dispatch(
//               setWidgetLoader({
//                 value: false,
//                 widget_index: null,
//                 section_index: null,
//                 global: false,
//               })
//             );
//             dispatch(setErrorCode(response?.data?.error_code));
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });

//             if (response?.data?.error_code === 9) {
//               sessionExpired(true);
//             }
//             // dispatch(setGraphLoader(false));

//             // dispatch(setErrorCode(response?.data?.error_code));
//             // callNotification(errorCode, "error");

//             // delete excecuted api from list
//             if (index) {
//               let updatedArray = deleteDashboardCalledApiList(index);
//               if (index?.shareTemplateData) {
//                 dispatch({
//                   type: "SET_SHARE_TEMPLATE_DATA",
//                   payload: {
//                     ...index?.shareTemplateData,
//                     dashboard_called_api_list: updatedArray,
//                   },
//                 });
//               }
//             }
//           }
//         })
//         .catch((error) => {
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

//           dispatch(setGraphLoader(false));
//           dispatch(setAggregateLoader(false));
//           // To show no data found in case of 500 or else
//           // let templateResponse = share?.sections
//           //   ? { ...share?.sections }
//           //   : { ...share?.section };
//           // if (templateResponse?.sections) {
//           //   templateResponse.sections[index.section_index].widgets[
//           //     index.widget_index
//           //   ].graphData = "No Data Found";
//           // } else if (templateResponse?.section) {
//           //   templateResponse.section[0].widgets[index.widget_index].graphData =
//           //     "No Data Found";
//           // }
//           // dispatch({
//           //   type: "SET_SHARE_TEMPLATE_DATA",
//           //   payload: templateResponse,
//           // });

//           // Request aborted
//           if (error.message !== "Request aborted") {
//             // delete excecuted api from list
//             if (index) {
//               let updatedArray = deleteDashboardCalledApiList(index);
//               if (index?.shareTemplateData) {
//                 dispatch({
//                   type: "SET_SHARE_TEMPLATE_DATA",
//                   payload: {
//                     ...index?.shareTemplateData,
//                     dashboard_called_api_list: updatedArray,
//                   },
//                 });
//               }
//             }

//             callNotification(null, "error");
//           }
//         });
//     }
//   };
// };

// //api call to get aggregate data
// export const setAggregateData = (graphObject, widget, global, a) => {
//   let hidden_filter = widget?.panes?.[widget?.pane_index]?.hidden_filter
//     ? [widget?.panes[widget?.pane_index]?.hidden_filter]
//     : [];
//   let graphObj_filters =
//     graphObject?.filterObj?.length > 0
//       ? graphObject?.filterObj
//       : graphObject?.filters?.length > 0
//       ? graphObject?.filters
//       : [];
//   let final_filters = [...graphObj_filters];
//   return async (dispatch) => {
//     let errorMessage;
//     let duration = graphObject?.start_date
//       ? { from: graphObject?.start_date, to: graphObject?.end_date }
//       : graphObject?.duration;
//     let brands = graphObject?.brands?.columns
//       ? graphObject?.brands?.columns
//       : graphObject?.brands;
//     let single_brands = [];
//     let brandsGroupName = [];
//     if (!graphObject?.isBrandModified) {
//       brandsGroupName =
//         brands && brands[0]?.brand_list
//           ? [
//               {
//                 brand_group_name: brands[0]?.brand_group_name,
//               },
//             ]
//           : brands &&
//             single_brands?.push({
//               brand_id: brands[0]?.brand_id && brands[0]?.brand_id,
//               brand_name: brands[0]?.brand_name && brands[0]?.brand_name,
//             });
//     } else {
//       brands &&
//         brands?.map((el) => {
//           if (el?.group || el?.brand_group_name) {
//             brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//           }
//         });

//       brands?.map((el) => {
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
//     let endDateFlag = false;
//     if (moment(graphObject?.duration?.to).isSame(moment(), "date")) {
//       endDateFlag = true;
//     }
//     let body = {
//       theme_type: graphObject?.authParams?.theme_type, //Dark Theme Type for 1 and Light Theme Type 0
//       ptoken: graphObject?.authParams?.ptoken,
//       primary_attribute: graphObject?.firstAttr ? graphObject?.firstAttr : null,
//       secondary_attribute: graphObject?.secondAttr
//         ? graphObject?.secondAttr
//         : null,
//       filters: final_filters,
//       splits: graphObject?.splitObj ? graphObject?.splitObj : null,
//       window_width: window.screen.width,
//       browser_width: window.innerWidth,
//       base: graphObject?.base ? graphObject?.base : "mentions",
//       start_date: duration?.from,
//       end_date: duration?.to,
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       brand_list:
//         single_brands && single_brands[0]?.brand_id ? single_brands : null,

//       agg: "w",
//       graph_type: "aggregate",
//       widget_id: graphObject?.widget_id,
//     };

//     if (graphObject?.firstAttr) {
//       dispatch({
//         type: "SET_AGGREGATE_DATA",
//         payload: null,
//       });
//       !global?.value &&
//         dispatch(
//           setWidgetLoader({
//             value: true,
//             widget_index: widget?.widget_index,
//             section_index: widget?.section_index,
//           })
//         );
//       dispatch(setAggregateLoader(true));

//       // Adding widget id in the array of panes and templateDetails
//       if (widget) {
//         let updatedArray = addDashboardCalledApiList(widget);
//         if (widget?.templateFilter) {
//           dispatch(
//             setTemplateDetails(widget?.template_details, {
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

//       let url = `${Config.config1.api_link}/graph/aggregate`;
//       axios
//         .post(url, body)
//         .then((response) => {
//           dispatch({
//             type: "SET_AGGREGATE_DATA",
//             payload: response.data,
//           });

//           global
//             ? global?.id &&
//               dispatch(
//                 setWidgetLoader({
//                   value: false,
//                   widget_index: widget?.widget_index,
//                   section_index: widget?.section_index,
//                 })
//               )
//             : dispatch(
//                 setWidgetLoader({
//                   value: false,
//                   widget_index: widget?.widget_index,
//                   section_index: widget?.section_index,
//                 })
//               );
//           dispatch(setAggregateLoader(false));
//           if (response?.data?.status === "successful") {
//             widget?.templateFilter
//               ? dispatch(
//                   setTemplateWidgetData(
//                     response?.data?.result?.data,
//                     widget?.section,
//                     widget?.section_index,
//                     widget?.widget_index
//                   )
//                 )
//               : widget &&
//                 dispatch(
//                   setWidgetGraphData(
//                     response?.data?.result,
//                     widget?.pane_index,
//                     widget?.panes,
//                     widget?.section_index,
//                     widget?.widget_index,
//                     body,
//                     graphObject
//                   )
//                 );

//             // delete excecuted api from list
//             if (widget) {
//               let updatedArray = deleteDashboardCalledApiList(widget);
//               if (widget?.templateFilter) {
//                 dispatch(
//                   setTemplateDetails(widget?.template_details, {
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
//             widget?.templateFilter
//               ? dispatch(
//                   setTemplateWidgetData(
//                     response?.data?.reason,
//                     widget?.section,
//                     widget?.section_index,
//                     widget?.widget_index
//                   )
//                 )
//               : widget &&
//                 dispatch(
//                   setWidgetGraphData(
//                     response?.data?.reason,
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

//             // delete excecuted api from list
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
//                 dispatch(
//                   setTemplateDetails(widget?.template_details, {
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
//         })
//         .catch((error) => {
//           // delete excecuted api from list
//           if (widget) {
//             let updatedArray = deleteDashboardCalledApiList(widget);
//             if (widget?.templateFilter) {
//               dispatch(
//                 setTemplateDetails(widget?.template_details, {
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

//           dispatch(setGraphLoader(false));
//           dispatch(setAggregateLoader(false));

//           // Request aborted
//           if (error.message !== "Request aborted") {
//             // delete excecuted api from list
//             if (widget) {
//               let updatedArray = deleteDashboardCalledApiList(widget);
//               if (widget?.templateFilter) {
//                 dispatch(
//                   setTemplateDetails(widget?.template_details, {
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

//             callNotification(null, "error");
//           }
//         });
//     }
//   };
// };

// //api call to get graph data
// export const setGraphData = (graphObject, widget, global) => {
//   let hidden_filter = widget?.panes?.[widget?.pane_index]?.hidden_filter
//     ? [widget?.panes[widget?.pane_index]?.hidden_filter]
//     : [];
//   let graphObj_filters =
//     graphObject?.filterObj?.length > 0
//       ? graphObject?.filterObj
//       : graphObject?.filters?.length > 0
//       ? graphObject?.filters
//       : [];
//   let final_filters = [...graphObj_filters];
//   return async (dispatch) => {
//     let errorMessage;
//     let duration = graphObject?.start_date
//       ? { from: graphObject?.start_date, to: graphObject?.end_date }
//       : graphObject?.duration;
//     let brands = graphObject?.brands?.columns
//       ? graphObject?.brands?.columns
//       : graphObject?.brands;
//     let single_brands = [];
//     let brandsGroupName = [];
//     if (!graphObject?.isBrandModified) {
//       brandsGroupName =
//         brands && brands[0]?.brand_list
//           ? [
//               {
//                 brand_group_name: brands[0]?.brand_group_name,
//               },
//             ]
//           : brands &&
//             single_brands?.push({
//               brand_id: brands[0]?.brand_id && brands[0]?.brand_id,
//               brand_name: brands[0]?.brand_name && brands[0]?.brand_name,
//             });
//     } else {
//       brands &&
//         brands?.map((el) => {
//           if (el?.group || el?.brand_group_name) {
//             brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//           }
//         });

//       brands?.map((el) => {
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
//     let endDateFlag = false;
//     if (moment(graphObject?.duration?.to).isSame(moment(), "date")) {
//       endDateFlag = true;
//     }

//     let body = {
//       theme_type: graphObject?.authParams?.theme_type, //Dark Theme Type for 1 and Light Theme Type 0
//       ptoken: graphObject?.authParams?.ptoken,
//       primary_attribute: graphObject?.firstAttr ? graphObject?.firstAttr : null,
//       secondary_attribute: graphObject?.secondAttr
//         ? graphObject?.secondAttr
//         : null,
//       filters: final_filters,
//       splits: graphObject?.splitObj ? graphObject?.splitObj : null,
//       window_width: window.screen.width,
//       browser_width: window.innerWidth,
//       base: graphObject?.base ? graphObject?.base : "mentions",
//       start_date: duration?.from,
//       end_date: duration?.to,
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       brand_list:
//         single_brands && single_brands[0]?.brand_id ? single_brands : null,

//       agg: "w",
//       graph_type: widget?.graph_type,
//       widget_id: graphObject?.widget_id,
//       percent: graphObject?.percent,
//       exclude_words:
//         graphObject?.exclude_words?.length > 0
//           ? graphObject?.exclude_words
//           : null,
//     };

//     if (graphObject?.firstAttr) {
//       dispatch(setGraphLoader(true));
//       !global?.value &&
//         dispatch(
//           setWidgetLoader({
//             value: true,
//             widget_index: widget?.widget_index,
//             section_index: widget?.section_index,
//           })
//         );
//       dispatch({
//         type: "SET_GRAPH_DATA",
//         payload: null,
//       });

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

//       // Adding widget id in the array of panes and templateDetails
//       if (widget) {
//         let updatedArray = addDashboardCalledApiList(widget);
//         if (widget?.templateFilter) {
//           dispatch(
//             setTemplateDetails(widget?.template_details, {
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

//       let url = `${Config.config1.api_link}/graph/fetch`;
//       axios
//         .post(url, body)
//         .then((response) => {
//           global
//             ? global?.id &&
//               dispatch(
//                 setWidgetLoader({
//                   value: false,
//                   widget_index: widget?.widget_index,
//                   section_index: widget?.section_index,
//                   global: false,
//                 })
//               )
//             : dispatch(
//                 setWidgetLoader({
//                   value: false,
//                   widget_index: widget?.widget_index,
//                   section_index: widget?.section_index,
//                   global: false,
//                 })
//               );

//           dispatch(
//             setWidgetLoader({
//               global: false,
//             })
//           );
//           dispatch(setGraphLoader(false));

//           if (response?.data?.status === "successful") {
//             dispatch({
//               type: "SET_GRAPH_DATA",
//               payload: response.data,
//             });
//             widget?.templateFilter
//               ? dispatch(
//                   setTemplateWidgetData(
//                     response?.data?.result?.data,
//                     widget?.section,
//                     widget?.section_index,
//                     widget?.widget_index
//                   )
//                 )
//               : widget &&
//                 dispatch(
//                   setWidgetGraphData(
//                     response?.data?.result,
//                     widget?.pane_index,
//                     widget?.panes,
//                     widget?.section_index,
//                     widget?.widget_index,
//                     body,
//                     graphObject
//                   )
//                 );

//             // delete excecuted api from list
//             if (widget) {
//               let updatedArray = deleteDashboardCalledApiList(widget);
//               if (widget?.templateFilter) {
//                 dispatch(
//                   setTemplateDetails(widget?.template_details, {
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
//             widget?.templateFilter
//               ? dispatch(
//                   setTemplateWidgetData(
//                     response?.data?.error_code === 4
//                       ? "No data found"
//                       : response?.data?.reason,
//                     widget?.section,
//                     widget?.section_index,
//                     widget?.widget_index
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

//             // delete excecuted api from list
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
//                 dispatch(
//                   setTemplateDetails(widget?.template_details, {
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
//         })
//         .catch((error) => {
//           // delete excecuted api from list
//           if (widget) {
//             let updatedArray = deleteDashboardCalledApiList(widget);
//             if (widget?.templateFilter) {
//               dispatch(
//                 setTemplateDetails(widget?.template_details, {
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

//           dispatch(setGraphLoader(false));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             // delete excecuted api from list
//             if (widget) {
//               let updatedArray = deleteDashboardCalledApiList(widget);
//               if (widget?.templateFilter) {
//                 dispatch(
//                   setTemplateDetails(widget?.template_details, {
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

//             callNotification(null, "error");
//             // To show no data found in case of 500 or else
//             // widget?.templateFilter
//             //   ? dispatch(
//             //       setTemplateWidgetData(
//             //         "No Data Found",
//             //         widget?.section,
//             //         widget?.section_index,
//             //         widget?.widget_index
//             //       )
//             //     )
//             //   : widget &&
//             //     dispatch(
//             //       setWidgetGraphData(
//             //         "No Data Found",
//             //         widget?.pane_index,
//             //         widget?.panes,
//             //         widget?.section_index,
//             //         widget?.widget_index,
//             //         body,
//             //         graphObject
//             //       )
//             //     );
//           }
//         });
//     }
//   };
// };

// //api call to get supportive attributes for second attribute section based on selected first attribute
// export const setAvailablePills = (authParams, firstAttr) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let body = {
//       ptoken: authParams?.ptoken,
//       attribute: firstAttr !== "New Worksheet" ? firstAttr : null,
//     };
//     if (firstAttr) {
//       let url = `${Config.config1.api_link}/configuration/support-attrs`;
//       axios
//         .post(url, body)
//         .then((response) => {
//           dispatch({
//             type: "SET_AVAILABLE_PILLS",
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
//             if (response?.data?.error_code === 11) {
//               dispatch({ type: "SET_PANE", panes: initialPanes });
//               workspaceNotExist(true);
//             }
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     }
//   };
// };

// //function to set graph loader(shown when graph data is loading)
// export const setGraphLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_GRAPH_LOADER", payload: value });
//   };
// };
// //function to set template filter loader(shown when tmplate filters are loading)
// export const setTemplateLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_TEMPLATE_LOADER", payload: value });
//   };
// };
// //function to set graph loader(shown when graph data is loading)
// export const setTrendsLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_TRENDS_LOADER", payload: value });
//   };
// };
// //function to set aggregate loader(shown when graph data is loading)
// export const setAggregateLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_AGGREGATE_LOADER", payload: value });
//   };
// };
// //function to set profile loader(for header looks like disabled)
// export const setProfileLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_PROFILE_LOADER", payload: value });
//   };
// };
// //function for deep dive filter option

// export const setFilter = (value) => {
//   return (dispatch) => {
//     dispatch({ type: "SET_DEEP_DIVE_FILTER", payload: value });
//   };
// };

// export const setDatatype = (value) => {
//   return (dispatch) => {
//     dispatch({ type: "SET_DATATYPE", payload: value });
//   };
// };

// //function to set config loader(shown when config data is loading)
// export const setConfigLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_CONFIG_LOADER", payload: value });
//   };
// };

// //function to set enum config loader(shown when enum config data is loading)
// export const setEnumConfigLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_ENUM_CONFIG_LOADER", payload: value });
//   };
// };

// //function to set enum config loader(shown when enum config data is loading)
// export const setGraphConditionLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_GRAPH_CONDITION_LOADER", payload: value });
//   };
// };

// //function to set enum config loader(shown when enum config data is loading)
// export const setEnumConfigData = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_ENUM_CONFIG_DATA", payload: value });
//   };
// };

// //function to clear saveWorksheetResponse state
// export const setClearSaveWorksheetResponse = (value) => {
//   return { type: "SET_CLEAR_SAVE_WORKSPACE", payload: value };
// };
// //function to clear worksheets state
// export const setClearWorksheets = (value) => {
//   return { type: "SET_CLEAR_WORKSHEETS", payload: value };
// };
// export const setPreDefinedWidgetsData = (graphObject, widget, global) => {
//   return async (dispatch) => {
//     let errorMessage;

//     let body = {
//       ptoken: graphObject?.authParams?.ptoken,
//       search_string: graphObject?.value,
//     };

//     let url = `${Config.config1.api_link}/template/section/widget/predefined-search`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_PREDEFINED_WIDGET_DATA",
//           payload: response.data,
//         });
//         if (response?.data?.status === "successful") {
//           dispatch(setTicketTAT(response.data?.result, graphObject?.ticketTAT));
//           response?.data?.result?.map((el, i) => {
//             if (i <= 10) {
//               let twoMonthsDuration = getCustomizedDate(6, "Days");
//               let defaultDuration = {
//                 from:
//                   moment(twoMonthsDuration?.date[0]).format("YYYY/MM/DD") +
//                   " " +
//                   twoMonthsDuration?.time?.startTime,
//                 to:
//                   moment(twoMonthsDuration?.date[1]).format("YYYY/MM/DD") +
//                   " " +
//                   twoMonthsDuration?.time?.endTime,
//               };
//               let getInterval = getTimeInterval(
//                 defaultDuration?.to,
//                 defaultDuration?.from
//               );
//               let indexes = {
//                 ticketTAT: graphObject?.ticketTAT
//                   ? graphObject?.ticketTAT
//                   : response?.data?.result,
//                 widget_index: i,
//                 ticketSimpleView: graphObject?.ticketSimpleView
//                   ? graphObject?.ticketSimpleView
//                   : response?.data?.result,
//               };
//               let graphObject1 = {
//                 authParams: graphObject?.authParams,
//                 brands: graphObject?.brands,
//                 duration: defaultDuration,
//                 widget_id: el?.widget_id,
//                 chart_type:
//                   typeof getInterval?.defaultVal === "string"
//                     ? getInterval?.defaultVal
//                     : null,
//                 interval:
//                   el?.widget_id === "tickets_orm_6" ||
//                   el?.widget_id === "tickets_orm_7" ||
//                   el?.widget_id === "tickets_orm_12" ||
//                   el?.widget_id === "tickets_orm_26"
//                     ? null
//                     : typeof getInterval?.defaultVal === "number"
//                     ? getInterval?.defaultVal
//                     : null,
//                 benchmark_breach:
//                   el?.widget_id === "tickets_orm_6"
//                     ? 30
//                     : el?.widget_id === "tickets_orm_7"
//                     ? 240
//                     : el?.widget_id === "tickets_orm_26"
//                     ? 240
//                     : null,
//               };

//               if (graphObject?.authParams?.category_id && graphObject?.brands) {
//                 dispatch(setPreWidgetsData(graphObject1, indexes));
//               }
//             }
//           });
//           if (response?.data?.result?.length > 11) {
//             dispatch(
//               setTicketOffset({
//                 widget_index: 11,
//                 id: "12",
//               })
//             );
//           }
//         }

//         if (response?.data?.status === "error") {
//           dispatch(setErrorCode(response?.data?.error_code));
//           errorCode?.map((el, i) => {
//             return el.key === response?.data?.error_code
//               ? (errorMessage = el.value)
//               : null;
//           });

//           if (response?.data?.error_code === 9) {
//             sessionExpired(true);
//           }
//           if (response?.data?.error_code === 11) {
//             dispatch({ type: "SET_PANE", panes: initialPanes });
//             workspaceNotExist(true);
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

// export const setConfiguration = (
//   index,
//   paneobject,
//   authParams,
//   sectionIndex,
//   widgetsData,
//   params,
//   template_id,
//   Obj
// ) => {
//   return async (dispatch) => {
//     let twoMonthsDuration = getCustomizedDate(6, "Days");
//     let defaultDuration = {
//       from:
//         moment(twoMonthsDuration?.date[0]).format("YYYY/MM/DD") +
//         " " +
//         twoMonthsDuration?.time?.startTime,
//       to:
//         moment(twoMonthsDuration?.date[1]).format("YYYY/MM/DD") +
//         " " +
//         twoMonthsDuration?.time?.endTime,
//     };
//     if (params === "tickets/orm" || params === "tickets/overview") {
//       widgetsData?.map((el, i) => {
//         if (el?.widget_id !== "tickets_orm_24b") {
//           let duration = paneobject?.global_dashboard_duration
//             ? paneobject?.global_dashboard_duration
//             : paneobject?.panes[index]?.duration
//             ? paneobject?.panes[index]?.duration
//             : null;

//           let global_brands = paneobject?.global_dashboard_brands?.columns
//             ? paneobject?.global_dashboard_brands?.columns
//             : paneobject?.templateDetails?.templateBrands?.columns?.length > 0
//             ? paneobject?.templateDetails?.templateBrands?.columns
//             : paneobject?.templateDetails?.templateBrands?.length > 0
//             ? paneobject?.templateDetails?.templateBrands
//             : paneobject?.panes[index]?.brands
//             ? paneobject?.panes[index]?.brands
//             : null;

//           let section_brands = getBrands(
//             paneobject?.brands,
//             Obj?.data?.result?.brand_ids,

//             paneobject?.singleBrands,
//             Obj?.data?.result?.brand_groups
//           );
//           let widget_brands = getBrands(
//             paneobject?.brands,
//             el?.brand_ids,

//             paneobject?.singleBrands,
//             el?.brand_groups
//           );

//           let combinedFilters = [];

//           if (el?.filters)
//             combinedFilters = [...el?.filters, ...combinedFilters];
//           if (Obj?.data?.result?.filters)
//             combinedFilters = [
//               ...Obj?.data?.result?.filters,
//               ...combinedFilters,
//             ];
//           let filterData = combinedFilters?.filter((d) => d);
//           let filter = filterData;

//           if (i <= 11) {
//             let indexes = {
//               pane_index: index,
//               section_index: sectionIndex,
//               panes: paneobject?.panes,
//               widget_index: i,
//             };

//             let getInterval = getTimeInterval(
//               duration ? duration?.to : defaultDuration?.to,
//               duration ? duration?.from : defaultDuration?.from
//             );
//             dispatch(setTicketOverviewWidget1(getInterval?.defaultVal));
//             dispatch(setTicketOverviewWidget2(getInterval?.defaultVal));
//             dispatch(setTicketOverviewInterval(getInterval?.defaultVal));

//             let graphObject = {
//               authParams: authParams,

//               filterObj: filter ? filter : null,

//               start_date: duration?.from
//                 ? duration?.from
//                 : defaultDuration?.from,
//               end_date: duration?.to ? duration?.to : defaultDuration?.to,
//               brands: global_brands ? global_brands : paneobject?.singleBrands,

//               // duration: defaultDuration,
//               widget_id: el?.widget_id,
//               chart_type:
//                 typeof getInterval?.defaultVal === "string"
//                   ? getInterval?.defaultVal
//                   : null,
//               interval:
//                 el?.original_widget_id === "tickets_orm_6" ||
//                 el?.original_widget_id === "tickets_orm_7" ||
//                 el?.original_widget_id === "tickets_orm_12" ||
//                 el?.original_widget_id === "tickets_orm_26"
//                   ? null
//                   : typeof getInterval?.defaultVal === "number"
//                   ? getInterval?.defaultVal
//                   : null,
//               benchmark_breach:
//                 el?.original_widget_id === "tickets_orm_6"
//                   ? 30
//                   : el?.original_widget_id === "tickets_orm_7"
//                   ? 240
//                   : el?.original_widget_id === "tickets_orm_26"
//                   ? 240
//                   : null,
//               author_id: Obj?.author_id,
//               bta_id: Obj?.bta_id,
//               brand_list: Obj?.brand_list,
//               isBrandModified: global_brands ? true : false,
//               is_modified_date: paneobject?.is_modified_date
//                 ? paneobject?.is_modified_date
//                 : false,
//             };
//             // console.log("Ticket Overview paneobject",template_id, paneobject);

//             if (authParams?.category_id && paneobject?.brands) {
//               dispatch(
//                 setPreWidgetsData(graphObject, indexes, [], template_id)
//               );
//             }
//           }
//         }
//       });
//     } else {
//       let url = `${Config.config1.api_link}/${params}/configuration`;

//       let body1 = {
//         brand_id: 600,
//         ptoken: authParams?.ptoken,
//       };

//       let body2 = {
//         brand_logical_group: "%akhil One 1 @",
//         start_date: defaultDuration?.from,
//         end_date: defaultDuration?.to,
//         ptoken: authParams?.ptoken,
//       };

//       axios
//         .post(
//           url,
//           params === "tickets/simple-view"
//             ? body1
//             : params === "listening/main"
//             ? body2
//             : null
//         )
//         .then((response) => {
//           if (response?.data?.status === "successful") {
//             dispatch({
//               type: "SET_CONFIGURATION_DATA",
//               payload: response?.data?.result?.schema,
//             });

//             paneobject.panes[index].filterPanelData =
//               response?.data?.result?.schema;
//             let filterPanelData = getFilterPanelData(
//               response?.data?.result?.schema,
//               true,
//               false,
//               "ticket"
//             );
//             let finalData = getFilterArray(filterPanelData?.ticket, true);
//             paneobject.panes[index].defaultFilters = finalData;
//             finalData?.length > 0 &&
//               widgetsData?.map((el, i) => {
//                 if (i <= 5) {
//                   let filter = el?.filters;
//                   let indexes = {
//                     pane_index: index,
//                     section_index: sectionIndex,
//                     panes: paneobject?.panes,
//                     widget_index: i,
//                   };
//                   let getInterval = getTimeInterval(
//                     defaultDuration?.to,
//                     defaultDuration?.from
//                   );

//                   let section_start_date = moment(
//                     paneobject?.global_dashboard_duration?.from
//                       ? paneobject?.global_dashboard_duration?.from
//                       : defaultDuration?.from
//                   )
//                     .startOf("month")
//                     .format("YYYY/MM/DD 00:00");
//                   let section_end_date = moment(
//                     paneobject?.global_dashboard_duration?.from
//                       ? paneobject?.global_dashboard_duration?.from
//                       : defaultDuration?.from
//                   )
//                     .endOf("month")
//                     .format("YYYY/MM/DD 23:59");
//                   let section_duration = {
//                     from: section_start_date,
//                     to: section_end_date,
//                   };
//                   dispatch(
//                     setSimpleViewDuration(
//                       section_duration,
//                       paneobject?.panes,
//                       index
//                     )
//                   );

//                   let graphObject = {
//                     authParams: authParams,

//                     filterObj: filter ? filter : null,

//                     brands: paneobject?.global_dashboard_brands?.columns
//                       ? Array.isArray(
//                           paneobject?.global_dashboard_brands?.columns
//                         )
//                         ? paneobject?.global_dashboard_brands?.columns
//                         : [paneobject?.global_dashboard_brands?.columns]
//                       : paneobject?.singleBrands,
//                     duration:
//                       el?.widget_id === "tickets_simple-view_5" ||
//                       el?.widget_id === "tickets_simple-view_6" ||
//                       el?.widget_id === "tickets_simple-view_7" ||
//                       el?.widget_id === "tickets_simple-view_8"
//                         ? section_duration
//                         : paneobject?.global_dashboard_duration
//                         ? paneobject?.global_dashboard_duration
//                         : defaultDuration,
//                     widget_id: el?.widget_id,
//                     chart_type:
//                       typeof getInterval?.defaultVal === "string"
//                         ? getInterval?.defaultVal
//                         : null,
//                     interval:
//                       el?.original_widget_id === "tickets_orm_6" ||
//                       el?.original_widget_id === "tickets_orm_7" ||
//                       el?.original_widget_id === "tickets_orm_12" ||
//                       el?.original_widget_id === "tickets_orm_26"
//                         ? null
//                         : typeof getInterval?.defaultVal === "number"
//                         ? getInterval?.defaultVal
//                         : null,
//                     benchmark_breach:
//                       el?.original_widget_id === "tickets_orm_6"
//                         ? 30
//                         : el?.original_widget_id === "tickets_orm_7"
//                         ? 240
//                         : el?.original_widget_id === "tickets_orm_26"
//                         ? 240
//                         : null,
//                     is_modified_date:
//                       template_id === "000-000-002"
//                         ? paneobject?.is_modified_date
//                           ? paneobject?.is_modified_date
//                           : false
//                         : null,
//                   };
//                   // console.log("Ticket TAT And Agent paneobject",template_id, paneobject);

//                   if (authParams?.category_id && paneobject?.brands) {
//                     dispatch(
//                       setPreWidgetsData(
//                         graphObject,
//                         indexes,
//                         finalData,
//                         template_id
//                       )
//                     );
//                   }
//                 }
//               });
//           }
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//           }
//         });
//     }
//   };
// };

// //function to set pre widget loader loader(shown when widgets data is loading)
// export const setPreWidgetLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_PRE_WIDGET_LOADER", payload: value });
//   };
// };

// export const setTicketWidgetLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_TICKET_WIDGET_LOADER", payload: value });
//   };
// };

// const getPreDefaultFilters = (filterObj) => {
//   let arr1 = [];
//   for (let i = 0; i < filterObj?.length; i++) {
//     for (let j = 0; j < filterObj[i]?.columns?.length; j++) {
//       if (filterObj[i].type === "varchar" || filterObj[i].type === "boolean") {
//         arr1.push({
//           datatype: filterObj[i]?.type,
//           attribute: filterObj[i]?.attribute,
//           name: filterObj[i]?.columns[j]?.name,
//           type: filterObj[i]?.columns[j]?.type,
//         });
//       }
//     }
//   }
//   return arr1;
// };
// export const setPreWidgetsData = (
//   graphObject,
//   widget,
//   finalData,
//   template_id
// ) => {
//   return async (dispatch) => {
//     let errorMessage;
//     let brands = graphObject?.brands?.columns
//       ? graphObject?.brands?.columns
//       : graphObject?.brands;
//     let single_brands = [];
//     let brandsGroupName = [];
//     if (!graphObject?.isBrandModified) {
//       brandsGroupName =
//         brands && brands[0]?.brand_list
//           ? [
//               {
//                 brand_group_name: brands[0]?.brand_group_name,
//               },
//             ]
//           : single_brands?.push({
//               brand_id:
//                 brands &&
//                 (brands[0]?.brand_id ? brands[0]?.brand_id : brands[0]?.name),
//               brand_name:
//                 brands &&
//                 (brands[0]?.brand_name
//                   ? brands[0]?.brand_name
//                   : brands[0]?.name),
//             });
//     } else {
//       if (brands?.length > 0) {
//         brands &&
//           brands?.map((el) => {
//             if (el?.group || el?.brand_group_name) {
//               brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//             }
//           });

//         brands &&
//           brands?.map((el) => {
//             if (!el?.group) {
//               single_brands.push({
//                 brand_id: el?.brand_id ? el?.brand_id : el?.name,
//                 brand_name: el?.brand_name ? el?.brand_name : el?.name,
//               });
//             }
//           });
//       } else {
//         single_brands.push({
//           brand_id: brands ? brands?.brand_id : brands?.name,
//           brand_name: brands?.name,
//         });
//       }
//     }

//     let url1 = graphObject?.payload
//       ? graphObject?.body?.widget_id?.split("_").slice(0, -1).join("/")
//       : graphObject?.widget_id?.split("_").slice(0, -1).join("/");
//     let getInterval = getTimeInterval(
//       graphObject?.duration?.from?.to,
//       graphObject?.duration?.from
//     );
//     let body = graphObject?.payload
//       ? graphObject?.body
//       : {
//           RoleType: graphObject?.role_type ? graphObject?.role_type : -1,
//           ptoken: graphObject?.authParams?.ptoken,
//           start_date: graphObject?.start_date
//             ? graphObject?.start_date
//             : graphObject?.duration?.from,
//           end_date: graphObject?.end_date
//             ? graphObject?.end_date
//             : graphObject?.duration?.to,
//           brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//           brand_list:
//             single_brands && single_brands[0]?.brand_id ? single_brands : null,
//           widget_id: graphObject?.widget_id,
//           utcoffset: getUTCOffset(),

//           interval: graphObject?.chart_type
//             ? null
//             : graphObject?.interval
//             ? graphObject?.interval
//             : graphObject?.widget_id === "tickets_orm_6" ||
//               graphObject?.widget_id === "tickets_orm_7" ||
//               graphObject?.widget_id === "tickets_orm_12" ||
//               graphObject?.widget_id === "tickets_orm_26"
//             ? null
//             : typeof getInterval?.defaultVal === "number"
//             ? getInterval?.defaultVal
//             : null, //int value
//           chart_type: graphObject?.interval
//             ? null
//             : graphObject?.chart_type
//             ? graphObject?.chart_type
//             : typeof getInterval?.defaultVal === "string"
//             ? getInterval?.defaultVal
//             : null, //string value
//           benchmark_breach: graphObject?.benchmark_breach
//             ? graphObject?.benchmark_breach
//             : null,
//           filters:
//             graphObject?.filters && graphObject?.filters?.length !== 0
//               ? graphObject?.filters
//               : finalData,
//           author_id: template_id === "000-000-101" && graphObject?.author_id,
//           bta_id: template_id === "000-000-101" && graphObject?.bta_id,
//           is_modified_date: graphObject?.is_modified_date,
//         };
//     dispatch(setPreWidgetLoader(true));
//     dispatch(
//       setTicketWidgetLoader({ widget_id: graphObject?.widget_id, value: true })
//     );
//     let url = `${Config.config1.api_link}/${url1}`;
//     widget.panes[widget.pane_index].filters = graphObject?.filters;
//     widget.panes[widget.pane_index].globalFilters = body.filters;

//     axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_PRE_WIDGETS_DATA",
//           payload: response.data,
//         });
//         dispatch(setPreWidgetLoader(false));
//         dispatch(
//           setTicketWidgetLoader({
//             widget_id: graphObject?.widget_id,
//             value: false,
//           })
//         );

//         if (response?.data?.status === "successful") {
//           if (url1 === "tickets/simple-view") {
//             widget?.ticketSimpleView
//               ? dispatch(
//                   setTicketSimpleView(
//                     response?.data?.result,
//                     widget?.ticketSimpleView,
//                     widget?.widget_index
//                   )
//                 )
//               : dispatch(
//                   setWidgetGraphData(
//                     response?.data?.result,
//                     widget?.pane_index,
//                     widget?.panes,
//                     widget?.section_index,
//                     widget?.widget_index,
//                     body,
//                     graphObject
//                   )
//                 );
//           } else if (url1 === "tickets/orm") {
//             widget?.ticketTAT
//               ? dispatch(
//                   setTicketTAT(
//                     response?.data?.result,
//                     widget?.ticketTAT,
//                     widget?.widget_index
//                   )
//                 )
//               : dispatch(
//                   setWidgetGraphData(
//                     response?.data?.result,
//                     widget?.pane_index,
//                     widget?.panes,
//                     null,
//                     widget?.widget_index,
//                     body,
//                     graphObject
//                   )
//                 );
//           } else if (url1 === "tickets/overview") {
//             widget?.ticketTAT
//               ? dispatch(
//                   setTicketTAT(
//                     response?.data?.result,
//                     widget?.ticketTAT,
//                     widget?.widget_index
//                   )
//                 )
//               : dispatch(
//                   setWidgetGraphData(
//                     response?.data?.result,
//                     widget?.pane_index,
//                     widget?.panes,
//                     null,
//                     widget?.widget_index,
//                     body,
//                     graphObject
//                   )
//                 );
//           } else if (url1 === "listening/SMA/facebook") {
//             widget?.ticketTAT
//               ? dispatch(
//                   setTicketTAT(
//                     response?.data?.result,
//                     widget?.ticketTAT,
//                     widget?.widget_index
//                   )
//                 )
//               : dispatch(
//                   setWidgetGraphData(
//                     response?.data?.result,
//                     widget?.pane_index,
//                     widget?.panes,
//                     null,
//                     widget?.widget_index,
//                     body,
//                     graphObject
//                   )
//                 );
//           } else {
//             dispatch(
//               setWidgetGraphData(
//                 response?.data?.result,
//                 widget?.pane_index,
//                 widget?.panes,
//                 widget?.section_index,
//                 widget?.widget_index,
//                 body,
//                 graphObject
//               )
//             );
//           }
//         }
//         if (response?.data?.status === "error") {
//           widget?.ticketTAT
//             ? dispatch(
//                 setTicketTAT(
//                   response?.data?.reason,
//                   widget?.ticketTAT,
//                   widget?.widget_index
//                 )
//               )
//             : dispatch(
//                 setWidgetGraphData(
//                   response?.data?.reason,
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
//           if (response?.data?.error_code === 11) {
//             dispatch({ type: "SET_PANE", panes: initialPanes });
//             workspaceNotExist(true);
//           }
//         }
//       })
//       .catch((error) => {
//         dispatch(setPreWidgetLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           //callNotification(null, "error");
//         }
//       });
//   };
// };

// export const getTrendsData = (graphObject, widget, finalData, template_id) => {
//   return async (dispatch) => {
//     let errorMessage;
//     let brands = graphObject?.brands?.columns
//       ? graphObject?.brands?.columns
//       : graphObject?.brands;
//     let single_brands = [];
//     let brandsGroupName = [];
//     if (!graphObject?.isBrandModified) {
//       brandsGroupName =
//         brands && brands[0]?.brand_list
//           ? [
//               {
//                 brand_group_name: brands[0]?.brand_group_name,
//               },
//             ]
//           : single_brands?.push({
//               brand_id: brands && brands[0]?.brand_id && brands[0]?.brand_id,
//               brand_name:
//                 brands &&
//                 (brands[0]?.brand_name
//                   ? brands[0]?.brand_name
//                   : brands[0]?.name),
//             });
//     } else {
//       if (brands?.length > 0) {
//         brands &&
//           brands?.map((el) => {
//             if (el?.group || el?.brand_group_name) {
//               brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//             }
//           });

//         brands &&
//           brands?.map((el) => {
//             if (!el?.group) {
//               single_brands.push({
//                 brand_id: el?.brand_id ? el?.brand_id : el?.name,
//                 brand_name: el?.brand_name ? el?.brand_name : el?.name,
//               });
//             }
//           });
//       } else {
//         single_brands.push({
//           brand_id: brands ? brands?.brand_id : brands?.name,
//           brand_name: brands?.name,
//         });
//       }
//     }
//     let brandId = graphObject?.payload
//       ? graphObject?.body?.brand_id
//         ? graphObject?.body?.brand_id
//         : graphObject?.body?.brand_list?.[0]?.brand_id
//         ? graphObject?.body?.brand_list?.[0]?.brand_id
//         : graphObject?.body?.brand_groups?.[0]?.brand_id
//       : single_brands && single_brands?.[0]?.brand_id
//       ? single_brands && single_brands?.[0]?.brand_id
//       : brandsGroupName && brandsGroupName?.[0]?.brand_id;
//     //let brandName=
//     let brandName = graphObject?.payload
//       ? graphObject?.body?.brand_name
//         ? graphObject?.body?.brand_name
//         : graphObject?.body?.brand_list?.[0]?.brand_name
//         ? graphObject?.body?.brand_list?.[0]?.brand_name
//         : graphObject?.body?.brand_groups?.[0]?.brand_name
//       : single_brands && single_brands?.[0]?.brand_name
//       ? single_brands && single_brands?.[0]?.brand_name
//       : brandsGroupName && brandsGroupName?.[0]?.brand_name;

//     // currently we support single date selection for trends
//     let endDate = graphObject?.body?.end_date
//       ? graphObject?.body?.end_date
//       : graphObject?.end_date
//       ? graphObject?.end_date
//       : graphObject?.duration?.to;
//     let startDate = moment(endDate).format("YYYY/MM/DD");
//     let updateObj = {};
//     updateObj.AgentActivity = startDate;
//     dispatch(setSingleDate(updateObj));
//     let body = graphObject?.payload
//       ? {
//           ptoken: graphObject?.body?.ptoken,
//           start_date: startDate + " 00:00",
//           end_date: endDate,
//           brand_id: brandId,
//           brand_name: brandName,
//           utcoffset: getUTCOffset(),
//           team_user_id: graphObject?.teamUserId,
//           is_modified_date: graphObject?.is_modified_date,
//         }
//       : {
//           ptoken: graphObject?.authParams?.ptoken,
//           start_date: startDate + " 00:00",
//           end_date: endDate,
//           brand_id: brandId,
//           brand_name: brandName,
//           utcoffset: getUTCOffset(),
//           team_user_id: graphObject?.teamUserId,
//           is_modified_date: graphObject?.is_modified_date,
//         };
//     graphObject.body = body;
//     dispatch(setTrendsData(null));
//     let url = `${Config.config1.api_link}/tickets/agent-activity/deep-dive`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.status === 200) {
//           if (response?.data?.status === "successful") {
//             dispatch(
//               setTrendsData({
//                 ...response?.data?.result,
//                 payloadObj: graphObject,
//               })
//             );
//           } else if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });
//             callNotification(response?.data?.reason, "error");
//             dispatch(setTrendsData(null));
//           }
//         } else {
//           dispatch(setTrendsData(null));
//           callNotification(response?.data?.reason, "error");
//         }
//       })
//       .catch((error) => {
//         dispatch(setTrendsData(null));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           //callNotification(null, "error");
//         }
//       });
//   };
// };

// // Profile Filter
// export const getProfileFilterList = (
//   authParams,
//   templatefetchRes,
//   paneObject
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
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
//       : paneObject?.brands
//       ? paneObject?.brands
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
//         if (Array.isArray(brands)) {
//           brands?.map((el) => {
//             if (el?.group || el?.brand_group_name) {
//               brandsGroupName.push({
//                 brand_group_name: el?.brand_group_name,
//               });
//             }
//           });

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
//         } else if (brands?.brand_id) {
//           //for ticket dashboards
//           single_brands = [brands];
//         }
//       }
//     }

//     dispatch({
//       type: "SET_PROFILE_FILTER_LOADER",
//       payload: true,
//     });
//     !paneObject?.widget_brand_change && dispatch(setProfileLoader(true));
//     paneObject?.setTemplateFilter &&
//       dispatch(
//         setWidgetLoader({
//           value: true,
//           widget_index: paneObject?.widget_index,
//           section_index: paneObject?.section_index,
//           widget_id: paneObject?.widget_id,
//           global: false,
//         })
//       );
//     paneObject?.setTemplateFilter && dispatch(setGraphLoader(true));
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         brand_list:
//           single_brands && single_brands?.[0]?.brand_id ? single_brands : null,
//         brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//         filters: [],
//         hidden_filter: null,
//         quick_filter_key: "accountid",
//       };
//       let url = `${Config.config1.api_link}/template/search-profile`;

//       await axios

//         .post(url, body)
//         .then((response) => {
//           if (response?.data?.status === "successful") {
//             dispatch({
//               type: "SET_PROFILE_FILTER_LOADER",
//               payload: false,
//             });
//             dispatch(setProfileLoader(false));
//             paneObject?.setTemplateFilter &&
//               dispatch(
//                 setWidgetLoader({
//                   value: false,
//                   widget_index: null,
//                   section_index: null,
//                   global: false,
//                 })
//               );
//             paneObject?.setTemplateFilter && dispatch(setGraphLoader(false));

//             // Update Panes of widget level
//             if (paneObject?.section_metadata) {
//               if (paneObject?.sectionIndex >= 0) {
//                 paneObject.panes[paneObject.index].sections[
//                   paneObject?.sectionIndex
//                 ].profile_filters_list = response?.data?.result;
//               } else {
//                 paneObject.panes[
//                   paneObject.index
//                 ].section[0].profile_filters_list = response?.data?.result;
//               }
//               dispatch(
//                 setWidgetData(
//                   paneObject?.metadata,
//                   paneObject?.index,
//                   paneObject?.panes,
//                   paneObject?.sectionIndex >= 0
//                     ? paneObject?.sectionIndex
//                     : null,
//                   paneObject?.section_id, //section id for only widgets
//                   paneObject?.sectionObj,
//                   paneObject?.brands,
//                   true
//                 )
//               );
//               // dispatch(setWidgetUpdateFilterLoader(false));
//             } else if (paneObject?.metadata) {
//               paneObject.metadata.profile_filters_list = response?.data?.result;

//               let needToBeUpdateSection = paneObject?.setTemplateFilter
//                 ? true
//                 : paneObject?.metadata?.chart &&
//                   paneObject?.global_brand_check &&
//                   paneObject?.metadata?.chart?.["chart_settings"][
//                     "duplicate_for_brands"
//                   ];

//               dispatch(
//                 setWidgetData(
//                   paneObject?.metadata,
//                   paneObject?.index,
//                   paneObject?.panes,
//                   paneObject?.sectionIndex >= 0
//                     ? paneObject?.sectionIndex
//                     : null,
//                   paneObject?.section_id, //section id for only widgets
//                   paneObject?.sectionObj,
//                   paneObject?.brands,
//                   needToBeUpdateSection
//                 )
//               );
//               dispatch(setWidgetUpdateFilterLoader(false));
//             } else if (!paneObject?.setTemplateSectionFilter) {
//               // On change of global brand in Edit case
//               if (
//                 paneObject?.window_location_pathname == "create-dashboard" ||
//                 window.location.pathname?.split("/")?.[1] ===
//                   "edit-dashboard" ||
//                 window.location.pathname?.split("/")?.[1] === "create-dashboard"
//               ) {
//                 if (paneObject?.setTemplateGlobalFilter) {
//                   setClearWidgetGraphDataInEdit(
//                     paneObject?.templateObject,
//                     null,
//                     null
//                   );
//                 }

//                 dispatch(
//                   setTemplateDetails(
//                     paneObject?.templateObject?.templateDetails,
//                     {
//                       profile_filters_list: response?.data?.result,
//                     }
//                   )
//                 );
//               } else {
//                 // On change of global brand in View dashboard case
//                 // dispatch({
//                 //   type: "SET_PROFILE_FILTER_LIST",
//                 //   payload: response?.data?.result,
//                 // });

//                 // Set data profile_filter_list in panes
//                 dispatch(
//                   setGlobalProfileFilterList(
//                     response?.data?.result,
//                     paneObject?.panes,
//                     paneObject?.index
//                   )
//                 );
//               }
//             }

//             // Call Section Fetch API here (Initially called)
//             if (paneObject?.initialLoad) {
//               let hiddenFilter = templatefetchRes?.hidden_filter
//                 ? [templatefetchRes?.hidden_filter]
//                 : [];

//               let quickFilter = authParams?.quickFilterValue
//                 ? [
//                     {
//                       attribute:
//                         templatefetchRes.quick_filter?.toLowerCase() ===
//                         "accountid"
//                           ? "settingid"
//                           : templatefetchRes?.quick_filter?.toLowerCase() ===
//                             "category"
//                           ? "categoryid"
//                           : templatefetchRes.quick_filter?.toLowerCase(),
//                       type: "varchar",
//                       columns: [
//                         {
//                           name: authParams?.quickFilterValue?.toString(),
//                           type: "include",
//                         },
//                       ],
//                     },
//                     ...hiddenFilter,
//                   ]
//                 : response?.data?.result?.[0]?.id
//                 ? [
//                     {
//                       attribute:
//                         templatefetchRes.quick_filter?.toLowerCase() ===
//                         "accountid"
//                           ? "settingid"
//                           : templatefetchRes?.quick_filter?.toLowerCase() ===
//                             "category"
//                           ? "categoryid"
//                           : templatefetchRes.quick_filter?.toLowerCase(),
//                       type: "varchar",
//                       columns: [
//                         {
//                           name:
//                             templatefetchRes?.quick_filter === "Category"
//                               ? (response?.data?.result?.[0]?.id).toString()
//                               : (response?.data?.result?.[0]?.id).toString(),
//                           type: "include",
//                         },
//                       ],
//                     },
//                     ...hiddenFilter,
//                   ]
//                 : [...hiddenFilter];

//               paneObject.AllSection = templatefetchRes?.sections;
//               paneObject.onlyWidgets = templatefetchRes?.section_id
//                 ? true
//                 : false;

//               !authParams?.ppt &&
//                 dispatch(
//                   setFetchSectionData(
//                     authParams,
//                     paneObject?.newSection
//                       ? paneObject?.newSection
//                       : templatefetchRes?.sections
//                       ? templatefetchRes?.sections?.[0]?.section_id
//                       : templatefetchRes?.section_id,
//                     paneObject,
//                     templatefetchRes?.template_id,
//                     quickFilter
//                   )
//                 );
//             }

//             // Edit Dashboard, on change of Widget level brand called
//             if (paneObject?.setTemplateFilter) {
//               paneObject.templateFilter_templateObj.profile_filters_list =
//                 response?.data?.result;
//               dispatch(
//                 setTemplateFilter(
//                   paneObject?.templateFilter_obj,
//                   paneObject?.templateFilter_templateObj
//                 )
//               );
//               dispatch(
//                 setTemplateWidgetFilter(
//                   paneObject?.templateFilter_templateObj,
//                   false
//                 )
//               );
//             }

//             // Edit Dashboard, on change of Section Level brand called
//             if (paneObject?.setTemplateSectionFilter) {
//               paneObject.templateFilter_templateObj.profile_filters_list =
//                 response?.data?.result;
//               dispatch(
//                 setTemplateFilter(
//                   paneObject?.templateFilter_obj,
//                   paneObject?.templateFilter_templateObj
//                 )
//               );
//               dispatch(
//                 setTemplateSectionFilter(
//                   paneObject?.templateFilter_templateObj,
//                   false
//                 )
//               );
//             }

//             // if profile list is empty show notification
//             //            if(!paneObject?.initialLoad && response?.data?.result?.length === 0){
//             //              callNotification("No profiles available", "success");
//             //            }
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
//           // dispatch(setProfileLoader(false));
//         })
//         .catch((error) => {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//           // dispatch(setProfileLoader(false));
//         });
//     } else {
//       // dispatch({ type: "SET_PROFILE_FILTER_LIST", payload: null });
//       // Set null profile_filter_list in panes
//       dispatch(
//         setGlobalProfileFilterList(null, paneObject?.panes, paneObject?.index)
//       );
//     }
//   };
// };

// // Profile Filter
// export const resetProfileFilters = (
//   authParams,
//   template_id,
//   widget_id,
//   widget_uuid
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         template_id: template_id,
//         widget_id: widget_id?.length ? widget_id : null,
//         widget_uuid: widget_uuid?.length ? widget_uuid : null,
//       };
//       let url = `${Config.config1.api_link}/template/profile-reset`;

//       await axios

//         .post(url, body)
//         .then((response) => {
//           if (response?.data?.status === "successful") {
//             // Check Success full
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
//     }
//   };
// };
