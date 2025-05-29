import React, { useState, useEffect } from "react";
import { Dropdown, Radio, Checkbox, Button, Popover, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardsData } from "../../../redux/actions/NewzVerse/NewzVerse";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardDataAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import dropDownArrowIcon from "../../../assets/Pages/drop_down_arrow_icon.svg";

const CompBrandSelector = () => {
  const dispatch = useDispatch();

  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );

  let p_token = localStorage.getItem("p_token");

  const aggregatedDashboardBrandsList = [...(dashboardBrandsList || [])];

  const [selectedCompanyBrand, setSelectedCompanyBrand] = useState({
    brand_id: dashboardsData?.[dashboardActiveKey]?.selected_brands?.brand_id,
    brand_name:
      dashboardsData?.[dashboardActiveKey]?.selected_brands?.brand_name,
  });
  const [selectedCompBrands, setSelectedCompBrands] = useState(
    dashboardsData?.[dashboardActiveKey]?.selected_comp_brands?.length
      ? dashboardsData?.[dashboardActiveKey]?.selected_comp_brands
      : []
  );

  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const allBrands = aggregatedDashboardBrandsList || [];

  // useEffect(() => {
  //   if (selectedCompBrands?.length) {
  //     setSelectedCompBrands(selectedCompBrands);
  //   } else {
  //     setSelectedCompBrands(allBrands);
  //   }
  // }, [aggregatedDashboardBrandsList]);

  const handleBrandChange = (selectedIds) => {
    const selectedObjects = allBrands.filter((brand) =>
      selectedIds.includes(brand.brand_id)
    );
    setSelectedCompBrands(selectedObjects);
  };

  const handleDeselectAll = () => {
    setSelectedCompBrands([]);
  };

  const handleDone = () => {
    setVisible(false);

    let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
      if (dashboard?.dashboard_type === 2) {
        // dashboard.key = index + 1;
        // dashboard.title = d?.dashboard_name;
        // dashboard.duration = {
        //   start_date: start_date,
        //   end_date: end_date,
        // };
        // dashboard.dashboard_type = d?.dashboard_type;
        dashboard.selected_brands =
          dashboardsData?.[dashboardActiveKey]?.selected_brands;
        dashboard.selected_comp_brands =
          dashboardsData?.[dashboardActiveKey]?.selected_comp_brands;
        dashboard.dashboard_filters = [];
        dashboard.selected_theme_data = null;
        dashboard.selected_cluster_data = null;
        dashboard.key_news = [];
        dashboard.key_news_list = [];
        dashboard.high_velocity_news = [];
        dashboard.themes_list = [];
        dashboard.linkedin_news = [];
        dashboard.twitter_news = [];
        dashboard.curated_linkedin_news = [];
        dashboard.curated_twitter_news = [];
        dashboard.analytics_sections_level_1 = [];
        dashboard.analytics_sections_level_2 = [];
        dashboard.analytics_sections_level_3 = [];
        dashboard.article_event_summary = null;
        dashboard.article_event_name_list = [];
        dashboard.article_data_list = [];
      }
      return dashboard;
    });
    dispatch(setDashboardsData(updatedDashboardsData));

    let comBrandList = [selectedCompanyBrand, ...selectedCompBrands];

    let templateFetchPayloadObj = {
      p_token: p_token ? p_token : null,
      dashboard_type: dashboardActiveKey + 1,
      deep_dive_level: "1",
      dashboardsData: dashboardsData,
      start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
      end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
      dashboard_filters: [],
      brand_list: comBrandList?.length ? comBrandList : null,
    };
    dispatch(getDashboardAnalyticsTemplateFetchAPI(templateFetchPayloadObj));

    let widgets_list = ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5"];
    widgets_list?.map((widget_id) => {
      let payloadObj = {
        p_token: p_token ? p_token : null,
        brand_list: comBrandList?.length ? comBrandList : null,
        start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
        end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
        filters: [],
        widget_id: widget_id,
        dashboard_type: dashboardActiveKey + 1,
        dashboardsData: dashboardsData,
        offset: 0,
        // dashboard_filters: [],
        dashboard_filters: [{ attribute: "theme_id", values: [] }],
        rows: 5,
      };
      dispatch(getDashboardDataAPI(payloadObj));
    });
  };

  const filteredBrands = allBrands.filter((b) =>
    b.brand_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const content = (
    <div style={{ width: "250px" }}>
      <Input
        placeholder="Search brands"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "8px" }}
      />
      <Checkbox.Group
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "200px",
          overflowY: "auto",
          gap: "5px",
        }}
        value={selectedCompBrands.map((b) => b.brand_id)}
        onChange={handleBrandChange}
      >
        {filteredBrands?.map((brand) => {
          const isDisabled =
            brand?.brand_name === selectedCompanyBrand?.brand_name;
          if (!isDisabled)
            return (
              <div
                key={brand?.brand_id}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Checkbox
                  key={brand?.brand_id}
                  value={brand?.brand_id}
                  disabled={
                    !selectedCompBrands
                      ?.map((d) => d?.brand_id)
                      ?.includes(brand?.brand_id) &&
                    selectedCompBrands?.length === 3
                      ? true
                      : isDisabled
                  }
                >
                  <img
                    src={brand?.brand_logo}
                    style={{
                      marginRight: "5px",
                      width: "23px",
                      height: "23px",
                      borderRadius: "50%",
                      border: "1px solid #E7ECF4",
                      marginTop: "-3px",
                    }}
                  />{" "}
                  {brand?.brand_name}
                </Checkbox>
              </div>
            );
        })}
      </Checkbox.Group>

      <div style={{ float: "right", color: "#707070" }}>
        ({selectedCompBrands?.length}/3 Selected)
      </div>
      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "12px",
        }}
      >
        <Button size="small" onClick={handleDeselectAll}>
          Deselect All
        </Button>
        <Button type="primary" size="small" onClick={handleDone}>
          Done
        </Button>
      </div>
    </div>
  );

  const handleCompanyBrandChange = (e) => {
    let brand_name = e?.target?.value;
    const selectedObjects = allBrands?.find((brand) =>
      brand_name?.includes(brand?.brand_name)
    );
    setSelectedCompanyBrand(selectedObjects);
    setSelectedCompBrands([]);
  };

  const companyMenu = (
    <div className="comp-dropdown-box">
      <Radio.Group
        onChange={(e) => handleCompanyBrandChange(e)}
        // onChange={(e) => setSelectedCompanyBrand(e.target.value)}
        value={selectedCompanyBrand?.brand_name}
        className="comp-radio-group"
      >
        {aggregatedDashboardBrandsList?.map((company) => (
          <Radio value={company?.brand_name} key={company?.brand_id}>
            <img
              src={company?.brand_logo}
              style={{
                marginRight: "5px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                border: "1px solid #E7ECF4",
                marginTop: "-3px",
              }}
            />{" "}
            {company?.brand_name}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );

  return (
    <div className="comp-selectors">
      <Dropdown overlay={companyMenu} trigger={["click"]}>
        <div
          style={{
            border: "1px solid lightgrey",
            padding: "5px 15px",
            borderRadius: "6px",
            width: "180px",
          }}
        >
          {selectedCompanyBrand?.brand_name || "Select Company"}{" "}
          <DownOutlined style={{ float: "right", marginTop: "5px" }} />
        </div>
      </Dropdown>
      <div className="comp-vs-circle1">v/s</div>
      <Popover
        content={content}
        title="Select Brands"
        trigger="click"
        visible={visible}
        onVisibleChange={setVisible}
        placement="bottomLeft"
      >
        <Button
          className="account-setup-dropdown"
          style={{
            width: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {selectedCompBrands.length > 0
              ? selectedCompBrands?.[0]?.brand_name
              : "Select Brands"}
            {selectedCompBrands.length !== allBrands.length &&
            selectedCompBrands?.length > 1
              ? ` +${selectedCompBrands.length - 1}`
              : ""}
          </span>
          <DownOutlined />
        </Button>
      </Popover>
    </div>
  );
};

export default CompBrandSelector;
