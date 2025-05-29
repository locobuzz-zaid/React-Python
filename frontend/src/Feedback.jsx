import { Button, Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import FeedbackSelect from "./FeedbackSelect";
import { getfeedbackResponse, displayFeedback } from "./redux/actions/Sidebar";

const { TextArea } = Input;
const Feedback = () => {
  const [, setIsModalVisible] = useState(false);
  const [feedbackText, setfeedbackText] = useState();
  const [feedbackSelect, setfeedbackSelect] = useState();
  const [feedbackObj, setfeedbackObj] = useState(null);
  const [loading, setloading] = useState();
  const [, setfeedbackResponse] = useState(null);
  const panes = useSelector((state) => state?.Tab1?.panes); //all tabs data
  const [warning, setwarning] = useState(false);
  const authParams = useSelector((state) => state?.Authentication?.authParams);
  const reportId = useSelector((state) => state?.Authentication?.reportId);
  const graphDetail = useSelector((state) => state?.Welcome?.graphDetail);

  const feed1 = useSelector((state) => state?.Sidebar?.feedback);
  const activeKey = useSelector((state) => state?.Home?.activeKey); //tab active key
  const dispatch = useDispatch();

  const onChange = (e) => {
    if (e.target.value?.length < 20) {
      setwarning(true);
    } else {
      setwarning(false);
    }

    setfeedbackText(e.target.value);
  };

  const handleOk = () => {
    let path = window.location.pathname;
    let deep_dive;
    panes?.map((el) => {
      if (el?.key === activeKey) {
        deep_dive = el?.deep_dive;
      }
    });
    if (!feedbackText || !feedbackText.trim()) {
      setwarning(true);
    }
    if (feedbackText?.length >= 20 && feedbackSelect && feedbackText.trim()) {
      setIsModalVisible(false);
      dispatch(displayFeedback(false));

      let graph_obj = graphDetail;
      let obj = {
        report_id: reportId,
        ptoken: authParams?.ptoken,
        user_id: authParams?.userid,
        title: feedbackSelect,
        description: feedbackText,
        graph_config: {
          primary: graph_obj?.primary_attribute,
          secondary: graph_obj?.secondary_attribute,
          filters: graph_obj?.filters,
          splits: graph_obj?.splits,
        },
        page:
          path === "/reports"
            ? "reports"
            : deep_dive
            ? "deep_dive"
            : "worksheet",
      };
      setfeedbackObj(obj);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(displayFeedback(false));
    setfeedbackObj(null);
    setfeedbackSelect(null);
    setfeedbackText(null);
    setwarning(false);
    setfeedbackResponse(null);
  };

  useEffect(() => {}, [feedbackSelect]);

  useEffect(() => {
    if (feedbackObj !== null) {
      setloading(true);
      dispatch(getfeedbackResponse(feedbackObj));

      // setfeedbackResponse(feedbackResponse);
      setloading(false);
      setfeedbackSelect("");
      setfeedbackText(null);
      setfeedbackSelect(null);
      setwarning(false);
    }
  }, [feedbackObj]);

  return (
    <Modal
      visible={feed1}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<div className="portlet__title">Bug Report Form</div>}
      className={`form__feedback-popup ${
        authParams?.theme_type === "1" ? "darkTheme" : "lightTheme"
      }`}
      footer={[
        <Button key="back" onClick={handleCancel} className="btn_Clear">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          className="ant-btn-primary_blue"
          loading={loading}
        >
          Send
        </Button>,
      ]}
    >
      <div className="form_feedback">
        <div className="form-group form__feedback attribute__select-menu">
          <FeedbackSelect
            className="w-100"
            feedbackSelect={feedbackSelect}
            setfeedbackSelect={setfeedbackSelect}
          />
        </div>
        <div className="form-group">
          <TextArea
            className="portlet-textarea"
            value={feedbackText}
            onChange={onChange}
            placeholder="Enter text here"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <div
            className="error"
            style={{ display: warning ? "block" : "none" }}
          >
            Please elaborate!
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default Feedback;
