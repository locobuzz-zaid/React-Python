export const set_WM_Attributes = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_WM_ATTRIBUTES", payload: value });
  };
};

export const set_All_WM_Attributes = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_All_WM_ATTRIBUTES", payload: value });
  };
};

export const set_Share_Attributes = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_SHARE_ATTRIBUTES", payload: value });
  };
};

export const setIsshowSideBar = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_SHOW_SIDE_BAR", payload: value });
  };
};

export const setIsDuplicate = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_DUPLICATE", payload: value });
  };
};

export const setIsHover = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_HOVER", payload: value });
  };
};

export const setAttributeFlag = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_ATTRIBUTE_FLAG", payload: value });
  };
};

export const set_WM_DeepDive = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_WM_DEEPDIVE", payload: value });
  };
};

export const setDeepDiveObject = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_DEEPDIVE_OBJECT", payload: value });
  };
};
export const setAttrAccordionObject = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_ATTR_ACCORDION_OBJECT", payload: [...value] });
  };
};
export const setDeepDiveSocialMediaObject = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_DEEPDIVE_SOCIAL_MEDIA_OBJECT", payload: value });
  };
};

export const setDeepDiveNewsObject = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_DEEPDIVE_NEWS_OBJECT", payload: value });
  };
};

export const setDeepDiveMentionsObject = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_DEEPDIVE_MENTIONS_OBJECT", payload: value });
  };
};

export const setDeepDiveInfluencersObject = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_DEEPDIVE_INFLUENCERS_OBJECT", payload: value });
  };
};
export const setWidgetMakerApiCallFlag = (value) => {
  return (dispatch) => {
    dispatch({ type: "SET_WIDGET_MAKER_API_CALL_FLAG", payload: value });
  };
};
