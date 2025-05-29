// import axios from "axios";
// import Config from "../../../config";
// import "../../../app/custom.css";
// import { setUserName } from "../Attribute";
// import { notification } from "antd";
// import error1 from "../../../assets/error.svg";
// import {
//   remove,
//   setPaneOffset,
//   setIsPinned,
//   setIsAccessType,
//   setSocialMediaProfileList,
//   setPaneDuration,
//   setPaneBrands,
//   setisDeepDive,
//   onDashboardReset,
//   setWidgetData,
//   updateDashboardPills,
//   setClearTemplateData,
//   setDashboardCalledApiList,
//   setActiveSectionId,
//   setDashboardTemplateFilters,
//   setTicketIsModifiedDate,
//   setTemplateFiltersInPane,
// } from "../dashboard/Tab1";
// import {
//   sessionExpired,
//   callNotification,
//   errorCode,
//   initialPanes,
//   workspaceNotExist,
//   setCookie,
//   getPaneIndex,
//   getCustomizedDate,
//   getTimeInterval,
//   getBrands,
//   getDefaultCompBrand,
//   getSelectedCompBrand,
//   getDuplicateWidgets,
//   checkForDuplicateWidgets,
//   getGlobalPaneBrandsValue,
//   getTimeIntervalDate,
//   getFilterDuplicateWidgets,
//   splitSectionWidgetsInShare,
//   getCombinedDate,
//   getTemporaryWords,
//   getAllFilters,
//   getWidgetGraphObject,
//   getAllShareFilters,
//   deepCopy,
//   addDashboardCalledApiList,
//   getGlobalPPTBrandsValue,
//   getDefaultGlobalBrand,
//   getPrivateConversationFilters,
//   getDefaultDuration,
//   getSimilarStaticFilter,
//   getUTCOffset,
//   getWordCloudSectionsWidgets,
// } from "../../constants";
// import {
//   setAuthParams,
//   setGlobalBrands,
//   setGlobalCategory_id,
//   setGlobalDuration,
//   setGlobalSingleBrands,
//   setPersistAuthParams,
//   updateAuthParamsTemplateId,
// } from "../AuthParams";
// import {
//   setWidgets,
//   setTemplateInPane,
//   setIsDashboard,
// } from "../dashboard/Tab1";
// import {
//   getProfileFilterList,
//   setConfiguration,
//   setGraphData,
//   setGraphLoader,
//   setPreWidgetsData,
//   setTemplateLoader,
// } from "../ApiCall";
// import moment from "moment";
// import {
//   setActiveSectionKey,
//   setAddSection,
//   setEditTemplateWidget,
//   setFooterValue,
// } from "../section/section";
// import { setSectionOffset, setSharableData } from "../dashboard/dashboard";
// import { setIsEditTemplate } from "../section/section";
// import { setGraphShareFetch } from "../ApiCall";
// import { setAggregateData } from "../ApiCall";
// import { setTicketOffset } from "../ormWidget/Orm";
// import { setPdfDownloadStatus } from "../pdfdownload/pdfdownload";
// import { setOptionHighChart } from "../HighChart";
// import {
//   setCompetitorBrands,
//   setPageChart,
//   setProfileList,
//   setWidgetMakerEnabled,
//   setWidgetMakerGraphData,
//   setWidgetMakerShareGraphData,
//   setWidgetMakerSharePageGraphData,
// } from "../WidgetMaker/WidgetAPI";
// import {
//   setChannelImage,
//   setClearBrandAndDuration,
//   setProfileImage,
//   setSelectProfileId,
// } from "../Template";
// import { setTemplateMetaData } from "../scheduleReport/scheduleReport";
// import {
//   setCallPpt,
//   setPPTGenerateStatus,
//   setPPTModalOpen,
//   setPptId,
// } from "../PPT";
// import { setDeepDiveFlag } from "../DeepDive";
// import uuid from "react-uuid";

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

// // Previous code of  setTemplateDataList

// // export const setTemplateDataList = (basicObj, paneObj) => {
// //   let errorMessage;
// //   return async (dispatch) => {
// //     if (paneObj && window?.location?.pathname === "/schedule") {
// //       dispatch(
// //         updateDashboardPills("All Dashboards", paneObj?.index, paneObj?.panes)
// //       );
// //     }

// //     console.log("setTemplateDataList got called : ","basicObj : ",basicObj,"paneObj",paneObj)
// //     dispatch(setTemplateListLoader(true));
// //     if (basicObj?.authParams) {
// //       let body = {
// //         ptoken: basicObj?.authParams?.ptoken,
// //         type: paneObj?.type,
// //         filter: {
// //           search_text: basicObj?.search_text,
// //           pill: basicObj?.pill,
// //           offset: basicObj?.offset,
// //           no_of_rows: basicObj?.no_of_rows,
// //           sort_expression: basicObj?.sort_expression,
// //           sort_order: basicObj?.sort_order,
// //           // type: basicObj?.type,
// //         },
// //       };
// //       let url = `${Config.config1.api_link}/template/template-list`;
// //       await axios

// //         .post(url, body)
// //         .then((response) => {
// //           dispatch(setTemplateListLoader(false));
// //           dispatch(setDeepDiveFlag(false));
// //           if (response?.data?.status === "successful") {
// //             // received list

// //             const data = response?.data?.result?.templates?.map((el) => el);
// //             // code for pin dashboard

// //             if (paneObj && window.location.pathname === "/dashboard") {
// //               if (
// //                 basicObj?.authParams?.template_id &&
// //                 !basicObj?.authParams?.ppt
// //               ) {
// //                 //to close deep dive if deep dive is already opened
// //                 dispatch(setisDeepDive(false, paneObj?.panes, paneObj?.index));

// //                 let brands1;
// //                 brands1 = [
// //                   "000-000-001",
// //                   "000-000-002",
// //                   "000-000-003",
// //                   "000-000-004",
// //                 ].includes(basicObj?.authParams?.template_id)
// //                   ? paneObj?.global_dashboard_single_brands
// //                     ? [paneObj?.global_dashboard_single_brands?.columns]
// //                     : [paneObj?.singleBrands[0]]
// //                   : null;

// //                 let paneBrandsObj = getGlobalPaneBrandsValue(
// //                   basicObj?.authParams,
// //                   paneObj
// //                 );

// //                 if (basicObj?.authParams?.brandID) {
// //                   paneObj.global_dashboard_brands =
// //                     paneBrandsObj?.selectBrands === "clear"
// //                       ? null
// //                       : paneBrandsObj?.selectBrands;
// //                 }

// //                 paneBrandsObj?.selectBrands &&
// //                   !basicObj?.authParams?.ppt &&
// //                   dispatch(setPaneBrands(paneBrandsObj, "global_dashboard"));

// //                 if (
// //                   basicObj?.authParams?.startDate &&
// //                   basicObj?.authParams?.endDate
// //                 ) {
// //                   let Endyear = moment(
// //                     basicObj?.authParams?.endDate?.split("T").join(" ")
// //                   ).year();
// //                   let current_date = moment().format("YYYY/MM/DD HH:mm");
// //                   let final_end_date, final_start_date;
// //                   if (Endyear == "1900") {
// //                     final_end_date = current_date;
// //                   }
// //                   let dateDiff = Math?.ceil(
// //                     Number(
// //                       moment(
// //                         basicObj?.authParams?.endDate?.split("T").join(" ")
// //                       ).diff(
// //                         moment(
// //                           basicObj?.authParams?.startDate?.split("T").join(" ")
// //                         ),
// //                         "days",
// //                         true
// //                       )
// //                     )
// //                   );

// //                   // new code start
// //                   let currentEndDate = moment(new Date()).format(
// //                     "YYYY/MM/DD H:mm"
// //                   );
// //                   let start_date_con = moment(
// //                     basicObj?.authParams?.startDate?.split("T")?.join(" ")
// //                   )?.format("YYYY/MM/DD H:mm");
// //                   let end_date_con = moment(
// //                     basicObj?.authParams?.endDate?.split("T")?.join(" ")
// //                   )?.format("YYYY/MM/DD H:mm");
// //                   if (
// //                     start_date_con < currentEndDate &&
// //                     end_date_con > currentEndDate
// //                   ) {
// //                     final_end_date = currentEndDate;
// //                   }

// //                   // get date difference for which end date is greater than current date
// //                   let final_date_diff;
// //                   if (start_date_con && final_end_date) {
// //                     final_date_diff =
// //                       moment(final_end_date).diff(start_date_con, "days") + 1;
// //                   }

// //                   // new code end 2 condition added
// //                   if (final_date_diff < 7 && end_date_con > currentEndDate) {
// //                     final_start_date =
// //                       moment(start_date_con).format("YYYY/MM/DD H:mm");
// //                   } else if (
// //                     final_date_diff > 7 &&
// //                     end_date_con > currentEndDate
// //                   ) {
// //                     final_start_date = moment(final_end_date)
// //                       .subtract(6, "d")
// //                       .set({ hour: "00", minute: "00" })
// //                       .format("YYYY/MM/DD HH:mm");
// //                   } else if (dateDiff > 7 && end_date_con < currentEndDate) {
// //                     //check if diff is more than 7, then make the selected date 7 days, i.e end date -7
// //                     final_start_date = moment(
// //                       basicObj?.authParams?.endDate?.split("T").join(" ")
// //                     )
// //                       .subtract(6, "d")
// //                       .format("YYYY/MM/DD HH:mm");
// //                   }

// //                   let paneObject = {
// //                     duration: {
// //                       from: final_start_date
// //                         ? final_start_date
// //                         : moment(
// //                             basicObj?.authParams?.startDate
// //                               ?.split("T")
// //                               ?.join(" ")
// //                           )?.format("YYYY/MM/DD H:mm"),
// //                       to: final_end_date
// //                         ? final_end_date
// //                         : moment(
// //                             basicObj?.authParams?.endDate?.split("T")?.join(" ")
// //                           )?.format("YYYY/MM/DD H:mm"),
// //                     },
// //                     panes: paneObj?.panes,
// //                     index: paneObj?.index,
// //                   };
// //                   paneObj.global_dashboard_duration = paneObject?.duration;

// //                   dispatch(setPaneDuration(paneObject, "global_dashboard"));
// //                 } else if (paneObj?.global_dashboard_duration) {
// //                   let paneObject = {
// //                     duration: paneObj?.global_dashboard_duration,
// //                     panes: paneObj?.panes,
// //                     index: paneObj?.index,
// //                   };

// //                   dispatch(setPaneDuration(paneObject, "global_dashboard"));
// //                 }
// //                 let paneObject = {
// //                   index: paneObj?.index,
// //                   brands: brands1 ? brands1 : paneObj?.brands,
// //                   singleBrands: paneObj?.singleBrands,
// //                   panes: paneObj?.panes,
// //                   activeKey: paneObj?.activeKey,
// //                   firstSection: true,
// //                   templateDetails: paneObj?.templateDetails,
// //                   global_dashboard_brands: [
// //                     "000-000-001",
// //                     "000-000-002",
// //                     "000-000-003",
// //                     "000-000-004",
// //                   ].includes(basicObj?.authParams?.template_id)
// //                     ? paneObj?.global_dashboard_single_brands
// //                     : paneBrandsObj?.selectBrands === "clear"
// //                     ? null
// //                     : paneObj?.global_dashboard_brands,
// //                   global_dashboard_duration: paneObj?.global_dashboard_duration,
// //                   competitorBrands: paneObj?.competitorBrands,
// //                   template_list: true,
// //                   graphConditionConfig: paneObj?.graphConditionConfig,
// //                 };

// //                 dispatch(setIsDashboard(true, paneObj?.index, paneObj?.panes));
// //                 let template = data?.find(
// //                   (el) => el?.template_id === basicObj?.authParams?.template_id
// //                 );
// //                 basicObj?.authParams?.category_id &&
// //                   dispatch(
// //                     setFetchTemplateData(
// //                       basicObj?.authParams,
// //                       basicObj?.authParams?.template_id,
// //                       paneObject,
// //                       template
// //                     )
// //                   );
// //                 // }
// //               } else if (paneObj?.panes[paneObj?.index]?.template_id) {
// //                 let paneObject = {
// //                   ...paneObj,
// //                   firstSection: true,
// //                   template_list: true,
// //                 };
// //                 dispatch(setisDeepDive(false, paneObj?.panes, paneObj?.index));

// //                 if (!paneObj?.panes?.[paneObj?.index]?.isDashboard) {
// //                   dispatch(
// //                     setClearTemplateData(null, paneObj?.index, paneObj?.panes)
// //                   );
// //                   dispatch(setGlobalLoader(false));
// //                 } else {
// //                   let template = data?.find(
// //                     (el) =>
// //                       el?.template_id ===
// //                       paneObj?.panes[paneObj?.index]?.template_id
// //                   );
// //                   // to clear panes in case of schedule report
// //                   let panesTemplateId = global?.panes
// //                     ? global?.panes[paneObj?.index]?.template_id
// //                     : paneObj?.panes[paneObj?.index]?.template_id;
// //                   basicObj?.authParams?.category_id &&
// //                     paneObj?.panes &&
// //                     panesTemplateId &&
// //                     !paneObj?.template_update &&
// //                     dispatch(
// //                       setFetchTemplateData(
// //                         basicObj?.authParams,
// //                         paneObj?.panes[paneObj?.index]?.template_id,
// //                         paneObject,
// //                         template
// //                       )
// //                     );
// //                 }

// //                 //to persist brands data on ppt download
// //                 if (basicObj?.authParams?.ppt) {
// //                 } else if (!paneObj?.template_update) {
// //                   let paneBrandsObj = getGlobalPaneBrandsValue(
// //                     null,
// //                     paneObj,
// //                     paneObj?.panes[paneObj?.index]?.template_id,
// //                     paneObj?.panes[paneObj?.index]?.quick_filter
// //                   );
// //                   paneObject.global_dashboard_brands =
// //                     paneBrandsObj?.selectBrands === "clear"
// //                       ? null
// //                       : paneBrandsObj?.selectBrands;
// //                   paneBrandsObj?.selectBrands &&
// //                     !basicObj?.authParams?.ppt &&
// //                     dispatch(setPaneBrands(paneBrandsObj, "global_dashboard"));
// //                 }

// //                 if (
// //                   paneObj?.global_dashboard_duration &&
// //                   !paneObj?.template_update
// //                 ) {
// //                   let paneObject = {
// //                     duration: paneObj?.global_dashboard_duration,
// //                     panes: paneObj?.panes,
// //                     index: paneObj?.index,
// //                   };

// //                   dispatch(setPaneDuration(paneObject, "global_dashboard"));
// //                 }
// //               } else {
// //                 let paneObject = {
// //                   ...paneObj,
// //                   firstSection: true,
// //                 };

// //                 let template_index =
// //                   response?.data?.result?.templates?.findIndex(
// //                     (el) => el?.is_pinned
// //                   );
// //                 let template_id =
// //                   response?.data?.result?.templates[template_index]
// //                     ?.template_id;
// //                 let paneIndex = paneObj?.panes?.findIndex(
// //                   (el) => el?.template_id === template_id
// //                 );

// //                 // Temporary commented code

// //                 // if (template_index >= 1 && paneIndex < 0) {
// //                 //   dispatch(setIsPinned(true, paneObj?.panes, paneObj?.index));
// //                 //   dispatch(
// //                 //     setIsDashboard(true, paneObj?.index, paneObj?.panes)
// //                 //   );
// //                 //   basicObj?.authParams?.category_id &&
// //                 //     dispatch(
// //                 //       setFetchTemplateData(
// //                 //         basicObj?.authParams,
// //                 //         response?.data?.result?.templates[template_index]
// //                 //           ?.template_id,
// //                 //         paneObject
// //                 //       )
// //                 //     );
// //                 // }
// //               }
// //             }

// //             //code to add new cards

// //             if (paneObj && window.location.pathname === "/schedule") {
// //               dispatch(setTemplateListType("report"));
// //             } else {
// //               dispatch(setTemplateListType("dashboard"));
// //             }

// //             dispatch({ type: "SET_TEMPLATE_DATA", payload: data });
// //             dispatch({
// //               type: "SET_DASHBOARD_PILLS",
// //               payload: response?.data?.pills,
// //             });
// //             dispatch({
// //               type: "SET_DASHBOARD_TOTAL_PAGE_NO",
// //               payload: response?.data?.no_of_pages,
// //             });

// //             // On refresh browser reset Active Section Key and Id
// //             dispatch(setActiveSectionKey(null));
// //             paneObj?.panes &&
// //               paneObj?.index &&
// //               dispatch(
// //                 setActiveSectionId(null, paneObj?.panes, paneObj?.index)
// //               );

// //             // Reset CalledAPIList State
// //             if (paneObj?.panes && paneObj?.index) {
// //               dispatch(
// //                 setDashboardCalledApiList(null, paneObj?.panes, paneObj?.index)
// //               );
// //             }
// //           }

// //           if (response?.data?.status === "error") {
// //             errorCode?.map((el, i) => {
// //               return el.key === response?.data?.error_code
// //                 ? (errorMessage = el.value)
// //                 : null;
// //             });

// //             callNotification(errorMessage, "error");
// //             if (response?.data?.error_code === 9) {
// //               sessionExpired(true);
// //             }
// //             if (response?.data?.error_code === 11) {
// //               dispatch({ type: "SET_PANE", panes: initialPanes });
// //               workspaceNotExist(true);
// //             }
// //           }
// //         })
// //         .catch((error) => {
// //           dispatch(setDeepDiveFlag(false));
// //           dispatch(setGlobalLoader(false));
// //           dispatch(setTemplateListLoader(false));
// //           // Request aborted
// //           if (error.message !== "Request aborted") {
// //             callNotification(null, "error");
// //           }
// //         });
// //     } else {
// //       dispatch(setDeepDiveFlag(false));
// //       dispatch({ type: "SET_TEMPLATE_DATA", payload: null });
// //     }
// //   };
// // };
// // Previous code of  setTemplateDataList
// //api call to fetch template data
// // export const setFetchTemplateData = (
// //   authParams,
// //   id,
// //   paneObject,
// //   templateObject
// // ) => {
// //   let errorMessage;
// //   if (paneObject?.deepLink) global.dashboard_id = id;
// //   else {
// //     global.dashboard_id = null;
// //   }
// //   return async (dispatch) => {
// //     dispatch(
// //       setFooterValue({
// //         section: false,
// //         widget: false,
// //         template: false,
// //         dashboard: true,
// //       })
// //     );
// //     dispatch(setTemplateSectionFetchLoader(true));
// //     if (authParams) {
// //       let body = {
// //         ptoken: authParams?.ptoken,
// //         template_id: id,
// //         created_date: templateObject?.created_date
// //           ? templateObject?.created_date
// //           : moment()?.format("YYYY/MM/DD HH:mm"),
// //       };
// //       let url = `${Config.config1.api_link}/template/fetch`;
// //       await axios

// //         .post(url, body)
// //         .then((response) => {
// //           dispatch(setTemplateSectionFetchLoader(false));
// //           dispatch(setGlobalLoader(false));
// //           dispatch({ type: "SET_FETCH_TEMPLATE_DATA", payload: response });
// //           dispatch(setOptionHighChart(null));
// //           //to set section value in specific tab pane
// //           global.TabActiveKey = null; //for tab change

// //           if (response?.data?.status === "successful") {
// //             if (response?.data?.result?.sections) {
// //               //to highlight 1st section initally
// //               dispatch(
// //                 setActiveSectionKey(
// //                   response?.data?.result?.sections?.[0]?.section_id
// //                 )
// //               );
// //             }

// //             let hiddenFilter = response?.data?.result?.hidden_filter
// //               ? [response?.data?.result?.hidden_filter]
// //               : [];

// //             if (authParams?.ppt) {
// //               paneObject.index = 0;
// //               let paneBrandsObj = getGlobalPPTBrandsValue(
// //                 authParams,
// //                 paneObject
// //               );
// //               paneObject.global_dashboard_brands =
// //                 paneBrandsObj?.selectBrands === "clear"
// //                   ? null
// //                   : paneBrandsObj?.selectBrands;
// //               paneBrandsObj?.selectBrands &&
// //                 dispatch(setPaneBrands(paneBrandsObj, "global_dashboard"));
// //               //duration
// //               let duration = {
// //                 from: authParams?.start_date,
// //                 to: authParams?.end_date,
// //               };
// //               let paneObj1 = {
// //                 panes: paneObject?.panes,
// //                 index: paneObject?.index,
// //                 duration: duration,
// //                 templateGlobalDuration: duration,
// //               };
// //               paneObject.templateGlobalDuration = duration;
// //               dispatch(setPaneDuration(paneObj1, "global_dashboard"));
// //             }

// //             if (
// //               window?.location?.pathname === "/schedule" ||
// //               paneObject?.isScheduleReportOpen ||
// //               authParams?.ppt
// //             ) {
// //               // Don't Need to update brand in case of scheduling
// //               console.log(" Brand not changed")
// //             } else if (
// //               response?.data?.result?.brand_ids?.length > 0 ||
// //               response?.data?.result?.brand_groups?.length > 0
// //             ) {
// //               if (response?.data?.result?.comp_brand_list?.length > 0) {
// //                 let brands = getSelectedCompBrand(
// //                   paneObject?.competitorBrands,
// //                   response?.data?.result?.brand_ids,
// //                   response?.data?.result?.comp_brand_list
// //                 );
// //                 let paneObj = {
// //                   panes: paneObject?.panes,
// //                   index: paneObject?.index,
// //                   selectBrands: brands?.columns ? brands?.columns : brands,
// //                   templateGlobalBrands: brands?.columns
// //                     ? brands?.columns
// //                     : brands,
// //                 };

// //                 paneObject.templateGlobalBrands = brands?.columns
// //                   ? brands?.columns
// //                   : brands;
// //                 paneObject.global_dashboard_brands = null;

// //                 dispatch(setPaneBrands(paneObj, "global_dashboard"));
// //               } else {
// //                 let brands = getBrands(
// //                   paneObject?.brands,
// //                   response?.data?.result?.brand_ids,
// //                   paneObject?.singleBrands,
// //                   response?.data?.result?.brand_groups
// //                 );
// //                 let paneObj = {
// //                   panes: paneObject?.panes,
// //                   index: paneObject?.index,
// //                   selectBrands: brands?.columns,
// //                   templateGlobalBrands: brands?.columns,
// //                 };
// //                 paneObject.templateGlobalBrands = brands?.columns;
// //                 paneObject.global_dashboard_brands = null;

// //                 dispatch(setPaneBrands(paneObj, "global_dashboard"));
// //               }
// //             } else if (paneObject?.create || paneObject?.update) {
// //               //to clear pane brands if no brands selected
// //               if (response?.data?.result?.quick_filter) {
// //                 let paneBrandsObj = getGlobalPaneBrandsValue(
// //                   null,
// //                   paneObject,
// //                   response?.data?.result?.template_id,
// //                   response?.data?.result?.quick_filter
// //                 );

// //                 paneObject.global_dashboard_brands =
// //                   paneBrandsObj?.selectBrands === "clear"
// //                     ? null
// //                     : paneBrandsObj?.selectBrands;
// //                 paneBrandsObj?.selectBrands &&
// //                   dispatch(setPaneBrands(paneBrandsObj, "global_dashboard"));
// //               } else {
// //                 paneObject.template_type =
// //                   response?.data?.result?.template_type;
// //                 let paneBrandsObj = getGlobalPaneBrandsValue(
// //                   null,
// //                   paneObject,
// //                   response?.data?.result?.template_id,
// //                   response?.data?.result?.quick_filter
// //                 );

// //                 paneObject.global_dashboard_brands =
// //                   paneBrandsObj?.selectBrands === "clear"
// //                     ? null
// //                     : paneBrandsObj?.selectBrands;
// //                 paneBrandsObj?.selectBrands &&
// //                   dispatch(setPaneBrands(paneBrandsObj, "global_dashboard"));
// //               }
// //             } else if (!paneObject?.template_list && !paneObject?.schedule) {
// //               paneObject.template_type = response?.data?.result?.template_type;
// //               let paneBrandsObj = getGlobalPaneBrandsValue(
// //                 null,
// //                 paneObject,
// //                 response?.data?.result?.template_id,
// //                 response?.data?.result?.quick_filter
// //               );
// //               paneObject.global_dashboard_brands =
// //                 paneBrandsObj?.selectBrands === "clear"
// //                   ? null
// //                   : paneBrandsObj?.selectBrands;
// //               paneBrandsObj?.selectBrands &&
// //                 dispatch(setPaneBrands(paneBrandsObj, "global_dashboard"));
// //             } else if (
// //               paneObject?.template_list &&
// //               response?.data?.result?.quick_filter &&
// //               !authParams?.quickFilterValue
// //             ) {
// //               paneObject.template_type = response?.data?.result?.template_type;
// //               let paneBrandsObj = getGlobalPaneBrandsValue(
// //                 null,
// //                 paneObject,
// //                 response?.data?.result?.template_id,
// //                 response?.data?.result?.quick_filter
// //               );
// //               paneObject.global_dashboard_brands =
// //                 paneBrandsObj?.selectBrands === "clear"
// //                   ? null
// //                   : paneBrandsObj?.selectBrands;
// //               paneBrandsObj?.selectBrands &&
// //                 dispatch(setPaneBrands(paneBrandsObj, "global_dashboard"));
// //             }
// //             if (
// //               window?.location?.pathname === "/schedule" ||
// //               paneObject?.isScheduleReportOpen ||
// //               authParams?.ppt
// //             ) {
// //               console.log(" Duration not changed")
// //               // Don't Need to update duration in case of scheduling
// //             } else if (
// //               response?.data?.result?.start_date &&
// //               response?.data?.result?.end_date &&
// //               !authParams?.startDate
// //             ) {
// //               let duration = {
// //                 from: response?.data?.result?.start_date,
// //                 to: response?.data?.result?.end_date,
// //               };
// //               let paneObj = {
// //                 panes: paneObject?.panes,
// //                 index: paneObject?.index,
// //                 duration: duration,
// //                 templateGlobalDuration: duration,
// //               };
// //               paneObject.templateGlobalDuration = duration;
// //               dispatch(setPaneDuration(paneObj, "global_dashboard"));
// //             } else if (
// //               paneObject?.global_dashboard_duration &&
// //               !authParams?.startDate
// //             ) {
// //               //to set global duration
// //               let paneObj = {
// //                 panes: paneObject?.panes,
// //                 index: paneObject?.index,
// //                 duration: paneObject?.global_dashboard_duration,
// //                 templateGlobalDuration: paneObject?.global_dashboard_duration,
// //               };
// //               dispatch(setPaneDuration(paneObj, "global_dashboard"));
// //             } else if (!paneObject?.schedule && !authParams?.startDate) {
// //               //to clear pane duration if no duration is selected
// //               let paneObj = {
// //                 panes: paneObject?.panes,
// //                 index: paneObject?.index,
// //                 duration: null,
// //                 templateGlobalDuration: null,
// //               };
// //               dispatch(setPaneDuration(paneObj, "global_dashboard"));
// //             }
// //             if (
// //               response?.data?.result?.quick_filter &&
// //               !(
// //                 window?.location?.pathname === "/schedule" ||
// //                 paneObject?.isScheduleReportOpen
// //               )
// //             ) {
// //               dispatch(
// //                 setProfileList(authParams, response?.data?.result, paneObject)
// //               );
// //             } else {
// //               dispatch(
// //                 setIsAccessType(
// //                   response?.data?.result?.access_type,
// //                   paneObject?.panes,
// //                   paneObject?.index
// //                 )
// //               );

// //               let panes_filters =
// //                 paneObject?.panes?.[paneObject?.index]?.filters;
// //               let finalFilters =
// //                 panes_filters?.length && hiddenFilter?.length
// //                   ? panes_filters?.filter(
// //                       (el) => el?.attribute !== hiddenFilter?.[0]?.attribute
// //                     )
// //                   : panes_filters?.length
// //                   ? panes_filters
// //                   : [];
// //               let template = response?.data?.result
// //                 ? {
// //                     ...response?.data?.result,
// //                     filters: hiddenFilter?.length
// //                       ? [...finalFilters, ...hiddenFilter]
// //                       : [...finalFilters],
// //                   }
// //                 : {};

// //               if (
// //                 (window?.location?.pathname === "/schedule" ||
// //                   paneObject?.isScheduleReportOpen) &&
// //                 paneObject?.scheduleObj?.quick_filter
// //               ) {
// //                 let qk_filter = [paneObject?.scheduleObj?.quick_filter];
// //                 template = {
// //                   ...template,
// //                   filters: [...template?.filters, ...qk_filter],
// //                 };
// //               }

// //               dispatch(
// //                 setTemplateInPane(
// //                   template,
// //                   paneObject?.index,
// //                   paneObject?.panes
// //                 )
// //               );

// //               if (
// //                 response?.data?.result?.sections ||
// //                 response?.data?.result?.section_id
// //               ) {
// //                 if (
// //                   response?.data?.result?.template_type === "competition" &&
// //                   (paneObject?.competitorBrands?.length === 0 ||
// //                     !paneObject?.competitorBrands)
// //                 ) {
// //                 } else {
// //                   // dispatch(
// //                   //   setPaneOffset(0, paneObject?.index, paneObject?.panes)
// //                   // );

// //                   paneObject.AllSection = response?.data?.result?.sections;
// //                   paneObject.onlyWidgets = response?.data?.result?.section_id
// //                     ? true
// //                     : false;

// //                   // !urlParams?.ppt &&
// //                   //   dispatch(
// //                   //     setFetchSectionData(
// //                   //       authParams,
// //                   //       paneObject?.newSection
// //                   //         ? paneObject?.newSection
// //                   //         : response?.data?.result?.sections
// //                   //         ? response?.data?.result?.sections[0]?.section_id
// //                   //         : response?.data?.result?.section_id,
// //                   //       paneObject,
// //                   //       response?.data?.result?.template_id,
// //                   //       hiddenFilter
// //                   //     )
// //                   //   );

// //                   // On Refresh call Search - Profile
// //                   let paneBrandsObj = getGlobalPaneBrandsValue(
// //                     null,
// //                     paneObject,
// //                     response?.data?.result?.template_id,
// //                     response?.data?.result?.quick_filter
// //                   );

// //                   // To call Search-Profile API (Initial Case)
// //                   if (paneBrandsObj) {
// //                     paneObject.initialLoad = true;

// //                     if (paneObject?.panes?.[paneObject?.index]?.brands) {
// //                       paneObject.brands = paneObject?.panes[paneObject?.index]
// //                         ?.brands?.columns
// //                         ? paneObject?.panes[paneObject?.index]?.brands?.columns
// //                         : paneObject?.panes[paneObject?.index]?.brands;

// //                       response.data.result.isBrandModified = true;
// //                     }
// //                     dispatch(
// //                       getProfileFilterList(
// //                         authParams,
// //                         response?.data?.result,
// //                         paneObject
// //                       )
// //                     );
// //                   }
// //                 }
// //               }
// //             }

