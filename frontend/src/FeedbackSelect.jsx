/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import React from "react";

const FeedbackSelect = ({ feedbackSelect, setfeedbackSelect }) => {
  const data = [
    "Data Issue (Incorrect data / Mismatch in number)",
    "Graphs Display Issue (Graphs seems wrong)",
    "Attribute not working",
    "Filter related issue",
    "UX / UI improvement",
  ];
  const onChange = (value) => {
    setfeedbackSelect(value);
  };

  return (
    <Select
      showSearch
      style={{ width: "400px", height: "40px" }}
      placeholder="Please select an option"
      optionFilterProp="children"
      onChange={(value) => onChange(value)}
      value={feedbackSelect}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {data.map((el, i) => {
        return (
          <Select.Option key={i} value={el}>
            {el}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default FeedbackSelect;
