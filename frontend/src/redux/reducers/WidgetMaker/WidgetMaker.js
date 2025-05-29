let initialState = {
  WM_attributes: null,
  All_WM_attributes: null,
  WM_init_attributes: null,
  isshowSideBar: false,
  attributeFlag: false,
  isDeepDive: false,
  isDuplicate: { redirect: false, widget_id: null },
  isHover: null,
  deepdive_object: null,
  deepdive_social_media_object: null,
  deepdive_news_object: null,
  All_Share_attributes: null,
  attrAccordionObject: [],
  wm_api_flag: false,
};

const WidgetMaker = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WM_ATTRIBUTES":
      return {
        ...state,
        WM_attributes: action.payload,
      };
    case "SET_WM_INITIAL_ATTRIBUTES":
      return {
        ...state,
        WM_init_attributes: action.payload,
      };
    case "SET_All_WM_ATTRIBUTES":
      return {
        ...state,
        All_WM_attributes: action.payload,
      };
    case "SET_SHARE_ATTRIBUTES":
      return {
        ...state,
        All_Share_attributes: action.payload,
      };
    case "SET_IS_SHOW_SIDE_BAR":
      return {
        ...state,
        isshowSideBar: action.payload,
      };
    case "SET_IS_DUPLICATE":
      return {
        ...state,
        isDuplicate: action.payload,
      };
    case "SET_IS_HOVER":
      return {
        ...state,
        isHover: action.payload,
      };
    case "SET_ATTRIBUTE_FLAG":
      return {
        ...state,
        attributeFlag: action.payload,
      };
    case "SET_WM_DEEPDIVE":
      return {
        ...state,
        isDeepDive: action.payload,
      };
    case "SET_DEEPDIVE_OBJECT":
      return {
        ...state,
        deepdive_object: action.payload,
      };
    case "SET_DEEPDIVE_SOCIAL_MEDIA_OBJECT":
      return {
        ...state,
        deepdive_social_media_object: action.payload,
      };
    case "SET_DEEPDIVE_NEWS_OBJECT":
      return {
        ...state,
        deepdive_news_object: action.payload,
      };
    case "SET_ATTR_ACCORDION_OBJECT":
      return {
        ...state,
        attrAccordionObject: action.payload,
      };
    case "SET_DEEPDIVE_MENTIONS_OBJECT":
      return {
        ...state,
        deep_dive_mentions_object: action.payload,
      };
    case "SET_DEEPDIVE_INFLUENCERS_OBJECT":
      return {
        ...state,
        deep_dive_influencers_object: action.payload,
      };
    case "SET_WIDGET_MAKER_API_CALL_FLAG":
      return {
        ...state,
        wm_api_flag: action.payload,
      };
    default:
      return state;
  }
};

export default WidgetMaker;