// //             if (
// //               window?.location?.pathname === "/schedule" ||
// //               paneObject?.isScheduleReportOpen
// //             ) {
// //               let brandIds = null;
// //               let brandGroups = null;
// //               let comBrandsList = null;
// //               if (
// //                 paneObject?.panes &&
// //                 paneObject?.panes[paneObject?.index]?.brands
// //               ) {
// //                 if (
// //                   paneObject?.panes[paneObject?.index]?.brands?.columns?.length
// //                 ) {
// //                   if (
// //                     !paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
// //                       ?.group &&
// //                     paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
// //                       ?.competitor
// //                   ) {
// //                     // For Competitor
// //                     brandIds = [
// //                       {
// //                         brand_id:
// //                           paneObject?.panes[paneObject?.index]?.brands
// //                             ?.columns?.[0]?.name,
// //                         brand_name:
// //                           paneObject?.panes[paneObject?.index]?.brands
// //                             ?.columns?.[0]?.brand_name,
// //                         brand_friendly_name:
// //                           paneObject?.panes[paneObject?.index]?.brands
// //                             ?.columns?.[0]?.brand_friendly_name,
// //                         brand_logo:
// //                           paneObject?.panes[paneObject?.index]?.brands
// //                             ?.columns?.[0]?.brand_logo,
// //                         brand_color:
// //                           paneObject?.panes[paneObject?.index]?.brands
// //                             ?.columns?.[0]?.brand_color,
// //                       },
// //                     ];
// //                     comBrandsList =
// //                       paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
// //                         ?.competitorList;
// //                   } else if (
// //                     paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
// //                       ?.group &&
// //                     !paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
// //                       ?.competitor
// //                   ) {
// //                     // For Logical Groups
// //                     brandGroups =
// //                       paneObject?.panes[paneObject?.index]?.brands
// //                         ?.columns?.[0];
// //                   } else if (
// //                     !paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
// //                       ?.group &&
// //                     !paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
// //                       ?.competitor
// //                   ) {
// //                     //For only brands
// //                     brandIds =
// //                       paneObject?.panes[paneObject?.index]?.brands
// //                         ?.columns?.[0];
// //                   }
// //                 } else {
// //                   if (
// //                     !paneObject?.panes[paneObject?.index]?.brands?.[0]?.group &&
// //                     paneObject?.panes[paneObject?.index]?.brands?.[0]
// //                       ?.competitor
// //                   ) {
// //                     // For Competitor
// //                     brandIds = [
// //                       {
// //                         brand_id:
// //                           paneObject?.panes[paneObject?.index]?.brands?.[0]
// //                             ?.name,
// //                         brand_name:
// //                           paneObject?.panes[paneObject?.index]?.brands?.[0]
// //                             ?.brand_name,
// //                         brand_friendly_name:
// //                           paneObject?.panes[paneObject?.index]?.brands?.[0]
// //                             ?.brand_friendly_name,
// //                         brand_logo:
// //                           paneObject?.panes[paneObject?.index]?.brands?.[0]
// //                             ?.brand_logo,
// //                         brand_color:
// //                           paneObject?.panes[paneObject?.index]?.brands?.[0]
// //                             ?.brand_color,
// //                       },
// //                     ];
// //                     comBrandsList =
// //                       paneObject?.panes[paneObject?.index]?.brands?.[0]
// //                         ?.competitorList;
// //                   } else if (
// //                     paneObject?.panes[paneObject?.index]?.brands?.[0]?.group &&
// //                     !paneObject?.panes[paneObject?.index]?.brands?.[0]
// //                       ?.competitor
// //                   ) {
// //                     // For Logical Groups
// //                     brandGroups = paneObject?.panes[paneObject?.index]?.brands;
// //                   } else if (
// //                     !paneObject?.panes[paneObject?.index]?.brands?.[0]?.group &&
// //                     !paneObject?.panes[paneObject?.index]?.brands?.[0]
// //                       ?.competitor
// //                   ) {
// //                     //For only brands
// //                     brandIds = paneObject?.panes[paneObject?.index]?.brands;
// //                   }
// //                 }
// //               }
// //               let templateMetaData = {
// //                 access_type: response?.data?.result?.access_type,
// //                 competition_aggregation:
// //                   response?.data?.result?.competition_aggregation,
// //                 contains_sections: response?.data?.result?.contains_sections,
// //                 hidden_filter: response?.data?.result?.hidden_filter,
// //                 is_brand_locked: response?.data?.result?.is_brand_locked,
// //                 is_date_locked: response?.data?.result?.is_date_locked,
// //                 predefined: response?.data?.result?.predefined,
// //                 template_id: response?.data?.result?.template_id,
// //                 template_name: response?.data?.result?.template_name,
// //                 template_description:
// //                   response?.data?.result?.template_description,
// //                 template_type: response?.data?.result?.template_type,
// //                 start_date:
// //                   paneObject?.panes[paneObject?.index]?.duration?.from,
// //                 end_date: paneObject?.panes[paneObject?.index]?.duration?.to,
// //                 quick_filter: paneObject?.scheduleObj?.quick_filter
// //                   ? paneObject?.scheduleObj?.quick_filter
// //                   : response?.data?.result?.quick_filter,
// //                 filters: [...hiddenFilter],
// //                 brand_ids: brandIds,
// //                 brand_groups: brandGroups,
// //                 comp_brand_list: comBrandsList,
// //               };
// //               dispatch(setTemplateMetaData(templateMetaData));
// //             }
// //           }
// //           if (response?.data?.status === "error") {
// //             errorCode?.map((el, i) => {
// //               return el.key === response?.data?.error_code
// //                 ? (errorMessage = el.value)
// //                 : null;
// //             });

// //             callNotification(errorMessage, "error");
// //             if (response?.data?.error_code === 9) {
// //               sessionExpired(true);
// //             }
// //             if (response?.data?.error_code === 11) {
// //               dispatch({ type: "SET_PANE", panes: initialPanes });
// //               workspaceNotExist(true);
// //             }
// //           }
// //         })
// //         .catch((error) => {
// //           dispatch(setGlobalLoader(false));
// //           dispatch(setTemplateSectionFetchLoader(false));
// //           // Request aborted
// //           if (error.message !== "Request aborted") {
// //             callNotification(null, "error");
// //           }
// //         });
// //     } else {
// //       dispatch({ type: "SET_FETCH_TEMPLATE_DATA", payload: null });
// //     }
// //   };
// // };

// export const setTemplateDataList = (basicObj, paneObj) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (paneObj && window?.location?.pathname === "/schedule") {
//       dispatch(
//         updateDashboardPills("All Dashboards", paneObj?.index, paneObj?.panes)
//       );
//     }
//     dispatch(setTemplateListLoader(true));
//     if (basicObj?.authParams) {
//       let body = {
//         ptoken: basicObj?.authParams?.ptoken,
//         type: paneObj?.type,
//         filter: {
//           search_text: basicObj?.search_text,
//           pill: basicObj?.pill,
//           offset: basicObj?.offset,
//           no_of_rows: basicObj?.no_of_rows,
//           sort_expression: basicObj?.sort_expression,
//           sort_order: basicObj?.sort_order,
//           // type: basicObj?.type,
//         },
//       };
//       let url = `${Config.config1.api_link}/template/template-list`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch(setTemplateListLoader(false));
//           dispatch(setDeepDiveFlag(false));
//           if (response?.data?.status === "successful") {
//             // received list

//             const data = response?.data?.result?.templates?.map((el) => el);
//             // code for pin dashboard

//             //to close deep dive if deep dive is already opened
//             if (paneObj?.panes && paneObj?.index >= 0) {
//               dispatch(setisDeepDive(false, paneObj?.panes, paneObj?.index));
//             }

//             if (paneObj && window.location.pathname === "/dashboard") {
//               if (
//                 basicObj?.authParams?.template_id &&
//                 !basicObj?.authParams?.ppt
//               ) {
//                 let paneObject = {
//                   ...paneObj,
//                   firstSection: true,
//                   template_list: true,
//                 };
//                 // isDashboard used to directly show dasboard instend of dashboard list
//                 dispatch(setIsDashboard(true, paneObj?.index, paneObj?.panes));
//                 let template = data?.find(
//                   (el) => el?.template_id === basicObj?.authParams?.template_id
//                 );
//                 basicObj?.authParams?.category_id &&
//                   !paneObj?.edited_dashboard_flow &&
//                   dispatch(
//                     setFetchTemplateData(
//                       basicObj?.authParams,
//                       basicObj?.authParams?.template_id,
//                       paneObject,
//                       template
//                     )
//                   );
//               } else if (paneObj?.panes[paneObj?.index]?.template_id) {
//                 let paneObject = {
//                   ...paneObj,
//                   firstSection: true,
//                   template_list: true,
//                 };

//                 if (!paneObj?.panes?.[paneObj?.index]?.isDashboard) {
//                   dispatch(
//                     setClearTemplateData(null, paneObj?.index, paneObj?.panes)
//                   );
//                   dispatch(setGlobalLoader(false));
//                 } else {
//                   let template = data?.find(
//                     (el) =>
//                       el?.template_id ===
//                       paneObj?.panes[paneObj?.index]?.template_id
//                   );
//                   // to clear panes in case of schedule report
//                   let panesTemplateId = global?.panes
//                     ? global?.panes[paneObj?.index]?.template_id
//                     : paneObj?.panes[paneObj?.index]?.template_id;

//                   basicObj?.authParams?.category_id &&
//                     paneObj?.panes &&
//                     panesTemplateId &&
//                     !paneObj?.template_update &&
//                     dispatch(
//                       setFetchTemplateData(
//                         basicObj?.authParams,
//                         paneObj?.panes[paneObj?.index]?.template_id,
//                         paneObject,
//                         template
//                       )
//                     );
//                 }
//               } else {
//                 let paneObject = {
//                   ...paneObj,
//                   firstSection: true,
//                 };

//                 let template_index =
//                   response?.data?.result?.templates?.findIndex(
//                     (el) => el?.is_pinned
//                   );
//                 let template_id =
//                   response?.data?.result?.templates[template_index]
//                     ?.template_id;
//                 let paneIndex = paneObj?.panes?.findIndex(
//                   (el) => el?.template_id === template_id
//                 );

//                 // Temporary commented code

//                 // if (template_index >= 1 && paneIndex < 0) {
//                 //   dispatch(setIsPinned(true, paneObj?.panes, paneObj?.index));
//                 //   dispatch(
//                 //     setIsDashboard(true, paneObj?.index, paneObj?.panes)
//                 //   );
//                 //   basicObj?.authParams?.category_id &&
//                 //     dispatch(
//                 //       setFetchTemplateData(
//                 //         basicObj?.authParams,
//                 //         response?.data?.result?.templates[template_index]
//                 //           ?.template_id,
//                 //         paneObject
//                 //       )
//                 //     );
//                 // }
//               }

//               // Update dashboard_template_filters state on refresh of schedule report
//               // Bcz, on refresh of schedule report reseting all panes data
//               // console.log("basicObj, paneObj", basicObj, paneObj);
//               if (paneObj?.panes && paneObj?.index >= 0) {
//                 dispatch(
//                   setDashboardTemplateFilters(
//                     paneObj?.panes?.[paneObj?.index]
//                       ?.dashboard_template_filters,
//                     paneObj?.index,
//                     paneObj?.panes
//                   )
//                 );
//               }
//             }

//             //code to add new cards

//             if (paneObj && window.location.pathname === "/schedule") {
//               dispatch(setTemplateListType("report"));
//             } else {
//               dispatch(setTemplateListType("dashboard"));
//             }

//             dispatch({ type: "SET_TEMPLATE_DATA", payload: data });
//             dispatch({
//               type: "SET_DASHBOARD_PILLS",
//               payload: response?.data?.pills,
//             });
//             dispatch({
//               type: "SET_DASHBOARD_TOTAL_PAGE_NO",
//               payload: response?.data?.no_of_pages,
//             });

//             // On refresh browser reset Active Section Key and Id
//             dispatch(setActiveSectionKey(null));
//             paneObj?.panes &&
//               paneObj?.index >= 0 &&
//               dispatch(
//                 setActiveSectionId(null, paneObj?.panes, paneObj?.index)
//               );

//             // Reset CalledAPIList State
//             if (paneObj?.panes && paneObj?.index >= 0) {
//               // Reset the is_dashboard_edited flag
//               if (
//                 paneObj?.panes?.[paneObj?.index]?.is_dashboard_edited &&
//                 paneObj?.panes?.[paneObj?.index]?.is_dashboard_edited !==
//                   undefined
//               ) {
//                 paneObj.panes[paneObj?.index].is_dashboard_edited = false;
//               }

//               dispatch(
//                 setDashboardCalledApiList(null, paneObj?.panes, paneObj?.index)
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
//             if (response?.data?.error_code === 11) {
//               dispatch({ type: "SET_PANE", panes: initialPanes });
//               workspaceNotExist(true);
//             }
//           }
//         })
//         .catch((error) => {
//           dispatch(setDeepDiveFlag(false));
//           dispatch(setGlobalLoader(false));
//           dispatch(setTemplateListLoader(false));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch(setDeepDiveFlag(false));
//       dispatch({ type: "SET_TEMPLATE_DATA", payload: null });
//     }
//   };
// };

// //api call to fetch template data
// export const setFetchTemplateData = (
//   authParams,
//   id,
//   paneObject,
//   templateObject
// ) => {
//   let errorMessage;
//   if (paneObject?.deepLink) global.dashboard_id = id;
//   else {
//     global.dashboard_id = null;
//   }
//   return async (dispatch) => {
//     dispatch(
//       setFooterValue({
//         section: false,
//         widget: false,
//         template: false,
//         dashboard: true,
//       })
//     );
//     dispatch(setTemplateSectionFetchLoader(true));
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         template_id: id,
//         created_date: templateObject?.created_date
//           ? templateObject?.created_date
//           : moment()?.format("YYYY/MM/DD HH:mm"),
//         call_source: templateObject?.call_source
//           ? templateObject?.call_source
//           : null,
//       };
//       let url = `${Config.config1.api_link}/template/fetch`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch(setTemplateSectionFetchLoader(false));
//           dispatch(setGlobalLoader(false));
//           dispatch({ type: "SET_FETCH_TEMPLATE_DATA", payload: response });
//           dispatch(setOptionHighChart(null));
//           //to set section value in specific tab pane
//           global.TabActiveKey = null; //for tab change

//           if (response?.data?.status === "successful") {
//             // Update Authparams template id
//             if (
//               id !== "000-000-001" &&
//               id !== "000-000-002" &&
//               id !== "000-000-003" &&
//               id !== "000-000-004" &&
//               authParams?.template_id
//             ) {
//               dispatch(
//                 updateAuthParamsTemplateId(authParams, {
//                   template_id: response?.data?.result?.template_id,
//                 })
//               );
//               global.dashboard_id = response?.data?.result?.template_id;
//             }
//             authParams &&
//               dispatch(
//                 getFilterTemplate(
//                   authParams,
//                   paneObject?.panes,
//                   paneObject?.index,
//                   response?.data?.result?.template_id
//                 )
//               );

//             if (response?.data?.result?.sections) {
//               //to highlight 1st section initally
//               dispatch(
//                 setActiveSectionKey(
//                   response?.data?.result?.sections?.[0]?.section_id
//                 )
//               );
//             }

//             let hiddenFilter = response?.data?.result?.hidden_filter
//               ? [response?.data?.result?.hidden_filter]
//               : [];
//             if (authParams?.ppt) {
//               paneObject.index = 0;
//               let paneBrandsObj = getGlobalPPTBrandsValue(
//                 authParams,
//                 paneObject
//               );
//               paneObject.global_dashboard_brands =
//                 paneBrandsObj?.selectBrands === "clear"
//                   ? null
//                   : paneBrandsObj?.selectBrands;
//               paneBrandsObj?.selectBrands &&
//                 dispatch(setPaneBrands(paneBrandsObj, "global_dashboard"));
//               //duration
//               let duration = {
//                 from: authParams?.start_date,
//                 to: authParams?.end_date,
//               };
//               let paneObj1 = {
//                 panes: paneObject?.panes,
//                 index: paneObject?.index,
//                 duration: duration,
//                 templateGlobalDuration: duration,
//               };
//               paneObject.templateGlobalDuration = duration;
//               dispatch(setPaneDuration(paneObj1, "global_dashboard"));
//             }
//             // calculation for barnd setup
//             if (
//               window?.location?.pathname === "/schedule" ||
//               paneObject?.isScheduleReportOpen ||
//               authParams?.ppt
//             ) {
//               // Don't Need to update brand in case of scheduling
//             } else if (
//               response?.data?.result?.brand_ids?.length > 0 ||
//               response?.data?.result?.brand_groups?.length > 0
//             ) {
//               if (response?.data?.result?.comp_brand_list?.length > 0) {
//                 let brands = getSelectedCompBrand(
//                   paneObject?.competitorBrands,
//                   response?.data?.result?.brand_ids,
//                   response?.data?.result?.comp_brand_list
//                 );
//                 let paneObj = {
//                   panes: paneObject?.panes,
//                   index: paneObject?.index,
//                   selectBrands: brands?.columns ? brands?.columns : brands,
//                   templateGlobalBrands: brands?.columns
//                     ? brands?.columns
//                     : brands,
//                 };

//                 paneObject.templateGlobalBrands = brands?.columns
//                   ? brands?.columns
//                   : brands;
//                 paneObject.global_dashboard_brands = null;

//                 dispatch(setPaneBrands(paneObj, "global_dashboard"));
//               } else {
//                 let brands = getBrands(
//                   paneObject?.brands,
//                   response?.data?.result?.brand_ids,
//                   paneObject?.singleBrands,
//                   response?.data?.result?.brand_groups
//                 );
//                 let paneObj = {
//                   panes: paneObject?.panes,
//                   index: paneObject?.index,
//                   selectBrands: brands?.columns,
//                   templateGlobalBrands: brands?.columns,
//                 };
//                 paneObject.templateGlobalBrands = brands?.columns;
//                 paneObject.global_dashboard_brands = null;

//                 dispatch(setPaneBrands(paneObj, "global_dashboard"));
//               }
//             } else {
//               paneObject.template_type = response?.data?.result?.template_type;
//               let quick_filter =
//                 paneObject?.graphConditionConfig &&
//                 paneObject?.graphConditionConfig?.single_brand_select?.includes(
//                   response?.data?.result?.template_id
//                 )
//                   ? true
//                   : response?.data?.result?.quick_filter;
//               let paneBrandsObj = getGlobalPaneBrandsValue(
//                 authParams?.template_id ? authParams : null,
//                 paneObject,
//                 response?.data?.result?.template_id,
//                 quick_filter
//               );
//               paneObject.global_dashboard_brands = paneBrandsObj?.selectBrands
//                 ? paneBrandsObj?.selectBrands
//                 : null;
//               paneBrandsObj?.selectBrands &&
//                 dispatch(setPaneBrands(paneBrandsObj, "global_dashboard"));
//             }

//             // calculation for duration setup
//             if (
//               window?.location?.pathname === "/schedule" ||
//               paneObject?.isScheduleReportOpen ||
//               authParams?.ppt
//             ) {
//               // Don't Need to update duration in case of scheduling
//             } else if (
//               //
//               authParams?.startDate &&
//               authParams?.endDate
//             ) {
//               let Endyear = moment(
//                 authParams?.endDate?.split("T")?.join(" ")
//               )?.year();
//               let current_date = moment()?.format("YYYY/MM/DD HH:mm");
//               let final_end_date, final_start_date;
//               if (Endyear == "1900") {
//                 final_end_date = current_date;
//               }
//               let dateDiff = Math?.ceil(
//                 Number(
//                   moment(authParams?.endDate?.split("T")?.join(" ")).diff(
//                     moment(authParams?.startDate?.split("T")?.join(" ")),
//                     "days",
//                     true
//                   )
//                 )
//               );

//               // new code start
//               let currentEndDate = moment(new Date())?.format(
//                 "YYYY/MM/DD H:mm"
//               );
//               let start_date_con = moment(
//                 authParams?.startDate?.split("T")?.join(" ")
//               )?.format("YYYY/MM/DD H:mm");
//               let end_date_con = moment(
//                 authParams?.endDate?.split("T")?.join(" ")
//               )?.format("YYYY/MM/DD H:mm");
//               if (
//                 start_date_con < currentEndDate &&
//                 end_date_con > currentEndDate
//               ) {
//                 final_end_date = currentEndDate;
//               }

//               // get date difference for which end date is greater than current date
//               let final_date_diff;
//               if (start_date_con && final_end_date) {
//                 final_date_diff =
//                   moment(final_end_date)?.diff(start_date_con, "days") + 1;
//               }

//               // new code end 2 condition added
//               if (final_date_diff < 7 && end_date_con > currentEndDate) {
//                 final_start_date =
//                   moment(start_date_con)?.format("YYYY/MM/DD H:mm");
//               } else if (final_date_diff > 7 && end_date_con > currentEndDate) {
//                 final_start_date = moment(final_end_date)
//                   ?.subtract(6, "d")
//                   ?.set({ hour: "00", minute: "00" })
//                   ?.format("YYYY/MM/DD HH:mm");
//               } else if (dateDiff > 7 && end_date_con < currentEndDate) {
//                 //check if diff is more than 7, then make the selected date 7 days, i.e end date -7
//                 final_start_date = moment(
//                   authParams?.endDate?.split("T")?.join(" ")
//                 )
//                   ?.subtract(6, "d")
//                   ?.format("YYYY/MM/DD HH:mm");
//               }

//               let paneObj = {
//                 duration: {
//                   from: final_start_date
//                     ? final_start_date
//                     : moment(
//                         authParams?.startDate?.split("T")?.join(" ")
//                       )?.format("YYYY/MM/DD H:mm"),
//                   to: final_end_date
//                     ? final_end_date
//                     : moment(
//                         authParams?.endDate?.split("T")?.join(" ")
//                       )?.format("YYYY/MM/DD H:mm"),
//                 },
//                 panes: paneObject?.panes,
//                 index: paneObject?.index,
//               };
//               paneObject.global_dashboard_duration = paneObj?.duration;

//               dispatch(setPaneDuration(paneObj, "global_dashboard"));
//             } else if (
//               response?.data?.result?.start_date &&
//               response?.data?.result?.end_date &&
//               !authParams?.startDate
//             ) {
//               let duration = {
//                 from: response?.data?.result?.start_date,
//                 to: response?.data?.result?.end_date,
//               };
//               let paneObj = {
//                 panes: paneObject?.panes,
//                 index: paneObject?.index,
//                 duration: duration,
//                 templateGlobalDuration: duration,
//               };
//               paneObject.templateGlobalDuration = duration;
//               dispatch(setPaneDuration(paneObj, "global_dashboard"));
//             } else {
//               //to set global duration
//               let defaultDuration = getDefaultDuration();
//               let paneObj = {
//                 panes: paneObject?.panes,
//                 index: paneObject?.index,
//                 duration: paneObject?.global_dashboard_duration
//                   ? paneObject?.global_dashboard_duration
//                   : defaultDuration,
//                 templateGlobalDuration: paneObject?.global_dashboard_duration,
//               };
//               dispatch(setPaneDuration(paneObj, "global_dashboard"));
//             }
//             if (
//               response?.data?.result?.quick_filter &&
//               !(
//                 window?.location?.pathname === "/schedule" ||
//                 paneObject?.isScheduleReportOpen
//               )
//             ) {
//               dispatch(
//                 setProfileList(authParams, response?.data?.result, paneObject)
//               );
//             } else {
//               !authParams?.ppt &&
//                 dispatch(
//                   setIsAccessType(
//                     response?.data?.result?.access_type,
//                     paneObject?.panes,
//                     paneObject?.index
//                   )
//                 );

//               let panes_filters = paneObject?.already_opened_dashboard
//                 ? paneObject?.panes?.[paneObject?.index]?.filters?.length
//                   ? paneObject?.panes?.[paneObject?.index]?.filters
//                   : []
//                 : paneObject?.panes?.[paneObject?.index]?.filters?.length
//                 ? paneObject?.panes?.[paneObject?.index]?.filters
//                 : response?.data?.result?.filters
//                 ? response?.data?.result?.filters
//                 : [];
//               // let saved_similar_hidden_filter_obj = getSimilarStaticFilter(
//               //   hiddenFilter,
//               //   panes_filters,
//               //   []
//               // );

//               // let saved_similar_hidden_filter =
//               //   saved_similar_hidden_filter_obj?.filter;

//               let finalFilters = panes_filters?.length ? panes_filters : [];

//               let template = response?.data?.result
//                 ? {
//                     ...response?.data?.result,
//                     filters: [...finalFilters],
//                     saved_filters: response?.data?.result?.filters,
//                   }
//                 : {};

//               if (
//                 (window?.location?.pathname === "/schedule" ||
//                   paneObject?.isScheduleReportOpen) &&
//                 paneObject?.scheduleObj?.quick_filter
//               ) {
//                 // let qk_filter = [paneObject?.scheduleObj?.quick_filter];
//                 template = {
//                   ...template,
//                   filters: [...template?.filters],
//                 };
//               }

//               dispatch(
//                 setTemplateInPane(
//                   template,
//                   paneObject?.index,
//                   paneObject?.panes
//                 )
//               );

//               if (
//                 response?.data?.result?.sections ||
//                 response?.data?.result?.section_id
//               ) {
//                 // if (
//                 //   response?.data?.result?.template_type === "competition" &&
//                 //   (paneObject?.competitorBrands?.length === 0 ||
//                 //     !paneObject?.competitorBrands)
//                 // ) {
//                 // } else {
//                 // dispatch(
//                 //   setPaneOffset(0, paneObject?.index, paneObject?.panes)
//                 // );

//                 paneObject.AllSection = response?.data?.result?.sections;
//                 paneObject.onlyWidgets = response?.data?.result?.section_id
//                   ? true
//                   : false;

//                 if (response?.data?.result?.template_id?.startsWith("000-")) {
//                   let templatefetchRes = response?.data?.result;
//                   let hiddenFilter = templatefetchRes?.hidden_filter
//                     ? [templatefetchRes?.hidden_filter]
//                     : [];

//                   let quickFilter = authParams?.quickFilterValue
//                     ? [
//                         {
//                           attribute:
//                             templatefetchRes.quick_filter === "AccountID"
//                               ? "SettingID"
//                               : templatefetchRes?.quick_filter === "Category"
//                               ? "CategoryID"
//                               : templatefetchRes.quick_filter,
//                           type: "varchar",
//                           columns: [
//                             {
//                               name: authParams?.quickFilterValue?.toString(),
//                               type: "include",
//                             },
//                           ],
//                         },
//                         ...hiddenFilter,
//                       ]
//                     : response?.data?.result?.[0]?.id
//                     ? [
//                         {
//                           attribute:
//                             templatefetchRes.quick_filter === "AccountID"
//                               ? "SettingID"
//                               : templatefetchRes?.quick_filter === "Category"
//                               ? "CategoryID"
//                               : templatefetchRes.quick_filter,
//                           type: "varchar",
//                           columns: [
//                             {
//                               name:
//                                 templatefetchRes?.quick_filter === "Category"
//                                   ? (response?.data?.result?.[0]?.id).toString()
//                                   : (response?.data?.result?.[0]?.id).toString(),
//                               type: "include",
//                             },
//                           ],
//                         },
//                         ...hiddenFilter,
//                       ]
//                     : [...hiddenFilter];

//                   !urlParams?.ppt &&
//                     dispatch(
//                       setFetchSectionData(
//                         authParams,
//                         paneObject?.newSection
//                           ? paneObject?.newSection
//                           : response?.data?.result?.sections
//                           ? response?.data?.result?.sections[0]?.section_id
//                           : response?.data?.result?.section_id,
//                         paneObject,
//                         response?.data?.result?.template_id,
//                         quickFilter
//                       )
//                     );
//                 } else {
//                   // On Refresh call Search - Profile
//                   // let paneBrandsObj = getGlobalPaneBrandsValue(
//                   //   null,
//                   //   paneObject,
//                   //   response?.data?.result?.template_id,
//                   //   response?.data?.result?.quick_filter
//                   // );

//                   // To call Search-Profile API (Initial Case)
//                   //if (paneBrandsObj) {
//                   paneObject.initialLoad = true;

//                   if (paneObject?.panes?.[paneObject?.index]?.brands) {
//                     paneObject.brands = paneObject?.panes[paneObject?.index]
//                       ?.brands?.columns
//                       ? paneObject?.panes[paneObject?.index]?.brands?.columns
//                       : paneObject?.panes[paneObject?.index]?.brands;

//                     response.data.result.isBrandModified = true;
//                   }
//                   dispatch(
//                     getProfileFilterList(
//                       authParams,
//                       response?.data?.result,
//                       paneObject
//                     )
//                   );
//                   //}

//                   //}
//                 }
//               }
//             }

//             if (
//               window?.location?.pathname === "/schedule" ||
//               paneObject?.isScheduleReportOpen
//             ) {
//               let brandIds = null;
//               let brandGroups = null;
//               let comBrandsList = null;
//               if (
//                 paneObject?.panes &&
//                 paneObject?.panes[paneObject?.index]?.brands
//               ) {
//                 if (
//                   paneObject?.panes[paneObject?.index]?.brands?.columns?.length
//                 ) {
//                   if (
//                     !paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
//                       ?.group &&
//                     paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
//                       ?.competitor
//                   ) {
//                     // For Competitor
//                     brandIds = [
//                       {
//                         brand_id:
//                           paneObject?.panes[paneObject?.index]?.brands
//                             ?.columns?.[0]?.name,
//                         brand_name:
//                           paneObject?.panes[paneObject?.index]?.brands
//                             ?.columns?.[0]?.brand_name,
//                         brand_friendly_name:
//                           paneObject?.panes[paneObject?.index]?.brands
//                             ?.columns?.[0]?.brand_friendly_name,
//                         brand_logo:
//                           paneObject?.panes[paneObject?.index]?.brands
//                             ?.columns?.[0]?.brand_logo,
//                         brand_color:
//                           paneObject?.panes[paneObject?.index]?.brands
//                             ?.columns?.[0]?.brand_color,
//                       },
//                     ];
//                     comBrandsList =
//                       paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
//                         ?.competitorList;
//                   } else if (
//                     paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
//                       ?.group &&
//                     !paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
//                       ?.competitor
//                   ) {
//                     // For Logical Groups
//                     brandGroups =
//                       paneObject?.panes[paneObject?.index]?.brands
//                         ?.columns?.[0];
//                   } else if (
//                     !paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
//                       ?.group &&
//                     !paneObject?.panes[paneObject?.index]?.brands?.columns?.[0]
//                       ?.competitor
//                   ) {
//                     //For only brands
//                     brandIds =
//                       paneObject?.panes[paneObject?.index]?.brands
//                         ?.columns?.[0];
//                   }
//                 } else {
//                   if (
//                     !paneObject?.panes[paneObject?.index]?.brands?.[0]?.group &&
//                     paneObject?.panes[paneObject?.index]?.brands?.[0]
//                       ?.competitor
//                   ) {
//                     // For Competitor
//                     brandIds = [
//                       {
//                         brand_id:
//                           paneObject?.panes[paneObject?.index]?.brands?.[0]
//                             ?.name,
//                         brand_name:
//                           paneObject?.panes[paneObject?.index]?.brands?.[0]
//                             ?.brand_name,
//                         brand_friendly_name:
//                           paneObject?.panes[paneObject?.index]?.brands?.[0]
//                             ?.brand_friendly_name,
//                         brand_logo:
//                           paneObject?.panes[paneObject?.index]?.brands?.[0]
//                             ?.brand_logo,
//                         brand_color:
//                           paneObject?.panes[paneObject?.index]?.brands?.[0]
//                             ?.brand_color,
//                       },
//                     ];
//                     comBrandsList =
//                       paneObject?.panes[paneObject?.index]?.brands?.[0]
//                         ?.competitorList;
//                   } else if (
//                     paneObject?.panes[paneObject?.index]?.brands?.[0]?.group &&
//                     !paneObject?.panes[paneObject?.index]?.brands?.[0]
//                       ?.competitor
//                   ) {
//                     // For Logical Groups
//                     brandGroups = paneObject?.panes[paneObject?.index]?.brands;
//                   } else if (
//                     !paneObject?.panes[paneObject?.index]?.brands?.[0]?.group &&
//                     !paneObject?.panes[paneObject?.index]?.brands?.[0]
//                       ?.competitor
//                   ) {
//                     //For only brands
//                     brandIds = paneObject?.panes[paneObject?.index]?.brands;
//                   }
//                 }
//               }
//               let templateMetaData = {
//                 access_type: response?.data?.result?.access_type,
//                 competition_aggregation:
//                   response?.data?.result?.competition_aggregation,
//                 contains_sections: response?.data?.result?.contains_sections,
//                 hidden_filter: response?.data?.result?.hidden_filter,
//                 is_brand_locked: response?.data?.result?.is_brand_locked,
//                 is_date_locked: response?.data?.result?.is_date_locked,
//                 predefined: response?.data?.result?.predefined,
//                 template_id: response?.data?.result?.template_id,
//                 template_name: response?.data?.result?.template_name,
//                 template_description:
//                   response?.data?.result?.template_description,
//                 template_type: response?.data?.result?.template_type,
//                 start_date:
//                   paneObject?.panes[paneObject?.index]?.duration?.from,
//                 end_date: paneObject?.panes[paneObject?.index]?.duration?.to,
//                 quick_filter: paneObject?.scheduleObj?.quick_filter
//                   ? paneObject?.scheduleObj?.quick_filter
//                   : response?.data?.result?.quick_filter,
//                 filters: [...hiddenFilter],
//                 brand_ids: brandIds,
//                 brand_groups: brandGroups,
//                 comp_brand_list: comBrandsList,
//               };
//               dispatch(setTemplateMetaData(templateMetaData));
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
//             if (response?.data?.error_code === 11) {
//               dispatch({ type: "SET_PANE", panes: initialPanes });
//               workspaceNotExist(true);
//             }
//           }
//         })
//         .catch((error) => {
//           dispatch(setGlobalLoader(false));
//           dispatch(setTemplateSectionFetchLoader(false));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_FETCH_TEMPLATE_DATA", payload: null });
//     }
//   };
// };

