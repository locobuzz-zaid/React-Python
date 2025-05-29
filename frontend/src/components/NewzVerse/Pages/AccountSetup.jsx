import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Row,
  Table,
  Select,
  Popconfirm,
  Spin,
  Input,
  Tooltip,
  Skeleton,
} from "antd";
import SocialProfileModal from "./SocialProfileModal";
import LinkedInLogo from "../../../assets/Pages/linkedin_logo.svg";
import TwitterLogo from "../../../assets/Pages/twitter_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpConfig } from "../../../redux/actions/NewzVerse/NewzVerse";
import {
  createAccountAPI,
  deleteAccountSettingsBrandAPI,
  getAiEmailInfoAPI,
  getAiSocialProfiles,
  updateAccountSettingsAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import defaultProfileImage from "../../../assets/Pages/default_profile_img.png";
import useDebounce from "../../utils/useDebounce";
import editProfileIcon from "../../../assets/Pages/edit_profile_icon.svg";
import deleteProfileIcon from "../../../assets/Pages/delete_profile_icon.svg";
import dropDownArrowIcon from "../../../assets/Pages/drop_down_arrow_icon.svg";
import { getDynamicSvgIcons } from "../../../redux/constants/NewzVerseConst";
import "./pages.css";

const { Option } = Select;

export const AccountSetup = () => {
  const dispatch = useDispatch();
  const signUpConfig1 = useSelector(
    (state) => state?.NewzVerse?.sign_up_config
  );
  const signUpLoader = useSelector((state) => state?.NewzVerse?.sign_up_loader);
  const companyLoader = useSelector(
    (state) => state?.NewzVerse?.company_loader
  );
  const industryLoader = useSelector(
    (state) => state?.NewzVerse?.industry_loader
  );
  const linkedinHandleLoader = useSelector(
    (state) => state?.NewzVerse?.linkedin_handle_loader
  );
  const accountSettingsData = useSelector(
    (state) => state?.NewzVerse?.account_settings_data
  );
  // console.log("accountSettingsData", accountSettingsData);
  let p_token = localStorage.getItem("p_token");
  let signUpConfig = accountSettingsData?.sign_up_config?.length
    ? accountSettingsData?.sign_up_config
    : signUpConfig1;
  // console.log("signUpConfig", signUpConfig);

  let accountDataSource = [];
  accountSettingsData?.data_source?.map((a, i) => {
    let key = i + 1;
    let newObj = {
      key: key.toString(),
      company: {
        company: a?.brand_name,
        brand_logo: a?.brand_logo,
        brand_id: a?.brand_id,
      },
      brand_id: a?.brand_id,
      industry: a?.industry_name,
      industry_id: a?.industry_id,
      handles: [
        {
          type: "linkedin",
          data: a?.linkedin_accounts,
        },
        {
          type: "twitter",
          data: a?.twitter_accounts,
        },
      ],
      old_brand: true,
    };
    accountDataSource = [...accountDataSource, newObj];
  });
  // console.log("accountDataSource", accountDataSource);

  const initialDataSource = p_token
    ? accountDataSource
    : [
        {
          key: "1",
          company: signUpConfig?.[0]?.companies?.[0],
          industry: signUpConfig?.[0]?.industries?.[0],
          handles: [
            {
              type: "linkedin",
              data: signUpConfig?.[0]?.handles?.[0]?.data?.slice?.(0, 3),
            },
            {
              type: "twitter",
              data: signUpConfig?.[0]?.handles?.[1]?.data?.slice?.(0, 3),
            },
          ],
        },
      ];
  const [dataSource, setDataSource] = useState(initialDataSource);
  const [showSocialProfileModal, setShowSocialProfileModal] = useState(false);
  const [socialProfileKey, setSocialProfileKey] = useState(null);
  const [deleteProfileIconShow, setDeleteProfileIconShow] = useState({
    flag: false,
    key: null,
  });
  const [openSelectField, setOpenSelectField] = useState({
    flag: false,
    key: null,
  });

  let tmp_token = localStorage.getItem("tmp_token");

  const [companyNameText, setCompanyNameText] = useState({
    name: null,
    key: null,
  });
  const [alertMessage, setAlertMessage] = useState("");
  const debouncedUpdateTitle = useDebounce(companyNameText, 1000);

  useEffect(() => {
    if (debouncedUpdateTitle && companyNameText?.name?.length) {
      let payloadObj = {
        sign_up_config: signUpConfig,
        operation: -1,
        payload: {
          company_name: companyNameText?.name,
        },
        key: companyNameText?.key,
      };
      dispatch(getAiEmailInfoAPI(payloadObj));

      const newData = dataSource.map((item) =>
        item.key === companyNameText?.key
          ? {
              ...item,
              ["company"]: companyNameText?.name,
              industry: null,
              handles: [],
            }
          : item
      );
      setDataSource(newData);
    } else {
      if (debouncedUpdateTitle === "") {
        let payloadObj = {
          sign_up_config: signUpConfig,
          operation: -1,
          payload: {
            company_name: companyNameText?.name,
          },
          key: companyNameText?.key,
        };
        dispatch(getAiEmailInfoAPI(payloadObj));

        const newData = dataSource.map((item) =>
          item.key === companyNameText?.key
            ? {
                ...item,
                ["company"]: companyNameText?.name,
                industry: null,
                handles: [],
              }
            : item
        );
        setDataSource(newData);
      }
    }
  }, [debouncedUpdateTitle]);

  useEffect(() => {
    if (signUpConfig?.length && dataSource?.length) {
      const updatedDataSource = dataSource.map((item) => {
        const matched = signUpConfig?.find((conf) => conf?.key === item?.key);
        if (matched?.handles?.length) {
          return {
            ...item,
            handles: [
              {
                type: "linkedin",
                data:
                  matched.handles
                    ?.find((h) => h.type === "linkedin")
                    ?.data?.slice(0, 3) || [],
              },
              {
                type: "twitter",
                data:
                  matched.handles
                    ?.find((h) => h.type === "twitter")
                    ?.data?.slice(0, 3) || [],
              },
            ],
          };
        }
        return item;
      });

      setDataSource(updatedDataSource);
    }
  }, [signUpConfig]);

  const [options, setOptions] = useState([]);
  const onSearch = async (key, field, value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    setCompanyNameText({
      name: value,
      key: key,
    });

    setOpenSelectField({
      flag: true,
      key: key,
    });
  };

  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: "30%",
      render: (text, record) => (
        <>
          {companyLoader?.flag && companyLoader?.key === record?.key ? (
            <Spin
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "7px",
              }}
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 18,
                  }}
                  spin
                />
              }
            />
          ) : (
            <>
              <div className="select-wrapper1">
                <Select
                  disabled={p_token && record?.old_brand ? true : false}
                  open={
                    openSelectField?.flag &&
                    openSelectField?.key === record?.key
                  }
                  onDropdownVisibleChange={(visible) => {
                    setOpenSelectField({
                      flag: visible,
                      key: record.key,
                    });
                  }}
                  showSearch={record?.key === "1" ? false : true}
                  onSearch={(value) => onSearch(record.key, "company", value)}
                  // value={text?.company}
                  value={
                    text?.company
                      ? `${text?.company}|${text?.brand_logo}`
                      : null
                  }
                  style={{ width: "100%", marginLeft: "-20px" }}
                  onChange={(value) =>
                    handleChange(record.key, "company", value)
                  }
                  bordered={false}
                  suffixIcon={
                    <img
                      src={dropDownArrowIcon}
                      style={{ marginTop: "20px" }}
                    />
                  }
                  placeholder="Search Company"
                  className="account-setup-dropdown"
                  filterOption={false}
                  notFoundContent={
                    <div style={{ padding: "8px 0px", color: "#999" }}>
                      No companies found
                    </div>
                  }
                >
                  {signUpConfig?.[Number(record?.key) - 1]?.companies?.map(
                    (company, index) => (
                      <Option
                        key={index}
                        value={`${company?.company}|${company?.brand_logo}`}
                      >
                        <img
                          src={company?.brand_logo}
                          style={{
                            marginRight: "5px",
                            width: "23px",
                            height: "23px",
                            borderRadius: "50%",
                            border: "1px solid #E7ECF4",
                          }}
                        />{" "}
                        {company?.company}
                      </Option>
                    )
                  )}
                </Select>
              </div>
            </>
          )}
        </>
      ),
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      width: "30%",
      render: (text, record) => (
        <div className="select-wrapper">
          {industryLoader?.flag && industryLoader?.key === record?.key ? (
            <Spin
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "7px",
              }}
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 18,
                  }}
                  spin
                />
              }
            />
          ) : (
            <Select
              disabled={p_token && record?.old_brand ? true : false}
              value={text}
              style={{ width: "100%", marginLeft: "-15px" }}
              onChange={(value) => handleChange(record.key, "industry", value)}
              bordered={false}
              suffixIcon={
                <img src={dropDownArrowIcon} style={{ marginTop: "20px" }} />
              }
              placeholder="Select Industry"
              className="account-setup-dropdown"
              notFoundContent={
                <div style={{ padding: "8px 0px", color: "#999" }}>
                  No industries found
                </div>
              }
            >
              {signUpConfig?.[Number(record?.key) - 1]?.industries?.map(
                (industry) => (
                  <Option key={industry} value={industry}>
                    {industry}
                  </Option>
                )
              )}
            </Select>
          )}
        </div>
      ),
    },
    {
      title: "LinkedIn & X Handles",
      dataIndex: "handles",
      key: "handles",
      width: "40%",
      render: (handles, record) => (
        <Row
          style={{ marginLeft: "-20px" }}
          gutter={8}
          justify="space-between"
          align="middle"
        >
          <Col>
            <Row gutter={8}>
              {linkedinHandleLoader?.flag &&
              linkedinHandleLoader?.key === record?.key ? (
                <>
                  <div style={{ display: "flex" }}>
                    <Spin
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "30px",
                      }}
                      size="small"
                    />
                    <p className="account-handle-text">
                      This usually takes a minute or two.
                      <br /> Thanks for your patience!
                    </p>
                  </div>

                  {/* Old Loader */}
                  {/* <div style={{ display: "flex" }}>
                    <Skeleton.Button
                      active={true}
                      style={{
                        width: "95px",
                        borderRadius: "8px",
                        marginLeft: "20px",
                      }}
                    />
                    <Skeleton.Button
                      active={true}
                      style={{
                        width: "95px",
                        borderRadius: "8px",
                        marginLeft: "22px",
                      }}
                    />
                  </div> */}
                </>
              ) : (
                <>
                  {handles.map((handle, index) => (
                    <Col key={index}>
                      {handle?.data?.length ? (
                        <div
                          style={{
                            background:
                              deleteProfileIconShow?.flag &&
                              deleteProfileIconShow?.key === record?.key
                                ? "#E7ECF4"
                                : "",
                          }}
                          className="profile-icons-div"
                        >
                          {handle?.type === "linkedin" ? (
                            <img
                              src={LinkedInLogo}
                              width={18}
                              height={18}
                              style={{ marginTop: "2px" }}
                            />
                          ) : handle?.type === "twitter" ? (
                            <img
                              src={TwitterLogo}
                              width={18}
                              height={18}
                              style={{ marginTop: "2px" }}
                            />
                          ) : (
                            ""
                          )}

                          {handle?.data?.map((image, idx) => (
                            <>
                              {handle?.type === "linkedin" ? (
                                <>
                                  {idx < 3 && (
                                    <div className="avatar-group">
                                      <img
                                        key={idx}
                                        src={
                                          image?.is_company &&
                                          image?.logos?.[0]?.url !== "" &&
                                          image?.logos?.[0]?.url !== "NA" &&
                                          image?.logos?.[0]?.url !== null &&
                                          image?.logos?.[0]?.url
                                            ? image?.logos?.[0]?.url
                                            : image?.profilePicture !== "" &&
                                              image?.profilePicture !== "NA" &&
                                              image?.profilePicture !== null &&
                                              image?.profilePicture
                                            ? image?.profilePicture
                                            : defaultProfileImage
                                        }
                                        alt={handle.type}
                                        style={{
                                          marginLeft:
                                            idx === 1
                                              ? "-15px"
                                              : idx === 2
                                              ? "-15px"
                                              : "0px",
                                        }}
                                      />
                                    </div>
                                  )}
                                </>
                              ) : handle?.type === "twitter" ? (
                                <>
                                  {idx < 3 && (
                                    <div className="avatar-group">
                                      <img
                                        key={idx}
                                        src={
                                          image?.profile_image_url !== "" &&
                                          image?.profile_image_url !== "NA" &&
                                          image?.profile_image_url !== null &&
                                          image?.profile_image_url
                                            ? image?.profile_image_url
                                            : defaultProfileImage
                                        }
                                        alt={handle.type}
                                        style={{
                                          marginLeft:
                                            idx === 1
                                              ? "-15px"
                                              : idx === 2
                                              ? "-15px"
                                              : "0px",
                                        }}
                                      />
                                    </div>
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </Col>
                  ))}
                </>
              )}
            </Row>
          </Col>
          <Col>
            {/* Edit Profile Icon */}
            {record?.handles?.[0]?.data?.length ||
            record?.handles?.[1]?.data?.length ? (
              <>
                <img
                  src={editProfileIcon}
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() => handleEditProfilesPopUp(record)}
                />
              </>
            ) : (
              ""
            )}

            {/* Delete Icon (Always Rendered, Visibility Controlled by CSS) */}
            {dataSource?.length > 1 && record?.key !== "1" ? (
              <div className="delete-icon-wrapper">
                <Popconfirm
                  disabled={dataSource?.length > 1 ? false : true}
                  title="Are you sure you want to delete this company?"
                  onConfirm={() => handleDeleteProfile(record.key)}
                  okText="Yes"
                  cancelText="No"
                  // popupClassName="custom-popconfirm"
                >
                  <img src={deleteProfileIcon} className="delete-icon" />
                </Popconfirm>
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
      ),
    },
  ];

  const handleOnMouseEnter = (key) => {
    setDeleteProfileIconShow({ flag: true, key });
  };

  const handleOnMouseLeave = (key) => {
    setDeleteProfileIconShow({ flag: false, key });
  };

  const handleChange = (key, field, value, brand_logo) => {
    // console.log("key =>", key, "field =>", field, "value =>", value);
    if (field === "company") {
      const [brand_name, brand_logo] = value.split("|");
      const newData = dataSource.map((item) =>
        item.key === key
          ? {
              ...item,
              [field]: { company: brand_name, brand_logo: brand_logo },
              handles: [],
            }
          : item
      );
      setDataSource(newData);
    } else {
      const newData = dataSource.map((item) =>
        item.key === key
          ? {
              ...item,
              [field]: value,
              handles: [],
            }
          : item
      );
      setDataSource(newData);
    }

    if (field === "company") {
      if (key === "111") {
        let payloadObj = {
          sign_up_config: signUpConfig,
          operation: 2,
          payload: {
            company_name: value,
          },
          key: key,
        };
        dispatch(getAiEmailInfoAPI(payloadObj));
      } else {
        // setCompanyNameText({
        //   name: value,
        //   key: key,
        // });

        let payloadObj = {
          sign_up_config: signUpConfig,
          operation: 2,
          payload: {
            company_name: value,
          },
          key: key,
        };
        dispatch(getAiEmailInfoAPI(payloadObj));

        setOpenSelectField({
          flag: false,
          key: null,
        });
      }
    } else if (field === "industry") {
      let selectedDataSource = dataSource?.find((d) => d?.key === key);
      // console.log(selectedDataSource, "dataSource", dataSource);

      let payloadObj2 = {
        sign_up_config: signUpConfig,
        brand_name: selectedDataSource?.company,
        industry_name: value,
        channel: [1, 5],
        key: key,
      };
      dispatch(getAiSocialProfiles(payloadObj2));

      // Reset Company Name
      setCompanyNameText({
        name: null,
        key: null,
      });
    }
  };

  const handleAddCompany = () => {
    const newKey = String(dataSource.length + 1);
    const newCompany = {
      key: newKey,
      company: null,
      industry: null,
      handles: [],
    };
    setDataSource([...dataSource, newCompany]);

    let obj = {
      key: newKey,
      companies: null,
      industries: [],
      handles: [],
    };
    let ary = [...signUpConfig, obj];
    dispatch(setSignUpConfig(ary));
  };

  const handleEditProfilesPopUp = (record) => {
    setShowSocialProfileModal(true);
    setSocialProfileKey(record?.key);
  };

  const handleDeleteProfile = (key) => {
    setAlertMessage("");

    if (p_token) {
      const deletedBrand = dataSource.filter((item) => item.key === key);

      if (deletedBrand?.[0]?.old_brand) {
        let payloadObj = {
          p_token: p_token,
          brand_list: deletedBrand,
        };
        dispatch(deleteAccountSettingsBrandAPI(payloadObj));
      }

      // Filter out the deleted item
      const updatedData = dataSource.filter((item) => item.key !== key);
      const updatedConfig = signUpConfig.filter((item) => item.key !== key);

      // Reassign keys (starting from 1)
      const reIndexedData = updatedData.map((item, index) => ({
        ...item,
        key: String(index + 1),
      }));

      const reIndexedConfig = updatedConfig.map((item, index) => ({
        ...item,
        key: String(index + 1),
      }));

      // Update state
      setDataSource(reIndexedData);
      dispatch(setSignUpConfig(reIndexedConfig));
    } else {
      // Filter out the deleted item
      const updatedData = dataSource.filter((item) => item.key !== key);
      const updatedConfig = signUpConfig.filter((item) => item.key !== key);

      // Reassign keys (starting from 1)
      const reIndexedData = updatedData.map((item, index) => ({
        ...item,
        key: String(index + 1),
      }));

      const reIndexedConfig = updatedConfig.map((item, index) => ({
        ...item,
        key: String(index + 1),
      }));

      // Update state
      setDataSource(reIndexedData);
      dispatch(setSignUpConfig(reIndexedConfig));
    }
  };

  const hasDuplicateCompany = (data) => {
    const seen = new Set();

    for (const item of data) {
      const companyName = item.company?.company;
      if (!companyName) continue;

      if (seen.has(companyName)) {
        return true; // Duplicate found
      }

      seen.add(companyName);
    }

    return false; // No duplicates
  };

  const handleCreateAccount = () => {
    let duplicateCompany = hasDuplicateCompany(dataSource);
    if (duplicateCompany) {
      setAlertMessage("Duplicate company name not allowed");
    } else {
      let brand_list = [];
      dataSource?.map((d, i) => {
        let newObj = {
          brand_name: d?.company,
          industry_name: d?.industry,
          linkedin_profiles: d?.handles?.[0]?.data,
          twitter_profiles: d?.handles?.[1]?.data,
          brand_profile_list: signUpConfig[i],
        };
        brand_list = [...brand_list, newObj];
      });
      // console.log("brand_list", brand_list);

      let payloadObj = {
        tmp_token: tmp_token ? tmp_token : null,
        brand_list: brand_list,
      };
      dispatch(createAccountAPI(payloadObj));
    }
  };

  const handleUpdateAccount = () => {
    let brand_list = [];
    dataSource?.map((d, i) => {
      let newObj = {
        brand_name: d?.company,
        brand_id: d?.brand_id,
        industry_name: d?.industry,
        industry_id: d?.industry_id,
        linkedin_profiles: d?.handles?.[0]?.data,
        twitter_profiles: d?.handles?.[1]?.data,
        brand_profile_list: signUpConfig[i],
      };
      brand_list = [...brand_list, newObj];
    });
    // console.log("brand_list", brand_list);

    let payloadObj = {
      p_token: p_token ? p_token : null,
      brand_list: brand_list,
    };
    dispatch(updateAccountSettingsAPI(payloadObj));
  };

  return (
    <div className="frame">
      <div className="content-wrapper">
        {p_token ? (
          <>
            <p
              className="content-wrapper-heading"
              style={{ marginTop: "-100px", textAlign: "left" }}
            >
              Account Set Up
            </p>
            <p
              className="content-wrapper-sub-heading"
              style={{ paddingLeft: "0px", textAlign: "left" }}
            >
              Use our suggested alerts to get started or create your own to
              track what matters most.
            </p>{" "}
          </>
        ) : (
          <>
            <p className="content-wrapper-heading">Account Set Up</p>
            <p className="content-wrapper-sub-heading">
              Powered by AI, NewzVerse intelligently filters out noise and
              surfaces only <br /> the most relevant updates for the companies
              you choose to track
            </p>
          </>
        )}

        <p className="content-wrapper-para">
          ({dataSource?.length} out of 5 companies added)
        </p>
        <div className="table-wrapper">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
            onRow={(record) => ({
              onMouseEnter: () => handleOnMouseEnter(record.key),
              onMouseLeave: () => handleOnMouseLeave(record.key),
            })}
            rowClassName={() => "hover-row"}
          />

          {dataSource[dataSource?.length - 1]?.handles?.length &&
          dataSource?.length < 5 ? (
            <div className="add-company" onClick={handleAddCompany}>
              {getDynamicSvgIcons(
                "add_company_plus_icon",
                "#1657C8",
                "16",
                "16"
              )}{" "}
              Company
            </div>
          ) : (
            <Tooltip title="Please select linkedin and twitter handles">
              <div className="add-company-disabled">
                {getDynamicSvgIcons(
                  "add_company_plus_icon",
                  "#D3D3D3",
                  "16",
                  "16"
                )}
                Company
              </div>
            </Tooltip>
          )}
        </div>
        {alertMessage && <div className="shake-alert">{alertMessage}</div>}

        <Button
          disabled={
            signUpLoader
              ? true
              : dataSource[dataSource?.length - 1]?.handles?.length
              ? false
              : true
          }
          loading={signUpLoader ? true : false}
          className="sign_up_launch_btn"
          onClick={p_token ? handleUpdateAccount : handleCreateAccount}
        >
          {p_token ? "Update Account Set Up" : "Launch NewzVerse"}
        </Button>
      </div>

      {showSocialProfileModal ? (
        <SocialProfileModal
          isModalOpen={showSocialProfileModal}
          setShowSocialProfileModal={setShowSocialProfileModal}
          socialProfileKey={socialProfileKey}
          dataSource={dataSource}
          setDataSource={setDataSource}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AccountSetup;
