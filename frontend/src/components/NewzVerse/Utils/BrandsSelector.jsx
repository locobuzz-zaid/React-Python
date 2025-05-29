import React, { useState, useEffect } from "react";
import { Popover, Checkbox, Input, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardDataAPI,
} from "../../../redux/actions/NewzVerse/NewzVerseAPI";
import { setDashboardsData } from "../../../redux/actions/NewzVerse/NewzVerse";

const BrandSelector = ({ aggregatedDashboardBrandsList }) => {
  const dispatch = useDispatch();
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );

  let p_token = localStorage.getItem("p_token");

  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  const allBrands = aggregatedDashboardBrandsList || [];

  useEffect(() => {
    if (dashboardsData?.[dashboardActiveKey]?.selected_brands?.length) {
      setSelectedBrands(dashboardsData?.[dashboardActiveKey]?.selected_brands);
    } else if (selectedBrands?.length) {
      setSelectedBrands(selectedBrands);

      let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
        if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
          dashboard.selected_brands = selectedBrands;
        }
        return dashboard;
      });
      dispatch(setDashboardsData(updatedDashboardsData));
    } else {
      setSelectedBrands(allBrands);

      let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
        if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
          dashboard.selected_brands = allBrands;
        }
        return dashboard;
      });
      dispatch(setDashboardsData(updatedDashboardsData));
    }
  }, [aggregatedDashboardBrandsList]);

  const handleBrandChange = (selectedIds) => {
    const selectedObjects = allBrands.filter((brand) =>
      selectedIds.includes(brand.brand_id)
    );
    setSelectedBrands(selectedObjects);
  };

  const handleSelectAllToggle = (e) => {
    if (e.target.checked) {
      setSelectedBrands(allBrands);
    } else {
      setSelectedBrands([]);
    }
  };

  const handleDeselectAll = () => {
    setSelectedBrands([]);
  };

  const handleDone = () => {
    setVisible(false);
    // console.log("Selected Brands:", selectedBrands);

    let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
      if (dashboard?.dashboard_type === 3) {
        // dashboard.key = index + 1;
        // dashboard.title = d?.dashboard_name;
        // dashboard.duration = {
        //   start_date: start_date,
        //   end_date: end_date,
        // };
        // dashboard.dashboard_type = d?.dashboard_type;
        dashboard.selected_brands = selectedBrands;
        dashboard.selected_comp_brands = null;
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

    let templateFetchPayloadObj = {
      p_token: p_token ? p_token : null,
      dashboard_type: dashboardActiveKey + 1,
      deep_dive_level: "1",
      dashboardsData: dashboardsData,
      start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
      end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
      dashboard_filters: [],
      brand_list: dashboardsData?.[dashboardActiveKey]?.selected_brands,
    };
    dispatch(getDashboardAnalyticsTemplateFetchAPI(templateFetchPayloadObj));

    let widgets_list = ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5"];
    widgets_list?.map((widget_id) => {
      let payloadObj = {
        p_token: p_token ? p_token : null,
        brand_list: selectedBrands?.length ? selectedBrands : null,
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

  const isAllSelected = selectedBrands.length === allBrands.length;

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

      <Checkbox
        checked={isAllSelected}
        onChange={handleSelectAllToggle}
        style={{ marginBottom: 0 }}
      >
        All
      </Checkbox>

      <Checkbox.Group
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "200px",
          overflowY: "auto",
        }}
        value={selectedBrands.map((b) => b.brand_id)}
        onChange={handleBrandChange}
      >
        {filteredBrands.map((brand) => (
          <div
            key={brand?.brand_id}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Checkbox key={brand.brand_id} value={brand.brand_id}>
              <img
                src={brand?.brand_logo}
                style={{
                  marginRight: "5px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: "1px solid #E7ECF4",
                }}
              />{" "}
              {brand?.brand_name}
            </Checkbox>
          </div>
        ))}
      </Checkbox.Group>

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

  return (
    <div style={{ marginTop: "-5px" }}>
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
            width: 150,
            justifyContent: "flex-start",
            display: "flex",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          {selectedBrands.length === allBrands.length
            ? "All"
            : selectedBrands.length > 0
            ? selectedBrands?.[0]?.brand_name?.length > 10
              ? selectedBrands?.[0]?.brand_name?.substring(0, 10) + "..."
              : selectedBrands?.[0]?.brand_name
            : "Select Brands"}
          {selectedBrands.length !== allBrands.length &&
          selectedBrands?.length > 1
            ? "+"
            : ""}
          {selectedBrands.length !== allBrands.length &&
          selectedBrands?.length > 1
            ? selectedBrands?.length - 1
            : ""}
          <DownOutlined style={{ marginLeft: "auto" }} />
        </Button>
      </Popover>
    </div>
  );
};

export default BrandSelector;