// //api to create new template
// export const setSaveTemplate = (
//   basicObj,
//   templateData,
//   sectionObject,
//   widgetObject,
//   paneObj
// ) => {
//   const {
//     template_name,
//     template_description,
//     contains_section,
//     hidden_filter,
//     quick_filter,
//     is_date_locked,
//     is_brand_locked,
//     competition_aggregation,
//     templateType,
//     templateFilters,
//   } = templateData;

//   let brands = Array.isArray(paneObj?.templateDetails?.advance_brands)
//     ? null
//     : paneObj?.templateDetails?.advance_brands?.columns &&
//       paneObj?.templateDetails?.advance_brands?.columns;

//   let single_brands = [];
//   let brandsGroupName = [];

//   if (brands && brands[0]?.competitor) {
//     single_brands.push({
//       brand_id: brands[0]?.name,
//       brand_name: brands[0]?.brand_name,
//     });
//   } else {
//     brands &&
//       brands?.forEach((el) => {
//         if (el?.group || el?.brand_group_name) {
//           brandsGroupName.push({
//             brand_group_name: el?.brand_group_name,
//           });
//         }
//       });

//     brands &&
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
//   }

//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setTemplateSectionFetchLoader(true));
//     let body = {
//       ptoken: basicObj?.authParams?.ptoken,
//       filters: templateFilters,
//       template_name: template_name,
//       template_description: template_description,
//       contains_section: contains_section,
//       template_type: templateType,
//       hidden_filter:
//         hidden_filter?.columns[0]?.name !== "" ? hidden_filter : null,
//       quick_filter: quick_filter ? quick_filter : null,
//       is_date_locked: is_date_locked,
//       is_brand_locked: is_brand_locked,
//       competition_aggregation: competition_aggregation,
//       comp_brand_list:
//         brands && brands[0]?.competitor ? brands[0]?.competitorList : null,
//       brand_list:
//         single_brands && single_brands[0]?.brand_id ? single_brands : [],
//       start_date: paneObj?.templateDetails?.advance_duration?.from
//         ? paneObj?.templateDetails?.advance_duration?.from
//         : null,
//       end_date: paneObj?.templateDetails?.advance_duration?.to
//         ? paneObj?.templateDetails?.advance_duration?.to
//         : null,
//     };

//     contains_section
//       ? (body.sections = sectionObject)
//       : (body.widgets = widgetObject);

//     let url = `${Config.config1.api_link}/template/create`;
//     await axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_SAVE_TEMPLATE_RESPONSE",
//           payload: response?.data?.result,
//         });
//         dispatch(setTemplateSectionFetchLoader(false));
//         if (response?.data?.status === "successful") {
//           callNotification("Dashboard created successfully", "success");
//           //fetch template list
//           dispatch(setTemplateDataList(basicObj, paneObj));
//           dispatch(setAddSection(null)); //to clear Section state
//           //fetch template data
//           dispatch(
//             setFooterValue({
//               section: false,
//               widget: false,
//               template: false,
//               dashboard: true,
//             })
//           );
//           let index = getPaneIndex(paneObj?.panes, paneObj?.activeKey);

//           let paneObject = {
//             ...paneObj,
//             index: index,
//             firstSection: true,
//             create: true,
//           };
//           dispatch(
//             setFetchTemplateData(
//               basicObj?.authParams,
//               response?.data?.result?.template_id,
//               paneObject
//             )
//           );

//           dispatch(setIsDashboard(true, index, paneObj?.panes));
//           // dashboard created successfully, flag change
//           dispatch(setIsDashboardCreated(true));
//         }

//         if (
//           response?.data?.status === "error" &&
//           response?.data?.error_code === 15
//         ) {
//           callNotification("Dashboard name already exists", "info");
//         }

//         if (
//           response?.data?.status === "error" &&
//           response?.data?.error_code !== 15
//         ) {
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
//         dispatch(setTemplateSectionFetchLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// //api to update current template
// export const setEditTemplate = (
//   basicObj,
//   template_id,
//   templateData,
//   sectionObject,
//   widgetObject,
//   paneObj,
//   templateDetails
// ) => {
//   const {
//     template_name,
//     template_description,
//     contains_section,
//     template_type,
//     hidden_filter,
//     quick_filter,
//     is_date_locked,
//     is_brand_locked,
//     competition_aggregation,
//     templateFilters,
//   } = templateData;
//   let brands = Array.isArray(paneObj?.templateDetails?.advance_brands)
//     ? paneObj?.templateDetails?.advance_brands
//     : paneObj?.templateDetails?.advance_brands?.columns &&
//       paneObj?.templateDetails?.advance_brands?.columns;
//   let single_brands = [];
//   let brandsGroupName = [];
//   if (brands && brands[0]?.competitor) {
//     single_brands.push({
//       brand_id: brands[0]?.name,
//       brand_name: brands[0]?.brand_name,
//     });
//   } else {
//     brands &&
//       brands?.forEach((el) => {
//         if (el?.group || el?.brand_group_name) {
//           brandsGroupName.push({
//             brand_group_name: el?.brand_group_name,
//           });
//         }
//       });

//     brands &&
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
//   }
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setTemplateSectionFetchLoader(true));
//     let body = {
//       ptoken: basicObj?.authParams?.ptoken,
//       filters: templateFilters,
//       template_id: template_id,
//       template_name: template_name,
//       template_description: template_description,
//       contains_section: contains_section,
//       template_type: template_type,
//       hidden_filter:
//         hidden_filter?.columns[0]?.name !== "" ? hidden_filter : null,
//       quick_filter: quick_filter ? quick_filter : null,
//       is_date_locked: is_date_locked,
//       is_brand_locked: is_brand_locked,
//       competition_aggregation: competition_aggregation,
//       start_date:
//         templateDetails?.advance_duration &&
//         templateDetails?.advance_duration?.from
//           ? templateDetails?.advance_duration?.from
//           : undefined,
//       end_date:
//         templateDetails?.advance_duration &&
//         templateDetails?.advance_duration?.to
//           ? templateDetails?.advance_duration?.to
//           : undefined,
//       comp_brand_list:
//         brands && brands[0]?.competitor ? brands[0]?.competitorList : null,
//       brand_list:
//         single_brands && single_brands[0]?.brand_id ? single_brands : [],
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       save_as_dashboard: paneObj?.save_as_dashboard,
//       save_as: paneObj?.save_as, // New Key for edit-widget-dev
//       is_recommended: paneObj?.is_recommended, // New Key for edit-widget-dev
//       original_template_id: paneObj?.original_template_id, // New Key for edit-widget-dev
//     };
//     // console.log(
//     //   "paneObj",
//     //   paneObj,
//     //   "sectionObject",
//     //   sectionObject,
//     //   "widgetObject",
//     //   widgetObject
//     // );
//     contains_section
//       ? (body.sections = sectionObject)
//       : (body.widgets = widgetObject);

//     let url = `${Config.config1.api_link}/template/update`;
//     await axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_SAVE_TEMPLATE_RESPONSE",
//           payload: response?.data?.result,
//         });
//         dispatch(setTemplateSectionFetchLoader(false));

//         if (response?.data?.status === "successful") {
//           // For View Dashborad
//           if (
//             (window.location.pathname === "/dashboard" ||
//               window.location.pathname === "/pin-dashboard" ||
//               window.location.pathname === "/all-dashboard") &&
//             paneObj?.panes[paneObj?.index]?.is_dashboard_edited
//           ) {
//             if (paneObj?.save_as) {
//               let obj = basicObj;
//               template_id = response?.data?.result?.template_id;
//               if (
//                 basicObj?.authParams?.template_id ||
//                 (!basicObj?.authParams?.template_id &&
//                   window.location.pathname === "/pin-dashboard")
//               ) {
//                 window.parent.postMessage(
//                   {
//                     template_id: template_id,
//                     message: "RedirectToDIY",
//                   },
//                   "*"
//                 );

//                 let updatePanes = [...paneObj?.panes];
//                 updatePanes[paneObj?.index].template_id = template_id;
//                 dispatch({ type: "SET_WIDGET_GRAPH_DATA", panes: updatePanes });
//               } else {
//                 template_id = response?.data?.result?.template_id;
//                 let paneObject = {
//                   index: obj?.index,
//                   brands:
//                     template_id === "000-000-002" ||
//                     template_id === "000-000-003" ||
//                     template_id === "000-000-004"
//                       ? obj?.Allbrands && [obj?.Allbrands[0]]
//                       : obj?.brandlogicalgroup?.length > 0
//                       ? obj?.brandlogicalgroup
//                       : obj?.Allbrands,
//                   panes: obj?.panes,
//                   activeKey: obj?.activeKey,
//                   firstSection: true,
//                   templateDetails: obj?.templateDetails,
//                   singleBrands: obj?.Allbrands,
//                   global_dashboard_duration: obj?.global_dashboard_duration,
//                   global_dashboard_brands: [
//                     "000-000-001",
//                     "000-000-002",
//                     "000-000-003",
//                     "000-000-004",
//                   ].includes(template_id)
//                     ? obj?.global_dashboard_single_brands
//                     : obj?.global_dashboard_brands,
//                   competitorBrands: obj?.competitorBrands,
//                   graphConditionConfig: obj?.graphConditionConfig,
//                   temporary_words: obj?.temporary_words,
//                   is_modified_date:
//                     obj?.panes?.[obj?.index]?.template_id === "000-000-002" ||
//                     obj?.panes?.[obj?.index]?.template_id === "000-000-004"
//                       ? obj?.panes?.[obj?.index]?.is_modified_date
//                         ? obj?.panes?.[obj?.index]?.is_modified_date
//                         : false
//                       : null,
//                 };
//                 let templateObject = {
//                   template_id: template_id,
//                   created_date: "",
//                 };
//                 obj?.authParams &&
//                   dispatch(
//                     setFetchTemplateData(
//                       obj?.authParams,
//                       template_id,
//                       paneObject,
//                       templateObject
//                     )
//                   );

//                 dispatch(setIsDashboard(true, obj?.index, obj?.panes));
//               }
//             } else {
//               let updatePanes = [...paneObj?.panes];
//               let obj = {
//                 open_flag: false,
//                 section_index: null,
//                 widget_index: null,
//               };
//               updatePanes[paneObj?.index].is_widget_maker_open_obj = obj;
//               updatePanes[paneObj?.index].is_dashboard_edited = false;
//               // console.log("UPDATE API updatePanes", updatePanes);
//               dispatch({ type: "SET_WIDGET_GRAPH_DATA", panes: updatePanes });

//               template_id = response?.data?.result?.template_id;

//               // Update Authparams template id
//               if (basicObj?.authParams?.template_id) {
//                 dispatch(
//                   updateAuthParamsTemplateId(basicObj?.authParams, {
//                     template_id: template_id,
//                   })
//                 );
//               }
//             }
//             // if (basicObj?.authParams?.template_id) {
//             // Pass Message to angular side for edit widget in dashboard feature
//             window.parent.postMessage(
//               {
//                 is_edited_dashboard_flag: false,
//                 message: "is_edited_dashboard_msg",
//               },
//               "*"
//             );
//             // }
//           }

//           dispatch(setIsEditTemplate(false));
//           dispatch(
//             setFooterValue({
//               section: false,
//               widget: false,
//               template: false,
//               dashboard: true,
//             })
//           );
//           //fetch template list
//           dispatch(setTemplateDataList(basicObj, paneObj));
//           //fetch template data
//           dispatch(setAddSection(null)); //to clear Section state
//           let index = getPaneIndex(paneObj?.panes, paneObj?.activeKey);
//           let paneObject = {
//             ...paneObj,
//             index: index,
//             firstSection: true,
//             update: true,
//           };
//           dispatch(
//             setFetchTemplateData(basicObj?.authParams, template_id, paneObject)
//           );
//           dispatch(setIsDashboard(true, index, paneObj?.panes));
//           callNotification("Dashboard updated successfully", "success");

//           // if dashboard updated successfully, flag change
//           dispatch(setIsDashboardCreated(true));
//         }

//         if (
//           response?.data?.status === "error" &&
//           response?.data?.reason === "Dashboard already exists with this name!"
//         ) {
//           callNotification("Dashboard name already exists!", "info");
//         } else if (
//           response?.data?.status === "error" &&
//           response?.data?.error_code === 15
//         ) {
//           callNotification("Dashboard name already exists", "info");
//         } else if (
//           response?.data?.status === "error" &&
//           response?.data?.error_code !== 15
//         ) {
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
//         dispatch(setTemplateSectionFetchLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };
// //set delete loader
// export const setGlobalLoader = (value) => {
//   return { type: "SET_GLOBAL_LOADER", payload: value };
// };
// //set delete loader
// export const setTemplateListLoader = (value) => {
//   return { type: "SET_TEMPLATE_LIST_LOADER", payload: value };
// };

// //api to Delete template
// export const setDeleteTemplate = (basicObj, template_id, paneObj) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setTemplateListLoader(true));
//     let body = {
//       ptoken: basicObj?.authParams?.ptoken,
//       template_id: template_id,
//     };

//     let url = `${Config.config1.api_link}/template/delete`;
//     await axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_SAVE_TEMPLATE_RESPONSE",
//           payload: response?.data?.result,
//         });
//         dispatch(setTemplateListLoader(false));
//         if (response?.data?.status === "successful") {
//           if (paneObj?.allow_restore) {
//             //fetch template list
//             // dispatch(setTemplateDataList(basicObj, paneObj));
//             //fetch template data
//             dispatch(setAddSection(null)); //to clear Section state
//             let index = getPaneIndex(paneObj?.panes, paneObj?.activeKey);
//             let template_id = response?.data?.result?.original_template_id;
//             let paneObject = {
//               ...paneObj,
//               index: index,
//               firstSection: true,
//               update: true,
//             };
//             dispatch(
//               setFetchTemplateData(paneObj?.authParams, template_id, paneObject)
//             );
//             dispatch(setIsDashboard(true, index, paneObj?.panes));

//             // If edited dashboard deleted
//             if (paneObj?.template_deleted) {
//               callNotification("Dashboard deleted successfully", "success");
//             } else {
//               callNotification("Dashboard restored successfully", "success");
//             }

//             // if dashboard updated successfully, flag change
//             dispatch(setIsDashboardCreated(true));

//             // update Authparams
//             if (paneObj?.authParams?.template_id) {
//               dispatch(
//                 updateAuthParamsTemplateId(paneObj?.authParams, {
//                   template_id: template_id,
//                 })
//               );
//             }
//           } else {
//             //fetch template list
//             if (
//               window.location.pathname === "/dashboard" ||
//               window.location.pathname === "/all-dashboard"
//             ) {
//               //to remove tabs with same template id which is getting deleted
//               paneObj?.panes?.forEach((el, i) => {
//                 if (el?.template_id === template_id) {
//                   el?.key !== paneObj?.activeKey &&
//                     dispatch(
//                       remove(el?.key, global?.panes, global?.TabActiveKey)
//                     );
//                 }
//               });
//               //to set the updated value in panes after removal of tab
//               if (global?.panes) paneObj.panes = global?.panes;
//               dispatch(setTemplateDataList(basicObj, paneObj));
//             } else if (window.location.pathname === "/pin-dashboard") {
//               paneObj?.panes?.forEach((el, i) => {
//                 if (el?.template_id === template_id) {
//                   dispatch(
//                     remove(
//                       el?.key,
//                       paneObj?.panes,
//                       paneObj?.activeKey,
//                       false,
//                       basicObj?.authParams,
//                       paneObj
//                     )
//                   );
//                 }
//               });
//               //to set the updated value in panes after removal of tab
//               if (global?.panes) paneObj.panes = global?.panes;
//             }
//             callNotification("Dashboard deleted successfully", "success");
//           }
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
//         dispatch(setTemplateListLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// //api to Duplicate template
// export const setDuplicateTemplate = (basicObj, obj) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (obj?.saveAsFlag) {
//       dispatch(setDuplicateDashboardLoader(true));
//       dispatch(setDuplicateDashboardFlag(true));
//     } else {
//       dispatch(setTemplateListLoader(true));
//     }
//     let body = {
//       ptoken: basicObj?.authParams?.ptoken,
//       template_id: obj?.template_id,
//       template_name: obj?.template_name,
//       template_description: obj?.template_description,
//       filters: obj?.filters,
//     };

//     let url = `${Config.config1.api_link}/template/duplicate-template`;
//     await axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_SAVE_TEMPLATE_RESPONSE",
//           payload: response?.data?.result,
//         });
//         if (obj?.saveAsFlag) {
//           dispatch(setDuplicateDashboardLoader(false));
//           dispatch(setDuplicateDashboardFlag(false));
//         } else {
//           dispatch(setTemplateListLoader(false));
//         }
//         if (response?.data?.status === "successful") {
//           if (obj?.saveAsFlag) {
//             callNotification("Dashboard saved successfully", "success");
//             // To store new generated template id
//             let template_id = response?.data?.template_id;
//             dispatch(
//               setSharableData({
//                 template_id: template_id,
//               })
//             );

//             if (
//               basicObj?.authParams?.template_id ||
//               (!basicObj?.authParams?.template_id &&
//                 window.location.pathname === "/pin-dashboard")
//             ) {
//               window.parent.postMessage(
//                 {
//                   template_id: template_id,
//                   message: "RedirectToDIY",
//                 },
//                 "*"
//               );
//             } else {
//               let paneObject = {
//                 index: obj?.index,
//                 brands:
//                   template_id === "000-000-002" ||
//                   template_id === "000-000-003" ||
//                   template_id === "000-000-004"
//                     ? obj?.Allbrands && [obj?.Allbrands[0]]
//                     : obj?.brandlogicalgroup?.length > 0
//                     ? obj?.brandlogicalgroup
//                     : obj?.Allbrands,
//                 panes: obj?.panes,
//                 activeKey: obj?.activeKey,
//                 firstSection: true,
//                 templateDetails: obj?.templateDetails,
//                 singleBrands: obj?.Allbrands,
//                 global_dashboard_duration: obj?.global_dashboard_duration,
//                 global_dashboard_brands: [
//                   "000-000-001",
//                   "000-000-002",
//                   "000-000-003",
//                   "000-000-004",
//                 ].includes(template_id)
//                   ? obj?.global_dashboard_single_brands
//                   : obj?.global_dashboard_brands,
//                 competitorBrands: obj?.competitorBrands,
//                 graphConditionConfig: obj?.graphConditionConfig,
//                 temporary_words: obj?.temporary_words,
//                 is_modified_date:
//                   obj?.panes?.[obj?.index]?.template_id === "000-000-002" ||
//                   obj?.panes?.[obj?.index]?.template_id === "000-000-004"
//                     ? obj?.panes?.[obj?.index]?.is_modified_date
//                       ? obj?.panes?.[obj?.index]?.is_modified_date
//                       : false
//                     : null,
//               };
//               let templateObject = {
//                 template_id: template_id,
//                 created_date: "",
//               };
//               obj?.authParams &&
//                 dispatch(
//                   setFetchTemplateData(
//                     obj?.authParams,
//                     template_id,
//                     paneObject,
//                     templateObject
//                   )
//                 );

//               dispatch(setIsDashboard(true, obj?.index, obj?.panes));
//               // PIN DEV When Open Dashboard then redirect to dashboard path
//               // navigate("/dashboard");
//               // dispatch(setShowMoreSectionKey(null));
//             }
//           } else {
//             //fetch template list
//             dispatch(setTemplateDataList(basicObj, obj));
//             callNotification("Dashboard duplicated successfully", "success");

//             dispatch(setIsDashboardCreated(true));
//           }
//         }

//         if (
//           response?.data?.status === "error" &&
//           response?.data?.error_code === 15
//         ) {
//           callNotification("Dashboard name already exists", "info");
//         }

//         if (
//           response?.data?.status === "error" &&
//           response?.data?.error_code !== 15
//         ) {
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
//         if (obj?.saveAsFlag) {
//           dispatch(setDuplicateDashboardLoader(false));
//           dispatch(setDuplicateDashboardFlag(false));
//         } else {
//           dispatch(setTemplateListLoader(false));
//         }
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// //Shareable component
// export const getShareableId = (
//   template_id,
//   authParams,
//   brand_list,
//   type,
//   globalBrands,
//   start_date,
//   end_date,
//   password,
//   profileData,
//   graphObject
// ) => {
//   let errorMessage;

//   let brands = brand_list?.columns
//     ? brand_list?.columns
//     : brand_list
//     ? brand_list
//     : globalBrands;
//   let single_brands = [];
//   let brandsGroupName = [];

//   if (!brand_list) {
//     brandsGroupName =
//       brands && brands[0]?.brand_list
//         ? [
//             {
//               brand_group_name: brands[0]?.brand_group_name,
//             },
//           ]
//         : single_brands?.push({
//             brand_id: brands && brands[0]?.brand_id && brands[0]?.brand_id,
//             brand_name:
//               brands && brands[0]?.brand_name && brands[0]?.brand_name,
//           });
//   } else {
//     if (brands && brands[0]?.competitor) {
//       single_brands.push({
//         brand_id: brands[0]?.name,
//         brand_name: brands[0]?.brand_name,
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
//     let body = {
//       ptoken: authParams?.ptoken,
//       template_id: template_id,
//       start_date: start_date,
//       end_date: end_date,
//       expiry_date: graphObject?.linkExpiryDate,
//       password: password,
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       comp_brand_list: brands[0]?.competitor
//         ? brands[0]?.competitorList
//           ? brands[0]?.competitorList
//           : null
//         : null,
//       filters: graphObject?.filters,
//       brand_list:
//         single_brands && single_brands[0]?.brand_id ? single_brands : null,
//       hidden_filter: profileData?.hidden_filter
//         ? profileData?.hidden_filter
//         : undefined,
//       quick_filter: profileData?.quick_filter
//         ? profileData?.quick_filter
//         : undefined,
//       deep_dive_enabled: graphObject?.deep_dive_enabled ? true : false,
//       show_filters: graphObject?.filter_icon_enabled ? true : false,
//       profile_filters: graphObject?.profile_filters
//         ? graphObject?.profile_filters
//         : null,
//       utcoffset: getUTCOffset(),
//     };

//     let url = `${Config.config1.api_link}/template/share-link`;
//     await axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           if (type === "share_id") {
//             let newSharableLink = `${
//               window.location.origin +
//               "/share?share_id=" +
//               response?.data?.result?.share_id
//             }`;
//             dispatch(
//               setSharableId({
//                 id: response?.data?.result?.share_id,
//                 link: newSharableLink,
//                 isShared: true,
//               })
//             );
//           } else if (type === "download_id") {
//             // const link = document.createElement("a");
//             // link.href = `${window.location.href.replace(
//             //   "/dashboard",
//             //   `/download?pdf_id=${response?.data?.result?.share_id}`
//             // )}`;
//             // link.target = "_blank";
//             // document.body.appendChild(link);
//             // link.click();
//             // document.body.removeChild(link);
//             dispatch(setShareBrands(null));
//             dispatch(setPdfDownloadStatus(false));
//             dispatch(setFooterValue({ dashboard: true }));
//           }
//         }
//         if (response?.data?.status === "error") {
//           errorCode?.map((el, i) => {
//             return el.key === response?.data?.error_code
//               ? (errorMessage = el.value)
//               : null;
//           });
//           callNotification(null, "error");
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

// export const setPasswordStatus = (value) => {
//   return { type: "SET_PASSWORD_STATUS", payload: value };
// };

// export const setPasswordLoader = (value) => {
//   return async (dispatch) => {
//     dispatch({ type: "SET_PASSWORD_LOADER", payload: value });
//   };
// };
// //set fetch share brands
// export const getShareableBrands = (
//   share_id,
//   shareLoaders,
//   password,
//   graphConditionConfig
// ) => {
//   let errorMessage;

//   return async (dispatch) => {
//     if (share_id) {
//       let body = {
//         share_id: share_id,
//         password: password,
//         utcoffset: getUTCOffset(),
//       };
//       let url = `${Config.config1.api_link}/template/share-brands`;

//       dispatch(setPasswordLoader(true));
//       await axios
//         .post(url, body)
//         .then((response) => {
//           if (response?.data?.status === "successful") {
//             let shareObj = {
//               shareBrands: response?.data?.result,
//               shareCategory: response?.data?.result?.category,
//               graphConditionConfig: graphConditionConfig,
//             };
//             var urlParams; // url encrypted parameters

//             //Function to get url params from URL and set it to urlParams variable
//             (window.onpopstate = function () {
//               var match,
//                 pl = /\+/g, // Regex for replacing addition symbol with a space
//                 search = /([^&=]+)=?([^&]*)/g,
//                 decode = function (s) {
//                   return decodeURIComponent(s.replace(pl, " "));
//                 },
//                 query = window.location.search.substring(1);

//               urlParams = {};
//               while ((match = search.exec(query)))
//                 urlParams[decode(match[1])] = decode(match[2]);
//             })();

//             dispatch(setShareBrands(response?.data?.result));
//             dispatch(setShareCategory(response?.data?.result?.category));
//             share_id &&
//               dispatch(getShareTemplateData(share_id, shareObj, password));
//             dispatch(setPasswordLoader(false));
//           }
//           if (response?.data?.status === "error") {
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });
//             dispatch(setPasswordLoader(false));
//             callNotification(
//               response?.data?.error_code == 4
//                 ? "Internal server error"
//                 : response?.data?.reason,
//               "error"
//             );
//           }
//         })
//         .catch((error) => {
//           callNotification(null, "error");
//         });
//     } else {
//       dispatch(setShareBrands(null));
//       dispatch(setShareCategory(null));
//       dispatch(getShareTemplateData(null));
//     }
//   };
// };

// export const setShareBrands = (value) => {
//   return { type: "SET_SHARE_BRANDS", payload: value };
// };

// export const setShareCategory = (value) => {
//   return { type: "SET_SHARE_CATEGORY", payload: value };
// };

// //get share template data
// export const getShareTemplateData = (share_id, shareObj, password) => {
//   let errorMessage;
//   return async (dispatch) => {
//     //to clear edit mode
//     dispatch(
//       setFooterValue({
//         section: false,
//         widget: false,
//         template: false,
//         dashboard: false,
//       })
//     );
//     let body = {
//       share_id: share_id,
//       password: password,
//       utcoffset: getUTCOffset(),
//     };
//     let url = `${Config.config1.api_link}/template/share-fetch`;
//     if (share_id) {
//       await axios
//         .post(url, body)
//         .then((response) => {
//           if (response?.data?.status === "successful") {
//             const {
//               template_name,
//               template_description,
//               sections,
//               widgets,
//               section_id,
//             } = response?.data?.result;
//             let multipleWidgetsDataList = [];
//             let res = null;
//             let newSection = null;
//             if (
//               shareObj?.shareBrands?.selected_brand_ids &&
//               shareObj?.shareBrands?.selected_comp_brand_ids?.length > 0
//             ) {
//               if (section_id && widgets) {
//                 // For only widgets
//                 Array.isArray(widgets) &&
//                   widgets?.forEach((widgetResData, i) => {
//                     if (
//                       widgetResData?.chart &&
//                       (widgetResData?.chart?.["chart_type"] === "wordcloud" ||
//                         widgetResData?.chart?.["chart_type"] === "grid" ||
//                         widgetResData?.chart?.["chart_type"] === "post-card" ||
//                         widgetResData?.chart?.["chart_type"] ===
//                           "author-card") &&
//                       widgetResData?.chart?.["chart_settings"][
//                         "duplicate_for_brands"
//                       ]
//                     ) {
//                       let newBrandList = [];
//                       newBrandList.push({
//                         brand_id:
//                           shareObj?.shareBrands?.selected_brand_ids?.[0]
//                             ?.brand_id,
//                         brand_name:
//                           shareObj?.shareBrands?.selected_brand_ids?.[0]
//                             ?.brand_name,
//                         brand_friendly_name:
//                           shareObj?.shareBrands?.selected_brand_ids?.[0]
//                             ?.brand_friendly_name,
//                       });
//                       shareObj?.shareBrands?.selected_comp_brand_ids?.forEach(
//                         (competitorBrand) => {
//                           newBrandList.push(competitorBrand);
//                         }
//                       );
//                       let duplicateWidgets = getDuplicateWidgets(
//                         newBrandList,
//                         widgetResData,
//                         shareObj?.shareBrands?.brand_list
//                       );
//                       if (duplicateWidgets) {
//                         multipleWidgetsDataList = [
//                           ...multipleWidgetsDataList,
//                           ...duplicateWidgets,
//                         ];
//                       } else {
//                         multipleWidgetsDataList.push(widgetResData);
//                       }
//                     } else {
//                       multipleWidgetsDataList.push(widgetResData);
//                     }
//                   });
//                 if (
//                   multipleWidgetsDataList &&
//                   multipleWidgetsDataList?.length === 0
//                 ) {
//                   multipleWidgetsDataList = widgets;
//                 }
//               } else {
//                 res = checkForDuplicateWidgets(sections);
//                 let newBrandList = [];
//                 newBrandList.push({
//                   brand_id:
//                     shareObj?.shareBrands?.selected_brand_ids?.[0]?.brand_id,
//                   brand_name:
//                     shareObj?.shareBrands?.selected_brand_ids?.[0]?.brand_name,
//                   brand_friendly_name:
//                     shareObj?.shareBrands?.selected_brand_ids?.[0]
//                       ?.brand_friendly_name,
//                 });
//                 shareObj?.shareBrands?.selected_comp_brand_ids?.forEach(
//                   (competitorBrand) => {
//                     newBrandList.push(competitorBrand);
//                   }
//                 );
//                 if (res?.parentExists) {
//                   let filterSectionData = getFilterDuplicateWidgets(sections);
//                   if (filterSectionData !== null) {
//                     newSection = splitSectionWidgetsInShare(
//                       filterSectionData,
//                       newBrandList,
//                       shareObj?.shareBrands?.brand_list
//                     );
//                   }
//                 } else if (res?.duplicateExists) {
//                   newSection = splitSectionWidgetsInShare(
//                     sections,
//                     newBrandList,
//                     shareObj?.shareBrands?.brand_list
//                   );
//                 } else {
//                   newSection = sections;
//                 }
//               }
//             } else {
//               if (section_id && widgets) {
//                 // For only widgets
//                 if (
//                   multipleWidgetsDataList &&
//                   multipleWidgetsDataList?.length === 0
//                 ) {
//                   multipleWidgetsDataList = widgets;
//                 }
//               } else {
//                 res = checkForDuplicateWidgets(sections);
//                 if (res?.parentExists) {
//                   let filterSectionData = getFilterDuplicateWidgets(sections);
//                   if (filterSectionData !== null) {
//                     newSection = filterSectionData;
//                   }
//                 } else {
//                   newSection = sections;
//                 }
//               }
//             }
//             if (newSection?.length > 0) newSection[0].open = true;
//             else if (sections?.length > 0) sections[0].open = true;
//             //private conversation
//             let comp_hidden_filter = [];
//             let final_filters = response?.data?.result.filters?.length
//               ? [...response?.data?.result.filters]
//               : [];
//             if (response?.data?.result?.template_type === "competition") {
//               response.data.result.private_conversation = false;
//               comp_hidden_filter = response.data.result?.comp_hidden_filter;
//               // comp_hidden_filter = getPrivateConversationFilters(
//               //   response?.data?.result.comp_hidden_filter,
//               //   response?.data?.result.filters?.length
//               //     ? response?.data?.result.filters
//               //     : []
//               // );
//             }

