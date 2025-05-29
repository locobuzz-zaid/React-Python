import React, { useEffect, useState } from "react";
import { Table, Avatar, Typography, Tooltip, Spin } from "antd";
import {
  MailOutlined,
  CopyOutlined,
  LinkOutlined,
  UserOutlined,
  LoadingOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import nvScoreIcon from "../../../assets/Dashboard/nv_score_icon.svg";
import { useSelector } from "react-redux";
import "../LayoutView/DeepDive/DeepDive3.css";
// import openPostIcon from "../../../assets/Dashboard/open_post_icon.svg";
import moment from "moment";
import ErrorBoundary from "../LayoutView/Analytics/ErrorBoundary";
import NoGraphData from "../LayoutView/Analytics/NoGraphData";

import openPostIcon from "../../../assets/Dashboard/article_open_post_icon.svg";
import CopyIcon from "../../../assets/Dashboard/article_copy_icon.svg";
import SendEmailIcon from "../../../assets/Dashboard/article_send_email_icon.svg";

const { Paragraph } = Typography;

const CustomTable = () => {
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );

  const [hoveredRow, setHoveredRow] = useState(null);
  const [data, setData] = useState([]);
  const [isCopied, setIsCopied] = useState({ flag: false, index: null });

  useEffect(() => {
    if (dashboardsData?.[dashboardActiveKey]?.deep_dive?.data?.length) {
      setData(dashboardsData?.[dashboardActiveKey]?.deep_dive?.data);
    } else if (
      dashboardsData?.[dashboardActiveKey]?.article_data_list?.data?.length
    ) {
      setData(dashboardsData?.[dashboardActiveKey]?.article_data_list?.data);
    }
  }, [
    dashboardsData?.[dashboardActiveKey]?.article_data_list?.data,
    dashboardsData?.[dashboardActiveKey]?.deep_dive?.data,
  ]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {moment(date).format("DD MMM YYYY")}
        </div>
      ),
    },
    {
      title: "Source",
      dataIndex: "domainname",
      key: "domainname",
      render: (domainname, userpic) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src={userpic?.userpic}
            alt="Source"
            className="source-icon"
            style={{ width: "25px", height: "25px", borderRadius: "50%" }}
          />
          {domainname}
        </div>
      ),
    },
    {
      title: "NV Score",
      dataIndex: "nv_score",
      key: "nv_score",
      render: (nv_score) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={nvScoreIcon} alt="NV Score" />
          <span style={{ color: "#2f54eb", fontWeight: 600 }}>{nv_score}</span>
        </div>
      ),
    },
    {
      title: "News Article",
      key: "article",
      render: (_, record, index) => (
        <div className="row-content-wrapper">
          <Tooltip title={record.title}>
            <Paragraph ellipsis={{ rows: 1 }} className="article-ellipsis">
              {record.title}
            </Paragraph>
          </Tooltip>
          <div
            className="hover-icons"
            style={{
              visibility: hoveredRow === index ? "visible" : "hidden",
            }}
          >
            <Tooltip title="Email">
              <img src={SendEmailIcon} className="icon-action" />
            </Tooltip>
            <Tooltip
              title={
                isCopied?.flag && isCopied?.index === index ? "Copied" : "Copy"
              }
            >
              {isCopied?.flag && isCopied?.index === index ? (
                <CheckSquareOutlined className="icon-action" />
              ) : (
                <img
                  src={CopyIcon}
                  className="icon-action"
                  onClick={() => handleCopy(record, index)}
                />
              )}
            </Tooltip>
            <Tooltip title="Open in new tab">
              <a href={record.url} target="_blank" rel="noopener noreferrer">
                <img src={openPostIcon} className="icon-action" />
              </a>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  const handleCopy = (record, index) => {
    navigator.clipboard.writeText(record.title);
    setIsCopied({ flag: true, index: index });

    setTimeout(() => {
      setIsCopied({ flag: false, index: null });
    }, 2000);
  };
  // console.log("data =>", data);
  return (
    <>
      {typeof data === "string" ? (
        <>
          <div className="portlet__body " style={{ height: "450px" }}>
            <ErrorBoundary>
              <NoGraphData
                errorCode="No Data Found"
                isCommandCenterScreen={true}
              />
            </ErrorBoundary>
          </div>
        </>
      ) : data?.length === 0 ? (
        <div
          className="d-flex align-items-center"
          style={{
            justifyContent: "space-evenly",
            height: "450px",
          }}
        >
          <Spin
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 48,
                }}
                spin
              />
            }
          />
        </div>
      ) : (
        <>
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            rowKey="key"
            className="custom-table"
            onRow={(record, index) => ({
              onMouseEnter: () => setHoveredRow(index),
              onMouseLeave: () => setHoveredRow(null),
            })}
          />
        </>
      )}
    </>
  );
};

export default CustomTable;
