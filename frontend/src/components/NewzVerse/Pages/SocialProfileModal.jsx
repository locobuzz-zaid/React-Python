import React, { useState } from "react";
import {
  Spin,
  Modal,
  Typography,
  Avatar,
  Button,
  Space,
  Input,
  Popover,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  PlusOutlined,
  LoadingOutlined,
  CopyOutlined,
  UserOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import LinkedInIcon from "../../../assets/Pages/linkedin_pop_up_icon.svg";
import TwitterIcon from "../../../assets/Pages/twitter_pop_up_icon.svg";
import defaultProfileImage from "../../../assets/Pages/default_profile_img.png";
import { kFormatter } from "../../../redux/constants";
import twitterVerifiedIcon from "../../../assets/Pages/twitter_verified_icon.png";
import linkedinVerifiedIcon from "../../../assets/Pages/linkedin_verified_icon.png";
import {
  createLinkedinProfileAPI,
  createTwitterProfileAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import { setSignUpConfig } from "../../../redux/actions/NewzVerse/NewzVerse";
import "./SocialProfileModal.css";

const { Title, Text } = Typography;
const RecommendationPill = ({
  firstName,
  lastName,
  profilePicture,
  profile_image_url,
  username,
  public_metrics,
  verified,
  linkedinVerified,
  position,
  avatar,
  name,
  description,
  isSelected,
  onClick,
  type,
  selectedItems,
  followerCount,
  manual_linkedin_url,
  manual_twitter_url,
  socialProfileKey,
  setSelectedItems,
  connectionCount,
  is_company,
  logos,
  index,
}) => {
  const dispatch = useDispatch();
  const signUpConfig1 = useSelector(
    (state) => state?.NewzVerse?.sign_up_config
  );
  const accountSettingsData = useSelector(
    (state) => state?.NewzVerse?.account_settings_data
  );
  let signUpConfig = accountSettingsData?.sign_up_config?.length
    ? accountSettingsData?.sign_up_config
    : signUpConfig1;

  const deleteProfileHandle = (username, type) => {
    let updatedArray = signUpConfig?.map((config) => {
      if (config?.key === socialProfileKey) {
        config?.handles?.map((h) => {
          if (h?.data) {
            h.data = h?.data?.filter((item) => item.username !== username);
          }
          return h;
        });
        return config;
      }
    });

    dispatch(setSignUpConfig(updatedArray));
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const profileCardContent = (
    <div style={{ width: 260, padding: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <img
            style={{ width: "30px", height: "30px", borderRadius: "20px" }}
            src={
              type === "Linkedin" && is_company
                ? logos?.[0]?.url !== "" &&
                  logos?.[0]?.url !== "NA" &&
                  logos?.[0]?.url !== null &&
                  logos?.[0]?.url
                  ? logos?.[0]?.url
                  : defaultProfileImage
                : type === "Linkedin"
                ? profilePicture !== "" &&
                  profilePicture !== "NA" &&
                  profilePicture !== null &&
                  profilePicture
                  ? profilePicture
                  : defaultProfileImage
                : profile_image_url !== "" &&
                  profile_image_url !== "NA" &&
                  profile_image_url !== null &&
                  profile_image_url
                ? profile_image_url
                : defaultProfileImage
            }
          />
          <div>
            <Text strong style={{ display: "block" }}>
              {type === "Linkedin" && is_company
                ? name
                : type === "Linkedin"
                ? firstName + " " + lastName
                : username}{" "}
              {type === "Linkedin" && linkedinVerified ? (
                <img src={twitterVerifiedIcon} />
              ) : type === "Twitter" && verified ? (
                <img src={twitterVerifiedIcon} />
              ) : (
                ""
              )}
            </Text>
            <Text type="secondary">
              {type === "Linkedin" ? position?.title : ""}
            </Text>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <Text strong>
          {type === "Twitter"
            ? kFormatter(public_metrics?.followers_count)
            : kFormatter(followerCount)}
        </Text>{" "}
        <Text type="secondary">Followers</Text>{" "}
        <Text strong>
          {type === "Twitter"
            ? kFormatter(public_metrics?.following_count)
            : kFormatter(connectionCount)}
        </Text>{" "}
        <Text type="secondary">Following</Text>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        content={profileCardContent}
        placement="right"
        mouseEnterDelay={0.2}
      >
        <div
          className={`recommendation-pill ${isSelected ? "selected" : ""}`}
          onClick={onClick}
        >
          <Avatar
            src={
              type === "Linkedin" && is_company
                ? logos?.[0]?.url !== "" &&
                  logos?.[0]?.url !== "NA" &&
                  logos?.[0]?.url !== null &&
                  logos?.[0]?.url
                  ? logos?.[0]?.url
                  : defaultProfileImage
                : type === "Linkedin"
                ? profilePicture !== "" &&
                  profilePicture !== "NA" &&
                  profilePicture !== null &&
                  profilePicture
                  ? profilePicture
                  : defaultProfileImage
                : profile_image_url !== "" &&
                  profile_image_url !== "NA" &&
                  profile_image_url !== null &&
                  profile_image_url
                ? profile_image_url
                : defaultProfileImage
            }
            size={25}
          />
          <div className="recommendation-text">
            <Text className="recommendation-text-title" strong>
              {type === "Linkedin" && is_company
                ? name
                : type === "Linkedin"
                ? firstName + " " + lastName
                : username}{" "}
              {type === "Linkedin" && linkedinVerified ? (
                <img src={twitterVerifiedIcon} />
              ) : type === "Twitter" && verified ? (
                <img src={twitterVerifiedIcon} />
              ) : (
                ""
              )}
            </Text>
            {type === "Linkedin" ? (
              <Text
                className="recommendation-text-description"
                type="secondary"
              >
                {position?.title}
              </Text>
            ) : (
              <Text
                className="recommendation-text-description"
                type="secondary"
              >
                {kFormatter(public_metrics?.followers_count)} Followers
              </Text>
            )}
          </div>
        </div>
      </Popover>
      {manual_linkedin_url ? (
        <span
          className="recommendation-pill-delete-profile-icon"
          onClick={() => deleteProfileHandle(username, type)}
        >
          <MinusOutlined
            style={{
              // marginLeft: "6px",
              // marginTop: "-2px",
              width: "10px",
            }}
          />
        </span>
      ) : manual_twitter_url ? (
        <span
          className="recommendation-pill-delete-profile-icon"
          onClick={() => deleteProfileHandle(username, type)}
        >
          <MinusOutlined
            style={{
              // marginLeft: "6px",
              // marginTop: "-2px",
              width: "10px",
            }}
          />
        </span>
      ) : (
        ""
      )}
    </>
  );
};

const SocialSection = ({
  icon,
  title,
  subtitle,
  items,
  selectedItems,
  setSelectedItems,
  type,
  socialProfileKey,
}) => {
  const dispatch = useDispatch();
  const signUpConfig1 = useSelector(
    (state) => state?.NewzVerse?.sign_up_config
  );
  const linkedinHandleLoader = useSelector(
    (state) => state?.NewzVerse?.linkedin_handle_loader
  );
  const twitterHandleLoader = useSelector(
    (state) => state?.NewzVerse?.twitter_handle_loader
  );
  const accountSettingsData = useSelector(
    (state) => state?.NewzVerse?.account_settings_data
  );
  let signUpConfig = accountSettingsData?.sign_up_config?.length
    ? accountSettingsData?.sign_up_config
    : signUpConfig1;

  const [profileURL, setProfileURL] = useState(null);
  const [enabledInput, setEnabledInput] = useState(false);

  let p_token = localStorage.getItem("p_token");

  const handleAddSocialProfileIcon = () => {
    setEnabledInput(true);
  };
  const handleProfileURL = (e) => {
    setProfileURL(e?.target?.value);
  };
  const handleEditedChatNameAPICall = (event, type) => {
    if (event.key === "Enter" || event.key === undefined) {
      setEnabledInput(false);
      if (profileURL === "" || profileURL === null) {
        // Do nothing
      } else {
        if (type === "Linkedin") {
          let payloadObj = {
            p_token: p_token ? p_token : null,
            sign_up_config: signUpConfig,
            key: socialProfileKey,
            type: "linkedin",
            linkedin_url: profileURL,
          };
          dispatch(createLinkedinProfileAPI(payloadObj));
        } else if (type === "Twitter") {
          let payloadObj = {
            p_token: p_token ? p_token : null,
            sign_up_config: signUpConfig,
            key: socialProfileKey,
            type: "twitter",
            twitter_handle: profileURL,
          };
          dispatch(createTwitterProfileAPI(payloadObj));
        }
        setProfileURL(null);
      }
    }
  };

  const batchSize = 7; // Number of items to show at a time
  const [currentPage, setCurrentPage] = useState(0); // Track which batch is shown

  // ----- Core Logic -----
  const selectedUsernames = selectedItems.map((d) => d?.id);
  const nonSelectedItems = items.filter(
    (item) => !selectedUsernames.includes(item?.id)
  );

  const remainingSlots = 10 - selectedItems.length;
  const currentBatch = nonSelectedItems.slice(
    currentPage * batchSize,
    currentPage * batchSize + remainingSlots
  );

  const finalItems = [...selectedItems, ...currentBatch];

  const handleRefresh = () => {
    const totalPages = Math.ceil(nonSelectedItems.length / batchSize);
    if (totalPages > 0) {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }
  };

  const [alertMessage, setAlertMessage] = useState("");
  const handlePillClick = (item) => {
    const alreadySelected = selectedItems.find((d) => d?.id === item.id);

    if (alreadySelected) {
      setSelectedItems(selectedItems.filter((d) => d?.id !== item.id));
      setAlertMessage(""); // clear any previous message
    } else if (selectedItems.length < 3) {
      setSelectedItems([...selectedItems, item]);
      setAlertMessage(""); // clear any previous message
    } else {
      setAlertMessage("Deselect some recommendations to select new ones");
    }
  };

  return (
    <div className="social-section">
      <Space
        className="section-header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex" }}>
          <img src={icon} className="section-icon" />
          <div>
            <Text strong>{title}</Text>
            <Text type="secondary" italic>
              {subtitle}
            </Text>
          </div>
        </div>
        {items?.length > 10 ? (
          <Text
            onClick={() => handleRefresh(type)}
            strong
            style={{ float: "right", cursor: "pointer", color: "#1657C8" }}
          >
            Shuffle
          </Text>
        ) : (
          ""
        )}
      </Space>

      {alertMessage && <div className="shake-alert">{alertMessage}</div>}

      <div className="recommendation-list">
        {finalItems?.map((item, idx) => (
          <>
            <RecommendationPill
              key={item.id || idx}
              {...item}
              isSelected={selectedUsernames.includes(item.id)}
              onClick={() => handlePillClick(item)}
              type={type}
              selectedItems={selectedItems}
              socialProfileKey={socialProfileKey}
              setSelectedItems={setSelectedItems}
              index={idx}
            />
          </>
        ))}
        <div className="recommendation-pill1 add-pill">
          {type === "Linkedin" && linkedinHandleLoader?.flag ? (
            <div className="recommendation-pill-loader">
              <Avatar src={defaultProfileImage} size={25} />
              <div className="recommendation-text">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 20,
                        marginRight: "15px",
                      }}
                      spin
                    />
                  }
                />
              </div>
            </div>
          ) : type === "Twitter" && twitterHandleLoader?.flag ? (
            <div className="recommendation-pill-loader">
              <Avatar src={defaultProfileImage} size={25} />
              <div className="recommendation-text">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 20,
                        marginRight: "15px",
                      }}
                      spin
                    />
                  }
                />
              </div>
            </div>
          ) : enabledInput ? (
            <span style={{ display: "flex" }}>
              <Input
                prefix={
                  <CopyOutlined
                    style={{
                      color: "#999",
                      marginLeft: "5px",
                      marginRight: "10px",
                    }}
                  />
                }
                placeholder={`${type} Profile URL`}
                value={profileURL}
                className="recommendation-pill-input"
                onChange={handleProfileURL}
                onKeyDown={(e) => handleEditedChatNameAPICall(e, type)}
              />
              <span
                className="recommendation-pill-input-close-icon"
                onClick={() => setEnabledInput(false)}
              >
                <MinusOutlined
                  style={{
                    marginLeft: "6px",
                    marginTop: "-2px",
                    width: "10px",
                  }}
                />
              </span>
            </span>
          ) : (
            <Avatar
              style={{ background: "#fff", border: "1px solid #e8e8e8" }}
              onClick={handleAddSocialProfileIcon}
              icon={<PlusOutlined style={{ color: "#94A3B8" }} />}
              size={45}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const SocialProfileModal = ({
  isModalOpen,
  setShowSocialProfileModal,
  socialProfileKey,
  dataSource,
  setDataSource,
}) => {
  const signUpConfig1 = useSelector(
    (state) => state?.NewzVerse?.sign_up_config
  );
  const accountSettingsData = useSelector(
    (state) => state?.NewzVerse?.account_settings_data
  );
  let signUpConfig = accountSettingsData?.sign_up_config?.length
    ? accountSettingsData?.sign_up_config
    : signUpConfig1;

  let p_token = localStorage.getItem("p_token");

  const [selectedLinkedIn, setSelectedLinkedIn] = useState(
    dataSource?.[Number(socialProfileKey - 1)]?.handles?.[0]?.data
  );
  const [selectedTwitter, setSelectedTwitter] = useState(
    dataSource?.[Number(socialProfileKey - 1)]?.handles?.[1]?.data
  );

  const linkedinRecommendations = signUpConfig?.[Number(socialProfileKey - 1)]
    ?.handles?.[0]?.data
    ? signUpConfig?.[Number(socialProfileKey - 1)]?.handles?.[0]?.data
    : [];

  const xRecommendations = signUpConfig?.[Number(socialProfileKey - 1)]
    ?.handles?.[1]?.data
    ? signUpConfig?.[Number(socialProfileKey - 1)]?.handles?.[1]?.data
    : [];

  const handleCancel = () => {
    setShowSocialProfileModal(false);
  };

  // Save Function
  const handleSaveSocialProfile = () => {
    let updatedDatasource = dataSource?.map((d) => {
      if (d?.key === socialProfileKey) {
        d.handles[0].data = selectedLinkedIn;
        d.handles[1].data = selectedTwitter;
      }
      return d;
    });
    setDataSource(updatedDatasource);
    setShowSocialProfileModal(false);
  };

  return (
    <>
      <Modal
        centered
        className="social_profile_container"
        open={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        styles={{ header: { borderBottom: "none" } }}
        footer={false}
        style={{ marginTop: p_token ? "60px" : "" }}
      >
        <div className="sr-container" id="style-1">
          <Title level={4}>Linkedin &amp; X Handles</Title>
          <Text className="description">
            We've done the heavy lifting! Here are some key profiles &amp;
            handles we recommend tracking! Feel free to adjust or add your own.
          </Text>

          {/* LinkedIn */}
          <SocialSection
            icon={LinkedInIcon}
            title="Linkedin Recommendations "
            subtitle={`(${selectedLinkedIn?.length}/3 Selected)`}
            items={linkedinRecommendations}
            selectedItems={selectedLinkedIn}
            setSelectedItems={setSelectedLinkedIn}
            type="Linkedin"
            socialProfileKey={socialProfileKey}
          />

          {/* Twitter */}
          <SocialSection
            icon={TwitterIcon}
            title="X Recommendations "
            subtitle={`(${selectedTwitter?.length}/3 Selected)`}
            items={xRecommendations}
            selectedItems={selectedTwitter}
            setSelectedItems={setSelectedTwitter}
            type="Twitter"
            socialProfileKey={socialProfileKey}
          />

          <div className="save-button-divider"></div>
        </div>
        <Button
          disabled={
            selectedLinkedIn?.length === 0
              ? true
              : selectedTwitter?.length === 0
              ? true
              : false
          }
          className="save-button"
          onClick={handleSaveSocialProfile}
        >
          Save
        </Button>
      </Modal>
    </>
  );
};

export default SocialProfileModal;