//             if (
//               comp_hidden_filter?.length &&
//               response?.data?.result.filters?.length
//             ) {
//               let mergedFilters = deepCopy(comp_hidden_filter);
//               mergedFilters?.map((comp, i) => {
//                 response?.data?.result.filters?.map((d, i) => {
//                   if (d?.attribute === comp?.attribute) {
//                     d?.columns?.map((c) => {
//                       comp?.columns.push(c);
//                     });
//                   } else if (
//                     !mergedFilters
//                       ?.map((d) => d?.attribute)
//                       ?.includes(d?.attribute)
//                   ) {
//                     mergedFilters?.push(d);
//                   }
//                 });
//               });
//               final_filters = [...mergedFilters];
//             } else if (comp_hidden_filter?.length) {
//               final_filters = [...comp_hidden_filter, ...final_filters];
//             }
//             let templateResponse = response?.data?.result
//               ? {
//                   ...response?.data?.result,
//                   title: template_name,
//                   description: template_description,
//                   saved_filters: response?.data?.result?.filters,
//                   filters: final_filters,
//                   key: null,
//                   duration: null,
//                   brands: null,
//                   sections:
//                     newSection && newSection?.length > 0
//                       ? newSection
//                       : sections,
//                   onlyWidgets: widgets ? true : false,
//                   isDashboard: null,
//                   section: widgets && [
//                     {
//                       section_id: section_id,
//                       widgets:
//                         multipleWidgetsDataList?.length > 0
//                           ? multipleWidgetsDataList
//                           : widgets,
//                     },
//                   ],
//                 }
//               : {
//                   title: template_name,
//                   description: template_description,
//                   saved_filters: response?.data?.result?.filters,
//                   filters: final_filters,
//                   key: null,
//                   duration: null,
//                   brands: null,
//                   sections:
//                     newSection && newSection?.length > 0
//                       ? newSection
//                       : sections,
//                   onlyWidgets: widgets ? true : false,
//                   isDashboard: null,
//                   section: widgets && [
//                     {
//                       section_id: section_id,
//                       widgets:
//                         multipleWidgetsDataList?.length > 0
//                           ? multipleWidgetsDataList
//                           : widgets,
//                     },
//                   ],
//                 };
//             dispatch({
//               type: "SET_SHARE_TEMPLATE_DATA",
//               payload: templateResponse,
//             });
//             templateResponse?.quick_filter &&
//               templateResponse?.quick_filter_res &&
//               dispatch(
//                 setSelectProfileId(templateResponse?.quick_filter_res?.name)
//               );
//             templateResponse?.quick_filter &&
//               templateResponse?.quick_filter_res &&
//               dispatch(
//                 setChannelImage(templateResponse?.quick_filter_res?.channel)
//               );
//             templateResponse?.quick_filter &&
//               templateResponse?.quick_filter_res &&
//               dispatch(
//                 setProfileImage(
//                   templateResponse?.quick_filter_res?.profile_icon_url
//                 )
//               );

//             let dateData = {
//               from: response?.data?.result?.start_date,
//               to: response?.data?.result?.end_date,
//             };
//             dispatch({
//               type: "SET_SHARED_DURATION",
//               payload: dateData,
//             });
//             newSection?.length > 0
//               ? newSection?.map((section, i) => {
//                   if (i < 1) {
//                     section?.widgets?.map((widget, j) => {
//                       let filter = getAllShareFilters(
//                         templateResponse,
//                         i,
//                         j,
//                         shareObj?.shareBrands
//                       );
//                       let duration = templateResponse?.duration?.from
//                         ? {
//                             // global duration  -->dateData
//                             from: templateResponse?.duration?.from
//                               ? templateResponse?.duration?.from
//                               : null,
//                             to: templateResponse?.duration?.to
//                               ? templateResponse?.duration?.to
//                               : null,
//                           }
//                         : templateResponse?.start_date
//                         ? {
//                             // global duration  -->dateData
//                             from: templateResponse?.start_date
//                               ? templateResponse?.start_date
//                               : null,
//                             to: templateResponse?.end_date
//                               ? templateResponse?.end_date
//                               : null,
//                           }
//                         : null;
//                       let obj = {};
//                       obj.type = "share_dashboard";
//                       obj.section_index = i;
//                       obj.widget_index = j;
//                       obj.data = widget;
//                       obj.shareTemplateData = templateResponse;
//                       obj.duration = duration;
//                       obj.filter = filter;
//                       obj.shareBrands = shareObj?.shareBrands;
//                       obj.graphConditionConfig = shareObj?.graphConditionConfig;
//                       obj.data_source = widget?.data_source
//                         ? widget?.data_source
//                         : "mentions";
//                       let widgetGraphObject = getWidgetGraphObject(obj);

//                       if (widgetGraphObject) {
//                         let indexes = {
//                           section_index: i,
//                           widget_index: j,
//                         };

//                         let share = {
//                           sections: templateResponse,
//                         };
//                         // if (
//                         //   widgetGraphObject?.x_axis ||
//                         //   widgetGraphObject?.y_series ||
//                         //   widgetGraphObject?.chart
//                         // ) {
//                         //   widgetGraphObject?.data_source === "page" ||
//                         //   widgetGraphObject?.data_source === "ticket" ||
//                         //   widgetGraphObject?.data_source === "campaign" ||
//                         //   widgetGraphObject?.data_source === "feedback"
//                         //     ? dispatch(
//                         //         setWidgetMakerSharePageGraphData(
//                         //           widgetGraphObject,
//                         //           shareObj?.shareCategory,
//                         //           indexes,
//                         //           share,
//                         //           share_id,
//                         //           password
//                         //         )
//                         //       )
//                         //     : dispatch(
//                         //         setWidgetMakerShareGraphData(
//                         //           widgetGraphObject,
//                         //           shareObj?.shareCategory,
//                         //           indexes,
//                         //           share,
//                         //           share_id,
//                         //           password
//                         //         )
//                         //       );
//                         // } else {
//                         //   dispatch(
//                         //     setGraphShareFetch(
//                         //       widgetGraphObject,
//                         //       shareObj?.shareCategory,
//                         //       indexes,
//                         //       share,
//                         //       share_id,
//                         //       password
//                         //     )
//                         //   );
//                         // }
//                       }

//                       // let twoMonthsDuration = getCustomizedDate(6, "Days");
//                       // let defaultDuration = {
//                       //   from:
//                       //     moment(twoMonthsDuration?.date[0]).format(
//                       //       "YYYY/MM/DD"
//                       //     ) +
//                       //     " " +
//                       //     twoMonthsDuration?.time?.startTime,
//                       //   to:
//                       //     moment(twoMonthsDuration?.date[1]).format(
//                       //       "YYYY/MM/DD"
//                       //     ) +
//                       //     " " +
//                       //     twoMonthsDuration?.time?.endTime,
//                       // };

//                       // let sectionDateFilter = {
//                       //   from: section?.start_date ? section?.start_date : null,
//                       //   to: section?.end_date ? section?.end_date : null,
//                       // };

//                       // let widgetFilterDate = {
//                       //   from: widget?.start_date ? widget?.start_date : null,
//                       //   to: widget?.end_date ? widget?.end_date : null,
//                       // };
//                       // let combinedFilters = [];
//                       // if (!widget?.is_locked) {
//                       //   if (widgetFilterDate?.from)
//                       //     combinedFilters.push({
//                       //       attribute: "CreatedDate",
//                       //       type: "datetime",
//                       //       columns: widgetFilterDate,
//                       //     });

//                       //   if (!section?.is_locked && sectionDateFilter?.from) {
//                       //     combinedFilters.push({
//                       //       attribute: "CreatedDate",
//                       //       type: "datetime",
//                       //       columns: sectionDateFilter,
//                       //     });
//                       //   }
//                       //   if (!section?.is_locked && section?.brand_ids) {
//                       //     let brands = getBrands(
//                       //       shareObj?.shareBrands?.brand_groups,
//                       //       section?.brand_ids,
//                       //       shareObj?.shareBrands?.brand_list,
//                       //       section?.brand_groups
//                       //     );

//                       //     combinedFilters.push(brands);
//                       //   }
//                       //   if (widget?.brand_ids) {
//                       //     let brands = getBrands(
//                       //       shareObj?.shareBrands?.brand_groups,
//                       //       widget?.brand_ids,
//                       //       shareObj?.shareBrands?.brand_list,
//                       //       widget?.brand_groups
//                       //     );

//                       //     combinedFilters.push(brands);
//                       //   }
//                       // }
//                       // if (widget?.filters)
//                       //   combinedFilters = [
//                       //     ...widget?.filters,
//                       //     ...combinedFilters,
//                       //   ];
//                       // if (section?.filters)
//                       //   combinedFilters = [
//                       //     ...section?.filters,
//                       //     ...combinedFilters,
//                       //   ];
//                       // let filterData = combinedFilters?.filter((d) => d);
//                       // let hidden_filter = response?.data?.result?.hidden_filter
//                       //   ? [response?.data?.result?.hidden_filter]
//                       //   : [];
//                       // let quick_filter = response?.data?.result?.quick_filter
//                       //   ? [response?.data?.result?.quick_filter]
//                       //   : [];
//                       // let filter = [
//                       //   ...filterData,
//                       //   ...hidden_filter,
//                       //   ...quick_filter,
//                       // ];
//                       // let indexes = {
//                       //   section_index: i,
//                       //   widget_index: j,
//                       // };

//                       // let share = {
//                       //   sections: templateResponse,
//                       // };

//                       // let section_brands = getBrands(
//                       //   shareObj?.shareBrands?.brand_groups,
//                       //   section?.brand_ids,
//                       //   shareObj?.shareBrands?.brand_list,
//                       //   section?.brand_groups
//                       // );

//                       // let widget_brands = getBrands(
//                       //   shareObj?.shareBrands?.brand_groups,
//                       //   widget?.brand_ids,
//                       //   shareObj?.shareBrands?.brand_list,
//                       //   widget?.brand_groups
//                       // );
//                       // let defaultBrands = shareObj?.shareBrands
//                       //   ? shareObj?.shareBrands
//                       //   : null;
//                       // // category_id: graphObject?.authParams?.category_id,
//                       // if (widget?.x_axis || widget?.y_series || widget?.chart) {
//                       //   let graphObject = {
//                       //     start_date: widget?.start_date
//                       //       ? widget?.start_date
//                       //       : dateData?.from
//                       //       ? dateData?.from
//                       //       : defaultDuration?.from,
//                       //     end_date: widget?.end_date
//                       //       ? widget?.end_date
//                       //       : dateData?.to
//                       //       ? dateData?.to
//                       //       : defaultDuration?.to,
//                       //     brand_list: widget?.is_locked
//                       //       ? widget_brands?.columns
//                       //         ? widget_brands?.columns
//                       //         : section?.is_locked
//                       //         ? section_brands?.columns
//                       //           ? section_brands?.columns
//                       //           : widget?.duplicate_for_brands
//                       //           ? widget?.com_brand_ids
//                       //           : defaultBrands
//                       //         : widget?.duplicate_for_brands
//                       //         ? widget?.com_brand_ids
//                       //         : defaultBrands
//                       //       : section?.is_locked
//                       //       ? section_brands?.columns
//                       //         ? section_brands?.columns
//                       //         : widget?.duplicate_for_brands
//                       //         ? widget?.com_brand_ids
//                       //         : defaultBrands
//                       //       : widget?.duplicate_for_brands
//                       //       ? widget?.com_brand_ids
//                       //       : defaultBrands,
//                       //     order_by: widget?.order_by,
//                       //     filters: filter ? filter : null,
//                       //     x_axis: widget?.x_axis,
//                       //     // Break down data
//                       //     y_axes: widget?.y_axes,
//                       //     // y axis data
//                       //     y_series: widget?.y_series,
//                       //     widget_name: widget?.widget_name,
//                       //     chart: widget?.chart,
//                       //     data_source: widget?.data_source,
//                       //     widget_id: widget?.widget_id,
//                       //     engine: widget?.engine,
//                       //     ticket:
//                       //       widget?.data_source === "ticket" ? true : false,
//                       //   };
//                       //   if (widget?.duplicate_for_brands) {
//                       //     widget.isBrandModified = true;
//                       //     widget.comp_brand_list = null;
//                       //   }
//                       //   let global_date = {
//                       //     from: graphObject?.start_date,
//                       //     to: graphObject?.end_date,
//                       //   };
//                       //   let filter_date = [];
//                       //   graphObject?.filters?.filter((d) => {
//                       //     if (d.attribute === "CreatedDate") {
//                       //       filter_date = [...filter_date, d?.columns];
//                       //     }
//                       //   });

//                       //   let combinedDate = section?.is_locked
//                       //     ? getCombinedDate({
//                       //         from: section?.start_date,
//                       //         to: section?.end_date,
//                       //       })
//                       //     : widget?.is_locked
//                       //     ? getCombinedDate({
//                       //         from: widget?.start_date,
//                       //         to: widget?.end_date,
//                       //       })
//                       //     : getCombinedDate(global_date, filter_date);

//                       //   let getInterval = getTimeIntervalDate(
//                       //     graphObject?.end_date,
//                       //     graphObject?.start_date,
//                       //     graphObject?.data_source
//                       //   );
//                       //   if (
//                       //     shareObj?.graphConditionConfig?.includes(
//                       //       graphObject?.x_axis?.attribute
//                       //     ) &&
//                       //     (graphObject?.chart?.chart_type === "combination" ||
//                       //       graphObject?.chart?.chart_type === "bar" ||
//                       //       graphObject?.chart?.chart_type ===
//                       //         "horizontal-bar" ||
//                       //       graphObject?.chart?.chart_type === "area" ||
//                       //       graphObject?.chart?.chart_type === "line") &&
//                       //     graphObject?.x_axis?.date_part === null
//                       //   ) {
//                       //     graphObject.x_axis.date_aggregation =
//                       //       getInterval.defaultVal;
//                       //   }
//                       //   graphObject?.data_source === "page" ||
//                       //   graphObject?.data_source === "ticket"
//                       //     ? dispatch(
//                       //         setWidgetMakerSharePageGraphData(
//                       //           graphObject,
//                       //           shareObj?.shareCategory,
//                       //           indexes,
//                       //           share,
//                       //           share_id,
//                       //           password
//                       //         )
//                       //       )
//                       //     : dispatch(
//                       //         setWidgetMakerShareGraphData(
//                       //           graphObject,
//                       //           shareObj?.shareCategory,
//                       //           indexes,
//                       //           share,
//                       //           share_id,
//                       //           password
//                       //         )
//                       //       );

//                       //   //share chart api call
//                       // } else {
//                       //   let graphObject = {
//                       //     primary_attribute: widget?.primary,
//                       //     secondary_attribute: widget?.secondary
//                       //       ? widget?.secondary
//                       //       : null,
//                       //     filters: filter ? filter : null,
//                       //     splits: widget?.splits ? widget?.splits : null,
//                       //     graph_type: widget?.graph_type
//                       //       ? widget?.graph_type
//                       //       : null,
//                       //     brand_list: widget?.is_locked
//                       //       ? widget_brands?.columns
//                       //         ? widget_brands?.columns
//                       //         : section?.is_locked
//                       //         ? section_brands?.columns
//                       //           ? section_brands?.columns
//                       //           : defaultBrands
//                       //         : defaultBrands
//                       //       : section?.is_locked
//                       //       ? section_brands?.columns
//                       //         ? section_brands?.columns
//                       //         : defaultBrands
//                       //       : defaultBrands,

//                       //     start_date: dateData?.from
//                       //       ? dateData?.from
//                       //       : defaultDuration?.from,
//                       //     end_date: dateData?.to
//                       //       ? dateData?.to
//                       //       : defaultDuration?.to,
//                       //     base: widget?.base ? widget?.base : null,
//                       //     widget_id: widget?.widget_id
//                       //       ? widget?.widget_id
//                       //       : null,
//                       //   };
//                       //   let global_date = {
//                       //     from: graphObject?.start_date,
//                       //     to: graphObject?.end_date,
//                       //   };
//                       //   let filter_date = [];
//                       //   graphObject?.filters?.filter((d) => {
//                       //     if (d.attribute === "CreatedDate") {
//                       //       filter_date = [...filter_date, d?.columns];
//                       //     }
//                       //   });
//                       //   let combinedDate = section?.is_locked
//                       //     ? getCombinedDate({
//                       //         from: section?.start_date,
//                       //         to: section?.end_date,
//                       //       })
//                       //     : widget?.is_locked
//                       //     ? getCombinedDate({
//                       //         from: widget?.start_date,
//                       //         to: widget?.end_date,
//                       //       })
//                       //     : getCombinedDate(global_date, filter_date);

//                       //   let getInterval = getTimeIntervalDate(
//                       //     graphObject?.end_date,
//                       //     graphObject?.start_date,
//                       //     graphObject?.data_source
//                       //   );
//                       //   if (
//                       //     shareObj?.graphConditionConfig?.includes(
//                       //       graphObject?.x_axis?.attribute
//                       //     ) &&
//                       //     (graphObject?.chart?.chart_type === "combination" ||
//                       //       graphObject?.chart?.chart_type === "bar" ||
//                       //       graphObject?.chart?.chart_type ===
//                       //         "horizontal-bar" ||
//                       //       graphObject?.chart?.chart_type === "area" ||
//                       //       graphObject?.chart?.chart_type === "line") &&
//                       //     graphObject?.x_axis?.date_part === null
//                       //   ) {
//                       //     graphObject.x_axis.date_aggregation =
//                       //       getInterval.defaultVal;
//                       //   }
//                       //   dispatch(
//                       //     setGraphShareFetch(
//                       //       graphObject,
//                       //       shareObj?.shareCategory,
//                       //       indexes,
//                       //       share,
//                       //       share_id,
//                       //       password
//                       //     )
//                       //   );
//                       // }
//                     });
//                   }
//                 })
//               : multipleWidgetsDataList?.forEach((widget, i) => {
//                   if (i <= 4) {
//                     let filter = getAllShareFilters(
//                       templateResponse,
//                       0,
//                       i,
//                       shareObj?.shareBrands
//                     );
//                     let duration = templateResponse?.duration?.from
//                       ? {
//                           // global duration  -->dateData
//                           from: templateResponse?.duration?.from
//                             ? templateResponse?.duration?.from
//                             : null,
//                           to: templateResponse?.duration?.to
//                             ? templateResponse?.duration?.to
//                             : null,
//                         }
//                       : templateResponse?.start_date
//                       ? {
//                           // global duration  -->dateData
//                           from: templateResponse?.start_date
//                             ? templateResponse?.start_date
//                             : null,
//                           to: templateResponse?.end_date
//                             ? templateResponse?.end_date
//                             : null,
//                         }
//                       : null;
//                     let obj = {};
//                     obj.type = "share_dashboard";
//                     obj.section_index = 0;
//                     obj.widget_index = i;
//                     obj.data = widget;
//                     obj.shareTemplateData = templateResponse;
//                     obj.duration = duration;
//                     obj.filter = filter;
//                     obj.shareBrands = shareObj?.shareBrands;
//                     obj.graphConditionConfig = shareObj?.graphConditionConfig;
//                     obj.data_source = widget?.data_source
//                       ? widget?.data_source
//                       : "mentions";
//                     let widgetGraphObject = getWidgetGraphObject(obj);

//                     if (widgetGraphObject) {
//                       let indexes = {
//                         section_index: null,
//                         widget_index: i,
//                       };

//                       let share = {
//                         sections: templateResponse,
//                       };
//                       // if (
//                       //   widgetGraphObject?.x_axis ||
//                       //   widgetGraphObject?.y_series ||
//                       //   widgetGraphObject?.chart
//                       // ) {
//                       //   widgetGraphObject?.data_source === "page" ||
//                       //   widgetGraphObject?.data_source === "ticket" ||
//                       //   widgetGraphObject?.data_source === "campaign" ||
//                       //   widgetGraphObject?.data_source === "feedback"
//                       //     ? dispatch(
//                       //         setWidgetMakerSharePageGraphData(
//                       //           widgetGraphObject,
//                       //           shareObj?.shareCategory,
//                       //           indexes,
//                       //           share,
//                       //           share_id,
//                       //           password
//                       //         )
//                       //       )
//                       //     : dispatch(
//                       //         setWidgetMakerShareGraphData(
//                       //           widgetGraphObject,
//                       //           shareObj?.shareCategory,
//                       //           indexes,
//                       //           share,
//                       //           share_id,
//                       //           password
//                       //         )
//                       //       );
//                       // } else {
//                       //   dispatch(
//                       //     setGraphShareFetch(
//                       //       widgetGraphObject,
//                       //       shareObj?.shareCategory,
//                       //       indexes,
//                       //       share,
//                       //       share_id,
//                       //       password
//                       //     )
//                       //   );
//                       // }
//                     }
//                     // let twoMonthsDuration = getCustomizedDate(6, "Days");
//                     // let defaultDuration = {
//                     //   from:
//                     //     moment(twoMonthsDuration?.date[0]).format(
//                     //       "YYYY/MM/DD"
//                     //     ) +
//                     //     " " +
//                     //     twoMonthsDuration?.time?.startTime,
//                     //   to:
//                     //     moment(twoMonthsDuration?.date[1]).format(
//                     //       "YYYY/MM/DD"
//                     //     ) +
//                     //     " " +
//                     //     twoMonthsDuration?.time?.endTime,
//                     // };

//                     // let widgetFilterDate = {
//                     //   from: widget?.start_date ? widget?.start_date : null,
//                     //   to: widget?.end_date ? widget?.end_date : null,
//                     // };
//                     // let combinedFilters = [];
//                     // if (!widget?.is_locked) {
//                     //   if (widgetFilterDate?.from)
//                     //     combinedFilters.push({
//                     //       attribute: "CreatedDate",
//                     //       type: "datetime",
//                     //       columns: widgetFilterDate,
//                     //     });

//                     //   if (widget?.brand_ids) {
//                     //     let brands = getBrands(
//                     //       shareObj?.shareBrands?.brand_groups,
//                     //       widget?.brand_ids,
//                     //       shareObj?.shareBrands?.brand_list,
//                     //       widget?.brand_groups
//                     //     );

//                     //     combinedFilters.push(brands);
//                     //   }
//                     // }
//                     // if (widget?.filters)
//                     //   combinedFilters = [
//                     //     ...widget?.filters,
//                     //     ...combinedFilters,
//                     //   ];
//                     // let filterData = combinedFilters?.filter((d) => d);
//                     // let hidden_filter = response?.data?.result?.hidden_filter
//                     //   ? [response?.data?.result?.hidden_filter]
//                     //   : [];
//                     // let quick_filter = response?.data?.result?.quick_filter
//                     //   ? [response?.data?.result?.quick_filter]
//                     //   : [];
//                     // let filter = [
//                     //   ...filterData,
//                     //   ...hidden_filter,
//                     //   ...quick_filter,
//                     // ];
//                     // let indexes = {
//                     //   section_index: null,
//                     //   widget_index: i,
//                     // };

//                     // let share = {
//                     //   sections: templateResponse,
//                     // };
//                     // let widget_brands = getBrands(
//                     //   shareObj?.shareBrands?.brand_groups,
//                     //   widget?.brand_ids,
//                     //   shareObj?.shareBrands?.brand_list,
//                     //   widget?.brand_groups
//                     // );
//                     // // category_id: graphObject?.authParams?.category_id,
//                     // if (widget?.x_axis || widget?.y_series || widget?.chart) {
//                     //   let graphObject = {
//                     //     start_date: widget?.start_date
//                     //       ? widget?.start_date
//                     //       : dateData?.from
//                     //       ? dateData?.from
//                     //       : defaultDuration?.from,
//                     //     end_date: widget?.end_date
//                     //       ? widget?.end_date
//                     //       : dateData?.to
//                     //       ? dateData?.to
//                     //       : defaultDuration?.to,
//                     //     // brand_list: widget?.is_locked
//                     //     //   ? widget_brands?.columns
//                     //     //   : widget?.duplicate_for_brands
//                     //     //   ? widget?.com_brand_ids
//                     //     //   : widget?.brand_list
//                     //     //   ? widget?.brand_list
//                     //     //   : shareObj?.shareBrands
//                     //     //   ? shareObj?.shareBrands
//                     //     //   : null,
//                     //     brand_list: widget?.is_locked
//                     //       ? widget_brands?.columns
//                     //         ? widget_brands?.columns
//                     //         : widget?.duplicate_for_brands
//                     //         ? widget?.com_brand_ids
//                     //         : widget?.brand_list
//                     //         ? widget?.brand_list
//                     //         : shareObj?.shareBrands
//                     //         ? shareObj?.shareBrands
//                     //         : null
//                     //       : widget?.duplicate_for_brands
//                     //       ? widget?.com_brand_ids
//                     //       : widget?.brand_list
//                     //       ? widget?.brand_list
//                     //       : shareObj?.shareBrands
//                     //       ? shareObj?.shareBrands
//                     //       : null,
//                     //     order_by: widget?.order_by,
//                     //     filters: filter ? filter : null,
//                     //     x_axis: widget?.x_axis,
//                     //     // Break down data
//                     //     y_axes: widget?.y_axes,
//                     //     // y axis data
//                     //     y_series: widget?.y_series,
//                     //     widget_name: widget?.widget_name,
//                     //     chart: widget?.chart,
//                     //     data_source: widget?.data_source,
//                     //     widget_id: widget?.widget_id,
//                     //     engine: widget?.engine,
//                     //     ticket: widget?.data_source === "ticket" ? true : false,
//                     //   };
//                     //   if (widget?.duplicate_for_brands) {
//                     //     graphObject.isBrandModified = true;
//                     //     graphObject.comp_brand_list = null;
//                     //   }
//                     //   let global_date = {
//                     //     from: graphObject?.start_date,
//                     //     to: graphObject?.end_date,
//                     //   };
//                     //   let filter_date = [];
//                     //   graphObject?.filters?.filter((d) => {
//                     //     if (d.attribute === "CreatedDate") {
//                     //       filter_date = [...filter_date, d?.columns];
//                     //     }
//                     //   });
//                     //   let combinedDate = widget?.is_locked
//                     //     ? getCombinedDate({
//                     //         from: widget?.start_date,
//                     //         to: widget?.end_date,
//                     //       })
//                     //     : getCombinedDate(global_date, filter_date);
//                     //   let getInterval = getTimeIntervalDate(
//                     //     graphObject?.end_date,
//                     //     graphObject?.start_date,
//                     //     graphObject?.data_source
//                     //   );
//                     //   if (
//                     //     shareObj?.graphConditionConfig?.includes(
//                     //       graphObject?.x_axis?.attribute
//                     //     ) &&
//                     //     (graphObject?.chart?.chart_type === "combination" ||
//                     //       graphObject?.chart?.chart_type === "bar" ||
//                     //       graphObject?.chart?.chart_type === "horizontal-bar" ||
//                     //       graphObject?.chart?.chart_type === "area" ||
//                     //       graphObject?.chart?.chart_type === "line") &&
//                     //     graphObject?.x_axis?.date_part === null
//                     //   ) {
//                     //     graphObject.x_axis.date_aggregation =
//                     //       getInterval.defaultVal;
//                     //   }
//                     //   graphObject?.data_source === "page" ||
//                     //   graphObject?.data_source === "ticket"
//                     //     ? dispatch(
//                     //         setWidgetMakerSharePageGraphData(
//                     //           graphObject,
//                     //           shareObj?.shareCategory,
//                     //           indexes,
//                     //           share,
//                     //           share_id,
//                     //           password
//                     //         )
//                     //       )
//                     //     : dispatch(
//                     //         setWidgetMakerShareGraphData(
//                     //           graphObject,
//                     //           shareObj?.shareCategory,
//                     //           indexes,
//                     //           share,
//                     //           share_id,
//                     //           password
//                     //         )
//                     //       );
//                     //   //share chart api call
//                     // } else {
//                     //   // brand_list: widget?.is_locked
//                     //   //       ? widget_brands?.columns
//                     //   //         ? widget_brands?.columns
//                     //   //         : section?.is_locked
//                     //   //         ? section_brands?.columns
//                     //   //           ? section_brands?.columns
//                     //   //           : defaultBrands
//                     //   //         : defaultBrands
//                     //   //       : section?.is_locked
//                     //   //       ? section_brands?.columns
//                     //   //         ? section_brands?.columns
//                     //   //         : defaultBrands
//                     //   //       : defaultBrands,
//                     //   let graphObject = {
//                     //     primary_attribute: widget?.primary,
//                     //     secondary_attribute: widget?.secondary
//                     //       ? widget?.secondary
//                     //       : null,
//                     //     filters: filter ? filter : null,
//                     //     splits: widget?.splits ? widget?.splits : null,
//                     //     graph_type: widget?.graph_type
//                     //       ? widget?.graph_type
//                     //       : null,
//                     //     // brand_list: widget?.is_locked
//                     //     //   ? widget_brands?.columns
//                     //     //   : widget?.brand_list
//                     //     //   ? widget?.brand_list
//                     //     //   : shareObj?.shareBrands
//                     //     //   ? shareObj?.shareBrands
//                     //     //   : null,
//                     //     brand_list: widget?.is_locked
//                     //       ? widget_brands?.columns
//                     //         ? widget_brands?.columns
//                     //         : widget?.brand_list
//                     //         ? widget?.brand_list
//                     //         : shareObj?.shareBrands
//                     //         ? shareObj?.shareBrands
//                     //         : null
//                     //       : widget?.brand_list
//                     //       ? widget?.brand_list
//                     //       : shareObj?.shareBrands
//                     //       ? shareObj?.shareBrands
//                     //       : null,
//                     //     start_date: dateData?.from
//                     //       ? dateData?.from
//                     //       : defaultDuration?.from,
//                     //     end_date: dateData?.to
//                     //       ? dateData?.to
//                     //       : defaultDuration?.to,
//                     //     base: widget?.base ? widget?.base : null,
//                     //     widget_id: widget?.widget_id ? widget?.widget_id : null,
//                     //   };
//                     //   let global_date = {
//                     //     from: graphObject?.start_date,
//                     //     to: graphObject?.end_date,
//                     //   };
//                     //   let filter_date = [];
//                     //   graphObject?.filters?.filter((d) => {
//                     //     if (d.attribute === "CreatedDate") {
//                     //       filter_date = [...filter_date, d?.columns];
//                     //     }
//                     //   });
//                     //   let combinedDate = widget?.is_locked
//                     //     ? getCombinedDate({
//                     //         from: widget?.start_date,
//                     //         to: widget?.end_date,
//                     //       })
//                     //     : getCombinedDate(global_date, filter_date);

