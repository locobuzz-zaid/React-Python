let initialState = {
  feedback: null,
  feedbackResponse: null,
  sidebarVisibility: true,
};

const Sidebar = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FEEDBACK":
      return {
        ...state,
        feedback: action.payload,
      };
    case "SET_FEEDBACK_RESPONSE":
      return {
        ...state,
        feedbackResponse: action.payload,
      };
    case "SET_SIDEBAR_VISIBILITY":
      return {
        ...state,
        sidebarVisibility: action.payload,
      };

    default:
      return state;
  }
};

export default Sidebar;
