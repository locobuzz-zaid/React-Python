import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import Dashboard from "./Dashboard/Dashboard";
import "./LayoutView.css";
// import AnalyticsView from "./AnalyticsView";
// import DeepDive2 from "./DeepDive/DeepDive2";
// import DeepDive3 from "./DeepDive/DeepDive3";
// import { CuratedNewsView } from "./Dashboard/CuratedNewsView";
// import { HighVelocityViewAll } from "./Dashboard/HighVelocityViewAll";
// import DeepDiveAnalytics from "./DeepDive/DeepDiveAnalytics";
// import Settings from "./Settings/Settings";

const { Content } = Layout;

const LayoutView = () => {
  const dispatch = useDispatch();

  // const dashboardDeepDiveLevel = useSelector(
  //   (state) => state?.NewzVerse?.dashboard_deep_dive_level
  // );
  // const dashboardsData = useSelector(
  //   (state) => state?.NewzVerse?.dashboards_data
  // );
  // // console.log("dashboardsData", dashboardsData);
  // const dashboardBrandsList = useSelector(
  //   (state) => state?.NewzVerse?.dashboard_brands_list
  // );
  // const dashboardActiveKey = useSelector(
  //   (state) => state?.NewzVerse?.active_key - 1
  // );
  // let p_token = localStorage.getItem("p_token");

  let dashboardDeepDiveLevel = 1; // Hardcoded for now, replace with actual logic

  const [selectedMenu, setSelectedMenu] = useState("1");

  const handleMenuSelect = (key) => {
    setSelectedMenu(key);
  };

  return (
    <div>
      <TopNavbar />
      {dashboardDeepDiveLevel === 1 ? (
        <>
          <Layout style={{ minHeight: "100vh" }}>
            <Sidebar
              onMenuSelect={handleMenuSelect}
              selectedMenu={selectedMenu}
            />
            <Layout
              className="site-layout custom_scrollbar"
              style={{ marginLeft: 80 }}
              id="style-1"
            >
              <Content style={{ overflow: "initial" }}>
                {selectedMenu === "1" ? (
                  <Dashboard
                    handleMenuSelect={handleMenuSelect}
                    selectedMenu={selectedMenu}
                  />
                ) : selectedMenu === "2" ? (
                  "Analytics"
                ) : selectedMenu === "3" ? (
                  "Settings"
                ) : selectedMenu === "4" ? (
                  "Profile"
                ) : (
                  ""
                )}
              </Content>
            </Layout>
          </Layout>
        </>
      ) : (
        "No Page Found"
      )}
    </div>
  );
};

export default LayoutView;