//                     //   let getInterval = getTimeIntervalDate(
//                     //     graphObject?.end_date,
//                     //     graphObject?.start_date,
//                     //     graphObject?.data_source
//                     //   );
//                     //   if (
//                     //     shareObj?.graphConditionConfig?.includes(
//                     //       graphObject?.x_axis?.attribute
//                     //     ) &&
//                     //     (graphObject?.chart?.chart_type === "combination" ||
//                     //       graphObject?.chart?.chart_type === "bar" ||
//                     //       graphObject?.chart?.chart_type === "horizontal-bar" ||
//                     //       graphObject?.chart?.chart_type === "area" ||
//                     //       graphObject?.chart?.chart_type === "line") &&
//                     //     graphObject?.x_axis?.date_part === null
//                     //   ) {
//                     //     graphObject.x_axis.date_aggregation =
//                     //       getInterval.defaultVal;
//                     //   }
//                     //   dispatch(
//                     //     setGraphShareFetch(
//                     //       graphObject,
//                     //       shareObj?.shareCategory,
//                     //       indexes,
//                     //       share,
//                     //       share_id,
//                     //       password
//                     //     )
//                     //   );
//                     // }
//                   }
//                 });
//           }
//           if (response?.data?.status === "error") {
//             let updateShareTemplateData = {
//               error_code: response?.data?.error_code,
//             };
//             dispatch({
//               type: "SET_SHARE_TEMPLATE_DATA",
//               payload: updateShareTemplateData,
//             });
//             errorCode?.map((el, i) => {
//               return el.key === response?.data?.error_code
//                 ? (errorMessage = el.value)
//                 : null;
//             });
//             callNotification(errorMessage, "error");
//           }
//         })
//         .catch((error) => {
//           callNotification(null, "error");
//         });
//     } else {
//       dispatch({
//         type: "SET_SHARE_TEMPLATE_DATA",
//         payload: null,
//       });
//     }
//   };
// };

// export const setSharableId = (value) => {
//   return { type: "SET_SHARE_ID_RESPONSE", payload: value };
// };

// export const setDownloadId = (value) => {
//   return { type: "SET_DOWNLOAD_ID", payload: value };
// };

// //set section and template fetch loader
// export const setTemplateSectionFetchLoader = (value) => {
//   return { type: "SET_TEMPLATE_SECTION_FETCH_LOADER", payload: value };
// };

// //api call to delete section
// export const setDeleteSection = (authParams) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         user_id: authParams?.userid,
//         category_id: authParams?.category_id,
//         template_id: "",
//         section_id: "",
//       };
//       let url = `${Config.config1.api_link}template/section/delete`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch({ type: "SET_DELETE_SECTION", payload: response });

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
//     } else {
//       dispatch({ type: "SET_DELETE_SECTION", payload: null });
//     }
//   };
// };

// export const setSectionLoader = (value) => {
//   return { type: "SET_SECTION_LOADER", payload: value };
// };
// //api call to fetch section data
// export const setFetchSectionData = (
//   authParams,
//   id,
//   paneobject,
//   template_id,
//   updateFilter,
//   onEditMode
// ) => {
//   let errorMessage;
//   paneobject.panes = global?.panes ? [...global.panes] : [...paneobject?.panes];
//   //for section loader
//   let sections =
//     paneobject?.panes &&
//     paneobject?.activeKey &&
//     paneobject?.panes[getPaneIndex(paneobject?.panes, paneobject?.activeKey)]
//       ?.sections;

//   let sectionIndex = sections
//     ? sections?.findIndex((el) => el.section_id === id)
//     : 0;
//   return async (dispatch) => {
//     dispatch(setSectionLoader({ value: true, id: id, index: sectionIndex }));
//     if (authParams) {
//       let body = {
//         ptoken: authParams?.ptoken,
//         section_id: id,
//         template_id: template_id,
//       };
//       let url = `${Config.config1.api_link}/template/section/fetch`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           // dispatch(setSectionLoader({ value: false, id: id }));
//           if (response?.data?.status === "successful") {
//             dispatch(setSectionLoader({ value: false, id: id }));

//             if (paneobject?.edit) {
//               //add widgetMaker code
//               let sections = paneobject?.Section;
//               let index = getPaneIndex(
//                 paneobject?.panes,
//                 paneobject?.activeKey
//               );
//               let sectionIndex = sections
//                 ? sections?.findIndex((el) => el.id === id)
//                 : null;
//               let section_metadata = sections[sectionIndex];
//               response?.data?.result?.widgets?.forEach((el, i) => {
//                 let global_brands = paneobject?.panes[index]?.brands
//                   ? paneobject?.panes[index]?.brands
//                   : null;
//                 let section_brands = getBrands(
//                   paneobject?.brands,
//                   section_metadata?.brand_ids,

//                   paneobject?.singleBrands,
//                   section_metadata?.brand_groups
//                 );
//                 let widget_brands = getBrands(
//                   paneobject?.brands,
//                   el?.brand_ids,

//                   paneobject?.singleBrands,
//                   el?.brand_groups
//                 );
//                 let Section_is_locked = paneobject?.panes[index]?.sections
//                   ? paneobject?.panes[index]?.sections[sectionIndex]?.is_locked
//                   : null;
//                 let widgets_is_locked = el?.is_locked;
//                 let twoMonthsDuration = getCustomizedDate(6, "Days");
//                 let defaultDuration = {
//                   from:
//                     moment(twoMonthsDuration?.date[0]).format("YYYY/MM/DD") +
//                     " " +
//                     twoMonthsDuration?.time?.startTime,
//                   to:
//                     moment(twoMonthsDuration?.date[1]).format("YYYY/MM/DD") +
//                     " " +
//                     twoMonthsDuration?.time?.endTime,
//                 };
//                 let filter = el?.filters;

//                 let indexes = {
//                   pane_index: index,
//                   section_index: sectionIndex,
//                   panes: paneobject?.panes,
//                   widget_index: i,

//                   graph_type: el?.graph_type,
//                   //templateFilter: widget ? true : false,
//                   //section: Section,
//                   section_id: paneobject?.section_id && paneobject?.section_id,
//                   template_details:
//                     paneobject?.templateDetails && paneobject?.templateDetails,
//                 };
//                 if (
//                   paneobject?.graphConditionConfig?.[`data-source`]?.includes(
//                     el?.data_source
//                   )
//                 ) {
//                   let graphObject = {
//                     start_date: el?.is_locked
//                       ? el?.start_date
//                         ? el?.start_date
//                         : defaultDuration?.from
//                       : response?.data?.result?.is_locked
//                       ? response?.data?.result?.start_date
//                       : paneobject?.templateDetails?.templateDuration?.from
//                       ? paneobject?.templateDetails?.templateDuration?.from
//                       : defaultDuration?.from,
//                     end_date: el?.is_locked
//                       ? el?.end_date
//                         ? el?.end_date
//                         : defaultDuration?.to
//                       : response?.data?.result?.is_locked
//                       ? response?.data?.result?.end_date
//                       : paneobject?.templateDetails?.templateDuration?.to
//                       ? paneobject?.templateDetails?.templateDuration?.to
//                       : defaultDuration?.to,
//                     brands: widgets_is_locked
//                       ? el?.brand_ids || el?.brand_groups
//                         ? widget_brands?.columns
//                         : global_brands
//                         ? global_brands
//                         : paneobject?.brands
//                       : Section_is_locked
//                       ? section_metadata?.brand_ids ||
//                         section_metadata?.brand_groups
//                         ? section_brands?.columns
//                         : global_brands
//                         ? global_brands
//                         : paneobject?.brands
//                       : global_brands
//                       ? global_brands
//                       : paneobject?.brands,

//                     isBrandModified:
//                       (widgets_is_locked || Section_is_locked) &&
//                       (section_metadata?.brand_ids ||
//                         section_metadata?.brand_groups ||
//                         el?.brand_ids ||
//                         el?.brand_groups)
//                         ? true
//                         : global_brands
//                         ? true
//                         : false,
//                     order_by: el?.order_by,
//                     filters: filter ? filter : null,
//                     x_axis: el?.x_axis,
//                     // Break down data
//                     y_axes: el?.y_axes,
//                     // y axis data
//                     y_series: el?.y_series,
//                     widget_name: el?.widget_name,
//                     chart: el?.chart,
//                     comp_brand_list: el?.comp_brand_list,
//                     data_source: el?.data_source,
//                     widget_id: el?.widget_id,
//                     engine: el?.engine,
//                     ticket: el?.data_source === "ticket" ? true : false,
//                     campaign: el?.data_source === "campaign" ? true : false,
//                   };
//                   let global_date = {
//                     from: graphObject?.start_date,
//                     to: graphObject?.end_date,
//                   };
//                   let filter_date = [];
//                   graphObject?.filters?.filter((d) => {
//                     if (d.attribute?.toLowerCase() === "createddate") {
//                       filter_date = [...filter_date, d?.columns];
//                     }
//                   });
//                   let combinedDate =
//                     Section_is_locked || widgets_is_locked
//                       ? getCombinedDate(global_date)
//                       : getCombinedDate(global_date, filter_date);
//                   let getInterval = getTimeIntervalDate(
//                     graphObject?.end_date,
//                     graphObject?.start_date,
//                     graphObject?.data_source
//                   );
//                   if (
//                     paneobject?.graphConditionConfig?.[
//                       `date-attributes`
//                     ]?.includes(graphObject?.x_axis?.attribute) &&
//                     paneobject?.graphConditionConfig?.[
//                       `date_agg-chart_type`
//                     ]?.includes(graphObject?.chart?.chart_type) &&
//                     graphObject?.x_axis?.date_part === null
//                   ) {
//                     graphObject.x_axis.date_aggregation =
//                       getInterval.defaultVal;
//                   }
//                   dispatch(setPageChart(authParams, graphObject, indexes, []));
//                 } else if (el?.x_axis || el?.y_series || el?.chart) {
//                   let graphObject = {
//                     start_date: el?.is_locked
//                       ? el?.start_date
//                         ? el?.start_date
//                         : defaultDuration?.from
//                       : response?.data?.result?.is_locked
//                       ? response?.data?.result?.start_date
//                       : paneobject?.templateDetails?.templateDuration?.from
//                       ? paneobject?.templateDetails?.templateDuration?.from
//                       : defaultDuration?.from,
//                     end_date: el?.is_locked
//                       ? el?.end_date
//                         ? el?.end_date
//                         : defaultDuration?.to
//                       : response?.data?.result?.is_locked
//                       ? response?.data?.result?.end_date
//                       : paneobject?.templateDetails?.templateDuration?.to
//                       ? paneobject?.templateDetails?.templateDuration?.to
//                       : defaultDuration?.to,
//                     brands: widgets_is_locked
//                       ? el?.brand_ids || el?.brand_groups
//                         ? widget_brands?.columns
//                         : global_brands
//                         ? global_brands
//                         : paneobject?.brands
//                       : Section_is_locked
//                       ? section_metadata?.brand_ids ||
//                         section_metadata?.brand_groups
//                         ? section_brands?.columns
//                         : global_brands
//                         ? global_brands
//                         : paneobject?.brands
//                       : global_brands
//                       ? global_brands
//                       : paneobject?.brands,

//                     isBrandModified:
//                       (widgets_is_locked || Section_is_locked) &&
//                       (section_metadata?.brand_ids ||
//                         section_metadata?.brand_groups ||
//                         el?.brand_ids ||
//                         el?.brand_groups)
//                         ? true
//                         : global_brands
//                         ? true
//                         : false,
//                     order_by: el?.order_by,
//                     filters: filter ? filter : null,
//                     x_axis: el?.x_axis,
//                     // Break down data
//                     y_axes: el?.y_axes,
//                     // y axis data
//                     y_series: el?.y_series,
//                     widget_name: el?.widget_name,
//                     chart: el?.chart,
//                     comp_brand_list: el?.comp_brand_list,
//                   };
//                   let global_date = {
//                     from: graphObject?.start_date,
//                     to: graphObject?.end_date,
//                   };
//                   let filter_date = [];
//                   graphObject?.filters?.filter((d) => {
//                     if (d.attribute?.toLowerCase() === "createddate") {
//                       filter_date = [...filter_date, d?.columns];
//                     }
//                   });
//                   let combinedDate =
//                     Section_is_locked || widgets_is_locked
//                       ? getCombinedDate(global_date)
//                       : getCombinedDate(global_date, filter_date);
//                   let getInterval = getTimeIntervalDate(
//                     graphObject?.end_date,
//                     graphObject?.start_date,
//                     graphObject?.data_source
//                   );
//                   if (
//                     paneobject?.graphConditionConfig?.[
//                       `date-attributes`
//                     ]?.includes(graphObject?.x_axis?.attribute) &&
//                     paneobject?.graphConditionConfig?.[
//                       `date_agg-chart_type`
//                     ]?.includes(graphObject?.chart?.chart_type) &&
//                     graphObject?.x_axis?.date_part === null
//                   ) {
//                     graphObject.x_axis.date_aggregation =
//                       getInterval.defaultVal;
//                   }
//                   if (graphObject?.chart?.chart_type === "network-graph-v2") {
//                     graphObject.isNetworkChartV2 =
//                       graphObject?.chart?.chart_type === "network-graph-v2"
//                         ? true
//                         : false;
//                   }
//                   dispatch(
//                     setWidgetMakerGraphData(
//                       authParams,
//                       graphObject,
//                       indexes,
//                       [],
//                       undefined
//                     )
//                   );
//                 } else {
//                   let graphObject = {
//                     authParams: authParams,
//                     firstAttr: el?.primary,
//                     secondAttr: el?.secondary,
//                     filterObj: filter ? filter : null,
//                     filters: filter ? filter : null,
//                     splitObj: el?.splits,
//                     start_date: el?.is_locked
//                       ? el?.start_date
//                         ? el?.start_date
//                         : defaultDuration?.from
//                       : response?.data?.result?.is_locked
//                       ? response?.data?.result?.start_date
//                       : paneobject?.templateDetails?.templateDuration?.from
//                       ? paneobject?.templateDetails?.templateDuration?.from
//                       : defaultDuration?.from,
//                     end_date: el?.is_locked
//                       ? el?.end_date
//                         ? el?.end_date
//                         : defaultDuration?.to
//                       : response?.data?.result?.is_locked
//                       ? response?.data?.result?.end_date
//                       : paneobject?.templateDetails?.templateDuration?.to
//                       ? paneobject?.templateDetails?.templateDuration?.to
//                       : defaultDuration?.to,

//                     brands: widgets_is_locked
//                       ? el?.brand_ids || el?.brand_groups
//                         ? widget_brands?.columns
//                         : global_brands
//                         ? global_brands
//                         : paneobject?.brands
//                       : Section_is_locked
//                       ? response?.data?.result?.brand_ids ||
//                         response?.data?.result?.brand_groups
//                         ? section_brands?.columns
//                         : global_brands
//                         ? global_brands
//                         : paneobject?.brands
//                       : global_brands
//                       ? global_brands
//                       : paneobject?.brands,
//                     isBrandModified:
//                       (widgets_is_locked || Section_is_locked) &&
//                       (response?.data?.result?.brand_ids ||
//                         response?.data?.result?.brand_groups ||
//                         el?.brand_ids ||
//                         el?.brand_groups)
//                         ? true
//                         : global_brands
//                         ? true
//                         : false,
//                     base: el?.base,

//                     widget_id: el?.widget_id,
//                   };
//                   let global_date = {
//                     from: graphObject?.start_date,
//                     to: graphObject?.end_date,
//                   };
//                   let filter_date = [];
//                   graphObject?.filters?.filter((d) => {
//                     if (d.attribute?.toLowerCase() === "createddate") {
//                       filter_date = [...filter_date, d?.columns];
//                     }
//                   });
//                   let combinedDate =
//                     Section_is_locked || widgets_is_locked
//                       ? getCombinedDate(global_date)
//                       : getCombinedDate(global_date, filter_date);
//                   let getInterval1 = getTimeIntervalDate(
//                     graphObject?.end_date,
//                     graphObject?.start_date,
//                     graphObject?.data_source
//                   );
//                   if (
//                     paneobject?.graphConditionConfig?.[
//                       `date-attributes`
//                     ]?.includes(graphObject?.x_axis?.attribute) &&
//                     paneobject?.graphConditionConfig?.[
//                       `date_agg-chart_type`
//                     ]?.includes(graphObject?.chart?.chart_type) &&
//                     graphObject?.x_axis?.date_part === null
//                   ) {
//                     graphObject.x_axis.date_aggregation =
//                       getInterval1.defaultVal;
//                   }
//                   let indexes1 = {
//                     pane_index: index,
//                     section_index: sectionIndex,
//                     panes: paneobject?.panes,
//                     widget_index: i,
//                   };
//                   let getInterval = getTimeInterval(
//                     defaultDuration?.to,
//                     defaultDuration?.from
//                   );
//                   let graphObject1 = {
//                     authParams: authParams,

//                     filterObj: filter ? filter : null,

//                     brands: paneobject?.brands,

//                     duration: defaultDuration,
//                     widget_id: el?.original_widget_id,
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
//                   };

//                   if (authParams?.category_id && paneobject?.brands) {
//                     el?.graph_type === "aggregate"
//                       ? dispatch(
//                           setAggregateData(
//                             graphObject,
//                             indexes //widget data
//                           )
//                         )
//                       : el?.primary
//                       ? dispatch(
//                           setGraphData(
//                             graphObject,
//                             indexes //widget data
//                           )
//                         )
//                       : el?.is_imported &&
//                         dispatch(setPreWidgetsData(graphObject1, indexes1));
//                   }
//                 }
//               });
//               if (response?.data?.result?.widgets?.length > 6) {
//                 dispatch(
//                   setTicketOffset({
//                     widget_index: 6,
//                     id: "7",
//                   })
//                 );
//               }
//               let offset = sectionIndex;
//               let lastIndex = offset + 1 === sections?.length;
//               dispatch(
//                 setSectionOffset(
//                   lastIndex
//                     ? null
//                     : {
//                         id: id,
//                         offset: ++offset,
//                       }
//                 )
//               );

//               dispatch(
//                 setEditTemplateWidget(
//                   response?.data?.result?.widgets,
//                   paneobject?.Section,
//                   sectionIndex
//                 )
//               );
//             } else {
//               let multipleWidgetsDataList = [];
//               let index = getPaneIndex(
//                 paneobject?.panes,
//                 paneobject?.activeKey
//               );
//               let sections = paneobject?.panes?.[index]?.sections;

//               let sectionIndex = sections
//                 ? sections?.findIndex((el) => el?.section_id === id)
//                 : null;
//               let duration = paneobject?.panes[index]?.duration
//                 ? paneobject?.panes[index]?.duration
//                 : paneobject?.templateGlobalDuration
//                 ? paneobject?.templateGlobalDuration
//                 : paneobject?.global_dashboard_duration
//                 ? paneobject?.global_dashboard_duration
//                 : null;

//               let comp_brands =
//                 paneobject?.panes[index]?.template_type === "competition" &&
//                 paneobject?.competitorBrands?.length > 0
//                   ? getDefaultCompBrand(paneobject?.competitorBrands)
//                   : null;

//               let global_brands = paneobject?.panes[index]?.brands
//                 ? paneobject?.panes[index]?.brands
//                 : comp_brands
//                 ? comp_brands
//                 : paneobject?.templateGlobalBrands
//                 ? paneobject?.templateGlobalBrands
//                 : paneobject?.global_dashboard_brands?.columns
//                 ? comp_brands
//                   ? !paneobject?.global_dashboard_brands?.columns[0]?.competitor
//                     ? comp_brands
//                     : paneobject?.global_dashboard_brands?.columns
//                   : paneobject?.global_dashboard_brands?.columns
//                 : null;
//               if (
//                 (sectionIndex === 0 || sectionIndex === 1 || !sectionIndex) &&
//                 response?.data?.result?.predefined &&
//                 paneobject?.panes[index]?.template_type === "ticket"
//               ) {
//                 //for auto load first two  section widgets

//                 let widgetsData = response?.data?.result?.widgets;
//                 let obj = {
//                   data: response?.data,
//                 };
//                 if (paneobject?.panes[index].template_id === "000-000-001") {
//                   dispatch(
//                     setConfiguration(
//                       index,
//                       paneobject,
//                       authParams,
//                       sectionIndex,
//                       widgetsData,
//                       "tickets/orm",
//                       paneobject?.panes[index].template_id,
//                       obj
//                     )
//                   );
//                 } else if (
//                   paneobject?.panes[index].template_id === "000-000-002"
//                 ) {
//                   dispatch(
//                     setConfiguration(
//                       index,
//                       paneobject,
//                       authParams,
//                       sectionIndex,
//                       widgetsData,
//                       "tickets/simple-view",
//                       paneobject?.panes[index].template_id
//                     )
//                   );
//                 } else if (
//                   paneobject?.panes[index].template_id === "000-000-003"
//                 ) {
//                   dispatch(
//                     setConfiguration(
//                       index,
//                       paneobject,
//                       authParams,
//                       sectionIndex,
//                       widgetsData,
//                       "tickets/agent-activity",
//                       paneobject?.panes[index].template_id
//                     )
//                   );
//                 } else if (
//                   paneobject?.panes[index].template_id === "000-000-004"
//                 ) {
//                   dispatch(
//                     setConfiguration(
//                       index,
//                       paneobject,
//                       authParams,
//                       sectionIndex,
//                       widgetsData,
//                       "tickets/overview",
//                       paneobject?.panes[index].template_id
//                     )
//                   );
//                 } else if (
//                   paneobject?.panes[index].template_id === "000-000-101"
//                 ) {
//                   let graphObject = {
//                     brand_id: 3732,
//                     channel_group_id: "2",
//                   };
//                   dispatch(
//                     getListeningSmaProfiles(
//                       authParams,
//                       graphObject,
//                       index,
//                       paneobject,
//                       sectionIndex,
//                       widgetsData,
//                       "orm",
//                       paneobject?.panes[index].template_id
//                     )
//                   );
//                 }

//                 if (response?.data?.result?.widgets?.length > 1) {
//                   dispatch(
//                     setTicketOffset({
//                       widget_index: 12,
//                       id: "6",
//                     })
//                   );
//                 }
//               } else if (
//                 (((sectionIndex === 0 || !sectionIndex) &&
//                   !response?.data?.result?.predefined) ||
//                   (paneobject?.panes[index].template_type !== "ticket" &&
//                     response?.data?.result?.predefined &&
//                     (sectionIndex === 0 || !sectionIndex))) &&
//                 (!paneobject?.panes[index]?.quick_filter ||
//                   (paneobject?.panes[index]?.quick_filter &&
//                     paneobject?.panes[index]?.quick_filter?.toLowerCase() !==
//                       "campaignid" &&
//                     paneobject?.panes[index]?.profiles?.length > 0) ||
//                   (paneobject?.panes[index]?.quick_filter?.toLowerCase() ===
//                     "campaignid" &&
//                     paneobject?.panes[index]?.profiles?.length > 0 &&
//                     paneobject?.panes?.[index]?.campaign_date?.from <
//                       moment(new Date()).format("YYYY/MM/DD H:mm")))
//               ) {
//                 //check if duplicate comp brand widget exist
//                 const competitorBrandExists =
//                   (onEditMode &&
//                     paneobject?.templateDetails?.templateBrands?.columns?.[0]
//                       ?.competitor) ||
//                   paneobject?.panes?.[index]?.brands?.columns?.[0]
//                     ?.competitor ||
//                   paneobject?.panes?.[index]?.brands?.[0]?.competitor ||
//                   comp_brands?.[0]?.competitor;
//                 const competitorBrand =
//                   onEditMode &&
//                   paneobject?.templateDetails?.templateBrands?.columns?.[0]
//                     ?.competitor
//                     ? paneobject?.templateDetails?.templateBrands?.columns?.[0]
//                     : paneobject?.panes?.[index]?.brands?.columns?.[0]
//                         ?.competitor
//                     ? paneobject?.panes?.[index]?.brands?.columns?.[0]
//                     : paneobject?.panes?.[index]?.brands?.[0]?.competitor
//                     ? paneobject?.panes?.[index]?.brands?.[0]
//                     : comp_brands?.[0]?.competitor
//                     ? comp_brands?.[0]
//                     : null;
//                 const isLockedOnBrand =
//                   response?.data?.result?.is_locked &&
//                   (response?.data?.result?.brand_groups?.length > 0 ||
//                     response?.data?.result?.brand_ids?.length > 0);
//                 const comBrandtypeExists =
//                   response?.data?.result?.comp_brand_type === false ||
//                   response?.data?.result?.comp_brand_type === true
//                     ? true
//                     : false;
//                 if (
//                   competitorBrandExists &&
//                   !isLockedOnBrand &&
//                   !comBrandtypeExists
//                 ) {
//                   response?.data?.result?.widgets?.forEach(
//                     (widgetResData, i) => {
//                       if (
//                         widgetResData?.chart &&
//                         widgetResData?.chart &&
//                         (widgetResData?.chart?.["chart_type"] === "wordcloud" ||
//                           widgetResData?.chart?.["chart_type"] === "grid" ||
//                           widgetResData?.chart?.["chart_type"] ===
//                             "author-card" ||
//                           widgetResData?.chart?.["chart_type"] ===
//                             "post-card") &&
//                         widgetResData?.chart?.["chart_settings"]?.[
//                           "duplicate_for_brands"
//                         ]
//                       ) {
//                         let newBrandList = [];
//                         if (competitorBrand?.competitor) {
//                           newBrandList.push({
//                             brand_id: competitorBrand?.name,
//                             brand_name: competitorBrand?.brand_name,
//                             brand_friendly_name:
//                               competitorBrand?.brand_friendly_name,
//                           });
//                           competitorBrand?.competitorList?.forEach((cBrand) => {
//                             newBrandList.push(cBrand);
//                           });
//                         }

//                         let duplicateWidgets = getDuplicateWidgets(
//                           newBrandList,
//                           widgetResData,
//                           paneobject?.singleBrands
//                         );
//                         if (duplicateWidgets) {
//                           multipleWidgetsDataList = [
//                             ...multipleWidgetsDataList,
//                             ...duplicateWidgets,
//                           ];
//                         } else {
//                           multipleWidgetsDataList.push(widgetResData);
//                         }
//                       } else {
//                         multipleWidgetsDataList.push(widgetResData);
//                       }
//                     }
//                   );
//                 }

//                 if (
//                   multipleWidgetsDataList &&
//                   multipleWidgetsDataList?.length === 0
//                 ) {
//                   multipleWidgetsDataList = response?.data?.result?.widgets;
//                 }
//                 //for auto load first two  section widgets
//                 multipleWidgetsDataList &&
//                   multipleWidgetsDataList?.forEach((el, i) => {
//                     paneobject.template_id =
//                       paneobject?.panes[index]?.template_id;
//                     paneobject.section_id = body?.section_id;
//                     paneobject.widget_id = el?.widget_id;
//                     let temp_exclude_words = getTemporaryWords(paneobject);
//                     el.temp_exclude_words = temp_exclude_words;

//                     if (
//                       (paneobject?.onlyWidgets && i < 5) ||
//                       !paneobject?.onlyWidgets
//                     ) {
//                       let sectionObj = {
//                         brand_ids: response?.data?.result?.brand_ids,
//                         brand_groups: response?.data?.result?.brand_groups,
//                         singleBrands: paneobject?.singleBrands,
//                         filters: response?.data?.result?.filters
//                           ? response?.data?.result?.filters
//                           : [],
//                         duration: {
//                           from: response?.data?.result?.start_date
//                             ? response?.data?.result?.start_date
//                             : null,
//                           to: response?.data?.result?.end_date
//                             ? response?.data?.result?.end_date
//                             : null,
//                         },
//                         dateFilters: response?.data?.result?.start_date
//                           ? [
//                               {
//                                 attribute: "createddate",
//                                 type: "datetime",
//                                 columns: {
//                                   from: response?.data?.result?.start_date
//                                     ? response?.data?.result?.start_date
//                                     : null,
//                                   to: response?.data?.result?.end_date
//                                     ? response?.data?.result?.end_date
//                                     : null,
//                                 },
//                               },
//                             ]
//                           : [],
//                         is_locked: response?.data?.result?.is_locked
//                           ? response?.data?.result?.is_locked
//                           : false,
//                       };
//                       let widgetObj = {
//                         brand_groups: el?.brand_groups,
//                         singleBrands: paneobject?.singleBrands,
//                         filters: el?.filters ? el?.filters : [],
//                         duration: {
//                           from: el?.start_date ? el?.start_date : null,
//                           to: el?.end_date ? el?.end_date : null,
//                         },
//                         is_locked: el?.is_locked ? el?.is_locked : false,
//                         type: el?.type ? el?.type : false,
//                       };

//                       let filter = getAllFilters(
//                         paneobject?.panes,
//                         index,
//                         sectionIndex,
//                         i,
//                         paneobject?.brands,
//                         el?.brand_ids, //logical brand change
//                         widgetObj,
//                         sectionObj
//                       );
//                       let indexes = {
//                         pane_index: index,
//                         section_index: sectionIndex,
//                         panes: paneobject?.panes,
//                         widget_index: i,
//                         widget_id: el?.widget_id,
//                         graph_type: el?.graph_type,
//                         //templateFilter: widget ? true : false,
//                         //section: Section,
//                       };
//                       let obj = {};
//                       obj.section_index = sectionIndex;
//                       obj.widget_index = i; // widget_index
//                       obj.data = el; // widget_data
//                       obj.panes = paneobject?.panes;
//                       obj.paneIndex = index;
//                       obj.duration = duration;
//                       obj.global_brands = global_brands;
//                       obj.filter = filter;
//                       //obj.widget = widget;
//                       //obj.temporary_words = temporary_words;
//                       obj.brandlogicalgroup = paneobject?.brands;
//                       obj.brands = paneobject?.singleBrands;
//                       obj.graphConditionConfig =
//                         paneobject?.graphConditionConfig;
//                       obj.authParams = authParams;
//                       obj.widgetObj = widgetObj;
//                       obj.sectionObj = sectionObj;
//                       let widgetGraphObject = getWidgetGraphObject(obj);

