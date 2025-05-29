import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Typography, Card, Avatar, Space, Spin, Image } from "antd";
import openPostIcon from "../../../assets/Dashboard/open_post_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardDeepDiveLevel,
  setDashboardsData,
} from "../../../redux/actions/NewzVerse/NewzVerse";
import { LoadingOutlined } from "@ant-design/icons";
import defaultProfileImage from "../../../assets/Pages/default_profile_img.png";
import twitterVerifiedIcon from "../../../assets/Dashboard/twitter_verified_icon.png";
import moment from "moment";
import nvScoreIcon from "../../../assets/Dashboard/nv_score_icon.svg";
import {
  parseAttachmentsXMLToElements,
  formatRelativeTime,
} from "../../../redux/constants/index";
import dividerIcon from "../../../assets/Dashboard/divider_icon.svg";

const { Title, Text, Paragraph, Link } = Typography;

export const ExpandableParagraph = ({ description, content }) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const paragraphRef = useRef(null);

  const text = description || content;

  useEffect(() => {
    const element = paragraphRef.current;
    if (element) {
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * 3; // 3 lines
      if (element.scrollHeight > maxHeight) {
        setShowToggle(true);
      }
    }
  }, [text]);

  return (
    <div>
      <p
        ref={paragraphRef}
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "unset" : 3,
          marginBottom: "0px",
        }}
      >
        {text}
      </p>
      {showToggle && (
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read less" : "Read more"}
        </span>
      )}
    </div>
  );
};

const HighVelocityNews = ({
  description,
  avatar,
  name,
  handle,
  content,
  interactions,
  isHoveredHighVelocity,
  setIsHoveredHighVelocity,
  index,
  userpic,
  authorname,
  screenname,
  authorisverified,
  url,
  createddate,
  numlikescount,
  numcommentscount,
  impact_score,
  ai_profiles,
  attachmentxml,
  attachmentXML,
  type,
  title,
  brandid,
}) => {
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  const mediaElements = parseAttachmentsXMLToElements(
    attachmentxml ? attachmentxml : attachmentXML
  );

  const formatedDate = formatRelativeTime(createddate);

  let brand_obj = dashboardBrandsList.find(
    (brand) => brand.brand_id === brandid
  );

  return (
    <Card
      style={{
        backgroundColor:
          isHoveredHighVelocity?.flag && isHoveredHighVelocity?.index === index
            ? "#F5F7FA"
            : "white",
        borderRadius: "0px",
        border: "0px 0px 1px 0px solid #f0f0f0",
      }}
      onMouseEnter={() =>
        setIsHoveredHighVelocity({ flag: true, index: index })
      }
      onMouseLeave={() =>
        setIsHoveredHighVelocity({ flag: false, index: null })
      }
    >
      <Row gutter={8} align="middle">
        <Col>
          <Image
            style={{
              height: "35px",
              border: "1px solid lightgrey",
              borderRadius: "20px",
            }}
            src={userpic ? userpic : avatar}
            preview={false}
          />
        </Col>
        <Col flex="auto">
          <Text strong>{authorname ? authorname : name}</Text>{" "}
          {type === "twitter" && authorisverified ? (
            <img src={twitterVerifiedIcon} />
          ) : type === "linkedin" && authorisverified ? (
            <Image
              width={12}
              height={12}
              src="https://c.animaapp.com/Uu4MYRyd/img/image-7-5@2x.png"
              preview={false}
            />
          ) : (
            ""
          )}
          <Text type="secondary"> {screenname}</Text>
          <Text
            type="secondary"
            style={{ marginLeft: "10px", fontSize: "12px" }}
          >
            <span style={{ color: "grey" }}>•</span>
            {formatedDate}
          </Text>
          {/* On Hover icons */}
          {isHoveredHighVelocity?.flag &&
            isHoveredHighVelocity?.index === index && (
              <Space style={{ marginLeft: "auto", float: "right" }}>
                <span key={index} style={{ cursor: "pointer" }}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <img src={openPostIcon} />
                  </a>
                </span>
              </Space>
            )}
        </Col>
      </Row>
      <ExpandableParagraph description={description} content={content} />
      {/* <Paragraph>{description ? description : content}</Paragraph> */}

      {/* Attachment  */}
      <div
        className="attachments-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {mediaElements.map((html, idx) => (
          <div key={idx} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </div>

      {/* Enagements stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Row gutter={16} align="middle">
          <Col>
            <Image
              width={14}
              height={14}
              src="https://c.animaapp.com/Uu4MYRyd/img/favorite-border-3.svg"
              preview={false}
            />
            <Text style={{ marginLeft: "5px", fontSize: "12px" }}>
              {numlikescount}
            </Text>
          </Col>
          <Col>
            <Image
              width={14}
              height={14}
              src="https://c.animaapp.com/Uu4MYRyd/img/mode-comment-3.svg"
              preview={false}
            />
            <Text style={{ marginLeft: "5px", fontSize: "12px" }}>
              {numcommentscount}
            </Text>
          </Col>
          <img src={dividerIcon} style={{ margin: "0 0px" }} />
          <Col>
            <img style={{ width: "16px" }} src={nvScoreIcon} />
            <Text style={{ marginLeft: "5px", fontSize: "12px" }}>
              {impact_score}
            </Text>
          </Col>
        </Row>

        <div
          style={{
            border: "1px solid #f0f0fa",
            padding: "2px 8px 5px 8px",
            borderRadius: "12px",
          }}
        >
          <img
            src={brand_obj?.brand_logo}
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              marginRight: "5px",
            }}
            alt="brand logo"
          />
          <span style={{ fontSize: "10px", color: "#222" }}>
            {brand_obj?.brand_name}
          </span>
        </div>
      </div>
    </Card>
  );
};
export default HighVelocityNews;
