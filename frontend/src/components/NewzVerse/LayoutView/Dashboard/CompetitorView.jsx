import React, { useState, useEffect } from "react";
import { Dropdown, Radio, Checkbox, Button, Popover, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import { setDashboardsData } from "../../../../redux/actions/NewzVerse/NewzVerse";
import {
  getDashboardAnalyticsTemplateFetchAPI,
  getDashboardDataAPI,
} from "../../../../redux/actions/NewzVerse/NewzVerseAPI";
import noCompetitorBrandImg from "../../../../assets/Dashboard/no_competitor_brand_img.svg";

const CompetitorView = () => {
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
    brand_id: aggregatedDashboardBrandsList?.[0]?.brand_id,
    brand_name: aggregatedDashboardBrandsList?.[0]?.brand_name,
  });

  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCompBrands, setSelectedCompBrands] = useState([]);

  const allBrands = aggregatedDashboardBrandsList || [];

  // useEffect(() => {
  //   if (selectedCompBrands?.length) {
  //     setSelectedCompBrands(selectedCompBrands);
  //   } else {
  //     setSelectedCompBrands([]);
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
        placeholder="Select Brands"
        onChange={handleBrandChange}
      >
        {filteredBrands?.map((brand) => {
          const isDisabled =
            brand.brand_name === selectedCompanyBrand?.brand_name;
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
                      width: "18px",
                      height: "18px",
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

  const handleCompare = () => {
    // Flag false
    let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
      if (dashboard?.dashboard_type === 2) {
        dashboard.competitor_view_flag = false;
        dashboard.selected_brands = selectedCompanyBrand;
        dashboard.selected_comp_brands = selectedCompBrands;
      }
      return dashboard;
    });
    dispatch(setDashboardsData(updatedDashboardsData));

    let comBrandList = [selectedCompanyBrand, ...selectedCompBrands];

    let templateFetchPayloadObj = {
      p_token: p_token ? p_token : null,
      dashboard_type: "2",
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
        dashboard_type: 2,
        dashboardsData: dashboardsData,
        offset: 0,
        // dashboard_filters: [],
        dashboard_filters: [{ attribute: "theme_id", values: [] }],
        rows: 5,
      };
      dispatch(getDashboardDataAPI(payloadObj));
    });
  };

  const handleAccountSettings = () => {
    console.log("Account Settings");
  };

  return (
    <>
      {dashboardBrandsList?.length > 1 ? (
        <div className="comp-compare-wrapper">
          <h1>
            <b>Insight Arena</b>
          </h1>
          <p>
            <b>
              Stay ahead with real-time insights, news, and posts from the{" "}
              <br /> companies you track. Compare, analyze, and strategize—all
              in one <br />
              powerful view.
            </b>
          </p>

          <div className="comp-selectors">
            <Dropdown overlay={companyMenu} trigger={["click"]}>
              <div className="comp-dropdown-trigger">
                {selectedCompanyBrand?.brand_name || "Select Company Brand"}{" "}
                <DownOutlined />
              </div>
            </Dropdown>

            <div className="comp-vs-circle">v/s</div>

            <Popover
              content={content}
              title="Select Brands"
              trigger="click"
              visible={visible}
              onVisibleChange={setVisible}
              placement="bottomLeft"
            >
              <Button className="comp-dropdown-trigger1">
                {selectedCompBrands.length > 0
                  ? selectedCompBrands?.[0]?.brand_name?.length > 15
                    ? selectedCompBrands?.[0]?.brand_name
                    : selectedCompBrands?.[0]?.brand_name
                  : "Select Brands"}
                {selectedCompBrands.length !== allBrands.length &&
                selectedCompBrands?.length > 1
                  ? "+"
                  : ""}
                {selectedCompBrands.length !== allBrands.length &&
                selectedCompBrands?.length > 1
                  ? selectedCompBrands?.length - 1
                  : ""}
                <DownOutlined style={{ marginLeft: "auto" }} />
              </Button>
            </Popover>
          </div>

          <Button
            disabled={selectedCompBrands?.length ? false : true}
            className="compare_dark_btn"
            onClick={handleCompare}
          >
            Let’s Compare!
          </Button>
        </div>
      ) : (
        <div className="comp-compare-wrapper">
          <img style={{ height: "200px" }} src={noCompetitorBrandImg} />
          <h2>
            <b>No Competitors Added!</b>
          </h2>
          <p>
            <b>
              Please add companies from Settings / Account Set Up to continue.
            </b>
          </p>

          <Button className="compare_dark_btn" onClick={handleAccountSettings}>
            Go to Account Set Up
          </Button>
        </div>
      )}
    </>
  );
};

export default CompetitorView;