//                       // Commented Due to lazy loading
//                       // if (
//                       //   widgetGraphObject?.x_axis ||
//                       //   widgetGraphObject?.y_series ||
//                       //   widgetGraphObject?.chart
//                       // ) {
//                       //   if (
//                       //     widgetGraphObject?.data_source === "page" ||
//                       //     widgetGraphObject?.data_source === "ticket" ||
//                       //     widgetGraphObject?.data_source === "campaign" ||
//                       //     widgetGraphObject?.data_source === "feedback"
//                       //   ) {
//                       //     dispatch(
//                       //       setPageChart(authParams, widgetGraphObject, indexes)
//                       //     );
//                       //   } else {
//                       //     dispatch(
//                       //       setWidgetMakerGraphData(
//                       //         authParams,
//                       //         widgetGraphObject,
//                       //         indexes
//                       //       )
//                       //     );
//                       //   }
//                       // } else {
//                       //   if (authParams) {
//                       //     widgetGraphObject &&
//                       //     widgetGraphObject?.graph_type === "aggregate"
//                       //       ? dispatch(
//                       //           setAggregateData(
//                       //             widgetGraphObject,
//                       //             indexes //widget data
//                       //           )
//                       //         )
//                       //       : dispatch(
//                       //           setGraphData(
//                       //             widgetGraphObject,
//                       //             indexes //widget data
//                       //           )
//                       //         );
//                       //   }
//                       // }

//                       // let graphObject;
//                       // // initially handle date part
//                       // if (
//                       //   el?.data_source === "page" ||
//                       //   el?.data_source === "ticket"
//                       // ) {
//                       //   graphObject = {
//                       //     start_date: el?.is_locked
//                       //       ? el?.start_date
//                       //         ? el?.start_date
//                       //         : duration?.from
//                       //         ? duration?.from
//                       //         : defaultDuration?.from
//                       //       : Section_is_locked
//                       //       ? response?.data?.result?.start_date
//                       //         ? response?.data?.result?.start_date
//                       //         : duration?.from
//                       //         ? duration?.from
//                       //         : defaultDuration?.from
//                       //       : duration?.from
//                       //       ? duration?.from
//                       //       : defaultDuration?.from,
//                       //     end_date: el?.is_locked
//                       //       ? el?.end_date
//                       //         ? el?.end_date
//                       //         : duration?.to
//                       //         ? duration?.to
//                       //         : defaultDuration?.to
//                       //       : Section_is_locked
//                       //       ? response?.data?.result?.end_date
//                       //         ? response?.data?.result?.end_date
//                       //         : duration?.to
//                       //         ? duration?.to
//                       //         : defaultDuration?.to
//                       //       : duration?.to
//                       //       ? duration?.to
//                       //       : defaultDuration?.to,
//                       //     brands: widgets_is_locked
//                       //       ? el?.brand_ids || el?.brand_groups
//                       //         ? widget_brands?.columns
//                       //         : global_brands
//                       //         ? global_brands
//                       //         : paneobject?.brands
//                       //       : Section_is_locked
//                       //       ? response?.data?.result?.brand_ids ||
//                       //         response?.data?.result?.brand_groups
//                       //         ? section_brands?.columns
//                       //         : global_brands
//                       //         ? global_brands
//                       //         : paneobject?.brands
//                       //       : global_brands
//                       //       ? global_brands
//                       //       : paneobject?.brands,

//                       //     order_by: el?.order_by,
//                       //     filters: filter ? filter : null,
//                       //     x_axis: el?.x_axis,
//                       //     // Break down data
//                       //     y_axes: el?.y_axes,
//                       //     // y axis data
//                       //     y_series: el?.y_series,
//                       //     widget_name: el?.widget_name,
//                       //     chart: el?.chart,
//                       //     comp_brand_list: el?.comp_brand_list,
//                       //     data_source: el?.data_source,
//                       //     widget_id: el?.widget_id,
//                       //     engine: el?.engine,
//                       //     ticket: el?.data_source === "ticket" ? true : false,
//                       //     exclude_words:
//                       //       el?.temp_exclude_words && el?.exclude_words
//                       //         ? [
//                       //             ...el?.temp_exclude_words,
//                       //             ...el?.exclude_words,
//                       //           ]
//                       //         : el?.exclude_words
//                       //         ? [...el?.exclude_words]
//                       //         : el?.temp_exclude_words && [
//                       //             ...el?.temp_exclude_words,
//                       //           ],
//                       //   };
//                       //   let global_date = {
//                       //     from: graphObject?.start_date,
//                       //     to: graphObject?.end_date,
//                       //   };
//                       //   let filter_date = [];
//                       //   graphObject?.filters?.filter((d) => {
//                       //     if (d.attribute === "CreatedDate") {
//                       //       filter_date = [...filter_date, d?.columns];
//                       //     }
//                       //   });
//                       //   let combinedDate =
//                       //     Section_is_locked || widgets_is_locked
//                       //       ? getCombinedDate(global_date)
//                       //       : getCombinedDate(global_date, filter_date);
//                       //   let getInterval = getTimeIntervalDate(
//                       //     graphObject?.end_date,
//                       //     graphObject?.start_date
//                       //   );
//                       //   if (
//                       //     paneobject?.graphConditionConfig?.includes(
//                       //       graphObject?.x_axis?.attribute
//                       //     ) &&
//                       //     (graphObject?.chart?.chart_type === "combination" ||
//                       //       graphObject?.chart?.chart_type === "bar" ||
//                       //       graphObject?.chart?.chart_type ===
//                       //         "horizontal-bar" ||
//                       //       graphObject?.chart?.chart_type === "area" ||
//                       //       graphObject?.chart?.chart_type === "line") &&
//                       //     graphObject?.x_axis?.date_part === null
//                       //   ) {
//                       //     graphObject.x_axis.date_aggregation =
//                       //       getInterval.defaultVal;
//                       //   }

//                       //   graphObject.isBrandModified =
//                       //     (widgets_is_locked || Section_is_locked) &&
//                       //     (response?.data?.result?.brand_ids ||
//                       //       response?.data?.result?.brand_groups ||
//                       //       el?.brand_ids ||
//                       //       el?.brand_groups)
//                       //       ? true
//                       //       : global_brands
//                       //       ? true
//                       //       : false;
//                       // } else if (el?.x_axis || el?.y_series || el?.chart) {
//                       //   graphObject = {
//                       //     start_date: el?.is_locked
//                       //       ? el?.start_date
//                       //         ? el?.start_date
//                       //         : duration?.from
//                       //         ? duration?.from
//                       //         : defaultDuration?.from
//                       //       : Section_is_locked
//                       //       ? response?.data?.result?.start_date
//                       //         ? response?.data?.result?.start_date
//                       //         : duration?.from
//                       //         ? duration?.from
//                       //         : defaultDuration?.from
//                       //       : duration?.from
//                       //       ? duration?.from
//                       //       : defaultDuration?.from,
//                       //     end_date: el?.is_locked
//                       //       ? el?.end_date
//                       //         ? el?.end_date
//                       //         : duration?.to
//                       //         ? duration?.to
//                       //         : defaultDuration?.to
//                       //       : Section_is_locked
//                       //       ? response?.data?.result?.end_date
//                       //         ? response?.data?.result?.end_date
//                       //         : duration?.to
//                       //         ? duration?.to
//                       //         : defaultDuration?.to
//                       //       : duration?.to
//                       //       ? duration?.to
//                       //       : defaultDuration?.to,
//                       //     brands: widgets_is_locked
//                       //       ? el?.brand_ids || el?.brand_groups
//                       //         ? widget_brands?.columns
//                       //         : el?.duplicate_for_brands
//                       //         ? el?.com_brand_ids
//                       //         : global_brands
//                       //         ? global_brands
//                       //         : paneobject?.brands
//                       //       : Section_is_locked
//                       //       ? response?.data?.result?.brand_ids ||
//                       //         response?.data?.result?.brand_groups
//                       //         ? section_brands?.columns
//                       //         : el?.duplicate_for_brands
//                       //         ? el?.com_brand_ids
//                       //         : global_brands
//                       //         ? global_brands
//                       //         : paneobject?.brands
//                       //       : el?.duplicate_for_brands
//                       //       ? el?.com_brand_ids
//                       //       : global_brands
//                       //       ? global_brands
//                       //       : paneobject?.brands,

//                       //     order_by: el?.order_by,
//                       //     filters: filter ? filter : null,
//                       //     x_axis: el?.x_axis,
//                       //     // Break down data
//                       //     y_axes: el?.y_axes,
//                       //     // y axis data
//                       //     y_series: el?.y_series,
//                       //     widget_name: el?.widget_name,
//                       //     chart: el?.chart,
//                       //     comp_brand_list: el?.duplicate_for_brands
//                       //       ? null
//                       //       : el?.comp_brand_list,
//                       //     exclude_words:
//                       //       el?.temp_exclude_words && el?.exclude_words
//                       //         ? [
//                       //             ...el?.temp_exclude_words,
//                       //             ...el?.exclude_words,
//                       //           ]
//                       //         : el?.exclude_words
//                       //         ? [...el?.exclude_words]
//                       //         : el?.temp_exclude_words && [
//                       //             ...el?.temp_exclude_words,
//                       //           ],
//                       //   };

//                       //   let global_date = {
//                       //     from: graphObject?.start_date,
//                       //     to: graphObject?.end_date,
//                       //   };
//                       //   let filter_date = [];
//                       //   graphObject?.filters?.filter((d) => {
//                       //     if (d.attribute === "CreatedDate") {
//                       //       filter_date = [...filter_date, d?.columns];
//                       //     }
//                       //   });
//                       //   let combinedDate =
//                       //     Section_is_locked || widgets_is_locked
//                       //       ? getCombinedDate(global_date)
//                       //       : getCombinedDate(global_date, filter_date);
//                       //   let getInterval = getTimeIntervalDate(
//                       //     graphObject?.end_date,
//                       //     graphObject?.start_date
//                       //   );
//                       //   if (
//                       //     paneobject?.graphConditionConfig?.includes(
//                       //       graphObject?.x_axis?.attribute
//                       //     ) &&
//                       //     (graphObject?.chart?.chart_type === "combination" ||
//                       //       graphObject?.chart?.chart_type === "bar" ||
//                       //       graphObject?.chart?.chart_type ===
//                       //         "horizontal-bar" ||
//                       //       graphObject?.chart?.chart_type === "area" ||
//                       //       graphObject?.chart?.chart_type === "line") &&
//                       //     graphObject?.x_axis?.date_part === null
//                       //   ) {
//                       //     graphObject.x_axis.date_aggregation =
//                       //       getInterval.defaultVal;
//                       //   }

//                       //   graphObject.isBrandModified =
//                       //     (widgets_is_locked &&
//                       //       el?.brand_ids &&
//                       //       el?.brand_groups) ||
//                       //     (Section_is_locked &&
//                       //       response?.data?.result?.brand_ids &&
//                       //       response?.data?.result?.brand_groups)
//                       //       ? true
//                       //       : global_brands
//                       //       ? true
//                       //       : el?.duplicate_for_brands
//                       //       ? true
//                       //       : false;
//                       // } else {
//                       //   graphObject = {
//                       //     authParams: authParams,
//                       //     firstAttr: el?.primary,
//                       //     secondAttr: el?.secondary,
//                       //     filters: filter ? filter : null,
//                       //     splitObj: el?.splits,
//                       //     brands: widgets_is_locked
//                       //       ? el?.brand_ids || el?.brand_groups
//                       //         ? widget_brands?.columns
//                       //         : global_brands
//                       //         ? global_brands
//                       //         : paneobject?.brands
//                       //       : Section_is_locked
//                       //       ? response?.data?.result?.brand_ids ||
//                       //         response?.data?.result?.brand_groups
//                       //         ? section_brands?.columns
//                       //         : global_brands
//                       //         ? global_brands
//                       //         : paneobject?.brands
//                       //       : global_brands
//                       //       ? global_brands
//                       //       : paneobject?.brands,

//                       //     base: el?.base,
//                       //     start_date: el?.is_locked
//                       //       ? el?.start_date
//                       //         ? el?.start_date
//                       //         : duration?.from
//                       //         ? duration?.from
//                       //         : defaultDuration?.from
//                       //       : Section_is_locked
//                       //       ? response?.data?.result?.start_date
//                       //         ? response?.data?.result?.start_date
//                       //         : duration?.from
//                       //         ? duration?.from
//                       //         : defaultDuration?.from
//                       //       : duration?.from
//                       //       ? duration?.from
//                       //       : defaultDuration?.from,
//                       //     end_date: el?.is_locked
//                       //       ? el?.end_date
//                       //         ? el?.end_date
//                       //         : duration?.to
//                       //         ? duration?.to
//                       //         : defaultDuration?.to
//                       //       : Section_is_locked
//                       //       ? response?.data?.result?.end_date
//                       //         ? response?.data?.result?.end_date
//                       //         : duration?.to
//                       //         ? duration?.to
//                       //         : defaultDuration?.to
//                       //       : duration?.to
//                       //       ? duration?.to
//                       //       : defaultDuration?.to,
//                       //     widget_id: el?.widget_id,
//                       //     exclude_words:
//                       //       el?.temp_exclude_words && el?.exclude_words
//                       //         ? [
//                       //             ...el?.temp_exclude_words,
//                       //             ...el?.exclude_words,
//                       //           ]
//                       //         : el?.exclude_words
//                       //         ? [...el?.exclude_words]
//                       //         : el?.temp_exclude_words && [
//                       //             ...el?.temp_exclude_words,
//                       //           ],
//                       //     engine: el?.engine,
//                       //     percent: el?.percent,
//                       //     ticket: el?.data_source === "ticket" ? true : false,
//                       //   };
//                       //   let global_date = {
//                       //     from: graphObject?.start_date,
//                       //     to: graphObject?.end_date,
//                       //   };
//                       //   let filter_date = [];
//                       //   graphObject?.filters?.filter((d) => {
//                       //     if (d.attribute === "CreatedDate") {
//                       //       filter_date = [...filter_date, d?.columns];
//                       //     }
//                       //   });
//                       //   let combinedDate =
//                       //     Section_is_locked || widgets_is_locked
//                       //       ? getCombinedDate(global_date)
//                       //       : getCombinedDate(global_date, filter_date);
//                       //   let getInterval = getTimeIntervalDate(
//                       //     graphObject?.end_date,
//                       //     graphObject?.start_date
//                       //   );
//                       //   if (
//                       //     paneobject?.graphConditionConfig?.includes(
//                       //       graphObject?.x_axis?.attribute
//                       //     ) &&
//                       //     (graphObject?.chart?.chart_type === "combination" ||
//                       //       graphObject?.chart?.chart_type === "bar" ||
//                       //       graphObject?.chart?.chart_type ===
//                       //         "horizontal-bar" ||
//                       //       graphObject?.chart?.chart_type === "area" ||
//                       //       graphObject?.chart?.chart_type === "line") &&
//                       //     graphObject?.x_axis?.date_part === null
//                       //   ) {
//                       //     graphObject.x_axis.date_aggregation =
//                       //       getInterval.defaultVal;
//                       //   }
//                       //   graphObject.isBrandModified =
//                       //     (widgets_is_locked || Section_is_locked) &&
//                       //     (response?.data?.result?.brand_ids ||
//                       //       response?.data?.result?.brand_groups ||
//                       //       el?.brand_ids ||
//                       //       el?.brand_groups)
//                       //       ? true
//                       //       : global_brands
//                       //       ? true
//                       //       : false;
//                       // }

//                       // let indexes1 = {
//                       //   pane_index: index,
//                       //   section_index: sectionIndex,
//                       //   panes: paneobject?.panes,
//                       //   widget_index: i,
//                       //   widget_id: el?.widget_id,
//                       // };

//                       // let graphObject1 = {
//                       //   authParams: authParams,

//                       //   filterObj: filter ? filter : null,

//                       //   brands: paneobject?.brands,

//                       //   duration: defaultDuration,
//                       //   widget_id: el?.original_widget_id,
//                       // };
//                       // if (authParams?.category_id && graphObject?.brands) {
//                       //   el?.graph_type === "aggregate"
//                       //     ? dispatch(
//                       //         setAggregateData(
//                       //           graphObject,
//                       //           indexes //widget data
//                       //         )
//                       //       )
//                       //     : el?.primary
//                       //     ? dispatch(
//                       //         setGraphData(
//                       //           graphObject,
//                       //           indexes //widget data
//                       //         )
//                       //       )
//                       //     : el?.data_source === "page" ||
//                       //       el?.data_source === "ticket"
//                       //     ? dispatch(
//                       //         setPageChart(
//                       //           authParams,
//                       //           graphObject,
//                       //           indexes1,
//                       //           updateFilter
//                       //         )
//                       //       )
//                       //     : (el?.x_axis || el?.y_series || el?.chart) &&
//                       //       dispatch(
//                       //         setWidgetMakerGraphData(
//                       //           authParams,
//                       //           graphObject,
//                       //           indexes1,
//                       //           updateFilter
//                       //         )
//                       //       );
//                       //   //   dispatch(setConfiguration(graphObject1));
//                       //   //   dispatch(
//                       //   // 		setPreWidgetsData(
//                       //   // 			graphObject1,
//                       //   // 			indexes1,
//                       //   // 			null,
//                       //   // 			template_id
//                       //   // 		)
//                       //   //   );
//                       // }
//                     }
//                   });
//               } else if (
//                 //to update widgets in panes for duplicate comp brand type of widgets
//                 (sectionIndex > 0 && !response?.data?.result?.predefined) ||
//                 (paneobject?.panes[index].template_type !== "ticket" &&
//                   response?.data?.result?.predefined &&
//                   sectionIndex > 0)
//               ) {
//                 //check if duplicate comp brand widget exist
//                 const competitorBrandExists =
//                   (onEditMode &&
//                     paneobject?.templateDetails?.templateBrands?.columns?.[0]
//                       ?.competitor) ||
//                   paneobject?.panes?.[index]?.brands?.columns?.[0]
//                     ?.competitor ||
//                   paneobject?.panes?.[index]?.brands?.[0]?.competitor ||
//                   comp_brands?.[0]?.competitor;
//                 const competitorBrand =
//                   onEditMode &&
//                   paneobject?.templateDetails?.templateBrands?.columns?.[0]
//                     ?.competitor
//                     ? paneobject?.templateDetails?.templateBrands?.columns?.[0]
//                     : paneobject?.panes?.[index]?.brands?.columns?.[0]
//                         ?.competitor
//                     ? paneobject?.panes?.[index]?.brands?.columns?.[0]
//                     : paneobject?.panes?.[index]?.brands?.[0]?.competitor
//                     ? paneobject?.panes?.[index]?.brands?.[0]
//                     : comp_brands?.[0]?.competitor
//                     ? comp_brands?.[0]
//                     : null;
//                 const isLockedOnBrand =
//                   response?.data?.result?.is_locked &&
//                   (response?.data?.result?.brand_groups?.length > 0 ||
//                     response?.data?.result?.brand_ids?.length > 0);
//                 const comBrandtypeExists =
//                   response?.data?.result?.comp_brand_type === false ||
//                   response?.data?.result?.comp_brand_type === true
//                     ? true
//                     : false;
//                 if (
//                   competitorBrandExists &&
//                   !isLockedOnBrand &&
//                   !comBrandtypeExists
//                 ) {
//                   response?.data?.result?.widgets?.forEach(
//                     (widgetResData, i) => {
//                       if (
//                         widgetResData?.chart &&
//                         widgetResData?.chart &&
//                         (widgetResData?.chart?.["chart_type"] === "wordcloud" ||
//                           widgetResData?.chart?.["chart_type"] === "grid" ||
//                           widgetResData?.chart?.["chart_type"] ===
//                             "author-card" ||
//                           widgetResData?.chart?.["chart_type"] ===
//                             "post-card") &&
//                         widgetResData?.chart?.["chart_settings"]?.[
//                           "duplicate_for_brands"
//                         ]
//                       ) {
//                         let newBrandList = [];
//                         if (competitorBrand?.competitor) {
//                           newBrandList.push({
//                             brand_id: competitorBrand?.name,
//                             brand_name: competitorBrand?.brand_name,
//                             brand_friendly_name:
//                               competitorBrand?.brand_friendly_name,
//                           });
//                           competitorBrand?.competitorList?.forEach((cBrand) => {
//                             newBrandList.push(cBrand);
//                           });
//                         }

//                         let duplicateWidgets = getDuplicateWidgets(
//                           newBrandList,
//                           widgetResData,
//                           paneobject?.singleBrands
//                         );
//                         if (duplicateWidgets) {
//                           multipleWidgetsDataList = [
//                             ...multipleWidgetsDataList,
//                             ...duplicateWidgets,
//                           ];
//                         } else {
//                           multipleWidgetsDataList.push(widgetResData);
//                         }
//                       } else {
//                         multipleWidgetsDataList.push(widgetResData);
//                       }
//                     }
//                   );
//                 }

//                 if (
//                   multipleWidgetsDataList &&
//                   multipleWidgetsDataList?.length === 0
//                 ) {
//                   multipleWidgetsDataList = response?.data?.result?.widgets;
//                 }
//               }

//               let offset = sectionIndex;

//               if (
//                 offset !== null &&
//                 paneobject?.firstSection &&
//                 offset >= 0 &&
//                 paneobject?.AllSection[offset + 1]?.section_id &&
//                 !urlParams?.ppt
//               ) {
//                 dispatch(
//                   setFetchSectionData(
//                     authParams,
//                     paneobject?.AllSection[offset + 1]?.section_id,
//                     paneobject,
//                     template_id,
//                     updateFilter
//                   )
//                 );
//               }

//               let sectionObj = {
//                 panes: paneobject?.panes,
//                 index: index,
//                 section_index: sectionIndex,
//                 duration: {
//                   from: response?.data?.result?.start_date,
//                   to: response?.data?.result?.end_date,
//                 },
//                 widget_index: paneobject?.widget_index,
//                 filters: response?.data?.result?.filters,
//                 is_locked: response?.data?.result?.is_locked,
//                 brand_list: response?.data?.result?.brand_ids,
//                 brand_groups: response?.data?.result?.brand_groups,
//                 singleBrands: paneobject?.singleBrands,
//                 AllSection: paneobject?.AllSection,
//                 profile_filters_list: response?.data?.result
//                   ?.profile_filters_list
//                   ? response?.data?.result?.profile_filters_list
//                   : null,
//               };
//               dispatch(
//                 setWidgets(
//                   multipleWidgetsDataList && multipleWidgetsDataList?.length > 0
//                     ? multipleWidgetsDataList
//                     : response?.data?.result?.widgets,
//                   index,
//                   paneobject?.panes,
//                   sectionIndex,
//                   id, //section id for only widgets
//                   sectionObj,
//                   paneobject?.brands
//                 )
//               );
//             }
//             dispatch({ type: "SET_FETCH_SECTION_DATA", payload: response });
//           }

//           if (response?.data?.status === "error") {
//             dispatch(setSectionLoader({ value: false, id: id }));
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
//           dispatch(setSectionLoader({ value: false, id: id }));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch({ type: "SET_FETCH_SECTION_DATA", payload: null });
//     }
//   };
// };

// export const setUserBrandLoader = (value) => {
//   return { type: "SET_USER_BRAND_LOADER", payload: value };
// };

// //api call for brand list
// export const setBrandValue = (
//   authParams,
//   template_id,
//   category_id,
//   count,
//   modalCheckboxValue = false
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setUserBrandLoader(true));
//     (authParams?.v3 === "true" || authParams?.template_id || template_id) &&
//       !modalCheckboxValue &&
//       dispatch(setGlobalLoader(true));
//     let body = {
//       ptoken: authParams?.ptoken,
//       user_id: authParams?.userid,
//     };
//     let url = `${Config.config1.api_link}/user/brands`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         dispatch(setUserBrandLoader(false));
//         dispatch({
//           type: "SET_WORKSPACE_BRAND_VALUE",
//           payload: response,
//         });
//         dispatch({
//           type: "SET_WORKSPACE_PRIVILEGES",
//           payload: response?.data?.result?.privileges,
//         });
//         if (response?.data?.status === "successful") {
//           (authParams?.v3 === "true" ||
//             authParams?.template_id ||
//             template_id) &&
//             dispatch(setGlobalLoader(false));

//           dispatch(setWidgetMakerEnabled(true));
//           if (!modalCheckboxValue) {
//             dispatch(getBrandHiddenWords(authParams));
//           }

//           if (category_id) {
//             if (
//               category_id !== response?.data?.result?.category?.id &&
//               response?.data?.result?.category?.id
//             ) {
//               dispatch(setGlobalDuration(null));
//               dispatch(setGlobalBrands(null));
//               dispatch(setGlobalSingleBrands(null));
//               dispatch(onDashboardReset());
//               dispatch(
//                 setGlobalCategory_id(response?.data?.result?.category?.id)
//               );
//             }
//           } else if (response?.data?.result?.category?.id) {
//             dispatch(
//               setGlobalCategory_id(response?.data?.result?.category?.id)
//             );
//           }
//           if (!modalCheckboxValue) {
//             dispatch(
//               setBrandLogicalGroupValue(
//                 authParams,
//                 response?.data?.result?.category?.id
//               )
//             );
//             dispatch(
//               setCompetitorBrands(
//                 authParams,
//                 response?.data?.result?.category?.id
//               )
//             );
//           }
//           dispatch(setUserName(response?.data?.result?.username));
//           setCookie("category_id", response?.data?.result?.category?.id);
//           setCookie("category_name", response?.data?.result?.category?.name);

//           !authParams?.ppt &&
//             !authParams?.category_id &&
//             response?.data?.result?.category?.id &&
//             dispatch(
//               setAuthParams(authParams, {
//                 category_id: response?.data?.result?.category?.id,
//                 category_name: response?.data?.result?.category?.name,
//               })
//             );
//           !authParams?.ppt &&
//             !authParams?.category_id &&
//             response?.data?.result?.category?.id &&
//             dispatch(
//               setPersistAuthParams(authParams, {
//                 category_id: response?.data?.result?.category?.id,
//                 category_name: response?.data?.result?.category?.name,
//               })
//             );

//           // !authParams?.category_id && window.location.reload();
//         }
//         if (response?.data?.status === "error") {
//           errorCode?.map((el, i) => {
//             return el.key === response?.data?.error_code
//               ? (errorMessage = el.value)
//               : null;
//           });

//           callNotification(errorMessage, "error");
//           if (response?.data?.error_code === 9) {
//             !count &&
//               dispatch(setBrandValue(authParams, template_id, category_id, 1));
//             if (count) {
//               sessionExpired(true);
//             }
//           }
//         }
//       })
//       .catch((error) => {
//         dispatch(setUserBrandLoader(false));
//         dispatch(setGlobalLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// export const setWidgetLoader = (value) => {
//   return { type: "SET_WIDGET_LOADER", payload: value };
// };

// //api call to update filters in section
// export const setUpdateFiltersInSection = (
//   authParams,
//   section_id,
//   filters,
//   paneObj,
//   is_locked,
//   clear,
//   clearBrandAndDuration
// ) => {
//   let errorMessage;
//   let finalfilters = [...filters];
//   if (finalfilters && finalfilters[0]?.attribute === "createddate") {
//     finalfilters.shift();
//   }
//   let single_brands = [];
//   let brandsGroupName = [];
//   if (!paneObj?.isBrandModified) {
//     brandsGroupName = paneObj?.brandFilter?.length > 0 &&
//       paneObj?.brandFilter[0]?.columns[0]?.brand_list && [
//         {
//           brand_group_name:
//             paneObj?.brandFilter[0]?.columns[0]?.brand_group_name,
//         },
//       ];
//   } else {
//     paneObj?.brandFilter?.length > 0 &&
//       paneObj?.brandFilter[0]?.columns?.forEach((el) => {
//         if (el?.group) {
//           brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//         }
//       });
//   }

//   paneObj?.brandFilter?.length > 0 &&
//     paneObj?.brandFilter[0]?.columns?.forEach((el) => {
//       if (!el?.group) {
//         single_brands.push({
//           brand_id: el?.brand_id ? el?.brand_id : el?.name,
//           brand_name: el?.brand_name ? el?.brand_name : el?.brand_friendly_name,
//         });
//       }
//     });

//   return async (dispatch) => {
//     //to clear blocks state of lazy loading
//     /**
//      * clear is true
//      * if we pass null in start_date,end_date,brand_list and brand_group
//      * At that time from backend values are not updated it's return last updated value
//      * if you want to clear so pass start_date="",end_date="",brand_list=[] and brand_group=[]
//      */
//     let body = {
//       ptoken: authParams?.ptoken,
//       start_date:
//         filters && filters[0]?.attribute === "createddate"
//           ? filters[0]?.columns?.from
//           : clear || clearBrandAndDuration?.sectionLevelDuration
//           ? ""
//           : null,
//       end_date:
//         filters && filters[0]?.attribute === "createddate"
//           ? filters[0]?.columns?.to
//           : clear || clearBrandAndDuration?.sectionLevelDuration
//           ? ""
//           : null,
//       section_id: section_id,
//       filters: finalfilters?.length > 0 ? finalfilters : [],
//       brand_groups:
//         clear || clearBrandAndDuration?.sectionLevelBrand
//           ? []
//           : brandsGroupName
//           ? brandsGroupName
//           : null,
//       brand_list:
//         clear || clearBrandAndDuration?.sectionLevelBrand
//           ? []
//           : single_brands && single_brands[0]?.brand_id
//           ? single_brands
//           : null,
//       is_locked: clear ? false : is_locked,
//       type: "widget-maker",
//       template_id: paneObj?.template_id,
//       widget_profile_reset: paneObj?.widget_profile_reset,
//     };
//     dispatch(setSectionLoader({ value: true, id: section_id }));
//     let url = `${Config.config1.api_link}/template/section/update-filters`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_UPDATE_FILTERS_IN_SECTION",
//           payload: response,
//         });

//         dispatch(setSectionLoader({ value: false, id: section_id }));
//         // to reset clearBrandAndDuration state
//         dispatch(
//           setClearBrandAndDuration({
//             sectionLevelBrand: false,
//             widgetLevelBrand: false,
//             sectionLevelDuration: false,
//             widgetLevelDuration: false,
//           })
//         );
//         if (response?.data?.status === "successful") {
//           dispatch(
//             setFetchSectionData(
//               authParams,
//               section_id,
//               paneObj,
//               paneObj?.template_id,
//               paneObj?.quickFilter
//             )
//           );
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
//         // to reset clearBrandAndDuration state
//         dispatch(
//           setClearBrandAndDuration({
//             sectionLevelBrand: false,
//             widgetLevelBrand: false,
//             sectionLevelDuration: false,
//             widgetLevelDuration: false,
//           })
//         );
//         dispatch(setSectionLoader({ value: false, id: null }));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// //api call to update filters in  widgets
// export const setUpdateFiltersInWidget = (
//   authParams,
//   widget_id,
//   filters,
//   paneObj,
//   is_locked,
//   clear,
//   clearBrandAndDuration
// ) => {
//   let errorMessage;
//   let finalfilters = [...filters];
//   if (finalfilters && finalfilters[0]?.attribute === "createddate") {
//     finalfilters.shift();
//   }
//   let single_brands = [];
//   let brandsGroupName = [];
//   if (!paneObj?.isBrandModified) {
//     brandsGroupName = paneObj?.brandFilter?.length > 0 &&
//       paneObj?.brandFilter[0]?.columns[0]?.brand_list && [
//         {
//           brand_group_name:
//             paneObj?.brandFilter[0]?.columns[0]?.brand_group_name,
//         },
//       ];
//   } else {
//     paneObj?.brandFilter?.length > 0 &&
//       paneObj?.brandFilter[0]?.columns?.forEach((el) => {
//         if (el?.group) {
//           brandsGroupName.push({ brand_group_name: el?.brand_group_name });
//         }
//       });
//   }

//   paneObj?.brandFilter?.length > 0 &&
//     paneObj?.brandFilter[0]?.columns?.forEach((el) => {
//       if (!el?.group) {
//         single_brands.push({
//           brand_id: el?.brand_id ? el?.brand_id : el?.name,
//           brand_name: el?.brand_name ? el?.brand_name : el?.brand_friendly_name,
//         });
//       }
//     });

//   return async (dispatch) => {
//     let body = {
//       ptoken: authParams?.ptoken,
//       start_date:
//         clear || clearBrandAndDuration?.widgetLevelDuration
//           ? ""
//           : filters && filters[0]?.attribute === "createddate"
//           ? filters[0]?.columns?.from
//           : null,
//       end_date:
//         clear || clearBrandAndDuration?.widgetLevelDuration
//           ? ""
//           : filters && filters[0]?.attribute === "createddate"
//           ? filters[0]?.columns?.to
//           : null,
//       widget_id: widget_id,
//       widget_uuid: paneObj?.widget_uuid,
//       section_id: paneObj?.section_id,
//       filters:
//         finalfilters?.length > 0
//           ? finalfilters
//           : finalfilters?.length === 0
//           ? []
//           : null,
//       brand_groups:
//         clear || clearBrandAndDuration?.widgetLevelBrand
//           ? []
//           : brandsGroupName
//           ? brandsGroupName
//           : null,
//       brand_list:
//         clear || clearBrandAndDuration?.widgetLevelBrand
//           ? []
//           : single_brands && single_brands[0]?.brand_id
//           ? single_brands
//           : null,
//       is_locked: clear ? false : is_locked,
//       type:
//         paneObj?.widget_predefined === "predefined"
//           ? "predefined"
//           : paneObj?.widgetMaker,
//       template_id: paneObj?.template_id,
//       profile_filters: paneObj?.profile_filters,
//     };

//     dispatch(setWidgetUpdateFilterLoader(true));
//     let url = `${Config.config1.api_link}/template/section/widget/update-filters`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_UPDATE_FILTERS_IN_WIDGET",
//           payload: response,
//         });
//         // to reset clearBrandAndDuration state
//         dispatch(
//           setClearBrandAndDuration({
//             sectionLevelBrand: false,
//             widgetLevelBrand: false,
//             sectionLevelDuration: false,
//             widgetLevelDuration: false,
//           })
//         );

//         if (response?.data?.status === "successful") {
//           dispatch(setWidgetFetch(authParams, paneObj));

//           // dispatch(
//           //   setFetchSectionData(
//           //     authParams,
//           //     paneObj?.section_id,
//           //     paneObj,
//           //     paneObj?.template_id,
//           //     paneObj?.quickFilter
//           //   )
//           // );
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
//         // to reset clearBrandAndDuration state
//         dispatch(
//           setClearBrandAndDuration({
//             sectionLevelBrand: false,
//             widgetLevelBrand: false,
//             sectionLevelDuration: false,
//             widgetLevelDuration: false,
//           })
//         );

//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// //set fetch sharable user list
// export const setSharableUserData = (value) => {
//   return { type: "SET_SHAREABLE_USER_DATA", payload: value };
// };
// export const getShareableUserData = (authParams, template_id) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let body = {
//       ptoken: authParams?.ptoken,
//       template_id: template_id,
//     };
//     let url = `${Config.config1.api_link}/template/access/team-list`;

//     await axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(setSharableUserData(response?.data?.result?.users));
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

// // get default user list
// export const setDefaultSharableUserData = (value) => {
//   return { type: "SET_DEFAULT_SHAREABLE_USER_DATA", payload: value };
// };
// export const setSharedWithTeamData = (value) => {
//   return { type: "SET_SHARED_WITH_TEAM_DATA", payload: value };
// };
// export const getDefaultShareableUserData = (authParams, template_id) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let body = {
//       ptoken: authParams?.ptoken,
//       template_id: template_id,
//     };
//     let url = `${Config.config1.api_link}/template/access/list`;

//     await axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(setDefaultSharableUserData(response?.data?.result?.users));
//           dispatch(setSharedWithTeamData(response?.data?.result));
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

// //set set share user data
// export const setShareableModifyUserData = (
//   basicObj,
//   newData,
//   method,
//   paneObject
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let body = {
//       ptoken: basicObj?.authParams?.ptoken,
//       template_id: newData.template_id,
//       users: newData.data,
//     };
//     let url = `${Config.config1.api_link}/template/access/modify`;
//     dispatch(setPasswordLoader(true));
//     await axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(
//             getDefaultShareableUserData(
//               basicObj?.authParams,
//               newData.template_id
//             )
//           );
//           dispatch(setTemplateDataList(basicObj, paneObject));
//           dispatch(setPasswordLoader(false));
//           callNotification(`User ${method} successfully`, "success");
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

// //api call to pin dashboard
// export const setPinnedDashboard = (
//   authParams,
//   panes,
//   activeKey,
//   saveDashboardTemplateId
// ) => {
//   let errorMessage;
//   let index = getPaneIndex(panes, activeKey);

//   return async (dispatch) => {
//     let body = {
//       ptoken: authParams?.ptoken,
//       template_id: saveDashboardTemplateId
//         ? saveDashboardTemplateId
//         : panes?.[index]?.template_id,
//     };
//     let url = `${Config.config1.api_link}/template/pin`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "SET_PINNED_DASHBOARD",
//           payload: response,
//         });
//         if (response?.data?.status === "successful") {
//           if (
//             response?.data?.result?.message === "Pin dashboard Limit Exceeded"
//           ) {
//             callNotification("Pin dashboard Limit Exceeded", "error");
//           } else {
//             !saveDashboardTemplateId &&
//               dispatch(setIsPinned(true, panes, index));
//             callNotification("Dashboard pinned successfully", "success");
//           }
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

// //api call to pin dashboard
// export const setUnPinDashboard = (
//   authParams,
//   panes,
//   activeKey,
//   key,
//   removeKey,
//   paneObj
// ) => {
//   let errorMessage;
//   let index = getPaneIndex(panes, activeKey);

//   return async (dispatch) => {
//     let body = {
//       ptoken: authParams?.ptoken,
//       template_id: panes[index]?.template_id,
//     };
//     let url = `${Config.config1.api_link}/template/unpin`;
//     if (body?.template_id) {
//       axios
//         .post(url, body)
//         .then((response) => {
//           dispatch({
//             type: "SET_UNPIN_DASHBOARD",
//             payload: response,
//           });
//           if (response?.data?.status === "successful") {
//             callNotification("Dashboard unpinned successfully", "success");
//             !removeKey && dispatch(setIsPinned(false, panes, index));

//             if (window?.location?.pathname === "/pin-dashboard") {
//               dispatch(
//                 remove(activeKey, panes, activeKey, false, authParams, paneObj)
//               );
//             }

//             if (key) {
//               dispatch(setPinnedDashboard(authParams, panes, key));
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
//           callNotification(null, "error");
//         });
//     }
//   };
// };

// export const setPin = (value) => {
//   return { type: "SET_PIN", payload: value };
// };

// // check sharale link protected or not
// export const setShareableLinkStatus = (value) => {
//   return { type: "SET_SHAREABLE_LINK_STATUS", payload: value };
// };

// export const setShareableLinkDeepDiveStatus = (value) => {
//   return { type: "SET_SHAREABLE_LINK_DEEP_DIVE_STATUS", payload: value };
// };
// export const checkSharableLink = (share_id) => {
//   let errorMessage;

//   return async (dispatch) => {
//     let body = {
//       share_id: share_id,
//       utcoffset: getUTCOffset(),
//     };

//     let url = `${Config.config1.api_link}/template/share-type`;
//     await axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           let status = response?.data?.result.protected;
//           let deep_dive_status = response?.data?.result?.deep_dive_enabled;
//           dispatch(setShareableLinkStatus(status));
//           dispatch(setShareableLinkDeepDiveStatus(deep_dive_status));
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
//         callNotification(null, "error");
//       });
//   };
// };

// // check edit data
// export const setCheckEdited = (value) => {
//   return { type: "SET_CHECK_EDITED", payload: value };
// };

// export const setTicketOverviewInterval = (value) => {
//   return { type: "SET_TICKET_OVERVIEW_INTERVAL", payload: value };
// };

// export const setTicketOverviewRoleType = (value) => {
//   return { type: "SET_TICKET_OVERVIEW_ROLETYPE", payload: value };
// };

// export const setTicketOverviewWidget1 = (value) => {
//   return { type: "SET_TICKET_OVERVIEW_WIDGET_1", payload: value };
// };

// export const setTicketOverviewWidget2 = (value) => {
//   return { type: "SET_TICKET_OVERVIEW_WIDGET_2", payload: value };
// };

// //api call for Brand Logical Group List
// export const setBrandLogicalGroupValue = (authParams, categoryId) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setUserBrandLoader(true));
//     let body = {
//       ptoken: authParams?.ptoken,
//       user_id: authParams?.userid,
//       category_id: categoryId,
//     };
//     let url = `${Config.config1.api_link}/user/brand-groups`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         dispatch(setUserBrandLoader(false));
//         dispatch({
//           type: "SET_BRAND_LOGICAL_GROUP_VALUE",
//           payload: response,
//         });
//         if (response?.data?.status === "successful") {
//           //dispatch(setUserName(response?.data?.result?.username));
//           // setCookie("category_id", response?.data?.result?.category?.id);
//           // setCookie("category_name", response?.data?.result?.category?.name);
//           // dispatch(
//           // 	setAuthParams(authParams, {
//           // 		category_id: response?.data?.result?.category?.id,
//           // 		category_name: response?.data?.result?.category?.name,
//           // 	})
//           // );
//           // !authParams?.category_id && window.location.reload();
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
//         dispatch(setGlobalLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// export const setSelectedTatWidgetMonth = (value) => {
//   return { type: "SET_SELECTED_TAT_WIDGET_MONTH", payload: value };
// };
// export const setSelectedTatTitleMonth = (value) => {
//   return { type: "SET_SELECTED_TAT_TITLE_MONTH", payload: value };
// };
// export const setTemplateList = (value) => {
//   return { type: "SET_TEMPLATE_DATA", payload: value };
// };
// export const setTemplateListType = (value) => {
//   return { type: "SET_TEMPLATE_LIST_TYPE", payload: value };
// };
// export const getListeningSmaProfiles = (
//   authParams,
//   graphObject,
//   index,
//   paneobject,
//   sectionIndex,
//   widgetsData
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let body = {
//       ptoken: authParams?.ptoken,
//       brand_id: graphObject?.brand_id,
//       channel_group_id: graphObject?.channel_group_id,
//     };
//     let url = `${Config.config1.api_link}/listening/SMA/profiles`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           // dispatch(
//           //   setSocialMediaProfileList(
//           //     response?.data?.result,
//           //     paneobject?.panes,
//           //     paneobject?.index
//           //   )
//           // );
//           // brand_id: 600 brand_name: "ajio"
//           // brand_id: 3732 brand_name: "sandeeptest"

//           let fbObject = {
//             brand_list: [{ brand_id: 3732, brand_name: "sandeeptest" }],
//             author_id: response?.data?.result[0]?.AuthorID,
//             bta_id: response?.data?.result[0]?.BTAID,
//           };
//           dispatch(
//             setConfiguration(
//               index,
//               paneobject,
//               authParams,
//               sectionIndex,
//               widgetsData,
//               "tickets/orm",
//               paneobject?.panes[index].template_id,
//               fbObject
//             )
//           );
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

// // set Data of social media profile
// export const setSocialMediaProfileData = (value) => {
//   return { type: "SET_SOCIAL_MEDIA_PROFILE_DATA", payload: value };
// };

// export const setSocialMediaDropdownOptions = (value) => {
//   return { type: "SET_SOCIAL_MEDIA_DROPDOWN_OPTIONS", payload: value };
// };

// const splitSectionWidgets = (
//   updatedSection,
//   global_brands,
//   singleBrands,
//   forParticularSection
// ) => {
//   let newSection = deepCopy(updatedSection);
//   updatedSection?.map((sec, secIndex) => {
//     let newDataListForSection = [];
//     if (sec?.widgets?.length > 0) {
//       sec?.widgets?.map((el) => {
//         if (
//           !el?.duplicate_for_brands &&
//           el?.chart &&
//           (el?.chart?.["chart_type"] === "wordcloud" ||
//             el?.chart?.["chart_type"] === "grid" ||
//             el?.chart?.["chart_type"] === "post-card" ||
//             el?.chart?.["chart_type"] === "author-card") &&
//           el?.chart?.["chart_settings"]?.["duplicate_for_brands"]
//         ) {
//           let newBrandList = [];
//           let newl = [];
//           if (global_brands) {
//             let selectedBrands = global_brands?.columns?.length
//               ? global_brands?.columns
//               : global_brands;
//             newBrandList.push({
//               brand_id: selectedBrands?.[0]?.name,
//               brand_name: selectedBrands?.[0]?.brand_name,
//               brand_friendly_name: selectedBrands?.[0]?.brand_friendly_name,
//             });
//             newl = selectedBrands?.[0]?.competitorList
//               ? selectedBrands?.[0]?.competitorList
//               : [];
//           }
//           newBrandList = [...newBrandList, ...newl];
//           let objForTemporyWordFunctionality = forParticularSection?.template_id
//             ? forParticularSection
//             : null;
//           let duplicateWidgets = getDuplicateWidgets(
//             newBrandList,
//             el,
//             singleBrands,
//             objForTemporyWordFunctionality
//           );
//           if (duplicateWidgets) {
//             newDataListForSection = [
//               ...newDataListForSection,
//               ...duplicateWidgets,
//             ];
//           } else {
//             newDataListForSection.push(el);
//           }
//         } else {
//           newDataListForSection.push(el);
//         }
//       });
//     }
//     newSection[secIndex].data = newDataListForSection;
//     newSection[secIndex].widgets = newDataListForSection;
//   });
//   return newSection;
// };
// export const setWidgetFetch = (authParams, paneobject, type) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setGraphLoader(true));
//     let body = {
//       ptoken: authParams?.ptoken,
//       user_id: authParams?.userid,
//       section_id: paneobject?.section_id,
//       widget_id: paneobject?.widget_id,
//       widget_uuid: paneobject?.widget_uuid,
//       template_id: paneobject?.template_id,
//     };
//     let url = `${Config.config1.api_link}/template/section/widget/fetch`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           // revert_widget
//           if (paneobject?.revert_widget) {
//             let section_index = paneobject?.section_index;
//             let widget_index = paneobject?.widget_index;
//             let index = paneobject?.index;
//             let panes = paneobject?.panes;

//             let metadata = response?.data?.result;
//             // console.log(
//             //   "revert_widget paneobject",
//             //   paneobject,
//             //   "metadata",
//             //   metadata
//             // );

//             let updatePanes = [...panes];
//             if (section_index >= 0) {
//               updatePanes[index].sections[section_index].widgets[widget_index] =
//                 metadata;
//             } else {
//               updatePanes[index].section[0].widgets[widget_index] = metadata;
//             }
//             // console.log("updatePanes", updatePanes);
//             dispatch({ type: "SET_WIDGET_GRAPH_DATA", panes: updatePanes });
//             dispatch(setGraphLoader(false));
//           } else {
//             let metadata = response?.data?.result;
//             let index = getPaneIndex(paneobject?.panes, paneobject?.activeKey);
//             let sections = paneobject?.panes[index]?.sections;
//             let temp_exclude_words = getTemporaryWords(paneobject);
//             let updateSectionOnbrandLevelHideWOrd = false;

//             metadata.temp_exclude_words = temp_exclude_words;
//             let sectionIndex = sections
//               ? sections?.findIndex(
//                   (el) => el.section_id === paneobject?.section_id
//                 )
//               : null;
//             let duration = paneobject?.global_dashboard_duration
//               ? paneobject?.global_dashboard_duration
//               : paneobject?.panes[index]?.duration
//               ? paneobject?.panes[index]?.duration
//               : paneobject?.templateGlobalDuration
//               ? paneobject?.templateGlobalDuration
//               : null;
//             let comp_brands =
//               paneobject?.panes[index]?.template_type === "competition" &&
//               paneobject?.competitorBrands?.length > 0
//                 ? getDefaultCompBrand(paneobject?.competitorBrands)
//                 : null;

//             let global_brands = paneobject?.global_dashboard_brands?.columns
//               ? comp_brands
//                 ? !paneobject?.global_dashboard_brands?.columns[0]?.competitor
//                   ? comp_brands
//                   : paneobject?.global_dashboard_brands?.columns
//                 : paneobject?.global_dashboard_brands?.columns
//               : paneobject?.panes[index]?.brands
//               ? paneobject?.panes[index]?.brands
//               : comp_brands
//               ? comp_brands
//               : paneobject?.templateGlobalBrands
//               ? paneobject?.templateGlobalBrands
//               : null;
//             let widgetObj = {
//               brand_groups: metadata?.brand_groups,
//               singleBrands: paneobject?.singleBrands,
//               filters: metadata?.filters ? metadata?.filters : [],
//               duration: {
//                 from: metadata?.start_date ? metadata?.start_date : null,
//                 to: metadata?.end_date ? metadata?.end_date : null,
//               },
//               is_locked: metadata?.is_locked ? metadata?.is_locked : false,
//               type: metadata?.type ? metadata?.type : false,
//             };
//             let filter = getAllFilters(
//               paneobject?.panes,
//               index,
//               sectionIndex,
//               undefined,
//               paneobject?.brands,
//               metadata?.brand_ids, //logical brand change
//               widgetObj
//             );
//             let res = null;
//             let newSection = paneobject?.panes[index]?.sections
//               ? paneobject?.panes[index]?.sections
//               : paneobject?.panes[index]?.section;
//             newSection = deepCopy(newSection);
//             let updatedSection = null;
//             let updateWidgets =
//               newSection[sectionIndex ? sectionIndex : 0]?.widgets;
//             let forParticularSection = {
//               section_index: paneobject?.section_index
//                 ? paneobject?.section_index
//                 : 0,
//               section_id: paneobject?.section_id,
//               widget_id: paneobject?.widget_id,
//               widget_index: paneobject?.widget_index,
//               template_id: paneobject?.template_id,
//               temporary_words: paneobject?.temporary_words,
//             };
//             if (
//               comp_brands &&
//               !(
//                 (metadata?.brand_groups || metadata?.brand_ids) &&
//                 metadata?.is_locked
//               ) &&
//               metadata?.chart &&
//               metadata?.chart?.["chart_settings"]["duplicate_for_brands"]
//             ) {
//               res = checkForDuplicateWidgets(newSection, forParticularSection);
//               let filterSectionData;
//               if (res?.parentExists) {
//                 let filterSectionData = getFilterDuplicateWidgets(
//                   newSection,
//                   forParticularSection
//                 );
//                 if (filterSectionData !== null) {
//                   let iOfW = filterSectionData?.[
//                     forParticularSection?.section_index
//                   ]?.data?.length
//                     ? filterSectionData?.[
//                         forParticularSection?.section_index
//                       ]?.data?.findIndex(
//                         (el) =>
//                           el?.widget_id === forParticularSection?.widget_id
//                       )
//                     : filterSectionData?.[
//                         forParticularSection?.section_index
//                       ]?.widgets?.findIndex(
//                         (el) =>
//                           el?.widget_id === forParticularSection?.widget_id
//                       );
//                   if (iOfW !== -1) {
//                     if (
//                       filterSectionData?.[forParticularSection?.section_index]
//                         ?.data?.length
//                     ) {
//                       filterSectionData[
//                         forParticularSection?.section_index
//                       ].data[iOfW] = metadata;
//                     } else {
//                       filterSectionData[
//                         forParticularSection?.section_index
//                       ].widgets[iOfW] = metadata;
//                     }
//                   }
//                   updatedSection = splitSectionWidgets(
//                     filterSectionData,
//                     global_brands,
//                     paneobject?.singleBrands,
//                     forParticularSection
//                   );
//                 }
//               } else if (res?.duplicateExists) {
//                 updatedSection = splitSectionWidgets(
//                   newSection,
//                   global_brands,
//                   paneobject?.singleBrands,
//                   forParticularSection
//                 );
//               }
//             }
//             if (
//               res &&
//               (res?.duplicateExists || res?.parentExists) &&
//               updatedSection
//             ) {
//               if (paneobject?.panes?.[index]?.sections) {
//                 paneobject.panes[index].sections = updatedSection;
//               } else {
//                 paneobject.panes[index].section = updatedSection;
//               }
//             }

//             if (type === "hidewordonbrandlevel") {
//               updateSectionOnbrandLevelHideWOrd = true;
//               let updateSectionWithClearWordcloud = paneobject?.panes[index]
//                 ?.sections
//                 ? paneobject?.panes[index]?.sections
//                 : paneobject?.panes[index]?.section;
//               updatedSection = getWordCloudSectionsWidgets(
//                 updateSectionWithClearWordcloud
//               );
//               if (paneobject?.panes?.[index]?.sections) {
//                 paneobject.panes[index].sections = updatedSection;
//               } else {
//                 paneobject.panes[index].section = updatedSection;
//               }
//             }
//             // let indexes = {
//             //   pane_index: index,
//             //   section_index: sectionIndex >= 0 ? sectionIndex : null,
//             //   panes: paneobject?.panes,
//             //   widget_index: paneobject?.widget_index,
//             //   widget_id: metadata?.widget_id,
//             //   graph_type: metadata?.graph_type,
//             // };

//             // let obj = {};
//             // obj.section_index = sectionIndex;
//             // obj.widget_index = undefined; // widget_index
//             // obj.data = metadata; // widget_data
//             // obj.panes = paneobject?.panes;
//             // obj.paneIndex = index;
//             // obj.duration = duration;
//             // obj.global_brands = global_brands;
//             // obj.filter = filter;
//             // obj.brandlogicalgroup = paneobject?.brands;
//             // obj.brands = paneobject?.singleBrands;
//             // obj.graphConditionConfig = paneobject?.graphConditionConfig;
//             // obj.authParams = authParams;
//             // obj.widgetObj = widgetObj;
//             // obj.type = "view";
//             // let widgetGraphObject = getWidgetGraphObject(obj);

//             // if (
//             //   widgetGraphObject?.x_axis ||
//             //   widgetGraphObject?.y_series ||
//             //   widgetGraphObject?.chart
//             // ) {
//             //   if (
//             //     widgetGraphObject?.data_source === "page" ||
//             //     widgetGraphObject?.data_source === "ticket" ||
//             //     widgetGraphObject?.data_source === "campaign" ||
//             //     widgetGraphObject?.data_source === "feedback"
//             //   ) {
//             //     dispatch(setPageChart(authParams, widgetGraphObject, indexes));
//             //   } else {
//             //     dispatch(
//             //       setWidgetMakerGraphData(authParams, widgetGraphObject, indexes)
//             //     );
//             //   }
//             // } else {
//             //   if (authParams) {
//             //     widgetGraphObject && widgetGraphObject?.graph_type === "aggregate"
//             //       ? dispatch(
//             //           setAggregateData(
//             //             widgetGraphObject,
//             //             indexes //widget data
//             //           )
//             //         )
//             //       : dispatch(
//             //           setGraphData(
//             //             widgetGraphObject,
//             //             indexes //widget data
//             //           )
//             //         );
//             //   }
//             // }

//             let sectionObj = {
//               panes: paneobject?.panes,
//               index: index,
//               section_index: sectionIndex >= 0 ? sectionIndex : null,

//               widget_index: paneobject?.widget_index,

//               singleBrands: paneobject?.singleBrands,
//             };
//             let global_brand_check = global_brands?.columns?.[0]?.competitor
//               ? true
//               : global_brands?.[0]?.competitor
//               ? true
//               : false;
//             dispatch(
//               setWidgetData(
//                 metadata,
//                 index,
//                 paneobject?.panes,
//                 sectionIndex >= 0 ? sectionIndex : null,
//                 paneobject?.section_id, //section id for only widgets
//                 sectionObj,
//                 paneobject?.brands,
//                 (metadata?.chart &&
//                   global_brand_check &&
//                   metadata?.chart?.["chart_settings"][
//                     "duplicate_for_brands"
//                   ]) ||
//                   updateSectionOnbrandLevelHideWOrd
//               )
//             );
//             dispatch(setWidgetUpdateFilterLoader(false));
//             dispatch(setGraphLoader(false));
//           }
//         }
//         if (response?.data?.status === "error") {
//           dispatch(setGraphLoader(false));
//           let index = getPaneIndex(paneobject?.panes, paneobject?.activeKey);
//           let sections = paneobject?.panes[index]?.sections;

//           let sectionIndex = sections
//             ? sections?.findIndex(
//                 (el) => el.section_id === paneobject?.section_id
//               )
//             : null;
//           let sectionObj = {
//             panes: paneobject?.panes,
//             index: index,
//             section_index: sectionIndex,

//             widget_index: paneobject?.widget_index,

//             singleBrands: paneobject?.singleBrands,
//           };
//           let widget_metadata = paneobject?.panes[index]?.section
//             ? paneobject?.panes[index]?.section[0]?.widgets?.[
//                 paneobject?.widget_index
//               ]
//             : paneobject?.panes[index]?.sections?.[paneobject?.widget_index]
//                 ?.widgets?.[paneobject?.widget_index];
//           widget_metadata.graphData = null;
//           dispatch(
//             setWidgetData(
//               widget_metadata,
//               index,
//               paneobject?.panes,
//               sectionIndex,
//               paneobject?.section_id, //section id for only widgets
//               sectionObj,
//               paneobject?.brands
//             )
//           );

//           dispatch(setWidgetUpdateFilterLoader(false));
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
//         dispatch(setGraphLoader(false));
//         dispatch(setWidgetUpdateFilterLoader(false));
//         let index = getPaneIndex(paneobject?.panes, paneobject?.activeKey);
//         let sections = paneobject?.panes[index]?.sections;

//         let sectionIndex = sections
//           ? sections?.findIndex(
//               (el) => el.section_id === paneobject?.section_id
//             )
//           : null;
//         let sectionObj = {
//           panes: paneobject?.panes,
//           index: index,
//           section_index: sectionIndex,

//           widget_index: paneobject?.widget_index,

//           singleBrands: paneobject?.singleBrands,
//         };
//         let widget_metadata = paneobject?.panes[index]?.section
//           ? paneobject?.panes[index]?.section[0]?.widgets?.[
//               paneobject?.widget_index
//             ]
//           : paneobject?.panes[index]?.sections?.[paneobject?.widget_index]
//               ?.widgets?.[paneobject?.widget_index];
//         widget_metadata.graphData = null;
//         dispatch(
//           setWidgetData(
//             widget_metadata,
//             index,
//             paneobject?.panes,
//             sectionIndex,
//             paneobject?.section_id, //section id for only widgets
//             sectionObj,
//             paneobject?.brands
//           )
//         );
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };
// export const setPdfModalOpen = (value) => {
//   return { type: "SET_PDF_MODAL_OPEN", payload: value };
// };
// export const setPdfLoader = (value) => {
//   return { type: "SET_PDF_LOADER", payload: value };
// };

// export const setPdfGenerateStatus = (value) => {
//   return { type: "SET_PDF_GENERATE_STATUS", payload: value };
// };

// export const setPdfData = (value) => {
//   return { type: "SET_PDF_DATA", payload: value };
// };
// export const setPPTDashboardData = (value) => {
//   return { type: "SET_PPT_DASHBOARD_DATA", payload: value };
// };

// export const getPdfData = (pdf_id, payloadOption) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (pdf_id) {
//       let body = {
//         pdf_id: pdf_id,
//       };
//       let url = `${Config.config1.api_link}/template/get-pdf-data`;
//       dispatch(setPdfLoader(true));
//       await axios
//         .post(url, body)
//         .then((response) => {
//           let timer;
//           if (response?.data?.status === "successful") {
//           }
//           if (response?.status === 200) {
//             dispatch(setPdfLoader(false));
//             !payloadOption && dispatch(setPdfDownloadStatus(true));
//             if (response?.data?.status === "successful") {
//               if (payloadOption) {
//                 let sections = payloadOption?.panes[payloadOption?.pane_index]
//                   ?.sections
//                   ? payloadOption?.panes[payloadOption?.pane_index]?.sections
//                   : payloadOption?.panes[payloadOption?.pane_index]?.section
//                   ? payloadOption?.panes[payloadOption?.pane_index]?.section
//                   : [{}];

//                 response?.data?.result?.sections &&
//                   response?.data?.result?.sections?.forEach((section, i) => {
//                     if (
//                       response?.data?.result?.template_metadata
//                         ?.contains_sections
//                     ) {
//                       sections[i].widgets = section?.widgets;
//                     } else {
//                       sections[0] = section;
//                     }

//                     section?.widgets?.forEach((widget, j) => {
//                       if (sections?.[i] && sections?.[i]?.widgets?.[j]) {
//                         sections[i].widgets[j].insights = null;
//                         sections[i].widgets[j].open = false;
//                         sections[i].widgets[j].graphData = widget?.graphData
//                           ? widget?.graphData
//                           : "No data found";
//                       } else if (section?.[0] && sections?.[0]?.widgets?.[j]) {
//                         sections[0].widgets[j].insights = null;
//                         sections[0].widgets[j].open = false;
//                         sections[0].widgets[j].graphData = widget?.graphData
//                           ? widget?.graphData
//                           : "No data found";
//                       }
//                     });
//                   });

//                 let updatePanes = [...payloadOption?.panes];
//                 if (payloadOption?.panes[payloadOption?.pane_index]?.sections) {
//                   updatePanes[payloadOption?.pane_index].sections = sections;
//                 } else {
//                   updatePanes[payloadOption?.pane_index].section = sections;
//                 }

//                 dispatch({ type: "SET_WIDGET_GRAPH_DATA", panes: updatePanes });

//                 timer = setTimeout(() => {
//                   dispatch(setPPTDashboardData(true));
//                 }, 2000);
//               } else {
//                 dispatch(setPdfData(response?.data?.result));
//               }
//             } else if (response?.data?.status === "error") {
//               errorCode?.map((el, i) => {
//                 return el.key === response?.data?.error_code
//                   ? (errorMessage = el.value)
//                   : null;
//               });
//               if (payloadOption) {
//                 notification.open({
//                   className: "notification_body notification_body_bg",
//                   key: 1,
//                   placement: "bottomLeft",
//                   icon: <img src={error1} alt={"error"} />,
//                   duration: 0,
//                   message: (
//                     <span className="notification_message">
//                       PPT generation failed. Please try again!
//                     </span>
//                   ),
//                 });
//                 dispatch(setPPTGenerateStatus(false));
//                 dispatch(setPPTModalOpen(false));
//               } else {
//                 dispatch(
//                   setPdfData(
//                     errorMessage && errorMessage?.length > 0
//                       ? errorMessage
//                       : response?.data?.reason
//                   )
//                 );
//                 callNotification(response?.data?.reason, "error");
//               }
//             } else if (response?.data?.reason && response?.data?.error) {
//               dispatch(setPdfData(response?.data?.reason));
//             }
//           } else {
//             // need to be add data for No Data Found
//             dispatch(setPdfLoader(false));
//             dispatch(setPdfDownloadStatus(true));
//             dispatch(setPdfData(errorMessage));
//             callNotification(response?.data?.reason, "error");
//           }
//           return () => {
//             clearTimeout(timer);
//           };
//         })
//         .catch((error) => {
//           if (payloadOption) {
//             notification.open({
//               className: "notification_body notification_body_bg",
//               key: 1,
//               placement: "bottomLeft",
//               icon: <img src={error1} alt={"error"} />,
//               duration: 0,
//               message: (
//                 <span className="notification_message">
//                   PPT generation failed. Please try again!
//                 </span>
//               ),
//             });
//             dispatch(setPPTModalOpen(false));
//             dispatch(setPPTGenerateStatus(false));
//           } else {
//             dispatch(setPdfLoader(false));
//             dispatch(setPdfDownloadStatus(true));
//             dispatch(setPdfData("error"));
//             // Request aborted
//             if (error.message !== "Request aborted") {
//               callNotification(null, "error");
//             }
//           }
//         });
//     } else {
//       dispatch(setPdfLoader(false));
//       dispatch(setPdfDownloadStatus(true));
//       dispatch(setPdfData(null));
//     }
//   };
// };
// export const setPdfPreviewMode = (payloadOption) => {
//   let errorMessage;
//   let brands = payloadOption?.brand_list?.columns
//     ? payloadOption?.brand_list?.columns
//     : payloadOption?.brand_list
//     ? payloadOption?.brand_list
//     : payloadOption?.global_brands;
//   let single_brands = [];
//   let brandsGroupName = [];

//   if (!payloadOption?.brand_list) {
//     brandsGroupName =
//       brands && brands[0]?.brand_list
//         ? [
//             {
//               brand_group_name: brands[0]?.brand_group_name,
//             },
//           ]
//         : single_brands?.push({
//             brand_id: brands && brands[0]?.brand_id && brands[0]?.brand_id,
//             brand_name:
//               brands && brands[0]?.brand_name && brands[0]?.brand_name,
//           });
//   } else {
//     if (brands && brands[0]?.competitor) {
//       single_brands.push({
//         brand_id: brands[0]?.name,
//         brand_name: brands[0]?.brand_name,
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

//   let finalFilters = payloadOption?.filters;
//   // payloadOption?.quick_filter ||
//   // payloadOption?.panes?.[payloadOption?.pane_index]?.hidden_filter
//   //   ? payloadOption?.filters?.filter(
//   //       (el) =>
//   //         el?.attribute !== payloadOption?.quick_filter?.attribute &&
//   //         el?.attribute !==
//   //           payloadOption?.panes?.[payloadOption?.pane_index]?.hidden_filter
//   //             ?.attribute
//   //     )
//   //   :

//   return async (dispatch) => {
//     let body = {
//       ptoken: payloadOption?.auth_params?.ptoken,
//       template_id: payloadOption?.template_id,
//       start_date: payloadOption?.start_date,
//       end_date: payloadOption?.end_date,
//       password: payloadOption?.password,
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       comp_brand_list: brands[0]?.competitor ? brands[0]?.competitorList : null,
//       brand_list:
//         single_brands && single_brands[0]?.brand_id ? single_brands : null,
//       orientation: "landscape",
//       quick_filter: payloadOption?.quick_filter,
//       filters: finalFilters,
//       profile_filters: payloadOption?.profile_filters
//         ? payloadOption?.profile_filters
//         : null,
//     };
//     let url = `${Config.config1.api_link}/template/cache-pdf-data`;
//     await axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.status === 200) {
//           if (response?.data?.status === "successful") {
//             if (payloadOption?.type === "download_id") {
//               if (response?.data?.pdf_id) {
//                 dispatch(generatePdf(response?.data?.pdf_id, body?.ptoken));
//               }
//             } else if (payloadOption?.ppt) {
//               dispatch(getPdfData(response?.data?.pdf_id, payloadOption));
//             }
//           } else if (response?.data?.status === "error") {
//             if (payloadOption?.ppt) {
//               notification.open({
//                 className: "notification_body notification_body_bg",
//                 key: 1,
//                 placement: "bottomLeft",
//                 icon: <img src={error1} alt={"error"} />,
//                 duration: 0,
//                 message: (
//                   <span className="notification_message">
//                     PPT generation failed. Please try again!
//                   </span>
//                 ),
//               });
//               dispatch(setPPTModalOpen(false));
//               dispatch(setPPTGenerateStatus(false));
//             } else {
//               errorCode?.map((el, i) => {
//                 return el.key === response?.data?.error_code
//                   ? (errorMessage = el.value)
//                   : null;
//               });
//               callNotification(errorMessage, "error");
//             }
//           }
//         } else {
//           // need to be add data for No Data Found
//           if (payloadOption?.ppt) {
//             notification.open({
//               className: "notification_body notification_body_bg",
//               key: 1,
//               placement: "bottomLeft",
//               icon: <img src={error1} alt={"error"} />,
//               duration: 0,
//               message: (
//                 <span className="notification_message">
//                   PPT generation failed. Please try again!
//                 </span>
//               ),
//             });
//             dispatch(setPPTGenerateStatus(false));
//             dispatch(setPPTModalOpen(false));
//           } else {
//             callNotification(response?.data?.reason, "error");
//           }
//         }
//       })
//       .catch((error) => {
//         if (payloadOption?.ppt) {
//           notification.open({
//             className: "notification_body notification_body_bg",
//             key: 1,
//             placement: "bottomLeft",
//             icon: <img src={error1} alt={"error"} />,
//             duration: 0,
//             message: (
//               <span className="notification_message">
//                 PPT generation failed. Please try again!
//               </span>
//             ),
//           });
//           dispatch(setPPTModalOpen(false));
//           dispatch(setPdfGenerateStatus(false));
//         } else {
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         }
//       });
//   };
// };

// // for generate pdf in backup
// export const generatePdf = (pdf_id, ptoken) => {
//   let errorMessage;
//   return async (dispatch) => {
//     if (pdf_id) {
//       let body = {
//         pdf_id: pdf_id,
//         ptoken: ptoken,
//       };
//       let url = `${Config.config1.api_link}/template/create-pdf`;
//       await axios
//         .post(url, body)
//         .then((response) => {
//           if (response?.status === 200) {
//             dispatch(setPdfGenerateStatus(false));
//             if (response?.data?.status === "successful") {
//               if (response?.data?.pdf_url) {
//                 window?.open(response?.data?.pdf_url);
//               }
//             } else if (response?.data?.status === "error") {
//               errorCode?.map((el, i) => {
//                 return el.key === response?.data?.error_code
//                   ? (errorMessage = el.value)
//                   : null;
//               });
//               callNotification(response?.data?.reason, "error");
//             }
//           } else {
//             dispatch(setPdfGenerateStatus(false));
//             callNotification(response?.data?.reason, "error");
//           }
//         })
//         .catch((error) => {
//           dispatch(setPdfGenerateStatus(false));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch(setPdfGenerateStatus(false));
//     }
//   };
// };

// // for generate pdf schedule api
// export const setSchedulePdf = (graphObject) => {
//   let errorMessage;
//   let brands = graphObject?.brands?.columns
//     ? graphObject?.brands?.columns
//     : graphObject?.brands;

//   let single_brands = [];
//   let brandsGroupName = [];

//   if (!graphObject?.isBrandModified) {
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
//     let body = {
//       ptoken: graphObject?.auth_params?.ptoken,
//       comp_agg: graphObject?.comp_agg,
//       template_id: graphObject?.template_id,
//       utcoffset: graphObject?.utcoffset,
//       filters: graphObject?.filters,
//       start_date: graphObject?.start_date,
//       end_date: graphObject?.end_date,
//       brand_groups: brandsGroupName?.length > 0 ? brandsGroupName : null,
//       comp_brand_list:
//         brands && brands?.[0]?.competitor ? brands?.[0]?.competitorList : null,
//       brand_list:
//         single_brands && single_brands?.[0]?.brand_id ? single_brands : null,
//       schedule_json: graphObject?.schedule_json,
//       hidden_filter: graphObject?.hidden_filter,
//       quick_filter: graphObject?.quick_filter,
//       ai_insights_enabled: graphObject?.ai_insights_enabled,
//       profile_filters: graphObject?.profile_filters
//         ? graphObject?.profile_filters
//         : null,
//     };
//     let url = `${Config.config1.api_link}/template/${
//       graphObject?.ppt ? "download-ppt" : "download-pdf"
//     }`;
//     await axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.status === 200) {
//           dispatch(setPdfGenerateStatus(false));
//           if (response?.data?.status === "successful") {
//             if (graphObject?.ppt) {
//               dispatch(setPptId(response?.data?.schedule_id));
//             } else {
//               callNotification(
//                 `You will receive the PDF report at ${response?.data?.email_id}`,
//                 "success"
//               );
//               dispatch(setPdfGenerateStatus(false));
//             }
//           } else if (response?.data?.status === "error") {
//             if (graphObject?.ppt) {
//               notification.open({
//                 className: "notification_body notification_body_bg",
//                 key: 1,
//                 placement: "bottomLeft",
//                 icon: <img src={error1} alt={"error"} />,
//                 duration: 0,
//                 message: (
//                   <span className="notification_message">
//                     PPT generation failed. Please try again!
//                   </span>
//                 ),
//               });
//               dispatch(setPPTModalOpen(false));
//               dispatch(setPPTGenerateStatus(false));
//             } else {
//               errorCode?.map((el, i) => {
//                 return el.key === response?.data?.error_code
//                   ? (errorMessage = el.value)
//                   : null;
//               });
//               callNotification(response?.data?.reason, "error");
//               dispatch(setPdfGenerateStatus(false));
//             }
//           }
//         } else {
//           dispatch(setPdfGenerateStatus(false));
//           callNotification(response?.data?.reason, "error");
//         }
//       })
//       .catch((error) => {
//         dispatch(setPdfGenerateStatus(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// export const setWordcloudModifyWords = (
//   authParams,
//   paneobject,
//   modalCheckboxValue = false,
//   type
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let body = {
//       ptoken: authParams?.ptoken,
//       template_id:
//         paneobject?.brand_id || paneobject?.brand_group
//           ? null
//           : paneobject?.template_id,
//       widget_id:
//         paneobject?.brand_id || paneobject?.brand_group
//           ? null
//           : paneobject?.widget_id,
//       widget_uuid: paneobject?.widget_uuid,
//       section_id:
//         paneobject?.brand_id || paneobject?.brand_group
//           ? null
//           : paneobject?.section_id,
//       exclude_words: paneobject?.comp_exclude_words?.length
//         ? undefined
//         : paneobject?.exclude_words,
//       include_words: paneobject?.comp_include_words?.length
//         ? []
//         : paneobject?.include_words
//         ? paneobject?.include_words
//         : [],
//       comp_exclude_words: paneobject?.comp_exclude_words,
//       comp_include_words: paneobject?.comp_include_words,
//       brand_list: paneobject?.brand_id,
//       brand_group: paneobject?.brand_group,
//       wc_hide_temporary: paneobject?.wc_hide_temporary,
//       wc_hide_permanent: paneobject?.wc_hide_permanent,
//       wc_hide_brand: paneobject?.wc_hide_brand,
//     };
//     dispatch(setGraphLoader(true));
//     dispatch(
//       setWidgetLoader({
//         value: true,
//         widget_index: paneobject?.widget_index,
//         section_index: paneobject?.section_index,
//         widget_id: paneobject?.widget_id,
//         global: false,
//       })
//     );
//     let url = `${Config.config1.api_link}/template/section/widget/modify-exclude-words`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(setWidgetFetch(authParams, paneobject, type));
//           dispatch(setWidgetUpdateFilterLoader(true));

//           dispatch({
//             type: "SET_WORDCLOUD_MODIFY_WORDS",
//             panes: response?.data,
//           });
//           dispatch(getBrandHiddenWords(authParams));
//           if (modalCheckboxValue) {
//             dispatch(
//               setBrandValue(authParams, null, null, null, modalCheckboxValue)
//             );
//           }
//         }
//         if (response?.data?.status === "error") {
//           dispatch(setGraphLoader(false));
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
//         dispatch(setGraphLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// export const getBrandHiddenWords = (authParams) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let body = {
//       ptoken: authParams?.ptoken,
//     };
//     // dispatch(setGraphLoader(true));
//     // dispatch(
//     //   setWidgetLoader({
//     //     value: true,
//     //     widget_index: paneobject?.widget_index,
//     //     section_index: paneobject?.section_index,
//     //     widget_id: paneobject?.widget_id,
//     //     global: false,
//     //   })
//     // );
//     let url = `${Config.config1.api_link}/template/brand-excluded-words`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch({
//             type: "SET_BRAND_HIDDEN_WORDS",
//             payload: response?.data?.result,
//           });
//         }
//         // if (response?.data?.status === "error") {
//         //   dispatch(setGraphLoader(false));
//         //   errorCode?.map((el, i) => {
//         //     return el.key === response?.data?.error_code
//         //       ? (errorMessage = el.value)
//         //       : null;
//         //   });

//         //   callNotification(errorMessage, "error");
//         //   if (response?.data?.error_code === 9) {
//         //     sessionExpired(true);
//         //   }
//         // }
//       })
//       .catch((error) => {
//         dispatch(setGraphLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// export const setSharableUserDataLoader = (value) => {
//   return { type: "SET_SHAREABLE_USER_DATA_LOADER", payload: value };
// };

// // search-team-list api
// export const getShareSearchTeamList = (shareObject) => {
//   let errorMessage;
//   return async (dispatch) => {
//     let body = {
//       ptoken: shareObject?.authParams?.ptoken,
//       template_id: shareObject?.template_id,
//       search_string: shareObject?.search_string,
//     };
//     let url = `${Config.config1.api_link}/template/access/search-team-list`;
//     dispatch(setSharableUserDataLoader(true));

//     await axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(setSharableUserData(response?.data?.result?.users));
//           dispatch(setSharableUserDataLoader(false));
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
//           dispatch(setSharableUserDataLoader(false));
//         }
//       })
//       .catch((error) => {
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//         dispatch(setSharableUserDataLoader(false));
//       });
//   };
// };

// export const setDashboardPaginationFilters = (value) => {
//   return { type: "SET_DASHBOARD_PAGINATION_FILTERS", payload: value };
// };

// export const setIsDashboardCreated = (value) => {
//   return { type: "SET_IS_DASHBOARD_CREATED", payload: value };
// };

// export const setIsScheduleReportOpen = (value) => {
//   return { type: "SET_IS_SCHEDULE_REPORT_OPEN", payload: value };
// };

// export const setIsDashboardScheduleModal = (value) => {
//   return { type: "SET_IS_DASHBOARD_SCHEDULE_MODAL", payload: value };
// };

// export const setIsDashboardScheduleTemplate = (value) => {
//   return { type: "SET_IS_DASHBOARD_SCHEDULE_TEMPLATE", payload: value };
// };

// export const setScheduleCurrentStep = (value) => {
//   return { type: "SET_SCHEDULE_CURRENT_STEP", payload: value };
// };

// export const setReachCurrentTime = (value) => {
//   return { type: "SET_REACH_CURRENT_TIME", payload: value };
// };

// export const setWidgetUpdateFilterLoader = (value) => {
//   return { type: "SET_WIDGET_UPDATE_FILTER_LOADER", payload: value };
// };

// export const getPinnedTemplateList = (basicObj, paneObj) => {
//   let errorMessage;
//   return async (dispatch) => {
//     // if (paneObj && window?.location?.pathname === "/schedule") {
//     //   dispatch(
//     //     updateDashboardPills("All Dashboards", paneObj?.index, paneObj?.panes)
//     //   );
//     // }
//     dispatch(setPinnedTemplateListLoader(true));
//     if (basicObj?.authParams) {
//       let body = {
//         ptoken: basicObj?.authParams?.ptoken,
//         type: paneObj?.type,
//         filter: {
//           search_text: basicObj?.search_text,
//           pill: basicObj?.pill,
//           offset: basicObj?.offset,
//           no_of_rows: basicObj?.no_of_rows,
//           sort_expression: basicObj?.sort_expression,
//           sort_order: basicObj?.sort_order,
//           // type: basicObj?.type,
//         },
//       };
//       let url = `${Config.config1.api_link}/template/pinned-template-list`;
//       await axios

//         .post(url, body)
//         .then((response) => {
//           dispatch(setPinnedTemplateListLoader(false));
//           dispatch(setDeepDiveFlag(false));
//           if (response?.data?.status === "successful") {
//             const data = response?.data?.result?.templates?.map((el) => el);
//             dispatch(setPinnedTemplateListData(data));

//             let pinnedDashboardList = response?.data?.result?.templates;
//             if (pinnedDashboardList?.length) {
//               if (paneObj && window.location.pathname === "/pin-dashboard") {
//                 if (basicObj?.authParams?.ppt) {
//                   let paneObject = {
//                     ...paneObj,
//                     firstSection: true,
//                     template_list: true,
//                   };

//                   if (!paneObj?.panes?.[paneObj?.index]?.isDashboard) {
//                     dispatch(
//                       setClearTemplateData(null, paneObj?.index, paneObj?.panes)
//                     );
//                     dispatch(setGlobalLoader(false));
//                   } else {
//                     let template = data?.find(
//                       (el) =>
//                         el?.template_id ===
//                         paneObj?.panes[paneObj?.index]?.template_id
//                     );
//                     // to clear panes in case of schedule report
//                     let panesTemplateId = global?.panes
//                       ? global?.panes[paneObj?.index]?.template_id
//                       : paneObj?.panes[paneObj?.index]?.template_id;

//                     basicObj?.authParams?.category_id &&
//                       paneObj?.panes &&
//                       panesTemplateId &&
//                       !paneObj?.template_update &&
//                       dispatch(
//                         setFetchTemplateData(
//                           basicObj?.authParams,
//                           paneObj?.panes[paneObj?.index]?.template_id,
//                           paneObject,
//                           template
//                         )
//                       );
//                   }
//                 } else if (!basicObj?.authParams?.ppt) {
//                   pinnedDashboardList?.map((temp, tempIndex) => {
//                     if (temp?.template_id) {
//                       let paneObject = {
//                         ...paneObj,
//                         firstSection: true,
//                         template_list: true,
//                       };

//                       // Start Adding
//                       if (tempIndex > 0) {
//                         let panes = global?.panes
//                           ? [...global?.panes]
//                           : [...paneObj?.panes];
//                         let index = tempIndex;
//                         const activeKey = uuid();
//                         let newPanes = [...panes];
//                         newPanes.push(temp);

//                         newPanes[index].key = activeKey;
//                         newPanes[index].isDashboard = true;
//                         newPanes[index].isDeepDive = false;
//                         newPanes[index].deepdive = {
//                           deepdiveResponse: [],
//                           tabName: null,
//                         };
//                         global.panes = newPanes;
//                         // global.TabActiveKey = null;
//                         // console.log("IF newPanes", newPanes);
//                         dispatch({
//                           type: "SET_PANES_ADD",
//                           activeKey: "1",
//                           panes: newPanes,
//                         });
//                       } else {
//                         let panes = global?.panes
//                           ? [...global?.panes]
//                           : [...paneObj?.panes];
//                         let index = 0;

//                         let newPanes = [...panes];
//                         newPanes[index].key = "1";
//                         newPanes[index].activeKey = "1";

//                         newPanes[index].template_id = temp?.template_id;
//                         newPanes[index].template_name = temp?.template_name;
//                         newPanes[index].template_description =
//                           temp?.template_description;
//                         newPanes[index].is_pinned = temp?.is_pinned;
//                         newPanes[index].is_shared = temp?.is_shared;
//                         newPanes[index].created_date = temp?.created_date;
//                         newPanes[index].access_type = temp?.access_type;

//                         newPanes[index].isDashboard = true;
//                         newPanes[index].isDeepDive = false;
//                         newPanes[index].deepdive = {
//                           deepdiveResponse: [],
//                           tabName: null,
//                         };
//                         // console.log("ELSE newPanes", newPanes);

//                         global.panes = newPanes;
//                         // global.TabActiveKey = "1";
//                         dispatch({
//                           type: "SET_PANES_ADD",
//                           activeKey: "1",
//                           panes: newPanes,
//                         });
//                       }
//                       // End Adding

//                       let template_obj = {
//                         created_date: temp?.created_date,
//                         template_id: temp?.template_id,
//                       };

//                       // Call Template Fetch API for only first tab dashboard
//                       if (tempIndex === 0) {
//                         // console.log("IF FINAL paneObject", paneObject);
//                         dispatch(
//                           setFetchTemplateData(
//                             basicObj?.authParams,
//                             temp?.template_id,
//                             paneObject,
//                             template_obj
//                           )
//                         );
//                       }
//                     }
//                   });
//                 }

//                 // console.log("basicObj, paneObj", basicObj, paneObj);
//                 if (paneObj?.panes && paneObj?.index >= 0) {
//                   dispatch(
//                     setDashboardTemplateFilters(
//                       paneObj?.panes?.[paneObj?.index]
//                         ?.dashboard_template_filters,
//                       paneObj?.index,
//                       paneObj?.panes
//                     )
//                   );
//                 }
//               }

//               //code to add new cards

//               if (paneObj && window.location.pathname === "/schedule") {
//                 dispatch(setTemplateListType("report"));
//               } else {
//                 dispatch(setTemplateListType("dashboard"));
//               }

//               dispatch({ type: "SET_TEMPLATE_DATA", payload: data });
//               dispatch({
//                 type: "SET_DASHBOARD_PILLS",
//                 payload: response?.data?.pills,
//               });
//               dispatch({
//                 type: "SET_DASHBOARD_TOTAL_PAGE_NO",
//                 payload: response?.data?.no_of_pages,
//               });

//               // On refresh browser reset Active Section Key and Id
//               dispatch(setActiveSectionKey(null));
//               // paneObj?.panes &&
//               //   paneObj?.index >= 0 &&
//               //   dispatch(
//               //     setActiveSectionId(null, paneObj?.panes, paneObj?.index)
//               //   );

//               // Reset CalledAPIList State
//               if (paneObj?.panes && paneObj?.index >= 0) {
//                 // Reset the is_dashboard_edited flag
//                 if (
//                   paneObj?.panes?.[paneObj?.index]?.is_dashboard_edited &&
//                   paneObj?.panes?.[paneObj?.index]?.is_dashboard_edited !==
//                     undefined
//                 ) {
//                   paneObj.panes[paneObj?.index].is_dashboard_edited = false;
//                 }

//                 dispatch(
//                   setDashboardCalledApiList(
//                     null,
//                     paneObj?.panes,
//                     paneObj?.index
//                   )
//                 );
//               }
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
//             if (response?.data?.error_code === 11) {
//               dispatch({ type: "SET_PANE", panes: initialPanes });
//               workspaceNotExist(true);
//             }
//           }
//         })
//         .catch((error) => {
//           dispatch(setDeepDiveFlag(false));
//           dispatch(setGlobalLoader(false));
//           dispatch(setPinnedTemplateListLoader(false));
//           // Request aborted
//           if (error.message !== "Request aborted") {
//             callNotification(null, "error");
//           }
//         });
//     } else {
//       dispatch(setDeepDiveFlag(false));
//       dispatch(setPinnedTemplateListData(null));
//     }
//   };
// };

// export const setPinnedTemplateListLoader = (value) => {
//   return { type: "SET_PINNED_TEMPLATE_LIST_LOADER", payload: value };
// };

// export const setPinnedTemplateListData = (value) => {
//   return { type: "SET_PINNED_TEMPLATE_LIST_DATA", payload: value };
// };

// export const setDuplicateDashboardLoader = (value) => {
//   return { type: "SET_DUPLICATE_DASHBOARD_LOADER", payload: value };
// };

// export const setDuplicateDashboardFlag = (value) => {
//   return { type: "SET_DUPLICATE_DASHBOARD_FLAG", payload: value };
// };

// export const setSaveDashboardModalFlag = (value) => {
//   return { type: "SET_SAVE_DASHBOARD_MODAL_FLAG", payload: value };
// };
// export const setSaveEditedDashboardModalFlag = (value) => {
//   return { type: "SET_SAVE_EDITED_DASHBOARD_MODAL_FLAG", payload: value };
// };
// export const setCloseDashboardFlag = (value) => {
//   return { type: "SET_CLOSE_DASHBOARD_FLAG", payload: value };
// };
// export const setOpenNewDashboardFlag = (value) => {
//   return { type: "SET_OPEN_NEW_DASHBOARD_FLAG", payload: value };
// };

// //api to Update Dashboards Globle Filters
// export const updateDashboardGlobleFilters = (obj) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setDuplicateDashboardLoader(true));
//     dispatch(setSaveDashboardModalFlag(true));

//     let body = {
//       template_id: obj?.template_id,
//       filters: obj?.filters,
//       ptoken: obj?.authParams?.ptoken,
//       user_id: obj?.authParams?.userid,
//       category_id: obj?.authParams?.category_id,
//     };

//     let url = `${Config.config1.api_link}/template/update-dash-filter`;
//     await axios
//       .post(url, body)
//       .then((response) => {
//         dispatch(setDuplicateDashboardLoader(false));
//         dispatch(setSaveDashboardModalFlag(false));

//         if (response?.data?.status === "successful") {
//           callNotification("Dashboard saved successfully", "success");
//           // console.log("saved response", response);
//           let template = {
//             ...obj?.panes[obj?.index],
//             saved_filters: obj?.filters,
//           };
//           dispatch(setTemplateInPane(template, obj?.index, obj?.panes));
//         }

//         if (
//           response?.data?.status === "error" &&
//           response?.data?.error_code !== 15
//         ) {
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
//         dispatch(setDuplicateDashboardLoader(false));
//         dispatch(setSaveDashboardModalFlag(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// //api call for getting filter templates list
// export const getFilterTemplate = (
//   authParams,
//   panes,
//   paneIndex,
//   template_id
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setTemplateLoader(true));
//     let body = {
//       ptoken: authParams?.ptoken,
//       template_id: template_id,
//     };
//     let url = `${Config.config1.api_link}/template/get-filter-template`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(
//             setTemplateFiltersInPane(response?.data?.result, paneIndex, panes)
//           );
//           dispatch(setTemplateLoader(false));
//         }
//         if (response?.data?.status === "error") {
//           dispatch(setTemplateLoader(false));
//           callNotification(response?.data?.reason, "error");
//         }
//       })
//       .catch((error) => {
//         dispatch(setGraphLoader(false));
//         dispatch(setTemplateLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// // Api call for creating new filter template
// export const setFilterTemplate = (
//   authParams,
//   panes,
//   paneIndex,
//   quickFilterTitle,
//   quickFilterDescription,
//   filterTemplatePayload
// ) => {
//   let errorMessage;
//   return async (dispatch) => {
//     dispatch(setTemplateLoader(true));
//     let template_id = panes[paneIndex].template_id;
//     let body = {
//       ptoken: authParams?.ptoken,
//       filter_template_name: quickFilterTitle,
//       filter_template_description: quickFilterDescription || "",
//       saved_filters: filterTemplatePayload,
//     };
//     let url = `${Config.config1.api_link}/template/create-filter-template`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(
//             getFilterTemplate(authParams, panes, paneIndex, template_id)
//           );
//           callNotification("Quick filter created successfully", "success");
//         }
//         if (response?.data?.status === "error") {
//           dispatch(setTemplateLoader(false));
//           callNotification(response?.data?.reason, "error");
//         }
//       })
//       .catch((error) => {
//         dispatch(setGraphLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// // Api call for deleting a filter template
// export const deleteFilterTemplate = (
//   authParams,
//   panes,
//   paneIndex,
//   filterTemplateId,
//   filterTemplateName
// ) => {
//   return async (dispatch) => {
//     dispatch(setTemplateLoader(true));
//     let template_id = panes[paneIndex]?.template_id;
//     let body = {
//       ptoken: authParams?.ptoken,
//       filter_template_name: filterTemplateName,
//       filter_template_id: filterTemplateId,
//     };
//     let url = `${Config.config1.api_link}/template/delete-filter-template`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(
//             getFilterTemplate(authParams, panes, paneIndex, template_id)
//           );
//           callNotification("Quick filter deleted successfully", "success");
//         }
//         if (response?.data?.status === "error") {
//           dispatch(setTemplateLoader(false));
//           callNotification(response?.data?.reason, "error");
//         }
//       })
//       .catch((error) => {
//         dispatch(setGraphLoader(false));
//         dispatch(setTemplateLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// // Api call for duplicating a filter template same api as create
// export const duplicateFilterTemplate = (
//   authParams,
//   panes,
//   paneIndex,
//   quickFilterTitle,
//   quickFilterId,
//   quickFilterDescription,
//   filterTemplatePayload
// ) => {
//   return async (dispatch) => {
//     dispatch(setTemplateLoader(true));
//     let template_id = panes[paneIndex].template_id;
//     let body = {
//       ptoken: authParams?.ptoken,
//       filter_template_name: quickFilterTitle,
//       filter_template_description: quickFilterDescription || "",
//       saved_filters: filterTemplatePayload,
//     };
//     let url = `${Config.config1.api_link}/template/create-filter-template`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(
//             getFilterTemplate(authParams, panes, paneIndex, template_id)
//           );
//           callNotification("Quick filter duplicated successfully", "success");
//         }
//         if (response?.data?.status === "error") {
//           dispatch(setTemplateLoader(false));
//           callNotification(response?.data?.reason, "error");
//         }
//       })
//       .catch((error) => {
//         dispatch(setGraphLoader(false));
//         dispatch(setTemplateLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(
//             "There was some issue creating the duplicate",
//             "error"
//           );
//         }
//       });
//   };
// };

// // Api call for editing an existing filter template
// export const updateFilterTemplate = (
//   authParams,
//   panes,
//   paneIndex,
//   quickFilterId,
//   filterTemplatePayload
// ) => {
//   return async (dispatch) => {
//     dispatch(setTemplateLoader(true));
//     let template_id = panes[paneIndex]?.template_id;
//     let body = {
//       ptoken: authParams?.ptoken,
//       filter_template_id: quickFilterId,
//       saved_filters: filterTemplatePayload,
//     };
//     let url = `${Config.config1.api_link}/template/update-filter-template`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(
//             getFilterTemplate(authParams, panes, paneIndex, template_id)
//           );
//           callNotification("Quick filter updated successfully", "success");
//         }
//         if (response?.data?.status === "error") {
//           dispatch(setTemplateLoader(false));
//           callNotification(response?.data?.reason, "error");
//         }
//       })
//       .catch((error) => {
//         dispatch(setGraphLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// // Api call for pinning quick filter templates on dashboard from quick filter panel
// export const setPinFilterTemplate = (
//   authParams,
//   panes,
//   paneIndex,
//   applied_filters_ids
// ) => {
//   return async (dispatch) => {
//     let template_id = panes[paneIndex]?.template_id;
//     let body = {
//       ptoken: authParams?.ptoken,
//       template_id: template_id,
//       applied_filters: applied_filters_ids,
//     };
//     let url = `${Config.config1.api_link}/template/pin-filter-template`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch(
//             getFilterTemplate(authParams, panes, paneIndex, template_id)
//           );
//           if (applied_filters_ids.length > 0) {
//             callNotification("Quick filter pinned successfully", "success");
//           } else {
//             callNotification("Quick filter unpinned successfully", "success");
//           }
//         }
//         if (response?.data?.status === "error") {
//           dispatch(setTemplateLoader(false));
//           callNotification(response?.data?.reason, "error");
//         }
//       })
//       .catch((error) => {
//         dispatch(setGraphLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };

// //api call for getting pinned templates list on dashboard
// export const getPinFilterTemplate = (authParams) => {
//   return async (dispatch) => {
//     let body = {
//       ptoken: authParams?.ptoken,
//     };
//     let url = `${Config.config1.api_link}/template/get-pinned-filter-template`;
//     axios
//       .post(url, body)
//       .then((response) => {
//         if (response?.data?.status === "successful") {
//           dispatch({
//             type: "SET_PINNED_FILTER_TEMPLATE",
//             payload: response?.data?.result?.pinned_filters,
//           });
//         }
//         if (response?.data?.status === "error") {
//           dispatch(setTemplateLoader(false));
//           callNotification(response?.data?.reason, "error");
//         }
//       })
//       .catch((error) => {
//         dispatch(setGraphLoader(false));
//         dispatch(setTemplateLoader(false));
//         // Request aborted
//         if (error.message !== "Request aborted") {
//           callNotification(null, "error");
//         }
//       });
//   };
// };
